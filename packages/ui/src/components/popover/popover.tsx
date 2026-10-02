"use client";

import { cn } from "@aliveui/primitives";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { popupMotion, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type PopoverProps = BasePopover.Root.Props;

/** Rich floating content anchored to a trigger, such as a quick settings panel. */
export function Popover(props: PopoverProps) {
  return <BasePopover.Root {...props} />;
}

export type PopoverTriggerProps = WithClassName<BasePopover.Trigger.Props>;

/** Pass `render={<Button />}` to use a kit button as the trigger. */
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />;
}

export type PopoverContentProps = WithClassName<BasePopover.Popup.Props> &
  Pick<BasePopover.Positioner.Props, "side" | "align" | "sideOffset">;

export function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  ...props
}: PopoverContentProps) {
  const scope = useSystemScope();
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        {...scope}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <BasePopover.Popup
          className={cn(popupSurface, popupMotion, "w-72 p-4 outline-none", className)}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export type PopoverTitleProps = WithClassName<BasePopover.Title.Props>;

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return <BasePopover.Title className={cn("text-sm font-semibold", className)} {...props} />;
}

export type PopoverDescriptionProps = WithClassName<BasePopover.Description.Props>;

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={cn("mt-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export type PopoverCloseProps = WithClassName<BasePopover.Close.Props>;

export function PopoverClose(props: PopoverCloseProps) {
  return <BasePopover.Close {...props} />;
}
