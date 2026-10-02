"use client";

import { AuthLayout, SignUpForm } from "@aliveui/auth/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand } from "@/components/brand";
import { renderLink } from "@/lib/link";
import { safeNext } from "@/lib/redirect";
import { useTheme } from "@/lib/theme";

export default function RegisterPage() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const { mode, system } = useTheme();

  return (
    <AuthLayout
      system={system}
      mode={mode}
      brand={<Brand />}
      title="Create your account"
      description="Start a workspace for your team in seconds."
    >
      <SignUpForm
        signInHref={next ? `/login?next=${encodeURIComponent(next)}` : "/login"}
        renderLink={renderLink}
        onSuccess={() => router.replace(safeNext(next))}
      />
    </AuthLayout>
  );
}
