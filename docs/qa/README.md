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
npm run test:e2e:explore
```

Variável opcional: `PLAYWRIGHT_BASE_URL` (padrão: `https://orbe-seven.vercel.app`).

## Saídas

| Arquivo | Conteúdo |
|---------|----------|
| `docs/qa/exploracao-orbe-latest.json` | Relatório completo por área |
| `docs/qa/exploracao-orbe-latest.md` | Resumo legível |

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

Ver subpastas em `frontend/src/app/**/page.tsx` (33 páginas + redirects). Detalhe de modais: `frontend/src/components/modals/`.
