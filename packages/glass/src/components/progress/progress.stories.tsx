import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Progress } from "./progress.js";

const meta = {
  title: "Glass/Progress",
  component: Progress,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { value: 64, label: "Uploading", showValue: true, className: "max-w-xs" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {};

export const Indeterminate: Story = { args: { value: null, showValue: false } };
