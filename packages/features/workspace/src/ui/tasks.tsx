"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Checkbox,
  EmptyState,
  Surface,
  IconButton,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Pagination,
  SegmentedControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@aliveui/ui";
import { cn } from "@aliveui/primitives";
import { useMemo, useState, type DragEvent } from "react";
import { taskPriorities, taskStatuses } from "../constants.js";
import { useFilteredTasks, useLookups } from "../react/hooks.js";
import { useWorkspace, useWorkspaceActions } from "../react/provider.js";
import type { TaskFilters } from "../selectors.js";
import type { Task, TaskPriority, TaskStatus } from "../types.js";
import { TaskDialog } from "./dialogs.js";
import {
  DueDate,
  MemberAvatar,
  PageHeader,
  PriorityBadge,
  ProjectDot,
  TaskStatusBadge,
  useRunAction,
} from "./shared.js";

const any = "any";

function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="3.5" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="12.5" cy="8" r="1.25" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

/** Edit, move and delete one task. Shared by the board and the list. */
export function TaskActions({ task, onEdit }: { task: Task; onEdit: () => void }) {
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [confirming, setConfirming] = useState(false);
  return (
    <>
      <Menu>
        <MenuTrigger
          render={<IconButton aria-label={`Actions for ${task.title}`} variant="ghost" size="sm" />}
        >
          <DotsIcon />
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem onClick={onEdit}>Edit task</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Move to</MenuSubmenuTrigger>
            <MenuContent side="right" sideOffset={4}>
              <MenuRadioGroup
                value={task.status}
                onValueChange={(value) =>
                  void run(actions.updateTask(task.id, { status: value as TaskStatus }))
                }
              >
                {taskStatuses.map((status) => (
                  <MenuRadioItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuContent>
          </MenuSubmenu>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Priority</MenuSubmenuTrigger>
            <MenuContent side="right" sideOffset={4}>
              <MenuRadioGroup
                value={task.priority}
                onValueChange={(value) =>
                  void run(actions.updateTask(task.id, { priority: value as TaskPriority }))
                }
              >
                {taskPriorities.map((priority) => (
                  <MenuRadioItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuContent>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem destructive onClick={() => setConfirming(true)}>
            Delete task
          </MenuItem>
        </MenuContent>
      </Menu>
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{task.title}&rdquo; will be removed for everyone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button />}>Cancel</AlertDialogClose>
            <AlertDialogClose
              render={<Button variant="danger" />}
              onClick={() => void run(actions.deleteTask(task.id), "Task deleted")}
            >
              Delete
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function TaskCard({
  task,
  onEdit,
  showProject,
}: {
  task: Task;
  onEdit: () => void;
  showProject: boolean;
}) {
  const lookups = useLookups();
  const project = lookups.project.get(task.projectId);
  const [dragging, setDragging] = useState(false);
  return (
    <Surface
      elevation="raised"
      padding="none"
      draggable
      onDragStart={(event: DragEvent) => {
        event.dataTransfer.setData("text/task-id", task.id);
        event.dataTransfer.effectAllowed = "move";
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
      className={cn(
        "cursor-grab space-y-3 rounded-2xl p-3.5 transition-[opacity,scale] active:cursor-grabbing",
        dragging && "scale-95 opacity-50",
      )}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="min-w-0 flex-1 rounded-md text-left text-sm font-medium outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          {task.title}
        </button>
        <TaskActions task={task} onEdit={onEdit} />
      </div>
      {showProject && project ? (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ProjectDot color={project.color} className="size-2" />
          <span className="truncate">{project.name}</span>
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <DueDate date={task.dueDate} done={task.status === "done"} />
        </div>
        <MemberAvatar member={task.assigneeId ? lookups.member.get(task.assigneeId) : undefined} />
      </div>
    </Surface>
  );
}

function Board({
  tasks,
  showProject,
  onEdit,
  onCreate,
}: {
  tasks: Task[];
  showProject: boolean;
  onEdit: (task: Task) => void;
  onCreate: (status: TaskStatus) => void;
}) {
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [over, setOver] = useState<TaskStatus | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {taskStatuses.map((status) => {
        const column = tasks.filter((task) => task.status === status.value);
        return (
          <section
            key={status.value}
            aria-label={status.label}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setOver(status.value);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(null);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setOver(null);
              const id = event.dataTransfer.getData("text/task-id");
              const task = tasks.find((item) => item.id === id);
              if (task && task.status !== status.value) {
                void run(actions.updateTask(id, { status: status.value }));
              }
            }}
            className={cn(
              "surface-well flex min-h-64 flex-col gap-3 rounded-surface p-3 transition-[background-color,box-shadow]",
              over === status.value && "bg-accent/10 ring-2 ring-accent/40",
            )}
          >
            <header className="flex items-center justify-between px-1">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                {status.label}
                <Badge>{column.length}</Badge>
              </h2>
              <IconButton
                aria-label={`Add task to ${status.label}`}
                variant="ghost"
                size="sm"
                onClick={() => onCreate(status.value)}
              >
                <PlusIcon />
              </IconButton>
            </header>
            {column.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                showProject={showProject}
                onEdit={() => onEdit(task)}
              />
            ))}
            {column.length === 0 ? (
              <p className="m-auto px-4 py-8 text-center text-xs text-muted-foreground">
                Drop tasks here
              </p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

const pageSize = 10;

function List({
  tasks,
  showProject,
  onEdit,
}: {
  tasks: Task[];
  showProject: boolean;
  onEdit: (task: Task) => void;
}) {
  const lookups = useLookups();
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(tasks.length / pageSize));
  const current = Math.min(page, pageCount);
  const rows = tasks.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <span className="sr-only">Done</span>
            </TableHead>
            <TableHead>Task</TableHead>
            {showProject ? <TableHead>Project</TableHead> : null}
            <TableHead>Assignee</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((task) => {
            const project = lookups.project.get(task.projectId);
            const member = task.assigneeId ? lookups.member.get(task.assigneeId) : undefined;
            return (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    aria-label={
                      task.status === "done" ? `Reopen ${task.title}` : `Complete ${task.title}`
                    }
                    checked={task.status === "done"}
                    onCheckedChange={(checked) =>
                      void run(
                        actions.updateTask(task.id, { status: checked ? "done" : "todo" }),
                        checked ? "Task completed" : "Task reopened",
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => onEdit(task)}
                    className={cn(
                      "rounded-md text-left font-medium hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      task.status === "done" && "text-muted-foreground line-through",
                    )}
                  >
                    {task.title}
                  </button>
                </TableCell>
                {showProject ? (
                  <TableCell>
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <ProjectDot color={project?.color ?? "#94a3b8"} />
                      {project?.name}
                    </span>
                  </TableCell>
                ) : null}
                <TableCell>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <MemberAvatar member={member} />
                    <span className="text-sm">{member?.name ?? "Unassigned"}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  <DueDate date={task.dueDate} done={task.status === "done"} />
                </TableCell>
                <TableCell>
                  <TaskActions task={task} onEdit={() => onEdit(task)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {pageCount > 1 ? (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {(current - 1) * pageSize + 1} to {Math.min(current * pageSize, tasks.length)} of{" "}
            {tasks.length}
          </p>
          <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
        </div>
      ) : null}
    </div>
  );
}

const layouts = [
  { value: "board", label: "Board" },
  { value: "list", label: "List" },
] as const;

export interface TasksViewProps {
  /** Show only one project's tasks, as on the project page. */
  projectId?: string;
  /** Hide the page title, when embedded in another page. */
  embedded?: boolean;
}

/** Every task as a drag and drop board or a list, with search and filters. */
export function TasksView({ projectId, embedded = false }: TasksViewProps) {
  const { projects, members, tasks: all } = useWorkspace();
  const [query, setQuery] = useState("");
  const [project, setProject] = useState<string>(any);
  const [assignee, setAssignee] = useState<string>(any);
  const [priority, setPriority] = useState<string>(any);
  const [layout, setLayout] = useState<"board" | "list">("board");
  const [editing, setEditing] = useState<Task | null>(null);
  const [creating, setCreating] = useState<TaskStatus | null>(null);

  const filters = useMemo<TaskFilters>(
    () => ({
      query,
      projectId: projectId ?? (project === any ? null : project),
      assigneeId: assignee === any ? null : assignee,
      priority: priority === any ? null : (priority as TaskPriority),
    }),
    [query, projectId, project, assignee, priority],
  );
  const tasks = useFilteredTasks(filters);
  const filtered = query !== "" || project !== any || assignee !== any || priority !== any;
  const scopeCount = projectId
    ? all.filter((task) => task.projectId === projectId).length
    : all.length;

  const toolbar = (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Input
        aria-label="Search tasks"
        placeholder="Search tasks"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        className="w-full sm:w-64"
      />
      {projectId ? null : (
        <Select
          aria-label="Project"
          items={[
            { value: any, label: "All projects" },
            ...projects.map((item) => ({ value: item.id, label: item.name })),
          ]}
          value={project}
          onValueChange={(value) => setProject(value ?? any)}
        />
      )}
      <Select
        aria-label="Assignee"
        items={[
          { value: any, label: "Anyone" },
          ...members
            .filter((member) => member.status === "active")
            .map((member) => ({ value: member.id, label: member.name })),
        ]}
        value={assignee}
        onValueChange={(value) => setAssignee(value ?? any)}
      />
      <Select
        aria-label="Priority"
        items={[{ value: any, label: "Any priority" }, ...taskPriorities]}
        value={priority}
        onValueChange={(value) => setPriority(value ?? any)}
        className="min-w-36"
      />
      {filtered ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setQuery("");
            setProject(any);
            setAssignee(any);
            setPriority(any);
          }}
        >
          Clear filters
        </Button>
      ) : null}
      <SegmentedControl
        items={layouts}
        value={layout}
        onValueChange={setLayout}
        aria-label="Layout"
        className="ml-auto"
      />
    </div>
  );

  return (
    <>
      {embedded ? null : (
        <PageHeader
          title="Tasks"
          description={`${tasks.length} of ${scopeCount} tasks shown.`}
          actions={
            <Button
              variant="primary"
              onClick={() => setCreating("todo")}
              disabled={projects.length === 0}
            >
              New task
            </Button>
          }
        />
      )}
      {embedded ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Tasks</h2>
          <Button variant="primary" size="sm" onClick={() => setCreating("todo")}>
            Add task
          </Button>
        </div>
      ) : null}
      {toolbar}
      {projects.length === 0 ? (
        <Surface>
          <EmptyState
            title="Create a project first"
            description="Tasks belong to projects, so start with one."
          />
        </Surface>
      ) : layout === "board" ? (
        <Board tasks={tasks} showProject={!projectId} onEdit={setEditing} onCreate={setCreating} />
      ) : tasks.length === 0 ? (
        <Surface>
          <EmptyState title="No tasks match" description="Try clearing the filters." />
        </Surface>
      ) : (
        <List tasks={tasks} showProject={!projectId} onEdit={setEditing} />
      )}
      <TaskDialog
        open={creating !== null}
        onOpenChange={(open) => !open && setCreating(null)}
        defaults={{ status: creating ?? "todo", ...(projectId ? { projectId } : {}) }}
      />
      <TaskDialog
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
        task={editing ?? undefined}
      />
    </>
  );
}
