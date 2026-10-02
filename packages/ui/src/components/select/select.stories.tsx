import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Select } from "./select.js";

const items = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Automatic", disabled: true },
];

const meta = {
  title: "Components/Select",
  component: Select<string>,
  decorators: [withBackdrop],
  args: { items, placeholder: "Appearance", "aria-label": "Appearance" },
} satisfies Meta<typeof Select<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { defaultValue: "dark" } };
