"use client";

import { AuthProvider } from "@aliveui/auth/react";
import type { ReactNode } from "react";
import { authAdapter } from "@/lib/auth";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider adapter={authAdapter}>{children}</AuthProvider>;
}
