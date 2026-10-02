"use client";

import { cn } from "@aliveui/primitives";
import { Form as BaseForm } from "@base-ui/react/form";
import type { WithClassName } from "../../lib/styles.js";

export type FormProps = WithClassName<BaseForm.Props>;

/**
 * A form that understands `Field` validation. Pass server side `errors` keyed
 * by field name to show them under the matching fields.
 */
export function Form({ className, ...props }: FormProps) {
  return <BaseForm className={cn("flex flex-col gap-5", className)} {...props} />;
}
