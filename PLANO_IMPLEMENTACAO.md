# Plano de Implementação — Portfólio Pessoal

**Baseado em:** `PRD.md` (requisitos aprovados) e no mockup de direção
visual aprovado (`CLAUDE.md` tem o resumo dos tokens de design).

As fases abaixo são sequenciais — cada uma depende da anterior estar
funcional. Dentro de cada fase, os itens podem ser feitos em qualquer
ordem.

---

## Fase 0 — Scaffold do projeto

- [ ] `npx create-next-app@latest` com TypeScript, App Router, ESLint,
      Tailwind CSS habilitados.
- [ ] Inicializar repositório git (`git init`) e criar primeiro commit
      com o scaffold + `PRD.md` + `CLAUDE.md`.
- [ ] Criar `.env.local.example` documentando `GITHUB_TOKEN` (sem valor
      real, apenas o placeholder da variável).
- [ ] Configurar `.gitignore` padrão do Next.js (já vem no scaffold) e
      confirmar que `.env.local` está ignorado.

**Critério de pronto:** `npm run dev` sobe uma página em branco sem erros.

---

## Fase 1 — Design tokens e fontes

- [ ] Adicionar o import do Google Fonts (Fraunces + IBM Plex Sans + IBM
      Plex Mono) — via `next/font/google` (preferível a `<link>` manual,
      evita layout shift).
- [ ] Criar os tokens de cor como CSS variables em `globals.css`:
      `--ink #15130f`, `--surface #201d18`, `--surface-2 #2a2520`,
      `--line #3a352c`, `--paper #f3ede1`, `--muted #a69c8a`,
      `--signal #ff5c1a`.
- [ ] Configurar `tailwind.config.ts` para expor essas cores e as três
      famílias de fonte como tokens do Tailwind (`colors`, `fontFamily`),
      em vez de usar os hex/nomes soltos pelo código.
- [ ] Tema único dark — sem lógica de light/dark mode.

**Critério de pronto:** uma página de teste renderiza texto nas três
fontes e nas cores corretas.

---

## Fase 2 — Modelo de dados dos projetos

- [ ] Definir o tipo `Project` em TypeScript (campos do front-matter do
      PRD.md seção 5: `slug`, `title`, `repo`, `tagline`, `techStack`,
      `featured`, `order`, `screenshot?`, `liveUrl?`, mais o corpo
      Markdown).
- [ ] Escrever o parser de `content/projects/*.md` (front-matter +
      corpo) usando `gray-matter` + um renderer Markdown (`remark`/
      `next-mdx-remote`, o que já vier disponível no scaffold).
- [ ] Escrever a função `getGithubMetadata(repo: string)` que chama
      `api.github.com/repos/{repo}` com o header `Authorization` usando
      `GITHUB_TOKEN`, retornando `{ stars, primaryLanguage, lastUpdated,
      openIssues }`.
- [ ] Implementar a degradação graciosa: se a chamada à API falhar (rede,
      404, rate limit), logar um aviso no build e retornar `null` para os
      campos de metadados — o card deve renderizar só com os dados
      curados, sem quebrar o build.
- [ ] Função `getAllProjects()` que combina front-matter + metadados da
      API, ordenada por `order`.
- [ ] Testes unitários da função de combinação de dados (front-matter +
      resposta mockada da API), cobrindo o caso de sucesso e o caso de
      falha da API (Fase 9 do PRD).

**Critério de pronto:** `getAllProjects()` roda localmente (com um
`GITHUB_TOKEN` de teste) e retorna os dados combinados corretamente; o
teste unitário do caso de falha passa sem chamar a API de verdade.

---

## Fase 3 — Componentes de UI (design system da home)

Implementar os componentes reutilizáveis primeiro, isolados, antes de
montar as páginas:

- [ ] `Header` — wordmark + nav com âncoras `§01/§02/§03`.
- [ ] `Footer` — linha de rodapé (revisão/data).
- [ ] `TechBadge` — badge mono, borda hairline, sem preenchimento.
- [ ] `ProjectCard` — ficha técnica: índice `SPEC. NN`, título (Fraunces),
      tagline, badges de stack, rodapé com stars/linguagem/atualização
      (tabular-nums) e link pro repositório.
- [ ] `SectionEyebrow` — o rótulo `§0N — Nome da seção` com o traço
      antes do texto, reutilizado em todas as seções.

Seguir fielmente o mockup aprovado: cantos retos (sem `rounded-*`),
hairlines como separador (não sombras), acento laranja-sinal usado com
moderação (links, índices, hover).

**Critério de pronto:** cada componente renderiza corretamente isolado
(ex: numa página de storybook simples ou rota de teste `/dev/components`
temporária, removida antes do deploy final).

---

## Fase 4 — Página Home (`/`)

- [ ] Seção Hero: headline (Fraunces, `clamp()` responsivo), lede,
      meta-line (stack/base/GitHub), CTAs.
- [ ] Seção `§01 Sobre`: bio + spec-list (fatos rápidos em formato
      label/valor).
- [ ] Seção `§02 Projetos`: grid de `ProjectCard` a partir de
      `getAllProjects()` filtrado por `featured: true`, ordenado por
      `order`.
- [ ] Seção `§03 Contato`: bloco com e-mail, GitHub, LinkedIn.
- [ ] Rail de índice lateral (sticky, oculto abaixo de ~760px conforme o
      mockup).
- [ ] Testar responsividade em ~400px: grid de projetos colapsa para 1
      coluna, rail lateral some, gutters laterais mantidos.

**Critério de pronto:** home real, com pelo menos 2-3 projetos de
conteúdo real (ver Fase 6), navegável por âncoras, responsiva.

---

## Fase 5 — Página de detalhe (`/projetos/[slug]`)

- [ ] `generateStaticParams` a partir de `getAllProjects()`.
- [ ] Layout: título, tagline, badges de stack, metadados (stars/
      linguagem/atualizado), screenshot (se existir), corpo Markdown
      renderizado, links para repositório e deploy ao vivo (se houver).
- [ ] `revalidate = 86400` (24h) na rota, conforme ISR definido no PRD.
- [ ] 404 padrão do Next.js para slugs inexistentes.

**Critério de pronto:** cada projeto curado tem uma página de detalhe
acessível a partir do card na home.

---

## Fase 6 — Conteúdo real

- [ ] Selecionar os 6 a 10 projetos mais significativos tecnicamente do
      GitHub (`github.com/fernandojsmelo`).
- [ ] Escrever um arquivo `content/projects/{slug}.md` por projeto,
      preenchendo front-matter + case técnico (problema, decisões
      técnicas) real — sem lorem ipsum.
- [ ] Adicionar screenshots quando fizer sentido (`public/images/
      projetos/`).

**Critério de pronto:** todos os projetos planejados estão publicados
com conteúdo real, não placeholder.

---

## Fase 7 — QA final e deploy

- [ ] Rodar `npm run build` localmente com `GITHUB_TOKEN` real — deve
      completar sem erros (smoke test do PRD seção 9).
- [ ] Checklist manual visual: mobile (~400px) e desktop, nas duas
      páginas.
- [ ] Checar contraste (mínimo WCAG AA) do tema dark, especialmente
      `muted` sobre `surface`.
- [ ] Criar projeto na Vercel, configurar `GITHUB_TOKEN` nas env vars de
      produção, apontar para a branch principal.
- [ ] Configurar domínio (próprio ou padrão da Vercel — decisão em
      aberto no PRD seção 11).
- [ ] Deploy e verificação final em produção.

**Critério de pronto:** site no ar, atendendo aos critérios de sucesso do
PRD.md seção 11.
