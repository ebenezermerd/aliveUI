import type { ReactNode } from "react";

export interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Lets apps render their router's link, such as Next.js `Link`, inside the blocks. */
export type RenderLink = (props: LinkProps) => ReactNode;

export const defaultRenderLink: RenderLink = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export const inlineLink =
  "font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";
