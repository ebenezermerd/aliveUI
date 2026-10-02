import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { Alert } from "./alert.js";

const meta = {
  title: "Glass/Alert",
  component: Alert,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { title: "Update available", children: "macOS 27.1 is ready to install." },
  argTypes: {
    tone: { control: "inline-radio", options: ["info", "success", "warning", "danger"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { className: "max-w-md" } };

export const WithAction: Story = {
  args: {
    className: "max-w-md",
    tone: "warning",
    title: "Battery low",
    children: "Connect to power soon.",
    action: <Button size="sm">Settings</Button>,
  },
};

export const Danger: Story = {
  args: {
    className: "max-w-md",
    tone: "danger",
    title: "Payment failed",
    children: "Check your card.",
  },
};
