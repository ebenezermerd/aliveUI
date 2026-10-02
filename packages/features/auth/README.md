# @aliveui/auth

Login and registration as a reusable feature. It is split into layers so any design system can
render it and any backend can power it.

| Entry                 | What it holds                                                                   |
| --------------------- | ------------------------------------------------------------------------------- |
| `@aliveui/auth`       | Zod schemas, error messages, password strength and the `AuthAdapter` contract   |
| `@aliveui/auth/local` | `createLocalAuthAdapter`, accounts in the browser with PBKDF2 hashed passwords  |
| `@aliveui/auth/react` | `AuthProvider`, `useSession`, `useSignIn`, `useSignUp`, `AuthGuard` and friends |
| `@aliveui/auth/glass` | `AuthLayout`, `SignInForm`, `SignUpForm`, `UserMenu`, `ProfileForm` and more    |

```tsx
import { createLocalAuthAdapter } from "@aliveui/auth/local";
import { AuthProvider } from "@aliveui/auth/react";
import { AuthLayout, SignInForm } from "@aliveui/auth/glass";

const adapter = createLocalAuthAdapter();

<AuthProvider adapter={adapter}>
  <AuthLayout title="Welcome back">
    <SignInForm signUpHref="/register" onSuccess={() => router.replace("/dashboard")} />
  </AuthLayout>
</AuthProvider>;
```

## Moving to a real backend

Implement `AuthAdapter` with calls to your API and pass it to `AuthProvider`. The hooks and every
block keep working without changes. The local adapter is for demos, prototypes and offline work.
