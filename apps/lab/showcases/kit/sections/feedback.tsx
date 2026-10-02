"use client";

import { Alert, Button, EmptyState } from "@aliveui/ui";
import { ImagePlus } from "lucide-react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

export function FeedbackSection() {
  return (
    <ShowcaseSection
      id="feedback"
      title="Feedback"
      description="Inline alerts and empty states that explain what is going on."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Alerts">
          <div className="space-y-3">
            <Alert title="Update available">macOS 27.1 is ready to install.</Alert>
            <Alert tone="success" title="Backup complete">
              Everything is safe in iCloud.
            </Alert>
            <Alert tone="warning" title="Battery low" action={<Button size="sm">Settings</Button>}>
              Connect to power soon.
            </Alert>
            <Alert tone="danger" title="Payment failed">
              Check the card on file.
            </Alert>
          </div>
        </Demo>
        <Demo label="Empty state">
          <EmptyState
            icon={<ImagePlus />}
            title="No photos yet"
            description="Photos you import or take on your iPhone will appear here."
            action={<Button variant="primary">Import photos</Button>}
          />
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
