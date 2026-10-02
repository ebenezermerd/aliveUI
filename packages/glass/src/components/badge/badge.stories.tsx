import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Badge } from "./badge.js";

const meta = {
  title: "Glass/Badge",
  component: Badge,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { children: "Badge" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "accent", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Draft</Badge>
      <Badge tone="accent">New</Badge>
      <Badge tone="success" dot>
        Online
      </Badge>
      <Badge tone="warning">Pending</Badge>
      <Badge tone="danger">Failed</Badge>
    </div>
  ),
};
