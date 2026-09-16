---
slug: "aniversariantes-do-mes"
title: "Aniversariantes do Mês"
repo: "fernandojsmelo/aniversariantes-do-mes"
tagline: "Automação que identifica aniversariantes do mês e envia lembretes por SMS, agendada via systemd."
techStack: ["Node.js", "Systemd"]
featured: true
order: 4
---

## O problema

Lembrar automaticamente quem faz aniversário no mês, sem depender de
alguém verificar uma planilha manualmente todo início de mês.

## Decisões técnicas

Script Node.js modular — parsing do arquivo de colaboradores, geração
das mensagens, envio por SMS e controle de estado local para não
reenviar a mesma mensagem duas vezes — agendado via `systemd` para rodar
automaticamente todo dia 1º.
