"use client";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Switch,
} from "@aliveui/glass";
import { ShowcaseSection } from "@/components/showcase/showcase-section";

export function CardsSection() {
  return (
    <ShowcaseSection
      id="cards"
      title="Cards"
      description="Surfaces with header, content and footer slots."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Badge tone="warning" className="w-fit">
              92 percent used
            </Badge>
            <CardTitle>Storage almost full</CardTitle>
            <CardDescription>Upgrade to keep photos in sync on every device.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={92} aria-label="Storage used" />
          </CardContent>
          <CardFooter>
            <Button variant="tinted" size="sm">
              Upgrade
            </Button>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shared album</CardTitle>
            <CardDescription>Lisbon trip, 128 photos.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {["#f9a8d4", "#93c5fd", "#fcd34d", "#a7f3d0", "#c4b5fd", "#fdba74"].map((color) => (
              <div
                key={color}
                className="aspect-square rounded-xl shadow-raised"
                style={{ background: `linear-gradient(135deg, ${color}, white)` }}
              />
            ))}
          </CardContent>
          <CardFooter className="justify-between">
            <AvatarGroup>
              <Avatar alt="Ada Lovelace" size="sm" />
              <Avatar alt="Grace Hopper" size="sm" />
            </AvatarGroup>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
        <Card elevation="raised">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what reaches you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Messages", "Calendar", "Reminders"].map((name, index) => (
              <label key={name} className="flex items-center justify-between">
                {name}
                <Switch defaultChecked={index !== 2} />
              </label>
            ))}
          </CardContent>
        </Card>
      </div>
    </ShowcaseSection>
  );
}
