# @aliveui/glass

Apple style glassmorphism for React. Translucent surfaces blur and saturate whatever sits behind
them, with an edge highlight, a soft sheen and wide layered shadows. Behaviour and accessibility
come from [Base UI](https://base-ui.com), styling comes from AliveUI tokens and Tailwind v4.

## Setup

```css
@import "tailwindcss";
@import "@aliveui/glass/styles.css";

/* Let Tailwind generate the classes the components use. */
@source "../node_modules/@aliveui/glass";
```

```tsx
import { Button, GlassProvider, Toaster } from "@aliveui/glass";

export function App() {
  return (
    <GlassProvider mode="dark">
      <Toaster>
        <Button variant="tinted">Continue</Button>
      </Toaster>
    </GlassProvider>
  );
}
```

`GlassProvider` scopes the tokens and tells popups which mode to use, since popups render at the
end of the document outside any themed element. Glass needs something colourful behind it to
read as glass, so place it over imagery or gradients.

## Components

| Group      | Components                                                                               |
| ---------- | ---------------------------------------------------------------------------------------- |
| Surfaces   | `GlassSurface`, `Card`                                                                   |
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

The CSS also provides three utilities you can use directly: `glass`, `glass-overlay` for denser
floating surfaces, and `glass-well` for recessed fields and tracks.
