"use client";

import { useUser } from "@aliveui/auth/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@aliveui/glass";

export default function DashboardPage() {
  const user = useUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {user.name.split(" ")[0]}</CardTitle>
        <CardDescription>Your workspace dashboard is on its way.</CardDescription>
      </CardHeader>
    </Card>
  );
}
