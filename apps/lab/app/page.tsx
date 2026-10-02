import Link from "next/link";
import { experimentCategories, plannedSystems, readySystems, systems } from "@/lib/registry";

const cardClass =
  "block rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-400";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <section id="systems" className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Design systems</h1>
          <p className="text-sm text-zinc-500">
            {readySystems.length} of {systems.length} built
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {readySystems.map((system) => (
            <li key={system.slug}>
              <Link href={`/systems/${system.slug}`} className={cardClass}>
                <h2 className="font-medium">{system.name}</h2>
                <p className="mt-1 text-sm text-zinc-600">{system.description}</p>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="pt-4 text-sm font-medium text-zinc-500">Planned</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plannedSystems.map((system) => (
            <li key={system.slug} className="rounded-xl border border-dashed border-zinc-300 p-5">
              <h3 className="font-medium text-zinc-700">{system.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{system.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="experiments" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Experiments</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {experimentCategories.map((category) => (
            <li key={category.slug}>
              <Link href={`/experiments/${category.slug}`} className={cardClass}>
                <h3 className="font-medium">{category.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">{category.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
