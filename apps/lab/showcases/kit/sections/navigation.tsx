"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Button,
  Menu,
  Menubar,
  MenubarTrigger,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  SegmentedControl,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@aliveui/glass";
import {
  Bold,
  ChevronDown,
  Copy,
  Grid2x2,
  Italic,
  List,
  Share,
  Trash2,
  Underline,
} from "lucide-react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

const views = [
  { value: "grid", label: <Grid2x2 />, "aria-label": "Grid" },
  { value: "list", label: <List />, "aria-label": "List" },
] as const;

const ranges = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
] as const;

export function NavigationSection() {
  return (
    <ShowcaseSection
      id="navigation"
      title="Navigation"
      description="Tabs with a sliding glass pill, segmented controls, toolbars and menus."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Tabs">
          <Tabs defaultValue="photos">
            <TabsList>
              <Tab value="photos">Photos</Tab>
              <Tab value="albums">Albums</Tab>
              <Tab value="shared">Shared</Tab>
            </TabsList>
            <TabsPanel value="photos" className="text-sm opacity-80">
              All your photos, newest first.
            </TabsPanel>
            <TabsPanel value="albums" className="text-sm opacity-80">
              Albums you created.
            </TabsPanel>
            <TabsPanel value="shared" className="text-sm opacity-80">
              Albums shared with you.
            </TabsPanel>
          </Tabs>
        </Demo>
        <Demo label="Segmented control">
          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl items={ranges} defaultValue="week" aria-label="Calendar range" />
            <SegmentedControl items={views} defaultValue="grid" aria-label="View" />
          </div>
        </Demo>
        <Demo label="Toolbar">
          <Toolbar aria-label="Formatting">
            <ToolbarGroup aria-label="Text style">
              <ToolbarButton aria-label="Bold">
                <Bold />
              </ToolbarButton>
              <ToolbarButton aria-label="Italic">
                <Italic />
              </ToolbarButton>
              <ToolbarButton aria-label="Underline">
                <Underline />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarButton>
              <Share /> Share
            </ToolbarButton>
          </Toolbar>
        </Demo>
        <Demo label="Menu">
          <Menu>
            <MenuTrigger render={<Button />}>
              Options <ChevronDown />
            </MenuTrigger>
            <MenuContent>
              <MenuGroup label="Album">
                <MenuItem icon={<Copy />} shortcut="⌘D">
                  Duplicate
                </MenuItem>
                <MenuItem icon={<Share />}>Share</MenuItem>
                <MenuItem disabled>Export</MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuCheckboxItem defaultChecked>Show captions</MenuCheckboxItem>
              <MenuGroup label="Sort by">
                <MenuRadioGroup defaultValue="date">
                  <MenuRadioItem value="date">Date</MenuRadioItem>
                  <MenuRadioItem value="name">Name</MenuRadioItem>
                </MenuRadioGroup>
              </MenuGroup>
              <MenuSubmenu>
                <MenuSubmenuTrigger icon={<Share />}>Send to</MenuSubmenuTrigger>
                <MenuContent side="right" sideOffset={4}>
                  <MenuItem>Mail</MenuItem>
                  <MenuItem>Messages</MenuItem>
                  <MenuItem>AirDrop</MenuItem>
                </MenuContent>
              </MenuSubmenu>
              <MenuSeparator />
              <MenuItem icon={<Trash2 />} destructive>
                Delete album
              </MenuItem>
            </MenuContent>
          </Menu>
        </Demo>
        <Demo label="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">iCloud Drive</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>AliveUI</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </Demo>
        <Demo label="Menubar">
          <Menubar>
            <Menu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenuContent>
                <MenuItem shortcut="⌘N">New window</MenuItem>
                <MenuItem shortcut="⌘O">Open</MenuItem>
                <MenuSeparator />
                <MenuItem shortcut="⌘S">Save</MenuItem>
              </MenuContent>
            </Menu>
            <Menu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenuContent>
                <MenuItem shortcut="⌘Z">Undo</MenuItem>
                <MenuItem shortcut="⇧⌘Z">Redo</MenuItem>
              </MenuContent>
            </Menu>
            <Menu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenuContent>
                <MenuCheckboxItem defaultChecked>Show toolbar</MenuCheckboxItem>
                <MenuCheckboxItem>Show path bar</MenuCheckboxItem>
              </MenuContent>
            </Menu>
          </Menubar>
        </Demo>
        <Demo label="Navigation menu" className="md:col-span-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Systems</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 sm:w-[28rem] sm:grid-cols-2">
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Glassmorphism"
                        description="Layered translucent surfaces."
                      />
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Minimalism"
                        description="Quiet, precise and calm."
                      />
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Claymorphism"
                        description="Soft, inflated shapes."
                      />
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Neo Brutalism"
                        description="Loud, flat and bold."
                      />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 sm:w-72">
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Tokens"
                        description="How theming works."
                      />
                    </li>
                    <li>
                      <NavigationMenuLink href="#" title="Guides" description="Step by step." />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Changelog</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
