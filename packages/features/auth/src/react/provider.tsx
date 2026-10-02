"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthAdapter, Session } from "../types.js";

export type SessionState =
  | { status: "loading"; session: null }
  | { status: "authenticated"; session: Session }
  | { status: "unauthenticated"; session: null };

interface AuthContextValue {
  adapter: AuthAdapter;
  state: SessionState;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Makes an auth adapter and the live session available to every hook and block below it. */
export function AuthProvider({ adapter, children }: { adapter: AuthAdapter; children: ReactNode }) {
  const [state, setState] = useState<SessionState>({ status: "loading", session: null });

  useEffect(() => {
    let active = true;
    const apply = (session: Session | null) => {
      if (!active) return;
      setState(
        session
          ? { status: "authenticated", session }
          : { status: "unauthenticated", session: null },
      );
    };
    adapter.getSession().then(apply, () => apply(null));
    const unsubscribe = adapter.subscribe(apply);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [adapter]);

  const value = useMemo(() => ({ adapter, state }), [adapter, state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth hooks must be used inside an AuthProvider.");
  return context;
}

export function useAuthAdapter(): AuthAdapter {
  return useAuthContext().adapter;
}

/** Whether someone is signed in, and who. Starts as `loading` while the adapter checks. */
export function useSession(): SessionState {
  return useAuthContext().state;
}

/** The signed in user. Throws outside an authenticated area, so guard the route first. */
export function useUser() {
  const state = useSession();
  if (state.status !== "authenticated") {
    throw new Error("useUser needs an authenticated session. Wrap the area in a guard.");
  }
  return state.session.user;
}
