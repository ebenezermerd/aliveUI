"use client";

import type { GlassMode } from "@aliveui/glass";
import { useSyncExternalStore } from "react";

const storageKey = "aliveui.console.mode";
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

/** The saved choice, or the system preference when nothing is saved yet. */
function getMode(): GlassMode {
  const saved = localStorage.getItem(storageKey);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function setMode(mode: GlassMode) {
  localStorage.setItem(storageKey, mode);
  for (const listener of listeners) listener();
}

/** Light or dark glass, remembered across visits and shared between tabs. */
export function useTheme() {
  const mode = useSyncExternalStore(subscribe, getMode, () => "light" as const);
  return { mode, setMode };
}
