# Validação de rotas Orbe

Gerado: 2026-09-25T02:55:48.042Z

## Totais

- **UI testadas:** 39 (37 estáticas + 2 dinâmicas amostradas)
- **UI com falha:** 0
- **API GET públicas testadas:** 34
- **API com falha:** 2

## Inventário completo no código

- `frontend/e2e/explorer/route-manifest.ts` — catálogo canônico
- `docs/qa/mapa-orbe-rotas.md` — mapa humano (UI + API + modais)

## Falhas

| Rota | HTTP | Nota |
| --- | --- | --- |
| /api/pesquisa?q=orbe | 500 |  |
| /api/auth/session | 405 |  |