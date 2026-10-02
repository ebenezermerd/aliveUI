"use client";

import { cn } from "@aliveui/primitives";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type SwitchProps = WithClassName<BaseSwitch.Root.Props>;

/** An on and off toggle. Wrap it in a `<label>` with its text, or give it an `aria-label`. */
export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "surface-well relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5",
        "transition-[background-color,border-color] duration-(--alive-duration-base) ease-standard",
        "data-checked:border-transparent data-checked:bg-success",
        "data-disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "size-6 knob rounded-full",
          "transition-[translate,width] duration-(--alive-duration-base) ease-spring data-checked:translate-x-5",
          "motion-reduce:transition-none",
        )}
      />
    </BaseSwitch.Root>
  );
}
