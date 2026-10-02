# AliveUI

A workspace for experimenting with design systems and shipping the good parts as libraries. It
covers everything from a quiet minimal system to Apple style glass, plus WebGL, motion and scroll
experiments.

## Structure

```
apps/
  lab/          Next.js app for full page showcases and experiments
  storybook/    Isolated component workbench, stories live next to components
packages/
  tokens/       @aliveui/tokens      The semantic token contract every system fills in
  primitives/   @aliveui/primitives  Headless helpers shared by every system
  minimal/      @aliveui/minimal     Minimal design system
  glass/        @aliveui/glass       Glass design system
tooling/
  typescript/   @aliveui/tsconfig        Shared tsconfig presets
  eslint/       @aliveui/eslint-config   Shared ESLint presets
```

Dependencies only flow one way: `tokens → primitives → systems → apps`. Design systems never
import each other.

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
<div data-system="glass" data-mode="dark">
  <Button variant="tinted">Continue</Button>
</div>
```

A system may add its own extension variables (glass has `--alive-glass-sheen`), but shared
components only rely on the contract.

## Using a system in an app

```css
@import "tailwindcss";
@import "@aliveui/glass/styles.css";

/* Point Tailwind at the package so it generates the classes the components use. */
@source "../node_modules/@aliveui/glass";
```

```tsx
import { Button, GlassSurface } from "@aliveui/glass";
```

## Adding a design system

1. Copy `packages/minimal` to `packages/<name>` and rename the package to `@aliveui/<name>`.
2. Fill in every token in `src/styles/theme.css` under `[data-system="<name>"]`.
3. Build components in `src/components/<component>/` with a `.tsx`, a `.stories.tsx` and an
   `index.ts`, and export them from `src/index.ts`.
4. Import the new `styles.css` in `apps/lab/app/globals.css` and
   `apps/storybook/.storybook/preview.css`.
5. Add the system to `apps/lab/lib/registry.ts` and give it a showcase in `apps/lab/showcases`.

## Adding an experiment

Experiments start in the lab, not in a package. Create
`apps/lab/app/experiments/<category>/<name>/page.tsx` and list it in `apps/lab/lib/registry.ts`.
When an experiment stabilises into something reusable, move it into a package (for example
`@aliveui/motion` or `@aliveui/webgl`) so it can be shipped.

## Releasing

Packages are versioned with [Changesets](./.changeset/README.md). Nothing is published yet.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit and pull request rules.
