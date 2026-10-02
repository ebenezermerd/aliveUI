import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Switch } from "./switch.js";

const meta = {
  title: "Glass/Switch",
  component: Switch,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  render: (args) => (
    <label className="flex items-center gap-3 text-sm">
      <Switch {...args} />
      Airplane mode
    </label>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = { args: { defaultChecked: true } };

export const Off: Story = {};

export const Disabled: Story = { args: { disabled: true } };
