import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { Menu, MenuContent, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from "./menu.js";

const meta = {
  title: "Glass/Menu",
  component: Menu,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button />}>Options</MenuTrigger>
      <MenuContent>
        <MenuGroup label="File">
          <MenuItem shortcut="⌘N">New window</MenuItem>
          <MenuItem shortcut="⌘D">Duplicate</MenuItem>
          <MenuItem disabled>Export</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem destructive>Move to trash</MenuItem>
      </MenuContent>
    </Menu>
  ),
};
