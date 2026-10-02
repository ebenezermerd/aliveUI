import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { useState } from "react";
import { Button } from "../button/button.js";
import { Kbd } from "../kbd/kbd.js";
import { CommandPalette, type CommandGroup } from "./command-palette.js";

const groups: CommandGroup[] = [
  {
    label: "Suggestions",
    items: [
      { value: "calendar", label: "Calendar" },
      { value: "music", label: "Music" },
      { value: "photos", label: "Photos" },
    ],
  },
  {
    label: "Commands",
    items: [
      { value: "new-note", label: "New note", shortcut: "⌘N" },
      { value: "toggle-dark", label: "Toggle dark mode", shortcut: "⇧⌘D" },
      { value: "share", label: "Share window" },
    ],
  },
];

const meta = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  decorators: [withBackdrop],
  args: { groups },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Search <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette groups={groups} open={open} onOpenChange={setOpen} />
    </>
  );
}

export const Default: Story = { render: () => <Example /> };
