# Convenções — inventário de regras de negócio (QA)

## Objetivo

Cada linha deste inventário é **uma regra atômica**: um comportamento verificável, sem agregação de várias regras em um único item. O material serve para **cenários de teste** (manual, exploratório ou automatizado).

## Formato de ID

| Prefixo | Escopo |
|---------|--------|
| `RN-HOME-*` | Rota `/` (homepage) |
| `RN-FILMES-*` | `/filmes` e endpoints de filme usados na home |
| `RN-SERIES-*` | `/series` e endpoints de série usados na home |
| `RN-ANIMES-*` | `/animes` e carrossel de animes na home |
| `RN-JOGOS-*` | `/jogos`, `/jogos-em-alta`, promoções |
| `RN-PROMO-*` | `/promocoes` |
| `RN-HOJE-*` | `/hoje` |
| `RN-MODAL-*` | SuperModal e modais globais |
| `RN-BUSCA-*` / `RN-HEADER-*` | Busca e cabeçalho |
| `RN-LISTA-*` | Minha lista / watchlist |
| `RN-AUTH-*` | Login, registro, perfil, configurações |
| `RN-CONT-*` | Continuações (sagas) |
| `RN-PREM-*` / `RN-EVT-*` | Prêmios e eventos |
| `RN-PERS-*` / `RN-DUB-*` / `RN-DEV-*` | Pessoa, dublador, desenvolvedora |
| `RN-GLOBAL-*` | Curadoria compartilhada (`qualityFilters.ts`, sync) |

## Colunas da tabela

| Coluna | Conteúdo |
|--------|----------|
| **ID** | Identificador estável para rastreio em Jira/TestRail |
| **Nome** | Título curto da regra |
| **Descrição** | Comportamento completo (o que o sistema faz e por quê) |
| **Pré-condições** | Estado de dados, auth, data/hora, flags |
| **Resultado esperado** | Observável na UI ou na resposta HTTP |
| **Evidência** | Arquivo e linha ou função no repositório |
| **Cenário QA** | Passos sugeridos para reproduzir |

## Evidência no código

- Caminhos relativos à raiz do monorepo (`frontend/…`, `api/…`).
- Quando a regra é composta (Prisma + pós-filtro), citar **ambos**.
- Divergências entre documentação antiga e código: registrar em **Notas de divergência** no fim da tela.

## O que não entra aqui

- Estimativas de horas ou esforço.
- Regras puramente visuais de marketing (copy do hero) **salvo** quando há ação de negócio (scroll, link).
- Detalhes de infra (deploy) — ver `docs/DEV.md`, `docs/PRODUCAO.md`.

## Manutenção

Ao alterar comportamento de carrossel, curadoria ou interações, atualizar o arquivo da tela **e** qualquer `RN-GLOBAL-*` afetado.
