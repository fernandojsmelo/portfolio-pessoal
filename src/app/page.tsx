import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SpecRow } from "@/components/SpecRow";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default async function Home() {
  const projects = await getAllProjects();
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="mx-auto max-w-[1180px] px-5 md:px-10">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-[56px_1fr]">
        <aside
          aria-hidden="true"
          className="hidden md:sticky md:top-0 md:flex md:h-fit md:flex-col md:gap-13 md:pt-16"
        >
          <span className="font-mono text-xs tracking-[0.14em] text-line [writing-mode:vertical-rl]">
            §01 SOBRE
          </span>
          <span className="font-mono text-xs tracking-[0.14em] text-line [writing-mode:vertical-rl]">
            §02 PROJETOS
          </span>
          <span className="font-mono text-xs tracking-[0.14em] text-line [writing-mode:vertical-rl]">
            §03 CONTATO
          </span>
        </aside>

        <main id="topo" className="min-w-0 pt-14 pb-10">
          <section className="pt-2">
            <SectionEyebrow>Dossiê Nº 001 / Perfil</SectionEyebrow>
            <h1 className="max-w-[14ch] text-[clamp(2.1rem,5.4vw,4rem)] leading-[1.05] font-semibold tracking-tight text-balance text-paper">
              {siteConfig.name} constrói sistemas que{" "}
              <em className="font-medium text-signal italic">sobrevivem</em> à produção.
            </h1>
            <p className="mt-5.5 max-w-[52ch] text-lg text-paper/85">
              Engenheiro de software com foco em ferramentas de linha de comando,
              integrações de API e infraestrutura que outros times dependem sem
              perceber.
            </p>
            <p className="mt-8 flex flex-wrap gap-4.5 font-mono text-sm text-muted">
              <span>
                <b className="font-medium text-paper">Base:</b> Brasil
              </span>
              <span>
                <b className="font-medium text-paper">Stack:</b> TypeScript · Node ·
                Python
              </span>
              <span>
                <b className="font-medium text-paper">GitHub:</b> @{siteConfig.githubUser}
              </span>
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="#projetos"
                className="bg-signal px-5 py-3 font-mono text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-paper"
              >
                Ver projetos →
              </a>
              <a
                href="#contato"
                className="border border-line px-5 py-3 font-mono text-sm tracking-wide text-paper transition-colors hover:border-signal hover:text-signal"
              >
                Falar comigo
              </a>
            </div>
          </section>

          <section id="sobre" className="mt-22 scroll-mt-8">
            <SectionEyebrow>§01 — Sobre</SectionEyebrow>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-[1.1fr_0.9fr]">
              <p className="max-w-[60ch] text-paper/90">
                Trabalho na fronteira entre ferramentas de desenvolvedor e sistemas
                de produção — o tipo de código que precisa funcionar às 3h da manhã
                sem ninguém de plantão. Prefiro projetos onde a decisão técnica
                importa mais do que a quantidade de features.
              </p>
              <dl className="border-t border-line font-mono text-sm">
                <SpecRow k="Foco atual" v="Infra & DX" />
                <SpecRow k="Projetos públicos" v={String(projects.length)} />
                <SpecRow k="Linguagem principal" v="TypeScript" />
                <SpecRow k="Disponibilidade" v="Aberto a propostas" />
              </dl>
            </div>
          </section>

          <section id="projetos" className="mt-22 scroll-mt-8">
            <SectionEyebrow>§02 — Projetos em destaque</SectionEyebrow>
            {featured.length > 0 ? (
              <div className="grid gap-px border border-line bg-line [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
                {featured.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            ) : (
              <p className="border border-line p-6 font-mono text-sm text-muted">
                Nenhum projeto publicado ainda — em curadoria.
              </p>
            )}
          </section>

          <section id="contato" className="mt-22 mb-10 scroll-mt-8">
            <SectionEyebrow>§03 — Contato</SectionEyebrow>
            <div className="flex flex-col gap-6 border border-line p-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="max-w-[16ch] font-display text-2xl font-semibold text-balance text-paper">
                Interessado em conversar sobre um projeto?
              </h2>
              <div className="flex flex-col gap-2.5 font-mono text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-paper transition-colors hover:text-signal"
                >
                  → E-mail
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper transition-colors hover:text-signal"
                >
                  → GitHub <span className="text-muted">@{siteConfig.githubUser}</span>
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper transition-colors hover:text-signal"
                >
                  → LinkedIn
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
