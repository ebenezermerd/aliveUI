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
  /** Shadow while something is being pressed, such as a sunken button. */
  "shadow-pressed",
  "blur-surface",
  // surface recipes, read by the `surface`, `surface-overlay`, `surface-well` and `knob` utilities
  /** Full border shorthand for surfaces, such as `1px solid ...` or `0 solid transparent`. */
  "surface-border",
  /** Layer painted over the surface colour, such as a glass sheen, or `none`. */
  "surface-image",
  /** Backdrop filter for surfaces, such as blur and saturate, or `none`. */
  "surface-filter",
  /** Background of floating popups, usually denser than `surface`. */
  "overlay",
  "overlay-filter",
  /** Recessed wells for fields, tracks and grooves. */
  "well",
  "well-border",
  "well-shadow",
  "well-filter",
  /** Thumbs of switches and sliders. */
  "knob",
  "knob-shadow",
  /** Dimmed layer behind modal dialogs and drawers. */
  "scrim",
  /** Opacity, 0 to 1, of the decorative colour fields drawn by `Backdrop`. */
  "backdrop-art",
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
