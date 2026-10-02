# AliveUI

A workspace for experimenting with design systems and shipping the good parts as libraries. It
covers everything from a quiet minimal system to Apple style glass, plus WebGL, motion and scroll
experiments.

## Structure

```
apps/
  lab/          Next.js app for full page showcases and experiments
  console/      Team workspace app built from features, switchable between design systems
  storybook/    Isolated component workbench, stories live next to components
packages/
  tokens/       @aliveui/tokens      The semantic token contract every system fills in
  primitives/   @aliveui/primitives  Headless helpers shared by every system
  ui/           @aliveui/ui          The shared component kit, styled only through tokens
  minimal/      @aliveui/minimal     Minimal design system, a theme over the kit
  glass/        @aliveui/glass       Glass design system, a theme over the kit
  neumorphism/  @aliveui/neumorphism Neumorphism design system, a theme over the kit
  features/
    auth/       @aliveui/auth        Login and registration, headless plus design system blocks
    workspace/  @aliveui/workspace   Team workspace dashboard, headless plus design system blocks
tooling/
  typescript/   @aliveui/tsconfig        Shared tsconfig presets
  eslint/       @aliveui/eslint-config   Shared ESLint presets
```

Dependencies only flow one way: `tokens → primitives → ui → systems → features → apps`. Design systems
never import each other, and features never import each other.

## Features

A feature packages a whole capability in layers: a core with schemas, types and an adapter
contract, a React layer with hooks, and system agnostic blocks under a subpath such as
`@aliveui/auth/ui` that render in whichever design system is active. Data goes through the adapter, so the same screens run on the bundled
local browser adapter today and on a real API later. Run the console with `pnpm --filter console
dev` and open http://localhost:3001.

## Getting started

Requires Node 22 or newer and pnpm 10.

```sh
pnpm install
pnpm dev          # lab on http://localhost:3000, Storybook on http://localhost:6006
pnpm typecheck
pnpm lint
pnpm build
pnpm format
```

Run one workspace with a filter, for example `pnpm --filter lab dev`.

## How theming works

`@aliveui/tokens` defines a fixed set of semantic names (`surface`, `foreground`, `accent`,
`radius-control`, `shadow-floating` and so on) and maps them into Tailwind v4, so components use
utilities like `bg-surface` and `rounded-control`.

Each design system gives those names values as `--alive-*` CSS variables, scoped to a
`data-system` attribute. That scoping lets several systems sit on the same page:

```tsx
<SystemProvider system="glass" mode="dark">
  <Button variant="primary">Continue</Button>
</SystemProvider>
```

Beyond colours, the contract includes surface recipes: `surface-border`, `surface-image`,
`surface-filter`, `overlay`, `well`, `knob`, `shadow-pressed` and more. The kit draws panels with the
`surface`, `surface-overlay` and `surface-well` utilities that read them, so the same markup
becomes frosted glass, soft extruded plastic or flat paper depending on the theme.

## Using a system in an app

```css
@import "tailwindcss";
@import "@aliveui/glass/styles.css";

/* Point Tailwind at the package so it generates the classes the components use. */
@source "../node_modules/@aliveui/glass";
```

```tsx
import { Button, Surface, SystemProvider } from "@aliveui/glass";
```

Every system package re-exports the kit, so `@aliveui/ui` and `@aliveui/glass` give the same
components.

## Adding a design system

1. Copy `packages/minimal` to `packages/<name>` and rename the package to `@aliveui/<name>`.
2. Fill in every contract token in `src/styles/theme.css` under `[data-system="<name>"]`, plus the
   dark mode block. The whole kit, the feature blocks and the console pick it up from there.
3. Import the new `styles.css` in `apps/lab/app/globals.css`,
   `apps/storybook/.storybook/preview.css` and `apps/console/app/globals.css`, and add the name to
   the Storybook system toolbar and the console's `systems` list.
4. In `apps/lab/lib/registry.ts` set the system's status to `ready` and register
   `kitShowcase("<name>")` in `apps/lab/showcases`.

A system that needs different structure, not just different tokens, can add its own components
next to the theme and export them in place of the kit's.

## Roadmap

AliveUI covers 22 design systems. Minimalism, Glassmorphism and Neumorphism are built, and the
rest are planned: Claymorphism, Neo-Brutalism, Swiss Design, Editorial Design, Luxury
Typography, Bento Grid, Maximalism, Cybercore, Cyberpunk, Synthwave, Y2K Aesthetic, Pixel Art,
Scrapbook, Conceptual Sketch, Surrealism, Ethereal, Bohemian, Victorian and Wabi-Sabi.

The source of truth is `apps/lab/lib/registry.ts`, and the lab home page shows what is built and
what is planned.

## Adding an experiment

Experiments start in the lab, not in a package. Create
`apps/lab/app/experiments/<category>/<name>/page.tsx` and list it in `apps/lab/lib/registry.ts`.
When an experiment stabilises into something reusable, move it into a package (for example
`@aliveui/motion` or `@aliveui/webgl`) so it can be shipped.

## Releasing

Packages are versioned with [Changesets](./.changeset/README.md). Nothing is published yet.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit and pull request rules.
