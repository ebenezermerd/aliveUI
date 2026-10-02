import { Surface } from "@aliveui/ui";
import type { ReactNode } from "react";

/** The surface each showcase section sits on. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Surface padding="lg" className={className}>
      {children}
    </Surface>
  );
}
