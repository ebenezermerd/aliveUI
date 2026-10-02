import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

const badgeVariants = variants(
  "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      tone: {
        neutral: "glass text-foreground",
        accent: "bg-accent/15 text-accent ring-1 ring-accent/25 ring-inset backdrop-blur-surface",
        success:
          "bg-success/15 text-success ring-1 ring-success/25 ring-inset backdrop-blur-surface",
        warning:
          "bg-warning/20 text-foreground ring-1 ring-warning/35 ring-inset backdrop-blur-surface",
        danger: "bg-danger/15 text-danger ring-1 ring-danger/25 ring-inset backdrop-blur-surface",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Show a small status dot before the label. */
  dot?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

/** A small label for status, counts or categories. */
export function Badge({ className, tone, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

export { badgeVariants };
