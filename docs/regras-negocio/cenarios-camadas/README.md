# Pacote de cenários em camadas (Feliz · Negativo · Exploratório)

Este pacote é **independente** do baseline oficial de **511** cenários em [`../cenarios-teste.csv`](../cenarios-teste.csv).

## Objetivo

Para **cada** regra `RN-*` do inventário:

| Sufixo | Camada | Tipo | Quando executar |
| --- | --- | --- | --- |
| `CT-{ID}-F` | Feliz | Funcional manual | Primeiro — confirma a regra no caminho principal |
| `CT-{ID}-N` | Negativo | Funcional manual | Em seguida — condição oposta, limite, ausência de dado |
| `CT-{ID}-E` | Exploratório | Exploratório guiado | Após F e N na mesma área — charter 15 min + hipóteses |

**Total:** 511 regras × 3 = **1533** linhas na planilha.

## Artefatos

| Arquivo | Uso |
| --- | --- |
| [`cenarios-teste-camadas.csv`](./cenarios-teste-camadas.csv) | Planilha completa (UTF-8 BOM) |
| [`cenarios-teste-camadas.md`](./cenarios-teste-camadas.md) | Índice e convenções |
| [`generated/`](./generated/) | Markdown por tela (F+N+E agrupados por regra) |

## Regenerar

```bash
python3 docs/regras-negocio/scripts/gerar-cenarios-camadas.py
python3 docs/regras-negocio/scripts/validar-cobertura-camadas.py
```

## Qualidade

Linhas geradas automaticamente são **rascunho** (`Status_Elaboracao = Rascunho camadas`). QA sênior deve refinar negativos e charters antes da auditoria TL — especialmente regras de auth, busca e modais.

## Retorno QA → DEV (FAIL em produção)

| Documento | Uso |
| --- | --- |
| [`execucao/DEV-RETORNO-QA-FAIL.md`](./execucao/DEV-RETORNO-QA-FAIL.md) | Handoff para DEV analisar e corrigir erros |
| [`execucao/DEV-BACKLOG-FAIL-RODADA-2.csv`](./execucao/DEV-BACKLOG-FAIL-RODADA-2.csv) | 253 FAIL com prioridade e colunas de status/PR |

## Relação com o baseline 511

- **Baseline:** cobertura mínima auditável (1 cenário por regra).
- **Camadas:** suíte alvo para release; não substitui o baseline até o TL aprovar e o time decidir migração ou convivência.
