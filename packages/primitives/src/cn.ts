import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the utilities generated from the token contract
// so that e.g. `rounded-control` correctly overrides `rounded-lg`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["control", "surface"],
      shadow: ["raised", "floating"],
      blur: ["surface"],
      ease: ["standard", "spring"],
    },
  },
});

/** Joins class names and resolves conflicting Tailwind utilities, last one wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
