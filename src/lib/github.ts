import type { GithubMetadata } from "./types";

/**
 * Busca metadados de um repositório na API do GitHub. Degrada
 * graciosamente: em qualquer falha (rede, rate limit, repo inexistente),
 * loga um aviso e retorna null em vez de lançar — quem chama usa apenas
 * os dados curados nesse caso (PRD.md seção 8).
 */
export async function getGithubMetadata(
  repo: string,
): Promise<GithubMetadata | null> {
  const token = process.env.GITHUB_TOKEN;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // Alinhado à revalidação ISR de 24h definida no PRD (seção 4).
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      console.warn(
        `[github] falha ao buscar metadados de "${repo}": HTTP ${res.status}`,
      );
      return null;
    }

    const data = await res.json();

    return {
      stars: data.stargazers_count,
      primaryLanguage: data.language ?? null,
      lastUpdated: data.pushed_at,
      openIssues: data.open_issues_count,
    };
  } catch (error) {
    console.warn(`[github] falha ao buscar metadados de "${repo}":`, error);
    return null;
  }
}
