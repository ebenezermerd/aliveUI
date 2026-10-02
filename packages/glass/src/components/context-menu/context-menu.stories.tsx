import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import {
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuContent,
} from "../menu/menu.js";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "./context-menu.js";

const meta = {
  title: "Glass/ContextMenu",
  component: ContextMenu,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="glass flex h-40 w-72 items-center justify-center rounded-surface text-sm opacity-90">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <MenuItem shortcut="⌘O">Open</MenuItem>
        <MenuItem shortcut="⌘I">Get info</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
          <MenuContent side="right" sideOffset={4}>
            <MenuItem>Mail</MenuItem>
            <MenuItem>Messages</MenuItem>
          </MenuContent>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem destructive>Move to trash</MenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
