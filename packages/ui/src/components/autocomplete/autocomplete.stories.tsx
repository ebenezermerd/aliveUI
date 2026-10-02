import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Autocomplete } from "./autocomplete.js";

const tags = ["design", "development", "documentation", "glass", "motion", "tokens", "webgl"];

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  decorators: [withBackdrop],
  args: { items: tags, placeholder: "Search tags", "aria-label": "Tag", className: "max-w-xs" },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSearchIcon: Story = { args: { search: true } };
