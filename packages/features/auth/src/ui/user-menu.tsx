"use client";

import { Avatar, Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@aliveui/ui";
import type { ReactNode } from "react";
import { useSession } from "../react/provider.js";
import { useSignOut } from "../react/hooks.js";

export interface UserMenuProps {
  /** Called after signing out, usually to go to the sign in page. */
  onSignedOut?: () => void;
  /** Extra items above sign out, such as links to profile and settings. */
  children?: ReactNode;
}

/** The signed in person's avatar, opening a menu with their details and sign out. */
export function UserMenu({ onSignedOut, children }: UserMenuProps) {
  const state = useSession();
  const { signOut, pending } = useSignOut(onSignedOut);
  if (state.status !== "authenticated") return null;
  const { user } = state.session;

  return (
    <Menu>
      <MenuTrigger
        aria-label={`Account menu for ${user.name}`}
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Avatar alt={user.name} size="sm" />
      </MenuTrigger>
      <MenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 px-2.5 py-2">
          <Avatar alt={user.name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <MenuSeparator />
        {children}
        {children ? <MenuSeparator /> : null}
        <MenuItem onClick={() => void signOut()} disabled={pending} destructive>
          {pending ? "Signing out" : "Sign out"}
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
