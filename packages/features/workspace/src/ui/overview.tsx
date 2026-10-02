"use client";

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  GlassSurface,
  Progress,
  ScrollArea,
} from "@aliveui/glass";
import { cn } from "@aliveui/primitives";
import { useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { taskStatuses } from "../constants.js";
import { timeAgo } from "../dates.js";
import {
  useDailyActivity,
  useLookups,
  useProjectsWithProgress,
  useStats,
  useStatusCounts,
  useUpcomingTasks,
} from "../react/hooks.js";
import { useWorkspace } from "../react/provider.js";
import { trend } from "../selectors.js";
import { TaskDialog } from "./dialogs.js";
import { DueDate, MemberAvatar, PageHeader, PriorityBadge, ProjectDot } from "./shared.js";

/** Chart colours chosen to read well on both light and dark glass. */
const chartColors = {
  completed: "#22c55e",
  created: "#3b82f6",
  status: { todo: "#94a3b8", in_progress: "#3b82f6", review: "#f59e0b", done: "#22c55e" },
} as const;

interface StatProps {
  label: string;
  value: number;
  hint: ReactNode;
  icon: ReactNode;
  tone?: "accent" | "success" | "warning" | "danger";
}

function Stat({ label, value, hint, icon, tone = "accent" }: StatProps) {
  return (
    <GlassSurface elevation="raised" padding="none" className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-xl [&_svg]:size-4",
            tone === "accent" && "bg-accent/15 text-accent",
            tone === "success" && "bg-success/15 text-success",
            tone === "warning" && "bg-warning/20 text-warning",
            tone === "danger" && "bg-danger/15 text-danger",
          )}
        >
          {icon}
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      <div className="text-xs text-muted-foreground">{hint}</div>
    </GlassSurface>
  );
}

function TrendBadge({ value }: { value: number | null }) {
  if (value === null) return <Badge tone="success">New</Badge>;
  const tone = value > 0 ? "success" : value < 0 ? "danger" : "neutral";
  return (
    <Badge tone={tone}>
      {value > 0 ? "+" : ""}
      {value}%
    </Badge>
  );
}

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

function StatGrid() {
  const stats = useStats();
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat
        label="Open tasks"
        value={stats.openTasks}
        icon={<Icon path="M3 4h10M3 8h10M3 12h6" />}
        hint={
          stats.overdueTasks > 0 ? (
            <span className="font-medium text-danger">{stats.overdueTasks} overdue</span>
          ) : (
            "Nothing overdue"
          )
        }
      />
      <Stat
        label="Completed this week"
        value={stats.completedThisWeek}
        tone="success"
        icon={<Icon path="m3.5 8.5 3 3 6-7" />}
        hint={
          <span className="flex items-center gap-2">
            <TrendBadge value={trend(stats.completedThisWeek, stats.completedLastWeek)} /> vs last
            week
          </span>
        }
      />
      <Stat
        label="Active projects"
        value={stats.activeProjects}
        tone="warning"
        icon={<Icon path="M2.5 4.5h4l1.5 1.5h5.5v6.5h-11z" />}
        hint="Planning and paused ones excluded"
      />
      <Stat
        label="Team members"
        value={stats.activeMembers}
        icon={
          <Icon path="M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.5 13c0-2 1.5-3.5 3.5-3.5S9.5 11 9.5 13M11 7.5a1.75 1.75 0 1 0 0-3.5M12 9.75c1 .4 1.75 1.5 1.75 3.25" />
        }
        hint={
          stats.pendingInvites ? `${stats.pendingInvites} invite pending` : "Everyone has joined"
        }
      />
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-overlay rounded-xl px-3 py-2 text-xs text-foreground shadow-floating">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.name}: <span className="font-medium tabular-nums">{item.value}</span>
        </p>
      ))}
    </div>
  );
}

function ActivityChart() {
  const series = useDailyActivity(14);
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Throughput</CardTitle>
        <CardDescription>Tasks created and completed over the last 14 days.</CardDescription>
      </CardHeader>
      <div
        className="h-64 text-muted-foreground"
        role="img"
        aria-label="Area chart of tasks created and completed per day"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              {(["completed", "created"] as const).map((key) => (
                <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors[key]} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={chartColors[key]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="currentColor" strokeOpacity={0.12} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "currentColor", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
            />
            <Area
              type="monotone"
              name="Created"
              dataKey="created"
              stroke={chartColors.created}
              strokeWidth={2}
              fill="url(#fill-created)"
            />
            <Area
              type="monotone"
              name="Completed"
              dataKey="completed"
              stroke={chartColors.completed}
              strokeWidth={2}
              fill="url(#fill-completed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function StatusChart() {
  const counts = useStatusCounts();
  const data = taskStatuses.map((status) => ({
    name: status.label,
    key: status.value,
    value: counts[status.value],
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task status</CardTitle>
        <CardDescription>{total} tasks across every project.</CardDescription>
      </CardHeader>
      <div
        className="h-40 text-muted-foreground"
        role="img"
        aria-label="Bar chart of tasks per status"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "currentColor", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
            />
            <Bar dataKey="value" name="Tasks" radius={[8, 8, 4, 4]}>
              {data.map((item) => (
                <Cell key={item.key} fill={chartColors.status[item.key]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {data.map((item) => (
          <li key={item.key} className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: chartColors.status[item.key] }}
            />
            <span className="flex-1 text-muted-foreground">{item.name}</span>
            <span className="font-medium tabular-nums">{item.value}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ProjectProgressCard({ onOpenProject }: { onOpenProject?: (id: string) => void }) {
  const rows = useProjectsWithProgress()
    .filter(({ project }) => project.status !== "completed")
    .slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project progress</CardTitle>
        <CardDescription>Share of each project's tasks that are done.</CardDescription>
      </CardHeader>
      <ul className="space-y-4">
        {rows.map(({ project, progress }) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => onOpenProject?.(project.id)}
              className="group w-full space-y-2 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex items-center gap-2 text-sm">
                <ProjectDot color={project.color} />
                <span className="flex-1 truncate font-medium group-hover:underline">
                  {project.name}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {progress.done}/{progress.total}
                </span>
              </span>
              <Progress value={progress.percent} aria-label={`${project.name} progress`} />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function UpcomingCard() {
  const tasks = useUpcomingTasks(7).slice(0, 6);
  const lookups = useLookups();
  const [editing, setEditing] = useState<string | null>(null);
  const task = tasks.find((item) => item.id === editing);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Due soon</CardTitle>
        <CardDescription>Open tasks due within a week, overdue first.</CardDescription>
      </CardHeader>
      {tasks.length === 0 ? (
        <EmptyState title="All clear" description="Nothing is due this week." className="py-6" />
      ) : (
        <ul className="-mx-2 space-y-1">
          {tasks.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setEditing(item.id)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <MemberAvatar
                  member={item.assigneeId ? lookups.member.get(item.assigneeId) : undefined}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.title}</span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ProjectDot
                      color={lookups.project.get(item.projectId)?.color ?? "#94a3b8"}
                      className="size-2"
                    />
                    {lookups.project.get(item.projectId)?.name}
                  </span>
                </span>
                <span className="flex flex-col items-end gap-1">
                  <PriorityBadge priority={item.priority} />
                  <DueDate date={item.dueDate} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <TaskDialog open={!!task} onOpenChange={(open) => !open && setEditing(null)} task={task} />
    </Card>
  );
}

function ActivityCard() {
  const { activity } = useWorkspace();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>What changed across the workspace.</CardDescription>
      </CardHeader>
      <ScrollArea className="-mx-2 h-72">
        <ol className="space-y-1 px-2">
          {activity.slice(0, 30).map((entry) => (
            <li key={entry.id} className="flex gap-3 rounded-xl py-2">
              <MemberAvatar
                member={{
                  id: entry.id,
                  name: entry.actorName,
                  email: "",
                  role: "member",
                  status: "active",
                  joinedAt: "",
                }}
              />
              <p className="min-w-0 flex-1 text-sm">
                <span className="font-medium">{entry.actorName}</span>{" "}
                <span className="text-muted-foreground">{entry.action}</span>{" "}
                <span className="font-medium">{entry.target}</span>
                <span className="block text-xs text-muted-foreground">
                  {timeAgo(entry.createdAt)}
                </span>
              </p>
            </li>
          ))}
        </ol>
      </ScrollArea>
    </Card>
  );
}

export interface OverviewViewProps {
  /** First name for the greeting. */
  greetingName?: string;
  onOpenProject?: (id: string) => void;
}

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

/** The home of the workspace: key numbers, charts, deadlines and recent activity. */
export function OverviewView({ greetingName, onOpenProject }: OverviewViewProps) {
  const { workspace } = useWorkspace();
  const [creating, setCreating] = useState(false);
  return (
    <>
      <PageHeader
        title={greetingName ? `${greeting()}, ${greetingName}` : "Overview"}
        description={`Here is what is happening in ${workspace.name}.`}
        actions={
          <Button variant="tinted" onClick={() => setCreating(true)}>
            New task
          </Button>
        }
      />
      <div className="space-y-6">
        <StatGrid />
        <div className="grid gap-6 xl:grid-cols-3">
          <ActivityChart />
          <StatusChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <ProjectProgressCard onOpenProject={onOpenProject} />
          <UpcomingCard />
          <ActivityCard />
        </div>
      </div>
      <TaskDialog open={creating} onOpenChange={setCreating} />
    </>
  );
}
