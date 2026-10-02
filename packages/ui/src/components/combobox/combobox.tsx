"use client";

import { cn } from "@aliveui/primitives";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ReactNode } from "react";
import { fieldControl } from "../input/input.js";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "../../lib/icons.js";
import { focusRing, listItem, popupMotion, popupSurface } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SharedProps {
  items: readonly ComboboxOption[];
  placeholder?: string;
  /** Shown when nothing matches the typed text. */
  emptyMessage?: ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

const iconButton = cn(
  "flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground [&_svg]:size-3.5",
  focusRing,
);

function ComboboxPopup({ emptyMessage }: { emptyMessage: ReactNode }) {
  const scope = useSystemScope();
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner {...scope} sideOffset={6} className="z-50 outline-none">
        <BaseCombobox.Popup
          className={cn(
            popupSurface,
            popupMotion,
            "max-h-[min(var(--available-height),20rem)] w-(--anchor-width) overflow-y-auto p-1.5 outline-none",
          )}
        >
          <BaseCombobox.Empty className="px-2.5 py-2 text-sm text-muted-foreground empty:hidden">
            {emptyMessage}
          </BaseCombobox.Empty>
          <BaseCombobox.List>
            {(item: ComboboxOption) => (
              <BaseCombobox.Item
                key={item.value}
                value={item}
                disabled={item.disabled}
                className={cn(listItem, "grid grid-cols-[1rem_1fr]")}
              >
                <BaseCombobox.ItemIndicator className="col-start-1">
                  <CheckIcon strokeWidth={2.25} />
                </BaseCombobox.ItemIndicator>
                <span className="col-start-2">{item.label}</span>
              </BaseCombobox.Item>
            )}
          </BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export interface ComboboxProps extends SharedProps {
  value?: ComboboxOption | null;
  defaultValue?: ComboboxOption | null;
  onValueChange?: (value: ComboboxOption | null) => void;
}

/** A text field that filters a list as you type and picks one option. */
export function Combobox({
  items,
  placeholder,
  emptyMessage = "No results.",
  disabled,
  id,
  className,
  "aria-label": ariaLabel,
  ...props
}: ComboboxProps) {
  return (
    <BaseCombobox.Root
      items={items as ComboboxOption[]}
      itemToStringLabel={(item: ComboboxOption) => item.label}
      disabled={disabled}
      {...props}
    >
      <BaseCombobox.InputGroup className={cn("relative flex w-full items-center", className)}>
        <BaseCombobox.Input
          id={id}
          aria-label={ariaLabel}
          placeholder={placeholder}
          className={cn(fieldControl, "h-10 pr-16")}
        />
        <div className="absolute right-1.5 flex items-center">
          <BaseCombobox.Clear aria-label="Clear" className={iconButton}>
            <CloseIcon />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger aria-label="Show options" className={iconButton}>
            <ChevronDownIcon />
          </BaseCombobox.Trigger>
        </div>
      </BaseCombobox.InputGroup>
      <ComboboxPopup emptyMessage={emptyMessage} />
    </BaseCombobox.Root>
  );
}

export interface MultiComboboxProps extends SharedProps {
  value?: ComboboxOption[];
  defaultValue?: ComboboxOption[];
  onValueChange?: (value: ComboboxOption[]) => void;
}

/** Picks several options, shown as removable chips inside the field. */
export function MultiCombobox({
  items,
  placeholder,
  emptyMessage = "No results.",
  disabled,
  id,
  className,
  "aria-label": ariaLabel,
  ...props
}: MultiComboboxProps) {
  return (
    <BaseCombobox.Root
      multiple
      items={items as ComboboxOption[]}
      itemToStringLabel={(item: ComboboxOption) => item.label}
      disabled={disabled}
      {...props}
    >
      <BaseCombobox.InputGroup
        className={cn(
          fieldControl,
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 px-1.5 py-1.5 focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-ring/25",
          className,
        )}
      >
        <BaseCombobox.Value>
          {(value: ComboboxOption[]) => (
            <BaseCombobox.Chips
              className="contents"
              aria-label={value.length > 0 ? "Selected" : undefined}
            >
              {value.map((item) => (
                <BaseCombobox.Chip
                  key={item.value}
                  aria-label={item.label}
                  className="surface flex h-7 items-center gap-1 rounded-full pr-1 pl-2.5 text-xs font-medium shadow-raised outline-none data-highlighted:ring-2 data-highlighted:ring-ring"
                >
                  {item.label}
                  <BaseCombobox.ChipRemove
                    aria-label={`Remove ${item.label}`}
                    className="flex size-5 items-center justify-center rounded-full opacity-60 hover:bg-foreground/10 hover:opacity-100"
                  >
                    <CloseIcon className="size-3" />
                  </BaseCombobox.ChipRemove>
                </BaseCombobox.Chip>
              ))}
              <BaseCombobox.Input
                id={id}
                aria-label={ariaLabel}
                placeholder={value.length > 0 ? "" : placeholder}
                className="h-7 min-w-24 flex-1 bg-transparent px-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </BaseCombobox.Chips>
          )}
        </BaseCombobox.Value>
      </BaseCombobox.InputGroup>
      <ComboboxPopup emptyMessage={emptyMessage} />
    </BaseCombobox.Root>
  );
}
