import Link from "next/link";
import type { ReactNode } from "react";
import type { DesignSystem } from "@/lib/registry";

interface ShowcaseHeaderProps {
  system: DesignSystem;
  /** Extra controls on the right, such as a mode switch. */
  actions?: ReactNode;
  className?: string;
}

/** Title block shared by every system showcase. Colours come from the surrounding system. */
export function ShowcaseHeader({ system, actions, className }: ShowcaseHeaderProps) {
  return (
    <header className={className}>
      <Link href="/#systems" className="text-sm opacity-60 transition-opacity hover:opacity-100">
        ← All systems
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <h1 className="font-display text-5xl tracking-tight sm:text-6xl">{system.name}</h1>
          <p className="text-lg opacity-70">{system.description}</p>
        </div>
        {actions}
      </div>
    </header>
  );
}
