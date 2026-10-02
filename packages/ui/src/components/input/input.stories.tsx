import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field/field.js";
import { Input } from "./input.js";

const meta = {
  title: "Components/Input",
  component: Input,
  decorators: [withBackdrop],
  args: { placeholder: "Search", "aria-label": "Search", className: "max-w-xs" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const WithField: Story = {
  render: () => (
    <Field className="max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <Input type="email" required placeholder="you@example.com" />
      <FieldDescription>We never share it.</FieldDescription>
      <FieldError match="valueMissing">Please enter your email.</FieldError>
    </Field>
  ),
};
