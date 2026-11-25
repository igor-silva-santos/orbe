# Cenários — Hoje

**Arquivo inventário:** `07-HOJE.md`

---

## CT-RN-HOJE-001-01 — Validar: Conteúdo após abrir a página

**ID_Regra:** `RN-HOJE-001` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Acesso normal à página Hoje. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Abrir Hoje com rede normal.<br>3. Observar transição skeleton → conteúdo.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Breve estado de carregamento (esqueletos/cards cinza) e, em seguida, faixas preenchidas ou mensagens de vazio/erro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-002-01 — Validar: Data do dia

**ID_Regra:** `RN-HOJE-002` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Comparar data exibida com o relógio do sistema.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Linha com ícone de calendário e data por extenso (pt-BR), coerente com o dia de teste. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-003-01 — Validar: Ligar/desligar blocos

**ID_Regra:** `RN-HOJE-003` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mesmo navegador/dispositivo. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Desmarcar “Em cartaz nos cinemas”.<br>3. F5 → faixa não aparece.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Interruptores ou checkboxes por seção; ao recarregar, as seções desmarcadas continuam ocultas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-004-01 — Validar: Pelo menos uma seção

**ID_Regra:** `RN-HOJE-004` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resta apenas uma seção marcada. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Desmarcar cinco seções.<br>3. Na sexta tentativa, a última permanece ligada.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Tentativa de desmarcar a última é ignorada; continua uma seção ativa. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-005-01 — Validar: Ordem fixa das faixas

**ID_Regra:** `RN-HOJE-005` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias seções habilitadas com conteúdo. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Habilitar todas.<br>3. Rolar e conferir ordem dos títulos das faixas.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sempre, de cima para baixo: cinema → estreias da semana → filmes no streaming → séries no streaming → animes em exibição → jogos em destaque (só as habilitadas e com itens). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-006-01 — Validar: Faixa sem itens some

**ID_Regra:** `RN-HOJE-006` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Seção habilitada sem destaques naquele dia. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Ambiente ou dia em que uma faixa específica vem vazia.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nenhum título de faixa vazio; bloco inteiro ausente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-007-01 — Validar: Nada para mostrar

**ID_Regra:** `RN-HOJE-007` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros de seção deixam zero cards visíveis. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Desmarcar seções que tinham conteúdo até só restarem vazias ou desligar todas as que exibem cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem “Nenhum destaque disponível para os filtros selecionados.” |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-008-01 — Validar: Erro ao carregar

**ID_Regra:** `RN-HOJE-008` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Simular falha de rede ou indisponibilidade do serviço. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Bloquear rede após abrir a página ou usar ambiente offline.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem do tipo “Não foi possível carregar o conteúdo de hoje.” |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-009-01 — Validar: Esqueletos no carregamento

**ID_Regra:** `RN-HOJE-009` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeiro acesso ou rede lenta. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Throttle de rede e recarregar Hoje.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade com vários placeholders de card (cerca de oito). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-010-01 — Validar: Cards iguais ao resto do site

**ID_Regra:** `RN-HOJE-010` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário logado; itens visíveis em uma faixa. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Logar.<br>3. Favoritar um filme em “Em cartaz” e conferir em outra tela.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Favoritar, listas e demais ações do card funcionam como em Filmes/Séries/Animes/Jogos. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-011-01 — Validar: Janela “esta semana”

**ID_Regra:** `RN-HOJE-011` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Títulos com datas conhecidas (estreia ou episódio). |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Comparar filme estreando há 8 dias vs filme estreando ontem na faixa de streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Obra lançada há mais de uma semana tende a não liderar o pool “esta semana”; pode aparecer só se faltar conteúdo recente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-012-01 — Validar: Em cartaz nos cinemas

**ID_Regra:** `RN-HOJE-012` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com filme em cartaz e filme só em streaming. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Contar cards na faixa cinema.<br>3. Validar que só entram “em cartaz”.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **12** filmes; foco em popularidade entre os em cartaz; obras de baixa qualidade editorial ou mal localizadas tendem a ficar de fora. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-013-01 — Validar: Estreias da semana

**ID_Regra:** `RN-HOJE-013` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com estreia BR na semana vs fora da semana. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Cruzar com calendário de estreias BR.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **24** títulos; cards de estreia da semana podem exibir etiqueta de destaque de estreia. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-014-01 — Validar: Etiquetas em filmes

**ID_Regra:** `RN-HOJE-014` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme estreando na semana vs filme futuro aguardado. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Inspecionar pills nos cards de estreias e estreias futuras.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Estreia da semana tem prioridade sobre “mais esperado” no mesmo card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-015-01 — Validar: Filmes no streaming esta semana

**ID_Regra:** `RN-HOJE-015` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pool semanal com menos de 12 títulos. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Dia com poucos lançamentos streaming.<br>3. Ver se lista completa até 12.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **12** filmes; se faltarem lançamentos recentes, entram títulos populares em streaming para completar, sem duplicar o mesmo filme. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-016-01 — Validar: Séries no streaming esta semana

**ID_Regra:** `RN-HOJE-016` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série sem episódio na semana mas popular. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Série semanal com ep ontem vs série parada há meses.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **12** séries; mescla recentes + fallback. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-017-01 — Validar: Animes em exibição (prioridade)

**ID_Regra:** `RN-HOJE-017` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime em exibição sem ep na semana. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Anime com ep recente vs anime em hiato.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Preferência por quem teve episódio nos últimos 7 dias; ordenação por popularidade e nota. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-018-01 — Validar: Animes — completar lista

**ID_Regra:** `RN-HOJE-018` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Poucos episódios recentes no catálogo. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Conferir contagem máxima em dia “fraco” de episódios.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **12** animes no total, sem repetir o mesmo título. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-019-01 — Validar: Jogos em destaque

**ID_Regra:** `RN-HOJE-019` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com jogos fracos e fortes. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Contar faixa.<br>3. Comparar com página Jogos.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **8** jogos; jogos sem sinal de qualidade tendem a ficar de fora. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-020-01 — Validar: Animes mais exigentes que a listagem

**ID_Regra:** `RN-HOJE-020` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com nota/popularidade baixa. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Mesmo título em Animes vs Hoje.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na faixa de animes de Hoje; pode existir na página Animes do menu. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-021-01 — Validar: Textos de sinopse

**ID_Regra:** `RN-HOJE-021` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir detalhe do mesmo título em Hoje e em Filmes. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Abrir modal do filme em Hoje e na listagem Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesmo texto de sinopse para a mesma obra. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-022-01 — Validar: Atualização dos destaques

**ID_Regra:** `RN-HOJE-022` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Duas visitas no mesmo dia. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Comparar Hoje de manhã e tarde (mesmo dia).<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Listas podem permanecer estáveis por várias horas até o site atualizar o pacote de “hoje”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-023-01 — Validar: Falha grave no servidor

**ID_Regra:** `RN-HOJE-023` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Serviço indisponível. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Ambiente de teste com serviço fora.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesma mensagem de erro de RN-HOJE-008; usuário não vê faixas parciais “quebradas”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOJE-024-01 — Validar: Seções batem com a tela

**ID_Regra:** `RN-HOJE-024` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Hoje** (conforme a regra).<br>2. Conferir títulos das faixas com a tabela abaixo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seis tipos possíveis: data, estreias da semana, cinema, três faixas streaming (filmes/séries/animes), jogos — conforme preferências e conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |
