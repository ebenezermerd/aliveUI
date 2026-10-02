import { cn } from "@aliveui/primitives";
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

/** A data table on a surface. Scrolls sideways on narrow screens. */
export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="surface w-full overflow-x-auto rounded-surface shadow-raised">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("border-b border-foreground/10", className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("[&>tr:not(:last-child)]:border-b [&>tr]:border-foreground/6", className)}
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn("border-t border-foreground/10 bg-foreground/3 font-medium", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-foreground/4 data-selected:bg-accent/10 aria-selected:bg-accent/10",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-xs font-medium whitespace-nowrap text-muted-foreground first:pl-6 last:pr-6",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3 align-middle first:pl-6 last:pr-6", className)} {...props} />;
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn("caption-bottom px-6 py-3 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
