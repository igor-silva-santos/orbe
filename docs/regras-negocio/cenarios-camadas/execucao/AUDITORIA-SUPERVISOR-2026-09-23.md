# Auditoria supervisor QA — 23/09/2026 (registro PO)

Parecer recebido do agente supervisor (robô 511 + E2E em https://orbe-seven.vercel.app).

## Decisões aceitas pelo time

| Item | Decisão |
| --- | --- |
| 48 FAIL `08-MODAIS` | **Falso FAIL** (DEV-ROBO-01) — correção no `executar-feliz-excelencia-todos.py` |
| 138 PASS | **Não é meta**; ~130 smoke enganoso em Filmes/Séries → **PENDENTE** no robô |
| 325 PENDENTE | Mantido — QA humano/supervisor |
| E2E | `home-carousels` smoke ok; falta `/filmes`, modal, anos 2027+ |
| 2027 catálogo | **BLOQUEADO** se regra exige mais títulos que a API (`by-year` = 1) |

## Correções aplicadas no repo (pós-auditoria)

1. Modais: clique em **card** (`div.cursor-pointer` + img), assertiva `.super-modal-content`; Esc/overlay em regras que citam.
2. Filmes/Séries: robô **não** marca mais PASS só por `h1`.
3. E2E: `filmes-catalogo.spec.ts` — poster → SuperModal.

## DEV backlog

| ID | Descrição |
| --- | --- |
| DEV-ROBO-01 | (mitigado no script) link “Filmes” vs card |
| DEV-ROBO-02 | (mitigado) PASS em massa Filmes/Séries |
| DEV-A11Y-01 | SuperModal `role="dialog"` + `aria-modal` — implementado em `SuperModal.tsx` (aguarda deploy Vercel) |

## Próximo passo PO

Re-rodar robô localmente (sem depender de Cloudflare/Actions), atualizar `metricas-reais-511.csv`, continuar top 20 IDs na planilha humana.
