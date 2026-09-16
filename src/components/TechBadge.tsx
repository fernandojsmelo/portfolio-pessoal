export function TechBadge({ label }: { label: string }) {
  return (
    <span className="border border-line px-2 py-1 font-mono text-[0.68rem] tracking-wide text-paper/85 uppercase">
      {label}
    </span>
  );
}
