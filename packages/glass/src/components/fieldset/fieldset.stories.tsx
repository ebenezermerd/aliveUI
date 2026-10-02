import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Field, FieldLabel } from "../field/field.js";
import { Input } from "../input/input.js";
import { Fieldset, FieldsetLegend } from "./fieldset.js";

const meta = {
  title: "Glass/Fieldset",
  component: Fieldset,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Fieldset {...args} className="max-w-sm">
      <FieldsetLegend>Billing details</FieldsetLegend>
      <Field>
        <FieldLabel>Company</FieldLabel>
        <Input placeholder="Company name" />
      </Field>
      <Field>
        <FieldLabel>Tax ID</FieldLabel>
        <Input placeholder="Fiscal number" />
      </Field>
    </Fieldset>
  ),
};

export const Disabled: Story = { ...Default, args: { disabled: true } };
