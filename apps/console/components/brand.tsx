export function BrandMark({ className = "size-8" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`${className} block shrink-0 rounded-xl bg-[conic-gradient(from_200deg,#f0abfc,#7dd3fc,#fde68a,#f0abfc)] shadow-raised`}
    />
  );
}

export function Brand() {
  return (
    <span className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
      <BrandMark />
      AliveUI Console
    </span>
  );
}
