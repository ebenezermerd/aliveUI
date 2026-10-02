"use client";

import { cn } from "@aliveui/primitives";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useEffect, useEffectEvent, useState, type ReactNode } from "react";
import { SearchIcon } from "../../lib/icons.js";
import { listItem, popupSurface } from "../../lib/styles.js";
import { Kbd } from "../kbd/kbd.js";
import { useGlassScope } from "../provider/provider.js";
import { ScrollArea } from "../scroll-area/scroll-area.js";

export interface Command {
  value: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandGroup {
  label: string;
  items: readonly Command[];
}

export interface CommandPaletteProps {
  groups: readonly CommandGroup[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Letter that toggles the palette together with Command or Control. Pass `null` to disable. */
  hotkey?: string | null;
  placeholder?: string;
  emptyMessage?: ReactNode;
}

/** A searchable list of every action in the app, opened with Command K. */
export function CommandPalette({
  groups,
  open: controlledOpen,
  onOpenChange,
  hotkey = "k",
  placeholder = "Search for apps and commands",
  emptyMessage = "No results found.",
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const scope = useGlassScope();

  function setOpen(next: boolean) {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  const toggle = useEffectEvent(() => setOpen(!open));

  useEffect(() => {
    if (!hotkey) return;
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === hotkey) {
        event.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hotkey]);

  return (
    <BaseDialog.Root open={open} onOpenChange={setOpen}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          {...scope}
          className="fixed inset-0 z-50 bg-(--alive-glass-scrim) backdrop-blur-sm transition-opacity duration-(--alive-duration-base) data-starting-style:opacity-0 data-ending-style:opacity-0"
        />
        <BaseDialog.Viewport
          {...scope}
          className="fixed inset-0 z-50 flex justify-center px-4 pt-[14vh]"
        >
          <BaseDialog.Popup
            aria-label="Command palette"
            className={cn(
              popupSurface,
              "flex h-fit max-h-[min(30rem,70vh)] w-full max-w-xl flex-col overflow-hidden rounded-3xl outline-none",
              "transition-[scale,opacity] duration-(--alive-duration-base) ease-spring",
              "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            )}
          >
            <BaseAutocomplete.Root
              open
              inline
              items={groups as CommandGroup[]}
              itemToStringValue={(item: Command) => item.label}
              autoHighlight="always"
              keepHighlight
            >
              <div className="flex items-center gap-3 border-b border-foreground/8 px-5">
                <SearchIcon className="size-5 shrink-0 text-muted-foreground" />
                <BaseAutocomplete.Input
                  aria-label="Search commands"
                  placeholder={placeholder}
                  className="h-14 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Kbd>esc</Kbd>
              </div>
              <ScrollArea className="min-h-0 flex-1" viewportClassName="max-h-[22rem]">
                <BaseAutocomplete.Empty className="px-5 py-8 text-center text-sm text-muted-foreground empty:hidden">
                  {emptyMessage}
                </BaseAutocomplete.Empty>
                <BaseAutocomplete.List className="p-2">
                  {(group: CommandGroup) => (
                    <BaseAutocomplete.Group
                      key={group.label}
                      items={group.items as Command[]}
                      className="pb-1"
                    >
                      <BaseAutocomplete.GroupLabel className="px-3 pt-2 pb-1.5 text-xs font-medium text-muted-foreground">
                        {group.label}
                      </BaseAutocomplete.GroupLabel>
                      <BaseAutocomplete.Collection>
                        {(item: Command) => (
                          <BaseAutocomplete.Item
                            key={item.value}
                            value={item}
                            onClick={() => {
                              item.onSelect?.();
                              setOpen(false);
                            }}
                            className={cn(listItem, "px-3 py-2.5")}
                          >
                            {item.icon ? (
                              <span className="flex opacity-80">{item.icon}</span>
                            ) : null}
                            <span className="flex-1">{item.label}</span>
                            {item.shortcut ? (
                              <span className="text-xs opacity-60">{item.shortcut}</span>
                            ) : null}
                          </BaseAutocomplete.Item>
                        )}
                      </BaseAutocomplete.Collection>
                    </BaseAutocomplete.Group>
                  )}
                </BaseAutocomplete.List>
              </ScrollArea>
            </BaseAutocomplete.Root>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
