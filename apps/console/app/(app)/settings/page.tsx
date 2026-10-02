"use client";

import { ChangePasswordForm, ProfileForm } from "@aliveui/auth/glass";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SegmentedControl,
} from "@aliveui/glass";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

const modes = [
  { value: "light", label: <Sun />, "aria-label": "Light" },
  { value: "dark", label: <Moon />, "aria-label": "Dark" },
] as const;

export default function SettingsPage() {
  const { mode, setMode } = useTheme();
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>How you appear to your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Other signed in tabs stay signed in.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose light or dark glass.</CardDescription>
        </CardHeader>
        <CardContent>
          <SegmentedControl
            items={modes}
            value={mode}
            onValueChange={setMode}
            aria-label="Colour mode"
          />
        </CardContent>
      </Card>
    </div>
  );
}
