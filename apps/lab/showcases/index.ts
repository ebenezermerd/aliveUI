import type { ComponentType } from "react";
import type { SystemSlug } from "@/lib/registry";
import { GlassPreview, GlassShowcase } from "./glass";
import { MinimalPreview, MinimalShowcase } from "./minimal";

interface SystemShowcase {
  /** Full page of components, rendered at `/systems/<slug>`. */
  Showcase: ComponentType;
  /** Small live sample, rendered on the lab home page card. */
  Preview: ComponentType;
}

/** One showcase per built design system. The type forces every system to have one. */
export const showcases: Record<SystemSlug, SystemShowcase> = {
  minimal: { Showcase: MinimalShowcase, Preview: MinimalPreview },
  glass: { Showcase: GlassShowcase, Preview: GlassPreview },
};
