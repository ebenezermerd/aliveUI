import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Input } from "../input/input.js";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field.js";

const meta = {
  title: "Components/Field",
  component: Field,
  decorators: [withBackdrop],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {
  render: () => (
    <Field className="max-w-xs">
      <FieldLabel>Display name</FieldLabel>
      <Input required placeholder="Required" />
      <FieldDescription>Shown on your profile.</FieldDescription>
      <FieldError match="valueMissing">Please enter a name.</FieldError>
    </Field>
  ),
};
