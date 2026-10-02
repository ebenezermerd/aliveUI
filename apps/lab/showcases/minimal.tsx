import { Button } from "@aliveui/minimal";

const modes = ["light", "dark"] as const;
const variants = ["solid", "outline", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

export function MinimalShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modes.map((mode) => (
        <section
          key={mode}
          data-system="minimal"
          data-mode={mode}
          className="space-y-6 rounded-surface border border-border bg-background p-8"
        >
          <h2 className="text-sm font-medium text-muted-foreground capitalize">{mode}</h2>
          <div className="flex flex-wrap items-center gap-3">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} className="capitalize">
                {variant}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                Size {size}
              </Button>
            ))}
            <Button disabled>Disabled</Button>
          </div>
        </section>
      ))}
    </div>
  );
}

/** A small live sample of the system for the lab home page. */
export function MinimalPreview() {
  return (
    <div data-system="minimal" className="flex size-full items-center justify-center bg-background">
      <div className="w-56 space-y-3 rounded-surface border border-border bg-surface-raised p-4 shadow-floating">
        <div className="space-y-1">
          <p className="text-sm font-medium">Invite your team</p>
          <p className="text-xs text-muted-foreground">Collaborate on every project.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Invite</Button>
          <Button size="sm" variant="outline">
            Later
          </Button>
        </div>
      </div>
    </div>
  );
}
