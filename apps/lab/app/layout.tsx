import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: { default: "AliveUI Lab", template: "%s · AliveUI Lab" },
  description: "Where AliveUI design systems and experiments are built and tested.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-dvh bg-stone-50 font-sans text-zinc-950 antialiased">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-stone-50/80 backdrop-blur-md">
          <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6 text-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span
                aria-hidden
                className="size-5 rounded-md bg-[conic-gradient(from_200deg,#f0abfc,#7dd3fc,#fde68a,#f0abfc)]"
              />
              AliveUI
            </Link>
            <Link href="/#systems" className="text-zinc-600 hover:text-zinc-950">
              Systems
            </Link>
            <Link href="/#experiments" className="text-zinc-600 hover:text-zinc-950">
              Experiments
            </Link>
            <a
              href="https://github.com/ebenezermerd/aliveUI"
              className="ml-auto text-zinc-600 hover:text-zinc-950"
            >
              GitHub
            </a>
          </nav>
        </header>
        {children}
        <footer className="border-t border-zinc-200">
          <p className="mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-500">
            AliveUI Lab. Built in the open, one system at a time.
          </p>
        </footer>
      </body>
    </html>
  );
}
