import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Radio, RadioGroup } from "./radio.js";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  decorators: [withBackdrop],
  args: { defaultValue: "weekly", "aria-label": "Digest frequency" },
  render: (args) => (
    <RadioGroup {...args}>
      {["daily", "weekly", "monthly"].map((value) => (
        <label key={value} className="flex items-center gap-2.5 text-sm capitalize">
          <Radio value={value} />
          {value}
        </label>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };
