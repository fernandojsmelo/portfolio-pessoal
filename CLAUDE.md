# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Estado do projeto

Este repositório ainda não foi scaffolded — não há `package.json` nem
código-fonte. O que existe hoje:

- `PRD.md` — requisitos completos e aprovados (arquitetura, modelo de
  dados, escopo, critérios de sucesso). Leia-o antes de qualquer trabalho
  de implementação; este arquivo resume apenas o que orienta decisões de
  código do dia a dia.
- Mockup de direção visual aprovado (Artifact):
  https://claude.ai/artifact/KpN7xX83i3ijKvUTafMmKR

## Comandos esperados (após o scaffold inicial com `create-next-app`)

- `npm run dev` — servidor de desenvolvimento local.
- `npm run build` — build de produção (SSG + ISR); é este comando que
  dispara as chamadas à API do GitHub em build-time.
- `npm run lint` — lint padrão do Next.js/TypeScript.

Variável de ambiente obrigatória para o build: `GITHUB_TOKEN` (Personal
Access Token do GitHub, usado para elevar o rate limit da API de 60 para
5.000 req/h — ver PRD.md seção 8).

## Arquitetura

- **Stack:** Next.js (App Router) + TypeScript, hospedado na Vercel.
  Renderização estática (SSG) com ISR revalidando a cada 24h. Sem
  backend próprio, sem banco de dados.
- **Modelo de dados híbrido:** cada projeto é curado manualmente como
  Markdown + front-matter em `content/projects/{slug}.md` (schema
  completo no PRD.md seção 5: `slug`, `title`, `repo`, `tagline`,
  `techStack`, `featured`, `order`, `screenshot`, `liveUrl`; o corpo
  Markdown é o case técnico). Em build-time, cada entrada é enriquecida
  com dados vindos da API do GitHub (`stars`, `primaryLanguage`,
  `lastUpdated`, `openIssues`) via `api.github.com/repos/{repo}`. Nenhuma
  chamada à API do GitHub acontece no navegador do visitante.
- **Páginas:** `/` (home única: hero, projetos em destaque, sobre,
  contato) e `/projetos/[slug]` (detalhe do projeto). Nenhuma outra rota
  no MVP.
- **Degradação de erro:** se a API do GitHub falhar ou o repo referenciado
  não existir mais, o build não deve quebrar — a entrada usa apenas os
  dados curados (sem stars/linguagem) e loga um aviso.

## Direção de design (aprovada)

Conceito: home tratada como um dossiê/datasheet técnico — numeração de
seção real (§01, §02...), cards de projeto como fichas técnicas com
índice de spec, sem cantos arredondados (hairlines, não sombras).

- **Cores:** ink `#15130f` (fundo), surface `#201d18` (cards), line
  `#3a352c` (hairlines), paper `#f3ede1` (texto principal), muted
  `#a69c8a` (texto secundário), signal `#ff5c1a` (acento único).
- **Tipografia:** Fraunces (display/headlines) + IBM Plex Sans (corpo) +
  IBM Plex Mono (badges, metadados, numeração de seção) — via Google
  Fonts.
- **Tema:** dark único, sem alternância light/dark (decisão de escopo do
  PRD, não pendência).
