"use client";

import { ProjectsView } from "@aliveui/workspace/ui";
import { useRouter } from "next/navigation";
import { projectHref } from "@/lib/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  return <ProjectsView onOpenProject={(id) => router.push(projectHref(id))} />;
}
