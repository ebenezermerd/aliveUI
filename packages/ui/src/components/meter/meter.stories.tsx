import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Meter } from "./meter.js";

const meta = {
  title: "Glass/Meter",
  component: Meter,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { value: 42, label: "Storage", className: "max-w-xs" },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Healthy: Story = {};

export const Warning: Story = { args: { value: 82 } };

export const Critical: Story = { args: { value: 96 } };
