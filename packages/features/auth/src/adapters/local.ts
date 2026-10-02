import { AuthError, type AuthAdapter, type Session, type User } from "../types.js";

/** The subset of the Web Storage API the adapter needs, so tests can pass a plain object. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface StoredUser extends User {
  salt: string;
  passwordHash: string;
}

interface StoredSession {
  userId: string;
  expiresAt: string;
}

export interface LocalAuthOptions {
  /** Prefix for every storage key, so several apps can share an origin. */
  namespace?: string;
  /** Where accounts and remembered sessions live. Defaults to `localStorage`. */
  storage?: StorageLike;
  /** Where sessions that should end with the browser live. Defaults to `sessionStorage`. */
  sessionStorage?: StorageLike;
  /** Artificial delay in milliseconds, to exercise loading states. */
  latency?: number;
  /** Session length in days for remembered sign ins. */
  sessionDays?: number;
}

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer | Uint8Array) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** PBKDF2 with a per user salt, so stored passwords are never readable. */
async function hashPassword(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: encoder.encode(salt), iterations: 100_000 },
    key,
    256,
  );
  return toHex(bits);
}

function publicUser({ id, name, email, createdAt }: StoredUser): User {
  return { id, name, email, createdAt };
}

/**
 * Stores accounts and sessions in the browser. Fully functional for demos,
 * prototypes and offline work. Swap it for an adapter that calls your API
 * when a backend exists, the UI does not change.
 */
export function createLocalAuthAdapter(options: LocalAuthOptions = {}): AuthAdapter {
  const namespace = options.namespace ?? "aliveui.auth";
  const latency = options.latency ?? 400;
  const sessionDays = options.sessionDays ?? 30;
  const keys = { users: `${namespace}.users`, session: `${namespace}.session` };
  const listeners = new Set<(session: Session | null) => void>();

  const local = () => options.storage ?? globalThis.localStorage;
  const temporary = () => options.sessionStorage ?? globalThis.sessionStorage ?? local();

  const wait = () => new Promise((resolve) => setTimeout(resolve, latency));

  function readUsers(): StoredUser[] {
    try {
      return JSON.parse(local().getItem(keys.users) ?? "[]") as StoredUser[];
    } catch {
      return [];
    }
  }

  function writeUsers(users: StoredUser[]) {
    local().setItem(keys.users, JSON.stringify(users));
  }

  function readStoredSession(): StoredSession | null {
    const raw = temporary().getItem(keys.session) ?? local().getItem(keys.session);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredSession;
    } catch {
      return null;
    }
  }

  function currentSession(): Session | null {
    const stored = readStoredSession();
    if (!stored || new Date(stored.expiresAt) <= new Date()) return null;
    const user = readUsers().find((candidate) => candidate.id === stored.userId);
    return user ? { user: publicUser(user), expiresAt: stored.expiresAt } : null;
  }

  function emit() {
    const session = currentSession();
    for (const listener of listeners) listener(session);
  }

  function startSession(user: StoredUser, remember: boolean): Session {
    const days = remember ? sessionDays : 1;
    const stored: StoredSession = {
      userId: user.id,
      expiresAt: new Date(Date.now() + days * 86_400_000).toISOString(),
    };
    local().removeItem(keys.session);
    temporary().removeItem(keys.session);
    (remember ? local() : temporary()).setItem(keys.session, JSON.stringify(stored));
    emit();
    return { user: publicUser(user), expiresAt: stored.expiresAt };
  }

  function requireUser(): StoredUser {
    const session = currentSession();
    const user = session && readUsers().find((candidate) => candidate.id === session.user.id);
    if (!user) throw new AuthError("NOT_AUTHENTICATED");
    return user;
  }

  // Keep every open tab in step when another tab signs in or out.
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === keys.session || event.key === keys.users) emit();
    });
  }

  return {
    async getSession() {
      return currentSession();
    },

    async signIn({ email, password, remember = true }) {
      await wait();
      const user = readUsers().find((candidate) => candidate.email === email.toLowerCase());
      // Hash even when the user is missing, so timing does not reveal which emails exist.
      const hash = await hashPassword(password, user?.salt ?? "missing");
      if (!user || hash !== user.passwordHash) throw new AuthError("INVALID_CREDENTIALS");
      return startSession(user, remember);
    },

    async signUp({ name, email, password }) {
      await wait();
      const users = readUsers();
      const normalized = email.toLowerCase();
      if (users.some((candidate) => candidate.email === normalized)) {
        throw new AuthError("EMAIL_TAKEN");
      }
      const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
      const user: StoredUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalized,
        createdAt: new Date().toISOString(),
        salt,
        passwordHash: await hashPassword(password, salt),
      };
      writeUsers([...users, user]);
      return startSession(user, true);
    },

    async signOut() {
      await wait();
      local().removeItem(keys.session);
      temporary().removeItem(keys.session);
      emit();
    },

    async updateProfile({ name }) {
      await wait();
      const user = requireUser();
      const updated = { ...user, name: name.trim() };
      writeUsers(readUsers().map((candidate) => (candidate.id === user.id ? updated : candidate)));
      emit();
      return publicUser(updated);
    },

    async changePassword({ currentPassword, newPassword }) {
      await wait();
      const user = requireUser();
      if ((await hashPassword(currentPassword, user.salt)) !== user.passwordHash) {
        throw new AuthError("INVALID_PASSWORD");
      }
      const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
      const updated = { ...user, salt, passwordHash: await hashPassword(newPassword, salt) };
      writeUsers(readUsers().map((candidate) => (candidate.id === user.id ? updated : candidate)));
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/** A storage that lives only in memory, for tests and server rendering. */
export function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, value),
    removeItem: (key) => void map.delete(key),
  };
}
