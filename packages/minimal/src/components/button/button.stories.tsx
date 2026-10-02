import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";

const meta = {
  title: "Minimal/Button",
  component: Button,
  parameters: { system: "minimal" },
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Disabled: Story = { args: { disabled: true } };
