"use client";

import { cn } from "@aliveui/primitives";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { WithClassName } from "../../lib/styles.js";

export type FieldsetProps = WithClassName<BaseFieldset.Root.Props>;

/** Groups related fields under a legend. Disabling it disables every field inside. */
export function Fieldset({ className, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root
      className={cn("flex flex-col gap-4 border-0 p-0 data-disabled:opacity-60", className)}
      {...props}
    />
  );
}

export type FieldsetLegendProps = WithClassName<BaseFieldset.Legend.Props>;

export function FieldsetLegend({ className, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      className={cn("mb-1 text-base font-semibold tracking-tight", className)}
      {...props}
    />
  );
}
