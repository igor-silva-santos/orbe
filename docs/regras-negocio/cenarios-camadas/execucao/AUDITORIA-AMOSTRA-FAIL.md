# Amostra — triagem de FAIL (runner produção)

**Contexto:** o runner `executar-feliz-lote.py` usa keywords no DOM; muitos FAIL são **falsos positivos** quando a regra exige título específico, estado de carrossel ou texto que não aparece no `innerText` agregado.

## Padrões observados

| Padrão | Ação QA | Ação TL |
| --- | --- | --- |
| Regra com “comparar título X vs Y” | Reexecutar manual com dado conhecido | Aceitar reclassificação para BLOQUEADO se dado indisponível |
| Regra de modal sem clique no card certo | Reexecutar abrindo modal da mídia correta | Validar evidência com print |
| Regra de busca/header | Confirmar se busca foi aberta antes do passo | FAIL confirmado se busca não responde |
| Home — ordem de seções / carrossel | Rolar e inspecionar visualmente | FAIL só se ordem realmente invertida |

## Recomendação TL

1. Não tratar os **271 FAIL** como bugs sem revisão manual.
2. Priorizar reexecução dos **112 BLOQUEADO** com credenciais de teste.
3. Amostrar 26 cenários `FAIL` (5%) e marcar no CSV `TL_Auditoria` da execução.

Lista completa de FAIL: coluna `Resultado=FAIL` em [`relatorio-feliz-producao.csv`](./relatorio-feliz-producao.csv).
