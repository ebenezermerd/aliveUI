"use client";

import { cn } from "@aliveui/primitives";
import { useMode, type Mode } from "../provider/provider.js";

const blobs = {
  light: [
    "top-[-10%] left-[-5%] size-[38rem] bg-[#ff9ad5]",
    "top-[10%] right-[-10%] size-[42rem] bg-[#7cc7ff]",
    "bottom-[-15%] left-[20%] size-[40rem] bg-[#ffd36e]",
    "top-[45%] left-[-12%] size-[30rem] bg-[#a78bfa]",
    "bottom-[5%] right-[5%] size-[28rem] bg-[#6ee7c8]",
  ],
  dark: [
    "top-[-10%] left-[-5%] size-[38rem] bg-[#7c3aed]",
    "top-[10%] right-[-10%] size-[42rem] bg-[#0369a1]",
    "bottom-[-15%] left-[20%] size-[40rem] bg-[#be185d]",
    "top-[45%] left-[-12%] size-[30rem] bg-[#4338ca]",
    "bottom-[5%] right-[5%] size-[28rem] bg-[#b45309]",
  ],
} as const;

export interface BackdropProps {
  /** Defaults to the nearest `SystemProvider` mode, then light. */
  mode?: Mode;
  /** Pin to the viewport. Otherwise it fills the nearest positioned ancestor. */
  fixed?: boolean;
  /** Let the colour fields drift slowly. Always off for reduced motion. */
  animated?: boolean;
  className?: string;
}

/** The page backdrop. Systems that use colour fields, such as glass, show them through the `backdrop-art` token. */
export function Backdrop({ mode, fixed = true, animated = true, className }: BackdropProps) {
  const inherited = useMode();
  const resolved = mode ?? inherited ?? "light";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none inset-0 -z-10 overflow-hidden transition-colors duration-700",
        fixed ? "fixed" : "absolute",
        "bg-background",
        className,
      )}
    >
      {blobs[resolved].map((blob, index) => (
        <div
          key={blob}
          className={cn(
            "absolute rounded-full opacity-(--alive-backdrop-art) blur-[90px]",
            animated && "motion-safe:animate-[alive-drift_24s_ease-in-out_infinite_alternate]",
            blob,
          )}
          style={{ animationDelay: `${index * -5}s` }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.06)_1px,transparent_1px)] bg-size-[22px_22px] opacity-(--alive-backdrop-art)" />
    </div>
  );
}
