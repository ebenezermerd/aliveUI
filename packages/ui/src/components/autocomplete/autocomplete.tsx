"use client";

import { cn } from "@aliveui/primitives";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ReactNode } from "react";
import { fieldControl } from "../input/input.js";
import { SearchIcon } from "../../lib/icons.js";
import { listItem, popupMotion, popupSurface } from "../../lib/styles.js";
import { useSystemScope } from "../provider/provider.js";

export interface AutocompleteProps {
  /** Suggestions to filter as the user types. */
  items: readonly string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: ReactNode;
  /** Show a magnifying glass icon inside the field. */
  search?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

/**
 * A free text field with suggestions. Unlike `Combobox` the value is whatever
 * the user types, suggestions only help them finish it.
 */
export function Autocomplete({
  items,
  placeholder,
  emptyMessage = "No suggestions.",
  search = false,
  id,
  className,
  "aria-label": ariaLabel,
  ...props
}: AutocompleteProps) {
  const scope = useSystemScope();
  return (
    <BaseAutocomplete.Root items={items as string[]} {...props}>
      <div className={cn("relative flex w-full items-center", className)}>
        {search ? (
          <SearchIcon className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
        ) : null}
        <BaseAutocomplete.Input
          id={id}
          aria-label={ariaLabel}
          placeholder={placeholder}
          className={cn(fieldControl, "h-10", search && "pl-10")}
        />
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner {...scope} sideOffset={6} className="z-50 outline-none">
          <BaseAutocomplete.Popup
            className={cn(
              popupSurface,
              popupMotion,
              "max-h-[min(var(--available-height),20rem)] w-(--anchor-width) overflow-y-auto p-1.5 outline-none",
            )}
          >
            <BaseAutocomplete.Empty className="px-2.5 py-2 text-sm text-muted-foreground empty:hidden">
              {emptyMessage}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List>
              {(item: string) => (
                <BaseAutocomplete.Item key={item} value={item} className={listItem}>
                  {item}
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
