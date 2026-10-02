"use client";

import { cn } from "@aliveui/primitives";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { popupMotion } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type TooltipProviderProps = BaseTooltip.Provider.Props;

/** Share open delays between nearby tooltips so moving across them feels instant. */
export function TooltipProvider(props: TooltipProviderProps) {
  return <BaseTooltip.Provider {...props} />;
}

export interface TooltipProps {
  /** The tooltip text. */
  content: ReactNode;
  /** The element that shows the tooltip on hover and focus. */
  children: ReactElement;
  side?: BaseTooltip.Positioner.Props["side"];
  /** Delay before opening, in milliseconds. */
  delay?: number;
  className?: string;
}

/** A short label that appears next to an element on hover and focus. */
export function Tooltip({ content, children, side = "top", delay, className }: TooltipProps) {
  const scope = useSystemScope();
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner {...scope} side={side} sideOffset={8} className="z-50">
          <BaseTooltip.Popup
            className={cn(
              "surface-overlay rounded-full px-3 py-1.5 text-xs font-medium text-foreground shadow-raised",
              popupMotion,
              "data-instant:transition-none",
              className,
            )}
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
