"use client";

import { cn } from "@aliveui/primitives";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type RadioGroupProps = WithClassName<BaseRadioGroup.Props>;

/** A set of mutually exclusive options. Label it with `aria-labelledby` or `aria-label`. */
export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cn("flex flex-col gap-3", className)} {...props} />;
}

export type RadioProps = WithClassName<BaseRadio.Root.Props>;

/** One option in a `RadioGroup`. Wrap it in a `<label>` with its text. */
export function Radio({ className, ...props }: RadioProps) {
  return (
    <BaseRadio.Root
      className={cn(
        "glass-well inline-flex size-5 shrink-0 items-center justify-center rounded-full",
        "transition-[background-color,border-color,box-shadow,scale] duration-(--alive-duration-base) ease-spring active:scale-90",
        "data-checked:border-transparent data-checked:bg-accent data-checked:shadow-raised",
        "data-disabled:opacity-50 motion-reduce:transition-none",
        focusRing,
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className="size-2 rounded-full bg-accent-foreground shadow-sm transition-[scale] duration-(--alive-duration-base) ease-spring data-starting-style:scale-0 data-ending-style:scale-0" />
    </BaseRadio.Root>
  );
}
