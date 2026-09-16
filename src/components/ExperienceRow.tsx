import type { ExperienceEntry } from "@/lib/experience";

/** Uma entrada de experiência profissional, no estilo ficha técnica. */
export function ExperienceRow({ role, company, period, description }: ExperienceEntry) {
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg font-semibold tracking-tight text-paper">
          {role}
        </h3>
        <span className="font-mono text-xs tracking-wide text-signal uppercase tabular-nums">
          {period}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs tracking-wide text-muted uppercase">{company}</p>
      <p className="mt-2.5 max-w-[60ch] text-sm text-paper/85">{description}</p>
    </div>
  );
}
