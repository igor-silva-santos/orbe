# Rodada 511 — triagem supervisor (23/09/2026, pós-#155/#156)

**Produção:** https://orbe-seven.vercel.app · **API:** https://orbe-7bu0.onrender.com

## A) Triagem rápida

| Item | Resultado |
| --- | --- |
| `metricas-reais-511.csv` | **511** — PASS 138, FAIL 48, PENDENTE_QA_HUMANO 325 (**CSV ainda da rodada 22/09**, pré-#155) |
| 48 FAIL modais | **Falso FAIL** — robô antigo clicava link “Filmes”. Prod: card em `/filmes` abre `role=dialog` + `.super-modal-content` (#155) |
| Esc (RN-MODAL-008) | **PASS** em prod |
| Clique fora (RN-MODAL-007) | **PASS** — backdrop na faixa inferior do overlay (clique topo esquerdo não fecha porque `container` ocupa a largura) |
| Carrossel home → card | **E2E** confirma cards visíveis; clique programático falha “outside viewport” (Embla) — usar `/filmes` ou scroll manual |
| PASS Filmes/Séries (138) | **68+62 eram só h1** — reclassificados **BLOQUEADO** na planilha humana |
| Console home/`/filmes` | Sem WS/CSP/TMDB na amostra headless; `/filmes` 253 posters, 0 vazios |
| Sync | `syncActive: true` (~98%, fase filmes) — **2027 ainda `by-year=1`** (PO: BLOQUEADO catálogo até sync 2027–2030 terminar) |

## B) Planilha humana

- **186 / 511** vereditos registrados nesta rodada (`QA-EXECUCAO-HUMANA-511.csv`).
- **4 PASS:** HOME-001/002, MODAL-007, MODAL-008.
- **182 BLOQUEADO:** 46 modais (passos CSV) + 130 Filmes/Séries/Ea smoke enganoso.

## C) E2E prod

`npm run test:e2e:prod` → **5/5** (1 flaky). Ver `e2e-playwright-report-rodada.json`.

## Próximo

1. Reexecutar robô pós-#155 → novo `metricas-reais-511.csv`.
2. Aguardar `syncActive: false` + validar `validar-sync-anos.py --start 2027 --end 2030`.
3. Continuar fila `supervisor-fila-qa.json` (325 PENDENTE + restante sem veredito).
