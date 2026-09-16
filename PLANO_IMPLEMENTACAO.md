# Plano de Implementação — Portfólio Pessoal

**Baseado em:** `PRD.md` (requisitos aprovados) e no mockup de direção
visual aprovado (`CLAUDE.md` tem o resumo dos tokens de design).

As fases abaixo são sequenciais — cada uma depende da anterior estar
funcional. Dentro de cada fase, os itens podem ser feitos em qualquer
ordem.

---

## Fase 0 — Scaffold do projeto ✅

- [x] `npx create-next-app@latest` com TypeScript, App Router, ESLint,
      Tailwind CSS habilitados.
- [x] Inicializar repositório git (`git init`) e criar primeiro commit
      com o scaffold + `PRD.md` + `CLAUDE.md`.
- [x] Criar `.env.local.example` documentando `GITHUB_TOKEN` (sem valor
      real, apenas o placeholder da variável).
- [x] Configurar `.gitignore` padrão do Next.js (já vem no scaffold) e
      confirmar que `.env.local` está ignorado.

**Critério de pronto:** `npm run dev` sobe uma página em branco sem erros.

---

## Fase 1 — Design tokens e fontes ✅

- [x] Adicionar o import do Google Fonts (Fraunces + IBM Plex Sans + IBM
      Plex Mono) — via `next/font/google` (preferível a `<link>` manual,
      evita layout shift).
- [x] Criar os tokens de cor como CSS variables em `globals.css`:
      `--ink #15130f`, `--surface #201d18`, `--surface-2 #2a2520`,
      `--line #3a352c`, `--paper #f3ede1`, `--muted #a69c8a`,
      `--signal #ff5c1a`.
- [x] Expor essas cores e as três famílias de fonte como tokens do
      Tailwind — via `@theme`/`@theme inline` em `globals.css` (Tailwind
      v4 é CSS-first; não há `tailwind.config.ts` a configurar).
- [x] Tema único dark — sem lógica de light/dark mode.

**Critério de pronto:** uma página de teste renderiza texto nas três
fontes e nas cores corretas.

---

## Fase 2 — Modelo de dados dos projetos ✅

- [x] Definir o tipo `Project` em TypeScript (campos do front-matter do
      PRD.md seção 5: `slug`, `title`, `repo`, `tagline`, `techStack`,
      `featured`, `order`, `screenshot?`, `liveUrl?`, mais o corpo
      Markdown).
- [x] Escrever o parser de `content/projects/*.md` (front-matter +
      corpo) usando `gray-matter` + um renderer Markdown (`remark`/
      `next-mdx-remote`, o que já vier disponível no scaffold).
- [x] Escrever a função `getGithubMetadata(repo: string)` que chama
      `api.github.com/repos/{repo}` com o header `Authorization` usando
      `GITHUB_TOKEN`, retornando `{ stars, primaryLanguage, lastUpdated,
      openIssues }`.
- [x] Implementar a degradação graciosa: se a chamada à API falhar (rede,
      404, rate limit), logar um aviso no build e retornar `null` para os
      campos de metadados — o card deve renderizar só com os dados
      curados, sem quebrar o build.
- [x] Função `getAllProjects()` que combina front-matter + metadados da
      API, ordenada por `order`.
- [x] Testes unitários da função de combinação de dados (front-matter +
      resposta mockada da API), cobrindo o caso de sucesso e o caso de
      falha da API (Fase 9 do PRD).

**Critério de pronto:** `getAllProjects()` roda localmente (com um
`GITHUB_TOKEN` de teste) e retorna os dados combinados corretamente; o
teste unitário do caso de falha passa sem chamar a API de verdade.

---

## Fase 3 — Componentes de UI (design system da home) ✅

Implementar os componentes reutilizáveis primeiro, isolados, antes de
montar as páginas:

- [x] `Header` — wordmark + nav com âncoras `§01/§02/§03`.
- [x] `Footer` — linha de rodapé (revisão/data).
- [x] `TechBadge` — badge mono, borda hairline, sem preenchimento.
- [x] `ProjectCard` — ficha técnica: índice `SPEC. NN`, título (Fraunces),
      tagline, badges de stack, rodapé com stars/linguagem/atualização
      (tabular-nums) e link pro repositório.
- [x] `SectionEyebrow` — o rótulo `§0N — Nome da seção` com o traço
      antes do texto, reutilizado em todas as seções.

Seguir fielmente o mockup aprovado: cantos retos (sem `rounded-*`),
hairlines como separador (não sombras), acento laranja-sinal usado com
moderação (links, índices, hover).

**Critério de pronto:** cada componente renderiza corretamente isolado
(ex: numa página de storybook simples ou rota de teste `/dev/components`
temporária, removida antes do deploy final).

---

## Fase 4 — Página Home (`/`) ✅

- [x] Seção Hero: headline (Fraunces, `clamp()` responsivo), lede,
      meta-line (stack/base/GitHub), CTAs.
- [x] Seção `§01 Sobre`: bio + spec-list (fatos rápidos em formato
      label/valor).
- [x] Seção `§02 Projetos`: grid de `ProjectCard` a partir de
      `getAllProjects()` filtrado por `featured: true`, ordenado por
      `order`.
- [x] Seção `§03 Contato`: bloco com e-mail, GitHub, LinkedIn.
- [x] Rail de índice lateral (sticky, oculto abaixo de `md`).
- [x] Testar responsividade em ~400px: grid de projetos colapsa para 1
      coluna, rail lateral some, gutters laterais mantidos.

**Critério de pronto:** home real, com pelo menos 2-3 projetos de
conteúdo real (ver Fase 6), navegável por âncoras, responsiva.

---

## Fase 5 — Página de detalhe (`/projetos/[slug]`) ✅

- [x] `generateStaticParams` a partir de `getAllProjects()`.
- [x] Layout: título, tagline, badges de stack, metadados (stars/
      linguagem/atualizado), screenshot (se existir), corpo Markdown
      renderizado, links para repositório e deploy ao vivo (se houver).
- [x] `revalidate = 86400` (24h) na rota, conforme ISR definido no PRD.
- [x] 404 padrão do Next.js para slugs inexistentes.

**Critério de pronto:** cada projeto curado tem uma página de detalhe
acessível a partir do card na home.

---

## Fase 6 — Conteúdo real ✅

- [x] Selecionar os projetos mais significativos tecnicamente do GitHub
      (`github.com/fernandojsmelo`) — 5 projetos, não 6-10: a maioria dos
      ~40 repositórios públicos era material de curso/tutorial; preferi
      curadoria honesta a forçar exercícios como "significativos".
- [x] Escrever um arquivo `content/projects/{slug}.md` por projeto,
      preenchendo front-matter + case técnico (problema, decisões
      técnicas) real — sem lorem ipsum.
- [ ] Adicionar screenshots quando fizer sentido (`public/images/
      projetos/`) — não aplicado; nenhum dos 5 projetos tinha screenshot
      pronto para reaproveitar. Pode ser feito depois, por projeto.

**Critério de pronto:** todos os projetos planejados estão publicados
com conteúdo real, não placeholder.

---

## Fase 7 — QA final e deploy ✅ (com uma pendência)

- [x] Rodar `npm run build` localmente com `GITHUB_TOKEN` real — deve
      completar sem erros (smoke test do PRD seção 9).
- [x] Checklist manual visual: mobile (~400px) e desktop, nas duas
      páginas.
- [x] Checar contraste (mínimo WCAG AA) do tema dark — todos os pares de
      cor acima de 4.5:1 (calculado, ver commit da limpeza final).
- [x] Criar projeto na Vercel (`fernando-melo1/portfolio-pessoal`),
      configurar `GITHUB_TOKEN` (fine-grained PAT, read-only público) nas
      env vars de produção.
- [x] Domínio: padrão da Vercel por enquanto (decisão do usuário) —
      https://portfolio-pessoal-six-sigma.vercel.app
- [x] Deploy e verificação final em produção — build limpo, dados reais
      do GitHub carregando corretamente para os 5 projetos.
- [ ] **Pendente:** conectar o repositório GitHub ao projeto na Vercel
      para deploy automático a cada push (`vercel git connect` falhou —
      precisa autorizar o GitHub App da Vercel pelo dashboard:
      Project → Settings → Git → Connect Git Repository). Até lá, deploy
      é manual via `vercel --prod`.

**Critério de pronto:** site no ar, atendendo aos critérios de sucesso do
PRD.md seção 11.
