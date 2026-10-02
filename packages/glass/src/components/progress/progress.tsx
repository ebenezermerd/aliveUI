"use client";

import { cn } from "@aliveui/primitives";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ReactNode } from "react";
import type { WithClassName } from "../../lib/styles.js";

export type ProgressProps = WithClassName<BaseProgress.Root.Props> & {
  /** Visible label above the bar. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Show the formatted value next to the label. */
  showValue?: boolean;
};

/** Shows how far a task has come. Pass `value={null}` for an indeterminate bar. */
export function Progress({ className, label, showValue = false, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root className={cn("grid w-full grid-cols-2 gap-y-2", className)} {...props}>
      {label ? (
        <BaseProgress.Label className="text-sm font-medium">{label}</BaseProgress.Label>
      ) : null}
      {showValue ? (
        <BaseProgress.Value className="col-start-2 text-right text-sm text-muted-foreground tabular-nums" />
      ) : null}
      <BaseProgress.Track className="glass-well col-span-2 h-2 overflow-hidden rounded-full">
        <BaseProgress.Indicator
          className={cn(
            "rounded-full bg-accent transition-[width] duration-500 ease-standard",
            "data-indeterminate:w-1/3 data-indeterminate:animate-[glass-indeterminate_1.4s_ease-in-out_infinite]",
          )}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
