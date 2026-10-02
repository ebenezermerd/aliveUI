import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { useState } from "react";
import { Button } from "../button/button.js";
import { Field, FieldError, FieldLabel } from "../field/field.js";
import { Input } from "../input/input.js";
import { Form } from "./form.js";

const meta = {
  title: "Glass/Form",
  component: Form,
  parameters: { system: "glass" },
  decorators: [withBackdrop],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

function ServerValidated() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <Form
      className="max-w-sm"
      errors={errors}
      onSubmit={(event) => {
        event.preventDefault();
        const name = new FormData(event.currentTarget).get("username");
        setErrors(name === "admin" ? { username: "That name is taken." } : {});
      }}
    >
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <Input required placeholder="Try admin" />
        <FieldError />
      </Field>
      <Button type="submit" variant="tinted" className="self-start">
        Create account
      </Button>
    </Form>
  );
}

export const Default: Story = { render: () => <ServerValidated /> };
