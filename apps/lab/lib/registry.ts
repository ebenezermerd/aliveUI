/** Design systems the lab can showcase. Add a system here and in `showcases`. */
export const systems = [
  {
    slug: "minimal",
    name: "Minimal",
    description: "Quiet surfaces, crisp type and almost no decoration.",
  },
  {
    slug: "glass",
    name: "Glass",
    description: "Translucent layered surfaces with depth, blur and light.",
  },
] as const;

export type SystemSlug = (typeof systems)[number]["slug"];

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
