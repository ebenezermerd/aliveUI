"use client";

import {
  Button,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Textarea,
} from "@aliveui/ui";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  memberRoles,
  projectColors,
  projectStatuses,
  taskPriorities,
  taskStatuses,
} from "../constants.js";
import { fromISODate, toISODate } from "../dates.js";
import { useWorkspace, useWorkspaceActions } from "../react/provider.js";
import {
  memberSchema,
  projectSchema,
  taskSchema,
  toFieldErrors,
  type FieldErrors,
} from "../schemas.js";
import type { MemberRole, Project, ProjectInput, Task, TaskInput } from "../types.js";
import { useRunAction } from "./shared.js";

const unassigned = "none";

interface FormBodyProps {
  title: string;
  description?: string;
  errors: FieldErrors;
  pending: boolean;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  children: ReactNode;
}

/** Header, fields and footer of a dialog form. Lives inside `DialogContent`. */
function FormBody({
  title,
  description,
  errors,
  pending,
  submitLabel,
  onCancel,
  onSubmit,
  children,
}: FormBodyProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? <DialogDescription>{description}</DialogDescription> : null}
      </DialogHeader>
      <Form
        errors={errors}
        noValidate
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? <Spinner size="sm" label="Saving" /> : null}
            {submitLabel}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
}

/**
 * Base UI unmounts dialog content when it closes, so each form below keeps
 * its state in a child of `DialogContent` and starts fresh every time it opens.
 */
function DialogFrame({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">{children}</DialogContent>
    </Dialog>
  );
}

function DueDateField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <Field name="dueDate">
      <FieldLabel nativeLabel={false} render={<div />}>
        Due date
      </FieldLabel>
      <div className="flex items-center gap-2">
        <DatePicker
          aria-label="Due date"
          value={value ? fromISODate(value) : null}
          onValueChange={(date) => onChange(toISODate(date))}
          className="flex-1"
        />
        {value ? (
          <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
            Clear
          </Button>
        ) : null}
      </div>
      <FieldError />
    </Field>
  );
}

export interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Edit this project, or create a new one when omitted. */
  project?: Project;
  onSaved?: (project: Project) => void;
}

export function ProjectDialog({ open, onOpenChange, project, onSaved }: ProjectDialogProps) {
  return (
    <DialogFrame open={open} onOpenChange={onOpenChange}>
      <ProjectForm
        project={project}
        onDone={(saved) => {
          onOpenChange(false);
          if (saved) onSaved?.(saved);
        }}
      />
    </DialogFrame>
  );
}

function ProjectForm({
  project: incoming,
  onDone,
}: {
  project?: Project;
  onDone: (saved?: Project) => void;
}) {
  // Keep the record from when the dialog opened, so the exit animation never flickers.
  const [project] = useState(incoming);
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [values, setValues] = useState<ProjectInput>(() => initialProject(project));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  async function submit() {
    const parsed = projectSchema.safeParse(values);
    if (!parsed.success) return setErrors(toFieldErrors(parsed.error));
    setPending(true);
    const saved = await run(
      project ? actions.updateProject(project.id, parsed.data) : actions.createProject(parsed.data),
      project ? "Project updated" : "Project created",
    );
    setPending(false);
    if (saved) onDone(saved);
  }

  return (
    <FormBody
      title={project ? "Edit project" : "New project"}
      description="Projects group related tasks and track progress together."
      errors={errors}
      pending={pending}
      submitLabel={project ? "Save changes" : "Create project"}
      onCancel={() => onDone()}
      onSubmit={() => void submit()}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input
          value={values.name}
          onChange={(event) => set("name", event.currentTarget.value)}
          placeholder="Website relaunch"
          autoFocus
        />
        <FieldError />
      </Field>
      <Field name="description">
        <FieldLabel>Description</FieldLabel>
        <Textarea
          value={values.description}
          onChange={(event) => set("description", event.currentTarget.value)}
          placeholder="What is this project about?"
          className="min-h-20"
        />
        <FieldError />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="status">
          <FieldLabel nativeLabel={false} render={<div />}>
            Status
          </FieldLabel>
          <Select
            aria-label="Status"
            items={projectStatuses}
            value={values.status}
            onValueChange={(value) => value && set("status", value)}
            className="w-full"
          />
        </Field>
        <DueDateField value={values.dueDate} onChange={(value) => set("dueDate", value)} />
      </div>
      <Field name="color">
        <FieldLabel nativeLabel={false} render={<div />}>
          Colour
        </FieldLabel>
        <RadioGroup
          aria-label="Colour"
          value={values.color}
          onValueChange={(value) => set("color", value as string)}
          className="flex-row flex-wrap gap-2.5"
        >
          {projectColors.map((color) => (
            <Radio
              key={color}
              value={color}
              aria-label={color}
              className="size-7 border-0 data-checked:ring-2 data-checked:ring-foreground/60 data-checked:ring-offset-2 data-checked:ring-offset-transparent"
              style={{ backgroundColor: color }}
            />
          ))}
        </RadioGroup>
      </Field>
    </FormBody>
  );
}

function initialProject(project?: Project): ProjectInput {
  return project
    ? {
        name: project.name,
        description: project.description,
        status: project.status,
        color: project.color,
        dueDate: project.dueDate,
      }
    : { name: "", description: "", status: "active", color: projectColors[0], dueDate: null };
}

export interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Edit this task, or create a new one when omitted. */
  task?: Task;
  /** Starting values for a new task, such as the project or column it was created from. */
  defaults?: Partial<TaskInput>;
}

export function TaskDialog({ open, onOpenChange, task, defaults }: TaskDialogProps) {
  return (
    <DialogFrame open={open} onOpenChange={onOpenChange}>
      <TaskForm task={task} defaults={defaults} onDone={() => onOpenChange(false)} />
    </DialogFrame>
  );
}

function TaskForm({
  task: incoming,
  defaults,
  onDone,
}: {
  task?: Task;
  defaults?: Partial<TaskInput>;
  onDone: () => void;
}) {
  const [task] = useState(incoming);
  const { projects, members } = useWorkspace();
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const initial = (): TaskInput =>
    task
      ? {
          projectId: task.projectId,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          assigneeId: task.assigneeId,
          dueDate: task.dueDate,
        }
      : {
          projectId: projects[0]?.id ?? "",
          title: "",
          description: "",
          status: "todo",
          priority: "medium",
          assigneeId: null,
          dueDate: null,
          ...defaults,
        };
  const [values, setValues] = useState<TaskInput>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const set = <K extends keyof TaskInput>(key: K, value: TaskInput[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  async function submit() {
    const parsed = taskSchema.safeParse(values);
    if (!parsed.success) return setErrors(toFieldErrors(parsed.error));
    setPending(true);
    const saved = await run(
      task ? actions.updateTask(task.id, parsed.data) : actions.createTask(parsed.data),
      task ? "Task updated" : "Task created",
    );
    setPending(false);
    if (saved) onDone();
  }

  const assignees = [
    { value: unassigned, label: "Unassigned" },
    ...members
      .filter((member) => member.status === "active")
      .map((member) => ({ value: member.id, label: member.name })),
  ];

  return (
    <FormBody
      title={task ? "Edit task" : "New task"}
      errors={errors}
      pending={pending}
      submitLabel={task ? "Save changes" : "Create task"}
      onCancel={onDone}
      onSubmit={() => void submit()}
    >
      <Field name="title">
        <FieldLabel>Title</FieldLabel>
        <Input
          value={values.title}
          onChange={(event) => set("title", event.currentTarget.value)}
          placeholder="What needs to be done?"
          autoFocus
        />
        <FieldError />
      </Field>
      <Field name="description">
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          value={values.description}
          onChange={(event) => set("description", event.currentTarget.value)}
          placeholder="Add details, links or acceptance criteria"
          className="min-h-20"
        />
        <FieldError />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="projectId">
          <FieldLabel nativeLabel={false} render={<div />}>
            Project
          </FieldLabel>
          <Select
            aria-label="Project"
            items={projects.map((project) => ({ value: project.id, label: project.name }))}
            value={values.projectId || null}
            placeholder="Choose a project"
            onValueChange={(value) => value && set("projectId", value)}
            className="w-full"
          />
          <FieldError />
        </Field>
        <Field name="assigneeId">
          <FieldLabel nativeLabel={false} render={<div />}>
            Assignee
          </FieldLabel>
          <Select
            aria-label="Assignee"
            items={assignees}
            value={values.assigneeId ?? unassigned}
            onValueChange={(value) =>
              set("assigneeId", !value || value === unassigned ? null : value)
            }
            className="w-full"
          />
        </Field>
        <Field name="status">
          <FieldLabel nativeLabel={false} render={<div />}>
            Status
          </FieldLabel>
          <Select
            aria-label="Status"
            items={taskStatuses}
            value={values.status}
            onValueChange={(value) => value && set("status", value)}
            className="w-full"
          />
        </Field>
        <Field name="priority">
          <FieldLabel nativeLabel={false} render={<div />}>
            Priority
          </FieldLabel>
          <Select
            aria-label="Priority"
            items={taskPriorities}
            value={values.priority}
            onValueChange={(value) => value && set("priority", value)}
            className="w-full"
          />
        </Field>
      </div>
      <DueDateField value={values.dueDate} onChange={(value) => set("dueDate", value)} />
    </FormBody>
  );
}

export interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const invitableRoles = memberRoles.filter((role) => role.value !== "owner");

export function InviteDialog({ open, onOpenChange }: InviteDialogProps) {
  return (
    <DialogFrame open={open} onOpenChange={onOpenChange}>
      <InviteForm onDone={() => onOpenChange(false)} />
    </DialogFrame>
  );
}

function InviteForm({ onDone }: { onDone: () => void }) {
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [values, setValues] = useState({ name: "", email: "", role: "member" as MemberRole });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  async function submit() {
    const parsed = memberSchema.safeParse(values);
    if (!parsed.success) return setErrors(toFieldErrors(parsed.error));
    setPending(true);
    const member = await run(
      actions.inviteMember(parsed.data),
      `Invitation sent to ${parsed.data.email}`,
    );
    setPending(false);
    if (member) onDone();
  }

  return (
    <FormBody
      title="Invite a teammate"
      description="They will appear as invited until they accept."
      errors={errors}
      pending={pending}
      submitLabel="Send invite"
      onCancel={onDone}
      onSubmit={() => void submit()}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input
          value={values.name}
          onChange={(event) => setValues({ ...values, name: event.currentTarget.value })}
          placeholder="Grace Hopper"
          autoFocus
        />
        <FieldError />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input
          type="email"
          value={values.email}
          onChange={(event) => setValues({ ...values, email: event.currentTarget.value })}
          placeholder="grace@example.com"
        />
        <FieldError />
      </Field>
      <Field name="role">
        <FieldLabel nativeLabel={false} render={<div />}>
          Role
        </FieldLabel>
        <RadioGroup
          aria-label="Role"
          value={values.role}
          onValueChange={(value) => setValues({ ...values, role: value as MemberRole })}
          className="gap-2"
        >
          {invitableRoles.map((role) => (
            <label
              key={role.value}
              className="surface-well flex cursor-pointer items-start gap-3 rounded-xl p-3 has-[[data-checked]]:border-accent/50"
            >
              <Radio value={role.value} className="mt-0.5" />
              <span>
                <span className="block text-sm font-medium">{role.label}</span>
                <span className="block text-xs text-muted-foreground">{role.description}</span>
              </span>
            </label>
          ))}
        </RadioGroup>
      </Field>
    </FormBody>
  );
}
