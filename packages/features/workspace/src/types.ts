export type ProjectStatus = "planning" | "active" | "paused" | "completed";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type MemberRole = "owner" | "admin" | "member" | "viewer";
export type MemberStatus = "active" | "invited";

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  /** One of `projectColors`, used for chips and charts. */
  color: string;
  /** ISO date, `YYYY-MM-DD`. */
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  /** A member id. */
  assigneeId: string | null;
  /** ISO date, `YYYY-MM-DD`. */
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: string;
}

export interface Activity {
  id: string;
  actorName: string;
  /** Short past tense phrase, such as "completed" or "created project". */
  action: string;
  target: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface WorkspaceData {
  workspace: Workspace;
  projects: Project[];
  tasks: Task[];
  members: Member[];
  activity: Activity[];
  notifications: Notification[];
}

export type ProjectInput = Pick<Project, "name" | "description" | "status" | "color" | "dueDate">;
export type TaskInput = Pick<
  Task,
  "projectId" | "title" | "description" | "status" | "priority" | "assigneeId" | "dueDate"
>;
export type MemberInput = Pick<Member, "name" | "email" | "role">;

/**
 * Everything the workspace screens need from a backend. The local adapter
 * keeps it in the browser; an API adapter can implement the same contract.
 */
export interface WorkspaceAdapter {
  load(): Promise<WorkspaceData>;
  updateWorkspace(changes: Pick<Workspace, "name">): Promise<Workspace>;
  createProject(input: ProjectInput): Promise<Project>;
  updateProject(id: string, changes: Partial<ProjectInput>): Promise<Project>;
  /** Also removes the project's tasks. */
  deleteProject(id: string): Promise<void>;
  createTask(input: TaskInput): Promise<Task>;
  updateTask(id: string, changes: Partial<TaskInput>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  inviteMember(input: MemberInput): Promise<Member>;
  updateMember(id: string, changes: Partial<Pick<Member, "role" | "status">>): Promise<Member>;
  /** Also unassigns their tasks. */
  removeMember(id: string): Promise<void>;
  /** Marks the given notifications as read, or all of them. */
  markNotificationsRead(ids?: string[]): Promise<void>;
  /** Restores the starting data. */
  reset(): Promise<WorkspaceData>;
}

export class WorkspaceError extends Error {
  constructor(
    readonly code: "NOT_FOUND" | "DUPLICATE_MEMBER" | "LAST_OWNER" | "UNKNOWN",
    message: string,
  ) {
    super(message);
    this.name = "WorkspaceError";
  }
}
