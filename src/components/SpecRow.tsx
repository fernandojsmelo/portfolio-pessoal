export function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3">
      <dt className="tracking-wide text-muted uppercase">{k}</dt>
      <dd className="text-right text-paper tabular-nums">{v}</dd>
    </div>
  );
}
