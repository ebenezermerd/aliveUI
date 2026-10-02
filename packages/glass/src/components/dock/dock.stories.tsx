import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Dock, DockItem, DockSeparator } from "./dock.js";

const apps = [
  { label: "Finder", from: "#60a5fa", to: "#2563eb", active: true },
  { label: "Safari", from: "#7dd3fc", to: "#0284c7", active: true },
  { label: "Messages", from: "#86efac", to: "#16a34a" },
  { label: "Music", from: "#fda4af", to: "#e11d48", active: true },
  { label: "Photos", from: "#fde68a", to: "#f97316" },
  { label: "Notes", from: "#fef08a", to: "#eab308" },
];

function AppIcon({ from, to }: { from: string; to: string }) {
  return <span style={{ background: `linear-gradient(160deg, ${from}, ${to})` }} />;
}

const meta = {
  title: "Glass/Dock",
  component: Dock,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Dock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-64 items-end justify-center">
      <Dock aria-label="Dock">
        {apps.map((app) => (
          <DockItem
            key={app.label}
            label={app.label}
            active={app.active}
            icon={<AppIcon from={app.from} to={app.to} />}
          />
        ))}
        <DockSeparator />
        <DockItem label="Trash" icon={<AppIcon from="#e5e7eb" to="#9ca3af" />} />
      </Dock>
    </div>
  ),
};
