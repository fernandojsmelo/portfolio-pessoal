---
slug: "chess-system-java"
title: "Chess System"
repo: "fernandojsmelo/chess-system-java"
tagline: "Motor de xadrez em Java, com as regras completas do jogo implementadas numa arquitetura orientada a objetos em camadas."
techStack: ["Java"]
featured: true
order: 5
---

## O problema

Implementar as regras completas do xadrez — movimentos, capturas,
xeque, xeque-mate — como exercício de modelagem orientada a objetos, sem
usar nenhuma engine pronta.

## Decisões técnicas

Arquitetura em camadas, separando a lógica genérica de tabuleiro
(`boardgame`) das regras específicas de xadrez (`chess`), com cada peça
representada por uma classe especializada. Interface via console.
