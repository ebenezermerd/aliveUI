"use client";

import { cn, variants, type VariantProps } from "@aliveui/primitives";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { focusRing, pressable, type WithClassName } from "../../lib/styles.js";

const toggleVariants = variants(
  [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium select-none [&_svg]:size-4",
    "text-foreground hover:bg-foreground/8",
    "data-pressed:bg-accent data-pressed:text-accent-foreground data-pressed:shadow-raised data-pressed:hover:bg-accent",
    "data-disabled:opacity-50",
    pressable,
    focusRing,
  ],
  {
    variants: {
      size: {
        sm: "h-8 min-w-8 px-2.5 text-sm",
        md: "h-10 min-w-10 px-3 text-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type ToggleProps = WithClassName<BaseToggle.Props> & VariantProps<typeof toggleVariants>;

/** A button that stays pressed, such as bold or favourite. Label icon only toggles. */
export function Toggle({ className, size, ...props }: ToggleProps) {
  return <BaseToggle className={cn(toggleVariants({ size }), className)} {...props} />;
}

export type ToggleGroupProps = WithClassName<BaseToggleGroup.Props>;

/** A row of toggles. Single choice by default, pass `multiple` to allow several. */
export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={cn(
        "surface inline-flex items-center gap-1 rounded-full p-1 shadow-raised",
        className,
      )}
      {...props}
    />
  );
}

export { toggleVariants };
