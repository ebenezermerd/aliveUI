"use client";

import { IconButton, Input, type InputProps } from "@aliveui/ui";
import { cn } from "@aliveui/primitives";
import { useState } from "react";

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M1.75 8s2.25-4.25 6.25-4.25S14.25 8 14.25 8 12 12.25 8 12.25 1.75 8 1.75 8Z" />
      <circle cx="8" cy="8" r="2" />
      {open ? null : <path d="m2.5 2.5 11 11" strokeLinecap="round" />}
    </svg>
  );
}

/** A password field with a button to reveal what was typed. */
export function PasswordInput({ className, ...props }: Omit<InputProps, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input type={visible ? "text" : "password"} className={cn("pr-11", className)} {...props} />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((value) => !value)}
        className="absolute top-1 right-1"
      >
        <EyeIcon open={visible} />
      </IconButton>
    </div>
  );
}
