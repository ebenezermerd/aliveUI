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
