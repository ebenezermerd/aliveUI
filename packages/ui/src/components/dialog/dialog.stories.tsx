import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";

const meta = {
  title: "Glass/Dialog",
  component: Dialog,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="danger" />}>Delete album</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this album?</DialogTitle>
          <DialogDescription>
            The photos stay in your library. Only the album is removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button variant="danger" />}>Delete</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
