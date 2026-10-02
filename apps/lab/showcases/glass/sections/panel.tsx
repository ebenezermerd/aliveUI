import { GlassSurface } from "@aliveui/glass";
import type { ReactNode } from "react";

/** The glass pane each showcase section sits on. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <GlassSurface padding="lg" className={className}>
      {children}
    </GlassSurface>
  );
}
