import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TechBadge } from "@/components/TechBadge";
import { formatRelativeDate } from "@/lib/format";
import { getCuratedProjectSlugs, getProjectBySlug } from "@/lib/projects";

// Alinhado à revalidação ISR de 24h definida no PRD (seção 4).
export const revalidate = 86400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCuratedProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Fernando Melo`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[860px] px-5 md:px-10">
      <Header />

      <main className="pt-14 pb-16">
        <Link
          href="/#projetos"
          className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-signal"
        >
          ← Voltar aos projetos
        </Link>

        <div className="mt-8">
          <SectionEyebrow>Ficha técnica</SectionEyebrow>
        </div>

        <h1 className="max-w-[20ch] text-balance font-display text-4xl font-semibold tracking-tight text-paper">
          {project.title}
        </h1>
        <p className="mt-3 max-w-[60ch] text-lg text-paper/85">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-4 font-mono text-xs text-muted tabular-nums">
          {project.github ? (
            <>
              <span>★ {project.github.stars}</span>
              {project.github.primaryLanguage ? (
                <span>{project.github.primaryLanguage}</span>
              ) : null}
              <span>atualizado {formatRelativeDate(project.github.lastUpdated)}</span>
              <span>{project.github.openIssues} issues abertas</span>
            </>
          ) : (
            <span>Dados do GitHub indisponíveis no momento.</span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noreferrer"
            className="bg-signal px-5 py-3 font-mono text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-paper"
          >
            Ver repositório →
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-line px-5 py-3 font-mono text-sm tracking-wide text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Ver deploy ao vivo
            </a>
          ) : null}
        </div>

        {project.screenshot ? (
          <div className="relative mt-10 aspect-video w-full border border-line">
            <Image
              src={project.screenshot}
              alt={`Screenshot de ${project.title}`}
              fill
              className="object-cover"
              sizes="(min-width: 860px) 860px, 100vw"
            />
          </div>
        ) : null}

        <article
          className="prose prose-invert mt-10 max-w-[68ch] [--tw-prose-body:var(--color-paper)] [--tw-prose-bold:var(--color-paper)] [--tw-prose-code:var(--color-paper)] [--tw-prose-headings:var(--color-paper)] [--tw-prose-hr:var(--color-line)] [--tw-prose-links:var(--color-signal)] [--tw-prose-quote-borders:var(--color-line)] [--tw-prose-quotes:var(--color-paper)] prose-headings:font-display prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      </main>

      <Footer />
    </div>
  );
}
