# @aliveui/ui

The AliveUI component kit. Every component gets its behaviour and accessibility from
[Base UI](https://base-ui.com) and its entire look from AliveUI tokens, so the same markup renders
in any design system theme, such as `@aliveui/glass` or `@aliveui/minimal`.

## Setup

```css
@import "tailwindcss";
/* Import one or more system themes. Each one brings the kit's base styles. */
@import "@aliveui/glass/styles.css";

/* Let Tailwind generate the classes the components use. */
@source "../node_modules/@aliveui/ui";
```

```tsx
import { Button, SystemProvider, Toaster } from "@aliveui/ui";

export function App() {
  return (
    <SystemProvider system="glass" mode="dark">
      <Toaster>
        <Button variant="primary">Continue</Button>
      </Toaster>
    </SystemProvider>
  );
}
```

`SystemProvider` scopes the tokens and tells popups which system and mode to use, since popups
render at the end of the document outside any themed element. `Backdrop` draws the page
background, including colour fields for systems such as glass that need something to refract.

## Components

| Group      | Components                                                                               |
| ---------- | ---------------------------------------------------------------------------------------- |
| Surfaces   | `Surface`, `Card`, `Backdrop`                                                            |
| Actions    | `Button`, `IconButton`, `Toggle`, `ToggleGroup`                                          |
| Forms      | `Field`, `Fieldset`, `Form`, `Input`, `Textarea`, `NumberField`, `OTPField`              |
| Pickers    | `Select`, `Combobox`, `MultiCombobox`, `Autocomplete`, `Calendar`, `DatePicker`          |
| Selection  | `Checkbox`, `CheckboxGroup`, `RadioGroup` and `Radio`, `Switch`, `Slider`                |
| Display    | `Badge`, `Avatar`, `Progress`, `Meter`, `Separator`, `Kbd`, `Spinner`, `Skeleton`        |
| Feedback   | `Alert`, `EmptyState`, `Toaster` with the `toast()` function                             |
| Disclosure | `Accordion`, `Collapsible`                                                               |
| Data       | `Table`, `Pagination`, `ScrollArea`                                                      |
| Navigation | `Tabs`, `SegmentedControl`, `Toolbar`, `Menu`, `Menubar`, `NavigationMenu`, `Breadcrumb` |
| App shell  | `Sidebar`, `Dock`, `CommandPalette`                                                      |
| Overlays   | `Tooltip`, `Popover`, `PreviewCard`, `Dialog`, `AlertDialog`, `Drawer`, `ContextMenu`    |

`Menu`, `ContextMenu` and `Menubar` share the same item parts: `MenuItem`, `MenuCheckboxItem`,
`MenuRadioGroup` with `MenuRadioItem`, `MenuGroup`, `MenuSeparator` and `MenuSubmenu`.

The tokens package provides the recipe utilities the kit is drawn with, which you can use directly:
`surface`, `surface-overlay` for floating popups, `surface-well` for recessed fields and tracks,
and `knob` for thumbs.
