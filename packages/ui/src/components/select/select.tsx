"use client";

import { cn } from "@aliveui/primitives";
import { Select as BaseSelect } from "@base-ui/react/select";
import type { ReactNode } from "react";
import { CheckIcon, ChevronUpDownIcon } from "../../lib/icons.js";
import { focusRing, popupMotion, popupSurface } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export interface SelectItem<Value> {
  value: Value;
  label: ReactNode;
  disabled?: boolean;
}

export type SelectProps<Value> = Omit<
  BaseSelect.Root.Props<Value, false>,
  "items" | "children" | "multiple"
> & {
  items: readonly SelectItem<Value>[];
  /** Shown while nothing is selected. */
  placeholder?: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/** Picks one value from a list, shown in a floating popup. */
export function Select<Value>({
  items,
  placeholder,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SelectProps<Value>) {
  const scope = useSystemScope();

  return (
    <BaseSelect.Root items={items as BaseSelect.Root.Props<Value, false>["items"]} {...props}>
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          "surface inline-flex h-10 min-w-44 items-center justify-between gap-3 rounded-xl pr-2.5 pl-3.5 text-sm text-foreground shadow-raised select-none",
          "transition-[background-color,scale] duration-(--alive-duration-base) ease-spring hover:bg-surface-raised active:scale-[0.98]",
          "data-popup-open:bg-surface-raised data-disabled:opacity-50",
          focusRing,
          className,
        )}
      >
        <BaseSelect.Value
          placeholder={placeholder}
          className="truncate data-placeholder:text-muted-foreground"
        />
        <BaseSelect.Icon className="text-muted-foreground">
          <ChevronUpDownIcon className="size-4" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner {...scope} className="z-50 outline-none" sideOffset={6}>
          <BaseSelect.Popup
            className={cn(
              popupSurface,
              popupMotion,
              "min-w-(--anchor-width) p-1.5 outline-none",
              "data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100",
            )}
          >
            <BaseSelect.List className="max-h-(--available-height) scroll-py-1.5 overflow-y-auto">
              {items.map((item, index) => (
                <BaseSelect.Item
                  key={index}
                  value={item.value}
                  disabled={item.disabled}
                  className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-lg py-2 pr-4 pl-2.5 text-sm outline-none select-none data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                >
                  <BaseSelect.ItemIndicator className="col-start-1">
                    <CheckIcon className="size-3.5" strokeWidth={2.25} />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className="col-start-2">{item.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
