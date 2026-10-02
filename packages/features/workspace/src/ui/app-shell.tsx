"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  Drawer,
  DrawerContent,
  DrawerTitle,
  SystemProvider,
  IconButton,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  Toaster,
  Tooltip,
  TooltipProvider,
  Backdrop,
  type Mode,
} from "@aliveui/ui";
import { cn } from "@aliveui/primitives";
import { useState, type ReactElement, type ReactNode } from "react";

export interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: ReactNode;
  /** `prefix` also highlights nested pages, such as a project under Projects. */
  match?: "exact" | "prefix";
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

/** Renders the app's router link around a nav item. */
export type RenderNavLink = (props: { href: string }) => ReactElement<{
  className?: string;
  children?: ReactNode;
}>;

export interface AppShellProps {
  /** Logo and product name at the top of the sidebar. */
  brand: ReactNode;
  /** Compact brand shown when the sidebar is collapsed. */
  brandMark?: ReactNode;
  nav: NavSection[];
  /** Items pinned to the bottom of the sidebar, such as Settings. */
  footerNav?: NavItem[];
  pathname: string;
  renderLink: RenderNavLink;
  /** Controls on the right of the header, such as search, notifications and the user menu. */
  actions?: ReactNode;
  /** Design system to render in, such as `glass` or `neumorphism`. */
  system: string;
  mode?: Mode;
  children: ReactNode;
}

const collapsedKey = "aliveui.shell.collapsed";

function isActive(item: NavItem, pathname: string) {
  return item.match === "prefix"
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
    : pathname === item.href;
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
    </svg>
  );
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="2.5" width="12" height="11" rx="2.5" />
      <path d="M6 2.5v11" />
      <path
        d={collapsed ? "m8.5 6.5 1.5 1.5-1.5 1.5" : "m10.5 6.5-1.5 1.5 1.5 1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavList({
  nav,
  footerNav,
  pathname,
  renderLink,
  collapsed,
  onNavigate,
}: Pick<AppShellProps, "nav" | "footerNav" | "pathname" | "renderLink"> & {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const item = (entry: NavItem) => {
    const link = (
      <SidebarItem
        key={entry.href}
        icon={entry.icon}
        badge={entry.badge}
        active={isActive(entry, pathname)}
        render={renderLink({ href: entry.href })}
        onClick={onNavigate}
      >
        {entry.label}
      </SidebarItem>
    );
    return collapsed ? (
      <Tooltip key={entry.href} content={entry.label} side="right">
        {link}
      </Tooltip>
    ) : (
      link
    );
  };

  return (
    <>
      {nav.map((section, index) => (
        <SidebarSection key={section.label ?? index} label={section.label}>
          {section.items.map(item)}
        </SidebarSection>
      ))}
      {footerNav?.length ? <SidebarFooter>{footerNav.map(item)}</SidebarFooter> : null}
    </>
  );
}

/**
 * The frame of an authenticated app: a collapsible sidebar, a sticky
 * header with breadcrumb and actions, and a mobile drawer for small screens.
 */
export function AppShell({
  brand,
  brandMark,
  nav,
  footerNav,
  pathname,
  renderLink,
  actions,
  system,
  mode,
  children,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(collapsedKey) === "true";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleCollapsed() {
    setCollapsed((value) => {
      try {
        localStorage.setItem(collapsedKey, String(!value));
      } catch {
        // Storage can be unavailable in private windows, the toggle still works.
      }
      return !value;
    });
  }

  const allItems = [...nav.flatMap((section) => section.items), ...(footerNav ?? [])];
  const current = allItems.find((entry) => isActive(entry, pathname));

  return (
    <SystemProvider system={system} mode={mode} className="relative isolate min-h-dvh">
      <Toaster>
        <TooltipProvider>
          <Backdrop />
          <a
            href="#main"
            className="surface-overlay fixed top-3 left-3 z-50 -translate-y-20 rounded-full px-4 py-2 text-sm font-medium focus:translate-y-0"
          >
            Skip to content
          </a>
          <div className="flex min-h-dvh gap-4 p-3 lg:p-4">
            <div className="sticky top-4 hidden h-[calc(100dvh-2rem)] shrink-0 lg:block">
              <Sidebar collapsed={collapsed} aria-label="Main navigation">
                <SidebarHeader className={cn("justify-between", collapsed && "flex-col")}>
                  <span className={cn("min-w-0", collapsed && "sr-only")}>{brand}</span>
                  {collapsed && brandMark ? <span aria-hidden>{brandMark}</span> : null}
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-pressed={collapsed}
                    onClick={toggleCollapsed}
                  >
                    <CollapseIcon collapsed={collapsed} />
                  </IconButton>
                </SidebarHeader>
                <NavList
                  nav={nav}
                  footerNav={footerNav}
                  pathname={pathname}
                  renderLink={renderLink}
                  collapsed={collapsed}
                />
              </Sidebar>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <header className="surface sticky top-3 z-30 flex h-16 items-center gap-3 rounded-surface px-3 shadow-raised lg:top-4 lg:px-5">
                <IconButton
                  variant="ghost"
                  aria-label="Open navigation"
                  className="lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Breadcrumb className="hidden sm:block [&_ol]:bg-transparent [&_ol]:shadow-none [&_ol]:border-transparent">
                  <BreadcrumbItem>
                    <BreadcrumbPage>{current?.label ?? "Workspace"}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Breadcrumb>
                <div className="ml-auto flex items-center gap-1.5">{actions}</div>
              </header>
              <main id="main" className="min-w-0 flex-1 px-1 pb-10 lg:px-2">
                {children}
              </main>
            </div>
          </div>

          <Drawer side="left" open={mobileOpen} onOpenChange={setMobileOpen}>
            <DrawerContent className="w-72 p-3">
              <DrawerTitle className="sr-only">Navigation</DrawerTitle>
              <div className="px-2 pt-1 pb-4">{brand}</div>
              <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-4">
                <NavList
                  nav={nav}
                  footerNav={footerNav}
                  pathname={pathname}
                  renderLink={renderLink}
                  collapsed={false}
                  onNavigate={() => setMobileOpen(false)}
                />
              </nav>
            </DrawerContent>
          </Drawer>
        </TooltipProvider>
      </Toaster>
    </SystemProvider>
  );
}
