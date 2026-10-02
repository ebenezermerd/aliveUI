import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "./button.js";

const meta = {
  title: "Components/Button",
  component: Button,
  decorators: [withBackdrop],
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "primary", "ghost", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: "primary" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Danger: Story = { args: { variant: "danger", children: "Delete" } };

export const Disabled: Story = { args: { disabled: true } };
