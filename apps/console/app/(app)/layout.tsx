"use client";

import { AuthGuard } from "@aliveui/auth/react";
import { UserMenu } from "@aliveui/auth/glass";
import { GlassProvider, MenuItem, Toaster, Wallpaper } from "@aliveui/glass";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { useTheme } from "@/lib/theme";

export default function AppAreaLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { mode } = useTheme();
  const onDenied = useCallback(
    () => router.replace(`/login?next=${encodeURIComponent(pathname)}`),
    [router, pathname],
  );

  return (
    <AuthGuard require="authenticated" onDenied={onDenied} fallback={<FullScreenLoader />}>
      <GlassProvider mode={mode} className="relative isolate min-h-dvh">
        <Toaster>
          <Wallpaper />
          <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link href="/dashboard">
              <Brand />
            </Link>
            <UserMenu onSignedOut={() => router.replace("/login")}>
              <MenuItem onClick={() => router.push("/settings")}>Settings</MenuItem>
            </UserMenu>
          </header>
          <main className="mx-auto max-w-6xl px-6 pb-16">{children}</main>
        </Toaster>
      </GlassProvider>
    </AuthGuard>
  );
}
