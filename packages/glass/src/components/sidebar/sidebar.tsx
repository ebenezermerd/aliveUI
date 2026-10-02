import { cn } from "@aliveui/primitives";
import {
  cloneElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { focusRing } from "../../lib/styles.js";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Show icons only. Labels stay available to assistive technology. */
  collapsed?: boolean;
  ref?: Ref<HTMLElement>;
}

/** The app's main navigation column, a tall glass panel. */
export function Sidebar({ className, collapsed = false, ...props }: SidebarProps) {
  return (
    <nav
      data-collapsed={collapsed || undefined}
      className={cn(
        "group/sidebar glass flex h-full flex-col gap-4 rounded-surface p-3 shadow-floating",
        "w-64 transition-[width] duration-(--alive-duration-base) ease-standard data-collapsed:w-[4.25rem]",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 px-1.5 py-1", className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex flex-col gap-1", className)} {...props} />;
}

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
}

export function SidebarSection({ className, label, children, ...props }: SidebarSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {label ? (
        <p className="px-3 pb-1 text-xs font-medium text-muted-foreground group-data-collapsed/sidebar:sr-only">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  /** Trailing count or status. Hidden when the sidebar is collapsed. */
  badge?: ReactNode;
  /** Marks the current page. */
  active?: boolean;
  /** Renders a plain link to this address instead of a button. */
  href?: string;
  /** Renders this element instead, such as your router's `<Link href="/inbox" />`. */
  render?: ReactElement<{ className?: string; children?: ReactNode }>;
  ref?: Ref<HTMLButtonElement>;
}

/** One destination. Pass `href` or `render` to navigate, or `onClick` for an action. */
export function SidebarItem({
  className,
  icon,
  badge,
  active = false,
  href,
  render,
  children,
  ...props
}: SidebarItemProps) {
  const classes = cn(
    "flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-foreground/80 no-underline",
    "transition-[background-color,color] duration-(--alive-duration-fast) hover:bg-foreground/6 hover:text-foreground",
    "data-active:bg-accent data-active:text-accent-foreground data-active:shadow-raised",
    "group-data-collapsed/sidebar:justify-center group-data-collapsed/sidebar:px-0",
    "[&_svg]:size-[1.125rem] [&_svg]:shrink-0",
    focusRing,
    className,
  );
  const content = (
    <>
      {icon}
      <span className="flex-1 truncate group-data-collapsed/sidebar:sr-only">{children}</span>
      {badge !== undefined ? (
        <span className="text-xs tabular-nums opacity-70 group-data-collapsed/sidebar:hidden">
          {badge}
        </span>
      ) : null}
    </>
  );
  const shared = {
    "data-active": active || undefined,
    "aria-current": active ? ("page" as const) : undefined,
  };

  if (render) {
    // Forward handlers and refs too, so tooltips and click handlers reach the link.
    return cloneElement(render, {
      ...(props as Record<string, unknown>),
      className: classes,
      children: content,
      ...shared,
    });
  }
  if (href) {
    return (
      <a href={href} className={classes} {...(props as Record<string, unknown>)} {...shared}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...shared} {...props}>
      {content}
    </button>
  );
}
