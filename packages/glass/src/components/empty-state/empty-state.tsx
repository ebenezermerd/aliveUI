import { cn } from "@aliveui/primitives";
import type { HTMLAttributes, ReactNode, Ref } from "react";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Call to action, usually a button. */
  action?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** What to show when a list or view has nothing in it yet. */
export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-3 px-6 py-12 text-center", className)}
      {...props}
    >
      {icon ? (
        <div className="glass mb-1 flex size-14 items-center justify-center rounded-2xl text-muted-foreground shadow-raised [&_svg]:size-6">
          {icon}
        </div>
      ) : null}
      <p className="text-base font-semibold">{title}</p>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
