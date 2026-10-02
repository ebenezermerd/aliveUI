"use client";

import {
  Avatar,
  Badge,
  Calendar,
  Pagination,
  ScrollArea,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type DateRange,
} from "@aliveui/glass";
import { useState } from "react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

const people = [
  "Ada Lovelace",
  "Grace Hopper",
  "Alan Turing",
  "Katherine Johnson",
  "Tim Berners Lee",
  "Margaret Hamilton",
  "Linus Torvalds",
  "Barbara Liskov",
  "Dennis Ritchie",
  "Radia Perlman",
  "Ken Thompson",
  "Frances Allen",
];

const statuses = ["Paid", "Pending", "Paid", "Failed"] as const;
const tone = { Paid: "success", Pending: "warning", Failed: "danger" } as const;

const invoices = people.map((customer, index) => ({
  id: `INV ${String(index + 1).padStart(3, "0")}`,
  customer,
  status: statuses[index % statuses.length]!,
  amount: ((index * 137) % 900) + 49,
}));

const pageSize = 4;

function InvoiceTable() {
  const [page, setPage] = useState(1);
  const rows = invoices.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>
          Showing {rows.length} of {invoices.length} invoices
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium whitespace-nowrap">{invoice.id}</TableCell>
              <TableCell>
                <span className="flex items-center gap-2.5 whitespace-nowrap">
                  <Avatar alt={invoice.customer} size="sm" />
                  {invoice.customer}
                </span>
              </TableCell>
              <TableCell>
                <Badge tone={tone[invoice.status]} dot>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">${invoice.amount}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        page={page}
        pageCount={Math.ceil(invoices.length / pageSize)}
        onPageChange={setPage}
      />
    </div>
  );
}

function RangePicker() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const format = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
  return (
    <div className="space-y-3">
      <Calendar
        mode="range"
        value={range}
        onValueChange={setRange}
        variant="plain"
        className="p-0"
      />
      <p className="text-sm opacity-75">
        {range.from
          ? `${format.format(range.from)} to ${range.to ? format.format(range.to) : "…"}`
          : "Pick a start and end date."}
      </p>
    </div>
  );
}

export function DataSection() {
  return (
    <ShowcaseSection
      id="data"
      title="Data"
      description="Tables, pagination, calendars and scroll areas for denser content."
    >
      <Panel className="grid gap-8 lg:grid-cols-[1fr_auto]">
        <Demo label="Table with pagination">
          <InvoiceTable />
        </Demo>
        <Demo label="Range calendar">
          <RangePicker />
        </Demo>
        <Demo label="Scroll area" className="lg:col-span-2">
          <ScrollArea className="glass-well h-48 rounded-2xl">
            <ul className="divide-y divide-foreground/6 text-sm">
              {people.map((person) => (
                <li key={person} className="flex items-center gap-3 px-4 py-2.5">
                  <Avatar alt={person} size="sm" />
                  {person}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
