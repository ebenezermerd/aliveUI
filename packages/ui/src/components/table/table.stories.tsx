import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Badge } from "../badge/badge.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js";

const invoices = [
  { id: "INV 001", customer: "Ada Lovelace", status: "Paid", amount: "$250.00" },
  { id: "INV 002", customer: "Grace Hopper", status: "Pending", amount: "$150.00" },
  { id: "INV 003", customer: "Alan Turing", status: "Failed", amount: "$350.00" },
];

const tone = { Paid: "success", Pending: "warning", Failed: "danger" } as const;

const meta = {
  title: "Glass/Table",
  component: Table,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Table>
        <TableCaption>Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>
                <Badge tone={tone[invoice.status as keyof typeof tone]}>{invoice.status}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
