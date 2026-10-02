"use client";

import { cn } from "@aliveui/primitives";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { useState } from "react";
import { focusRing, popupMotion, popupSurface } from "../../lib/styles.js";
import { Calendar, type SingleCalendarProps } from "../calendar/calendar.js";
import { useGlassScope } from "../provider/provider.js";

export interface DatePickerProps extends Omit<
  SingleCalendarProps,
  "mode" | "className" | "onValueChange"
> {
  onValueChange?: (value: Date) => void;
  placeholder?: string;
  /** Options for formatting the chosen date in the trigger. */
  format?: Intl.DateTimeFormatOptions;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className="size-4"
    >
      <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" strokeLinecap="round" />
    </svg>
  );
}

/** A field that opens a calendar in a glass popover and shows the chosen date. */
export function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  placeholder = "Pick a date",
  format = { dateStyle: "medium" },
  locale,
  disabled,
  className,
  "aria-label": ariaLabel,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : uncontrolled;
  const scope = useGlassScope();

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "glass inline-flex h-10 min-w-48 items-center gap-2.5 rounded-xl px-3.5 text-sm shadow-raised",
          "transition-[background-color,scale] duration-(--alive-duration-base) ease-spring hover:bg-surface-raised active:scale-[0.98]",
          "data-popup-open:bg-surface-raised disabled:opacity-50",
          focusRing,
          className,
        )}
      >
        <span className="text-muted-foreground">
          <CalendarIcon />
        </span>
        <span className={cn(!selected && "text-muted-foreground")}>
          {selected ? new Intl.DateTimeFormat(locale, format).format(selected) : placeholder}
        </span>
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner {...scope} sideOffset={8} align="start" className="z-50">
          <BasePopover.Popup
            className={cn(popupSurface, popupMotion, "rounded-surface outline-none")}
          >
            <Calendar
              {...calendarProps}
              locale={locale}
              value={selected}
              onValueChange={(date) => {
                setUncontrolled(date);
                onValueChange?.(date);
                setOpen(false);
              }}
              variant="plain"
            />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
