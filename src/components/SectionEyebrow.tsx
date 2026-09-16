import type { ReactNode } from "react";

/** Rótulo "§0N — Nome da seção" usado no topo de cada seção da home. */
export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3.5 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-signal uppercase">
      <span aria-hidden="true" className="inline-block h-px w-[22px] bg-signal" />
      {children}
    </p>
  );
}
