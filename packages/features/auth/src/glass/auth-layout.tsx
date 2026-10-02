"use client";

import { GlassProvider, GlassSurface, Wallpaper, type GlassMode } from "@aliveui/glass";
import type { ReactNode } from "react";

export interface AuthLayoutProps {
  title: ReactNode;
  description?: ReactNode;
  /** Logo or product name above the card. */
  brand?: ReactNode;
  /** Shown under the card, such as a link to the other auth page. */
  footer?: ReactNode;
  mode?: GlassMode;
  children: ReactNode;
}

/** A centred glass card over the wallpaper, the frame for every auth screen. */
export function AuthLayout({ title, description, brand, footer, mode, children }: AuthLayoutProps) {
  return (
    <GlassProvider
      mode={mode}
      className="relative isolate flex min-h-dvh flex-col items-center justify-center px-4 py-12"
    >
      <Wallpaper />
      {brand ? <div className="mb-8">{brand}</div> : null}
      <GlassSurface padding="none" className="w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {children}
      </GlassSurface>
      {footer ? <div className="mt-6 text-sm">{footer}</div> : null}
    </GlassProvider>
  );
}
