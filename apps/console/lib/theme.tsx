"use client";

import type { Mode } from "@aliveui/ui";
import { useSyncExternalStore } from "react";

/** Design systems the console can render in. Their stylesheets are imported in `globals.css`. */
export const systems = [
  { value: "glass", label: "Glass", description: "Translucent layers over colour." },
  { value: "neumorphism", label: "Neumorphism", description: "Soft surfaces shaped by light." },
  { value: "minimal", label: "Minimal", description: "Quiet, flat and precise." },
] as const;

export type ConsoleSystem = (typeof systems)[number]["value"];

const keys = { mode: "aliveui.console.mode", system: "aliveui.console.system" };
const darkQuery = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia(darkQuery);
  window.addEventListener("storage", listener);
  media.addEventListener("change", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
    media.removeEventListener("change", listener);
  };
}

function notify() {
  for (const listener of listeners) listener();
}

/** The saved choice, or the system preference when nothing is saved yet. */
function getMode(): Mode {
  const saved = localStorage.getItem(keys.mode);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function getSystem(): ConsoleSystem {
  const saved = localStorage.getItem(keys.system);
  return systems.some((system) => system.value === saved) ? (saved as ConsoleSystem) : "glass";
}

function setMode(mode: Mode) {
  localStorage.setItem(keys.mode, mode);
  notify();
}

function setSystem(system: ConsoleSystem) {
  localStorage.setItem(keys.system, system);
  notify();
}

/** Design system and light or dark mode, remembered across visits and shared between tabs. */
export function useTheme() {
  const mode = useSyncExternalStore(subscribe, getMode, () => "light" as const);
  const system = useSyncExternalStore(subscribe, getSystem, () => "glass" as const);
  return { mode, setMode, system, setSystem };
}
