"use client";

import { AuthGuard } from "@aliveui/auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, type ReactNode } from "react";
import { ConsoleShell } from "@/components/console-shell";
import { FullScreenLoader } from "@/components/full-screen-loader";

export default function AppAreaLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const onDenied = useCallback(
    () => router.replace(`/login?next=${encodeURIComponent(pathname)}`),
    [router, pathname],
  );

  return (
    <AuthGuard require="authenticated" onDenied={onDenied} fallback={<FullScreenLoader />}>
      <ConsoleShell>{children}</ConsoleShell>
    </AuthGuard>
  );
}
