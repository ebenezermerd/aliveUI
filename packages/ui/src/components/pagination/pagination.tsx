"use client";

import { cn } from "@aliveui/primitives";
import { ChevronLeftIcon, ChevronRightIcon, MoreIcon } from "../../lib/icons.js";
import { focusRing, pressable } from "../../lib/styles.js";

export interface PaginationProps {
  /** Current page, starting at 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current one before collapsing into an ellipsis. */
  siblings?: number;
  className?: string;
}

type Slot = number | "gap-start" | "gap-end";

/** Works out which page numbers to show, collapsing long runs into an ellipsis. */
export function paginationRange(page: number, pageCount: number, siblings = 1): Slot[] {
  // First, last, current, its siblings and two gaps. The count stays fixed so the control never jumps.
  const visible = siblings * 2 + 5;
  if (pageCount <= visible) return range(1, pageCount);

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, pageCount);

  if (left <= 3) return [...range(1, visible - 2), "gap-end", pageCount];
  if (right >= pageCount - 2) return [1, "gap-start", ...range(pageCount - visible + 3, pageCount)];
  return [1, "gap-start", ...range(left, right), "gap-end", pageCount];
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

const pageButton = cn(
  "inline-flex size-9 items-center justify-center rounded-full text-sm font-medium tabular-nums select-none [&_svg]:size-4",
  "hover:bg-foreground/8 disabled:pointer-events-none disabled:opacity-35",
  pressable,
  focusRing,
);

/** Moves between pages of a long list. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  className,
}: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="surface inline-flex items-center gap-1 rounded-full p-1 shadow-raised">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={pageButton}
          >
            <ChevronLeftIcon />
          </button>
        </li>
        {paginationRange(page, pageCount, siblings).map((slot) =>
          typeof slot === "number" ? (
            <li key={slot}>
              <button
                type="button"
                aria-label={`Page ${slot}`}
                aria-current={slot === page ? "page" : undefined}
                onClick={() => onPageChange(slot)}
                className={cn(
                  pageButton,
                  slot === page && "bg-accent text-accent-foreground shadow-raised hover:bg-accent",
                )}
              >
                {slot}
              </button>
            </li>
          ) : (
            <li
              key={slot}
              aria-hidden
              className="flex size-9 items-center justify-center opacity-50"
            >
              <MoreIcon className="size-4" />
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
            className={pageButton}
          >
            <ChevronRightIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
}
