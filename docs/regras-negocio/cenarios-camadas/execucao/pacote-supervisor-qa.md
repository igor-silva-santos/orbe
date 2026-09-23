# Pacote — avaliação supervisor IA

Gerado: 2026-09-23T16:53:31Z

## Robô 511 (`executar-feliz-excelencia-todos.py`)

| Veredito | Qtd |
| --- | ---: |
| PASS | 12 |
| FAIL | 3 |
| PENDENTE_QA_HUMANO | 496 |

Artefatos: `metricas-reais-511/metricas-reais-511.csv`, `.html`, JSON por tela.

## E2E Playwright (produção)

```json
{
  "status": "missing"
}
```

Relatório completo: `e2e-playwright-report.json`

## Sync 2027–2030 (smoke)

```
OK 2027: by-year=1 year-tbd=0
FAIL 2028: by-year=0 year-tbd=0
FAIL 2029: by-year=0 year-tbd=0
FAIL 2030: by-year=0 year-tbd=0
```

## Arquivo para o agente

- **`pacote-supervisor-qa.json`** — contexto estruturado
- **`PROMPT-SUPERVISOR-IA.md`** — prompt de avaliação
- **`supervisor-fila-qa.json`** — fila priorizada (rode `gerar-fila-supervisor-qa.py` após o robô)
