import { afterEach, describe, expect, it, vi } from "vitest";
import { getGithubMetadata } from "./github";

describe("getGithubMetadata", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("retorna os metadados quando a API responde com sucesso", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          stargazers_count: 142,
          language: "TypeScript",
          pushed_at: "2026-09-10T12:00:00Z",
          open_issues_count: 3,
        }),
      }),
    );

    const result = await getGithubMetadata("fernandojsmelo/ctx-pipeline");

    expect(result).toEqual({
      stars: 142,
      primaryLanguage: "TypeScript",
      lastUpdated: "2026-09-10T12:00:00Z",
      openIssues: 3,
    });
  });

  it("retorna null sem lançar erro quando a API responde com falha (404/rate limit)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));

    const result = await getGithubMetadata("fernandojsmelo/repo-inexistente");

    expect(result).toBeNull();
  });

  it("retorna null sem lançar erro quando a chamada de rede falha", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const result = await getGithubMetadata("fernandojsmelo/ctx-pipeline");

    expect(result).toBeNull();
  });
});
