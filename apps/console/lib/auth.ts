import { createLocalAuthAdapter } from "@aliveui/auth/local";

/**
 * The console runs entirely in the browser for now. Swap this for an adapter
 * that talks to a real API, every screen keeps working unchanged.
 */
export const authAdapter = createLocalAuthAdapter({ namespace: "aliveui.console.auth" });
