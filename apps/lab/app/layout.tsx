import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AliveUI Lab", template: "%s · AliveUI Lab" },
  description: "Where AliveUI design systems and experiments are built and tested.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-zinc-900 antialiased">
        <header className="border-b border-zinc-200">
          <nav className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-6 text-sm">
            <Link href="/" className="font-semibold">
              AliveUI Lab
            </Link>
            <Link href="/#systems" className="text-zinc-600 hover:text-zinc-900">
              Systems
            </Link>
            <Link href="/#experiments" className="text-zinc-600 hover:text-zinc-900">
              Experiments
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
