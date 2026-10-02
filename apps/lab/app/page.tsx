import type { ComponentType } from "react";
import { ExperimentCard } from "@/components/home/experiment-card";
import { swatches } from "@/components/home/swatches";
import { SystemCard } from "@/components/home/system-card";
import {
  experimentCategories,
  families,
  readySystems,
  systems,
  systemsInFamily,
  type DesignSystem,
  type PlannedSlug,
  type SystemSlug,
} from "@/lib/registry";
import { showcases } from "@/showcases";

function artFor(system: DesignSystem): ComponentType {
  return system.status === "ready"
    ? showcases[system.slug as SystemSlug].Preview
    : swatches[system.slug as PlannedSlug];
}

export default function HomePage() {
  const stats = [
    { value: systems.length, label: "Design systems" },
    { value: readySystems.length, label: "Built so far" },
    { value: families.length, label: "Families" },
    { value: experimentCategories.length, label: "Experiment tracks" },
  ];

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
        <p className="text-sm font-medium tracking-wide text-zinc-500">AliveUI Lab</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-balance text-zinc-950 sm:text-7xl">
          Every design system, <em className="text-zinc-500">alive</em> in one place.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-pretty text-zinc-600">
          A workspace for building interfaces in many styles, from quiet minimalism to Apple grade
          glass, and shipping the good parts as libraries.
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-stone-50 px-5 py-4">
              <dt className="text-xs text-zinc-500">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950 tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <nav
        aria-label="Families"
        className="sticky top-14 z-10 border-y border-zinc-200 bg-stone-50/80 backdrop-blur-md"
      >
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-2 text-sm [scrollbar-width:none]">
          {families.map((family) => (
            <li key={family.slug}>
              <a
                href={`#${family.slug}`}
                className="block rounded-full px-3 py-1.5 whitespace-nowrap text-zinc-600 transition-colors hover:bg-zinc-200/60 hover:text-zinc-950"
              >
                {family.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#experiments"
              className="block rounded-full px-3 py-1.5 whitespace-nowrap text-zinc-600 transition-colors hover:bg-zinc-200/60 hover:text-zinc-950"
            >
              Experiments
            </a>
          </li>
        </ul>
      </nav>

      <div id="systems" className="mx-auto max-w-6xl space-y-20 px-6 py-16">
        {families.map((family) => {
          const members = systemsInFamily(family.slug);
          return (
            <section key={family.slug} id={family.slug} className="scroll-mt-32">
              <header className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200 pb-4">
                <h2 className="font-display text-3xl tracking-tight text-zinc-950">
                  {family.name}
                </h2>
                <p className="text-sm text-zinc-500">{family.description}</p>
              </header>
              <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((system) => (
                  <li key={system.slug}>
                    <SystemCard system={system} Art={artFor(system)} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section id="experiments" className="scroll-mt-32 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl tracking-tight text-zinc-950">Experiments</h2>
            <p className="text-sm text-zinc-500">
              Ideas start here and graduate into packages when they are ready.
            </p>
          </header>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {experimentCategories.map((category) => (
              <li key={category.slug}>
                <ExperimentCard category={category} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
