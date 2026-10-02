import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Menu, MenuCheckboxItem, MenuContent, MenuItem, MenuSeparator } from "../menu/menu.js";
import { Menubar, MenubarTrigger } from "./menubar.js";

const meta = {
  title: "Components/Menubar",
  component: Menubar,
  decorators: [withBackdrop],
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <Menu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenuContent>
          <MenuItem shortcut="⌘N">New</MenuItem>
          <MenuItem shortcut="⌘O">Open</MenuItem>
          <MenuSeparator />
          <MenuItem shortcut="⌘S">Save</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenuContent>
          <MenuItem shortcut="⌘Z">Undo</MenuItem>
          <MenuItem shortcut="⇧⌘Z">Redo</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenuContent>
          <MenuCheckboxItem defaultChecked>Show toolbar</MenuCheckboxItem>
          <MenuCheckboxItem>Show path bar</MenuCheckboxItem>
        </MenuContent>
      </Menu>
    </Menubar>
  ),
};
