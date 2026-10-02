import { cn, Slot, variants, type VariantProps } from "@aliveui/primitives";
import type { ButtonHTMLAttributes, Ref } from "react";
import { focusRing, pressable } from "../../lib/styles.js";

const buttonVariants = variants(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    pressable,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "surface text-foreground shadow-raised hover:bg-surface-raised",
        primary:
          "border border-white/30 bg-accent/85 text-accent-foreground shadow-raised backdrop-blur-surface hover:bg-accent",
        ghost: "text-foreground hover:bg-foreground/8 active:bg-foreground/12",
        danger:
          "border border-white/25 bg-danger/85 text-danger-foreground shadow-raised backdrop-blur-surface hover:bg-danger",
      },
      size: {
        sm: "h-8 px-3.5 text-sm [&_svg]:size-3.5",
        md: "h-10 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-7 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render the child element with the button's styling instead of a `<button>`. */
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    const { ref, ...rest } = props;
    return <Slot className={classes} ref={ref as Ref<HTMLElement>} {...rest} />;
  }

  return <button type="button" className={classes} {...props} />;
}

export { buttonVariants };
