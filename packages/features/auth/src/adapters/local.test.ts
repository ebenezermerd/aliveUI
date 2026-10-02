import { beforeEach, describe, expect, it } from "vitest";
import { AuthError } from "../types.js";
import { createLocalAuthAdapter, createMemoryStorage } from "./local.js";

function setup() {
  const storage = createMemoryStorage();
  const sessionStorage = createMemoryStorage();
  const adapter = createLocalAuthAdapter({ storage, sessionStorage, latency: 0 });
  return { adapter, storage, sessionStorage };
}

describe("local auth adapter", () => {
  let env: ReturnType<typeof setup>;
  beforeEach(() => {
    env = setup();
  });

  it("signs up, starts a session and never stores the plain password", async () => {
    const session = await env.adapter.signUp({
      name: "Ada Lovelace",
      email: "Ada@Example.com",
      password: "analytical-engine",
    });
    expect(session.user).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com" });
    expect(await env.adapter.getSession()).toMatchObject({ user: { email: "ada@example.com" } });
    expect(env.storage.getItem("aliveui.auth.users")).not.toContain("analytical-engine");
  });

  it("rejects a second account with the same email", async () => {
    await env.adapter.signUp({ name: "Ada", email: "ada@example.com", password: "password-one" });
    await expect(
      env.adapter.signUp({ name: "Ada", email: "ADA@example.com", password: "password-two" }),
    ).rejects.toMatchObject({ code: "EMAIL_TAKEN" });
  });

  it("signs in with the right password only", async () => {
    await env.adapter.signUp({ name: "Ada", email: "ada@example.com", password: "password-one" });
    await env.adapter.signOut();
    expect(await env.adapter.getSession()).toBeNull();

    await expect(
      env.adapter.signIn({ email: "ada@example.com", password: "wrong-password" }),
    ).rejects.toBeInstanceOf(AuthError);
    const session = await env.adapter.signIn({
      email: "ada@example.com",
      password: "password-one",
    });
    expect(session.user.name).toBe("Ada");
  });

  it("keeps sessions that are not remembered out of long term storage", async () => {
    await env.adapter.signUp({ name: "Ada", email: "ada@example.com", password: "password-one" });
    await env.adapter.signIn({
      email: "ada@example.com",
      password: "password-one",
      remember: false,
    });
    expect(env.storage.getItem("aliveui.auth.session")).toBeNull();
    expect(env.sessionStorage.getItem("aliveui.auth.session")).not.toBeNull();
  });

  it("updates the profile and changes the password", async () => {
    await env.adapter.signUp({ name: "Ada", email: "ada@example.com", password: "password-one" });
    expect((await env.adapter.updateProfile({ name: "Countess Ada" })).name).toBe("Countess Ada");

    await expect(
      env.adapter.changePassword({ currentPassword: "nope", newPassword: "password-two" }),
    ).rejects.toMatchObject({ code: "INVALID_PASSWORD" });
    await env.adapter.changePassword({
      currentPassword: "password-one",
      newPassword: "password-two",
    });
    await env.adapter.signOut();
    await expect(
      env.adapter.signIn({ email: "ada@example.com", password: "password-one" }),
    ).rejects.toMatchObject({ code: "INVALID_CREDENTIALS" });
    await env.adapter.signIn({ email: "ada@example.com", password: "password-two" });
  });

  it("notifies subscribers when the session changes", async () => {
    const seen: (string | null)[] = [];
    env.adapter.subscribe((session) => seen.push(session?.user.email ?? null));
    await env.adapter.signUp({ name: "Ada", email: "ada@example.com", password: "password-one" });
    await env.adapter.signOut();
    expect(seen).toEqual(["ada@example.com", null]);
  });
});
