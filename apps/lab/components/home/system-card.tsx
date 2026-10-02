import Link from "next/link";
import type { ComponentType } from "react";
import type { DesignSystem } from "@/lib/registry";
import { cn } from "@aliveui/primitives";

interface SystemCardProps {
  system: DesignSystem;
  /** The live preview for a built system, or the placeholder swatch for a planned one. */
  Art: ComponentType;
}

export function SystemCard({ system, Art }: SystemCardProps) {
  const ready = system.status === "ready";

  const body = (
    <>
      <div
        aria-hidden
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-black/5 ring-inset",
          "transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
          ready && "group-hover:scale-[1.015]",
          !ready && "saturate-[0.85]",
        )}
      >
        <Art />
      </div>
      <div className="flex items-start justify-between gap-3 px-1 pt-4">
        <div className="min-w-0">
          <h3 className="font-medium text-zinc-950">{system.name}</h3>
          <p className="mt-1 text-sm text-pretty text-zinc-500">{system.description}</p>
        </div>
        <StatusPill ready={ready} />
      </div>
    </>
  );

  if (!ready) return <div className="group block">{body}</div>;

  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50"
    >
      {body}
    </Link>
  );
}

function StatusPill({ ready }: { ready: boolean }) {
  return (
    <span
      className={cn(
        "mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        ready ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500",
      )}
    >
      <span className={cn("size-1.5 rounded-full", ready ? "bg-emerald-500" : "bg-zinc-400")} />
      {ready ? "Built" : "Planned"}
    </span>
  );
}
