import Link from "next/link";
import { formatRelativeDate } from "@/lib/format";
import type { Project } from "@/lib/types";
import { TechBadge } from "./TechBadge";

/** Ficha técnica de um projeto, usada no grid da home. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const specNo = String(index + 1).padStart(2, "0");

  return (
    <article className="flex flex-col gap-3.5 bg-surface p-6 transition-colors hover:bg-surface-2">
      <div className="flex items-baseline justify-between gap-2.5">
        <h3 className="font-display text-xl font-semibold tracking-tight text-paper">
          {project.title}
        </h3>
        <span className="font-mono text-[0.7rem] tracking-wide text-signal">
          SPEC. {specNo}
        </span>
      </div>

      <p className="max-w-[42ch] text-sm text-muted">{project.tagline}</p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-line pt-3.5 font-mono text-xs text-muted tabular-nums">
        <span>
          {project.github
            ? `★ ${project.github.stars} · atualizado ${formatRelativeDate(project.github.lastUpdated)}`
            : null}
        </span>
        <Link
          href={`https://github.com/${project.repo}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-signal hover:underline"
        >
          Repositório →
        </Link>
      </div>
    </article>
  );
}
