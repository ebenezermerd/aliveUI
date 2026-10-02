"use client";

import { cn } from "@aliveui/primitives";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { PlusIcon } from "../../lib/icons.js";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type AccordionProps = WithClassName<BaseAccordion.Root.Props>;

/** Stacked sections that expand one or more at a time, inside one surface. */
export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cn("surface flex w-full flex-col rounded-surface px-2 shadow-raised", className)}
      {...props}
    />
  );
}

export type AccordionItemProps = WithClassName<BaseAccordion.Item.Props>;

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cn("border-b border-foreground/8 last:border-b-0", className)}
      {...props}
    />
  );
}

export type AccordionTriggerProps = WithClassName<BaseAccordion.Trigger.Props>;

/** The clickable heading of an item. Rendered inside an `h3` for document structure. */
export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="m-0">
      <BaseAccordion.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-4 rounded-xl px-3 py-4 text-left text-sm font-medium",
          "transition-colors hover:bg-foreground/5 data-disabled:opacity-50",
          focusRing,
          className,
        )}
        {...props}
      >
        {children}
        <PlusIcon className="size-4 shrink-0 opacity-60 transition-transform duration-(--alive-duration-base) ease-spring group-data-panel-open:rotate-45" />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export type AccordionPanelProps = WithClassName<BaseAccordion.Panel.Props>;

export function AccordionPanel({ className, children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden text-sm text-muted-foreground",
        "transition-[height] duration-(--alive-duration-base) ease-standard data-starting-style:h-0 data-ending-style:h-0",
        "motion-reduce:transition-none",
      )}
      {...props}
    >
      <div className={cn("px-3 pb-4", className)}>{children}</div>
    </BaseAccordion.Panel>
  );
}
