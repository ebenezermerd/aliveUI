import { cn } from "@aliveui/primitives";
import type { HTMLAttributes, Ref } from "react";
import { GlassSurface, type GlassSurfaceProps } from "../glass-surface/glass-surface.js";

export type CardProps = GlassSurfaceProps;

/** A glass surface laid out for content, with optional header, content and footer slots. */
export function Card({ className, padding = "none", ...props }: CardProps) {
  return (
    <GlassSurface
      padding={padding}
      className={cn("flex flex-col gap-5 p-6", className)}
      {...props}
    />
  );
}

interface SlotProps<T> extends HTMLAttributes<T> {
  ref?: Ref<T>;
}

export function CardHeader({ className, ...props }: SlotProps<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: SlotProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg leading-tight font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: SlotProps<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: SlotProps<HTMLDivElement>) {
  return <div className={cn("text-sm", className)} {...props} />;
}

export function CardFooter({ className, ...props }: SlotProps<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3", className)} {...props} />;
}
