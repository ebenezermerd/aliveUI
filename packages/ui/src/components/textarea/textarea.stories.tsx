import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Field, FieldLabel } from "../field/field.js";
import { Textarea } from "./textarea.js";

const meta = {
  title: "Glass/Textarea",
  component: Textarea,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
  args: { placeholder: "Write a note", "aria-label": "Note", className: "max-w-sm" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithField: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel>Message</FieldLabel>
      <Textarea placeholder="Say hello" />
    </Field>
  ),
};
