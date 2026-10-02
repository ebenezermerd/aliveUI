"use client";

import { cn } from "@aliveui/primitives";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { ChevronRightIcon } from "../../lib/icons.js";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type CollapsibleProps = WithClassName<BaseCollapsible.Root.Props>;

/** A single section that shows and hides its content. */
export function Collapsible({ className, ...props }: CollapsibleProps) {
  return <BaseCollapsible.Root className={cn("flex flex-col", className)} {...props} />;
}

export type CollapsibleTriggerProps = WithClassName<BaseCollapsible.Trigger.Props>;

export function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      className={cn(
        "group inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
        "transition-colors hover:bg-foreground/8",
        focusRing,
        className,
      )}
      {...props}
    >
      <ChevronRightIcon className="size-3.5 opacity-60 transition-transform duration-(--alive-duration-base) ease-spring group-data-panel-open:rotate-90" />
      {children}
    </BaseCollapsible.Trigger>
  );
}

export type CollapsiblePanelProps = WithClassName<BaseCollapsible.Panel.Props>;

export function CollapsiblePanel({ className, children, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden",
        "transition-[height] duration-(--alive-duration-base) ease-standard data-starting-style:h-0 data-ending-style:h-0",
        "motion-reduce:transition-none",
      )}
      {...props}
    >
      <div className={cn("pt-2", className)}>{children}</div>
    </BaseCollapsible.Panel>
  );
}
