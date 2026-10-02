import type { ReactNode } from "react";

interface ShowcaseSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/** One titled group of components on a showcase page. */
export function ShowcaseSection({ id, title, description, children }: ShowcaseSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="text-sm opacity-70">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** A labelled cell inside a section, for one component and its variants. */
export function Demo({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-3 text-xs font-medium tracking-wide uppercase opacity-55">{label}</p>
      {children}
    </div>
  );
}
