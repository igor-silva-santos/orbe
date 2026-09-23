# Meta QA — 511 cenários Feliz com excelência (obrigatório do time)

**Autoridade:** PO (Igor)  
**Público:** QA sênior, revisor par, TL QA  
**Produção:** https://orbe-seven.vercel.app  

---

## 1. O que o PO **não** aceita como “rodada concluída”

| Não aceito | Por quê |
| --- | --- |
| Parar nos **128 / 253 / 130** do `executar-feliz-multitask.py` | Isso é **smoke anônimo por keyword**, não execução dos 511 Feliz |
| Tratar **253 FAIL** do runner como “falha final” | Maioria é **ruído** até QA humano seguir os passos |
| Deixar **130 BLOQUEADO** sem reexecutar | PO autorizou **conta QA própria** (sem e-mail de confirmação) — bloqueio por “anônimo” **não conta** |
| Liberar teste manual do PO antes do time fechar os 511 | Gate em [`QA-TL-RUIDO-VS-BUG.md`](./QA-TL-RUIDO-VS-BUG.md) |

**Você não precisa se contentar com 128 PASS.** Esse número **não é a meta do projeto** — é um artefato do script.

---

## 2. O que “excelência” significa (511 Feliz)

**Meta = 511 / 511 cenários `CT-*-F` executados pelo QA humano**, cada um com:

| Campo | Exigência |
| --- | --- |
| Passos | Seguidos como em `cenarios-teste-camadas.csv` (camada **Feliz**) |
| Evidência | Print, vídeo curto ou nota reproduzível (data, navegador, conta) |
| Veredito | **PASS** (comportamento bate com `Resultado_Esperado`) **ou** **FAIL** (bug real, com `ID_Regra`) **ou** **BLOQUEADO** (só com impedimento **documentado** e aceito pelo TL — ex.: dado de catálogo inexistente em prod) |
| Carrosséis | Além do Feliz: planilha mídia/carrossel ([`QA-PLAYBOOK-EQUIPE.md`](./QA-PLAYBOOK-EQUIPE.md) §2) |

**Excelência ≠ forçar 511 PASS** se o produto estiver errado — excelência = **verdade + cobertura total + zero preguiça no runner**.

Expectativa realista após QA humano bem feito:

- **BLOQUEADO** → cai para **poucos** (só impedimentos reais de ambiente/dado).
- **FAIL do runner** → muitos viram **PASS**; os que permanecerem **FAIL** são **fila DEV** com TL.
- **PASS** → sobe muito acima de 128.

---

## 3. O time **pode** e **deve** refazer até fechar os 511

O PO já explicou aos agentes / QA sênior: **dá para seguir** — a planilha e os `generated/*.md` existem para isso.

### Divisão mínima (12 lotes = 511)

| Lote | Arquivo | Feliz | QA dono (preencher) |
| --- | --- | ---: | --- |
| L1 | `01-HOME` | 77 | |
| L2 | `02-FILMES` | 68 | |
| L3 | `03-SERIES` | 62 | |
| L4 | `04-ANIMES` … `07-HOJE` | 108 | |
| L5 | `08-MODAIS` | 48 | |
| L6 | `09-BUSCA-HEADER` … `12-OUTRAS` | 148 | |

**Cada QA:** conta criada em prod → executa **todos** os Feliz do lote → preenche planilha de execução humana (§4) → revisor par → TL.

**Reexecução:** quantas rodadas forem necessárias até **511 linhas com veredito humano** — não até o script repetir 128.

---

## 4. Planilha oficial de execução humana (substitui o runner como gate)

Duplicar modelo: **`QA-EXECUCAO-HUMANA-511.csv`** (criar a partir do merge abaixo).

Colunas:

`ID_Cenario`, `ID_Regra`, `QA_Executor`, `Data`, `Conta_QA`, `Veredito_Humano` (PASS|FAIL|BLOQUEADO), `Evidencia`, `TL_Validado` (S/N), `Observacao`

**Gate PO:** `COUNT(Veredito_Humano preenchido) = 511` e `COUNT(BLOQUEADO sem doc TL) = 0`.

Gerar base:

```bash
python3 docs/regras-negocio/scripts/gerar-planilha-execucao-humana.py
```

---

## 5. Métricas reais (passo a passo — usar esta)

```bash
python3 docs/regras-negocio/scripts/executar-feliz-excelencia-todos.py
```

Saída: [`METRICAS-REAIS-LEIA-ME.md`](./METRICAS-REAIS-LEIA-ME.md) · `metricas-reais-511/`

| Veredito | Ação QA |
| --- | --- |
| PASS | TL pode amostrar; opcional reconfirmar |
| FAIL | TL → DEV se confirmado |
| PENDENTE_QA_HUMANO | **QA executa manualmente** e preenche planilha humana |

O runner `executar-feliz-multitask.py` (128/253/130) está **obsoleto** como métrica de conclusão.

### Robô + supervisor IA (obrigatório na visão PO)

O robô sozinho **não fecha** os 511. Use o fluxo em **[`QA-SUPERVISOR-IA.md`](./QA-SUPERVISOR-IA.md)**:

1. `executar-feliz-excelencia-todos.py` → métricas  
2. `gerar-fila-supervisor-qa.py` → fila priorizada  
3. **IA / QA sênior** reexecuta, corrige vereditos do robô, grava `QA-EXECUCAO-HUMANA-511.csv` via `supervisor-qa-registrar.py`

---

## 6. TL — bloquear liberação ao PO se

- [ ] Menos de **511** linhas na execução humana  
- [ ] QA não testou carrosséis + mídias (playbook §2)  
- [ ] FAIL humano sem `ID_Regra` ou evidência  
- [ ] BLOQUEADO por “não logamos” sem tentativa com conta QA  

---

## 7. Mensagem do PO ao time QA sênior

> Refaçam até **cobrir os 511 Feliz com excelência humana**. O 128 do robô é irrelevante. Conta própria, passos da planilha, carrosséis e mídias. Só me chamem quando o TL assinar os 511 executados — aí sim vejo se o produto merece aprovação final.
