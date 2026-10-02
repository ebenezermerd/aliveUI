import { Button, GlassSurface } from "@aliveui/glass";

const modes = ["light", "dark"] as const;

/** Soft colour fields for the glass to refract. Glass needs something behind it. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-16 -left-10 size-64 rounded-full bg-fuchsia-400/70 blur-3xl" />
      <div className="absolute top-10 right-0 size-72 rounded-full bg-sky-400/70 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 size-72 rounded-full bg-amber-300/70 blur-3xl" />
    </div>
  );
}

export function GlassShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modes.map((mode) => (
        <section
          key={mode}
          data-system="glass"
          data-mode={mode}
          className="relative isolate overflow-hidden rounded-[2rem] bg-background p-8 sm:p-10"
        >
          <Backdrop />
          <GlassSurface padding="lg" className="space-y-5">
            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold tracking-tight capitalize">{mode} glass</h2>
              <p className="text-sm text-muted-foreground">
                A translucent pane that blurs and saturates the colour behind it, with an edge
                highlight and layered shadows for depth.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="tinted">Continue</Button>
              <Button>Not now</Button>
            </div>
          </GlassSurface>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
      ))}
    </div>
  );
}
