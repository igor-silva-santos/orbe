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

## Atualização 16:58 UTC — CSV novo + fila (sem reabrir modais)

- **Master** com `metricas-reais-511.csv` **23/09 15:48–16:20Z**: PASS 12, FAIL **3** (modais: clique-fora no robô), PENDENTE 496.
- **Modais:** planilha mantém triagem anterior (**48** linhas); **não** reabertos nesta rodada.
- **Fila:** lote `supervisor-lote-fila-prod.py` — **34** cenários (skip `08-MODAIS.md`) → **220/511** vereditos humanos.
- **PASS novos:** HOME-003/004, HOJE-001/002, SHELL-002, ANIMES-005, BUSCA-001; demais do lote **BLOQUEADO** (catálogo/título específico).

## Próximo

1. Aguardar `syncActive: false` + `validar-sync-anos.py --start 2027 --end 2030`.
2. Continuar fila (próximo lote 30, skip modais).
3. Opcional: ajustar robô clique-fora (coordenada backdrop) — **não** reclassificar os 48 FAIL antigos.
