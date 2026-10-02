"use client";

import { cn } from "@aliveui/primitives";
import { createContext, useContext, type HTMLAttributes, type Ref } from "react";

export type Mode = "light" | "dark";

interface SystemContextValue {
  system: string | undefined;
  mode: Mode | undefined;
}

const SystemContext = createContext<SystemContextValue>({ system: undefined, mode: undefined });

/** The design system set by the nearest `SystemProvider`, if any. */
export function useSystem(): string | undefined {
  return useContext(SystemContext).system;
}

/** The colour mode set by the nearest `SystemProvider`, if any. */
export function useMode(): Mode | undefined {
  return useContext(SystemContext).mode;
}

/**
 * Attributes that scope an element to the active system and mode. Popups are
 * portalled to the end of the document, outside any themed ancestor, so they
 * spread these onto themselves to keep the right tokens.
 */
export function useSystemScope() {
  const { system, mode } = useContext(SystemContext);
  return { "data-system": system, "data-mode": mode } as const;
}

export interface SystemProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Which design system themes everything inside, such as `glass` or `neumorphism`. */
  system: string;
  /** Colour mode for everything inside, including popups. Inherits from the page when omitted. */
  mode?: Mode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Themes its children with a design system. Import that system's stylesheet
 * once, then any component inside picks up its tokens.
 */
export function SystemProvider({ system, mode, className, ...props }: SystemProviderProps) {
  return (
    <SystemContext.Provider value={{ system, mode }}>
      <div
        data-system={system}
        data-mode={mode}
        className={cn("text-foreground", className)}
        {...props}
      />
    </SystemContext.Provider>
  );
}
