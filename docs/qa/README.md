# QA — exploração automatizada do Orbe

## Objetivo

Simular um usuário percorrendo **rotas, abas, modais, carrosséis e header**, registrando:

- `console.error` / warnings relevantes
- `pageerror` (exceções React)
- Falhas e HTTP ≥400 em `/api/`
- Ações lentas (limiares por área)
- Interações que não produziram efeito esperado (ex.: card sem abrir modal)

## Como rodar (produção)

```bash
cd frontend
npm run test:e2e:explore   # jornadas (modais, carrosséis, abas)
npm run test:e2e:routes    # HTTP de cada rota catalogada + API pública
```

Variável opcional: `PLAYWRIGHT_BASE_URL` (padrão: `https://orbe-seven.vercel.app`).

## Saídas

| Arquivo | Conteúdo |
|---------|----------|
| `docs/qa/mapa-orbe-rotas.md` | **Mapa** UI + API + modais (onde validar) |
| `docs/qa/validacao-rotas-latest.json` | Status HTTP por rota |
| `docs/qa/exploracao-orbe-latest.json` | Console/rede/interações |
| `docs/qa/exploracao-orbe-latest.md` | Resumo explorador |

## Áreas (sequenciais — contexto único)

1. **SHELL** — páginas estáticas, login, header (busca, sino, tema)
2. **HOME** — faixas, carrosséis, SuperModal
3. **CATALOGOS** — filmes, séries, animes, jogos (+ filtros e abas no modal)
4. **PROMOCOES** — três abas, sort, plataformas, carregar mais
5. **HOJE-CONTINUACOES-OUTRAS** — hoje, continuações, prêmios, eventos, minha-lista, extensão
6. **MODAIS-BUSCA-GLOBAL** — busca com categorias + modais profundos (calendário, requisitos PC, temporadas)

## Documentação de regras (não cobre 100% do produto)

- Índice: `docs/regras-negocio/README.md`
- 511 cenários: `docs/regras-negocio/cenarios-teste.md`
- Por tela: `docs/regras-negocio/telas/*.md` e `docs/regras-negocio/cenarios/generated/*.md`

O explorer **não substitui** QA humano nem os 511 casos; complementa com varredura de console/rede e cliques repetíveis.

## Inventário de rotas

**Mapa completo:** `docs/qa/mapa-orbe-rotas.md`  
**Catálogo Playwright:** `frontend/e2e/explorer/route-manifest.ts` (40+ URLs UI + padrões dinâmicos + 30+ GET API smoke; ~85 GET no Express no total).
