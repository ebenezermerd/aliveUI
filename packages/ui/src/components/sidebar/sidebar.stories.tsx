import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { useState } from "react";
import { Avatar } from "../avatar/avatar.js";
import { Button } from "../button/button.js";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection } from "./sidebar.js";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  decorators: [withBackdrop],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Dot({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="7" fill={color} />
    </svg>
  );
}

function Example() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("inbox");
  const items = [
    { id: "inbox", label: "Inbox", color: "#3b82f6", badge: 12 },
    { id: "drafts", label: "Drafts", color: "#a855f7" },
    { id: "sent", label: "Sent", color: "#22c55e" },
    { id: "trash", label: "Trash", color: "#ef4444" },
  ];
  return (
    <div className="flex h-[28rem] gap-4">
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          <Avatar alt="Ada Lovelace" size="sm" />
          <span className="text-sm font-semibold group-data-collapsed/sidebar:sr-only">Mail</span>
        </SidebarHeader>
        <SidebarSection label="Mailboxes">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              icon={<Dot color={item.color} />}
              badge={item.badge}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </SidebarItem>
          ))}
        </SidebarSection>
        <SidebarFooter>
          <SidebarItem icon={<Dot color="#64748b" />}>Settings</SidebarItem>
        </SidebarFooter>
      </Sidebar>
      <Button size="sm" onClick={() => setCollapsed((value) => !value)}>
        {collapsed ? "Expand" : "Collapse"}
      </Button>
    </div>
  );
}

export const Default: Story = { render: () => <Example /> };
