import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { useState } from "react";
import { Pagination } from "./pagination.js";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  decorators: [withBackdrop],
  args: { page: 1, pageCount: 20, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ pageCount }: { pageCount: number }) {
  const [page, setPage] = useState(5);
  return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />;
}

export const Many: Story = { render: () => <Example pageCount={20} /> };

export const Few: Story = { render: () => <Example pageCount={6} /> };
