import { describe, expect, it } from "vitest";
import { passwordStrength, signUpSchema, toFieldErrors } from "./schemas.js";

describe("auth schemas", () => {
  it("reports every invalid field, including a mismatched confirmation", () => {
    const result = signUpSchema.safeParse({
      name: "A",
      email: "not an email",
      password: "short",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(toFieldErrors(result.error)).sort()).toEqual([
        "confirmPassword",
        "email",
        "name",
        "password",
      ]);
    }
  });

  it("checks that passwords match", () => {
    const result = signUpSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      password: "long enough",
      confirmPassword: "long enougj",
    });
    expect(result.success || toFieldErrors(result.error)).toEqual({
      confirmPassword: "Passwords do not match.",
    });
  });

  it("rates longer, more varied passwords higher", () => {
    expect(passwordStrength("").score).toBe(0);
    expect(passwordStrength("abcdefgh").score).toBeLessThan(
      passwordStrength("Abcdefgh1234!").score,
    );
  });
});
