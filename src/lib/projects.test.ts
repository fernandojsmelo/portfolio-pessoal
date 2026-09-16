import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getAllCuratedProjects,
  getAllProjects,
  parseProjectMarkdown,
} from "./projects";

const FIXTURES_DIR = path.join(__dirname, "__fixtures__/projects");

describe("parseProjectMarkdown", () => {
  it("extrai o front-matter e converte o corpo para HTML", () => {
    const raw = `---
slug: "exemplo"
title: "Projeto Exemplo"
repo: "fernandojsmelo/exemplo"
tagline: "Um projeto de exemplo"
techStack: ["TypeScript", "Next.js"]
featured: true
order: 1
---

## O problema

Texto do case.
`;

    const project = parseProjectMarkdown(raw, "exemplo.md");

    expect(project.slug).toBe("exemplo");
    expect(project.title).toBe("Projeto Exemplo");
    expect(project.techStack).toEqual(["TypeScript", "Next.js"]);
    expect(project.featured).toBe(true);
    expect(project.order).toBe(1);
    expect(project.contentHtml).toContain("<h2>O problema</h2>");
  });

  it("lança um erro claro quando falta um campo obrigatório", () => {
    const raw = `---
title: "Sem slug"
---
corpo
`;

    expect(() => parseProjectMarkdown(raw, "invalido.md")).toThrow(/slug/);
  });
});

describe("getAllCuratedProjects", () => {
  it("lê e ordena os projetos curados de um diretório pelo campo 'order'", () => {
    const projects = getAllCuratedProjects(FIXTURES_DIR);

    // exemplo-b.md tem order:1 e exemplo-a.md tem order:2 — a ordenação
    // deve seguir o front-matter, não a ordem alfabética dos arquivos.
    expect(projects.map((p) => p.slug)).toEqual(["exemplo-b", "exemplo-a"]);
  });

  it("retorna um array vazio se o diretório não existir", () => {
    const projects = getAllCuratedProjects(
      path.join(__dirname, "__fixtures__/nao-existe"),
    );

    expect(projects).toEqual([]);
  });
});

describe("getAllProjects", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("combina os dados curados com os metadados do GitHub", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          stargazers_count: 10,
          language: "TypeScript",
          pushed_at: "2026-09-01T00:00:00Z",
          open_issues_count: 0,
        }),
      }),
    );

    const projects = await getAllProjects(FIXTURES_DIR);

    expect(projects).toHaveLength(2);
    expect(projects[0].github).toEqual({
      stars: 10,
      primaryLanguage: "TypeScript",
      lastUpdated: "2026-09-01T00:00:00Z",
      openIssues: 0,
    });
  });

  it("degrada graciosamente quando a API do GitHub falha para um projeto", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const projects = await getAllProjects(FIXTURES_DIR);

    expect(projects).toHaveLength(2);
    for (const project of projects) {
      expect(project.github).toBeNull();
      // os dados curados continuam presentes mesmo sem os da API
      expect(project.title).toBeTruthy();
    }
  });
});
