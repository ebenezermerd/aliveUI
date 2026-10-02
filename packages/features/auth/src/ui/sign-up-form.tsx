"use client";

import { Alert, Button, Field, FieldError, FieldLabel, Form, Input, Spinner } from "@aliveui/ui";
import { useState } from "react";
import { useSignUp } from "../react/hooks.js";
import type { Session } from "../types.js";
import { defaultRenderLink, inlineLink, type RenderLink } from "./link.js";
import { PasswordInput } from "./password-input.js";
import { PasswordStrengthMeter } from "./password-strength.js";

export interface SignUpFormProps {
  onSuccess?: (session: Session) => void;
  /** Where the "Sign in" link points. Hidden when omitted. */
  signInHref?: string;
  renderLink?: RenderLink;
}

export function SignUpForm({
  onSuccess,
  signInHref,
  renderLink = defaultRenderLink,
}: SignUpFormProps) {
  const { submit, pending, formError, fieldErrors } = useSignUp(onSuccess);
  const [password, setPassword] = useState("");

  return (
    <Form
      errors={fieldErrors}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        void submit(Object.fromEntries(data));
      }}
    >
      {formError ? <Alert tone="danger">{formError}</Alert> : null}
      <Field name="name">
        <FieldLabel>Full name</FieldLabel>
        <Input autoComplete="name" placeholder="Ada Lovelace" />
        <FieldError />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" autoComplete="email" placeholder="you@example.com" />
        <FieldError />
      </Field>
      <Field name="password">
        <FieldLabel>Password</FieldLabel>
        <PasswordInput
          autoComplete="new-password"
          placeholder="At least 8 characters"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <PasswordStrengthMeter value={password} />
        <FieldError />
      </Field>
      <Field name="confirmPassword">
        <FieldLabel>Confirm password</FieldLabel>
        <PasswordInput autoComplete="new-password" placeholder="Type it again" />
        <FieldError />
      </Field>
      <Button type="submit" variant="primary" size="lg" disabled={pending} className="w-full">
        {pending ? <Spinner size="sm" label="Creating account" /> : null}
        {pending ? "Creating account" : "Create account"}
      </Button>
      {signInHref ? (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          {renderLink({ href: signInHref, className: inlineLink, children: "Sign in" })}
        </p>
      ) : null}
    </Form>
  );
}
