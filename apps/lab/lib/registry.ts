/** Families group related systems on the lab home page, in display order. */
export const families = [
  { slug: "tactile", name: "Tactile", description: "Surfaces with depth, softness and light." },
  { slug: "type", name: "Typographic", description: "Systems led by type, grid and whitespace." },
  { slug: "graphic", name: "Graphic", description: "Bold shapes, loud colour and strong layout." },
  { slug: "digital", name: "Digital", description: "Screens, neon, pixels and net nostalgia." },
  { slug: "handmade", name: "Handmade", description: "Paper, pencil, texture and imperfection." },
  { slug: "dream", name: "Dreamlike", description: "Soft light and impossible worlds." },
  { slug: "ornament", name: "Ornamental", description: "Decoration as the main event." },
] as const;

export type FamilySlug = (typeof families)[number]["slug"];

export interface DesignSystem {
  /** Route segment and package name, as in `@aliveui/<slug>`. */
  slug: string;
  name: string;
  description: string;
  /** `ready` systems have a package and a showcase, `planned` ones are on the roadmap. */
  status: "ready" | "planned";
  family: FamilySlug;
}

/**
 * Every design system AliveUI covers. When a planned system gets its package,
 * flip it to `ready` and give it a showcase in `showcases`.
 */
export const systems = [
  {
    slug: "minimal",
    name: "Minimalism",
    description: "Quiet surfaces, crisp type and almost no decoration.",
    status: "ready",
    family: "type",
  },
  {
    slug: "glass",
    name: "Glassmorphism",
    description: "Translucent layered surfaces with depth, blur and light.",
    status: "ready",
    family: "tactile",
  },
  {
    slug: "clay",
    name: "Claymorphism",
    description: "Soft, inflated shapes with rounded corners and inner shadows.",
    status: "planned",
    family: "tactile",
  },
  {
    slug: "neumorphism",
    name: "Neumorphism",
    description: "Controls extruded from the background with paired light and dark shadows.",
    status: "ready",
    family: "tactile",
  },
  {
    slug: "neobrutalism",
    name: "Neo-Brutalism",
    description: "Thick outlines, hard offset shadows and loud flat colour.",
    status: "planned",
    family: "graphic",
  },
  {
    slug: "swiss",
    name: "Swiss Design",
    description: "Strict grids, objective sans serif type and generous whitespace.",
    status: "planned",
    family: "type",
  },
  {
    slug: "editorial",
    name: "Editorial Design",
    description: "Magazine style layouts led by expressive type and imagery.",
    status: "planned",
    family: "type",
  },
  {
    slug: "luxury",
    name: "Luxury Typography",
    description: "Refined serifs, wide tracking and restrained, high contrast palettes.",
    status: "planned",
    family: "type",
  },
  {
    slug: "bento",
    name: "Bento Grid",
    description: "Modular tiles of varied sizes arranged in a compact grid.",
    status: "planned",
    family: "graphic",
  },
  {
    slug: "maximalism",
    name: "Maximalism",
    description: "Dense layers of colour, pattern and type with nothing held back.",
    status: "planned",
    family: "graphic",
  },
  {
    slug: "cybercore",
    name: "Cybercore",
    description: "Cold metallics, technical overlays and interface details from early net culture.",
    status: "planned",
    family: "digital",
  },
  {
    slug: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon on black, glitch effects and angular high tech panels.",
    status: "planned",
    family: "digital",
  },
  {
    slug: "synthwave",
    name: "Synthwave",
    description: "Retro futurist sunsets, neon grids and glowing gradients.",
    status: "planned",
    family: "digital",
  },
  {
    slug: "y2k",
    name: "Y2K Aesthetic",
    description: "Glossy bubbles, chrome type and optimistic millennium colour.",
    status: "planned",
    family: "digital",
  },
  {
    slug: "pixel",
    name: "Pixel Art",
    description: "Low resolution sprites, stepped edges and bitmap type.",
    status: "planned",
    family: "digital",
  },
  {
    slug: "scrapbook",
    name: "Scrapbook",
    description: "Torn paper, tape, stickers and handwritten notes layered by hand.",
    status: "planned",
    family: "handmade",
  },
  {
    slug: "sketch",
    name: "Conceptual Sketch",
    description: "Hand drawn lines, rough strokes and annotations like a working notebook.",
    status: "planned",
    family: "handmade",
  },
  {
    slug: "surrealism",
    name: "Surrealism",
    description: "Dreamlike compositions with unexpected scale and impossible forms.",
    status: "planned",
    family: "dream",
  },
  {
    slug: "ethereal",
    name: "Ethereal",
    description: "Airy gradients, soft glows and weightless, delicate type.",
    status: "planned",
    family: "dream",
  },
  {
    slug: "bohemian",
    name: "Bohemian",
    description: "Earthy colour, organic pattern and relaxed handcrafted detail.",
    status: "planned",
    family: "handmade",
  },
  {
    slug: "victorian",
    name: "Victorian",
    description: "Ornate borders, engraved flourishes and decorative serif type.",
    status: "planned",
    family: "ornament",
  },
  {
    slug: "wabi-sabi",
    name: "Wabi-Sabi",
    description: "Natural texture, muted tones and beauty in imperfection.",
    status: "planned",
    family: "handmade",
  },
] as const satisfies readonly DesignSystem[];

type ReadySystem = Extract<(typeof systems)[number], { status: "ready" }>;

/** Slugs of the systems that are built, which each need a showcase. */
export type SystemSlug = ReadySystem["slug"];

export const readySystems = systems.filter(
  (system): system is ReadySystem => system.status === "ready",
);

type PlannedSystem = Extract<(typeof systems)[number], { status: "planned" }>;

/** Slugs of the systems still on the roadmap, which each need a placeholder swatch. */
export type PlannedSlug = PlannedSystem["slug"];

export const plannedSystems = systems.filter(
  (system): system is PlannedSystem => system.status === "planned",
);

export function systemsInFamily(family: FamilySlug) {
  return systems.filter((system) => system.family === family);
}

/**
 * Experiment categories. Each experiment is its own route folder, for example
 * `app/experiments/webgl/<name>/page.tsx`, and is listed here once it exists.
 */
export const experimentCategories = [
  {
    slug: "webgl",
    name: "WebGL",
    description: "Shaders, canvases and GPU driven effects.",
    experiments: [],
  },
  {
    slug: "motion",
    name: "Motion",
    description: "Transitions, springs and choreographed animation.",
    experiments: [],
  },
  {
    slug: "scroll",
    name: "Scroll",
    description: "Scroll driven and scroll linked effects.",
    experiments: [],
  },
] as const satisfies readonly ExperimentCategory[];

export interface ExperimentCategory {
  slug: string;
  name: string;
  description: string;
  experiments: readonly { slug: string; name: string }[];
}
