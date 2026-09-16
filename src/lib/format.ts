const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * Formata uma data ISO como tempo relativo em pt-BR ("há 3 dias",
 * "há 2 semanas"). `now` é injetável para testes.
 */
export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  const diffDays = Math.round((new Date(iso).getTime() - now.getTime()) / DAY_MS);
  const abs = Math.abs(diffDays);

  if (abs < 7) return rtf.format(diffDays, "day");
  if (abs < 30) return rtf.format(Math.round(diffDays / 7), "week");
  if (abs < 365) return rtf.format(Math.round(diffDays / 30), "month");
  return rtf.format(Math.round(diffDays / 365), "year");
}
