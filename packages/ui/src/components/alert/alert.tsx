import { cn, variants, type VariantProps } from "@aliveui/primitives";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { AlertIcon, CheckCircleIcon, InfoIcon } from "../../lib/icons.js";

const alertVariants = variants(
  "surface relative flex gap-3 rounded-2xl p-4 text-sm shadow-raised [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      tone: {
        info: "[&>svg]:text-accent",
        success: "[&>svg]:text-success",
        warning: "[&>svg]:text-warning",
        danger: "border-danger/30 [&>svg]:text-danger",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

const icons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertIcon,
  danger: AlertIcon,
} as const;

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof alertVariants> {
  title?: ReactNode;
  /** Replace the tone icon, or pass `null` to hide it. */
  icon?: ReactNode;
  /** Trailing actions such as a button. */
  action?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** An inline message about the state of the page, such as a warning or a success. */
export function Alert({ className, tone, title, icon, action, children, ...props }: AlertProps) {
  const Icon = icons[tone ?? "info"];
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      {icon === undefined ? <Icon /> : icon}
      <div className="flex-1 space-y-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className="text-muted-foreground">{children}</div> : null}
      </div>
      {action ? <div className="flex shrink-0 items-start gap-2">{action}</div> : null}
    </div>
  );
}

export { alertVariants };
