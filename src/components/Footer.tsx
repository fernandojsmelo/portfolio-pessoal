export function Footer() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <footer className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line py-5.5 pb-10 font-mono text-[0.7rem] tracking-wide text-muted">
      <span>REV. {today}</span>
      <span>FERNANDO MELO — PORTFÓLIO PESSOAL</span>
    </footer>
  );
}
