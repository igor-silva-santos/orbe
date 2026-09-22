# Playbook QA sênior — execução em equipe (antes do teste manual do PO)

**Versão:** 1.1 · **2026-09-22**  
**Produção:** https://orbe-seven.vercel.app  
**Ordem de gate:** QA time (cenários + **carrosséis e mídias nos carrosséis**) → **só então** teste manual do Igor / PO.

---

## 1. Contas de teste (sem e-mail de confirmação)

O produto **não envia e-mail de confirmação** no cadastro. Cada QA sênior:

1. Cria **a própria conta** em produção (Inscreva-se) com e-mail que o QA controla.
2. **Não** commitar senhas no repositório.
3. Usar a conta nos cenários Feliz que exigem login e ao validar carrosséis logado (continuar assistindo, pins de anime, etc.).
4. Reexecutar manualmente o que o runner marcou `BLOQUEADO` por sessão anônima.

---

## 2. Responsabilidade do QA: carrosséis **e** mídias exibidas

**Quem testa carrossel e cada mídia que aparece nele é o próprio time QA** — não o runner automático, não o PO nesta fase.

### 2.1 O que é “testar o carrossel”

Para cada faixa na **home** (e equivalentes em `/filmes`, `/series`, `/animes`, `/jogos` quando a regra mandar):

| Verificação | Exemplos de regra |
| --- | --- |
| Controles (botões, em alta, calendário/lista em animes, rolagem rápida, filtros) | `RN-HOME-EA-*`, `RN-HOME-AC-*`, `RN-HOME-TL-*` |
| Título do bloco / mês / temporada | `RN-HOME-AC-003`, posicionamento inicial |
| Navegação (setas, loop, ir ao “hoje”) | `RN-HOME-TL-*` |
| Link do título da faixa → listagem | `RN-HOME-002` |
| Comportamento com e sem login | `RN-HOME-CA-*` |

Registrar **PASS/FAIL** por comportamento observado (print ou passo curto), citando `RN-*`.

### 2.2 O que é “testar as mídias no carrossel”

Para **cada card visível** no período auditado (mínimo **1 mês** por faixa de Filmes que o QA assumir; demais faixas conforme divisão do time):

| Verificação | O quê anotar |
| --- | --- |
| Identificação | Título (e data no card, se houver) |
| **Deve estar aqui? (S/N)** | Confrontar `regras-negocio-qa.md` / CSV (curadoria, nota, cartaz, duração home, etc.) |
| Se **N** | Qual `RN-*` explica a exclusão esperada; se ainda aparece → **bug** |
| Se **S** mas sumiu noutra área | Comparar home vs listagem quando a regra exige (`RN-FILMES-053`, `RN-ANIMES-016`, …) |
| Card íntegro | Pôster, texto legível, clique abre modal (amostra por faixa) |

**Planilha:** [`QA-AUDITORIA-CARROSSEL-TEMPLATE.csv`](./QA-AUDITORIA-CARROSSEL-TEMPLATE.csv) — uma linha por **mídia** (e linhas extras para comportamento do carrossel se preferir aba separada).

### 2.3 Divisão sugerida entre QAs

| Faixa / carrossel | QA (nome) | Mês ou janela auditada | Arquivo inventário |
| --- | --- | --- | --- |
| Home — **Filmes** | | ≥ 1 mês civil | `01-HOME` + `02-FILMES` |
| Home — **Séries** | | ≥ 1 mês | `01-HOME` + `03-SERIES` |
| Home — **Animes** | | 1 temporada ou agenda semanal (modo atual) | `01-HOME` + `04-ANIMES` |
| Home — **Jogos** | | ≥ 1 mês ou modo em alta | `01-HOME` + `05-JOGOS` |

TL evita dois QAs no mesmo mês da mesma faixa sem combinar; consolida CSVs em um relatório por faixa.

### 2.4 Modelo de linha (mídia)

```
Faixa: Filmes | Mês: 2026-03 | Título: … | Data card: … | Deve estar: N | RN-FILMES-041 | Carrossel OK: S | Notas: …
```

---

## 3. Ordem de execução (time QA)

1. Criar conta em prod.
2. Cenários **Feliz** (`CT-*-F`) da divisão de tela.
3. **Carrossel da faixa** (comportamento §2.1).
4. **Listagem das mídias** na janela acordada (§2.2).
5. Camadas Negativo / Exploratório na mesma área.
6. Revisor par → TL ([`QA-TL-RUIDO-VS-BUG.md`](./QA-TL-RUIDO-VS-BUG.md)) → liberar PO.

O runner (`executar-feliz-multitask.py`) é **apoio**; **não** substitui §2.1 e §2.2.

---

## 4. O que registrar

| Artefato | Conteúdo |
| --- | --- |
| `QA-AUDITORIA-CARROSSEL-<faixa>-<mes>.csv` | Mídias + deve estar S/N |
| Log opcional `QA-CARROSSEL-COMPORTAMENTO-<faixa>.md` | Botões, em alta, scroll, mês |
| `DEV-BACKLOG-FAIL-RODADA-2.csv` | Só FAIL **confirmados** pelo QA (TL filtra ruído) |

---

## 5. Referências

- Regras: `regras-negocio-qa.md` · `telas/01-HOME.md`
- Cenários: `cenarios-teste-camadas.csv`
- DEV: [`DEV-RETORNO-QA-FAIL.md`](./DEV-RETORNO-QA-FAIL.md)
