# @aliveui/neumorphism

Soft UI, as a theme over the [AliveUI kit](../ui/README.md). Every surface shares the background
colour and gets its depth from a pair of shadows, light from the top left and dark from the bottom
right. Buttons and panels are extruded, fields and tracks are pressed in, and controls sink while
you press them.

```css
@import "tailwindcss";
@import "@aliveui/neumorphism/styles.css";
@source "../node_modules/@aliveui/ui";
```

```tsx
import { Button, SystemProvider } from "@aliveui/neumorphism";

<SystemProvider system="neumorphism" className="bg-background">
  <Button variant="primary">Continue</Button>
</SystemProvider>;
```

Neumorphism relies on subtle shadows, so keep it on its own background colour and pair it with
the accent colour for anything that must stand out.
