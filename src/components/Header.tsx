export function Header() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-5.5">
      <a
        href="#topo"
        className="font-mono text-[0.8rem] tracking-[0.14em] text-paper uppercase"
      >
        <b className="font-semibold text-signal">F.</b> MELO — DOSSIÊ TÉCNICO
      </a>
      <nav className="flex gap-5.5 font-mono text-[0.78rem] tracking-[0.06em]">
        <a href="#sobre" className="text-muted transition-colors hover:text-signal">
          §01 SOBRE
        </a>
        <a href="#experiencia" className="text-muted transition-colors hover:text-signal">
          §02 EXPERIÊNCIA
        </a>
        <a href="#projetos" className="text-muted transition-colors hover:text-signal">
          §03 PROJETOS
        </a>
        <a href="#contato" className="text-muted transition-colors hover:text-signal">
          §04 CONTATO
        </a>
      </nav>
    </div>
  );
}
