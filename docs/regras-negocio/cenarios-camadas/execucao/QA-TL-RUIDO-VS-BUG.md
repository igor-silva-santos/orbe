# TL QA — separar ruído de bug

**Público:** TL sênior QA (auditoria antes do teste manual do PO).  
**Princípio:** só escala **bug de produto** para DEV com reprodução humana e `ID_Regra` citada.

**Carrosséis e mídias nos carrosséis** são validados **pelo QA humano** (playbook §2) — o runner não substitui essa etapa. FAIL de keyword sem auditoria de card/mês = ruído até o QA registrar S/N na planilha de carrossel.

---

## 1. Matriz de decisão

| Situação | Veredito | Ação |
| --- | --- | --- |
| Runner `Keywords (0/n)` sem clique/login; humano **confirma** comportamento OK | **Ruído** | Status `Falso-positivo`; não abrir ticket DEV |
| Runner FAIL; humano **não** reproduz | **Ruído** | Idem |
| `BLOQUEADO` “sessão anônima”; QA logado **confirma** PASS | **Ruído (runner)** | Reexecutar e atualizar CSV |
| `BLOQUEADO` “dado catálogo”; QA com título âncora **confirma** PASS/FAIL | **Resultado real** | FAIL → DEV com regra + print |
| Auditoria 1 mês carrossel: título que **viola** regra escrita | **Bug** | DEV + `RN-FILMES-*` / `RN-HOME-*` |
| Auditoria: título **ausente** mas regra exige presença | **Bug** | DEV |
| Divergência home vs `/filmes` documentada com mesmo título | **Bug** (se regra exige paridade) | Ver `RN-FILMES-053`… |
| Conta QA criada; fluxo cadastro sem e-mail quebra | **Bug** se travar UX | `RN-AUTH-*` |
| Exploratório: achado sem regra ligada | **Melhoria / backlog** | Não misturar com FAIL Feliz |

---

## 2. Ruído conhecido (não escalar como bug)

| Fonte | Por quê |
| --- | --- |
| `executar-feliz-lote.py` | Só texto no `body`; sem modais, busca, filtros, segunda aba |
| Frase do CSV ≠ copy da UI | Ex.: “Botão Todos os Filmes destacado” vs label “Todos os Filmes” |
| 18 HOME FAIL→BLOQUEADO na rodada 2 | Heurística “dado pesado” após scroll — exige confirmação manual |
| Amostra 15 FAIL HOME | Ver [`AUDITORIA-AMOSTRA-FAIL.md`](./AUDITORIA-AMOSTRA-FAIL.md) — 15/15 falso-positivo provável |

---

## 3. Bug provável (escalar DEV)

| Sinal | Exemplo |
| --- | --- |
| E2E Playwright falha após merge | 4 botões “em alta” (já corrigido #143 — revalidar) |
| QA logado reproduz em 2 navegadores | Minha lista vazia com itens na API |
| Lista do mês com título **claramente** fora da curadoria | Planilha auditoria carrossel §2 do playbook |
| Erro 500 / tela branca / link morto | Evidência com URL e hora |

---

## 4. Gate para teste manual do PO (Igor)

TL só libera quando **todos** abaixo estiverem true:

- [ ] Cada QA concluiu divisão de telas (Feliz mínimo da planilha baseline ou camadas, conforme combinado).
- [ ] **≥ 1 mês** de carrossel Filmes auditado pelo time (consolidado, sem contradição grave entre QAs).
- [ ] Todo `FAIL` restante tem veredito TL: **Bug confirmado** (ticket) ou **Ruído** (documentado).
- [ ] `BLOQUEADO` reexecutado com **conta QA** onde aplicável.
- [ ] Registro assinado:

| Campo | Valor |
| --- | --- |
| TL QA | |
| Data | |
| FAIL confirmados (qtd) | |
| Ruído arquivado (qtd) | |
| PO liberado para teste manual | Sim / Não |

---

## 5. Comunicação com DEV

- Só itens **Bug confirmado** vão para [`DEV-BACKLOG-FAIL-RODADA-2.csv`](./DEV-BACKLOG-FAIL-RODADA-2.csv) com `Status_DEV = Confirmado` e link do print.
- Ruído **não** entra na fila DEV — evita os 253 FAIL virarem 253 PRs.
