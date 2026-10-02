"use client";

import { cn } from "@aliveui/primitives";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { focusRing, pressable, type WithClassName } from "../../lib/styles.js";

export type ToolbarProps = WithClassName<BaseToolbar.Root.Props>;

/** A floating glass bar of actions with arrow key navigation between them. */
export function Toolbar({ className, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root
      className={cn(
        "glass inline-flex items-center gap-1 rounded-full p-1.5 shadow-floating data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

export type ToolbarButtonProps = WithClassName<BaseToolbar.Button.Props>;

export function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-foreground select-none [&_svg]:size-4",
        "hover:bg-foreground/8 active:bg-foreground/12 data-pressed:bg-foreground/12",
        "data-disabled:opacity-40",
        pressable,
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export type ToolbarGroupProps = WithClassName<BaseToolbar.Group.Props>;

export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return <BaseToolbar.Group className={cn("flex items-center gap-1", className)} {...props} />;
}

export type ToolbarSeparatorProps = WithClassName<BaseToolbar.Separator.Props>;

export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      className={cn(
        "mx-1 h-5 w-px bg-foreground/12 data-[orientation=vertical]:my-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-5",
        className,
      )}
      {...props}
    />
  );
}
