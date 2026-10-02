import { cn, Slot } from "@aliveui/primitives";
import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes, Ref } from "react";
import { focusRing } from "../../lib/styles.js";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

/** Shows where the current page sits in the hierarchy. Separators are drawn for you. */
export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="surface inline-flex flex-wrap items-center gap-1 rounded-full px-2 py-1 text-sm shadow-raised [&>li+li]:before:px-1 [&>li+li]:before:text-muted-foreground/60 [&>li+li]:before:content-['›']">
        {children}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center", className)} {...props} />;
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render your router's link component instead of an `<a>`. */
  asChild?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

export function BreadcrumbLink({ className, asChild = false, ...props }: BreadcrumbLinkProps) {
  const classes = cn(
    "rounded-full px-2.5 py-1 text-muted-foreground no-underline transition-colors hover:bg-foreground/8 hover:text-foreground",
    focusRing,
    className,
  );
  if (asChild) {
    const { ref, ...rest } = props;
    return <Slot className={classes} ref={ref as Ref<HTMLElement>} {...rest} />;
  }
  return <a className={classes} {...props} />;
}

/** The current page, the last crumb. */
export function BreadcrumbPage({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      className={cn("px-2.5 py-1 font-medium text-foreground", className)}
      {...props}
    />
  );
}
