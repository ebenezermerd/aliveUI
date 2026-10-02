"use client";

import { cn } from "@aliveui/primitives";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useState, type ReactNode } from "react";
import { focusRing } from "../../lib/styles.js";

export interface SegmentedControlItem<Value extends string> {
  value: Value;
  label: ReactNode;
  /** Required when the label is only an icon. */
  "aria-label"?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps<Value extends string> {
  items: readonly SegmentedControlItem<Value>[];
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: Value) => void;
  /** Names the group for assistive technology. */
  "aria-label": string;
  disabled?: boolean;
  className?: string;
}

/** Picks one of a few closely related options, like a view mode. One is always selected. */
export function SegmentedControl<Value extends string>({
  items,
  value: controlled,
  defaultValue,
  onValueChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps<Value>) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.value);
  const value = controlled ?? uncontrolled;

  return (
    <ToggleGroup
      aria-label={ariaLabel}
      disabled={disabled}
      value={value === undefined ? [] : [value]}
      onValueChange={(next) => {
        // Ignore attempts to clear the selection, a segmented control always has a value.
        const picked = next[0] as Value | undefined;
        if (picked === undefined) return;
        setUncontrolled(picked);
        onValueChange?.(picked);
      }}
      className={cn("surface-well inline-flex items-center gap-1 rounded-full p-1", className)}
    >
      {items.map((item) => (
        <Toggle
          key={item.value}
          value={item.value}
          aria-label={item["aria-label"]}
          disabled={item.disabled}
          className={cn(
            "flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-muted-foreground select-none [&_svg]:size-4",
            "transition-[background-color,color,box-shadow,scale] duration-(--alive-duration-base) ease-spring active:scale-[0.96]",
            "hover:text-foreground data-pressed:surface data-pressed:text-foreground data-pressed:shadow-raised",
            "data-disabled:opacity-50",
            focusRing,
          )}
        >
          {item.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
