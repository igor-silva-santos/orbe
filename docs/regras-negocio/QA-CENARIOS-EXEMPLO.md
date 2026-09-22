# Exemplos de cenários (referência para QA sênior)

Use como **qualidade esperada** ao preencher `cenarios-teste.csv`. Copie a estrutura, não o texto literal.

---

## Exemplo 1 — Funcional manual

| Campo | Conteúdo |
| --- | --- |
| **ID_Regra** | RN-HOME-CA-001 |
| **ID_Cenario** | CT-RN-HOME-CA-001-01 |
| **Titulo_Cenario** | Visitante não vê a faixa Continuar assistindo |
| **Objetivo** | Garantir que a seção só aparece para usuário autenticado. |
| **Tipo_Testagem** | Funcional manual |
| **Pre_condicoes_TestE** | Navegador limpo; usuário **não** logado; catálogo com animes em progresso existente para outra conta (só para saber que há dado no ambiente). |
| **Passos** | 1. Abrir a página inicial. 2. Rolar do topo até o início da faixa Filmes. 3. Observar a área entre o hero e Filmes. |
| **Resultado_Esperado** | Não existe bloco com título “Continuar assistindo”. |
| **Dados_Conta_Ambiente** | HML; sessão anônima |
| **Status_Elaboracao** | Pronto para TL |

---

## Exemplo 2 — Exploratório guiado

| Campo | Conteúdo |
| --- | --- |
| **ID_Regra** | RN-HOME-TL-011 |
| **ID_Cenario** | CT-RN-HOME-TL-011-01 |
| **Titulo_Cenario** | Filtro de gênero no carrossel de filmes reposiciona o foco |
| **Objetivo** | Validar que, ao filtrar gênero, o carrossel recalcula a posição inicial no subconjunto. |
| **Tipo_Testagem** | Exploratório guiado |
| **Pre_condicoes_TestE** | Página inicial carregada; faixa Filmes visível; existem filmes de pelo menos 2 gêneros diferentes no carrossel. |
| **Passos** | **Charter (15 min):** na faixa Filmes, alternar filtros de gênero e observar título do mês + card central. **Hipóteses:** (H1) após filtro, foco vai para próximo lançamento do gênero; (H2) título do mês acompanha o card focal; (H3) gênero sem título na janela não quebra a faixa. Registrar desvios com print. |
| **Resultado_Esperado** | Após cada troca de gênero, o carrossel reposiciona de forma coerente (próximo lançamento visível dentro do filtro); sem erro de interface. |
| **Exploratorio_Validado** | Sim (charter + hipóteses + tempo) |

---

## Exemplo 3 — Impedimento documentado

| Campo | Conteúdo |
| --- | --- |
| **ID_Regra** | RN-ANIMES-012 |
| **ID_Cenario** | CT-RN-ANIMES-012-01 |
| **Impedimentos_Conhecidos** | HML sem título adulto cadastrado até sprint X; usar staging com flag de conteúdo de teste OU aceite TL com reteste na DATA Y. |
| **TL_Auditoria** | Ajuste obrigatório → após dado de teste disponível, reenviar |
