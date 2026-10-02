import type { GlassMode } from "@aliveui/glass";
import { cn } from "@aliveui/primitives";

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

/** A soft, slowly drifting colour field. Glass needs something rich behind it to refract. */
export function Wallpaper({ mode, fixed = true }: { mode: GlassMode; fixed?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none inset-0 -z-10 overflow-hidden transition-colors duration-700",
        fixed ? "fixed" : "absolute",
        mode === "dark" ? "bg-[#0b1020]" : "bg-[#e7ecff]",
      )}
    >
      {blobs[mode].map((blob, index) => (
        <div
          key={blob}
          className={cn(
            "absolute rounded-full opacity-80 blur-[90px] motion-safe:animate-[drift_24s_ease-in-out_infinite_alternate]",
            mode === "dark" && "opacity-60",
            blob,
          )}
          style={{ animationDelay: `${index * -5}s` }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.06)_1px,transparent_1px)] bg-size-[22px_22px]" />
    </div>
  );
}
