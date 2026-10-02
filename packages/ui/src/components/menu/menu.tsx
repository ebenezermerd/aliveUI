"use client";

import { cn } from "@aliveui/primitives";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactNode } from "react";
import { CheckIcon, ChevronRightIcon } from "../../lib/icons.js";
import { popupMotion, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type MenuProps = BaseMenu.Root.Props;

/** A list of actions that opens from a trigger. */
export function Menu(props: MenuProps) {
  return <BaseMenu.Root {...props} />;
}

export type MenuTriggerProps = WithClassName<BaseMenu.Trigger.Props>;

/** Pass `render={<Button />}` to use a kit button as the trigger. */
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
  const scope = useSystemScope();
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
          className={cn(
            popupSurface,
            popupMotion,
            "max-h-(--available-height) min-w-48 overflow-y-auto p-1.5 outline-none",
            className,
          )}
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

/** Shared look for every row in a menu, context menu or menubar. */
export const menuItemClass = cn(
  "flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none select-none [&_svg]:size-4",
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-40",
  "data-popup-open:bg-foreground/8",
);

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
        menuItemClass,
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

export type MenuCheckboxItemProps = WithClassName<BaseMenu.CheckboxItem.Props>;

/** A menu row that toggles on and off, with a tick when on. */
export function MenuCheckboxItem({ className, children, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem className={cn(menuItemClass, "relative pl-8", className)} {...props}>
      <BaseMenu.CheckboxItemIndicator className="absolute left-2.5 flex">
        <CheckIcon strokeWidth={2.25} />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export type MenuRadioGroupProps = WithClassName<BaseMenu.RadioGroup.Props>;

export function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup className={className} {...props} />;
}

export type MenuRadioItemProps = WithClassName<BaseMenu.RadioItem.Props>;

/** One choice inside a `MenuRadioGroup`, with a dot when selected. */
export function MenuRadioItem({ className, children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem className={cn(menuItemClass, "relative pl-8", className)} {...props}>
      <BaseMenu.RadioItemIndicator className="absolute left-3.5 size-1.5 rounded-full bg-current" />
      {children}
    </BaseMenu.RadioItem>
  );
}

export type MenuSubmenuProps = BaseMenu.SubmenuRoot.Props;

/** Nests a menu. Holds a `MenuSubmenuTrigger` and a `MenuContent`. */
export function MenuSubmenu(props: MenuSubmenuProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

export type MenuSubmenuTriggerProps = WithClassName<BaseMenu.SubmenuTrigger.Props> & {
  icon?: ReactNode;
};

export function MenuSubmenuTrigger({
  className,
  icon,
  children,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger className={cn(menuItemClass, className)} {...props}>
      {icon ? <span className="flex shrink-0 opacity-80">{icon}</span> : null}
      <span className="flex-1">{children}</span>
      <ChevronRightIcon className="opacity-60" />
    </BaseMenu.SubmenuTrigger>
  );
}
