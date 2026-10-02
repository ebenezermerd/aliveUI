"use client";

import { cn } from "@aliveui/primitives";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "../../lib/icons.js";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type NumberFieldProps = WithClassName<BaseNumberField.Root.Props> & {
  /** Accessible name for the input when there is no visible label. */
  "aria-label"?: string;
};

const stepper = cn(
  "flex size-8 shrink-0 items-center justify-center rounded-full text-foreground [&_svg]:size-3.5",
  "transition-[background-color,scale] duration-(--alive-duration-base) ease-spring hover:bg-foreground/8 active:scale-90",
  "data-disabled:opacity-40",
  focusRing,
);

/**
 * A numeric input with stepper buttons. Supports min, max, step and number
 * formatting through `format`, and the arrow keys step the value.
 */
export function NumberField({ className, "aria-label": ariaLabel, ...props }: NumberFieldProps) {
  return (
    <BaseNumberField.Root className={cn("inline-flex", className)} {...props}>
      <BaseNumberField.Group className="glass-well flex h-10 items-center gap-1 rounded-full px-1 focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-ring/25">
        <BaseNumberField.Decrement aria-label="Decrease" className={stepper}>
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          aria-label={ariaLabel}
          className="w-16 bg-transparent text-center text-sm font-medium text-foreground tabular-nums outline-none"
        />
        <BaseNumberField.Increment aria-label="Increase" className={stepper}>
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
