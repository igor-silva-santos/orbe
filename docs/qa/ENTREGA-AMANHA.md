# Entrega QA Orbe — leitura rápida (25/09/2026)

Use este arquivo amanhã antes de mergulhar nos JSONs.

## Status geral

| Verificação | Comando | Resultado esperado |
|-------------|---------|-------------------|
| Rotas UI + API smoke | `cd frontend && npm run test:e2e:routes` | 0 falhas HTTP |
| Jornadas + console | `npm run test:e2e:explore` | 0 critical; ver `.md` resumo |
| Busca global | `curl -s -o /dev/null -w "%{http_code}" "https://orbe-seven.vercel.app/api/pesquisa?q=ab"` | **200** |

Produção: **https://orbe-seven.vercel.app**

## O que foi feito nesta rodada autônoma

1. **Mapa de rotas** — `docs/qa/mapa-orbe-rotas.md` + catálogo Playwright.
2. **Validação automatizada** — cada URL catalogada + amostras dinâmicas (`/pessoa`, saga, universo…).
3. **Bug crítico corrigido** — `/api/pesquisa` retornava 500 (include Prisma `collection` em **Série**). Merge #166–#167.
4. **Promoções / preços / recomendações** — entregues em PRs anteriores (#163–#165): Até R$30, sort menor preço, Steam separada, aba Recomendações.
5. **Explorador ampliado** — área `ROTAS-DINAMICAS`, Hoje com `aria-pressed`, busca esperando API (menos falso positivo).
6. **Superfícies ocultas documentadas** — `docs/qa/SUPERFICIES-OCULTAS.md`.

## PRs mergeados recentes (master)

- #163 — promoções / preços  
- #164 — harness explorador multi-área  
- #165 — recomendações jogos (demo/EA multiplayer)  
- #166 — mapa rotas + fix busca  
- #167 — validação verde pós-deploy  
- *(esta sessão)* — melhorias explorador + docs entrega  

## O que **não** está 100% coberto (precisa credencial ou humano)

- Minha lista, perfil, configurações, admin sync **logados**
- Extensão Chrome instalada + sync Crunchyroll
- **511 cenários** em `docs/regras-negocio/cenarios-teste.md`
- Cada combinação de filtro em catálogos (matriz enorme)

Sugestão: conta de teste `ORBE_E2E_EMAIL` / senha em secret do CI quando quiser fechar o gap.

## Arquivos de evidência

| Arquivo | Uso |
|---------|-----|
| `docs/qa/validacao-rotas-latest.json` | HTTP por rota |
| `docs/qa/exploracao-orbe-latest.json` | Console, rede, lentidão |
| `docs/qa/exploracao-orbe-latest.md` | Resumo humano |
| `docs/qa/exploracao-orbe-analise.md` | Metodologia |

## Próximo passo recomendado (quando tiver 30 min)

1. Abrir `ENTREGA-AMANHA.md` (este) ✓  
2. Rodar `test:e2e:routes` local ou confiar no JSON datado  
3. Navegar manualmente: `/promocoes?tab=recomendacoes` + busca “mario”  
4. Decidir se cria usuário E2E para minha-lista  
