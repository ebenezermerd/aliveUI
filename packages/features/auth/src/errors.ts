import { AuthError } from "./types.js";

/** A message people can act on, for any error an adapter throws. */
export function authErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.code) {
      case "INVALID_CREDENTIALS":
        return "That email and password do not match an account.";
      case "EMAIL_TAKEN":
        return "An account with this email already exists. Try signing in instead.";
      case "INVALID_PASSWORD":
        return "Your current password is not correct.";
      case "NOT_AUTHENTICATED":
        return "Your session has ended. Please sign in again.";
      default:
        return error.message;
    }
  }
  return "Something went wrong. Please try again.";
}
