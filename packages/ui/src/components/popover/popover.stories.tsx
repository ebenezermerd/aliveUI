import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { Switch } from "../switch/switch.js";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "./popover.js";

const meta = {
  title: "Glass/Popover",
  component: Popover,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button />}>Focus</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Do not disturb</PopoverTitle>
        <PopoverDescription>Silence notifications until tomorrow morning.</PopoverDescription>
        <label className="mt-4 flex items-center justify-between text-sm">
          Allow calls from favourites
          <Switch defaultChecked />
        </label>
      </PopoverContent>
    </Popover>
  ),
};
