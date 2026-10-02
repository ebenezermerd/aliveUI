import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";

const spinnerVariants = variants("relative inline-block shrink-0 text-current", {
  variants: {
    size: { sm: "size-4", md: "size-5", lg: "size-8" },
  },
  defaultVariants: { size: "md" },
});

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  /** Announced to assistive technology. */
  label?: string;
  ref?: Ref<HTMLSpanElement>;
}

/** The system style activity indicator, eight fading spokes. */
export function Spinner({ className, size, label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      {Array.from({ length: 8 }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className="absolute top-0 left-[calc(50%-0.0625rem)] h-1/2 w-[12%] origin-bottom [&>span]:block"
          style={{ rotate: `${index * 45}deg` }}
        >
          <span
            className="h-[45%] w-full rounded-full bg-current motion-safe:animate-[glass-spoke_0.8s_linear_infinite]"
            style={{ animationDelay: `${(index - 8) * 0.1}s` }}
          />
        </span>
      ))}
    </span>
  );
}

export { spinnerVariants };
