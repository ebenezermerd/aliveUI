import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { DatePicker } from "./date-picker.js";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  decorators: [withBackdrop],
  args: { "aria-label": "Departure date" },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FutureOnly: Story = { args: { min: new Date(), placeholder: "Choose a future date" } };
