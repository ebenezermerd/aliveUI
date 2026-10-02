import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { toast, Toaster } from "./toast.js";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  decorators: [withBackdrop],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tones: Story = {
  render: () => (
    <Toaster>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => toast({ title: "Copied", description: "Link copied to clipboard." })}
        >
          Neutral
        </Button>
        <Button
          onClick={() =>
            toast({ title: "Backup complete", description: "All files are safe.", tone: "success" })
          }
        >
          Success
        </Button>
        <Button
          onClick={() =>
            toast({ title: "Upload failed", description: "Check your connection.", tone: "danger" })
          }
        >
          Danger
        </Button>
        <Button
          onClick={() =>
            toast({
              title: "Message archived",
              action: { label: "Undo", onClick: () => toast({ title: "Restored" }) },
            })
          }
        >
          With action
        </Button>
      </div>
    </Toaster>
  ),
};
