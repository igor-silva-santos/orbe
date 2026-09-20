# Extensão Orbe · Crunchyroll

Sincroniza a [watchlist pt-BR](https://www.crunchyroll.com/pt-br/watchlist) com a **Fila de animes** no Orbe (`/minha-lista/fila`).

Regras de depara: [REGRAS-CRUNCHYROLL.md](./REGRAS-CRUNCHYROLL.md)

## Instalação (dev)

1. `chrome://extensions` → Modo desenvolvedor → **Carregar sem compactação** → pasta `extension/`.
2. No popup: URL da API (ex. `http://localhost:3001/api` ou produção), JWT do Orbe (`localStorage.token` no site).
3. Opcional: **Sincronizar só dublagem PT-BR**.
4. Abra a watchlist da Crunchyroll → botão flutuante **Sync Orbe** ou sync pelo popup.

## API

- `POST /api/watchlist/crunchyroll/sync` — corpo `{ items, trackPtBrDub }`
- `GET /api/watchlist/fila-animes` — fila ordenada para o app

## Banco

Rodar `api/scripts/supabase-watchlist-crunchyroll.sql` no Supabase se ainda não aplicou a migration Prisma.
