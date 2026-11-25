# QA 511 — Robô + supervisor IA (QA sênior)

**Autoridade:** PO (Igor)  
**Produção:** https://orbe-seven.vercel.app  

O runner `executar-feliz-excelencia-todos.py` é **pré-triagem**, não gate de conclusão. A meta PO exige **raciocínio de QA**: validar passos do CSV, catálogo, carrosséis, modais e conta logada — e **corrigir** quando o robô errar ou parar cedo.

---

## 1. Papéis

| Papel | Responsabilidade |
| --- | --- |
| **Robô** | Executa os 511 Feliz em lote (Playwright), gera `metricas-reais-511/` |
| **Supervisor IA** | Lê métricas + regras, **audita** cada FAIL/PENDENTE/PASS suspeito, reexecuta no browser, decide PASS/FAIL/BLOQUEADO, grava evidência e atualiza `QA-EXECUCAO-HUMANA-511.csv` |
| **TL QA** | Amostra, valida `TL_Validado=S`, libera PO |

O robô **não substitui** o supervisor. Se o robô marcou PASS mas o passo pede comparar título no carrossel 2027, a IA **reabre o caso** e executa ela mesma.

---

**Runbook IA autônoma (sync → E2E → robô → pacote):** `RUNBOOK-IA-AUTONOMA-511.md` na mesma pasta.

## 2. Fluxo recomendado (uma rodada)

```bash
# 1) Pré-triagem automatizada (conta descartável opcional)
export QA_AUTO_REGISTER=1   # opcional
python3 docs/regras-negocio/scripts/executar-feliz-excelencia-todos.py

# 2) Fila priorizada para o supervisor IA
python3 docs/regras-negocio/scripts/gerar-fila-supervisor-qa.py

# 3) Supervisor IA (Cursor Cloud Agent / QA sênior + browser)
#    — processar supervisor-fila-qa.json por prioridade
#    — para cada item: seguir Passos + Resultado_Esperado em cenarios-teste-camadas.csv
#    — screenshot em docs/regras-negocio/cenarios-camadas/execucao/evidencias/<ID_Cenario>/

# 4) Registrar veredito humano (IA ou QA)
python3 docs/regras-negocio/scripts/supervisor-qa-registrar.py \
  --id CT-RN-HOME-003-F --veredito PASS --evidencia "evidencias/CT-RN-HOME-003-F.png" \
  --executor "Supervisor IA" --conta "qa-auto@..."

# 5) TL revisa planilha até COUNT(Veredito_Humano)=511
```

Artefatos da fila: `execucao/supervisor-fila-qa.json` e `execucao/supervisor-fila-qa.md` (checklist legível).

---

## 3. Prioridade da fila (supervisor)

| Ordem | Origem no CSV de métricas | Ação da IA |
| ---: | --- | --- |
| 1 | **FAIL** | Reproduzir; se robô errado (ex.: modal sem abrir card) → corrigir fluxo ou marcar bug real |
| 2 | **PENDENTE_QA_HUMANO** + tipo `catalogo` / `catalogo_ui` | Obrigatório executar passos completos (carrossel, título, mês/ano) |
| 3 | **PENDENTE** + `manual_obrigatorio` | Smoke OK do robô — IA confirma regra na UI |
| 4 | **PASS** com passos frágeis (modais, carrossel, comparar) | Amostragem: revalidar ~10% ou todos os FAIL históricos |

**Regra de ouro:** divergência entre robô e regra de negócio → **prevalece a regra** (`cenarios-teste-camadas.csv` + `generated/*.md`).

---

## 4. Quando marcar BLOQUEADO (poucos casos)

Use **BLOQUEADO** só com impedimento **objetivo** e aceito pelo TL, por exemplo:

- Dado de catálogo **inexistente em produção** após sync (não é bug de UI).
- API de terceiros fora (TMDB/IGDB) com evidência de indisponibilidade.

Exemplo documentado: carrossel **2027** com um único título em produção — ver [`CARROSSEL-LANCAMENTO-FILMES-AUDIT.md`](./CARROSSEL-LANCAMENTO-FILMES-AUDIT.md) §2027.

---

## 5. Intervenções conhecidas do robô (TL → DEV ou IA corrige na hora)

| Sintoma | Causa provável | Supervisor |
| --- | --- | --- |
| 48× FAIL `08-MODAIS` “Clique sem modal visível” | Clique no primeiro link sem garantir card/modal | IA abre card correto; se modal não abre → **FAIL** real |
| PASS em HOME só por índice de botões | Não valida conteúdo do carrossel | IA navega mês/ano e compara com esperado |
| PENDENTE em “comparar título” | Robô não tem dado | IA usa API `/api/filmes/...` + UI |

---

## 6. Prompt mínimo para agente supervisor (copiar)

```text
Você é QA sênior do Orbe. Base: https://orbe-seven.vercel.app
Leia supervisor-fila-qa.json (prioridade 1 = FAIL).
Para cada cenário: ID_Cenario, passos e resultado esperado no JSON.
1) Reproduza no browser (conta QA se necessário).
2) Compare com o esperado; capture evidência.
3) Se o robô marcou FAIL mas o produto está certo, registre PASS com nota.
4) Se o robô marcou PASS mas falhou o esperado, registre FAIL.
5) Use supervisor-qa-registrar.py para gravar em QA-EXECUCAO-HUMANA-511.csv.
Não aceite 128 PASS do runner antigo como meta; meta = 511 vereditos humanos/IA validados.
```

---

## 7. Console do navegador (obrigatório)

O PO reportou títulos em `/filmes` com posters quebrados e ruído de WebSocket — o supervisor **deve** triar o console antes de concluir FAIL de carrossel.

Guia: **[`QA-CONSOLE-TRIAGEM.md`](./QA-CONSOLE-TRIAGEM.md)**  
Script lista vs home: `python3 docs/regras-negocio/scripts/auditar-filmes-vs-carrossel.py`

---

## 8. Relação com outros docs

- Meta PO: [`QA-META-511-EXCELENCIA.md`](./QA-META-511-EXCELENCIA.md)
- Métricas robô: [`METRICAS-REAIS-LEIA-ME.md`](./METRICAS-REAIS-LEIA-ME.md)
- Planilha gate: [`QA-EXECUCAO-HUMANA-511.csv`](./QA-EXECUCAO-HUMANA-511.csv)
