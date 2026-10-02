"use client";

import { cn } from "@aliveui/primitives";
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type { CSSProperties, ReactNode } from "react";
import { ChevronDownIcon } from "../../lib/icons.js";
import { focusRing, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type NavigationMenuProps = WithClassName<BaseNavigationMenu.Root.Props>;

/**
 * Site navigation with rich dropdown panels. The panel morphs its size as you
 * move between triggers.
 */
export function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
  const scope = useSystemScope();
  return (
    <BaseNavigationMenu.Root className={cn("relative", className)} {...props}>
      {children}
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner
          {...scope}
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          className={cn(
            "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
            "transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) data-instant:transition-none",
            // Bridge the gap between trigger and panel so the pointer can cross it.
            "before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-['']",
          )}
          style={
            {
              "--duration": "0.35s",
              "--easing": "cubic-bezier(0.22, 1, 0.36, 1)",
            } as CSSProperties
          }
        >
          <BaseNavigationMenu.Popup
            className={cn(
              popupSurface,
              "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-3xl outline-none",
              "transition-[opacity,scale,width,height] duration-(--duration) ease-(--easing)",
              "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150",
            )}
          >
            <BaseNavigationMenu.Viewport className="relative size-full overflow-hidden" />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}

export type NavigationMenuListProps = WithClassName<BaseNavigationMenu.List.Props>;

export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List
      className={cn("surface flex items-center gap-0.5 rounded-full p-1 shadow-raised", className)}
      {...props}
    />
  );
}

export type NavigationMenuItemProps = WithClassName<BaseNavigationMenu.Item.Props>;

export function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <BaseNavigationMenu.Item {...props} />;
}

const navigationTrigger = cn(
  "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium no-underline select-none",
  "transition-colors hover:bg-foreground/8 data-popup-open:bg-foreground/10",
  focusRing,
);

export type NavigationMenuTriggerProps = WithClassName<BaseNavigationMenu.Trigger.Props>;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger className={cn(navigationTrigger, className)} {...props}>
      {children}
      <BaseNavigationMenu.Icon className="transition-transform duration-(--alive-duration-base) ease-spring data-popup-open:rotate-180">
        <ChevronDownIcon className="size-3.5 opacity-60" />
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
}

export type NavigationMenuContentProps = WithClassName<BaseNavigationMenu.Content.Props>;

/** The panel for one trigger. Lay out `NavigationMenuLink` cards inside. */
export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      className={cn(
        "w-[calc(100vw-40px)] p-2 sm:w-max sm:max-w-[32rem]",
        "transition-[opacity,translate] duration-(--duration) ease-(--easing)",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "data-[activation-direction=left]:data-starting-style:-translate-x-1/2 data-[activation-direction=right]:data-starting-style:translate-x-1/2",
        "data-[activation-direction=left]:data-ending-style:translate-x-1/2 data-[activation-direction=right]:data-ending-style:-translate-x-1/2",
        className,
      )}
      {...props}
    />
  );
}

export type NavigationMenuLinkProps = WithClassName<BaseNavigationMenu.Link.Props> & {
  /** Card heading. Without it the link renders as a plain top level item. */
  title?: ReactNode;
  description?: ReactNode;
};

/**
 * A link inside a panel, shown as a card when it has a title, or a top level
 * link in the list otherwise. Use `render` for your router's link component.
 */
export function NavigationMenuLink({
  className,
  title,
  description,
  children,
  ...props
}: NavigationMenuLinkProps) {
  if (title === undefined) {
    return (
      <BaseNavigationMenu.Link className={cn(navigationTrigger, className)} {...props}>
        {children}
      </BaseNavigationMenu.Link>
    );
  }
  return (
    <BaseNavigationMenu.Link
      className={cn(
        "block rounded-2xl p-3 text-left no-underline transition-colors hover:bg-foreground/6",
        focusRing,
        className,
      )}
      {...props}
    >
      <span className="block text-sm font-semibold">{title}</span>
      {description ? (
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      ) : null}
      {children}
    </BaseNavigationMenu.Link>
  );
}
