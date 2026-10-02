import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { systems } from "@/lib/registry";
import { showcases } from "@/showcases";

interface SystemPageProps {
  params: Promise<{ system: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return systems.map((system) => ({ system: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { system: slug } = await params;
  return { title: systems.find((system) => system.slug === slug)?.name };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { system: slug } = await params;
  const system = systems.find((candidate) => candidate.slug === slug);
  if (!system) notFound();

  const Showcase = showcases[system.slug];

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{system.name}</h1>
        <p className="text-zinc-600">{system.description}</p>
      </header>
      <Showcase />
    </main>
  );
}
