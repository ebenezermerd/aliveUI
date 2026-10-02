import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Button } from "../button/button.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.js";

const meta = {
  title: "Glass/Card",
  component: Card,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Storage almost full</CardTitle>
        <CardDescription>You have used 92 percent of your plan.</CardDescription>
      </CardHeader>
      <CardContent>Upgrade to keep your photos and files in sync on every device.</CardContent>
      <CardFooter>
        <Button variant="tinted">Upgrade</Button>
        <Button variant="ghost">Not now</Button>
      </CardFooter>
    </Card>
  ),
};
