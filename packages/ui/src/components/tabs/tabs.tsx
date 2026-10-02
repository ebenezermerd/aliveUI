"use client";

import { cn } from "@aliveui/primitives";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type TabsProps = WithClassName<BaseTabs.Root.Props>;

/** Switches between panels of related content. */
export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={cn("flex flex-col gap-4", className)} {...props} />;
}

export type TabsListProps = WithClassName<BaseTabs.List.Props>;

/** The row of tabs. A raised pill slides under the active one. */
export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      className={cn(
        "surface-well relative z-0 inline-flex w-fit items-center gap-1 rounded-full p-1",
        className,
      )}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        className={cn(
          "surface absolute top-(--active-tab-top) left-0 -z-10 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full shadow-raised",
          "transition-[translate,width] duration-(--alive-duration-base) ease-spring motion-reduce:transition-none",
        )}
      />
    </BaseTabs.List>
  );
}

export type TabProps = WithClassName<BaseTabs.Tab.Props>;

export function Tab({ className, ...props }: TabProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        "flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium whitespace-nowrap text-muted-foreground select-none",
        "transition-colors duration-(--alive-duration-fast) hover:text-foreground data-active:text-foreground",
        "data-disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export type TabsPanelProps = WithClassName<BaseTabs.Panel.Props>;

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={cn("outline-none", focusRing, className)} {...props} />;
}
