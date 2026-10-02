import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Skeleton } from "./skeleton.js";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  decorators: [withBackdrop],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileRow: Story = {
  render: () => (
    <div className="flex max-w-xs items-center gap-3">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
};
