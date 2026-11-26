# Auditoria TL QA sênior — Cenários × regras de negócio

Use este documento **linha a linha** em `cenarios-teste.csv` quando `Status_Elaboracao = Pronto para TL`.

---

## 1. Critérios de saída da auditoria (release do pacote)

- [ ] **Cobertura:** 511/511 `ID_Regra` distintos com ≥1 cenário na planilha (`validar-cobertura-cenarios.py` sem erro).
- [ ] **Aprovação:** 100% das linhas com `TL_Auditoria = Aprovado` (ou impedimento formal aceito na seção 3).
- [ ] **Rastreio:** cada cenário referencia exatamente um `ID_Regra` existente no inventário.
- [ ] **Tela:** passos ocorrem na tela correta (sem misturar regra da Home com passos na página Filmes).
- [ ] **Executabilidade:** QA médio consegue rodar sem perguntar “o que é endpoint/cache/SSR”.

---

## 2. Checklist por cenário (marcar mentalmente ou em planilha auxiliar)

Para cada linha, o TL responde **Sim/Não**. Qualquer **Não** → `TL_Auditoria = Ajuste obrigatório` (ou `Reprovado` se grave).

| # | Critério | Pergunta do TL |
| --- | --- | --- |
| C1 | **Alinhamento à regra** | O `Resultado_Esperado` do cenário verifica o mesmo comportamento da regra (`Descrição` + `Resultado na tela`)? |
| C2 | **Tela correta** | Todos os passos acontecem na(s) tela(s) indicadas em `Tela_Resumo` / inventário? |
| C3 | **Testável** | Dá para executar em homologação com os `Dados_Conta_Ambiente` descritos? |
| C4 | **Passos completos** | Há pré-condição, passos numerados e resultado observável (não vago)? |
| C5 | **Sem impedimento oculto** | Se há bloqueio, está em `Impedimentos_Conhecidos` e há plano (dado de teste, outro ambiente, aceite)? |
| C6 | **Exploratório** | Se `Tipo_Testagem = Exploratório guiado`: charter, tempo, hipóteses e critério de encerramento estão claros? (`Exploratorio_Validado = Sim`) |
| C7 | **Não redundante** | Se há vários cenários para o mesmo `ID_Regra`, cada um cobre ângulo distinto (não copy-paste)? |
| C8 | **Negativo/positivo** | Quando a regra exige condição (logado, lista vazia, data futura), o cenário cria ou declara essa condição? |

**Decisão**

| TL_Auditoria | Quando |
| --- | --- |
| **Aprovado** | Todos C1–C8 Sim (ou N/A documentado). |
| **Ajuste obrigatório** | Falha em C1–C5 ou C8; devolver ao QA com `TL_Comentario` acionável. |
| **Reprovado** | Cenário testa comportamento errado ou contradiz a regra; reescrever do zero. |
| **Pendente** | Ainda não auditado. |

---

## 3. Impedimentos aceitos (exceções controladas)

O TL **não** aprova cenário vazio. Pode aceitar **sem execução em HML** apenas se:

1. `Impedimentos_Conhecidos` descreve o bloqueio (ex.: “não há título adulto em HML”).
2. Existe **ticket** ou decisão de produto registrada no comentário TL.
3. Há cenário **substituto** (outro dado que prove a mesma lógica) **ou** aceite explícito “não testável até DATA” com regra marcada para reteste.

Listar IDs em `QA-PROCESSO-CENARIOS.md` registro de cobertura.

---

## 4. Amostragem exploratória (TL)

Para ~10% dos cenários `Exploratório guiado` (mínimo 5 por release de pacote):

- TL executa a sessão ou observa QA executando.
- Confirma que achados possíveis **mapeiam de volta** ao `ID_Regra`.
- Se a sessão virar apenas “navegar à vontade”, devolver com **Ajuste obrigatório**.

---

## 5. Relatório resumido pós-auditoria (modelo)

```text
Auditoria TL — Cenários RN-*
Período: ___ a ___
Ambiente: ___
Cobertura: ___/511 regras
Cenários auditados: ___ linhas
Aprovados: ___ | Ajuste: ___ | Reprovados: ___
Impedimentos aceitos: [lista ID_Regra]
Pendências para próximo ciclo: ___
Assinatura TL: ___
```
