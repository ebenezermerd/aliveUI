import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "./collapsible.js";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  decorators: [withBackdrop],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="max-w-xs">
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsiblePanel className="space-y-1 pl-9 text-sm opacity-80">
        <p>Hardware acceleration</p>
        <p>Developer menu</p>
        <p>Experimental features</p>
      </CollapsiblePanel>
    </Collapsible>
  ),
};
