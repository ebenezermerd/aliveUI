"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  CommandPalette,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  IconButton,
  Kbd,
  MenuItem,
  MenuSeparator,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
  Slider,
  Switch,
  toast,
  Tooltip,
  TooltipProvider,
  type CommandGroup,
} from "@aliveui/ui";
import { useState } from "react";
import { Heart, Share } from "lucide-react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

const commandGroups: CommandGroup[] = [
  {
    label: "Suggestions",
    items: [
      { value: "calendar", label: "Calendar" },
      { value: "music", label: "Music" },
      { value: "photos", label: "Photos" },
    ],
  },
  {
    label: "Commands",
    items: [
      {
        value: "note",
        label: "New note",
        shortcut: "⌘N",
        onSelect: () => toast({ title: "Note created" }),
      },
      { value: "share", label: "Share window", onSelect: () => toast({ title: "Window shared" }) },
      { value: "lock", label: "Lock screen", shortcut: "⌃⌘Q" },
    ],
  },
];

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Search <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette groups={commandGroups} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function OverlaysSection() {
  return (
    <ShowcaseSection
      id="overlays"
      title="Overlays"
      description="Tooltips, popovers, dialogs and toasts float above everything else."
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
            <Button
              variant="ghost"
              onClick={() =>
                toast({
                  title: "Message archived",
                  action: { label: "Undo", onClick: () => toast({ title: "Message restored" }) },
                })
              }
            >
              With undo
            </Button>
          </div>
        </Demo>
        <Demo label="Alert dialog">
          <AlertDialog>
            <AlertDialogTrigger render={<Button />}>Sign out</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out of iCloud?</AlertDialogTitle>
                <AlertDialogDescription>
                  Downloaded files stay on this device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button />}>Cancel</AlertDialogClose>
                <AlertDialogClose render={<Button variant="danger" />}>Sign out</AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>
        <Demo label="Drawer">
          <Drawer>
            <DrawerTrigger render={<Button />}>Inspector</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Inspector</DrawerTitle>
                <DrawerDescription>Swipe right to dismiss.</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-5 text-sm">
                <label className="flex items-center justify-between">
                  Show grid <Switch defaultChecked />
                </label>
                <div className="space-y-2">
                  <p>Opacity</p>
                  <Slider aria-label="Opacity" defaultValue={80} />
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="primary" />}>Done</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Demo>
        <Demo label="Bottom sheet">
          <Drawer side="bottom">
            <DrawerTrigger render={<Button />}>Share</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Share album</DrawerTitle>
                <DrawerDescription>Swipe down to dismiss.</DrawerDescription>
              </DrawerHeader>
              <div className="grid grid-cols-4 gap-4 text-center text-xs">
                {["AirDrop", "Messages", "Mail", "Notes"].map((app, index) => (
                  <div key={app} className="space-y-2">
                    <div
                      className="mx-auto size-14 rounded-2xl shadow-raised"
                      style={{
                        background: ["#60a5fa", "#4ade80", "#38bdf8", "#facc15"][index],
                      }}
                    />
                    {app}
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </Demo>
        <Demo label="Command palette">
          <CommandPaletteDemo />
        </Demo>
        <Demo label="Context menu" className="md:col-span-2">
          <ContextMenu>
            <ContextMenuTrigger className="surface-well flex h-28 items-center justify-center rounded-2xl text-sm opacity-90">
              Right click or long press here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <MenuItem shortcut="⌘O">Open</MenuItem>
              <MenuItem shortcut="⌘I">Get info</MenuItem>
              <MenuItem shortcut="⌘D">Duplicate</MenuItem>
              <MenuSeparator />
              <MenuItem destructive>Move to trash</MenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo label="Preview card" className="md:col-span-2">
          <p className="text-sm leading-relaxed">
            Apple introduced its{" "}
            <PreviewCard>
              <PreviewCardTrigger href="#overlays">Liquid Glass</PreviewCardTrigger>
              <PreviewCardContent>
                <div className="mb-3 h-28 rounded-xl bg-[linear-gradient(135deg,#f9a8d4,#93c5fd,#fde68a)]" />
                <p className="text-sm font-semibold">Liquid Glass</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A translucent material that reflects and refracts its surroundings.
                </p>
              </PreviewCardContent>
            </PreviewCard>{" "}
            design language across every platform. Hover the link for a preview.
          </p>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
