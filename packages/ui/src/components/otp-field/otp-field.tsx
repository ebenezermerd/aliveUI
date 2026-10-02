"use client";

import { cn } from "@aliveui/primitives";
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import type { WithClassName } from "../../lib/styles.js";

export type OTPFieldProps = WithClassName<BaseOTPField.Root.Props> & {
  /** Insert a divider after this many characters, for codes like 123 456. */
  groupSize?: number;
  /**
   * Name for the first box when there is no visible label. Otherwise give the
   * field an `id` and point a `<label htmlFor>` at it.
   */
  "aria-label"?: string;
};

/** One box per character for verification codes, with paste and autofill support. */
export function OTPField({
  className,
  length,
  groupSize,
  "aria-label": ariaLabel,
  ...props
}: OTPFieldProps) {
  return (
    <BaseOTPField.Root
      length={length}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <span key={index} className="contents">
          {groupSize && index > 0 && index % groupSize === 0 ? (
            <span aria-hidden className="mx-1 h-0.5 w-3 rounded-full bg-foreground/25" />
          ) : null}
          <BaseOTPField.Input
            aria-label={index === 0 ? ariaLabel : `Character ${index + 1} of ${length}`}
            className={cn(
              "glass-well size-12 rounded-xl text-center text-lg font-semibold text-foreground caret-accent outline-none",
              "transition-[border-color,box-shadow] duration-(--alive-duration-base) focus:border-accent/60 focus:ring-4 focus:ring-ring/25",
            )}
          />
        </span>
      ))}
    </BaseOTPField.Root>
  );
}
