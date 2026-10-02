import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "./button.js";

const meta = {
  title: "Glass/Button",
  component: Button,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["glass", "tinted"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {};

export const Tinted: Story = { args: { variant: "tinted" } };

export const Disabled: Story = { args: { disabled: true } };
