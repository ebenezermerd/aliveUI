/** Date helpers that work on local calendar days, kept free of dependencies. */

export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year!, month! - 1, day!);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Whole days from today until the date, negative when it has passed. */
export function daysUntil(isoDate: string, now = new Date()): number {
  return Math.round((fromISODate(isoDate).getTime() - startOfDay(now).getTime()) / 86_400_000);
}

const relative = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

/** "3 minutes ago", "yesterday", "in 2 days". */
export function timeAgo(iso: string, now = new Date()): string {
  const seconds = Math.round((new Date(iso).getTime() - now.getTime()) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return relative.format(Math.trunc(seconds), "second");
  if (abs < 3600) return relative.format(Math.trunc(seconds / 60), "minute");
  if (abs < 86_400) return relative.format(Math.trunc(seconds / 3600), "hour");
  if (abs < 2_592_000) return relative.format(Math.trunc(seconds / 86_400), "day");
  return relative.format(Math.trunc(seconds / 2_592_000), "month");
}

export function formatDueDate(isoDate: string, now = new Date()): string {
  const days = daysUntil(isoDate, now);
  if (Math.abs(days) <= 7) return relative.format(days, "day");
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(
    fromISODate(isoDate),
  );
}
