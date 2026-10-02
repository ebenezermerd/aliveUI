"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  Member,
  MemberInput,
  Project,
  ProjectInput,
  Task,
  TaskInput,
  Workspace,
  WorkspaceAdapter,
  WorkspaceData,
} from "../types.js";

export type WorkspaceState =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: WorkspaceData; error: null }
  | { status: "error"; data: null; error: Error };

export interface WorkspaceActions {
  updateWorkspace(changes: Pick<Workspace, "name">): Promise<Workspace>;
  createProject(input: ProjectInput): Promise<Project>;
  updateProject(id: string, changes: Partial<ProjectInput>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  createTask(input: TaskInput): Promise<Task>;
  updateTask(id: string, changes: Partial<TaskInput>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  inviteMember(input: MemberInput): Promise<Member>;
  updateMember(id: string, changes: Partial<Pick<Member, "role" | "status">>): Promise<Member>;
  removeMember(id: string): Promise<void>;
  markNotificationsRead(ids?: string[]): Promise<void>;
  reset(): Promise<void>;
  reload(): Promise<void>;
}

interface WorkspaceContextValue {
  state: WorkspaceState;
  actions: WorkspaceActions;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/**
 * Loads the workspace once and keeps it in memory. Edits apply to the screen
 * straight away and roll back if the adapter rejects them, then the data is
 * refreshed so derived things like the activity feed stay accurate.
 */
export function WorkspaceProvider({
  adapter,
  children,
}: {
  adapter: WorkspaceAdapter;
  children: ReactNode;
}) {
  const [state, setState] = useState<WorkspaceState>({
    status: "loading",
    data: null,
    error: null,
  });
  const dataRef = useRef<WorkspaceData | null>(null);

  const commit = useCallback((data: WorkspaceData) => {
    dataRef.current = data;
    setState({ status: "ready", data, error: null });
  }, []);

  const reload = useCallback(async () => {
    try {
      commit(await adapter.load());
    } catch (error) {
      setState({ status: "error", data: null, error: error as Error });
    }
  }, [adapter, commit]);

  useEffect(() => {
    let active = true;
    adapter.load().then(
      (data) => active && commit(data),
      (error: Error) => active && setState({ status: "error", data: null, error }),
    );
    return () => {
      active = false;
    };
  }, [adapter, commit]);

  const actions = useMemo<WorkspaceActions>(() => {
    /** Applies a local change now, runs the adapter call, then syncs or rolls back. */
    async function run<T>(
      call: () => Promise<T>,
      optimistic?: (data: WorkspaceData) => WorkspaceData,
    ) {
      const before = dataRef.current;
      if (before && optimistic) commit(optimistic(structuredClone(before)));
      try {
        const result = await call();
        commit(await adapter.load());
        return result;
      } catch (error) {
        if (before) commit(before);
        throw error;
      }
    }

    const patch = <T extends { id: string }>(
      items: T[],
      id: string,
      changes: Partial<NoInfer<T>>,
    ) => items.map((item) => (item.id === id ? { ...item, ...changes } : item));

    return {
      updateWorkspace: (changes) =>
        run(
          () => adapter.updateWorkspace(changes),
          (data) => ({ ...data, workspace: { ...data.workspace, ...changes } }),
        ),
      createProject: (input) => run(() => adapter.createProject(input)),
      updateProject: (id, changes) =>
        run(
          () => adapter.updateProject(id, changes),
          (data) => ({ ...data, projects: patch(data.projects, id, changes) }),
        ),
      deleteProject: (id) =>
        run(
          () => adapter.deleteProject(id),
          (data) => ({
            ...data,
            projects: data.projects.filter((project) => project.id !== id),
            tasks: data.tasks.filter((task) => task.projectId !== id),
          }),
        ),
      createTask: (input) => run(() => adapter.createTask(input)),
      updateTask: (id, changes) =>
        run(
          () => adapter.updateTask(id, changes),
          (data) => ({ ...data, tasks: patch(data.tasks, id, changes) }),
        ),
      deleteTask: (id) =>
        run(
          () => adapter.deleteTask(id),
          (data) => ({ ...data, tasks: data.tasks.filter((task) => task.id !== id) }),
        ),
      inviteMember: (input) => run(() => adapter.inviteMember(input)),
      updateMember: (id, changes) =>
        run(
          () => adapter.updateMember(id, changes),
          (data) => ({ ...data, members: patch(data.members, id, changes) }),
        ),
      removeMember: (id) =>
        run(
          () => adapter.removeMember(id),
          (data) => ({
            ...data,
            members: data.members.filter((member) => member.id !== id),
            tasks: data.tasks.map((task) =>
              task.assigneeId === id ? { ...task, assigneeId: null } : task,
            ),
          }),
        ),
      markNotificationsRead: (ids) =>
        run(
          () => adapter.markNotificationsRead(ids),
          (data) => ({
            ...data,
            notifications: data.notifications.map((item) =>
              !ids || ids.includes(item.id) ? { ...item, read: true } : item,
            ),
          }),
        ),
      reset: async () => {
        commit(await adapter.reset());
      },
      reload,
    };
  }, [adapter, commit, reload]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

function useWorkspaceContext() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("Workspace hooks must be used inside a WorkspaceProvider.");
  return context;
}

/** Loading, ready or error, with the data once ready. */
export function useWorkspaceState(): WorkspaceState {
  return useWorkspaceContext().state;
}

/** The loaded workspace. Use inside a gate that waits for `ready`. */
export function useWorkspace(): WorkspaceData {
  const { state } = useWorkspaceContext();
  if (state.status !== "ready") throw new Error("useWorkspace needs a loaded workspace.");
  return state.data;
}

export function useWorkspaceActions(): WorkspaceActions {
  return useWorkspaceContext().actions;
}
