import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { Tooltip, TooltipProvider } from "./tooltip.js";

const meta = {
  title: "Glass/Tooltip",
  component: Tooltip,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { content: "Add to library", children: <Button>Hover me</Button> },
  argTypes: { side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] } },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grouped: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip content="Back">
          <Button size="sm">Back</Button>
        </Tooltip>
        <Tooltip content="Forward">
          <Button size="sm">Forward</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
