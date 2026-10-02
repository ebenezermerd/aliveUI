"use client";

import { AuthGuard } from "@aliveui/auth/react";
import { Toaster } from "@aliveui/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, type ReactNode } from "react";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { safeNext } from "@/lib/redirect";

function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const onDenied = useCallback(() => router.replace(safeNext(next)), [router, next]);
  return (
    <AuthGuard require="guest" onDenied={onDenied} fallback={<FullScreenLoader />}>
      {children}
    </AuthGuard>
  );
}

export default function AuthAreaLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Toaster>
        <GuestOnly>{children}</GuestOnly>
      </Toaster>
    </Suspense>
  );
}
