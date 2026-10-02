export interface DesignSystem {
  /** Route segment and package name, as in `@aliveui/<slug>`. */
  slug: string;
  name: string;
  description: string;
  /** `ready` systems have a package and a showcase, `planned` ones are on the roadmap. */
  status: "ready" | "planned";
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
  },
  {
    slug: "glass",
    name: "Glassmorphism",
    description: "Translucent layered surfaces with depth, blur and light.",
    status: "ready",
  },
  {
    slug: "clay",
    name: "Claymorphism",
    description: "Soft, inflated shapes with rounded corners and inner shadows.",
    status: "planned",
  },
  {
    slug: "neumorphism",
    name: "Neumorphism",
    description: "Controls extruded from the background with paired light and dark shadows.",
    status: "planned",
  },
  {
    slug: "neobrutalism",
    name: "Neo-Brutalism",
    description: "Thick outlines, hard offset shadows and loud flat colour.",
    status: "planned",
  },
  {
    slug: "swiss",
    name: "Swiss Design",
    description: "Strict grids, objective sans serif type and generous whitespace.",
    status: "planned",
  },
  {
    slug: "editorial",
    name: "Editorial Design",
    description: "Magazine style layouts led by expressive type and imagery.",
    status: "planned",
  },
  {
    slug: "luxury",
    name: "Luxury Typography",
    description: "Refined serifs, wide tracking and restrained, high contrast palettes.",
    status: "planned",
  },
  {
    slug: "bento",
    name: "Bento Grid",
    description: "Modular tiles of varied sizes arranged in a compact grid.",
    status: "planned",
  },
  {
    slug: "maximalism",
    name: "Maximalism",
    description: "Dense layers of colour, pattern and type with nothing held back.",
    status: "planned",
  },
  {
    slug: "cybercore",
    name: "Cybercore",
    description: "Cold metallics, technical overlays and interface details from early net culture.",
    status: "planned",
  },
  {
    slug: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon on black, glitch effects and angular high tech panels.",
    status: "planned",
  },
  {
    slug: "synthwave",
    name: "Synthwave",
    description: "Retro futurist sunsets, neon grids and glowing gradients.",
    status: "planned",
  },
  {
    slug: "y2k",
    name: "Y2K Aesthetic",
    description: "Glossy bubbles, chrome type and optimistic millennium colour.",
    status: "planned",
  },
  {
    slug: "pixel",
    name: "Pixel Art",
    description: "Low resolution sprites, stepped edges and bitmap type.",
    status: "planned",
  },
  {
    slug: "scrapbook",
    name: "Scrapbook",
    description: "Torn paper, tape, stickers and handwritten notes layered by hand.",
    status: "planned",
  },
  {
    slug: "sketch",
    name: "Conceptual Sketch",
    description: "Hand drawn lines, rough strokes and annotations like a working notebook.",
    status: "planned",
  },
  {
    slug: "surrealism",
    name: "Surrealism",
    description: "Dreamlike compositions with unexpected scale and impossible forms.",
    status: "planned",
  },
  {
    slug: "ethereal",
    name: "Ethereal",
    description: "Airy gradients, soft glows and weightless, delicate type.",
    status: "planned",
  },
  {
    slug: "bohemian",
    name: "Bohemian",
    description: "Earthy colour, organic pattern and relaxed handcrafted detail.",
    status: "planned",
  },
  {
    slug: "victorian",
    name: "Victorian",
    description: "Ornate borders, engraved flourishes and decorative serif type.",
    status: "planned",
  },
  {
    slug: "wabi-sabi",
    name: "Wabi-Sabi",
    description: "Natural texture, muted tones and beauty in imperfection.",
    status: "planned",
  },
] as const satisfies readonly DesignSystem[];

type ReadySystem = Extract<(typeof systems)[number], { status: "ready" }>;

/** Slugs of the systems that are built, which each need a showcase. */
export type SystemSlug = ReadySystem["slug"];

export const readySystems = systems.filter(
  (system): system is ReadySystem => system.status === "ready",
);

export const plannedSystems = systems.filter((system) => system.status === "planned");

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
