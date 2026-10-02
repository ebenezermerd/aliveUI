import type { ComponentType } from "react";
import type { DesignSystem, SystemSlug } from "@/lib/registry";
import { KitPreview, KitShowcase } from "./kit";

interface SystemShowcase {
  /** Full page of components, rendered at `/systems/<slug>`. It owns its own layout. */
  Showcase: ComponentType<{ system: DesignSystem }>;
  /** Small live sample, rendered on the lab home page card. */
  Preview: ComponentType;
}

/** Systems built on the shared kit all reuse the kit showcase in their own theme. */
function kitShowcase(slug: SystemSlug): SystemShowcase {
  const Preview = () => <KitPreview system={slug} />;
  return { Showcase: KitShowcase, Preview };
}

/** One showcase per built design system. The type forces every system to have one. */
export const showcases: Record<SystemSlug, SystemShowcase> = {
  minimal: kitShowcase("minimal"),
  glass: kitShowcase("glass"),
  neumorphism: kitShowcase("neumorphism"),
};
