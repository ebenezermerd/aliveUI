import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { useState } from "react";
import { Checkbox } from "../checkbox/checkbox.js";
import { CheckboxGroup } from "./checkbox-group.js";

const apps = ["mail", "photos", "notes"];

const meta = {
  title: "Glass/CheckboxGroup",
  component: CheckboxGroup,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function SelectAll() {
  const [value, setValue] = useState<string[]>(["photos"]);
  return (
    <CheckboxGroup value={value} onValueChange={setValue} allValues={apps} aria-label="Sync apps">
      <label className="flex items-center gap-2.5 text-sm font-medium">
        <Checkbox parent /> Sync everything
      </label>
      {apps.map((app) => (
        <label key={app} className="ml-7 flex items-center gap-2.5 text-sm capitalize">
          <Checkbox value={app} /> {app}
        </label>
      ))}
    </CheckboxGroup>
  );
}

export const WithParent: Story = { render: () => <SelectAll /> };
