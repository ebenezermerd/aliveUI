import type { RenderLink } from "@aliveui/auth/ui";
import Link from "next/link";

/** Hands Next.js client side navigation to the feature blocks. */
export const renderLink: RenderLink = ({ href, className, children }) => (
  <Link href={href} className={className}>
    {children}
  </Link>
);
