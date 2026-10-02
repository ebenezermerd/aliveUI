import type { NavItem, NavSection, RenderNavLink } from "@aliveui/workspace/ui";
import { FolderKanban, LayoutDashboard, ListChecks, Settings, Users } from "lucide-react";
import Link from "next/link";

export const mainNav: NavSection[] = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: <LayoutDashboard /> },
      { href: "/projects", label: "Projects", icon: <FolderKanban />, match: "prefix" },
      { href: "/tasks", label: "Tasks", icon: <ListChecks /> },
      { href: "/team", label: "Team", icon: <Users /> },
    ],
  },
];

export const footerNav: NavItem[] = [{ href: "/settings", label: "Settings", icon: <Settings /> }];

export const allPages: NavItem[] = [...mainNav.flatMap((section) => section.items), ...footerNav];

export const renderNavLink: RenderNavLink = ({ href }) => <Link href={href} />;

export const projectHref = (id: string) => `/projects/${id}`;
