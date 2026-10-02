import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSide,
} from "./drawer.js";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  decorators: [withBackdrop],
  argTypes: { side: { control: "inline-radio", options: ["right", "left", "bottom"] } },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ side }: { side?: DrawerSide }) {
  return (
    <Drawer side={side}>
      <DrawerTrigger render={<Button />}>Open {side ?? "right"} drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Inspector</DrawerTitle>
          <DrawerDescription>Swipe toward the edge to dismiss.</DrawerDescription>
        </DrawerHeader>
        <p className="text-sm opacity-80">Details about the selected item appear here.</p>
        <DrawerFooter>
          <DrawerClose render={<Button variant="primary" />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const Right: Story = { render: () => <Example side="right" /> };

export const Left: Story = { render: () => <Example side="left" /> };

export const BottomSheet: Story = { render: () => <Example side="bottom" /> };
