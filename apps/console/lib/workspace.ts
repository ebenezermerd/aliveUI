import type { User } from "@aliveui/auth";
import { createLocalWorkspaceAdapter } from "@aliveui/workspace/local";

/** Each signed in person gets their own workspace stored in this browser. */
export function createWorkspaceAdapter(user: User) {
  return createLocalWorkspaceAdapter({
    owner: { id: user.id, name: user.name, email: user.email },
    namespace: "aliveui.console.workspace",
  });
}
