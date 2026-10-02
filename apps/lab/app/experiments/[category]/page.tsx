import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experimentCategories, type ExperimentCategory } from "@/lib/registry";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categories: readonly ExperimentCategory[] = experimentCategories;

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  return { title: categories.find((category) => category.slug === slug)?.name };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = categories.find((candidate) => candidate.slug === slug);
  if (!category) notFound();

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{category.name}</h1>
        <p className="text-zinc-600">{category.description}</p>
      </header>

      {category.experiments.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
          No experiments yet. Add a folder at{" "}
          <code className="font-mono text-zinc-900">
            app/experiments/{category.slug}/&lt;name&gt;/page.tsx
          </code>{" "}
          and list it in <code className="font-mono text-zinc-900">lib/registry.ts</code>.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {category.experiments.map((experiment) => (
            <li key={experiment.slug}>
              <Link
                href={`/experiments/${category.slug}/${experiment.slug}`}
                className="block rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-400"
              >
                {experiment.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
