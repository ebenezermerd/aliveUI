"use client";

import {
  Alert,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Spinner,
  toast,
} from "@aliveui/ui";
import { useChangePassword, useUpdateProfile } from "../react/hooks.js";
import { useUser } from "../react/provider.js";
import { PasswordInput } from "./password-input.js";
import { PasswordStrengthMeter } from "./password-strength.js";
import { useState } from "react";

/** Edit the signed in person's name. Email stays read only. */
export function ProfileForm() {
  const user = useUser();
  const { submit, pending, formError, fieldErrors } = useUpdateProfile(() =>
    toast({ title: "Profile updated", tone: "success" }),
  );

  return (
    <Form
      errors={fieldErrors}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void submit(Object.fromEntries(new FormData(event.currentTarget)));
      }}
    >
      {formError ? <Alert tone="danger">{formError}</Alert> : null}
      <Field name="name">
        <FieldLabel>Full name</FieldLabel>
        <Input defaultValue={user.name} autoComplete="name" />
        <FieldError />
      </Field>
      <Field disabled>
        <FieldLabel>Email</FieldLabel>
        <Input defaultValue={user.email} readOnly />
      </Field>
      <Button type="submit" variant="primary" disabled={pending} className="self-start">
        {pending ? <Spinner size="sm" label="Saving" /> : null}
        Save profile
      </Button>
    </Form>
  );
}

/** Change the password after confirming the current one. */
export function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [formKey, setFormKey] = useState(0);
  const { submit, pending, formError, fieldErrors } = useChangePassword(() => {
    toast({ title: "Password changed", tone: "success" });
    setPassword("");
    setFormKey((key) => key + 1);
  });

  return (
    <Form
      key={formKey}
      errors={fieldErrors}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void submit(Object.fromEntries(new FormData(event.currentTarget)));
      }}
    >
      {formError ? <Alert tone="danger">{formError}</Alert> : null}
      <Field name="currentPassword">
        <FieldLabel>Current password</FieldLabel>
        <PasswordInput autoComplete="current-password" />
        <FieldError />
      </Field>
      <Field name="newPassword">
        <FieldLabel>New password</FieldLabel>
        <PasswordInput
          autoComplete="new-password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <PasswordStrengthMeter value={password} />
        <FieldError />
      </Field>
      <Field name="confirmPassword">
        <FieldLabel>Confirm new password</FieldLabel>
        <PasswordInput autoComplete="new-password" />
        <FieldError />
      </Field>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? <Spinner size="sm" label="Updating" /> : null}
        Change password
      </Button>
    </Form>
  );
}
