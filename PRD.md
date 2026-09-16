# PRD — Site Portfólio Pessoal

**Data:** 2026-09-16
**Autor:** Fernando Melo
**Status:** Aprovado (pronto para plano de implementação)

## 1. Visão Geral

Site pessoal para divulgar os projetos tecnicamente mais significativos do
GitHub de Fernando (`github.com/fernandojsmelo`), funcionando como marca
pessoal geral — voltado a um público amplo (recrutadores, clientes,
comunidade técnica), combinando vitrine de projetos com uma apresentação
pessoal/profissional.

## 2. Objetivo e Público

- **Objetivo:** construir marca pessoal geral, mostrando projetos de forma
  curada e com profundidade técnica suficiente para transmitir
  credibilidade.
- **Público:** amplo — recrutadores, potenciais clientes, outros
  desenvolvedores.

## 3. Escopo

**No escopo (MVP):**
- Home de página única com: hero, grid de projetos em destaque, seção
  "Sobre mim" resumida, seção/links de contato.
- Página de detalhe por projeto (`/projetos/[slug]`), com case técnico
  (problema, decisões técnicas) e metadados ao vivo do GitHub.
- 6 a 10 projetos curados manualmente.

**Fora de escopo (ver seção 9).**

## 4. Arquitetura e Stack

- **Framework:** Next.js (App Router), TypeScript.
- **Renderização:** SSG (Static Site Generation) em build-time, com ISR
  (Incremental Static Regeneration) revalidando a cada 24h para manter os
  metadados do GitHub razoavelmente atualizados sem exigir redeploy manual.
- **Hospedagem:** Vercel, com deploy automático a cada push na branch
  principal.
- **Estilização:** a definir na etapa de design visual da implementação
  (ver seção 7) — candidato natural: Tailwind CSS.
- **Sem backend próprio, sem banco de dados** — site inteiramente estático.

### 4.1 Fonte dos dados dos projetos (modelo híbrido)

Combinação de curadoria manual + enriquecimento automático via API do
GitHub, resolvida em build-time (Abordagem aprovada: build-time fetch +
ISR):

- Lista de projetos e conteúdo do case são **curados manualmente**.
- Metadados dinâmicos (stars, linguagem principal, data do último commit,
  issues abertas) são **buscados da API do GitHub** (`api.github.com`) no
  momento do build e a cada revalidação ISR.
- Nenhuma chamada à API do GitHub acontece no navegador do visitante —
  tudo já vem pré-renderizado.

## 5. Modelo de Dados

Cada projeto curado vive como um arquivo Markdown com front-matter em
`content/projects/{slug}.md`. O corpo do Markdown é o case/detalhe exibido
na página do projeto.

```yaml
---
slug: "nome-do-projeto"        # usado na URL /projetos/nome-do-projeto
title: "Nome de Exibição"
repo: "fernandojsmelo/nome-do-repo"   # owner/repo no GitHub
tagline: "Frase curta de uma linha"
techStack: ["TypeScript", "Next.js", "PostgreSQL"]
featured: true                  # controla exibição na home
order: 1                        # ordem de exibição manual
screenshot: "/images/projetos/nome.png"   # opcional
liveUrl: "https://..."          # opcional, se houver deploy público
---

## O problema
...

## Decisões técnicas
...
```

Em build-time, cada entrada é enriquecida com dados vindos da API do
GitHub (`stars`, `primaryLanguage`, `lastUpdated`, `openIssues`). O objeto
combinado (curado + API) alimenta tanto o card da home quanto a página de
detalhe.

## 6. Estrutura de Páginas e Componentes

### Páginas
- **`/` (Home):** hero curto (nome, headline, posicionamento), grid de
  projetos com `featured: true` (ordenados por `order`), seção "Sobre mim"
  resumida, seção/links de Contato — tudo em página única, navegação por
  âncoras.
- **`/projetos/[slug]`:** título, tagline, stack, badges com stars/
  linguagem/última atualização (vindos da API), screenshot (se houver),
  corpo em Markdown (problema + decisões técnicas), links para o
  repositório no GitHub e para o deploy ao vivo (se houver).
- Nenhuma outra rota no MVP (sem `/blog`, sem `/sobre` como página
  separada).

### Componentes principais
- `ProjectCard` — card de projeto usado no grid da home.
- `ProjectDetail` — layout da página `/projetos/[slug]`.
- `TechBadge` — badge reutilizável para stack/linguagem.
- `Header` / `Footer` — navegação e links de contato (e-mail, GitHub,
  LinkedIn).

## 7. Direção Visual

Definição em nível de direção — paleta exata, tipografia final e mockups
ficam para uma etapa de design visual dedicada durante a implementação
(usando a skill `frontend-desing` já disponível no projeto, iterando com
mockups reais em vez de travar escolhas visuais aqui no PRD).

- **Tema:** dark por padrão, identidade "técnica/dev".
- **Tipografia:** toque monospace em elementos-chave (títulos, badges de
  stack, possivelmente o hero), sem comprometer a legibilidade do corpo de
  texto.
- **Cards de projeto:** compactos, stack como badges, stars/linguagem
  visíveis, hover state simples (ex: destaque de borda), sem animações
  pesadas.
- **Responsividade:** mobile-first, grid de projetos colapsando para 1
  coluna em telas pequenas.
- **Acessibilidade:** contraste adequado no tema dark (mínimo WCAG AA);
  badges não podem depender só de cor para passar informação.

## 8. Tratamento de Erros

- **API do GitHub indisponível ou rate-limited no build:** o build não
  deve quebrar — o card usa apenas os dados curados (sem stars/linguagem)
  e um aviso é logado no processo de build.
- **Repositório citado no front-matter não existe mais / foi renomeado:**
  mesmo tratamento de degradação graciosa, com aviso no log de build para
  correção manual do slug.
- **Página de projeto inexistente** (`/projetos/slug-errado`): 404 padrão
  do Next.js.
- **Rate limit da API do GitHub:** uso de um GitHub Personal Access Token
  (PAT) nas variáveis de ambiente do build, elevando o limite de 60 para
  5.000 requisições/hora — margem confortável para 6-10 projetos
  revalidando a cada 24h.

## 9. Testes

Nível de esforço proporcional ao escopo (site majoritariamente estático,
sem lógica de negócio complexa):

- Testes unitários leves para funções puras de mapeamento de dados
  (combinação de front-matter + resposta da API do GitHub).
- Smoke test de build: `next build` deve completar sem erros com os dados
  reais.
- Checklist manual de teste visual (mobile e desktop) antes de cada
  deploy — grid de projetos, página de detalhe, navegação por âncoras.
- Sem testes E2E automatizados no MVP; pode ser reconsiderado se o site
  ganhar funcionalidades com lógica própria (ex: formulário de contato
  com backend).

## 10. Fora de Escopo (MVP)

- Blog/artigos, CMS, internacionalização (i18n).
- Busca/filtro avançado de projetos.
- Formulário de contato com backend próprio (contato via `mailto:`/links
  diretos apenas).
- Autenticação.
- Analytics avançado (um básico tipo Vercel Analytics é aceitável, mas não
  é requisito).
- Sincronização automática/agendada além da revalidação ISR de 24h (sem
  cron job externo).
- Testes E2E automatizados.

## 11. Critérios de Sucesso

- Site no ar na Vercel, acessível via domínio próprio (ou domínio padrão
  da Vercel, caso ainda não haja domínio definido).
- 6 a 10 projetos curados publicados, cada um com página de detalhe
  funcional.
- Dados de stars/linguagem/última atualização puxados corretamente da API
  do GitHub, atualizando via ISR.
- Boa performance (Core Web Vitals/Lighthouse) — sem meta numérica rígida,
  apenas o compromisso de não degradar por decisões de implementação.
- Responsivo e legível em mobile.

## 12. Próximos Passos

1. Etapa de design visual (mockups) usando a skill `frontend-desing`.
2. Plano de implementação detalhado (skill `writing-plans`).
