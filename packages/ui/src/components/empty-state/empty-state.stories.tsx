import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { EmptyState } from "./empty-state.js";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  decorators: [withBackdrop],
  args: {
    title: "No photos yet",
    description: "Photos you import or take on your iPhone will appear here.",
    action: <Button variant="primary">Import photos</Button>,
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
