"use client";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Kbd,
  Meter,
  Progress,
  Separator,
  Skeleton,
  Spinner,
} from "@aliveui/glass";
import { useEffect, useState } from "react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

function LiveProgress() {
  const [value, setValue] = useState(18);
  useEffect(() => {
    const timer = setInterval(() => setValue((current) => (current >= 100 ? 8 : current + 7)), 900);
    return () => clearInterval(timer);
  }, []);
  return <Progress value={value} label="Uploading 24 photos" showValue />;
}

export function DisplaySection() {
  return (
    <ShowcaseSection
      id="display"
      title="Display"
      description="Badges, avatars, progress and dividers for status and identity."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Draft</Badge>
            <Badge tone="accent">New</Badge>
            <Badge tone="success" dot>
              Online
            </Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Failed</Badge>
          </div>
        </Demo>
        <Demo label="Avatars">
          <div className="flex items-center gap-6">
            <div className="flex items-end gap-3">
              <Avatar alt="Ada Lovelace" size="sm" />
              <Avatar alt="Grace Hopper" />
              <Avatar alt="Alan Turing" size="lg" />
            </div>
            <AvatarGroup>
              <Avatar alt="Ada Lovelace" />
              <Avatar alt="Grace Hopper" />
              <Avatar alt="Alan Turing" />
              <Avatar alt="More" fallback="+5" />
            </AvatarGroup>
          </div>
        </Demo>
        <Demo label="Progress">
          <div className="space-y-5">
            <LiveProgress />
            <Progress value={null} aria-label="Syncing" />
          </div>
        </Demo>
        <Demo label="Separator">
          <div className="space-y-3 text-sm">
            <p>iCloud Drive</p>
            <Separator />
            <div className="flex h-5 items-center gap-3">
              <span>Photos</span>
              <Separator orientation="vertical" />
              <span>Notes</span>
              <Separator orientation="vertical" />
              <span>Mail</span>
            </div>
          </div>
        </Demo>
        <Demo label="Meter">
          <div className="space-y-4">
            <Meter value={38} label="Battery health" />
            <Meter value={93} label="iCloud storage" />
          </div>
        </Demo>
        <Demo label="Keyboard keys">
          <p className="flex items-center gap-1.5 text-sm">
            Press <Kbd>⌘</Kbd>
            <Kbd>K</Kbd> to open the command palette
          </p>
        </Demo>
        <Demo label="Spinner">
          <div className="flex items-center gap-5">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
          </div>
        </Demo>
        <Demo label="Skeleton">
          <div className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
