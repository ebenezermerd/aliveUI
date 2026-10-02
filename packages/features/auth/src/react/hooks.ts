"use client";

import { useState } from "react";
import { changePasswordSchema, profileSchema, signInSchema, signUpSchema } from "../schemas.js";
import type { Session, User } from "../types.js";
import { useAuthAdapter } from "./provider.js";
import { useAuthForm } from "./use-auth-form.js";

export function useSignIn(onSuccess?: (session: Session) => void) {
  const adapter = useAuthAdapter();
  return useAuthForm(signInSchema, (values) => adapter.signIn(values), onSuccess);
}

export function useSignUp(onSuccess?: (session: Session) => void) {
  const adapter = useAuthAdapter();
  return useAuthForm(
    signUpSchema,
    ({ name, email, password }) => adapter.signUp({ name, email, password }),
    onSuccess,
  );
}

export function useUpdateProfile(onSuccess?: (user: User) => void) {
  const adapter = useAuthAdapter();
  return useAuthForm(profileSchema, (values) => adapter.updateProfile(values), onSuccess);
}

export function useChangePassword(onSuccess?: () => void) {
  const adapter = useAuthAdapter();
  return useAuthForm(
    changePasswordSchema,
    ({ currentPassword, newPassword }) => adapter.changePassword({ currentPassword, newPassword }),
    onSuccess,
  );
}

/** Signs out and reports progress, so a menu item can show it is working. */
export function useSignOut(onSuccess?: () => void) {
  const adapter = useAuthAdapter();
  const [pending, setPending] = useState(false);
  async function signOut() {
    setPending(true);
    try {
      await adapter.signOut();
      onSuccess?.();
    } finally {
      setPending(false);
    }
  }
  return { signOut, pending };
}
