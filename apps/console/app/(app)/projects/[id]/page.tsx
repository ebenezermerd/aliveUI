"use client";

import { ProjectDetailView } from "@aliveui/workspace/ui";
import { useParams, useRouter } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  return <ProjectDetailView projectId={id} onBack={() => router.push("/projects")} />;
}
