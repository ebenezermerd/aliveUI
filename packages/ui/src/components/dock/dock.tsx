import { cn } from "@aliveui/primitives";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { focusRing } from "../../lib/styles.js";

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * A macOS style dock. Hovered items grow and their neighbours follow, done in
 * CSS alone so it stays smooth and respects reduced motion.
 */
export function Dock({ className, ...props }: DockProps) {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "surface inline-flex h-[4.5rem] items-end gap-2 rounded-[1.75rem] px-2.5 pb-2.5 shadow-floating",
        className,
      )}
      {...props}
    />
  );
}

export interface DockItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Shown above the item on hover and used as its accessible name. */
  label: string;
  /** The app icon, sized to fill the tile. */
  icon: ReactNode;
  /** Shows the running indicator dot. */
  active?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function DockItem({ className, label, icon, active = false, ...props }: DockItemProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "group/dock relative flex size-12 shrink-0 items-center justify-center",
        "transition-[width,height,margin] duration-200 ease-out motion-reduce:transition-none",
        // The hovered item, its direct neighbours, then the next ones out.
        "hover:size-[4.75rem] focus-visible:size-[4.75rem]",
        "[&:has(+*:hover)]:size-16 [*:hover+&]:size-16",
        "[&:has(+*+*:hover)]:size-[3.5rem] [*:hover+*+&]:size-[3.5rem]",
        "motion-reduce:hover:size-12 motion-reduce:[&:has(+*:hover)]:size-12 motion-reduce:[*:hover+&]:size-12",
        "[&>span:first-child]:size-full [&>span:first-child>*]:size-full",
        "rounded-2xl",
        focusRing,
        className,
      )}
      {...props}
    >
      <span className="flex items-center justify-center overflow-hidden rounded-[22%] shadow-raised">
        {icon}
      </span>
      <span
        aria-hidden
        className="surface-overlay pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 translate-y-1 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap text-foreground opacity-0 shadow-raised transition-[opacity,translate] duration-150 group-hover/dock:translate-y-0 group-hover/dock:opacity-100 group-focus-visible/dock:opacity-100"
      >
        {label}
      </span>
      {active ? (
        <span aria-hidden className="absolute -bottom-2 size-1 rounded-full bg-foreground/70" />
      ) : null}
    </button>
  );
}

/** A thin divider between groups of dock items. */
export function DockSeparator({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("mx-1 mb-1 h-10 w-px self-end bg-foreground/15", className)} />
  );
}
