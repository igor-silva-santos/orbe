# Inventário de regras de negócio — Orbe Nerd

**Última revisão:** 2026-09-22  
**Objetivo:** documentação **minuciosa**, tela a tela, para derivação de cenários de teste. Nenhuma regra substituída por resumo genérico.

## Como usar

1. Leia [`00-CONVENCOES.md`](./00-CONVENCOES.md) (IDs, colunas, escopo).
2. Abra o arquivo da **tela** ou **módulo** abaixo.
3. Cada linha da tabela principal = **um caso de teste** (ou base para um caso parametrizado).

## Mapa de telas (frontend)

| Arquivo | Rota / módulo | Regras (aprox.) |
|---------|----------------|-----------------|
| [`telas/01-HOME.md`](./telas/01-HOME.md) | `/` — hero, 4 carrosséis, continuar assistindo | **90+** |
| [`telas/02-FILMES.md`](./telas/02-FILMES.md) | `/filmes` | 68 |
| [`telas/03-SERIES.md`](./telas/03-SERIES.md) | `/series` | 62 |
| [`telas/04-ANIMES.md`](./telas/04-ANIMES.md) | `/animes` | 20+ |
| [`telas/05-JOGOS.md`](./telas/05-JOGOS.md) | `/jogos`, redirect em alta | 29 |
| [`telas/06-PROMOCOES.md`](./telas/06-PROMOCOES.md) | `/promocoes` | 35 |
| [`telas/07-HOJE.md`](./telas/07-HOJE.md) | `/hoje` | 24 |
| [`telas/08-MODAIS.md`](./telas/08-MODAIS.md) | SuperModal, calendário, rating | 90+ |
| [`telas/09-BUSCA-HEADER.md`](./telas/09-BUSCA-HEADER.md) | SearchOverlay, Header | 50+ |
| [`telas/10-MINHA-LISTA.md`](./telas/10-MINHA-LISTA.md) | Minha lista, fila, animes | 79 |
| [`telas/11-AUTH-PERFIL.md`](./telas/11-AUTH-PERFIL.md) | Login, registro, perfil, config | 61 |
| [`telas/12-OUTRAS-TELAS.md`](./telas/12-OUTRAS-TELAS.md) | Continuações, prêmios, eventos, pessoa… | 85+ |

## Curadoria global (backend)

Filtros de exibição e sync: `api/src/qualityFilters.ts` — referenciados em várias telas (home, carrosséis, trending, hoje). Regras específicas de threshold estão nos arquivos de tela **e** podem ser extraídas para `RN-GLOBAL-*` em revisões futuras.

## Documentos relacionados

- Visão funcional (não atomizada): `orbe-1/FUNCIONALIDADES.md`
- Home (rascunho denso enviado pelo time): espelhado e expandido em `telas/01-HOME.md`
- Extensão Crunchyroll: `extension/REGRAS-CRUNCHYROLL.md`
- Minha lista animes (API): `api/MINHA_LISTA_ANIMES.md`

## Próximas expansões sugeridas

- `telas/13-API-SYNC.md` — webhooks, sync, refresh WebSocket
- `telas/14-EXTENSAO.md` — extensão navegador
- Sub-IDs por regra de carrossel (ex.: `RN-HOME-TL-042a`) quando um caso QA precisar de variação de dados
