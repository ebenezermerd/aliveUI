"use client";

import {
  Button,
  CommandPalette,
  EmptyState,
  IconButton,
  Kbd,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  type Command,
  type CommandGroup,
} from "@aliveui/glass";
import { cn } from "@aliveui/primitives";
import { useMemo, useState } from "react";
import { timeAgo } from "../dates.js";
import { useUnreadCount } from "../react/hooks.js";
import { useWorkspace, useWorkspaceActions } from "../react/provider.js";
import type { Task } from "../types.js";
import type { NavItem } from "./app-shell.js";
import { InviteDialog, ProjectDialog, TaskDialog } from "./dialogs.js";

function BellIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6.5a4 4 0 0 1 8 0c0 3 1.25 4.25 1.25 4.25H2.75S4 9.5 4 6.5ZM6.5 13a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.25 10.25 3 3" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

/** Bell with an unread dot, opening the notification list. */
export function NotificationsButton() {
  const { notifications } = useWorkspace();
  const actions = useWorkspaceActions();
  const unread = useUnreadCount();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <IconButton
            variant="ghost"
            aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
          />
        }
      >
        <BellIcon />
        {unread > 0 ? (
          <span
            aria-hidden
            className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
          />
        ) : null}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[22rem] p-0">
        <div className="flex items-center justify-between px-4 pt-3.5 pb-1">
          <p className="text-sm font-semibold">Notifications</p>
          {unread > 0 ? (
            <Button variant="ghost" size="sm" onClick={() => void actions.markNotificationsRead()}>
              Mark all read
            </Button>
          ) : null}
        </div>
        {notifications.length === 0 ? (
          <EmptyState title="You are all caught up" className="py-8" />
        ) : (
          <ScrollArea viewportClassName="max-h-80">
            <ul className="p-2">
              {notifications.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => !item.read && void actions.markNotificationsRead([item.id])}
                    className="flex w-full gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        item.read ? "bg-transparent" : "bg-accent",
                      )}
                    />
                    <span className="min-w-0">
                      <span className={cn("block text-sm", !item.read && "font-semibold")}>
                        {item.title}
                      </span>
                      <span className="block text-sm text-muted-foreground">{item.body}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {timeAgo(item.createdAt)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}

type Creating = "task" | "project" | "invite" | null;

/** One menu to create anything: a task, a project or an invitation. */
export function QuickCreateMenu() {
  const [creating, setCreating] = useState<Creating>(null);
  const close = (open: boolean) => !open && setCreating(null);
  return (
    <>
      <Menu>
        <MenuTrigger render={<IconButton variant="tinted" size="sm" aria-label="Create" />}>
          <PlusIcon />
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem shortcut="T" onClick={() => setCreating("task")}>
            New task
          </MenuItem>
          <MenuItem shortcut="P" onClick={() => setCreating("project")}>
            New project
          </MenuItem>
          <MenuItem onClick={() => setCreating("invite")}>Invite people</MenuItem>
        </MenuContent>
      </Menu>
      <TaskDialog open={creating === "task"} onOpenChange={close} />
      <ProjectDialog open={creating === "project"} onOpenChange={close} />
      <InviteDialog open={creating === "invite"} onOpenChange={close} />
    </>
  );
}

export interface WorkspaceSearchProps {
  /** Pages to jump to, usually the same items as the sidebar. */
  pages: NavItem[];
  onNavigate: (href: string) => void;
  /** Where a project lives, such as `/projects/${id}`. */
  projectHref: (id: string) => string;
  /** Extra commands from the app, such as toggling the theme or signing out. */
  commands?: Command[];
}

/** A search field in the header that opens a command palette, also on Command K. */
export function WorkspaceSearch({
  pages,
  onNavigate,
  projectHref,
  commands = [],
}: WorkspaceSearchProps) {
  const { projects, tasks } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState<Creating>(null);
  const [editing, setEditing] = useState<Task | null>(null);

  const groups = useMemo<CommandGroup[]>(
    () => [
      {
        label: "Pages",
        items: pages.map((page) => ({
          value: `page:${page.href}`,
          label: page.label,
          icon: page.icon,
          onSelect: () => onNavigate(page.href),
        })),
      },
      {
        label: "Create",
        items: [
          { value: "create:task", label: "New task", onSelect: () => setCreating("task") },
          { value: "create:project", label: "New project", onSelect: () => setCreating("project") },
          { value: "create:invite", label: "Invite people", onSelect: () => setCreating("invite") },
        ],
      },
      ...(commands.length ? [{ label: "Commands", items: commands }] : []),
      {
        label: "Projects",
        items: projects.map((project) => ({
          value: `project:${project.id}`,
          label: project.name,
          icon: (
            <span className="size-2.5 rounded-full" style={{ backgroundColor: project.color }} />
          ),
          onSelect: () => onNavigate(projectHref(project.id)),
        })),
      },
      {
        label: "Tasks",
        items: tasks
          .slice(0, 200)
          .map((task) => ({
            value: `task:${task.id}`,
            label: task.title,
            onSelect: () => setEditing(task),
          })),
      },
    ],
    [pages, commands, projects, tasks, onNavigate, projectHref],
  );

  const close = (next: boolean) => !next && setCreating(null);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="glass-well h-9 gap-3 px-3 text-muted-foreground max-sm:w-9 max-sm:px-0 sm:w-56 sm:justify-start"
        aria-label="Search"
      >
        <SearchIcon />
        <span className="hidden flex-1 text-left text-sm sm:inline">Search</span>
        <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
      </Button>
      <CommandPalette
        groups={groups}
        open={open}
        onOpenChange={setOpen}
        placeholder="Search pages, projects and tasks"
      />
      <TaskDialog open={creating === "task"} onOpenChange={close} />
      <ProjectDialog
        open={creating === "project"}
        onOpenChange={close}
        onSaved={(project) => onNavigate(projectHref(project.id))}
      />
      <InviteDialog open={creating === "invite"} onOpenChange={close} />
      <TaskDialog
        open={!!editing}
        onOpenChange={(next) => !next && setEditing(null)}
        task={editing ?? undefined}
      />
    </>
  );
}
