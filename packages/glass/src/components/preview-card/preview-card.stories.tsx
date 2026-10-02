import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from "./preview-card.js";

const meta = {
  title: "Glass/PreviewCard",
  component: PreviewCard,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className="max-w-sm text-sm">
      Read more about{" "}
      <PreviewCard>
        <PreviewCardTrigger href="#">glassmorphism</PreviewCardTrigger>
        <PreviewCardContent>
          <div className="mb-3 h-28 rounded-xl bg-[linear-gradient(135deg,#f9a8d4,#93c5fd,#fde68a)]" />
          <p className="text-sm font-semibold">Glassmorphism</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Frosted translucent surfaces layered over colourful backgrounds.
          </p>
        </PreviewCardContent>
      </PreviewCard>{" "}
      before you start.
    </p>
  ),
};
