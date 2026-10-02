"use client";

import { Avatar, Badge, Button, EmptyState, Skeleton, toast, type BadgeProps } from "@aliveui/ui";
import { cn } from "@aliveui/primitives";
import { useCallback, type ReactNode } from "react";
import { labelOf, projectStatuses, taskPriorities, taskStatuses } from "../constants.js";
import { daysUntil, formatDueDate } from "../dates.js";
import { useWorkspaceActions, useWorkspaceState } from "../react/provider.js";
import {
  WorkspaceError,
  type Member,
  type ProjectStatus,
  type TaskPriority,
  type TaskStatus,
} from "../types.js";

type Tone = NonNullable<BadgeProps["tone"]>;

const taskStatusTone: Record<TaskStatus, Tone> = {
  todo: "neutral",
  in_progress: "accent",
  review: "warning",
  done: "success",
};

const projectStatusTone: Record<ProjectStatus, Tone> = {
  planning: "neutral",
  active: "accent",
  paused: "warning",
  completed: "success",
};

const priorityTone: Record<TaskPriority, Tone> = {
  low: "neutral",
  medium: "accent",
  high: "warning",
  urgent: "danger",
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge tone={taskStatusTone[status]} dot>
      {labelOf(taskStatuses, status)}
    </Badge>
  );
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge tone={projectStatusTone[status]} dot>
      {labelOf(projectStatuses, status)}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <Badge tone={priorityTone[priority]}>{labelOf(taskPriorities, priority)}</Badge>;
}

/** Due date that turns amber when close and red when overdue. */
export function DueDate({ date, done = false }: { date: string | null; done?: boolean }) {
  if (!date) return <span className="text-xs text-muted-foreground">No date</span>;
  const days = daysUntil(date);
  return (
    <span
      className={cn(
        "text-xs whitespace-nowrap tabular-nums",
        done
          ? "text-muted-foreground line-through"
          : days < 0
            ? "font-medium text-danger"
            : days <= 2
              ? "font-medium text-warning"
              : "text-muted-foreground",
      )}
    >
      {days < 0 && !done ? "Overdue, " : null}
      {formatDueDate(date)}
    </span>
  );
}

export function MemberAvatar({
  member,
  size = "sm",
}: {
  member: Member | undefined;
  size?: "sm" | "md";
}) {
  if (!member) {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full border border-dashed border-foreground/25 text-xs text-muted-foreground">
        ?
      </span>
    );
  }
  return <Avatar alt={member.name} size={size} />;
}

export function ProjectDot({ color, className }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2.5 shrink-0 rounded-full", className)}
      style={{ backgroundColor: color }}
    />
  );
}

/** Runs a workspace action and reports the outcome with a toast. */
export function useRunAction() {
  return useCallback(async <T,>(promise: Promise<T>, success?: string): Promise<T | undefined> => {
    try {
      const result = await promise;
      if (success) toast({ title: success, tone: "success" });
      return result;
    } catch (error) {
      toast({
        title: "That did not work",
        description: error instanceof WorkspaceError ? error.message : "Please try again.",
        tone: "danger",
      });
      return undefined;
    }
  }, []);
}

/** Holds the screen until the workspace is loaded, with a skeleton and an error state. */
export function WorkspaceGate({ children }: { children: ReactNode }) {
  const state = useWorkspaceState();
  const { reload } = useWorkspaceActions();

  if (state.status === "loading") {
    return (
      <div className="space-y-6" aria-busy="true" aria-label="Loading workspace">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-32 rounded-surface" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-surface" />
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <EmptyState
        title="The workspace could not be loaded"
        description={state.error.message}
        action={<Button onClick={() => void reload()}>Try again</Button>}
      />
    );
  }
  return children;
}

/** Title row at the top of every workspace page. */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0 space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
