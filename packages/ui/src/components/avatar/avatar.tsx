"use client";

import { cn, variants, type VariantProps } from "@aliveui/primitives";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { HTMLAttributes, Ref } from "react";

const avatarVariants = variants(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full glass font-medium text-foreground select-none shadow-raised",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Image source. The fallback is shown while it loads or if it fails. */
  src?: string;
  /** Alternative text for the image, usually the person's name. */
  alt: string;
  /** Shown when there is no image, usually initials. */
  fallback?: string;
  className?: string;
}

export function Avatar({ src, alt, fallback, size, className }: AvatarProps) {
  return (
    <BaseAvatar.Root className={cn(avatarVariants({ size }), className)}>
      {src ? <BaseAvatar.Image src={src} alt={alt} className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback
        delay={src ? 400 : 0}
        className="flex size-full items-center justify-center"
      >
        {fallback ?? initials(alt)}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/** Overlaps a row of avatars. */
export function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn("flex items-center -space-x-2.5 [&>*]:ring-2 [&>*]:ring-surface", className)}
      {...props}
    />
  );
}

export { avatarVariants };
