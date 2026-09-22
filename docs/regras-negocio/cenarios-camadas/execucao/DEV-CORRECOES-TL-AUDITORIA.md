# DEV sênior — correções pós FAIL produção · checklist TL

**Data:** 2026-09-22  
**Branch:** `cursor/dev-fix-qa-fail-3a97`  
**Contexto:** 271 FAIL do runner `executar-feliz-lote.py` (267× `Keywords 0/n`).

## 1. Triagem obrigatória (TL valida que DEV não “corrigiu ruído”)

| Fato | Implicação para DEV |
| --- | --- |
| 267/271 FAIL são heurística de texto, sem cliques/login | **Não** adicionar código só para inflar keywords no DOM |
| Amostra 15 FAIL HOME → 15 falso-positivo | Ver [`AUDITORIA-AMOSTRA-FAIL.md`](./AUDITORIA-AMOSTRA-FAIL.md) |
| Regras exigem interação, catálogo específico ou auth | Permanecem **BLOQUEADO** ou re-teste manual — não patch cosmético |

**Regra DEV:** cada linha alterada deve mapear a uma regra `RN-*` ou defeito E2E reproduzível — não a um FAIL de planilha isolado.

## 2. Alterações de produto (mínimas, sem lib nova, sem herança)

| Arquivo | O quê | Por quê (regra / defeito) | Linhas (aprox.) |
| --- | --- | --- | --- |
| `MediaCarousel.tsx` | Título **Em alta**; botão com `aria-label` **Ver o que está em alta agora** | `RN-HOME-EA-*`, E2E `home-carousels.spec.ts` (4 botões nomeados) | ~5 |
| `AnimeCarousel.tsx` | `localStorage` modo launch/weekly; toggle visível com dados carregados; `aria-label` em alta | `RN-HOME-AC-002`, `RN-HOME-AC-001`, a11y/E2E | ~25 |
| `HomeClient.tsx` | `bootstrapEnabled` animes = hero ∨ seção (igual filmes/jogos) | `RN-HOME-AC-003`, `AC-005` — conteúdo abaixo da dobra sem scroll | 2 |
| `FilmesClient.tsx` | Drawers **O que vem aí** / **Em cartaz** após grade; refetch se SSR vazio | `RN-FILMES-008`, resiliência API no build | ~15 reorder + 6 |
| `SeriesClient.tsx` | **O que vem aí** após grade; refetch se SSR vazio | `RN-SERIES-008`, mesma resiliência | ~12 |
| `filmes/page.tsx`, `series/page.tsx` | `metadata` (title/description/canonical) | SEO alinhado ao `PageHeader` | ~10 cada |

**Não feito de propósito:** refatorar `ClientOnly` no layout (impacto global); bibliotecas; classes base/herança; strings fake só para QA runner.

## 3. Checklist TL — linha a linha

Para **cada arquivo** do diff desta branch:

- [ ] A mudança é **estritamente necessária** para o comportamento descrito na regra ou teste E2E?
- [ ] Não há trecho “defensivo” sem caminho de usuário real?
- [ ] Não há dependência nova em `package.json`?
- [ ] Não foi introduzida herança de classe para compartilhar lógica?
- [ ] `localStorage` em animes tem fallback se indisponível (try/catch)?

## 4. Reexecução QA após merge

```bash
cd frontend && CI=1 npm run test:e2e
python3 docs/regras-negocio/scripts/executar-feliz-todos.py
python3 docs/regras-negocio/scripts/merge-execucao-producao.py
```

Esperado: **menos FAIL** em HOME (copy Em alta, E2E verde); maioria dos 271 FAIL **ainda** exige runner manual ou QA humano — TL não deve exigir 0 FAIL só com este diff.

## 5. Assinatura

| TL DEV | Data | Aprovado / Ajuste |
| --- | --- | --- |
| | | |
