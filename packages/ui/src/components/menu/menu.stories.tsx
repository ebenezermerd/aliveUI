import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "./menu.js";

const meta = {
  title: "Components/Menu",
  component: Menu,
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

export const WithSubmenuAndChoices: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button />}>View</MenuTrigger>
      <MenuContent>
        <MenuCheckboxItem defaultChecked>Show sidebar</MenuCheckboxItem>
        <MenuCheckboxItem>Show status bar</MenuCheckboxItem>
        <MenuSeparator />
        <MenuGroup label="Sort by">
          <MenuRadioGroup defaultValue="date">
            <MenuRadioItem value="name">Name</MenuRadioItem>
            <MenuRadioItem value="date">Date</MenuRadioItem>
            <MenuRadioItem value="size">Size</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
          <MenuContent side="right" align="start" sideOffset={4}>
            <MenuItem>Mail</MenuItem>
            <MenuItem>Messages</MenuItem>
            <MenuItem>AirDrop</MenuItem>
          </MenuContent>
        </MenuSubmenu>
      </MenuContent>
    </Menu>
  ),
};
