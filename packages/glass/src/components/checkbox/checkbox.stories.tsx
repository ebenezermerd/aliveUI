import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Checkbox } from "./checkbox.js";

const meta = {
  title: "Glass/Checkbox",
  component: Checkbox,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  render: (args) => (
    <label className="flex items-center gap-2.5 text-sm">
      <Checkbox {...args} />
      Enable notifications
    </label>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Indeterminate: Story = { args: { indeterminate: true } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
