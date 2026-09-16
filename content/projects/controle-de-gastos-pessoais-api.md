---
slug: "controle-de-gastos-pessoais-api"
title: "Controle de Gastos Pessoais API"
repo: "fernandojsmelo/controle-de-gastos-pessoais-api"
tagline: "API de controle de gastos pessoais construída com Spec Driven Development — specs, testes e documentação como parte do processo."
techStack: ["Python", "FastAPI", "SQLite"]
featured: true
order: 2
---

## O problema

Registrar e consultar gastos pessoais por categoria e período, com uma
API que possa evoluir com confiança — sem regressões silenciosas a cada
mudança.

## Decisões técnicas

FastAPI + SQLite, desenvolvido com Spec Driven Development: specs
escritas antes da implementação, suíte de testes (`pytest`) cobrindo os
endpoints, e documentação mantida em `docs/`. Um `CLAUDE.md` no próprio
repositório guia sessões futuras de desenvolvimento assistido por IA.
