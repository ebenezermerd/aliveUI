import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Spinner } from "./spinner.js";

const meta = {
  title: "Glass/Spinner",
  component: Spinner,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = { args: { size: "lg" } };
