# @aliveui/glass

Apple style glassmorphism, as a theme over the [AliveUI kit](../ui/README.md). Translucent
surfaces blur and saturate whatever sits behind them, with an edge highlight, a soft sheen and
wide layered shadows, over a backdrop of soft colour fields.

```css
@import "tailwindcss";
@import "@aliveui/glass/styles.css";
@source "../node_modules/@aliveui/ui";
```

```tsx
import { Backdrop, Button, SystemProvider } from "@aliveui/glass";

<SystemProvider system="glass">
  <Backdrop />
  <Button variant="primary">Continue</Button>
</SystemProvider>;
```

The package re-exports every kit component, so it can be the only AliveUI import an app needs.
