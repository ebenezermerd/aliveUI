"use client";

import { cn } from "@aliveui/primitives";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { popupMotion, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useGlassScope } from "../provider/provider.js";

export type ContextMenuProps = BaseContextMenu.Root.Props;

/**
 * A menu that opens on right click or long press. Fill it with the same
 * `MenuItem`, `MenuSeparator`, `MenuGroup` and `MenuSubmenu` parts as `Menu`.
 */
export function ContextMenu(props: ContextMenuProps) {
  return <BaseContextMenu.Root {...props} />;
}

export type ContextMenuTriggerProps = WithClassName<BaseContextMenu.Trigger.Props>;

/** The area that responds to right click. */
export function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  return <BaseContextMenu.Trigger className={cn("select-none", className)} {...props} />;
}

export type ContextMenuContentProps = WithClassName<BaseContextMenu.Popup.Props>;

export function ContextMenuContent({ className, ...props }: ContextMenuContentProps) {
  const scope = useGlassScope();
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner {...scope} className="z-50 outline-none">
        <BaseContextMenu.Popup
          className={cn(popupSurface, popupMotion, "min-w-52 p-1.5 outline-none", className)}
          {...props}
        />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}
