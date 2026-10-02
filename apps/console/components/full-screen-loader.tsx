"use client";

import { GlassProvider, Spinner, Wallpaper } from "@aliveui/glass";
import { useTheme } from "@/lib/theme";

/** Shown while the session is checked or a redirect is in flight. */
export function FullScreenLoader() {
  const { mode } = useTheme();
  return (
    <GlassProvider mode={mode} className="relative isolate grid min-h-dvh place-items-center">
      <Wallpaper />
      <Spinner size="lg" label="Loading" />
    </GlassProvider>
  );
}
