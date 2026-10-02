import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

const glassSurfaceVariants = variants("glass relative rounded-surface text-foreground", {
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
});

export interface GlassSurfaceProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof glassSurfaceVariants> {
  ref?: Ref<HTMLDivElement>;
}

/** A translucent pane that blurs and saturates whatever sits behind it. */
export function GlassSurface({ className, elevation, padding, ...props }: GlassSurfaceProps) {
  return <div className={cn(glassSurfaceVariants({ elevation, padding }), className)} {...props} />;
}

export { glassSurfaceVariants };
