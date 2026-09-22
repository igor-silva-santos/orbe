# QA sênior — rodada 2 (pós-deploy front + back)

**Data:** 2026-09-22  
**Ambiente:** https://orbe-seven.vercel.app  
**Executor:** `executar-feliz-multitask.py` (12 lotes, ondas de 4)  
**Evidências:** `prod-rodada-2/*.json` · [`relatorio-feliz-prod-rodada-2.csv`](./relatorio-feliz-prod-rodada-2.csv) · [HTML](./relatorio-feliz-prod-rodada-2.html)

Complementa a comparação do agente [Comparar rodadas QA](bc-0e3ab53d-348e-5886-a86f-541e1a82da36).

## Totais

| Resultado | Rodada 1 (`prod/`) | Rodada 2 (`prod-rodada-2/`) | Δ |
| --- | ---: | ---: | ---: |
| PASS | 128 | 128 | 0 |
| FAIL | 271 | 253 | **−18** |
| BLOQUEADO | 112 | 130 | **+18** |
| **Total** | **511** | **511** | |

**Top 10 melhorados (FAIL/BLOQUEADO → PASS):** nenhum.

## Delta por tela

| Arquivo | R1 PASS / FAIL / BLOQ | R2 PASS / FAIL / BLOQ | Δ FAIL |
| --- | --- | --- | --- |
| 01-HOME | 22 / 55 / 0 | 22 / 37 / 18 | **−18** |
| 02-FILMES | 16 / 29 / 23 | 16 / 29 / 23 | 0 |
| 03-SERIES | 3 / 38 / 21 | 3 / 38 / 21 | 0 |
| 04–12 | *(idem rodada 1)* | *(idem rodada 1)* | 0 |

Única mudança: **HOME** — 18 cenários **FAIL → BLOQUEADO** (heurística com scroll nas faixas; não novos PASS).

## 18 cenários reclassificados (HOME)

| ID_Cenario | R1 | R2 |
| --- | --- | --- |
| CT-RN-HOME-AC-001-F | FAIL | BLOQUEADO |
| CT-RN-HOME-AC-004-F | FAIL | BLOQUEADO |
| CT-RN-HOME-AC-008-F | FAIL | BLOQUEADO |
| CT-RN-HOME-AC-009-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CA-002-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-006-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-007-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-009-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-012-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-013-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-014-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CARD-015-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CON-002-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CON-007-F | FAIL | BLOQUEADO |
| CT-RN-HOME-CON-008-F | FAIL | BLOQUEADO |
| CT-RN-HOME-EA-002-F | FAIL | BLOQUEADO |
| CT-RN-HOME-SHELL-002-F | FAIL | BLOQUEADO |
| CT-RN-HOME-TL-001-F | FAIL | BLOQUEADO |

## Próximos passos QA / TL

1. Tratar **253 FAIL** com passos manuais ou runner com interação (não só keywords).
2. **130 BLOQUEADO** — login/dados de catálogo documentados.
3. Rodada 1 permanece em `execucao/prod/` para histórico.

```bash
python3 docs/regras-negocio/scripts/executar-feliz-multitask.py prod-rodada-2
python3 docs/regras-negocio/scripts/merge-execucao-producao.py prod-rodada-2
```
