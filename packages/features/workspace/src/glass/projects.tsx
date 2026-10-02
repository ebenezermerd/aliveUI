"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AvatarGroup,
  Button,
  EmptyState,
  GlassSurface,
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
  Progress,
  SegmentedControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@aliveui/glass";
import { useMemo, useState } from "react";
import { projectStatuses } from "../constants.js";
import { useLookups, useProjectsWithProgress } from "../react/hooks.js";
import { useWorkspace, useWorkspaceActions } from "../react/provider.js";
import type { Project, ProjectStatus } from "../types.js";
import { ProjectDialog } from "./dialogs.js";
import {
  DueDate,
  MemberAvatar,
  PageHeader,
  ProjectDot,
  ProjectStatusBadge,
  useRunAction,
} from "./shared.js";

function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="3.5" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="12.5" cy="8" r="1.25" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 opacity-50"
    >
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.25 10.25 3 3" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectActions({
  project,
  onEdit,
  onDeleted,
}: {
  project: Project;
  onEdit: () => void;
  onDeleted?: () => void;
}) {
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [confirming, setConfirming] = useState(false);
  return (
    <>
      <Menu>
        <MenuTrigger
          render={
            <IconButton aria-label={`Actions for ${project.name}`} variant="ghost" size="sm" />
          }
        >
          <DotsIcon />
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem onClick={onEdit}>Edit project</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Status</MenuSubmenuTrigger>
            <MenuContent side="right" sideOffset={4}>
              <MenuRadioGroup
                value={project.status}
                onValueChange={(value) =>
                  void run(
                    actions.updateProject(project.id, { status: value as ProjectStatus }),
                    "Status updated",
                  )
                }
              >
                {projectStatuses.map((status) => (
                  <MenuRadioItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuContent>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem destructive onClick={() => setConfirming(true)}>
            Delete project
          </MenuItem>
        </MenuContent>
      </Menu>
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {project.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Its tasks are deleted too. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button />}>Cancel</AlertDialogClose>
            <AlertDialogClose
              render={<Button variant="danger" />}
              onClick={() => {
                void run(actions.deleteProject(project.id), "Project deleted").then(() =>
                  onDeleted?.(),
                );
              }}
            >
              Delete
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const statusFilters = [{ value: "all", label: "All" }, ...projectStatuses] as const;
const layouts = [
  { value: "grid", label: "Grid" },
  { value: "table", label: "Table" },
] as const;

export interface ProjectsViewProps {
  onOpenProject: (id: string) => void;
}

/** Every project as cards or a table, with search, status filters and full editing. */
export function ProjectsView({ onOpenProject }: ProjectsViewProps) {
  const rows = useProjectsWithProgress();
  const { tasks } = useWorkspace();
  const lookups = useLookups();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statusFilters)[number]["value"]>("all");
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    return rows.filter(
      ({ project }) =>
        (status === "all" || project.status === status) &&
        (!text ||
          project.name.toLowerCase().includes(text) ||
          project.description.toLowerCase().includes(text)),
    );
  }, [rows, query, status]);

  const contributors = (projectId: string) =>
    [
      ...new Set(
        tasks
          .filter((task) => task.projectId === projectId && task.assigneeId)
          .map((task) => task.assigneeId!),
      ),
    ]
      .slice(0, 4)
      .map((id) => lookups.member.get(id))
      .filter((member) => member !== undefined);

  return (
    <>
      <PageHeader
        title="Projects"
        description={`${rows.length} projects in this workspace.`}
        actions={
          <Button variant="tinted" onClick={() => setCreating(true)}>
            New project
          </Button>
        }
      />
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <SearchIcon />
          <Input
            aria-label="Search projects"
            placeholder="Search projects"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="pl-10"
          />
        </div>
        <SegmentedControl
          items={statusFilters}
          value={status}
          onValueChange={setStatus}
          aria-label="Filter by status"
        />
        <SegmentedControl
          items={layouts}
          value={layout}
          onValueChange={setLayout}
          aria-label="Layout"
          className="ml-auto"
        />
      </div>

      {visible.length === 0 ? (
        <GlassSurface>
          <EmptyState
            title={rows.length === 0 ? "No projects yet" : "No projects match"}
            description={
              rows.length === 0
                ? "Create a project to start organising tasks."
                : "Try another search or status."
            }
            action={
              rows.length === 0 ? (
                <Button variant="tinted" onClick={() => setCreating(true)}>
                  New project
                </Button>
              ) : undefined
            }
          />
        </GlassSurface>
      ) : layout === "grid" ? (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(({ project, progress }) => (
            <li key={project.id}>
              <GlassSurface
                padding="none"
                className="group flex h-full flex-col gap-4 p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 size-9 shrink-0 rounded-xl shadow-raised"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => onOpenProject(project.id)}
                    className="min-w-0 flex-1 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="block truncate font-semibold group-hover:underline">
                      {project.name}
                    </span>
                    <span className="line-clamp-2 text-sm text-muted-foreground">
                      {project.description || "No description"}
                    </span>
                  </button>
                  <ProjectActions project={project} onEdit={() => setEditing(project)} />
                </div>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {progress.done} of {progress.total} tasks done
                    </span>
                    <span className="tabular-nums">{progress.percent}%</span>
                  </div>
                  <Progress value={progress.percent} aria-label={`${project.name} progress`} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <ProjectStatusBadge status={project.status} />
                  <div className="flex items-center gap-3">
                    <DueDate date={project.dueDate} done={project.status === "completed"} />
                    <AvatarGroup>
                      {contributors(project.id).map((member) => (
                        <MemberAvatar key={member.id} member={member} />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
              </GlassSurface>
            </li>
          ))}
        </ul>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-48">Progress</TableHead>
              <TableHead>Due</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map(({ project, progress }) => (
              <TableRow key={project.id}>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => onOpenProject(project.id)}
                    className="flex items-center gap-2.5 rounded-md text-left font-medium hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <ProjectDot color={project.color} />
                    {project.name}
                  </button>
                </TableCell>
                <TableCell>
                  <ProjectStatusBadge status={project.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={progress.percent} aria-label={`${project.name} progress`} />
                    <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                      {progress.percent}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DueDate date={project.dueDate} done={project.status === "completed"} />
                </TableCell>
                <TableCell>
                  <ProjectActions project={project} onEdit={() => setEditing(project)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ProjectDialog
        open={creating}
        onOpenChange={setCreating}
        onSaved={(project) => onOpenProject(project.id)}
      />
      <ProjectDialog
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
        project={editing ?? undefined}
      />
    </>
  );
}
