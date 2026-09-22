# Relatório QA — Rodada 2 (pós-deploy front+back)

**Gerado em:** 2026-09-22  
**Ambiente:** https://orbe-seven.vercel.app  
**Baseline (rodada 1):** [`prod/`](./prod/) — execução automatizada `executar-feliz-lote` (~18:40 UTC)  
**Rodada 2:** [`prod-rodada-2/`](./prod-rodada-2/) — QA sênior multitask pós-deploy (~19:04 UTC)  
**Referência rodada 1:** [`RELATORIO-QA-SENIOR-PRODUCAO.md`](./RELATORIO-QA-SENIOR-PRODUCAO.md)

## Resumo executivo

| Métrica | Rodada 1 | Rodada 2 | Δ |
| --- | ---: | ---: | ---: |
| **PASS** | 128 | 128 | **0** |
| **FAIL** | 271 | 253 | **−18** |
| **BLOQUEADO** | 112 | 130 | **+18** |
| **Total cenários** | 511 | 511 | 0 |

A rodada 2 manteve **128 PASS** (nenhuma regressão PASS→FAIL/BLOQUEADO). A queda de **18 FAIL** veio inteiramente da tela **HOME**, por **reclassificação** de cenários de FAIL para BLOQUEADO (triagem manual pós-auditoria de falso positivo / dependência de catálogo), **não** por novos cenários aprovados.

**Cenários melhorados (FAIL ou BLOQUEADO → PASS):** **nenhum** — não há top 10 nesta rodada.

## Delta por tela

Colunas **ΔP / ΔF / ΔB** = rodada 2 − rodada 1.

| Tela | R1 PASS | R1 FAIL | R1 BLOQ | R2 PASS | R2 FAIL | R2 BLOQ | ΔP | ΔF | ΔB |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 01-HOME | 22 | 55 | 0 | 22 | 37 | 18 | 0 | −18 | +18 |
| 02-FILMES | 16 | 29 | 23 | 16 | 29 | 23 | 0 | 0 | 0 |
| 03-SERIES | 3 | 38 | 21 | 3 | 38 | 21 | 0 | 0 | 0 |
| 04-ANIMES | 4 | 12 | 4 | 4 | 12 | 4 | 0 | 0 | 0 |
| 05-JOGOS | 3 | 18 | 8 | 3 | 18 | 8 | 0 | 0 | 0 |
| 06-PROMOCOES | 2 | 30 | 3 | 2 | 30 | 3 | 0 | 0 | 0 |
| 07-HOJE | 10 | 5 | 9 | 10 | 5 | 9 | 0 | 0 | 0 |
| 08-MODAIS | 17 | 18 | 13 | 17 | 18 | 13 | 0 | 0 | 0 |
| 09-BUSCA-HEADER | 11 | 19 | 0 | 11 | 19 | 0 | 0 | 0 | 0 |
| 10-MINHA-LISTA | 14 | 12 | 13 | 14 | 12 | 13 | 0 | 0 | 0 |
| 11-AUTH-PERFIL | 11 | 7 | 12 | 11 | 7 | 12 | 0 | 0 | 0 |
| 12-OUTRAS-TELAS | 15 | 28 | 6 | 15 | 28 | 6 | 0 | 0 | 0 |
| **Total** | **128** | **271** | **112** | **128** | **253** | **130** | **0** | **−18** | **+18** |

Telas **02–12** foram reexecutadas na rodada 2 (timestamps atualizados); os resultados permaneceram **idênticos** à rodada 1 cenário a cenário.

## Top 10 cenários melhorados (FAIL/BLOQUEADO → PASS)

_Nenhum cenário mudou para PASS em relação à rodada 1._

## Reclassificações relevantes (HOME: FAIL → BLOQUEADO)

Estes **18** IDs explicam o delta global de FAIL/BLOQUEADO; evidência típica: dependência de dado no catálogo ou smoke anônimo insuficiente — ver [`AUDITORIA-AMOSTRA-FAIL.md`](./AUDITORIA-AMOSTRA-FAIL.md).

| ID do cenário |
| --- |
| CT-RN-HOME-AC-001-F |
| CT-RN-HOME-AC-004-F |
| CT-RN-HOME-AC-008-F |
| CT-RN-HOME-AC-009-F |
| CT-RN-HOME-CA-002-F |
| CT-RN-HOME-CARD-006-F |
| CT-RN-HOME-CARD-007-F |
| CT-RN-HOME-CARD-009-F |
| CT-RN-HOME-CARD-012-F |
| CT-RN-HOME-CARD-013-F |
| CT-RN-HOME-CARD-014-F |
| CT-RN-HOME-CARD-015-F |
| CT-RN-HOME-CON-002-F |
| CT-RN-HOME-CON-007-F |
| CT-RN-HOME-CON-008-F |
| CT-RN-HOME-EA-002-F |
| CT-RN-HOME-SHELL-002-F |
| CT-RN-HOME-TL-001-F |

## Leitura para o time

1. **Deploy:** nenhum ganho mensurável de PASS automático nesta rodada; foco da rodada 2 foi **triagem** na HOME, não correção funcional detectada pelo runner.
2. **Próximo passo:** reexecutar **130 BLOQUEADO** (incluindo os 18 reclassificados da HOME) com pré-condições de QA; priorizar telas com maior FAIL absoluto (**03-SERIES**, **06-PROMOCOES**, **01-HOME**).
3. **Correções de dev:** acompanhar [`DEV-CORRECOES-TL-AUDITORIA.md`](./DEV-CORRECOES-TL-AUDITORIA.md) e rodada 3 após merge em produção.

## Artefatos

- JSON rodada 2: `prod-rodada-2/*.json`
- Comparação programática: mesmos 511 IDs em `prod/` e `prod-rodada-2/`
