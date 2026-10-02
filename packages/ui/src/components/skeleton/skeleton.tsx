import { cn } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/** A placeholder block with a soft light sweep, shown while content loads. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "glass-well rounded-xl bg-[linear-gradient(100deg,transparent_30%,oklch(1_0_0/0.35)_50%,transparent_70%)] bg-size-[200%_100%]",
        "motion-safe:animate-[glass-shimmer_1.6s_ease-in-out_infinite]",
        className,
      )}
      {...props}
    />
  );
}
