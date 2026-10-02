"use client";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  GlassSurface,
  IconButton,
  Input,
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  SegmentedControl,
  Select,
  Separator,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Textarea,
  toast,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Tooltip,
  TooltipProvider,
} from "@aliveui/glass";
import {
  Bold,
  ChevronDown,
  Copy,
  Grid2x2,
  Heart,
  Italic,
  List,
  Plus,
  Search,
  Share,
  Trash2,
  Underline,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";

/** Groups of components shown on the page, in order. Also drives the section index. */
export const sections = [
  { id: "buttons", title: "Buttons" },
  { id: "inputs", title: "Inputs" },
  { id: "selection", title: "Selection" },
  { id: "display", title: "Display" },
  { id: "cards", title: "Cards" },
  { id: "navigation", title: "Navigation" },
  { id: "overlays", title: "Overlays" },
] as const;

/** Every exported component, counted on the page header. */
export const componentNames = [
  "GlassSurface",
  "Button",
  "IconButton",
  "Input",
  "Textarea",
  "Field",
  "Select",
  "Checkbox",
  "Radio",
  "Switch",
  "Slider",
  "Badge",
  "Avatar",
  "Card",
  "Progress",
  "Separator",
  "Tabs",
  "SegmentedControl",
  "Toolbar",
  "Menu",
  "Tooltip",
  "Popover",
  "Dialog",
  "Toast",
] as const;

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <GlassSurface padding="lg" className={className}>
      {children}
    </GlassSurface>
  );
}

function Buttons() {
  return (
    <ShowcaseSection
      id="buttons"
      title="Buttons"
      description="Pill shaped, springy on press, with tinted and destructive variants."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Variants">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Glass</Button>
            <Button variant="tinted">Tinted</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Demo>
        <Demo label="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Demo>
        <Demo label="With icons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="tinted">
              <Plus /> New note
            </Button>
            <Button>
              <Share /> Share
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Demo>
        <Demo label="Icon buttons">
          <div className="flex flex-wrap items-center gap-3">
            <IconButton aria-label="Search" size="sm">
              <Search />
            </IconButton>
            <IconButton aria-label="Favourite">
              <Heart />
            </IconButton>
            <IconButton aria-label="Add" variant="tinted">
              <Plus />
            </IconButton>
            <IconButton aria-label="Delete" variant="danger" size="lg">
              <Trash2 />
            </IconButton>
          </div>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}

const countries = [
  { value: "et", label: "Ethiopia" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "us", label: "United States" },
];

function Inputs() {
  return (
    <ShowcaseSection
      id="inputs"
      title="Inputs"
      description="Recessed wells that light up with the accent colour on focus."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Field with validation">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" required placeholder="you@example.com" />
            <FieldDescription>Leave it empty and blur the field to see the error.</FieldDescription>
            <FieldError match="valueMissing">Please enter your email.</FieldError>
          </Field>
        </Demo>
        <Demo label="Select">
          <Field>
            <FieldLabel nativeLabel={false} render={<div />}>
              Country
            </FieldLabel>
            <Select items={countries} placeholder="Choose a country" aria-label="Country" />
          </Field>
        </Demo>
        <Demo label="Search">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 opacity-50" />
            <Input aria-label="Search" placeholder="Search" className="pl-10" />
          </div>
        </Demo>
        <Demo label="Textarea">
          <Field>
            <FieldLabel>Note</FieldLabel>
            <Textarea placeholder="Write something" />
          </Field>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}

function Selection() {
  return (
    <ShowcaseSection
      id="selection"
      title="Selection"
      description="Checkboxes, radios, switches and sliders with spring feedback."
    >
      <Panel className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Demo label="Checkbox">
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex items-center gap-2.5">
              <Checkbox defaultChecked /> Photos
            </label>
            <label className="flex items-center gap-2.5">
              <Checkbox /> Messages
            </label>
            <label className="flex items-center gap-2.5">
              <Checkbox indeterminate /> Some folders
            </label>
          </div>
        </Demo>
        <Demo label="Radio">
          <RadioGroup defaultValue="week" aria-label="Summary frequency" className="text-sm">
            {["day", "week", "month"].map((value) => (
              <label key={value} className="flex items-center gap-2.5 capitalize">
                <Radio value={value} /> Every {value}
              </label>
            ))}
          </RadioGroup>
        </Demo>
        <Demo label="Switch">
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex items-center justify-between gap-3">
              Wi Fi <Switch defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-3">
              Bluetooth <Switch />
            </label>
            <label className="flex items-center justify-between gap-3 opacity-80">
              Hotspot <Switch disabled />
            </label>
          </div>
        </Demo>
        <Demo label="Slider">
          <div className="space-y-2">
            <Slider aria-label="Volume" defaultValue={60} />
            <Slider defaultValue={[25, 75]} thumbLabels={["Minimum price", "Maximum price"]} />
          </div>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}

function LiveProgress() {
  const [value, setValue] = useState(18);
  useEffect(() => {
    const timer = setInterval(() => setValue((current) => (current >= 100 ? 8 : current + 7)), 900);
    return () => clearInterval(timer);
  }, []);
  return <Progress value={value} label="Uploading 24 photos" showValue />;
}

function Display() {
  return (
    <ShowcaseSection
      id="display"
      title="Display"
      description="Badges, avatars, progress and dividers for status and identity."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Draft</Badge>
            <Badge tone="accent">New</Badge>
            <Badge tone="success" dot>
              Online
            </Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Failed</Badge>
          </div>
        </Demo>
        <Demo label="Avatars">
          <div className="flex items-center gap-6">
            <div className="flex items-end gap-3">
              <Avatar alt="Ada Lovelace" size="sm" />
              <Avatar alt="Grace Hopper" />
              <Avatar alt="Alan Turing" size="lg" />
            </div>
            <AvatarGroup>
              <Avatar alt="Ada Lovelace" />
              <Avatar alt="Grace Hopper" />
              <Avatar alt="Alan Turing" />
              <Avatar alt="More" fallback="+5" />
            </AvatarGroup>
          </div>
        </Demo>
        <Demo label="Progress">
          <div className="space-y-5">
            <LiveProgress />
            <Progress value={null} aria-label="Syncing" />
          </div>
        </Demo>
        <Demo label="Separator">
          <div className="space-y-3 text-sm">
            <p>iCloud Drive</p>
            <Separator />
            <div className="flex h-5 items-center gap-3">
              <span>Photos</span>
              <Separator orientation="vertical" />
              <span>Notes</span>
              <Separator orientation="vertical" />
              <span>Mail</span>
            </div>
          </div>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}

function Cards() {
  return (
    <ShowcaseSection
      id="cards"
      title="Cards"
      description="Surfaces with header, content and footer slots."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Badge tone="warning" className="w-fit">
              92 percent used
            </Badge>
            <CardTitle>Storage almost full</CardTitle>
            <CardDescription>Upgrade to keep photos in sync on every device.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={92} aria-label="Storage used" />
          </CardContent>
          <CardFooter>
            <Button variant="tinted" size="sm">
              Upgrade
            </Button>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shared album</CardTitle>
            <CardDescription>Lisbon trip, 128 photos.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {["#f9a8d4", "#93c5fd", "#fcd34d", "#a7f3d0", "#c4b5fd", "#fdba74"].map((color) => (
              <div
                key={color}
                className="aspect-square rounded-xl shadow-raised"
                style={{ background: `linear-gradient(135deg, ${color}, white)` }}
              />
            ))}
          </CardContent>
          <CardFooter className="justify-between">
            <AvatarGroup>
              <Avatar alt="Ada Lovelace" size="sm" />
              <Avatar alt="Grace Hopper" size="sm" />
            </AvatarGroup>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
        <Card elevation="raised">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what reaches you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Messages", "Calendar", "Reminders"].map((name, index) => (
              <label key={name} className="flex items-center justify-between">
                {name}
                <Switch defaultChecked={index !== 2} />
              </label>
            ))}
          </CardContent>
        </Card>
      </div>
    </ShowcaseSection>
  );
}

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

function Navigation() {
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
              <MenuItem icon={<Trash2 />} destructive>
                Delete album
              </MenuItem>
            </MenuContent>
          </Menu>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}

function Overlays() {
  return (
    <ShowcaseSection
      id="overlays"
      title="Overlays"
      description="Tooltips, popovers, dialogs and toasts float in denser glass."
    >
      <Panel className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Demo label="Tooltip">
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip content="Favourite">
                <IconButton aria-label="Favourite">
                  <Heart />
                </IconButton>
              </Tooltip>
              <Tooltip content="Share">
                <IconButton aria-label="Share">
                  <Share />
                </IconButton>
              </Tooltip>
            </div>
          </TooltipProvider>
        </Demo>
        <Demo label="Popover">
          <Popover>
            <PopoverTrigger render={<Button />}>Focus</PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Do not disturb</PopoverTitle>
              <PopoverDescription>Silence notifications until tomorrow morning.</PopoverDescription>
              <label className="mt-4 flex items-center justify-between text-sm">
                Allow favourites
                <Switch defaultChecked />
              </label>
            </PopoverContent>
          </Popover>
        </Demo>
        <Demo label="Dialog">
          <Dialog>
            <DialogTrigger render={<Button variant="danger" />}>Delete album</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this album?</DialogTitle>
                <DialogDescription>
                  The photos stay in your library. Only the album is removed.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                <DialogClose
                  render={<Button variant="danger" />}
                  onClick={() => toast({ title: "Album deleted", tone: "danger" })}
                >
                  Delete
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>
        <Demo label="Toast">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => toast({ title: "Copied", description: "Link copied to clipboard." })}
            >
              Show toast
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                toast({
                  title: "Backup complete",
                  description: "Everything is safe in iCloud.",
                  tone: "success",
                })
              }
            >
              Success
            </Button>
          </div>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}

export function GlassSections() {
  return (
    <div className="space-y-16">
      <Buttons />
      <Inputs />
      <Selection />
      <Display />
      <Cards />
      <Navigation />
      <Overlays />
    </div>
  );
}
