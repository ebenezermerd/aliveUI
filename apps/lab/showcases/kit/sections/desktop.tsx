"use client";

import {
  Badge,
  Dock,
  DockItem,
  DockSeparator,
  Surface,
  Input,
  Menu,
  Menubar,
  MenubarTrigger,
  MenuContent,
  MenuItem,
  ScrollArea,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  Toolbar,
  ToolbarButton,
  Backdrop,
} from "@aliveui/ui";
import {
  Archive,
  Inbox,
  PanelLeft,
  PenSquare,
  Search,
  Send,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ShowcaseSection } from "@/components/showcase/showcase-section";

const mailboxes = [
  { id: "inbox", label: "Inbox", icon: <Inbox />, badge: 12 },
  { id: "starred", label: "Starred", icon: <Star /> },
  { id: "sent", label: "Sent", icon: <Send /> },
  { id: "archive", label: "Archive", icon: <Archive /> },
  { id: "trash", label: "Trash", icon: <Trash2 /> },
];

const messages = [
  ["Grace Hopper", "Compiler notes", "Sharing the draft before tomorrow."],
  ["Alan Turing", "Lunch on Friday?", "There is a new place near the lab."],
  ["Ada Lovelace", "Engine diagrams", "Attached are the latest sketches."],
  ["Katherine Johnson", "Trajectory review", "Numbers check out on my side."],
  ["Margaret Hamilton", "Release checklist", "Two items left before we ship."],
  ["Radia Perlman", "Network design", "I left comments on the spanning tree."],
];

const apps = [
  { label: "Finder", from: "#60a5fa", to: "#2563eb", active: true },
  { label: "Safari", from: "#7dd3fc", to: "#0284c7", active: true },
  { label: "Mail", from: "#93c5fd", to: "#1d4ed8", active: true },
  { label: "Messages", from: "#86efac", to: "#16a34a" },
  { label: "Music", from: "#fda4af", to: "#e11d48" },
  { label: "Photos", from: "#fde68a", to: "#f97316" },
];

/** A whole desktop composed only from kit components. */
export function DesktopSection({ mode }: { mode: "light" | "dark" }) {
  const [active, setActive] = useState("inbox");
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <ShowcaseSection
      id="desktop"
      title="Desktop"
      description="Menubar, sidebar, toolbar, scroll area and dock working together in one scene."
    >
      <div className="relative isolate h-[40rem] overflow-hidden rounded-[2rem] shadow-floating">
        <Backdrop mode={mode} fixed={false} />

        <div className="absolute inset-x-3 top-3 flex justify-center">
          <Menubar>
            {["Mail", "File", "Edit", "View", "Window"].map((name) => (
              <Menu key={name}>
                <MenubarTrigger className={name === "Mail" ? "font-semibold" : undefined}>
                  {name}
                </MenubarTrigger>
                <MenuContent>
                  <MenuItem>New {name === "Mail" ? "message" : "window"}</MenuItem>
                  <MenuItem>Close</MenuItem>
                </MenuContent>
              </Menu>
            ))}
          </Menubar>
        </div>

        <Surface
          padding="none"
          className="absolute inset-x-6 top-20 bottom-28 flex gap-3 overflow-hidden rounded-[1.75rem] p-3 md:inset-x-16"
        >
          <Sidebar collapsed={collapsed} className="shrink-0 shadow-raised">
            <SidebarHeader>
              <span className="text-sm font-semibold group-data-collapsed/sidebar:sr-only">
                Mailboxes
              </span>
            </SidebarHeader>
            <SidebarSection>
              {mailboxes.map((box) => (
                <SidebarItem
                  key={box.id}
                  icon={box.icon}
                  badge={box.badge}
                  active={active === box.id}
                  onClick={() => setActive(box.id)}
                >
                  {box.label}
                </SidebarItem>
              ))}
            </SidebarSection>
            <SidebarFooter>
              <SidebarItem icon={<Settings />}>Settings</SidebarItem>
            </SidebarFooter>
          </Sidebar>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-center gap-3">
              <Toolbar aria-label="Mail actions">
                <ToolbarButton
                  aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
                  onClick={() => setCollapsed((value) => !value)}
                >
                  <PanelLeft />
                </ToolbarButton>
                <ToolbarButton aria-label="Compose">
                  <PenSquare />
                </ToolbarButton>
                <ToolbarButton aria-label="Archive">
                  <Archive />
                </ToolbarButton>
              </Toolbar>
              <div className="relative ml-auto w-full max-w-xs">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 opacity-50" />
                <Input aria-label="Search mail" placeholder="Search" className="pl-10" />
              </div>
            </div>
            <ScrollArea className="surface-well min-h-0 flex-1 rounded-2xl">
              <ul className="p-1.5">
                {messages.map(([from, subject, preview], index) => (
                  <li key={subject}>
                    <button
                      type="button"
                      onClick={() => setSelected(index)}
                      className={
                        selected === index
                          ? "w-full rounded-xl bg-accent px-4 py-3 text-left text-accent-foreground shadow-raised"
                          : "w-full rounded-xl px-4 py-3 text-left hover:bg-foreground/5"
                      }
                    >
                      <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                        {from}
                        {index < 2 && selected !== index ? <Badge tone="accent">New</Badge> : null}
                      </span>
                      <span className="block text-sm">{subject}</span>
                      <span className="block truncate text-xs opacity-70">{preview}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </Surface>

        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <Dock aria-label="Dock">
            {apps.map((app) => (
              <DockItem
                key={app.label}
                label={app.label}
                active={app.active}
                icon={
                  <span style={{ background: `linear-gradient(160deg, ${app.from}, ${app.to})` }} />
                }
              />
            ))}
            <DockSeparator />
            <DockItem
              label="Trash"
              icon={<span style={{ background: "linear-gradient(160deg, #e5e7eb, #9ca3af)" }} />}
            />
          </Dock>
        </div>
      </div>
    </ShowcaseSection>
  );
}
