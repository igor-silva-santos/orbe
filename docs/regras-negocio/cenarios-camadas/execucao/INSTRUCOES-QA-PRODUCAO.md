# Execução — 511 cenários Feliz em produção

**URL:** https://orbe-seven.vercel.app  
**IDs:** `CT-{RN-*}-F` em `cenarios-teste-camadas.csv`

## Resultado por cenário

| Código | Significado |
| --- | --- |
| `PASS` | Resultado esperado confirmado na tela |
| `FAIL` | Comportamento diverge da regra |
| `BLOQUEADO` | Pré-condição impossível em produção (documentar) |

## Saída do executor

Gravar JSON em `execucao/prod/{arquivo-sem-md}.json`:

```json
{
  "arquivo": "01-HOME.md",
  "ambiente": "https://orbe-seven.vercel.app",
  "executor": "QA sênior / agente",
  "cenarios": [
    {
      "id": "CT-RN-HOME-001-F",
      "regra": "RN-HOME-001",
      "resultado": "PASS",
      "evidencia": "Ordem das seções conferida ao rolar",
      "testado_em": "2026-09-22T18:00:00Z"
    }
  ]
}
```

## Consolidar

```bash
python3 docs/regras-negocio/scripts/merge-execucao-producao.py
```

## Auditoria TL

Conferir amostra de `FAIL` e `BLOQUEADO`; validar que passos e evidência permitem reproduzir.
