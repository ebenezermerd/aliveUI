import { cn, Slot, variants, type VariantProps } from "@aliveui/primitives";
import type { ButtonHTMLAttributes, Ref } from "react";

const buttonVariants = variants(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-control border font-medium whitespace-nowrap select-none",
    "shadow-raised backdrop-blur-surface backdrop-saturate-(--alive-glass-saturate)",
    "transition-[background-color,box-shadow,scale] duration-(--alive-duration-base) ease-spring active:scale-[0.97]",
    "motion-reduce:transition-none motion-reduce:active:scale-100",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        glass: "border-border bg-surface text-foreground hover:bg-surface-raised",
        tinted: "border-white/30 bg-accent/85 text-accent-foreground hover:bg-accent",
      },
      size: {
        sm: "h-8 px-3.5 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "glass",
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
