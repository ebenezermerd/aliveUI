import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { OTPField } from "./otp-field.js";

const meta = {
  title: "Glass/OTPField",
  component: OTPField,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { length: 6, groupSize: 3, "aria-label": "Verification code" },
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FourDigits: Story = { args: { length: 4, groupSize: undefined } };
