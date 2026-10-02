import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Avatar, AvatarGroup } from "./avatar.js";

const meta = {
  title: "Glass/Avatar",
  component: Avatar,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { alt: "Ada Lovelace" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar alt="Ada Lovelace" />
      <Avatar alt="Grace Hopper" />
      <Avatar alt="Alan Turing" />
      <Avatar alt="More people" fallback="+4" />
    </AvatarGroup>
  ),
};
