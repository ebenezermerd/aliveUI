import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Slider } from "./slider.js";

const meta = {
  title: "Components/Slider",
  component: Slider,
  decorators: [withBackdrop],
  args: { defaultValue: 40, "aria-label": "Volume", className: "max-w-xs" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Range: Story = {
  args: { defaultValue: [20, 70], thumbLabels: ["Minimum price", "Maximum price"] },
};

export const Disabled: Story = { args: { disabled: true } };
