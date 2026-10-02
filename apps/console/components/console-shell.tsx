"use client";

import { UserMenu } from "@aliveui/auth/glass";
import { useSignOut, useUser } from "@aliveui/auth/react";
import { IconButton, MenuItem } from "@aliveui/glass";
import { useWorkspaceState, WorkspaceProvider } from "@aliveui/workspace/react";
import {
  AppShell,
  NotificationsButton,
  QuickCreateMenu,
  WorkspaceGate,
  WorkspaceSearch,
} from "@aliveui/workspace/glass";
import { Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import { createWorkspaceAdapter } from "@/lib/workspace";
import { allPages, footerNav, mainNav, projectHref, renderNavLink } from "@/lib/navigation";
import { useTheme } from "@/lib/theme";
import { BrandMark } from "./brand";

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const dark = mode === "dark";
  return (
    <IconButton
      variant="ghost"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setMode(dark ? "light" : "dark")}
    >
      {dark ? <Sun /> : <Moon />}
    </IconButton>
  );
}

/** Header tools that need workspace data render once it has loaded. */
function HeaderActions() {
  const router = useRouter();
  const state = useWorkspaceState();
  const { mode, setMode } = useTheme();
  const { signOut } = useSignOut(() => router.replace("/login"));
  const ready = state.status === "ready";

  return (
    <>
      {ready ? (
        <WorkspaceSearch
          pages={allPages}
          onNavigate={(href) => router.push(href)}
          projectHref={projectHref}
          commands={[
            {
              value: "command:theme",
              label: mode === "dark" ? "Switch to light mode" : "Switch to dark mode",
              onSelect: () => setMode(mode === "dark" ? "light" : "dark"),
            },
            { value: "command:sign-out", label: "Sign out", onSelect: () => void signOut() },
          ]}
        />
      ) : null}
      {ready ? <QuickCreateMenu /> : null}
      {ready ? <NotificationsButton /> : null}
      <ThemeToggle />
      <UserMenu onSignedOut={() => router.replace("/login")}>
        <MenuItem onClick={() => router.push("/settings")}>Profile and settings</MenuItem>
        <MenuItem onClick={() => router.push("/team")}>Team</MenuItem>
      </UserMenu>
    </>
  );
}

export function ConsoleShell({ children }: { children: ReactNode }) {
  const user = useUser();
  const pathname = usePathname();
  const { mode } = useTheme();
  // A new adapter when the person or their name changes keeps their member record in step.
  const adapter = useMemo(() => createWorkspaceAdapter(user), [user]);

  return (
    <WorkspaceProvider adapter={adapter}>
      <AppShell
        brand={
          <span className="flex items-center gap-2.5 font-semibold tracking-tight">
            <BrandMark className="size-7" />
            AliveUI Console
          </span>
        }
        brandMark={<BrandMark className="size-7" />}
        nav={mainNav}
        footerNav={footerNav}
        pathname={pathname}
        renderLink={renderNavLink}
        mode={mode}
        actions={<HeaderActions />}
      >
        <WorkspaceGate>{children}</WorkspaceGate>
      </AppShell>
    </WorkspaceProvider>
  );
}
