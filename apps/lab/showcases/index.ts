import type { ComponentType } from "react";
import type { SystemSlug } from "@/lib/registry";
import { GlassShowcase } from "./glass";
import { MinimalShowcase } from "./minimal";

/** One showcase per design system. The type forces every system to have one. */
export const showcases: Record<SystemSlug, ComponentType> = {
  minimal: MinimalShowcase,
  glass: GlassShowcase,
};
