# Relatório QA sênior — 511 cenários Feliz em produção

**Data da rodada:** 2026-09-22  
**URL:** https://orbe-seven.vercel.app  
**Executor:** multitask — 12 lotes (`executar-feliz-lote.py`, Playwright headless, sessão anônima)

## Resumo executivo

Consulte números atualizados em [`relatorio-feliz-producao.html`](./relatorio-feliz-producao.html) e [`relatorio-feliz-producao.csv`](./relatorio-feliz-producao.csv).

| Resultado | Significado para o time |
| --- | --- |
| **PASS** | Evidência automática ou texto esperado encontrado na tela |
| **FAIL** | Divergência detectada pelo runner (revisar manualmente — pode haver falso positivo) |
| **BLOQUEADO** | Login ou dado de catálogo necessário; QA deve reexecutar com pré-condição |

## Por tela (arquivo de manifest)

| Lote | Arquivo | PASS | FAIL | BLOQUEADO |
| --- | --- | ---: | ---: | ---: |
| L1 | 01-HOME | 22 | 37 | 18 |
| L2 | 02-FILMES | 16 | 29 | 23 |
| L3 | 03-SERIES | 3 | 38 | 21 |
| L4 | 04-ANIMES | 4 | 12 | 4 |
| L5 | 05-JOGOS | 3 | 18 | 8 |
| L6 | 06-PROMOCOES | 2 | 30 | 3 |
| L7 | 07-HOJE | 10 | 5 | 9 |
| L8 | 08-MODAIS | 17 | 18 | 13 |
| L9 | 09-BUSCA-HEADER | 11 | 19 | 0 |
| L10 | 10-MINHA-LISTA | 14 | 12 | 13 |
| L11 | 11-AUTH-PERFIL | 11 | 7 | 12 |
| L12 | 12-OUTRAS-TELAS | 15 | 28 | 6 |
| | **Total** | **128** | **253** | **130** |

*(Totais desta rodada; validar soma 511 no CSV consolidado.)*

## Próximas ações do QA

1. Reexecutar manualmente todos os **BLOQUEADO** com contas e dados de teste.
2. Triagem dos **FAIL** com base em `AUDITORIA-AMOSTRA-FAIL.md` (falso positivo vs bug).
3. Auditor TL aplicar [`AUDITORIA-TL-EXECUCAO.md`](./AUDITORIA-TL-EXECUCAO.md).

## Comandos

```bash
# Reexecutar todos os lotes em produção
python3 docs/regras-negocio/scripts/executar-feliz-todos.py
python3 docs/regras-negocio/scripts/merge-execucao-producao.py
```
