/**
 * The semantic token contract. Every design system must give each of these
 * names a value, as a `--alive-<name>` CSS variable scoped to its
 * `[data-system]` selector. Components only ever read these names, which is
 * what lets systems be swapped or rendered side by side.
 */
export const tokenNames = [
  // color
  "background",
  "surface",
  "surface-raised",
  "foreground",
  "muted-foreground",
  "border",
  "accent",
  "accent-foreground",
  "ring",
  "danger",
  "danger-foreground",
  "success",
  "warning",
  // shape
  "radius-control",
  "radius-surface",
  // elevation
  "shadow-raised",
  "shadow-floating",
  "blur-surface",
  // motion
  "duration-fast",
  "duration-base",
  "ease-standard",
  "ease-spring",
] as const;

export type TokenName = (typeof tokenNames)[number];

/** CSS custom property name for a token, e.g. `--alive-surface`. */
export function tokenProperty(name: TokenName): `--alive-${TokenName}` {
  return `--alive-${name}`;
}

/** `var()` reference for a token, for inline styles, canvas and WebGL code. */
export function tokenVar(name: TokenName, fallback?: string): string {
  return fallback === undefined
    ? `var(${tokenProperty(name)})`
    : `var(${tokenProperty(name)}, ${fallback})`;
}

/** A full set of token values, useful when a system defines its theme in code. */
export type TokenValues = Record<TokenName, string>;
