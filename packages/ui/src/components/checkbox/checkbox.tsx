"use client";

import { cn } from "@aliveui/primitives";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "../../lib/icons.js";
import { focusRing, type WithClassName } from "../../lib/styles.js";

export type CheckboxProps = WithClassName<BaseCheckbox.Root.Props>;

/** A tickable box. Wrap it in a `<label>` with its text, or give it an `aria-label`. */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "surface-well group inline-flex size-5 shrink-0 items-center justify-center rounded-md text-accent-foreground",
        "transition-[background-color,border-color,box-shadow,scale] duration-(--alive-duration-base) ease-spring active:scale-90",
        "data-checked:border-transparent data-checked:bg-accent data-checked:shadow-raised",
        "data-indeterminate:border-transparent data-indeterminate:bg-accent data-indeterminate:shadow-raised",
        "data-disabled:opacity-50 motion-reduce:transition-none",
        focusRing,
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex transition-[scale,opacity] duration-(--alive-duration-base) ease-spring data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0">
        <CheckIcon className="size-3.5 group-data-indeterminate:hidden" strokeWidth={2.25} />
        <MinusIcon className="hidden size-3.5 group-data-indeterminate:block" strokeWidth={2.25} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
