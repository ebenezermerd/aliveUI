"use client";

import { ChangePasswordForm, ProfileForm } from "@aliveui/auth/glass";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SegmentedControl,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
} from "@aliveui/glass";
import { PageHeader, ResetWorkspaceButton, WorkspaceNameForm } from "@aliveui/workspace/glass";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

const modes = [
  { value: "light", label: <Sun />, "aria-label": "Light" },
  { value: "dark", label: <Moon />, "aria-label": "Dark" },
] as const;

export default function SettingsPage() {
  const { mode, setMode } = useTheme();
  return (
    <>
      <PageHeader title="Settings" description="Manage your account and this workspace." />
      <Tabs defaultValue="account">
        <TabsList>
          <Tab value="account">Account</Tab>
          <Tab value="workspace">Workspace</Tab>
          <Tab value="appearance">Appearance</Tab>
        </TabsList>
        <TabsPanel value="account" className="grid gap-6 lg:grid-cols-2">
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
              <CardDescription>Use a long phrase you do not use anywhere else.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>
        </TabsPanel>
        <TabsPanel value="workspace" className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>The name everyone sees.</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkspaceNameForm />
            </CardContent>
          </Card>
          <Card className="border-danger/30">
            <CardHeader>
              <CardTitle>Reset data</CardTitle>
              <CardDescription>
                This workspace is stored in your browser. Resetting restores the demo projects,
                tasks and people.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetWorkspaceButton />
            </CardContent>
          </Card>
        </TabsPanel>
        <TabsPanel value="appearance">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Light or dark glass. Saved on this device.</CardDescription>
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
        </TabsPanel>
      </Tabs>
    </>
  );
}
