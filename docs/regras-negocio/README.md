# Regras de negócio — Orbe Nerd (visão de tela)

**Última revisão:** 2026-09-22  
**Para quem é:** QA, produto e suporte — **sem necessidade de acessar código**.

Cada documento descreve **uma página ou fluxo visível** do site. As tabelas listam regras que podem virar casos de teste um a um.

## Como usar

1. Leia [`00-CONVENCOES.md`](./00-CONVENCOES.md) (colunas e IDs).
2. Abra o arquivo da **tela** em [`telas/`](./telas/), o **documento único** [`regras-negocio-qa.md`](./regras-negocio-qa.md) (511 regras em Markdown) **ou** a planilha [`regras-negocio-qa.csv`](./regras-negocio-qa.csv) (UTF-8 com BOM para Excel).
3. Execute a coluna **Como testar**; confira **Resultado na tela**.

## Cenários de teste (time QA sênior + auditoria TL)

| Documento | Função |
| --- | --- |
| [`QA-PROCESSO-CENARIOS.md`](./QA-PROCESSO-CENARIOS.md) | Fluxo: elaboração → revisão par → auditoria TL → cobertura 511/511 |
| [`cenarios-teste.csv`](./cenarios-teste.csv) | Planilha oficial (1 linha mínima por regra, campos para passos e TL) |
| [`QA-TL-AUDITORIA.md`](./QA-TL-AUDITORIA.md) | Checklist cenário a cenário para TL sênior |
| [`QA-CENARIOS-EXEMPLO.md`](./QA-CENARIOS-EXEMPLO.md) | Referência de qualidade |
| [`scripts/validar-cobertura-cenarios.py`](./scripts/validar-cobertura-cenarios.py) | Valida se todas as regras têm cenário |

## Telas documentadas

| Arquivo | O que o usuário abre no site |
|---------|------------------------------|
| [`telas/01-HOME.md`](./telas/01-HOME.md) | Página inicial |
| [`telas/02-FILMES.md`](./telas/02-FILMES.md) | Filmes |
| [`telas/03-SERIES.md`](./telas/03-SERIES.md) | Séries |
| [`telas/04-ANIMES.md`](./telas/04-ANIMES.md) | Animes |
| [`telas/05-JOGOS.md`](./telas/05-JOGOS.md) | Jogos / jogos em alta |
| [`telas/06-PROMOCOES.md`](./telas/06-PROMOCOES.md) | Promoções |
| [`telas/07-HOJE.md`](./telas/07-HOJE.md) | Hoje |
| [`telas/08-MODAIS.md`](./telas/08-MODAIS.md) | Detalhe do título, avaliar, calendário |
| [`telas/09-BUSCA-HEADER.md`](./telas/09-BUSCA-HEADER.md) | Busca e cabeçalho |
| [`telas/10-MINHA-LISTA.md`](./telas/10-MINHA-LISTA.md) | Minha lista |
| [`telas/11-AUTH-PERFIL.md`](./telas/11-AUTH-PERFIL.md) | Entrar, conta, perfil, configurações |
| [`telas/12-OUTRAS-TELAS.md`](./telas/12-OUTRAS-TELAS.md) | Continuações, prêmios, eventos, ficha de pessoa etc. |

## Observação

Alguns arquivos ainda estão sendo alinhados ao formato “só tela”. A **página inicial** (`01-HOME.md`) é a referência de estilo atual.
