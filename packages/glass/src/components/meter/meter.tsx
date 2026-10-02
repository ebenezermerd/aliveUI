"use client";

import { cn } from "@aliveui/primitives";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import type { WithClassName } from "../../lib/styles.js";

export type MeterProps = WithClassName<BaseMeter.Root.Props> & {
  label?: ReactNode;
  showValue?: boolean;
};

/**
 * A measurement within a known range, like storage used or battery level.
 * Use `Progress` instead for a task that is moving toward completion.
 */
export function Meter({
  className,
  label,
  showValue = true,
  value,
  min = 0,
  max = 100,
  ...props
}: MeterProps) {
  const ratio = (value - min) / (max - min);
  const tone = ratio > 0.9 ? "bg-danger" : ratio > 0.75 ? "bg-warning" : "bg-success";

  return (
    <BaseMeter.Root
      value={value}
      min={min}
      max={max}
      className={cn("grid w-full grid-cols-2 gap-y-2", className)}
      {...props}
    >
      {label ? <BaseMeter.Label className="text-sm font-medium">{label}</BaseMeter.Label> : null}
      {showValue ? (
        <BaseMeter.Value className="col-start-2 text-right text-sm text-muted-foreground tabular-nums" />
      ) : null}
      <BaseMeter.Track className="glass-well col-span-2 h-2 overflow-hidden rounded-full">
        <BaseMeter.Indicator className={cn("rounded-full transition-[width] duration-500", tone)} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
