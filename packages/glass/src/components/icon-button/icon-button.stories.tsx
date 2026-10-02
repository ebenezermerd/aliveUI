import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseIcon } from "../../lib/icons.js";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { IconButton } from "./icon-button.js";

const meta = {
  title: "Glass/IconButton",
  component: IconButton,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { "aria-label": "Close", children: <CloseIcon /> },
  argTypes: {
    variant: { control: "inline-radio", options: ["glass", "tinted", "ghost", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {};

export const Tinted: Story = { args: { variant: "tinted" } };

export const Large: Story = { args: { size: "lg" } };
