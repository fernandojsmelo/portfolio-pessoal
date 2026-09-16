---
slug: "the-games-awards"
title: "The Game Awards Explorer"
repo: "fernandojsmelo/the-games-awards"
tagline: "Explorador do histórico de indicações e vencedores do The Game Awards, com filtros combinados e gráficos agregados."
techStack: ["TypeScript", "Next.js", "SQLite"]
featured: true
order: 1
---

## O problema

Encontrar rapidamente quem foi indicado ou venceu uma categoria
específica do The Game Awards ao longo dos anos, sem depender de listas
soltas espalhadas em páginas diferentes.

## Decisões técnicas

Next.js (App Router) full-stack em TypeScript, com os dados do CSV
oficial importados para SQLite via `better-sqlite3` — evita depender de
um banco externo para um dataset que cabe inteiro em um arquivo. A
interface usa Tailwind CSS e Recharts para os gráficos agregados. Escopo
e fases de implementação foram definidos antes do código, em `PRD.md` e
`plan.md`.
