"use client";

import { cn } from "@aliveui/primitives";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { HTMLAttributes } from "react";
import { CloseIcon } from "../../lib/icons.js";
import { focusRing, popupSurface, type WithClassName } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export type DialogProps = BaseDialog.Root.Props;

/** A modal window over a dimmed, blurred page. */
export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}

export type DialogTriggerProps = WithClassName<BaseDialog.Trigger.Props>;

/** Pass `render={<Button />}` to use a kit button as the trigger. */
export function DialogTrigger(props: DialogTriggerProps) {
  return <BaseDialog.Trigger {...props} />;
}

export type DialogContentProps = WithClassName<BaseDialog.Popup.Props> & {
  /** Show a close button in the corner. */
  showClose?: boolean;
};

export function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: DialogContentProps) {
  const scope = useSystemScope();
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        {...scope}
        className={cn(
          "fixed inset-0 z-50 bg-(--alive-scrim) backdrop-blur-sm",
          "transition-opacity duration-(--alive-duration-base) ease-standard data-starting-style:opacity-0 data-ending-style:opacity-0",
        )}
      />
      <BaseDialog.Viewport {...scope} className="fixed inset-0 z-50 grid place-items-center p-4">
        <BaseDialog.Popup
          className={cn(
            popupSurface,
            "relative flex w-full max-w-md flex-col gap-5 rounded-surface p-6 outline-none",
            "transition-[scale,opacity,translate] duration-(--alive-duration-base) ease-spring",
            "data-starting-style:translate-y-2 data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-(--alive-duration-fast) data-ending-style:ease-standard",
            "motion-reduce:transition-none",
            className,
          )}
          {...props}
        >
          {children}
          {showClose ? (
            <BaseDialog.Close
              aria-label="Close"
              className={cn(
                "absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground",
                "transition-colors hover:bg-foreground/8 hover:text-foreground",
                focusRing,
              )}
            >
              <CloseIcon className="size-4" />
            </BaseDialog.Close>
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 pr-8", className)} {...props} />;
}

export type DialogTitleProps = WithClassName<BaseDialog.Title.Props>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn("text-lg leading-tight font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export type DialogDescriptionProps = WithClassName<BaseDialog.Description.Props>;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex justify-end gap-3", className)} {...props} />;
}

export type DialogCloseProps = WithClassName<BaseDialog.Close.Props>;

/** Pass `render={<Button />}` to close the dialog from a kit button. */
export function DialogClose(props: DialogCloseProps) {
  return <BaseDialog.Close {...props} />;
}
