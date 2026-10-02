"use client";

import { cn } from "@aliveui/primitives";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactNode } from "react";
import { popupMotion, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useGlassScope } from "../provider/provider.js";

export type MenuProps = BaseMenu.Root.Props;

/** A list of actions that opens from a trigger. */
export function Menu(props: MenuProps) {
  return <BaseMenu.Root {...props} />;
}

export type MenuTriggerProps = WithClassName<BaseMenu.Trigger.Props>;

/** Pass `render={<Button />}` to use a glass button as the trigger. */
export function MenuTrigger(props: MenuTriggerProps) {
  return <BaseMenu.Trigger {...props} />;
}

export type MenuContentProps = WithClassName<BaseMenu.Popup.Props> &
  Pick<BaseMenu.Positioner.Props, "side" | "align" | "sideOffset">;

/** The floating list. Holds `MenuItem`, `MenuSeparator` and `MenuGroup` elements. */
export function MenuContent({
  className,
  side,
  align = "start",
  sideOffset = 8,
  ...props
}: MenuContentProps) {
  const scope = useGlassScope();
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        {...scope}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50 outline-none"
      >
        <BaseMenu.Popup
          className={cn(popupSurface, popupMotion, "min-w-48 p-1.5 outline-none", className)}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export type MenuItemProps = WithClassName<BaseMenu.Item.Props> & {
  /** Leading icon. */
  icon?: ReactNode;
  /** Trailing hint, such as a keyboard shortcut. */
  shortcut?: ReactNode;
  /** Colour the item as a destructive action. */
  destructive?: boolean;
};

export function MenuItem({
  className,
  icon,
  shortcut,
  destructive = false,
  children,
  ...props
}: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(
        "flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none select-none [&_svg]:size-4",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-40",
        destructive &&
          "text-danger data-highlighted:bg-danger data-highlighted:text-danger-foreground",
        className,
      )}
      {...props}
    >
      {icon ? <span className="flex shrink-0 opacity-80">{icon}</span> : null}
      <span className="flex-1">{children}</span>
      {shortcut ? <span className="text-xs opacity-60">{shortcut}</span> : null}
    </BaseMenu.Item>
  );
}

export type MenuSeparatorProps = WithClassName<BaseMenu.Separator.Props>;

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator className={cn("mx-2 my-1.5 h-px bg-foreground/10", className)} {...props} />
  );
}

export type MenuGroupProps = WithClassName<BaseMenu.Group.Props> & {
  /** Heading shown above the group. */
  label?: ReactNode;
};

export function MenuGroup({ className, label, children, ...props }: MenuGroupProps) {
  return (
    <BaseMenu.Group className={className} {...props}>
      {label ? (
        <BaseMenu.GroupLabel className="px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted-foreground">
          {label}
        </BaseMenu.GroupLabel>
      ) : null}
      {children}
    </BaseMenu.Group>
  );
}
