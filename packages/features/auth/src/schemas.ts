import { z } from "zod";

/** Shared validation for every auth form, whatever design system renders it. */

export const passwordRules = { min: 8, max: 128 } as const;

const email = z.email("Enter a valid email address.").trim().toLowerCase();

const password = z
  .string()
  .min(passwordRules.min, `Use at least ${passwordRules.min} characters.`)
  .max(passwordRules.max, `Use at most ${passwordRules.max} characters.`);

const name = z.string().trim().min(2, "Enter your name.").max(80, "Use at most 80 characters.");

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
  remember: z.boolean().default(true),
});

export const signUpSchema = z
  .object({ name, email, password, confirmPassword: z.string() })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const profileSchema = z.object({ name });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    newPassword: password,
    confirmPassword: z.string(),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignInInput = z.input<typeof signInSchema>;
export type SignUpInput = z.input<typeof signUpSchema>;
export type ProfileInput = z.input<typeof profileSchema>;
export type ChangePasswordInput = z.input<typeof changePasswordSchema>;

/** Field errors keyed by field name, the shape `Form` expects for its `errors` prop. */
export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export type PasswordStrength = { score: 0 | 1 | 2 | 3 | 4; label: string };

/** A quick estimate for the strength meter. Length matters most, variety helps. */
export function passwordStrength(value: string): PasswordStrength {
  if (!value) return { score: 0, label: "" };
  let points = 0;
  if (value.length >= passwordRules.min) points += 1;
  if (value.length >= 12) points += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) points += 1;
  if (/\d/.test(value)) points += 0.5;
  if (/[^a-zA-Z0-9]/.test(value)) points += 0.5;
  const score = Math.min(4, Math.max(1, Math.floor(points))) as PasswordStrength["score"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"] as const;
  return { score, label: labels[score] };
}
