import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Toggle, ToggleGroup } from "./toggle.js";

const meta = {
  title: "Glass/Toggle",
  component: Toggle,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { children: "Favourite", "aria-label": "Favourite" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Pressed: Story = { args: { defaultPressed: true } };

export const Group: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
      <Toggle value="bold" aria-label="Bold" className="font-bold">
        B
      </Toggle>
      <Toggle value="italic" aria-label="Italic" className="italic">
        I
      </Toggle>
      <Toggle value="underline" aria-label="Underline" className="underline">
        U
      </Toggle>
    </ToggleGroup>
  ),
};
