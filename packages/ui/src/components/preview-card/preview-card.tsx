"use client";

import { cn } from "@aliveui/primitives";
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { popupMotion, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type PreviewCardProps = BasePreviewCard.Root.Props;

/** Shows a rich preview of a link's destination on hover, also known as a hover card. */
export function PreviewCard(props: PreviewCardProps) {
  return <BasePreviewCard.Root {...props} />;
}

export type PreviewCardTriggerProps = WithClassName<BasePreviewCard.Trigger.Props>;

/** The link that opens the preview. Renders an `<a>`, pass `href`. */
export function PreviewCardTrigger({ className, ...props }: PreviewCardTriggerProps) {
  return (
    <BasePreviewCard.Trigger
      className={cn(
        "font-medium text-accent underline decoration-accent/40 underline-offset-4 outline-none hover:decoration-accent focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

export type PreviewCardContentProps = WithClassName<BasePreviewCard.Popup.Props> &
  Pick<BasePreviewCard.Positioner.Props, "side" | "align" | "sideOffset">;

export function PreviewCardContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  ...props
}: PreviewCardContentProps) {
  const scope = useSystemScope();
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        {...scope}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <BasePreviewCard.Popup
          className={cn(
            popupSurface,
            popupMotion,
            "w-72 overflow-hidden p-3 outline-none",
            className,
          )}
          {...props}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
