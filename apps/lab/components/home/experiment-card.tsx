import Link from "next/link";
import type { ExperimentCategory } from "@/lib/registry";

function WebglArt() {
  return (
    <div
      className="absolute inset-0 bg-zinc-950"
      style={{
        backgroundImage:
          "radial-gradient(circle at 30% 30%, #7c3aed, transparent 55%), radial-gradient(circle at 70% 70%, #06b6d4, transparent 55%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(#ffffff14_1px,transparent_1px),linear-gradient(90deg,#ffffff14_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  );
}

function MotionArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#f97316]">
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          key={index}
          className="size-3 animate-bounce rounded-full bg-white motion-reduce:animate-none"
          style={{ animationDelay: `${index * 120}ms` }}
        />
      ))}
    </div>
  );
}

function ScrollArt() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#0ea5e9] px-10">
      {[1, 0.8, 0.6, 0.4, 0.25].map((opacity, index) => (
        <span
          key={index}
          className="h-2 rounded-full bg-white"
          style={{ opacity, width: `${100 - index * 12}%` }}
        />
      ))}
    </div>
  );
}

const art = { webgl: WebglArt, motion: MotionArt, scroll: ScrollArt } as const;

export function ExperimentCard({ category }: { category: ExperimentCategory }) {
  const Art = art[category.slug as keyof typeof art];
  const count = category.experiments.length;

  return (
    <Link
      href={`/experiments/${category.slug}`}
      className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50"
    >
      <div
        aria-hidden
        className="relative aspect-[16/9] overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.015]"
      >
        {Art ? <Art /> : null}
      </div>
      <div className="flex items-baseline justify-between gap-3 px-1 pt-4">
        <h3 className="font-medium text-zinc-950">{category.name}</h3>
        <span className="text-xs text-zinc-500 tabular-nums">
          {count === 0 ? "Coming soon" : `${count} experiment${count === 1 ? "" : "s"}`}
        </span>
      </div>
      <p className="mt-1 px-1 text-sm text-zinc-500">{category.description}</p>
    </Link>
  );
}
