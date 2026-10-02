"use client";

import { useState } from "react";
import type { z } from "zod";
import { authErrorMessage } from "../errors.js";
import { toFieldErrors, type FieldErrors } from "../schemas.js";

export interface AuthFormState {
  pending: boolean;
  /** A message about the whole form, such as wrong credentials. */
  formError: string | null;
  fieldErrors: FieldErrors;
}

const idle: AuthFormState = { pending: false, formError: null, fieldErrors: {} };

/**
 * Validates values with a schema, runs an adapter call and tracks pending and
 * error state. Any design system can render a form from what this returns.
 */
export function useAuthForm<Schema extends z.ZodType, Result>(
  schema: Schema,
  action: (values: z.output<Schema>) => Promise<Result>,
  onSuccess?: (result: Result) => void,
) {
  const [state, setState] = useState<AuthFormState>(idle);

  async function submit(values: unknown): Promise<boolean> {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setState({ ...idle, fieldErrors: toFieldErrors(parsed.error) });
      return false;
    }
    setState({ ...idle, pending: true });
    try {
      const result = await action(parsed.data);
      setState(idle);
      onSuccess?.(result);
      return true;
    } catch (error) {
      setState({ ...idle, formError: authErrorMessage(error) });
      return false;
    }
  }

  return { ...state, submit, reset: () => setState(idle) };
}
