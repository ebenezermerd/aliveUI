import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Combobox, MultiCombobox } from "./combobox.js";

const cities = ["Addis Ababa", "Berlin", "Cape Town", "Lisbon", "Nairobi", "Osaka", "Toronto"].map(
  (label) => ({ value: label.toLowerCase().replace(/\s/g, ""), label }),
);

const meta = {
  title: "Glass/Combobox",
  component: Combobox,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: {
    items: cities,
    placeholder: "Choose a city",
    "aria-label": "City",
    className: "max-w-xs",
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Multiple: Story = {
  render: () => (
    <MultiCombobox
      items={cities}
      defaultValue={[cities[0]!, cities[3]!]}
      placeholder="Add cities"
      aria-label="Cities"
      className="max-w-sm"
    />
  ),
};
