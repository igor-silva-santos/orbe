# Fila Crunchyroll → Orbe

Página alvo: `https://www.crunchyroll.com/pt-br/watchlist`

## Textos de progresso (pt-BR)

| Texto na Crunchyroll | Significado | Status Orbe (`st`) |
|----------------------|-------------|-------------------|
| **Começar a Assistir: E1** | Na fila, nenhum episódio iniciado | `comecar` |
| **Continuar: E5** | Começou o episódio e não terminou | `continuar` |
| **A Seguir: E21** / **T2 E5** | Terminou o ep anterior; próximo na fila | `a_seguir` |
| **Assistir de Novo: E12** | Viu tudo que estava disponível na trilha | ver abaixo |

### Assistir de Novo — dublagem vs episódio novo

Na sync, a extensão lê o **CMS da Crunchyroll** (`/content/v2/cms/series/{id}/seasons` + episódios) e envia:

- `episodesSubCount` — episódios no ar (qualquer áudio)
- `episodesDubPtBrCount` — episódios com áudio **pt-BR** explícito
- `subFrontier` / `dubPtBrFrontier` — último T/E disponível em sub e em dublagem BR

O Orbe combina isso com o total de episódios do **Anilist** (match de título fuzzy) e com a trilha preferida do usuário (`sub` ou `pt-BR`):

| Situação | `st` |
|----------|------|
| Sub à frente da dublagem BR (há ep legendado que ainda não tem dub) | `esperando_dublagem` |
| Catálogo CR/Anilist ainda não completo (falta ep no ar) | `esperando_episodio` |
| Em dia com o que existe no ar (e na dub, se trilha PT-BR) | `concluido` |
| Ainda há ep na trilha para rever antes de “esperar” | `assistir_de_novo` |

Quando sair episódio novo ou dublagem, a Crunchyroll costuma mudar para **A Seguir** — na próxima sync o Orbe atualiza.

## Dublagem PT-BR

A Crunchyroll marca como “dublado” qualquer áudio que não seja o original. O Orbe **só** conta dublagem quando o episódio no CMS tem `audio_locale` / `versions` com **pt-BR** (ou card com indício explícito de Português Brasil).

Na extensão: **“Sincronizar só dublagem PT-BR”** ignora itens da watchlist sem esse indício no card.

## Match de título

Resolução para Anilist via similaridade de string (threshold ~0,58), para totais de episódio e poster no Orbe.

## IDs e duplicatas

- `id` no Orbe: `cr:{seriesId}`
- Dedup por `seriesId` na página

## Sync

1. Scrape dos cards na watchlist pt-BR  
2. Para cada série: fetch do catálogo CMS (pode levar alguns segundos)  
3. `POST /api/watchlist/crunchyroll/sync` com `catalog` em cada item  

`crMeta` persistido: `lineKind`, `preferredAudio`, `matchScore`, `catalog`.
