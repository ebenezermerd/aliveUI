/** Only allow relative paths, so a `next` parameter cannot send people to another site. */
export function safeNext(next: string | null, fallback = "/dashboard") {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}
