import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

const glassSurfaceVariants = variants(
  [
    "relative isolate overflow-hidden rounded-surface border border-border bg-surface text-foreground",
    "backdrop-blur-surface backdrop-saturate-(--alive-glass-saturate)",
    // Diagonal sheen that sits above the tint and below the content.
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:content-[''] before:[background:var(--alive-glass-sheen)]",
  ],
  {
    variants: {
      elevation: {
        raised: "shadow-raised",
        floating: "shadow-floating",
      },
      padding: {
        none: "",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      elevation: "floating",
      padding: "md",
    },
  },
);

export interface GlassSurfaceProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof glassSurfaceVariants> {
  ref?: Ref<HTMLDivElement>;
}

/** A translucent pane that blurs and saturates whatever sits behind it. */
export function GlassSurface({ className, elevation, padding, ...props }: GlassSurfaceProps) {
  return <div className={cn(glassSurfaceVariants({ elevation, padding }), className)} {...props} />;
}

export { glassSurfaceVariants };
