"use client";

import { useMemo } from "react";
import {
  countByStatus,
  dailyActivity,
  filterTasks,
  projectProgress,
  sortTasks,
  upcomingTasks,
  workspaceStats,
  type TaskFilters,
} from "../selectors.js";
import type { Member, Project } from "../types.js";
import { useWorkspace } from "./provider.js";

export function useStats() {
  const data = useWorkspace();
  return useMemo(() => workspaceStats(data), [data]);
}

export function useDailyActivity(days = 14) {
  const { tasks } = useWorkspace();
  return useMemo(() => dailyActivity(tasks, days), [tasks, days]);
}

export function useStatusCounts() {
  const { tasks } = useWorkspace();
  return useMemo(() => countByStatus(tasks), [tasks]);
}

export function useUpcomingTasks(days = 7) {
  const { tasks } = useWorkspace();
  return useMemo(() => upcomingTasks(tasks, days), [tasks, days]);
}

export function useFilteredTasks(filters: TaskFilters) {
  const { tasks } = useWorkspace();
  return useMemo(() => sortTasks(filterTasks(tasks, filters)), [tasks, filters]);
}

/** Every project with its task progress. */
export function useProjectsWithProgress() {
  const { projects, tasks } = useWorkspace();
  return useMemo(
    () => projects.map((project) => ({ project, progress: projectProgress(project, tasks) })),
    [projects, tasks],
  );
}

/** Fast lookups by id for rendering names and colours in lists. */
export function useLookups() {
  const { projects, members } = useWorkspace();
  return useMemo(
    () => ({
      project: new Map<string, Project>(projects.map((project) => [project.id, project])),
      member: new Map<string, Member>(members.map((member) => [member.id, member])),
    }),
    [projects, members],
  );
}

export function useUnreadCount() {
  const { notifications } = useWorkspace();
  return notifications.filter((notification) => !notification.read).length;
}
