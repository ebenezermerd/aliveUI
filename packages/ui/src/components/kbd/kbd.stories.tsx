import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Kbd } from "./kbd.js";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  decorators: [withBackdrop],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shortcut: Story = {
  render: () => (
    <p className="flex items-center gap-1.5 text-sm">
      Press <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to search
    </p>
  ),
};
