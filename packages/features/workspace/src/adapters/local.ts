import { createSeedData, type SeedOwner } from "../seed.js";
import {
  WorkspaceError,
  type Activity,
  type Member,
  type Project,
  type Task,
  type WorkspaceAdapter,
  type WorkspaceData,
} from "../types.js";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface LocalWorkspaceOptions {
  /** The signed in person. Each owner gets their own workspace. */
  owner: SeedOwner;
  namespace?: string;
  /** Defaults to `localStorage`. */
  storage?: StorageLike;
  /** Artificial delay in milliseconds, to exercise loading states. */
  latency?: number;
  /** Start new workspaces with demo data. Defaults to true. */
  seed?: boolean;
  /** Clock override for tests. */
  now?: () => Date;
}

/**
 * Keeps a whole workspace in the browser as one document per owner, and
 * records activity for every change. Swap it for an API adapter later.
 */
export function createLocalWorkspaceAdapter(options: LocalWorkspaceOptions): WorkspaceAdapter {
  const { owner } = options;
  const key = `${options.namespace ?? "aliveui.workspace"}.${owner.id}`;
  const latency = options.latency ?? 250;
  const now = options.now ?? (() => new Date());
  const storage = () => options.storage ?? globalThis.localStorage;
  const wait = () => new Promise((resolve) => setTimeout(resolve, latency));

  function fresh(): WorkspaceData {
    if (options.seed === false) {
      return {
        workspace: {
          id: `workspace-${owner.id}`,
          name: `${owner.name.split(" ")[0]}'s workspace`,
          createdAt: now().toISOString(),
        },
        projects: [],
        tasks: [],
        members: [{ ...owner, role: "owner", status: "active", joinedAt: now().toISOString() }],
        activity: [],
        notifications: [],
      };
    }
    return createSeedData(owner, now());
  }

  function read(): WorkspaceData {
    const raw = storage().getItem(key);
    if (raw) {
      try {
        const data = JSON.parse(raw) as WorkspaceData;
        // Keep the owner's name in step with their profile.
        data.members = data.members.map((member) =>
          member.id === owner.id ? { ...member, name: owner.name, email: owner.email } : member,
        );
        return data;
      } catch {
        // Fall through and start again when the stored document is unreadable.
      }
    }
    const data = fresh();
    write(data);
    return data;
  }

  function write(data: WorkspaceData) {
    storage().setItem(key, JSON.stringify(data));
  }

  function log(data: WorkspaceData, action: string, target: string) {
    const entry: Activity = {
      id: crypto.randomUUID(),
      actorName: owner.name,
      action,
      target,
      createdAt: now().toISOString(),
    };
    data.activity = [entry, ...data.activity].slice(0, 100);
  }

  function find<T extends { id: string }>(items: T[], id: string, kind: string): T {
    const item = items.find((candidate) => candidate.id === id);
    if (!item) throw new WorkspaceError("NOT_FOUND", `That ${kind} no longer exists.`);
    return item;
  }

  /** Read, change and save in one step, so every mutation is atomic. */
  async function mutate<T>(change: (data: WorkspaceData) => T): Promise<T> {
    await wait();
    const data = read();
    const result = change(data);
    write(data);
    return structuredClone(result);
  }

  return {
    async load() {
      await wait();
      return read();
    },

    updateWorkspace: (changes) =>
      mutate((data) => {
        data.workspace = { ...data.workspace, ...changes };
        log(data, "renamed the workspace to", changes.name);
        return data.workspace;
      }),

    createProject: (input) =>
      mutate((data) => {
        const stamp = now().toISOString();
        const project: Project = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: stamp,
          updatedAt: stamp,
        };
        data.projects = [project, ...data.projects];
        log(data, "created project", project.name);
        return project;
      }),

    updateProject: (id, changes) =>
      mutate((data) => {
        const current = find(data.projects, id, "project");
        const project = { ...current, ...changes, updatedAt: now().toISOString() };
        data.projects = data.projects.map((item) => (item.id === id ? project : item));
        log(
          data,
          changes.status && changes.status !== current.status
            ? `moved project to ${changes.status}`
            : "updated project",
          project.name,
        );
        return project;
      }),

    deleteProject: (id) =>
      mutate((data) => {
        const project = find(data.projects, id, "project");
        data.projects = data.projects.filter((item) => item.id !== id);
        data.tasks = data.tasks.filter((task) => task.projectId !== id);
        log(data, "deleted project", project.name);
      }),

    createTask: (input) =>
      mutate((data) => {
        find(data.projects, input.projectId, "project");
        const stamp = now().toISOString();
        const task: Task = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: stamp,
          updatedAt: stamp,
          completedAt: input.status === "done" ? stamp : null,
        };
        data.tasks = [task, ...data.tasks];
        log(data, "created task", task.title);
        return task;
      }),

    updateTask: (id, changes) =>
      mutate((data) => {
        const current = find(data.tasks, id, "task");
        const stamp = now().toISOString();
        const status = changes.status ?? current.status;
        const task: Task = {
          ...current,
          ...changes,
          updatedAt: stamp,
          completedAt: status === "done" ? (current.completedAt ?? stamp) : null,
        };
        data.tasks = data.tasks.map((item) => (item.id === id ? task : item));
        const completed = status === "done" && current.status !== "done";
        log(data, completed ? "completed" : "updated task", task.title);
        return task;
      }),

    deleteTask: (id) =>
      mutate((data) => {
        const task = find(data.tasks, id, "task");
        data.tasks = data.tasks.filter((item) => item.id !== id);
        log(data, "deleted task", task.title);
      }),

    inviteMember: (input) =>
      mutate((data) => {
        if (data.members.some((member) => member.email === input.email.toLowerCase())) {
          throw new WorkspaceError(
            "DUPLICATE_MEMBER",
            "Someone with that email is already in the workspace.",
          );
        }
        const member: Member = {
          ...input,
          email: input.email.toLowerCase(),
          id: crypto.randomUUID(),
          status: "invited",
          joinedAt: now().toISOString(),
        };
        data.members = [...data.members, member];
        log(data, "invited", member.name);
        return member;
      }),

    updateMember: (id, changes) =>
      mutate((data) => {
        const current = find(data.members, id, "member");
        const owners = data.members.filter((member) => member.role === "owner");
        if (
          current.role === "owner" &&
          changes.role &&
          changes.role !== "owner" &&
          owners.length === 1
        ) {
          throw new WorkspaceError("LAST_OWNER", "A workspace needs at least one owner.");
        }
        const member = { ...current, ...changes };
        data.members = data.members.map((item) => (item.id === id ? member : item));
        log(data, changes.role ? `changed the role of` : "updated", member.name);
        return member;
      }),

    removeMember: (id) =>
      mutate((data) => {
        const member = find(data.members, id, "member");
        if (member.id === owner.id) {
          throw new WorkspaceError(
            "LAST_OWNER",
            "You cannot remove yourself from your own workspace.",
          );
        }
        data.members = data.members.filter((item) => item.id !== id);
        data.tasks = data.tasks.map((task) =>
          task.assigneeId === id ? { ...task, assigneeId: null } : task,
        );
        log(data, "removed", member.name);
      }),

    markNotificationsRead: (ids) =>
      mutate((data) => {
        data.notifications = data.notifications.map((notification) =>
          !ids || ids.includes(notification.id) ? { ...notification, read: true } : notification,
        );
      }),

    async reset() {
      await wait();
      const data = fresh();
      write(data);
      return data;
    },
  };
}

export function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (item) => map.get(item) ?? null,
    setItem: (item, value) => void map.set(item, value),
    removeItem: (item) => void map.delete(item),
  };
}
