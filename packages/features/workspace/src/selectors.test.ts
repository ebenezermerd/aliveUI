import { describe, expect, it } from "vitest";
import { createSeedData } from "./seed.js";
import {
  countByStatus,
  dailyActivity,
  filterTasks,
  projectProgress,
  sortTasks,
  trend,
  upcomingTasks,
  workspaceStats,
} from "./selectors.js";

const now = new Date(2026, 9, 2, 12);
const data = createSeedData({ id: "owner", name: "Ada Lovelace", email: "ada@example.com" }, now);

describe("workspace selectors", () => {
  it("counts every task exactly once by status", () => {
    const counts = countByStatus(data.tasks);
    expect(Object.values(counts).reduce((sum, value) => sum + value, 0)).toBe(data.tasks.length);
  });

  it("builds a fixed length daily series ending today", () => {
    const series = dailyActivity(data.tasks, 14, now);
    expect(series).toHaveLength(14);
    expect(series.at(-1)!.date).toBe("2026-10-02");
  });

  it("reports open and overdue work", () => {
    const stats = workspaceStats(data, now);
    expect(stats.openTasks).toBe(data.tasks.filter((task) => task.status !== "done").length);
    expect(stats.overdueTasks).toBeLessThanOrEqual(stats.openTasks);
  });

  it("computes progress per project", () => {
    const progress = projectProgress(data.projects[5]!, data.tasks);
    expect(progress.percent).toBe(100);
  });

  it("calculates trends without dividing by zero", () => {
    expect(trend(10, 5)).toBe(100);
    expect(trend(0, 0)).toBe(0);
    expect(trend(3, 0)).toBeNull();
  });

  it("filters, sorts and lists upcoming work", () => {
    const project = data.projects[0]!;
    expect(
      filterTasks(data.tasks, { projectId: project.id }).every(
        (task) => task.projectId === project.id,
      ),
    ).toBe(true);
    const sorted = sortTasks(data.tasks);
    expect(["urgent", "high", "medium", "low"].indexOf(sorted[0]!.priority)).toBe(0);
    const upcoming = upcomingTasks(data.tasks, 7, now);
    expect(upcoming.every((task) => task.status !== "done")).toBe(true);
  });
});
