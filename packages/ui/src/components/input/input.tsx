"use client";

import { cn } from "@aliveui/primitives";
import { Input as BaseInput } from "@base-ui/react/input";
import type { WithClassName } from "../../lib/styles.js";

/** Shared look for single and multi line text fields. */
export const fieldControl = cn(
  "glass-well w-full rounded-xl px-3.5 text-sm text-foreground placeholder:text-muted-foreground",
  "transition-[border-color,box-shadow,background-color] duration-(--alive-duration-base) ease-standard",
  "outline-none focus:border-accent/60 focus:ring-4 focus:ring-ring/25",
  "data-invalid:border-danger/70 data-invalid:focus:ring-danger/25",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export type InputProps = WithClassName<BaseInput.Props>;

/** A single line text field. Wire it to a label with `Field`, or give it an `aria-label`. */
export function Input({ className, ...props }: InputProps) {
  return <BaseInput className={cn(fieldControl, "h-10", className)} {...props} />;
}
