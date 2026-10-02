"use client";

import { useUser } from "@aliveui/auth/react";
import { TeamView } from "@aliveui/workspace/ui";

export default function TeamPage() {
  const user = useUser();
  return <TeamView currentMemberId={user.id} />;
}
