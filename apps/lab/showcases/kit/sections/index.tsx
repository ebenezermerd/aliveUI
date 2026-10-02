"use client";

import type { Mode } from "@aliveui/ui";
import { ButtonsSection } from "./buttons";
import { CardsSection } from "./cards";
import { DataSection } from "./data";
import { DesktopSection } from "./desktop";
import { DisclosureSection } from "./disclosure";
import { DisplaySection } from "./display";
import { FeedbackSection } from "./feedback";
import { InputsSection } from "./inputs";
import { NavigationSection } from "./navigation";
import { OverlaysSection } from "./overlays";
import { SelectionSection } from "./selection";

/** Groups of components shown on the page, in order. Also drives the section index. */
export const sections = [
  { id: "buttons", title: "Buttons" },
  { id: "inputs", title: "Inputs" },
  { id: "selection", title: "Selection" },
  { id: "display", title: "Display" },
  { id: "feedback", title: "Feedback" },
  { id: "cards", title: "Cards" },
  { id: "disclosure", title: "Disclosure" },
  { id: "data", title: "Data" },
  { id: "navigation", title: "Navigation" },
  { id: "overlays", title: "Overlays" },
  { id: "desktop", title: "Desktop" },
] as const;

/** Every component the kit exports, counted on the page header. */
export const componentNames = [
  "Surface",
  "Card",
  "Button",
  "IconButton",
  "Toggle",
  "ToggleGroup",
  "Input",
  "Textarea",
  "Field",
  "Fieldset",
  "Form",
  "Select",
  "Combobox",
  "MultiCombobox",
  "Autocomplete",
  "NumberField",
  "OTPField",
  "DatePicker",
  "Checkbox",
  "CheckboxGroup",
  "Radio",
  "Switch",
  "Slider",
  "Badge",
  "Avatar",
  "Progress",
  "Meter",
  "Separator",
  "Kbd",
  "Spinner",
  "Skeleton",
  "Alert",
  "EmptyState",
  "Accordion",
  "Collapsible",
  "Table",
  "Pagination",
  "Calendar",
  "ScrollArea",
  "Tabs",
  "SegmentedControl",
  "Toolbar",
  "Menu",
  "Menubar",
  "NavigationMenu",
  "Breadcrumb",
  "Sidebar",
  "Dock",
  "Tooltip",
  "Popover",
  "PreviewCard",
  "Dialog",
  "AlertDialog",
  "Drawer",
  "ContextMenu",
  "CommandPalette",
  "Toast",
] as const;

export function KitSections({ mode }: { mode: Mode }) {
  return (
    <div className="space-y-16">
      <ButtonsSection />
      <InputsSection />
      <SelectionSection />
      <DisplaySection />
      <FeedbackSection />
      <CardsSection />
      <DisclosureSection />
      <DataSection />
      <NavigationSection />
      <OverlaysSection />
      <DesktopSection mode={mode} />
    </div>
  );
}
