import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Calendar } from "./calendar.js";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  decorators: [withBackdrop],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { defaultValue: new Date() } };

export const Range: Story = {
  render: () => <Calendar mode="range" />,
};

export const NoWeekends: Story = {
  args: { isDateDisabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6 },
};
