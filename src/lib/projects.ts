import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getGithubMetadata } from "./github";
import type { CuratedProject, Project } from "./types";

const DEFAULT_PROJECTS_DIR = path.join(process.cwd(), "content/projects");

const REQUIRED_FIELDS = [
  "slug",
  "title",
  "repo",
  "tagline",
  "techStack",
  "featured",
  "order",
] as const;

/**
 * Faz o parse de um arquivo de projeto (front-matter + corpo Markdown).
 * Função pura — recebe o texto bruto, não toca o sistema de arquivos —
 * para ser testável com fixtures em memória.
 */
export function parseProjectMarkdown(
  raw: string,
  filename: string,
): CuratedProject {
  const { data, content } = matter(raw);

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined) {
      throw new Error(
        `Projeto "${filename}" sem o campo obrigatório "${field}" no front-matter.`,
      );
    }
  }

  const contentHtml = remark().use(remarkHtml).processSync(content).toString();

  return {
    slug: data.slug,
    title: data.title,
    repo: data.repo,
    tagline: data.tagline,
    techStack: data.techStack,
    featured: Boolean(data.featured),
    order: Number(data.order),
    screenshot: data.screenshot,
    liveUrl: data.liveUrl,
    contentHtml,
  };
}

/**
 * Lê todos os projetos curados de um diretório (`content/projects` por
 * padrão), ordenados pelo campo `order` do front-matter.
 */
export function getAllCuratedProjects(
  dir: string = DEFAULT_PROJECTS_DIR,
): CuratedProject[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parseProjectMarkdown(fs.readFileSync(path.join(dir, file), "utf-8"), file))
    .sort((a, b) => a.order - b.order);
}

/** Combina um projeto curado com os metadados ao vivo do GitHub. */
export async function enrichWithGithub(
  project: CuratedProject,
): Promise<Project> {
  const github = await getGithubMetadata(project.repo);
  return { ...project, github };
}

/**
 * Todos os projetos, curados + enriquecidos com dados do GitHub,
 * ordenados por `order`. Usada pela home e por `generateStaticParams`
 * da página de detalhe.
 */
export async function getAllProjects(
  dir: string = DEFAULT_PROJECTS_DIR,
): Promise<Project[]> {
  const curated = getAllCuratedProjects(dir);
  const enriched = await Promise.all(curated.map(enrichWithGithub));
  return enriched.sort((a, b) => a.order - b.order);
}
