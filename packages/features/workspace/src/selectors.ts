import { addDays, daysUntil, startOfDay, toISODate } from "./dates.js";
import type { Project, Task, TaskStatus, WorkspaceData } from "./types.js";

/** Pure functions that turn workspace data into what the dashboard shows. */

export interface WorkspaceStats {
  openTasks: number;
  overdueTasks: number;
  completedThisWeek: number;
  completedLastWeek: number;
  activeProjects: number;
  activeMembers: number;
  pendingInvites: number;
}

export function workspaceStats(data: WorkspaceData, now = new Date()): WorkspaceStats {
  const today = startOfDay(now);
  const weekAgo = addDays(today, -6).getTime();
  const twoWeeksAgo = addDays(today, -13).getTime();
  let completedThisWeek = 0;
  let completedLastWeek = 0;
  for (const task of data.tasks) {
    if (!task.completedAt) continue;
    const time = startOfDay(new Date(task.completedAt)).getTime();
    if (time >= weekAgo) completedThisWeek += 1;
    else if (time >= twoWeeksAgo) completedLastWeek += 1;
  }
  const open = data.tasks.filter((task) => task.status !== "done");
  return {
    openTasks: open.length,
    overdueTasks: open.filter((task) => task.dueDate && daysUntil(task.dueDate, now) < 0).length,
    completedThisWeek,
    completedLastWeek,
    activeProjects: data.projects.filter((project) => project.status === "active").length,
    activeMembers: data.members.filter((member) => member.status === "active").length,
    pendingInvites: data.members.filter((member) => member.status === "invited").length,
  };
}

/** Percentage change, or null when there is nothing to compare against. */
export function trend(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}

export interface DayCount {
  date: string;
  label: string;
  completed: number;
  created: number;
}

/** Tasks created and completed on each of the last `days` days. */
export function dailyActivity(tasks: Task[], days = 14, now = new Date()): DayCount[] {
  const format = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
  const series = Array.from({ length: days }, (_, index) => {
    const date = addDays(startOfDay(now), index - days + 1);
    return { date: toISODate(date), label: format.format(date), completed: 0, created: 0 };
  });
  const byDate = new Map(series.map((day) => [day.date, day]));
  for (const task of tasks) {
    const created = byDate.get(toISODate(new Date(task.createdAt)));
    if (created) created.created += 1;
    if (task.completedAt) {
      const completed = byDate.get(toISODate(new Date(task.completedAt)));
      if (completed) completed.completed += 1;
    }
  }
  return series;
}

export function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  const counts: Record<TaskStatus, number> = { todo: 0, in_progress: 0, review: 0, done: 0 };
  for (const task of tasks) counts[task.status] += 1;
  return counts;
}

export interface ProjectProgress {
  total: number;
  done: number;
  /** 0 to 100. */
  percent: number;
}

export function projectProgress(project: Project, tasks: Task[]): ProjectProgress {
  const own = tasks.filter((task) => task.projectId === project.id);
  const done = own.filter((task) => task.status === "done").length;
  return {
    total: own.length,
    done,
    percent: own.length ? Math.round((done / own.length) * 100) : 0,
  };
}

/** Open tasks due within `days`, overdue first, soonest next. */
export function upcomingTasks(tasks: Task[], days = 7, now = new Date()): Task[] {
  return tasks
    .filter(
      (task) => task.status !== "done" && task.dueDate && daysUntil(task.dueDate, now) <= days,
    )
    .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : a.dueDate! > b.dueDate! ? 1 : 0));
}

export interface TaskFilters {
  query?: string;
  projectId?: string | null;
  assigneeId?: string | null;
  priority?: Task["priority"] | null;
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const query = filters.query?.trim().toLowerCase();
  return tasks.filter(
    (task) =>
      (!query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)) &&
      (!filters.projectId || task.projectId === filters.projectId) &&
      (!filters.assigneeId || task.assigneeId === filters.assigneeId) &&
      (!filters.priority || task.priority === filters.priority),
  );
}

const priorityRank = { urgent: 0, high: 1, medium: 2, low: 3 } as const;

/** Most urgent first, then soonest due, then newest. */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      priorityRank[a.priority] - priorityRank[b.priority] ||
      (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999") ||
      b.createdAt.localeCompare(a.createdAt),
  );
}
