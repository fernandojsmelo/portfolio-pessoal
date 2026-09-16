export interface CuratedProject {
  slug: string;
  title: string;
  /** "owner/repo" no GitHub, ex: "fernandojsmelo/ctx-pipeline" */
  repo: string;
  tagline: string;
  techStack: string[];
  featured: boolean;
  order: number;
  screenshot?: string;
  liveUrl?: string;
  /** Corpo do Markdown já renderizado para HTML. */
  contentHtml: string;
}

export interface GithubMetadata {
  stars: number;
  primaryLanguage: string | null;
  /** ISO 8601, data do último push no repositório. */
  lastUpdated: string;
  openIssues: number;
}

export interface Project extends CuratedProject {
  /** null quando a API do GitHub falhou ou não pôde ser consultada. */
  github: GithubMetadata | null;
}
