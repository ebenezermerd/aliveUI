"use client";

import { cn } from "@aliveui/primitives";
import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../lib/icons.js";
import { focusRing } from "../../lib/styles.js";
import {
  addDays,
  addMonths,
  clampDate,
  isSameDay,
  isSameMonth,
  monthGrid,
  startOfDay,
  startOfMonth,
} from "./dates.js";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface CalendarBaseProps {
  /** Earliest selectable day. */
  min?: Date;
  /** Latest selectable day. */
  max?: Date;
  /** Disable specific days, such as weekends. */
  isDateDisabled?: (date: Date) => boolean;
  /** 0 for Sunday, 1 for Monday. */
  weekStartsOn?: number;
  /** BCP 47 locale for month and weekday names. Uses the browser locale by default. */
  locale?: string;
  /** Month shown first when nothing is selected. */
  defaultMonth?: Date;
  /** `card` draws its own glass pane, `plain` leaves the surface to the parent. */
  variant?: "card" | "plain";
  className?: string;
}

export interface SingleCalendarProps extends CalendarBaseProps {
  mode?: "single";
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date) => void;
}

export interface RangeCalendarProps extends CalendarBaseProps {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
}

export type CalendarProps = SingleCalendarProps | RangeCalendarProps;

/** A month grid for picking a day or a range, with full keyboard support. */
export function Calendar(props: CalendarProps) {
  const {
    min,
    max,
    isDateDisabled,
    weekStartsOn = 1,
    locale,
    defaultMonth,
    variant = "card",
    className,
  } = props;
  const isRange = props.mode === "range";

  const [uncontrolled, setUncontrolled] = useState<Date | DateRange | null | undefined>(
    props.defaultValue,
  );
  const selection = props.value !== undefined ? props.value : uncontrolled;
  const single = isRange ? null : ((selection as Date | null | undefined) ?? null);
  const range = isRange ? ((selection as DateRange | undefined) ?? { from: null, to: null }) : null;

  const today = startOfDay(new Date());
  const initial = single ?? range?.from ?? defaultMonth ?? today;
  const [month, setMonth] = useState(startOfMonth(initial));
  const [focused, setFocused] = useState(startOfDay(initial));
  const [hovered, setHovered] = useState<Date | null>(null);
  const gridRef = useRef<HTMLTableElement>(null);
  const titleId = useId();

  // Keep one day tabbable even after paging to a month that does not contain the focused day.
  const tabbable = isSameMonth(focused, month) ? focused : month;

  const weeks = useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    month,
  );
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: "full" });

  function disabled(date: Date) {
    return (
      (min !== undefined && date < startOfDay(min)) ||
      (max !== undefined && date > startOfDay(max)) ||
      (isDateDisabled?.(date) ?? false)
    );
  }

  function commit(next: Date | DateRange) {
    setUncontrolled(next);
    if (isRange) (props as RangeCalendarProps).onValueChange?.(next as DateRange);
    else (props as SingleCalendarProps).onValueChange?.(next as Date);
  }

  function select(date: Date) {
    if (disabled(date)) return;
    if (!isRange) {
      commit(date);
    } else if (!range?.from || range.to) {
      commit({ from: date, to: null });
    } else {
      commit(date < range.from ? { from: date, to: range.from } : { from: range.from, to: date });
    }
    setFocused(date);
    if (!isSameMonth(date, month)) setMonth(startOfMonth(date));
  }

  function moveFocus(next: Date) {
    const clamped = clampDate(next, min, max);
    setFocused(clamped);
    if (!isSameMonth(clamped, month)) setMonth(startOfMonth(clamped));
    // Focus after the grid re-renders with the new month.
    requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>('[data-focused="true"]')?.focus();
    });
  }

  function onKeyDown(event: KeyboardEvent) {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => addMonths(focused, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focused, event.shiftKey ? 12 : 1),
      Home: () => addDays(focused, -((focused.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(focused, 6 - ((focused.getDay() - weekStartsOn + 7) % 7)),
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      moveFocus(move());
    }
  }

  const rangeEnd = range?.to ?? (range?.from && hovered ? hovered : null);
  const [rangeStart, rangeStop] =
    range?.from && rangeEnd
      ? range.from <= rangeEnd
        ? [range.from, rangeEnd]
        : [rangeEnd, range.from]
      : [range?.from ?? null, range?.from ?? null];

  const navButton = cn(
    "inline-flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/8 disabled:opacity-30 [&_svg]:size-4",
    focusRing,
  );

  return (
    <div
      className={cn(
        "w-fit p-4 select-none",
        variant === "card" && "glass rounded-surface shadow-floating",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <p id={titleId} aria-live="polite" className="text-sm font-semibold">
          {monthLabel}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous month"
            className={navButton}
            disabled={min !== undefined && month <= startOfMonth(min)}
            onClick={() => setMonth(addMonths(month, -1))}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className={navButton}
            disabled={max !== undefined && month >= startOfMonth(max)}
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <table
        ref={gridRef}
        role="grid"
        aria-labelledby={titleId}
        className="border-collapse"
        onKeyDown={onKeyDown}
      >
        <thead>
          <tr>
            {weeks[0]!.map((day) => (
              <th
                key={day.getDay()}
                scope="col"
                className="size-9 text-center text-xs font-medium text-muted-foreground"
              >
                <abbr
                  title={new Intl.DateTimeFormat(locale, { weekday: "long" }).format(day)}
                  className="no-underline"
                >
                  {weekdayFormat.format(day).slice(0, 2)}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0]!.toISOString()}>
              {week.map((day) => {
                const outside = !isSameMonth(day, month);
                const isDisabled = disabled(day);
                const selected = isRange
                  ? isSameDay(day, rangeStart) || isSameDay(day, rangeStop)
                  : isSameDay(day, single);
                const between =
                  isRange && rangeStart && rangeStop && day > rangeStart && day < rangeStop;
                const isFocused = isSameDay(day, tabbable);
                return (
                  <td
                    key={day.toISOString()}
                    role="gridcell"
                    aria-selected={selected || !!between}
                    className={cn(
                      "p-0",
                      between && "bg-accent/15",
                      isRange &&
                        isSameDay(day, rangeStart) &&
                        rangeStop &&
                        !isSameDay(rangeStart, rangeStop) &&
                        "rounded-l-full bg-accent/15",
                      isRange &&
                        isSameDay(day, rangeStop) &&
                        rangeStart &&
                        !isSameDay(rangeStart, rangeStop) &&
                        "rounded-r-full bg-accent/15",
                    )}
                  >
                    <button
                      type="button"
                      tabIndex={isFocused ? 0 : -1}
                      data-focused={isFocused}
                      aria-label={dayLabel.format(day)}
                      aria-current={isSameDay(day, today) ? "date" : undefined}
                      disabled={isDisabled}
                      onClick={() => select(day)}
                      onFocus={() => setFocused(day)}
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "relative flex size-9 items-center justify-center rounded-full text-sm tabular-nums",
                        "transition-[background-color,color,scale] duration-(--alive-duration-fast) ease-spring active:scale-90",
                        "hover:bg-foreground/8 disabled:pointer-events-none disabled:opacity-30",
                        outside && "text-muted-foreground/60",
                        isSameDay(day, today) && !selected && "font-semibold text-accent",
                        selected &&
                          "bg-accent font-semibold text-accent-foreground shadow-raised hover:bg-accent",
                        focusRing,
                      )}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
