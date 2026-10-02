import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Card } from "../card/card.js";
import { Tab, Tabs, TabsList, TabsPanel } from "./tabs.js";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  decorators: [withBackdrop],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="photos" className="max-w-md">
      <TabsList>
        <Tab value="photos">Photos</Tab>
        <Tab value="albums">Albums</Tab>
        <Tab value="shared">Shared</Tab>
      </TabsList>
      <TabsPanel value="photos">
        <Card>All your photos, newest first.</Card>
      </TabsPanel>
      <TabsPanel value="albums">
        <Card>Albums you created.</Card>
      </TabsPanel>
      <TabsPanel value="shared">
        <Card>Albums shared with you.</Card>
      </TabsPanel>
    </Tabs>
  ),
};
