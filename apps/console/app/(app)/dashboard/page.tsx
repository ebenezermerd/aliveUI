"use client";

import { useUser } from "@aliveui/auth/react";
import { OverviewView } from "@aliveui/workspace/glass";
import { useRouter } from "next/navigation";
import { projectHref } from "@/lib/navigation";

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();
  return (
    <OverviewView
      greetingName={user.name.split(" ")[0]}
      onOpenProject={(id) => router.push(projectHref(id))}
    />
  );
}
