import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { GlassSurface } from "./glass-surface.js";

const meta = {
  title: "Glass/GlassSurface",
  component: GlassSurface,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: {
    className: "max-w-sm",
    children: "A translucent pane that blurs and saturates whatever sits behind it.",
  },
  argTypes: {
    elevation: { control: "inline-radio", options: ["raised", "floating"] },
    padding: { control: "inline-radio", options: ["none", "md", "lg"] },
  },
} satisfies Meta<typeof GlassSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Floating: Story = {};

export const Raised: Story = { args: { elevation: "raised" } };
