import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { NumberField } from "./number-field.js";

const meta = {
  title: "Glass/NumberField",
  component: NumberField,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { defaultValue: 2, min: 0, max: 10, "aria-label": "Guests" },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Currency: Story = {
  args: {
    defaultValue: 49,
    step: 5,
    format: { style: "currency", currency: "USD" },
    "aria-label": "Price",
  },
};
