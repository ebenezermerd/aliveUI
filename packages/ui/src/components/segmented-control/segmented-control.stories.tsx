import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { SegmentedControl } from "./segmented-control.js";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
] as const;

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl<string>,
  decorators: [withBackdrop],
  args: { items, defaultValue: "week", "aria-label": "Calendar range" },
} satisfies Meta<typeof SegmentedControl<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };
