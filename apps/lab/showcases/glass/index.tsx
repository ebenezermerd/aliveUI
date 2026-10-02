"use client";

import {
  Badge,
  Button,
  GlassProvider,
  GlassSurface,
  SegmentedControl,
  Toaster,
  type GlassMode,
} from "@aliveui/glass";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { ShowcaseHeader } from "@/components/showcase/showcase-header";
import type { DesignSystem } from "@/lib/registry";
import { ControlCenter } from "./control-center";
import { componentNames, GlassSections, sections } from "./sections";
import { Wallpaper } from "./wallpaper";

const modes = [
  { value: "light", label: <Sun />, "aria-label": "Light" },
  { value: "dark", label: <Moon />, "aria-label": "Dark" },
] as const;

export function GlassShowcase({ system }: { system: DesignSystem }) {
  const [mode, setMode] = useState<GlassMode>("light");

  return (
    <GlassProvider mode={mode} className="relative isolate">
      <Toaster>
        <Wallpaper mode={mode} />
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
                Layered light, built from tokens.
              </h2>
              <p className="opacity-75">
                Every surface blurs and saturates what sits behind it, adds an edge highlight and
                casts a soft, wide shadow. The scene on the right uses nothing but components from{" "}
                <code className="rounded-md bg-foreground/8 px-1.5 py-0.5 text-sm">
                  @aliveui/glass
                </code>
                .
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

          <GlassSections mode={mode} />
        </main>
      </Toaster>
    </GlassProvider>
  );
}

/** A small live sample of the system for the lab home page. */
export function GlassPreview() {
  return (
    <GlassProvider className="relative isolate flex size-full items-center justify-center overflow-hidden">
      <Wallpaper mode="light" fixed={false} />
      <GlassSurface padding="none" className="w-60 space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[conic-gradient(from_200deg,#f472b6,#60a5fa,#fbbf24,#f472b6)] shadow-raised" />
          <div>
            <p className="text-sm font-semibold">Midnight City</p>
            <p className="text-xs text-muted-foreground">M83</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="tinted">
            Play
          </Button>
          <Button size="sm">Queue</Button>
        </div>
      </GlassSurface>
    </GlassProvider>
  );
}
