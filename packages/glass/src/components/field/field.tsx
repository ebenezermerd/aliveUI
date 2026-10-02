"use client";

import { cn } from "@aliveui/primitives";
import { Field as BaseField } from "@base-ui/react/field";
import type { WithClassName } from "../../lib/styles.js";

export type FieldProps = WithClassName<BaseField.Root.Props>;

/** Groups a control with its label, description and error, and wires up their ids. */
export function Field({ className, ...props }: FieldProps) {
  return <BaseField.Root className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export type FieldLabelProps = WithClassName<BaseField.Label.Props>;

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cn("text-sm font-medium text-foreground data-disabled:opacity-50", className)}
      {...props}
    />
  );
}

export type FieldDescriptionProps = WithClassName<BaseField.Description.Props>;

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

export type FieldErrorProps = WithClassName<BaseField.Error.Props>;

/** Shown when the control is invalid. Use `match` to target a specific validity state. */
export function FieldError({ className, ...props }: FieldErrorProps) {
  return <BaseField.Error className={cn("text-xs text-danger", className)} {...props} />;
}
