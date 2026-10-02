"use client";

import { cn } from "@aliveui/primitives";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { createContext, useContext, type HTMLAttributes } from "react";
import { CloseIcon } from "../../lib/icons.js";
import { focusRing, type WithClassName } from "../../lib/styles.js";
import { useGlassScope } from "../provider/provider.js";

export type DrawerSide = "right" | "left" | "bottom";

const DrawerSideContext = createContext<DrawerSide>("right");

const swipeDirection = { right: "right", left: "left", bottom: "down" } as const;

export type DrawerProps = Omit<BaseDrawer.Root.Props, "swipeDirection"> & {
  /** Edge the drawer slides in from. Swipe toward that edge to dismiss it. */
  side?: DrawerSide;
};

/** A panel that slides in from an edge, also known as a sheet. */
export function Drawer({ side = "right", ...props }: DrawerProps) {
  return (
    <DrawerSideContext.Provider value={side}>
      <BaseDrawer.Root swipeDirection={swipeDirection[side]} {...props} />
    </DrawerSideContext.Provider>
  );
}

export type DrawerTriggerProps = WithClassName<BaseDrawer.Trigger.Props>;

/** Pass `render={<Button />}` to use a glass button as the trigger. */
export function DrawerTrigger(props: DrawerTriggerProps) {
  return <BaseDrawer.Trigger {...props} />;
}

// The popup overshoots its edge by a bleed so a springy open never shows a gap.
const sideClasses: Record<DrawerSide, { viewport: string; popup: string }> = {
  right: {
    viewport: "items-stretch justify-end p-2",
    popup: cn(
      "h-full w-[min(24rem,calc(100vw-1rem))] rounded-surface",
      "[transform:translateX(var(--drawer-swipe-movement-x))]",
      "data-starting-style:[transform:translateX(calc(100%+1rem))] data-ending-style:[transform:translateX(calc(100%+1rem))]",
    ),
  },
  left: {
    viewport: "items-stretch justify-start p-2",
    popup: cn(
      "h-full w-[min(24rem,calc(100vw-1rem))] rounded-surface",
      "[transform:translateX(var(--drawer-swipe-movement-x))]",
      "data-starting-style:[transform:translateX(calc(-100%-1rem))] data-ending-style:[transform:translateX(calc(-100%-1rem))]",
    ),
  },
  bottom: {
    viewport: "items-end justify-center px-2",
    popup: cn(
      "max-h-[85vh] w-full max-w-2xl rounded-t-[2rem] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]",
      "[transform:translateY(var(--drawer-swipe-movement-y))]",
      "data-starting-style:[transform:translateY(100%)] data-ending-style:[transform:translateY(100%)]",
    ),
  },
};

export type DrawerContentProps = WithClassName<BaseDrawer.Popup.Props> & {
  showClose?: boolean;
};

export function DrawerContent({
  className,
  children,
  showClose = true,
  ...props
}: DrawerContentProps) {
  const side = useContext(DrawerSideContext);
  const scope = useGlassScope();
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        {...scope}
        className={cn(
          "fixed inset-0 z-50 bg-(--alive-glass-scrim) opacity-[calc(1-var(--drawer-swipe-progress))] backdrop-blur-sm",
          "transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
        )}
      />
      <BaseDrawer.Viewport
        {...scope}
        className={cn("fixed inset-0 z-50 flex", sideClasses[side].viewport)}
      >
        <BaseDrawer.Popup
          className={cn(
            "glass-overlay relative flex flex-col overflow-y-auto overscroll-contain p-6 text-foreground shadow-floating outline-none",
            "transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none",
            "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] motion-reduce:transition-none",
            sideClasses[side].popup,
            className,
          )}
          {...props}
        >
          {side === "bottom" ? (
            <div
              aria-hidden
              className="mx-auto -mt-2 mb-4 h-1.5 w-10 shrink-0 rounded-full bg-foreground/20"
            />
          ) : null}
          <BaseDrawer.Content className="flex flex-1 flex-col gap-5">{children}</BaseDrawer.Content>
          {showClose && side !== "bottom" ? (
            <BaseDrawer.Close
              aria-label="Close"
              className={cn(
                "absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground",
                focusRing,
              )}
            >
              <CloseIcon className="size-4" />
            </BaseDrawer.Close>
          ) : null}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 pr-8", className)} {...props} />;
}

export type DrawerTitleProps = WithClassName<BaseDrawer.Title.Props>;

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <BaseDrawer.Title
      className={cn("text-lg leading-tight font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export type DrawerDescriptionProps = WithClassName<BaseDrawer.Description.Props>;

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex justify-end gap-3", className)} {...props} />;
}

export type DrawerCloseProps = WithClassName<BaseDrawer.Close.Props>;

/** Pass `render={<Button />}` to close the drawer from a glass button. */
export function DrawerClose(props: DrawerCloseProps) {
  return <BaseDrawer.Close {...props} />;
}
