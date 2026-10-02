import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Surface } from "./surface.js";

const meta = {
  title: "Components/Surface",
  component: Surface,
  decorators: [withBackdrop],
  args: {
    className: "max-w-sm",
    children: "A panel drawn with the active system's surface recipe.",
  },
  argTypes: {
    elevation: { control: "inline-radio", options: ["raised", "floating"] },
    padding: { control: "inline-radio", options: ["none", "md", "lg"] },
  },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Floating: Story = {};

export const Raised: Story = { args: { elevation: "raised" } };
