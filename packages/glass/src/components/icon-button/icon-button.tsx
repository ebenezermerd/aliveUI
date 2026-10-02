import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { ButtonHTMLAttributes, Ref } from "react";
import { buttonVariants } from "../button/button.js";

const iconButtonSizes = variants("px-0", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
    },
  },
  defaultVariants: { size: "md" },
});

export interface IconButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">,
    Omit<VariantProps<typeof buttonVariants>, "size">,
    VariantProps<typeof iconButtonSizes> {
  /** Icon only buttons have no visible text, so a label is required. */
  "aria-label": string;
  ref?: Ref<HTMLButtonElement>;
}

/** A round button that holds a single icon. */
export function IconButton({ className, variant, size, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), iconButtonSizes({ size }), className)}
      {...props}
    />
  );
}
