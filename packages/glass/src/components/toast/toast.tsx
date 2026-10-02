"use client";

import { cn } from "@aliveui/primitives";
import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { CloseIcon } from "../../lib/icons.js";
import { focusRing } from "../../lib/styles.js";
import { useGlassScope } from "../provider/provider.js";

export type ToastTone = "neutral" | "success" | "warning" | "danger";

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Milliseconds before the toast closes on its own. `0` keeps it open. */
  timeout?: number;
}

const manager = BaseToast.createToastManager();

/** Shows a toast from anywhere, including outside React. Returns its id. */
export function toast({ tone = "neutral", ...options }: ToastOptions): string {
  return manager.add({ ...options, type: tone });
}

/** Closes one toast by id, or every toast when no id is given. */
toast.dismiss = (id?: string) => manager.close(id);

const toneDot: Record<ToastTone, string> = {
  neutral: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/** Render once near the root of the app. Toasts stack in the bottom right corner. */
export function Toaster({ children }: { children?: ReactNode }) {
  const scope = useGlassScope();
  return (
    <BaseToast.Provider toastManager={manager} limit={3}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport
          {...scope}
          className="fixed right-4 bottom-4 z-50 mx-auto w-[calc(100vw-2rem)] sm:right-8 sm:bottom-8 sm:w-90"
        >
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((item) => {
    const tone = (item.type ?? "neutral") as ToastTone;
    return (
      <BaseToast.Root
        key={item.id}
        toast={item}
        className={cn(
          // Stacking, peeking and swipe maths from Base UI, kept as one block.
          "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.08)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
          "absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom select-none",
          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
          "h-(--height) data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
          "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)] data-ending-style:opacity-0",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
          "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
          "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
          "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
          "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
          "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
          "glass-overlay rounded-2xl text-foreground shadow-floating",
        )}
      >
        <BaseToast.Content className="flex items-start gap-3 overflow-hidden p-4 transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100">
          <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", toneDot[tone])} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <BaseToast.Title className="text-sm font-semibold" />
            <BaseToast.Description className="text-sm text-muted-foreground" />
          </div>
          <BaseToast.Close
            aria-label="Dismiss"
            className={cn(
              "-mt-1 -mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground",
              focusRing,
            )}
          >
            <CloseIcon className="size-3.5" />
          </BaseToast.Close>
        </BaseToast.Content>
      </BaseToast.Root>
    );
  });
}
