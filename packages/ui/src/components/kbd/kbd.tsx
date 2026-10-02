import { cn } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

/** A keyboard key, for shortcuts like ⌘ K. */
export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "surface inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 font-sans text-xs font-medium text-muted-foreground shadow-raised",
        className,
      )}
      {...props}
    />
  );
}
