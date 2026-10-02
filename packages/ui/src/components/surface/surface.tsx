import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

const surfaceVariants = variants("surface relative rounded-surface text-foreground", {
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

export interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {
  ref?: Ref<HTMLDivElement>;
}

/** A panel drawn with the active system's surface recipe. */
export function Surface({ className, elevation, padding, ...props }: SurfaceProps) {
  return <div className={cn(surfaceVariants({ elevation, padding }), className)} {...props} />;
}

export { surfaceVariants };
