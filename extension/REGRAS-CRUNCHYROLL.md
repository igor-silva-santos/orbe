# Fila Crunchyroll → Orbe

Página alvo: `https://www.crunchyroll.com/pt-br/watchlist`

## Textos de progresso (pt-BR)

| Texto na Crunchyroll | Significado | Status Orbe (`st`) |
|----------------------|-------------|-------------------|
| **Começar a Assistir: E1** | Na fila, nenhum episódio iniciado | `comecar` |
| **Continuar: E5** | Começou o episódio e não terminou | `continuar` |
| **A Seguir: E21** / **T2 E5** | Terminou o ep anterior; próximo na fila | `a_seguir` |
| **Assistir de Novo: E12** | Viu tudo que estava disponível na trilha | ver abaixo |

### Assistir de Novo (depara com catálogo Orbe)

Compara o episódio referenciado com o **total de episódios** do anime no Orbe (Anilist):

- `ep >= total` → `concluido` (viu tudo que existe no catálogo)
- `ep < total` e trilha **PT-BR** → `esperando_dublagem` (provável espera de dublagem)
- `ep < total` e trilha leg/sub → `esperando_episodio` (novo ep ainda não saiu)

Quando sair episódio novo (ou dublado PT-BR), a Crunchyroll deve mudar o texto para **A Seguir** — na próxima sync o Orbe atualiza.

## Dublagem PT-BR

A Crunchyroll marca como “dublado” qualquer áudio que não seja o original. O Orbe **só** considera dublagem quando há indício explícito de **Português (Brasil)** no card.

Na extensão: opção **“Sincronizar só dublagem PT-BR”** ignora itens sem esse indício.

## IDs e duplicatas

- `id` no Orbe: `cr:{seriesId}` (ID da série na URL `/series/…` ou `/watch/…`)
- Títulos repetidos na página são deduplicados por `seriesId`

## Próximas melhorias

- Contagem de eps dublados PT-BR por série (API Crunchyroll / catálogo Orbe)
- Notificação quando `esperando_dublagem` → `a_seguir`
- Resolver match de título → Anilist com fuzzy + MAL id
