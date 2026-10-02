import type { MemberRole, ProjectStatus, TaskPriority, TaskStatus } from "./types.js";

/** Labels and order for every enum, shared by every design system's blocks. */

export const taskStatuses: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "review", label: "In review" },
  { value: "done", label: "Done" },
];

export const taskPriorities: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const projectStatuses: { value: ProjectStatus; label: string }[] = [
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
];

export const memberRoles: { value: MemberRole; label: string; description: string }[] = [
  { value: "owner", label: "Owner", description: "Full access, including billing and deletion." },
  { value: "admin", label: "Admin", description: "Manage projects, tasks and people." },
  { value: "member", label: "Member", description: "Create and edit projects and tasks." },
  { value: "viewer", label: "Viewer", description: "Read only access." },
];

export const projectColors = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#64748b",
] as const;

export function labelOf<T extends string>(options: { value: T; label: string }[], value: T) {
  return options.find((option) => option.value === value)?.label ?? value;
}
