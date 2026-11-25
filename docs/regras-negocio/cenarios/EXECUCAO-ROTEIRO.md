# Roteiro de execução — 511 cenários

**Ambiente padrão:** https://orbe-seven.vercel.app (demo)  
**Planilha:** [`cenarios-teste.csv`](../cenarios-teste.csv) · **Markdown:** [`cenarios-teste.md`](../cenarios-teste.md)

## Ordem sugerida

1. **Smoke por tela** (1º cenário de cada `Arquivo_Inventario`) — ~12 testes
2. **Bloco completo** por QA dono da tela (ver `QA-PROCESSO-CENARIOS.md`)
3. **Regressão** — cenários `TL_Auditoria = Aprovado` apenas

## Lotes para paralelizar no time (multitask humano)

| Lote | Arquivo gerado | Qtd | Responsável |
| --- | --- | ---: | --- |
| L1 | `generated/01-HOME.md` | 77 | |
| L2 | `generated/02-FILMES.md` | 68 | |
| L3 | `generated/03-SERIES.md` | 62 | |
| L4 | `generated/04-ANIMES.md` … `07-HOJE.md` | 108 | |
| L5 | `generated/08-MODAIS.md` | 48 | |
| L6 | `generated/09-BUSCA-HEADER.md` … `12-OUTRAS-TELAS.md` | 148 | |

## Colunas na execução (adicionar na planilha ou log)

| Execucao_Resultado | PASS / FAIL / BLOQUEADO / NÃO EXECUTADO |
| Execucao_Data | |
| Execucao_Evidencia | link print / passo que falhou |

## Automação local (opcional)

```bash
# Regenerar markdown + CSV a partir das regras
python3 docs/regras-negocio/scripts/gerar-cenarios-de-regras.py

# Cobertura mínima 511/511
python3 docs/regras-negocio/scripts/validar-cobertura-cenarios.py
```
