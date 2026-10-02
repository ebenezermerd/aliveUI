import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { ScrollArea } from "./scroll-area.js";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  decorators: [withBackdrop],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="surface h-64 w-72 rounded-surface">
      <ul className="space-y-1 p-3 text-sm">
        {Array.from({ length: 40 }, (_, index) => (
          <li key={index} className="rounded-lg px-3 py-2 hover:bg-foreground/6">
            Message {index + 1}
          </li>
        ))}
      </ul>
    </ScrollArea>
  ),
};
