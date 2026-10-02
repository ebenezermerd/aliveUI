import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "./toolbar.js";

const meta = {
  title: "Glass/Toolbar",
  component: Toolbar,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Formatting">
      <ToolbarGroup aria-label="Style">
        <ToolbarButton aria-label="Bold" className="font-bold">
          B
        </ToolbarButton>
        <ToolbarButton aria-label="Italic" className="italic">
          I
        </ToolbarButton>
        <ToolbarButton aria-label="Underline" className="underline">
          U
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton>Share</ToolbarButton>
    </Toolbar>
  ),
};
