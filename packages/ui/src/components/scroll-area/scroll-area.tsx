"use client";

import { cn } from "@aliveui/primitives";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type ScrollAreaProps = WithClassName<BaseScrollArea.Root.Props> & {
  /** Which scrollbars to render. */
  orientation?: "vertical" | "horizontal" | "both";
  viewportClassName?: string;
};

function Scrollbar({ orientation }: { orientation: "vertical" | "horizontal" }) {
  return (
    <BaseScrollArea.Scrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none rounded-full p-0.5 opacity-0 transition-opacity duration-300 select-none",
        "data-hovering:opacity-100 data-scrolling:opacity-100 data-scrolling:duration-0",
        orientation === "vertical" ? "w-2.5" : "h-2.5 flex-col",
      )}
    >
      <BaseScrollArea.Thumb className="flex-1 rounded-full bg-foreground/30 hover:bg-foreground/45" />
    </BaseScrollArea.Scrollbar>
  );
}

/** A scroll container with slim overlay scrollbars that fade in while scrolling. */
export function ScrollArea({
  className,
  viewportClassName,
  orientation = "vertical",
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={cn("relative overflow-hidden", className)} {...props}>
      <BaseScrollArea.Viewport
        className={cn(
          "size-full overscroll-contain rounded-[inherit]",
          focusRing,
          viewportClassName,
        )}
      >
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {orientation !== "horizontal" ? <Scrollbar orientation="vertical" /> : null}
      {orientation !== "vertical" ? <Scrollbar orientation="horizontal" /> : null}
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}
