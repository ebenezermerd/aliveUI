"use client";

import { cn } from "@aliveui/primitives";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { WithClassName } from "../../lib/styles.js";

export type SliderProps = WithClassName<BaseSlider.Root.Props> & {
  /** Accessible names for the thumbs, one per value. Defaults to the root `aria-label`. */
  thumbLabels?: string[];
};

/**
 * Picks a number, or a range when given an array value. One thumb is rendered
 * for each value.
 */
export function Slider({ className, thumbLabels, ...props }: SliderProps) {
  const initial = props.value ?? props.defaultValue ?? 0;
  const count = Array.isArray(initial) ? initial.length : 1;
  const label = props["aria-label"];

  return (
    <BaseSlider.Root className={cn("w-full", className)} {...props}>
      <BaseSlider.Control className="flex w-full touch-none items-center py-3 select-none data-disabled:opacity-50">
        <BaseSlider.Track className="glass-well relative h-1.5 w-full rounded-full">
          <BaseSlider.Indicator className="rounded-full bg-accent" />
          {Array.from({ length: count }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={index}
              aria-label={thumbLabels?.[index] ?? label}
              className={cn(
                "size-5 rounded-full bg-white shadow-[0_1px_2px_oklch(0_0_0/0.2),0_4px_12px_oklch(0_0_0/0.16)] outline-none",
                "transition-[scale,box-shadow] duration-(--alive-duration-base) ease-spring",
                "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/40 data-dragging:scale-110",
              )}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
