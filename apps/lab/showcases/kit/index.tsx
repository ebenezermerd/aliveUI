"use client";

import {
  Badge,
  Button,
  type Mode,
  SystemProvider,
  Surface,
  SegmentedControl,
  Toaster,
  Backdrop,
} from "@aliveui/ui";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { ShowcaseHeader } from "@/components/showcase/showcase-header";
import type { DesignSystem } from "@/lib/registry";
import { ControlCenter } from "./control-center";
import { componentNames, KitSections, sections } from "./sections";

const modes = [
  { value: "light", label: <Sun />, "aria-label": "Light" },
  { value: "dark", label: <Moon />, "aria-label": "Dark" },
] as const;

/** The full kit, rendered in whichever design system the page is for. */
export function KitShowcase({ system }: { system: DesignSystem }) {
  const [mode, setMode] = useState<Mode>("light");

  return (
    <SystemProvider system={system.slug} mode={mode} className="relative isolate">
      <Toaster>
        <Backdrop mode={mode} />
        <main className="mx-auto max-w-6xl space-y-16 px-6 py-16">
          <ShowcaseHeader
            system={system}
            actions={
              <div className="flex items-center gap-3">
                <Badge tone="accent">{componentNames.length} components</Badge>
                <SegmentedControl
                  items={modes}
                  value={mode}
                  onValueChange={setMode}
                  aria-label="Colour mode"
                />
              </div>
            }
          />

          <section className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                One kit, themed by tokens.
              </h2>
              <p className="opacity-75">
                Every component on this page comes from{" "}
                <code className="rounded-md bg-foreground/8 px-1.5 py-0.5 text-sm">
                  @aliveui/ui
                </code>{" "}
                and takes its look from the {system.name} theme. The scene on the right is built
                from nothing but kit components.
              </p>
              <nav aria-label="Sections" className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <Button key={section.id} size="sm" asChild>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </Button>
                ))}
              </nav>
            </div>
            <ControlCenter />
          </section>

          <KitSections mode={mode} />
        </main>
      </Toaster>
    </SystemProvider>
  );
}

/** A small live sample of a system for the lab home page. */
export function KitPreview({ system }: { system: string }) {
  return (
    <SystemProvider
      system={system}
      className="relative isolate flex size-full items-center justify-center overflow-hidden bg-background"
    >
      <Backdrop mode="light" fixed={false} />
      <Surface padding="none" className="w-60 space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[conic-gradient(from_200deg,#f472b6,#60a5fa,#fbbf24,#f472b6)] shadow-raised" />
          <div>
            <p className="text-sm font-semibold">Midnight City</p>
            <p className="text-xs text-muted-foreground">M83</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary">
            Play
          </Button>
          <Button size="sm">Queue</Button>
        </div>
      </Surface>
    </SystemProvider>
  );
}
