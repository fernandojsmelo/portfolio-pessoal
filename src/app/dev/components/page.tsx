// Rota temporária de QA visual (Fase 3 do PLANO_IMPLEMENTACAO.md).
// Remover antes do deploy final (Fase 7).

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TechBadge } from "@/components/TechBadge";
import type { Project } from "@/lib/types";

const exampleProjects: Project[] = [
  {
    slug: "ctx-pipeline",
    title: "ctx-pipeline",
    repo: "fernandojsmelo/ctx-pipeline",
    tagline:
      "Pipeline de observabilidade que reduz custo de indexação de logs sem perder granularidade de busca.",
    techStack: ["TypeScript", "Node", "SQLite"],
    featured: true,
    order: 1,
    contentHtml: "",
    github: {
      stars: 142,
      primaryLanguage: "TypeScript",
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      openIssues: 2,
    },
  },
  {
    slug: "drift-watch",
    title: "drift-watch",
    repo: "fernandojsmelo/drift-watch",
    tagline:
      "CLI que detecta divergência entre estado de infraestrutura declarado e real antes do deploy.",
    techStack: ["Rust", "Terraform"],
    featured: true,
    order: 2,
    contentHtml: "",
    github: null, // exemplo da degradação graciosa quando a API do GitHub falha
  },
];

export default function ComponentsQaPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 pb-16 md:px-10">
      <p className="pt-6 font-mono text-sm text-muted">
        §00 — rota temporária, remover antes do deploy final
      </p>

      <section className="mt-8">
        <SectionEyebrow>Header</SectionEyebrow>
        <Header />
      </section>

      <section className="mt-10">
        <SectionEyebrow>TechBadge</SectionEyebrow>
        <div className="flex flex-wrap gap-2">
          <TechBadge label="TypeScript" />
          <TechBadge label="Rust" />
          <TechBadge label="PostgreSQL" />
        </div>
      </section>

      <section className="mt-10">
        <SectionEyebrow>ProjectCard (grid, incluindo caso sem dados do GitHub)</SectionEyebrow>
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {exampleProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionEyebrow>Footer</SectionEyebrow>
        <Footer />
      </section>
    </main>
  );
}
