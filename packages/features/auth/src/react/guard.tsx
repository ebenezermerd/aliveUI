"use client";

import { useEffect, type ReactNode } from "react";
import { useSession } from "./provider.js";

export interface AuthGuardProps {
  /** `authenticated` protects private areas, `guest` keeps signed in people off the login pages. */
  require: "authenticated" | "guest";
  /** Called when the visitor does not meet the requirement, usually to redirect. */
  onDenied: () => void;
  /** Shown while the session is being checked or a redirect is under way. */
  fallback?: ReactNode;
  children: ReactNode;
}

/** Renders its children only when the session matches, and hands routing back to the app. */
export function AuthGuard({ require, onDenied, fallback = null, children }: AuthGuardProps) {
  const { status } = useSession();
  const allowed =
    require === "authenticated" ? status === "authenticated" : status === "unauthenticated";

  useEffect(() => {
    if (status !== "loading" && !allowed) onDenied();
  }, [status, allowed, onDenied]);

  return allowed ? children : fallback;
}
