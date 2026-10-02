import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "./breadcrumb.js";

const meta = {
  title: "Glass/Breadcrumb",
  component: Breadcrumb,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">iCloud Drive</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>AliveUI</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};
