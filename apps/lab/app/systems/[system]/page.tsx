import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readySystems } from "@/lib/registry";
import { showcases } from "@/showcases";

interface SystemPageProps {
  params: Promise<{ system: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return readySystems.map((system) => ({ system: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { system: slug } = await params;
  return { title: readySystems.find((system) => system.slug === slug)?.name };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { system: slug } = await params;
  const system = readySystems.find((candidate) => candidate.slug === slug);
  if (!system) notFound();

  const { Showcase } = showcases[system.slug];

  return <Showcase system={system} />;
}
