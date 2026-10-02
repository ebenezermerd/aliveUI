import { z } from "zod";

/** Validation shared by every form that edits workspace data. */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date.")
  .nullable();

export const projectSchema = z.object({
  name: z.string().trim().min(2, "Give the project a name.").max(60, "Use at most 60 characters."),
  description: z.string().trim().max(280, "Use at most 280 characters.").default(""),
  status: z.enum(["planning", "active", "paused", "completed"]),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, "Pick a colour."),
  dueDate: isoDate.default(null),
});

export const taskSchema = z.object({
  projectId: z.string().min(1, "Choose a project."),
  title: z.string().trim().min(2, "Give the task a title.").max(120, "Use at most 120 characters."),
  description: z.string().trim().max(1000, "Use at most 1000 characters.").default(""),
  status: z.enum(["todo", "in_progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assigneeId: z.string().nullable().default(null),
  dueDate: isoDate.default(null),
});

export const memberSchema = z.object({
  name: z.string().trim().min(2, "Enter their name.").max(80, "Use at most 80 characters."),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  role: z.enum(["admin", "member", "viewer"]),
});

export const workspaceSchema = z.object({
  name: z.string().trim().min(2, "Name the workspace.").max(60, "Use at most 60 characters."),
});

export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
