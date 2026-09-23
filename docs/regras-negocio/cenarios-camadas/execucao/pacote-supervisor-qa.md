# Pacote — avaliação supervisor IA

Gerado: 2026-09-23T15:02:03Z

## Robô 511 (`executar-feliz-excelencia-todos.py`)

| Veredito | Qtd |
| --- | ---: |
| PASS | 138 |
| FAIL | 48 |
| PENDENTE_QA_HUMANO | 325 |

Artefatos: `metricas-reais-511/metricas-reais-511.csv`, `.html`, JSON por tela.

## E2E Playwright (produção)

```json
{
  "expected": 4,
  "unexpected": 4,
  "skipped": 0,
  "duration_ms": 0
}
```

Relatório completo: `e2e-playwright-report-rodada.json`

## Sync 2027–2030 (smoke)

```
OK 2027: by-year=1 year-tbd=0
FAIL 2028: by-year=0 year-tbd=0
FAIL 2029: by-year=0 year-tbd=0
FAIL 2030: by-year=0 year-tbd=0
```

## Rodada deste pacote (agente cloud)

- **Robô 511:** não reexecutou nesta VM (disco cheio / Chromium `Target crashed`). Métricas abaixo = última rodada válida em `metricas-reais-511.csv`.
- **E2E:** tentativa em produção falhou/interrompida; ver `e2e-playwright-report-rodada.json` + correção de seletores em `e2e/filmes-catalogo.spec.ts`.
- **Rodada completa (recomendado):** GitHub Actions → **QA — Robô 511 + E2E produção** → baixar artifact `qa-pacote-supervisor-511`.

## Arquivo para o agente

- **`pacote-supervisor-qa.json`** — contexto estruturado
- **`PROMPT-SUPERVISOR-IA.md`** — prompt de avaliação (cole no agente QA sênior)
- **`supervisor-fila-qa.json`** — fila priorizada (48 FAIL modais primeiro)
