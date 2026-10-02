import { cn, Slot, variants, type VariantProps } from "@aliveui/primitives";
import type { ButtonHTMLAttributes, Ref } from "react";

const buttonVariants = variants(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap select-none",
    "transition-colors duration-(--alive-duration-fast) ease-standard",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        solid: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline: "border border-border bg-background text-foreground hover:bg-surface",
        ghost: "text-foreground hover:bg-foreground/5",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "solid",
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
