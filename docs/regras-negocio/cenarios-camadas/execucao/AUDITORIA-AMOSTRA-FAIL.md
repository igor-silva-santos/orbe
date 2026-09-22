# Auditoria TL — amostra de FAIL (produção)

**Data da auditoria:** 2026-09-22  
**Ambiente:** https://orbe-seven.vercel.app  
**Fonte:** JSON em `execucao/prod/*.json` (12 arquivos, 511 cenários Feliz)  
**Executor registrado nos JSON:** `executar-feliz-lote (agente QA)` — runner heurístico Playwright (busca de keywords no texto da página, sem reproduzir passos manuais).

## Resumo consolidado da execução

| Resultado | Quantidade |
| --- | ---: |
| PASS | 128 |
| FAIL | 271 |
| BLOQUEADO | 112 |

Esta auditoria cobre os **15 primeiros cenários com `FAIL`**, na ordem de leitura dos JSON (`01-HOME.json` → … → `12-OUTRAS-TELAS.json`) e, dentro de cada arquivo, na ordem dos cenários.

## Critérios de classificação

| Veredito | Significado |
| --- | --- |
| **Falso-positivo provável (runner)** | A regra exige interação, sessão, segunda tela, scroll ou asserção de *ausência* que o runner não modela; o FAIL reflete limitação heurística, não evidência forte de bug. |
| **Falha real provável** | Mesmo com heurística fraca, o gap é plausível no produto ou o FAIL indica ausência de conteúdo central esperado após carga da rota. |

---

## Amostra — 15 primeiros FAIL

### 1. `CT-RN-HOME-002-F` — `RN-HOME-002`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Título da faixa leva à listagem |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Clicar nos títulos Filmes, Séries, Animes e Jogos e confirmar navegação para cada listagem.

**Veredito:** **Falso-positivo provável (runner)** — O runner só abre `/` e procura frases do resultado esperado no corpo estático; não executa cliques nem valida URL de destino. A ausência da frase longa “Ao clicar no título Filmes…” no DOM não prova links quebrados.

---

### 2. `CT-RN-HOME-AC-001-F` — `RN-HOME-AC-001`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Dois modos: estreias e semana |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Alternar botões calendário/lista na faixa Animes e observar mudança de modo e título.

**Veredito:** **Falso-positivo provável (runner)** — Requer interação na faixa Animes (toggle de modo). O runner não clica nem compara títulos antes/depois.

---

### 3. `CT-RN-HOME-AC-002-F` — `RN-HOME-AC-002`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Modo inicial automático |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Comparar modo inicial em duas datas da mesma temporada (comportamento de primeira visita vs preferência salva).

**Veredito:** **Falso-positivo provável (runner)** — Exige dois contextos temporais e estado de localStorage; nada disso é simulado.

---

### 4. `CT-RN-HOME-AC-003-F` — `RN-HOME-AC-003`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Estreias: temporada atual |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Copy do carrossel com nome da estação e ano (ex.: “Primavera 2026”).

**Veredito:** **Falso-positivo provável (runner)** — A keyword extraída provavelmente não coincide com o texto real do título (formatação distinta ou conteúdo abaixo da dobra sem scroll). Vale conferência manual na faixa Animes, mas o FAIL automático é fraco.

---

### 5. `CT-RN-HOME-AC-004-F` — `RN-HOME-AC-004`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Estreias: posição inicial |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Card central alinhado ao “próximo” anime na data de hoje.

**Veredito:** **Falso-positivo provável (runner)** — Julgamento visual/posicional no carrossel; heurística de texto não avalia qual card está centralizado.

---

### 6. `CT-RN-HOME-AC-005-F` — `RN-HOME-AC-005`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Agenda semanal: só com episódio marcado |
| **Evidência** | `Keywords (1/4): ['Terça']` |

**O que a regra pede:** Modo semana com separadores Segunda, Terça, … e cards por dia.

**Veredito:** **Falso-positivo provável (runner)** — Encontrou “Terça” (1/4 keywords), mas o limiar exige ≥34% de acertos; indício de que **parte da UI semanal pode existir**. FAIL por threshold, não por ausência total. Confirmação manual no modo semana ainda recomendada.

---

### 7. `CT-RN-HOME-AC-006-F` — `RN-HOME-AC-006`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Agenda: abrir no dia de hoje |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Ao entrar no modo semana, foco/scroll no separador do dia atual.

**Veredito:** **Falso-positivo provável (runner)** — Depende de ativar modo semana e inspecionar foco visual; não automatizado.

---

### 8. `CT-RN-HOME-AC-008-F` — `RN-HOME-AC-008`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Em alta em animes |
| **Evidência** | `Keywords (0/2): []` |

**O que a regra pede:** Toggle “Em alta” na faixa Animes e lista por popularidade.

**Veredito:** **Falso-positivo provável (runner)** — Exige acionar toggle; texto genérico “lista por popularidade” não aparece literalmente na página.

---

### 9. `CT-RN-HOME-AC-009-F` — `RN-HOME-AC-009`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Fixar na semana (logado) |
| **Evidência** | `Keywords (0/2): []` |

**O que a regra pede:** Menu ⋮ com opção de pin e ícone no card para usuário autenticado.

**Veredito:** **Falso-positivo provável (runner)** — Pré-condição é sessão logada; o runner home roda anônimo (regra não está na lista que marca BLOQUEADO). FAIL esperado pela heurística, não prova de regressão.

---

### 10. `CT-RN-HOME-CA-001-F` — `RN-HOME-CA-001`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Bloco só para usuário logado |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Visitante **não** deve ver “Continuar assistindo” entre hero e Filmes.

**Veredito:** **Falso-positivo provável (runner)** — Asserção de **ausência** (“Nenhum bloco…”), mas o runner trata como busca positiva de keyword. Com visitante anônimo, **não** encontrar “Continuar assistindo” é o comportamento **correto**; o runner marca FAIL por “0 keywords encontradas”. Inversão lógica conhecida da heurística.

---

### 11. `CT-RN-HOME-CA-002-F` — `RN-HOME-CA-002`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Bloco oculto sem itens |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Usuário logado sem progresso — faixa “Continuar assistindo” ausente.

**Veredito:** **Falso-positivo provável (runner)** — Pré-condição “logado, sem itens” não atendida; mesma confusão ausência vs keyword positiva que em CA-001.

---

### 12. `CT-RN-HOME-CA-004-F` — `RN-HOME-CA-004`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Card mostra temporada e episódio |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Cards com “S{n} · E{n}” na faixa Continuar assistindo.

**Veredito:** **Falso-positivo provável (runner)** — Faixa só existe logado com itens; runner anônimo não vê cards. Mesmo logado, o padrão exato “S1 · E1” pode diferir no UI.

---

### 13. `CT-RN-HOME-CA-005-F` — `RN-HOME-CA-005`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Tempo restante |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Linha de tempo restante abaixo do título no card.

**Veredito:** **Falso-positivo provável (runner)** — Conteúdo da faixa Continuar assistindo + copy dinâmica; não disponível na execução anônima.

---

### 14. `CT-RN-HOME-CA-006-F` — `RN-HOME-CA-006`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | Abrir no streaming |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Clique abre nova aba no serviço de streaming.

**Veredito:** **Falso-positivo provável (runner)** — Exige clique e segunda aba; impossível validar com busca textual na home.

---

### 15. `CT-RN-HOME-CA-008-F` — `RN-HOME-CA-008`

| Campo | Valor |
| --- | --- |
| **Regra (QA)** | “Ver todos” |
| **Evidência** | `Keywords (0/1): []` |

**O que a regra pede:** Link “Ver todos” da faixa leva à Minha lista (animes).

**Veredito:** **Falso-positivo provável (runner)** — Interação + rota autenticada; frase “Abre minha lista de animes” não está no DOM da home anônima.

---

## Síntese da amostra (15/271 FAIL)

| Veredito | Quantidade na amostra |
| --- | ---: |
| Falso-positivo provável (runner) | 15 |
| Falha real provável | 0 |

**Leitura TL:** Os 15 primeiros FAIL concentram-se em **01-HOME.md** e são coerentes com limitações do `executar-feliz-lote.py`: sem passos, sem login (exc. bloqueios parciais em Minha lista/Auth), asserções negativas mal classificadas e validação por keywords literais. **Nenhum item desta amostra deve ser tratado como bug confirmado em produção sem re-teste manual ou E2E fiel aos passos do cenário.**

## Recomendações

1. **Triagem:** Priorizar FAIL fora de HOME e de rotas que exigem auth, ou FAIL com timeout/`erro 500` explícito na evidência.
2. **Runner:** Marcar cenários “ausência esperada” (Nenhum, oculto, ausente) com ramo negativo; executar passos mínimos (clique no título da faixa, toggle Animes) onde o CSV já descreve “Como testar”.
3. **Próxima amostra:** Auditar os primeiros FAIL de `02-FILMES.json` e `10-MINHA-LISTA.json` para balancear telas e auth.

---

*Gerado para revisão TL; baseline `cenarios-teste.csv` não alterado.*
