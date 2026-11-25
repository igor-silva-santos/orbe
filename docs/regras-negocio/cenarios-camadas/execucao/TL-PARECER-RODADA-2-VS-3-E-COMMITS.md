# Parecer TL — rodadas 2×3 iguais, commits DEV e expectativa do PO

**Solicitação do PO:** após aval para destravar bloqueios e DEV corrigir bugs, validar se **era esperado não mudar nada** no relatório automático.  
**Data do parecer:** 2026-09-22  
**TL QA / TL DEV:** _(preencher e assinar §6)_

---

## 1. Fato verificado (objetivo)

| Verificação | Resultado |
| --- | --- |
| Comparação **cenário a cenário** `prod-rodada-2` vs `prod-rodada-3` | **0** mudanças de `PASS` / `FAIL` / `BLOQUEADO` em **511** IDs |
| Totais rodada 2 e 3 | 128 PASS · 253 FAIL · 130 BLOQUEADO (idênticos) |
| Deploy front #143 em produção | Confirmado (4× “Ver o que está em alta agora”, E2E local 2/2) |
| Commits de **app** na `master` entre rodada 2 e 3 | **Nenhum** novo fix de produto — apenas docs/QA (#144, #145) |

**Conclusão factual:** o **runner automático** não registrou melhora alguma entre rodadas 2 e 3. Isso é **coerente** com o que foi mergeado e com o desenho do script — **não prova** que DEV não corrigiu nada útil, **nem prova** que os 253 FAIL foram todos resolvidos.

---

## 2. O que o PO esperava vs o que o pipeline mede

| Expectativa do PO | O que rodada 2→3 mede |
| --- | --- |
| Destravar **BLOQUEADO** (conta QA, dados) | Runner continua **anônimo** → 130 BLOQUEADO **inalterados** |
| DEV corrigir **bugs** dos 253 FAIL | Runner usa **keywords no `body`** sem cliques/login → **253 FAIL** inalterados |
| “Resolver” após aval | Exige **QA humano** + planilha carrossel/mídia + backlog com bug **confirmado** |

**Resposta direta à pergunta do PO:**  
**Sim, era esperado o relatório automático não mudar** se:

1. Não houve novo merge de código além do #143 **antes** da rodada 3, e  
2. Ninguém reexecutou os 130 BLOQUEADO **logado**, e  
3. Os “bugs corrigidos” pelos DEV **não eram** do tipo que o `executar-feliz-lote.py` detecta.

**Não** era expectativa realista que **253 FAIL** caíssem só com o escopo do **PR #143** — isso já estava documentado em [`DEV-CORRECOES-TL-AUDITORIA.md`](./DEV-CORRECOES-TL-AUDITORIA.md) §4 (“maioria ainda exige runner manual ou QA humano”).

---

## 3. Auditoria dos commits (TL DEV)

### 3.1 Único fix de produto relevante: **PR #143** (`9235a56`)

| Escopo real | Impacto no CSV 511 Feliz |
| --- | --- |
| Copy/a11y **Em alta**, bootstrap animes, drawers Filmes/Séries, metadata, refetch SSR vazio | **Não** altera contagem de keywords do runner na maioria dos cenários |
| E2E Playwright `home-carousels` | **Passa** localmente; **não** alimenta `relatorio-feliz-*.csv` |

**Autor do commit no Git:** `Cursor Agent` (Co-authored-by Igor). Para auditoria de governança, TL DEV pode exigir commits futuros só com **`igor-silva-santos <igordasailvasantos38@gmail.com>`** conforme política do PO.

### 3.2 O que **não** entrou na `master` (e explicaria números iguais)

- Nenhum PR DEV adicional tratando itens do [`DEV-BACKLOG-FAIL-RODADA-2.csv`](./DEV-BACKLOG-FAIL-RODADA-2.csv) com `Status_DEV = Corrigido`.
- Nenhuma alteração no runner (login `QA_EMAIL`/`QA_PASSWORD`, cliques, asserções negativas).
- Nenhuma rodada manual consolidada substituindo FAIL/BLOQUEADO no CSV oficial.

### 3.3 Commits entre rodadas 2 e 3 (só documentação)

#144, #145 — inventário QA, rodada 3 JSON/CSV. **Correto:** não devem mudar comportamento do site.

---

## 4. Auditoria dos testes (TL QA)

| Pergunta TL | Veredito sugerido |
| --- | --- |
| Rodada 3 invalida o trabalho DEV? | **Não** — métrica errada para validar fix de bug |
| Rodada 3 prova que nada foi corrigido? | **Não** — #143 melhora UX/E2E; runner é cego a isso |
| 253 FAIL são 253 bugs abertos? | **Não** — TL deve aplicar [`QA-TL-RUIDO-VS-BUG.md`](./QA-TL-RUIDO-VS-BUG.md); amostra HOME 15/15 ruído |
| 130 BLOQUEADO são falha DEV? | **Não** — falta **conta QA** e dados; playbook §1 |
| PO pode entrar em teste manual agora? | **Só após** QA humano (carrosséis + mídias) + TL assinar §6 |

---

## 5. Ações obrigatórias (para alinhar PO, QA e DEV)

1. **TL QA:** marcar no backlog quantos dos 253 FAIL viraram **Ruído** vs **Bug confirmado** (meta: não escalar ruído ao DEV).
2. **TL DEV:** auditar **#143** com checklist em `DEV-CORRECOES-TL-AUDITORIA.md` §3 — aprovar ou pedir ajuste **sem** prometer queda no CSV automático.
3. **QA:** executar §2 do [`QA-PLAYBOOK-EQUIPE.md`](./QA-PLAYBOOK-EQUIPE.md) (carrosséis + mídias, conta própria) e **novo CSV humano** — não só `executar-feliz-multitask`.
4. **Métrica de sucesso pós-aval:** redução de **bugs confirmados** no backlog + BLOQUEADO reexecutados logados — **não** delta do runner anônimo.
5. **Opcional engenharia:** rodada 4 com login no script ou importar resultados manuais para `prod-rodada-4-manual.csv`.

---

## 6. Assinatura TL

| Papel | Nome | Data | Decisão |
| --- | --- | --- | --- |
| TL QA | | | Rodada 2=3 no automático é **esperado** / **inaceitável** (marcar um) |
| TL DEV | | | PR #143 **aprovado** / **ajuste**; backlog DEV **N** itens reais |
| PO informado | Igor | | Próximo gate: QA humano antes de teste manual PO |

---

## 7. Mensagem única para o PO (copiar)

> Os números 128/253/130 **repetirem** na rodada 3 **não significa** que DEV ignorou o aval. Significa que o **teste automático anônimo** não mede login, carrossel clicado nem curadoria de título. O **#143** está em prod e corrige pontos reais (Em alta, animes, listagens). O próximo ganho vem do **QA testando carrosséis e mídias** e do TL separando **ruído** de **bug** no backlog — não de rodar de novo o mesmo script sem conta.
