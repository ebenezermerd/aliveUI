"use client";

import { cn } from "@aliveui/primitives";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { WithClassName } from "../../lib/styles.js";

export type SeparatorProps = WithClassName<BaseSeparator.Props>;

/** A hairline divider that reads on any surface. */
export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        "shrink-0 bg-foreground/10",
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
        className,
      )}
      {...props}
    />
  );
}
