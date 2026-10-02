"use client";

import {
  Alert,
  Button,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Spinner,
} from "@aliveui/glass";
import type { Session } from "../types.js";
import { useSignIn } from "../react/hooks.js";
import { defaultRenderLink, inlineLink, type RenderLink } from "./link.js";
import { PasswordInput } from "./password-input.js";

export interface SignInFormProps {
  onSuccess?: (session: Session) => void;
  /** Where the "Create an account" link points. Hidden when omitted. */
  signUpHref?: string;
  renderLink?: RenderLink;
  defaultEmail?: string;
}

export function SignInForm({
  onSuccess,
  signUpHref,
  renderLink = defaultRenderLink,
  defaultEmail,
}: SignInFormProps) {
  const { submit, pending, formError, fieldErrors } = useSignIn(onSuccess);

  return (
    <Form
      errors={fieldErrors}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        void submit({
          email: data.get("email"),
          password: data.get("password"),
          remember: data.get("remember") !== null,
        });
      }}
    >
      {formError ? <Alert tone="danger">{formError}</Alert> : null}
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={defaultEmail}
        />
        <FieldError />
      </Field>
      <Field name="password">
        <FieldLabel>Password</FieldLabel>
        <PasswordInput autoComplete="current-password" placeholder="Your password" />
        <FieldError />
      </Field>
      <label className="flex items-center gap-2.5 text-sm">
        <Checkbox name="remember" defaultChecked /> Keep me signed in
      </label>
      <Button type="submit" variant="tinted" size="lg" disabled={pending} className="w-full">
        {pending ? <Spinner size="sm" label="Signing in" /> : null}
        {pending ? "Signing in" : "Sign in"}
      </Button>
      {signUpHref ? (
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          {renderLink({ href: signUpHref, className: inlineLink, children: "Create an account" })}
        </p>
      ) : null}
    </Form>
  );
}
