"use client";

import { Button, EmptyState, GlassSurface, Meter } from "@aliveui/glass";
import { useState } from "react";
import { useWorkspace } from "../react/provider.js";
import { countByStatus, projectProgress } from "../selectors.js";
import { ProjectDialog } from "./dialogs.js";
import { ProjectActions } from "./projects.js";
import { DueDate, PageHeader, ProjectStatusBadge } from "./shared.js";
import { TasksView } from "./tasks.js";

export interface ProjectDetailViewProps {
  projectId: string;
  /** Called when the project is missing or was just deleted. */
  onBack: () => void;
}

/** One project: its details, progress, and its own task board. */
export function ProjectDetailView({ projectId, onBack }: ProjectDetailViewProps) {
  const { projects, tasks } = useWorkspace();
  const project = projects.find((item) => item.id === projectId);
  const [editing, setEditing] = useState(false);

  if (!project) {
    return (
      <GlassSurface>
        <EmptyState
          title="Project not found"
          description="It may have been deleted."
          action={<Button onClick={onBack}>Back to projects</Button>}
        />
      </GlassSurface>
    );
  }

  const progress = projectProgress(project, tasks);
  const counts = countByStatus(tasks.filter((task) => task.projectId === project.id));

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span
              className="size-8 rounded-xl shadow-raised"
              style={{ backgroundColor: project.color }}
            />
            {project.name}
          </span>
        }
        description={project.description || "No description yet."}
        actions={
          <>
            <Button onClick={() => setEditing(true)}>Edit</Button>
            <ProjectActions project={project} onEdit={() => setEditing(true)} onDeleted={onBack} />
          </>
        }
      />
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassSurface elevation="raised" padding="none" className="space-y-2 p-5">
          <p className="text-sm text-muted-foreground">Status</p>
          <ProjectStatusBadge status={project.status} />
        </GlassSurface>
        <GlassSurface elevation="raised" padding="none" className="space-y-2 p-5">
          <p className="text-sm text-muted-foreground">Due</p>
          <DueDate date={project.dueDate} done={project.status === "completed"} />
        </GlassSurface>
        <GlassSurface elevation="raised" padding="none" className="space-y-2 p-5">
          <p className="text-sm text-muted-foreground">Open work</p>
          <p className="text-sm">
            <span className="text-2xl font-semibold tabular-nums">
              {progress.total - progress.done}
            </span>{" "}
            <span className="text-muted-foreground">open, {counts.review} in review</span>
          </p>
        </GlassSurface>
        <GlassSurface elevation="raised" padding="none" className="p-5">
          <Meter value={progress.percent} label="Completion" />
        </GlassSurface>
      </div>
      <TasksView projectId={project.id} embedded />
      <ProjectDialog open={editing} onOpenChange={setEditing} project={project} />
    </>
  );
}
