"use client";

import { SystemProvider, Spinner, Backdrop } from "@aliveui/ui";
import { useTheme } from "@/lib/theme";

/** Shown while the session is checked or a redirect is in flight. */
export function FullScreenLoader() {
  const { mode, system } = useTheme();
  return (
    <SystemProvider
      system={system}
      mode={mode}
      className="relative isolate grid min-h-dvh place-items-center"
    >
      <Backdrop />
      <Spinner size="lg" label="Loading" />
    </SystemProvider>
  );
}
