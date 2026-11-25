# Métricas reais — 511 Feliz (passo a passo)

**Não use** `128/253/130` do runner antigo como conclusão.

## Última execução

Gerar de novo:

```bash
# Opcional: export QA_EMAIL=... QA_PASSWORD=...  (destrava cenários logados)
python3 docs/regras-negocio/scripts/executar-feliz-excelencia-todos.py
```

## Artefatos

| Arquivo | Conteúdo |
| --- | --- |
| `metricas-reais-511/metricas-reais-511.csv` | **511 linhas** — um cenário cada |
| `metricas-reais-511/metricas-reais-511.html` | Dashboard PASS / FAIL / PENDENTE_QA_HUMANO |
| `metricas-reais-511/*.json` | Por tela |

## Vereditos

| Veredito | Significado |
| --- | --- |
| **PASS** | Passos automatizados confirmaram (clique, ordem, h1, em alta, etc.) |
| **FAIL** | Divergência reproduzível — **fila DEV** após TL |
| **PENDENTE_QA_HUMANO** | QA sênior **obrigado** a fechar na [`QA-EXECUCAO-HUMANA-511.csv`](./QA-EXECUCAO-HUMANA-511.csv) com print |

## Meta PO

`PENDENTE_QA_HUMANO` → **0** na planilha humana validada pelo TL.  
`PASS` humano + automatizado = cobertura real; **FAIL** confirmados = bugs reais.

## Supervisor IA (após o robô)

```bash
python3 docs/regras-negocio/scripts/gerar-fila-supervisor-qa.py
```

Detalhes: [`QA-SUPERVISOR-IA.md`](./QA-SUPERVISOR-IA.md).
