"use client";

import { cn } from "@aliveui/primitives";
import { createContext, useContext, type HTMLAttributes, type Ref } from "react";

export type GlassMode = "light" | "dark";

const GlassModeContext = createContext<GlassMode | undefined>(undefined);

/** The mode set by the nearest `GlassProvider`, if any. */
export function useGlassMode(): GlassMode | undefined {
  return useContext(GlassModeContext);
}

/**
 * Attributes that scope an element to the glass system. Popups are portalled
 * to the end of the document, outside any themed ancestor, so they spread
 * these onto themselves to keep the right tokens.
 */
export function useGlassScope() {
  const mode = useGlassMode();
  return { "data-system": "glass", "data-mode": mode } as const;
}

export interface GlassProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Colour mode for everything inside, including popups. Inherits from the page when omitted. */
  mode?: GlassMode;
  ref?: Ref<HTMLDivElement>;
}

/** Themes its children with the glass system and tells popups which mode to use. */
export function GlassProvider({ mode, className, ...props }: GlassProviderProps) {
  return (
    <GlassModeContext.Provider value={mode}>
      <div
        data-system="glass"
        data-mode={mode}
        className={cn("text-foreground", className)}
        {...props}
      />
    </GlassModeContext.Provider>
  );
}
