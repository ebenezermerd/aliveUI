"use client";

import { ChangePasswordForm, ProfileForm } from "@aliveui/auth/ui";
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Radio,
  RadioGroup,
  SegmentedControl,
  Surface,
  SystemProvider,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
} from "@aliveui/ui";
import { PageHeader, ResetWorkspaceButton, WorkspaceNameForm } from "@aliveui/workspace/ui";
import { Moon, Sun } from "lucide-react";
import { systems, useTheme, type ConsoleSystem } from "@/lib/theme";

const modes = [
  { value: "light", label: <Sun />, "aria-label": "Light" },
  { value: "dark", label: <Moon />, "aria-label": "Dark" },
] as const;

export default function SettingsPage() {
  const { mode, setMode, system, setSystem } = useTheme();
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
        <TabsPanel value="appearance" className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Design system</CardTitle>
              <CardDescription>
                The whole console redraws in the system you pick. Saved on this device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                aria-label="Design system"
                value={system}
                onValueChange={(value) => setSystem(value as ConsoleSystem)}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {systems.map((option) => (
                  <label
                    key={option.value}
                    className="surface-well flex cursor-pointer flex-col gap-3 rounded-2xl p-3 has-[[data-checked]]:ring-2 has-[[data-checked]]:ring-accent"
                  >
                    <SystemProvider
                      system={option.value}
                      mode={mode}
                      className="relative isolate flex h-28 items-center justify-center gap-2 overflow-hidden rounded-xl bg-background"
                    >
                      <Backdrop fixed={false} animated={false} />
                      <Surface padding="none" className="flex items-center gap-2 rounded-2xl p-3">
                        <Button size="sm" variant="primary" tabIndex={-1}>
                          Save
                        </Button>
                        <Button size="sm" tabIndex={-1}>
                          Cancel
                        </Button>
                      </Surface>
                    </SystemProvider>
                    <span className="flex items-center gap-2.5 px-1">
                      <Radio value={option.value} />
                      <span>
                        <span className="block text-sm font-medium">{option.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mode</CardTitle>
              <CardDescription>Light or dark, in any system.</CardDescription>
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
