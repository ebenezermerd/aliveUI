/** The person signed in. Never carries secrets. */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Session {
  user: User;
  /** ISO timestamp after which the session is no longer valid. */
  expiresAt: string;
}

export type AuthErrorCode =
  "INVALID_CREDENTIALS" | "EMAIL_TAKEN" | "INVALID_PASSWORD" | "NOT_AUTHENTICATED" | "UNKNOWN";

/** Thrown by adapters so the UI can show a precise message. */
export class AuthError extends Error {
  constructor(
    readonly code: AuthErrorCode,
    message?: string,
  ) {
    super(message ?? code);
    this.name = "AuthError";
  }
}

export interface SignInParams {
  email: string;
  password: string;
  /** Keep the session after the browser closes. */
  remember?: boolean;
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

/**
 * Everything the auth feature needs from a backend. The UI only talks to this
 * interface, so a local adapter, a REST API or a hosted provider can be
 * swapped in without changing a single screen.
 */
export interface AuthAdapter {
  getSession(): Promise<Session | null>;
  signIn(params: SignInParams): Promise<Session>;
  /** Creates the account and signs it in. */
  signUp(params: SignUpParams): Promise<Session>;
  signOut(): Promise<void>;
  updateProfile(changes: { name: string }): Promise<User>;
  changePassword(params: { currentPassword: string; newPassword: string }): Promise<void>;
  /** Called whenever the session changes, including from another tab. Returns an unsubscribe. */
  subscribe(listener: (session: Session | null) => void): () => void;
}
