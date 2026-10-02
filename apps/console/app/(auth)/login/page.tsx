"use client";

import { AuthLayout, SignInForm } from "@aliveui/auth/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand } from "@/components/brand";
import { renderLink } from "@/lib/link";
import { safeNext } from "@/lib/redirect";
import { useTheme } from "@/lib/theme";

export default function LoginPage() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const { mode, system } = useTheme();

  return (
    <AuthLayout
      system={system}
      mode={mode}
      brand={<Brand />}
      title="Welcome back"
      description="Sign in to your workspace."
    >
      <SignInForm
        signUpHref={next ? `/register?next=${encodeURIComponent(next)}` : "/register"}
        renderLink={renderLink}
        onSuccess={() => router.replace(safeNext(next))}
      />
    </AuthLayout>
  );
}
