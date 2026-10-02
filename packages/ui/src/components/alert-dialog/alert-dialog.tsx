"use client";

import { cn } from "@aliveui/primitives";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { HTMLAttributes } from "react";
import { popupSurface, type WithClassName } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type AlertDialogProps = BaseAlertDialog.Root.Props;

/**
 * A modal that interrupts to confirm an important action. Unlike `Dialog` it
 * cannot be dismissed by clicking outside, the user has to choose.
 */
export function AlertDialog(props: AlertDialogProps) {
  return <BaseAlertDialog.Root {...props} />;
}

export type AlertDialogTriggerProps = WithClassName<BaseAlertDialog.Trigger.Props>;

/** Pass `render={<Button />}` to use a kit button as the trigger. */
export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <BaseAlertDialog.Trigger {...props} />;
}

export type AlertDialogContentProps = WithClassName<BaseAlertDialog.Popup.Props>;

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  const scope = useSystemScope();
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        {...scope}
        className="fixed inset-0 z-50 bg-(--alive-scrim) backdrop-blur-sm transition-opacity duration-(--alive-duration-base) data-starting-style:opacity-0 data-ending-style:opacity-0"
      />
      <BaseAlertDialog.Viewport
        {...scope}
        className="fixed inset-0 z-50 grid place-items-center p-4"
      >
        <BaseAlertDialog.Popup
          className={cn(
            popupSurface,
            "flex w-full max-w-sm flex-col gap-5 rounded-surface p-6 text-center outline-none",
            "transition-[scale,opacity] duration-(--alive-duration-base) ease-spring",
            "data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            "motion-reduce:transition-none",
            className,
          )}
          {...props}
        />
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}

export function AlertDialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export type AlertDialogTitleProps = WithClassName<BaseAlertDialog.Title.Props>;

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      className={cn("text-lg leading-tight font-semibold", className)}
      {...props}
    />
  );
}

export type AlertDialogDescriptionProps = WithClassName<BaseAlertDialog.Description.Props>;

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Stacks the actions full width, like a system alert. */
export function AlertDialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3 [&>*]:w-full", className)} {...props} />;
}

export type AlertDialogCloseProps = WithClassName<BaseAlertDialog.Close.Props>;

/** Pass `render={<Button />}` to close the alert from a kit button. */
export function AlertDialogClose(props: AlertDialogCloseProps) {
  return <BaseAlertDialog.Close {...props} />;
}
