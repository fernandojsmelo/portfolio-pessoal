// Rota temporária de QA visual (Fase 1 do PLANO_IMPLEMENTACAO.md).
// Remover antes do deploy final (Fase 7).

const colors = [
  { name: "ink", cls: "bg-ink", token: "#15130f" },
  { name: "surface", cls: "bg-surface", token: "#201d18" },
  { name: "surface-2", cls: "bg-surface-2", token: "#2a2520" },
  { name: "line", cls: "bg-line", token: "#3a352c" },
  { name: "paper", cls: "bg-paper", token: "#f3ede1" },
  { name: "muted", cls: "bg-muted", token: "#a69c8a" },
  { name: "signal", cls: "bg-signal", token: "#ff5c1a" },
  { name: "signal-dim", cls: "bg-signal-dim", token: "#c94716" },
];

export default function DesignTokensPage() {
  return (
    <main className="min-h-screen px-5 py-12 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-paper">
        Tokens de design — QA visual
      </h1>
      <p className="mt-2 font-mono text-sm text-muted">
        §00 — rota temporária, remover antes do deploy final
      </p>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal">
          Cores
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colors.map((c) => (
            <div key={c.name} className="border border-line">
              <div className={`h-20 ${c.cls}`} />
              <div className="p-2 font-mono text-xs text-paper">
                {c.name}
                <div className="text-muted">{c.token}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal">
          Tipografia
        </h2>
        <p className="mt-4 font-display text-3xl font-semibold text-paper">
          Fraunces — display / headlines
        </p>
        <p className="font-display text-3xl italic text-signal">
          Fraunces itálico — ênfase
        </p>
        <p className="mt-4 max-w-prose font-body text-base text-paper">
          IBM Plex Sans — corpo de texto. Engenheiro de software com foco em
          ferramentas de linha de comando, integrações de API e
          infraestrutura que outros times dependem sem perceber.
        </p>
        <p className="mt-4 font-mono text-sm text-muted">
          IBM Plex Mono — badges, metadados, numeração · ★ 142 · TypeScript
        </p>
      </section>
    </main>
  );
}
