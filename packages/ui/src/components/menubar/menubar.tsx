"use client";

import { cn } from "@aliveui/primitives";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type MenubarProps = WithClassName<BaseMenubar.Props>;

/**
 * A desktop style bar of menus. Put a `Menu` per entry inside, each with a
 * `MenubarTrigger` and a `MenuContent`.
 */
export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      className={cn(
        "glass inline-flex items-center gap-0.5 rounded-full p-1 shadow-raised",
        className,
      )}
      {...props}
    />
  );
}

export type MenubarTriggerProps = WithClassName<BaseMenu.Trigger.Props>;

export function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return (
    <BaseMenu.Trigger
      className={cn(
        "inline-flex h-8 items-center rounded-full px-3.5 text-sm font-medium select-none",
        "transition-colors hover:bg-foreground/8 data-popup-open:bg-foreground/10 data-disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}
