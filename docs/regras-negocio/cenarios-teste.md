# Cenários de teste — Orbe Nerd (511)

Gerado a partir do inventário de regras. **1 cenário mínimo por `RN-*`.**

| Métrica | Valor |
| --- | --- |
| Total de cenários | 511 |
| Status elaboração | Pronto para TL |

---

## CT-RN-HOME-001-01 — Validar: Ordem das seções

**ID_Regra:** `RN-HOME-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir a página inicial e rolar devagar.<br>3. Conferir a ordem.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Do topo para baixo: mensagem de boas-vindas → (opcional) Continuar assistindo → Filmes → Séries → Animes → Jogos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-002-01 — Validar: Título da faixa leva à listagem

**ID_Regra:** `RN-HOME-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar em cada título de faixa e verificar a página de destino.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao clicar no título “Filmes”, o usuário vai para a página de listagem de filmes; o mesmo padrão para Séries, Animes e Jogos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-003-01 — Validar: Página não “quebra” sem conteúdo

**ID_Regra:** `RN-HOME-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Simular rede lenta ou catálogo vazio no primeiro carregamento. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Throttle de rede ou ambiente de teste vazio.<br>3. Abrir a página inicial.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não aparece tela de erro do navegador; faixas e controles continuam; carrosséis podem mostrar placeholders e depois preencher ao rolar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-004-01 — Validar: Carregamento tardio das faixas

**ID_Regra:** `RN-HOME-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário abre a página e fica só no topo (boas-vindas). |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir a página, não rolar: observar rede/atividade.<br>3. Rolar até cada faixa.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao rolar até Filmes/Jogos/Séries/Animes, novos cards ou animação de carregamento podem aparecer; não é obrigatório tudo carregar antes de rolar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-001-01 — Validar: Dois modos: estreias e semana

**ID_Regra:** `RN-HOME-AC-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa Animes visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar alternância calendário/lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botões/ícones alternam entre modos; título do carrossel muda (temporada vs dia da semana). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-002-01 — Validar: Modo inicial automático

**ID_Regra:** `RN-HOME-AC-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Data de teste no fim vs início da temporada. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Testar em duas datas da mesma temporada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modo inicial diferente; só na primeira visita (escolha manual depois é mantida). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-003-01 — Validar: Estreias: temporada atual

**ID_Regra:** `RN-HOME-AC-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo estreias, temporada corrente. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ler título da faixa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Copy com nome da estação e ano. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-004-01 — Validar: Estreias: posição inicial

**ID_Regra:** `RN-HOME-AC-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Animes com datas na temporada. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir home e ver card central.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card central coerente com “próximo” na data de hoje. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-005-01 — Validar: Agenda semanal: só com episódio marcado

**ID_Regra:** `RN-HOME-AC-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo semana. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ativar modo semana em temporada ativa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Separadores “Segunda”, “Terça”, etc., com cards abaixo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-006-01 — Validar: Agenda: abrir no dia de hoje

**ID_Regra:** `RN-HOME-AC-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo semana com episódios na semana. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir modo semana no meio da semana.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Separador do dia atual visível/central. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-007-01 — Validar: Trocar temporada

**ID_Regra:** `RN-HOME-AC-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo estreias. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Avançar para próxima temporada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Novos cards após breve carregamento se a temporada ainda não estava aberta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-008-01 — Validar: Em alta em animes

**ID_Regra:** `RN-HOME-AC-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Em alta ligado na faixa Animes. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Toggle Em alta em Animes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista por popularidade; filtros de formato/adulto aplicados na exibição. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-009-01 — Validar: Fixar na semana (logado)

**ID_Regra:** `RN-HOME-AC-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado, card de anime. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Fixar e ver pin.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Opção no menu ⋮; ícone de pin no card quando fixado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-AC-010-01 — Validar: Loop na agenda semanal

**ID_Regra:** `RN-HOME-AC-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo semana ativo. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Rolar até o fim no modo semana.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Comportamento de carrossel em loop (diferente do modo estreias). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-001-01 — Validar: Bloco só para usuário logado

**ID_Regra:** `RN-HOME-CA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário **não** está logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir a página em anônimo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nenhum bloco “Continuar assistindo” entre o hero e Filmes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-002-01 — Validar: Bloco oculto sem itens

**ID_Regra:** `RN-HOME-CA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado, sem animes em progresso na lista. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Conta sem itens “continuar”/“seguir”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção ausente. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-003-01 — Validar: Até dez títulos

**ID_Regra:** `RN-HOME-CA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado com mais de dez animes em progresso. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Conta com 11+ itens.<br>3. Contar cards.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só os dez primeiros (ordem de uso recente) aparecem na home. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-004-01 — Validar: Card mostra temporada e episódio

**ID_Regra:** `RN-HOME-CA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pelo menos um item na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ler um card qualquer.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto no formato “S{n} · E{n}” (temporada e episódio). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-005-01 — Validar: Tempo restante

**ID_Regra:** `RN-HOME-CA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com progresso parcial no episódio. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Item com episódio pela metade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Linha com tempo restante abaixo do título. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-006-01 — Validar: Abrir no streaming

**ID_Regra:** `RN-HOME-CA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com link de streaming associado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar card com link.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nova aba do navegador no serviço de streaming. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-007-01 — Validar: Sem link vai à minha lista

**ID_Regra:** `RN-HOME-CA-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item sem URL de streaming. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar card sem link externo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Navega para minha lista de animes na mesma aba. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CA-008-01 — Validar: “Ver todos”

**ID_Regra:** `RN-HOME-CA-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar “Ver todos”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre minha lista de animes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-001-01 — Validar: Abrir detalhe

**ID_Regra:** `RN-HOME-CARD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar poster/título.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal com sinopse, datas, links, etc. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-002-01 — Validar: Menu ⋮

**ID_Regra:** `RN-HOME-CARD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir menu.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Menu com favoritar, quero assistir, etc. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-003-01 — Validar: Fechar menu ao clicar fora

**ID_Regra:** `RN-HOME-CARD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Menu aberto. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar área vazia.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Menu some. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-004-01 — Validar: Favoritar / quero assistir

**ID_Regra:** `RN-HOME-CARD-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Favoritar e recarregar página logado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Estado ativo reflete no menu; indicador no card se aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-005-01 — Validar: Visitante não grava

**ID_Regra:** `RN-HOME-CARD-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Não logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Favoritar deslogado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aviso; nada salvo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-006-01 — Validar: Acompanhando (série/anime)

**ID_Regra:** `RN-HOME-CARD-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card série ou anime. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir menu em série.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Item “Acompanhando” no menu. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-007-01 — Validar: Já assisti / já joguei

**ID_Regra:** `RN-HOME-CARD-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/jogo futuro. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Tentar em estreia futura.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Opção desabilitada ou sem efeito. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-008-01 — Validar: Avaliar ao marcar visto

**ID_Regra:** `RN-HOME-CARD-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lançado, logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Marcar já assisti em filme antigo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal de avaliação. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-009-01 — Validar: Etiqueta de status — filme

**ID_Regra:** `RN-HOME-CARD-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filmes com flags diferentes. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Comparar filme em cartaz vs streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Uma etiqueta principal por card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-010-01 — Validar: Etiqueta — série/anime

**ID_Regra:** `RN-HOME-CARD-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Episódio exibido há menos de 24h. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Testar dia após estreia de ep.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | “NOVO EP” visível. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-011-01 — Validar: Novo ep: regra de 24h

**ID_Regra:** `RN-HOME-CARD-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ep entre 1h e 24h atrás. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Esperar ou simular data.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Etiqueta presente; após 24h some. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-012-01 — Validar: Dublagem no anime

**ID_Regra:** `RN-HOME-CARD-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com dublagem BR cadastrada. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Comparar com título só legendado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | “Dublado” no card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-013-01 — Validar: Contagem para próximo episódio

**ID_Regra:** `RN-HOME-CARD-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série/anime com próximo ep futuro. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Card com ep amanhã vs hoje à noite.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto com dias/horas; abaixo de 1 dia atualiza mais frequentemente. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-014-01 — Validar: Saga em filme

**ID_Regra:** `RN-HOME-CARD-014` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com saga. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar saga vs poster.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link de saga; clique **não** abre o modal (só o link). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-015-01 — Validar: Conteúdo adulto no poster

**ID_Regra:** `RN-HOME-CARD-015` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título marcado adulto ainda permitido. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Hover no card adulto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Blur no poster. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-016-01 — Validar: Indicador na minha lista

**ID_Regra:** `RN-HOME-CARD-016` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado com item na lista. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Favoritar e olhar o card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Borda ou pill de destaque. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CARD-017-01 — Validar: Ocultar título

**ID_Regra:** `RN-HOME-CARD-017` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ocultar e buscar de novo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título some das listas personalizadas subsequentes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-001-01 — Validar: Foco em lançamentos recentes e próximos

**ID_Regra:** `RN-HOME-CON-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Data de teste conhecida; título com estreia há mais de 90 dias só por reestreia antiga. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Comparar título reestreia antiga na home vs página Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título muito antigo fora dessa janela **não** aparece no carrossel temporal (pode existir em outras páginas do site). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-002-01 — Validar: Filmes: sem shows e concertos na faixa

**ID_Regra:** `RN-HOME-CON-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com filme de concerto cadastrado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Buscar concerto na página Filmes.<br>3. Verificar ausência na home.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na faixa Filmes da home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-003-01 — Validar: Filmes: curta duração futura

**ID_Regra:** `RN-HOME-CON-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme futuro com duração de curta-metragem conhecida. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Validar com título de teste curto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não aparece no carrossel inicial de filmes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-004-01 — Validar: Filmes: destaques no card

**ID_Regra:** `RN-HOME-CON-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme elegível a destaque na semana/mês. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Comparar cards em destaque na mídia.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pill ou etiqueta no card além do status normal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-005-01 — Validar: Séries: data do próximo episódio

**ID_Regra:** `RN-HOME-CON-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com próximo episódio marcado para data futura. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Série semanal com ep na sexta.<br>3. Conferir posição na sexta.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card na faixa Séries alinhado ao mês/dia do próximo ep ao rolar a timeline. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-006-01 — Validar: Séries: episódio recente

**ID_Regra:** `RN-HOME-CON-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Episódio exibido há poucos dias. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Série que estreou ep ontem.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card ainda visível ao navegar no passado recente do carrossel. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-007-01 — Validar: Jogos: plataformas no card

**ID_Regra:** `RN-HOME-CON-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com várias plataformas. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Inspecionar card de jogo multiplataforma.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até quatro ícones visíveis no card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-008-01 — Validar: Jogos pouco relevantes

**ID_Regra:** `RN-HOME-CON-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo obscuro no catálogo. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Comparar com página Jogos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na faixa Jogos da home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-009-01 — Validar: Conteúdo adulto explícito em animes

**ID_Regra:** `RN-HOME-CON-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título adulto no catálogo geral. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Buscar título adulto.<br>3. Verificar home.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na home; pode ou não aparecer em outras áreas conforme política do site. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-CON-010-01 — Validar: Animes da temporada e agenda

**ID_Regra:** `RN-HOME-CON-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime fora de temporada e sem episódio próximo. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Anime antigo fora de exibição.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode não aparecer no carregamento inicial. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-EA-001-01 — Validar: Ativar Em alta

**ID_Regra:** `RN-HOME-EA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa Filmes, Séries ou Jogos. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar Em alta na faixa Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Timeline por mês some; cards em ordem de “em alta”; sem separadores de ano TBD. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-EA-002-01 — Validar: Filmes em alta ≠ populares da página Filmes

**ID_Regra:** `RN-HOME-EA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo Em alta em Filmes na home. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Comparar os mesmos dias home Em alta vs página Filmes Populares.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ordem/conjunto pode diferir da página Filmes → Populares. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-EA-003-01 — Validar: Séries e jogos em alta

**ID_Regra:** `RN-HOME-EA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo Em alta ativo. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ativar Em alta em Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista fixa (~dezena de títulos) sem navegação por mês. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-EA-004-01 — Validar: Início da lista

**ID_Regra:** `RN-HOME-EA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Toggle ligado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ativar e ver posição.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Primeiro slide visível. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-EA-005-01 — Validar: Desativar volta à timeline

**ID_Regra:** `RN-HOME-EA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Estava em Em alta. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ligar e desligar Em alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modo mês retorna; foco próximo lançamento. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-EA-006-01 — Validar: Gênero em Em alta

**ID_Regra:** `RN-HOME-EA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Em alta com vários gêneros. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Filtrar gênero em Em alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Dropdown coerente com cards visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-HERO-001-01 — Validar: Botão “Começar agora”

**ID_Regra:** `RN-HOME-HERO-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial no topo. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar “Começar agora” e verificar scroll até Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao clicar, a página rola suavemente até a seção Filmes; o endereço do navegador **não** precisa mudar de página. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-HERO-002-01 — Validar: Link “Ver jogos em alta”

**ID_Regra:** `RN-HOME-HERO-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial no topo. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar no link e conferir aba/conteúdo de em alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre a página de promoções já na aba/visualização de jogos em alta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-SHELL-001-01 — Validar: Menu superior e busca

**ID_Regra:** `RN-HOME-SHELL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer estado de login. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Usar busca e menu no topo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Busca abre overlay; login leva à entrada. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-SHELL-002-01 — Validar: Sem popup de “consentimento +18”

**ID_Regra:** `RN-HOME-SHELL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título adulto permitido. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Navegar home com título adulto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Apenas blur/exclusão, sem popup dedicado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TBD-001-01 — Validar: Separador de ano sem dia

**ID_Regra:** `RN-HOME-TBD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Existem títulos com ano mas sem dia/mês confirmado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Rolar até o fim da timeline datada em Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cartão separador + cards desses títulos **depois** da parte datada. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TBD-002-01 — Validar: Título ao focar TBD

**ID_Regra:** `RN-HOME-TBD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário focou slide TBD. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Focar separador de ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto “sem data confirmada” no cabeçalho do carrossel. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TBD-003-01 — Validar: Anos futuros na fila

**ID_Regra:** `RN-HOME-TBD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Carrossel em modo timeline (não “Em alta”). |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Rolar até virada de ano no carrossel.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao avançar meses/anos, aparecem novos blocos TBD conforme o ano. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-001-01 — Validar: Título do mês no carrossel

**ID_Regra:** `RN-HOME-TL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Carrossel carregado com pelo menos um título datado. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir faixa Filmes e ler o título superior.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto em português com mês por extenso. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-002-01 — Validar: Abrir no próximo lançamento

**ID_Regra:** `RN-HOME-TL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Existe estreia futura na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir home em dia com estreias futuras.<br>3. Ver qual card está ao centro.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card central (ou focado) é o próximo lançamento, não o primeiro da lista histórica. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-003-01 — Validar: Sem futuro: último lançado

**ID_Regra:** `RN-HOME-TL-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Só passado recente na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Testar em dia sem estreias futuras carregadas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Foco no lançamento mais recente já ocorrido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-004-01 — Validar: Série/anime: data do episódio

**ID_Regra:** `RN-HOME-TL-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card com “próximo episódio” visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Série com nova temporada distante mas ep semanal próximo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Posição no carrossel coerente com a data do episódio, não só estreia da série. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-005-01 — Validar: Placeholders no início

**ID_Regra:** `RN-HOME-TL-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeiro acesso ou rede lenta. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Recarregar com rede lenta na faixa Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até ~10 placeholders; depois substituídos por cards reais na posição correta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-006-01 — Validar: Rolagem horizontal

**ID_Regra:** `RN-HOME-TL-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa com vários cards. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Arrastar carrossel e usar setas laterais.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Movimento horizontal; card central em destaque (anel/foco). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-007-01 — Validar: Ctrl + roda do mouse

**ID_Regra:** `RN-HOME-TL-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Desktop, foco na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Testar em navegador desktop.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Carrossel muda de slide com Ctrl+scroll. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-008-01 — Validar: Carregar meses ao navegar

**ID_Regra:** `RN-HOME-TL-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário rola vários meses para frente ou para trás. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Rolar rapidamente 3–4 meses à frente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Novos cards aparecem; título do mês no topo atualiza. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-009-01 — Validar: Não “pular” ao puxar o passado

**ID_Regra:** `RN-HOME-TL-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário no meio do carrossel; sistema carrega mês anterior. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Rolar para trás até disparar carga de mês anterior.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | O mesmo título permanece em foco (sem salto brusco). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-010-01 — Validar: Setas de mudança de mês

**ID_Regra:** `RN-HOME-TL-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Carrossel com navegação por mês habilitada. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Clicar setas de mês repetidamente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Avanço/retrocesso por mês; após vários meses sem título, para de avançar em vazio. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-011-01 — Validar: Filtro por gênero

**ID_Regra:** `RN-HOME-TL-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários gêneros na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Abrir filtro, escolher um gênero.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só cards daquele gênero; lista de gêneros reflete o que existe nos cards carregados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-012-01 — Validar: Troca de gênero reposiciona

**ID_Regra:** `RN-HOME-TL-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro alterado com resultados. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Filtrar gênero raro e observar card central.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Posição inicial coerente com o subconjunto filtrado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-TL-013-01 — Validar: Scroll rápido (ícone raio)

**ID_Regra:** `RN-HOME-TL-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário ativa ícone de raio/Zap no controle da faixa (se visível). |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Ligar/desligar e comparar velocidade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Transições mais rápidas; mais cards pré-carregados ao rolar forte. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-UPD-001-01 — Validar: Atualizar após sincronização do catálogo

**ID_Regra:** `RN-HOME-UPD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ambiente onde sync/disparo de atualização ocorre. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Após sync, manter home aberta e observar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards novos ou datas alteradas após evento. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HOME-UPD-002-01 — Validar: Falha na atualização silenciosa

**ID_Regra:** `RN-HOME-UPD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha de rede na atualização. |
| Passos | 1. Abrir o site e navegar até **Página inicial** (conforme a regra).<br>2. Cortar rede após sync.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem mensagem obrigatória; conteúdo antigo permanece. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-001-01 — Validar: Conteúdo na primeira abertura

**ID_Regra:** `RN-FILMES-001` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Site acessível; catálogo com filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir a página Filmes em aba nova.<br>3. Observar grade e selects antes de interagir.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao entrar em Filmes, cards e menus de filtro aparecem (ou estado vazio amigável se não houver dados). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-002-01 — Validar: Atualização gradual do catálogo

**ID_Regra:** `RN-FILMES-002` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo alterado recentemente no ambiente de teste. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Registrar um filme de teste.<br>3. Aguardar ~5 min.<br>4. Recarregar Filmes.<br>5. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Após aguardar alguns minutos e recarregar Filmes, novos títulos ou datas podem surgir. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-003-01 — Validar: Falha no carregamento inicial

**ID_Regra:** `RN-FILMES-003` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Simular indisponibilidade temporária do catálogo na abertura. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Ambiente com catálogo indisponível no primeiro acesso.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Página abre sem erro do navegador; grade vazia; filtros sem opções ou vazios; mensagem de “nenhum filme” se aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-004-01 — Validar: Texto do cabeçalho

**ID_Regra:** `RN-FILMES-004` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário na página Filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Ler o cabeçalho da página.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título **Filmes** e texto sobre cartaz, lançamentos e clássicos no topo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-005-01 — Validar: Gaveta O que vem aí

**ID_Regra:** `RN-FILMES-005` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo de eventos do site inclui filmes em **próximos lançamentos**. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Ambiente com lançamentos futuros.<br>3. Abrir Filmes.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção colapsável **O que vem aí** com carrossel horizontal de cards de filme. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-006-01 — Validar: Ações nos cards da gaveta

**ID_Regra:** `RN-FILMES-006` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gaveta visível; usuário logado ou visitante conforme regra do card. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Favoritar um filme na gaveta.<br>3. Recarregar logado.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Menu e estados de lista refletem na conta quando logado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-007-01 — Validar: Gaveta Em cartaz

**ID_Regra:** `RN-FILMES-007` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo de eventos traz filmes em **destaques recentes / em cartaz**. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Ambiente com destaques em cartaz.<br>3. Abrir Filmes.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **Em cartaz** com ícone de claquete e carrossel horizontal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-008-01 — Validar: Gavetas carregam após a página

**ID_Regra:** `RN-FILMES-008` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Filmes recém-aberta. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir Filmes e observar ordem de aparecimento dos blocos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Primeiro aparecem filtros e grade; em seguida as gavetas (se houver conteúdo). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-009-01 — Validar: Atalho Todos os Filmes

**ID_Regra:** `RN-FILMES-009` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer outro atalho ativo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Clicar **Todos os Filmes**.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão **Todos os Filmes** destacado; grade ampla (ordenada por título). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-010-01 — Validar: Atalho Em Cartaz

**ID_Regra:** `RN-FILMES-010` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com filmes em cartaz e outros. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Clicar **Em Cartaz**.<br>3. Conferir etiquetas nos cards.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade restrita a títulos em cartaz; contador atualizado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-011-01 — Validar: Atalho Em Breve

**ID_Regra:** `RN-FILMES-011` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filmes em breve e já lançados no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Clicar **Em Breve**.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só filmes em breve na grade. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-012-01 — Validar: Atalho Populares

**ID_Regra:** `RN-FILMES-012` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filmes com popularidade distinta. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Alternar **Todos** e **Populares** e comparar ordem.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ordem diferente de **Todos**; títulos mais populares no topo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-013-01 — Validar: Destaque visual do atalho

**ID_Regra:** `RN-FILMES-013` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dois ou mais atalhos disponíveis. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Clicar cada atalho e observar estilo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão ativo com cor primária; demais em fundo neutro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-014-01 — Validar: Gênero “Todos”

**ID_Regra:** `RN-FILMES-014` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select em **Todos os Gêneros**. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Escolher todos os gêneros após filtrar um gênero específico.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade ampla dentro do atalho ativo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-015-01 — Validar: Nome do gênero no menu

**ID_Regra:** `RN-FILMES-015` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista de gêneros populada. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir select de gênero.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ex.: “action” exibido como “Action”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-016-01 — Validar: Ano “Todos”

**ID_Regra:** `RN-FILMES-016` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Anos** selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Resetar ano para todos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filmes de vários anos na grade. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-017-01 — Validar: Anos no dropdown

**ID_Regra:** `RN-FILMES-017` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com vários anos. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar anos do menu com filmes conhecidos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Select de ano sem duplicatas; ordem decrescente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-018-01 — Validar: Meses em português

**ID_Regra:** `RN-FILMES-018` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select de mês aberto. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir filtro de mês.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Doze meses nomeados corretamente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-019-01 — Validar: Mês “Todos”

**ID_Regra:** `RN-FILMES-019` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Meses**. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Selecionar todos os meses.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Qualquer mês dentro dos demais filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-020-01 — Validar: Status traduzido

**ID_Regra:** `RN-FILMES-020` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select de status populado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir filtro de status.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Labels legíveis (ex.: lançado, em produção). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-021-01 — Validar: Filtro por plataforma

**ID_Regra:** `RN-FILMES-021` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Netflix (ou outra) selecionada. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar Netflix.<br>3. Abrir detalhe de um card.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só cards com aquela plataforma nos metadados visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-022-01 — Validar: Plataformas ordenadas

**ID_Regra:** `RN-FILMES-022` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias plataformas no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir **Todas as Plataformas**.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista A–Z no dropdown. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-023-01 — Validar: Filtros sempre clicáveis

**ID_Regra:** `RN-FILMES-023` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Filmes estável. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Usar todos os filtros em sequência.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Selects não ficam permanentemente desabilitados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-024-01 — Validar: Primeira visita sem “piscar” desnecessário

**ID_Regra:** `RN-FILMES-024` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita com catálogo OK. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir Filmes e aguardar sem tocar filtros.<br>3. Observar spinner.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Conteúdo estável logo após abrir; novo carregamento só ao mudar filtro/atalho. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-025-01 — Validar: Mudança de filtro recarrega

**ID_Regra:** `RN-FILMES-025` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro ou atalho alterado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Trocar gênero ou ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner breve; nova lista e contador. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-026-01 — Validar: Atualização após sync do site

**ID_Regra:** `RN-FILMES-026` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync disparada com Filmes aberta. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Manter Filmes aberta durante sync no ambiente de teste.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards ou contagem mudam sem F5 manual. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-027-01 — Validar: Spinner ao filtrar

**ID_Regra:** `RN-FILMES-027` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro alterado com rede normal. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Trocar filtro e observar loading.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner no lugar do grid até concluir. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-028-01 — Validar: Contador com total global

**ID_Regra:** `RN-FILMES-028` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mais de ~48 filmes para o filtro atual. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtro amplo.<br>3. Ler contador vs cards na tela.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contador alto (ex.: 200) com grade mostrando um subconjunto inicial. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-029-01 — Validar: Contador em carregamento

**ID_Regra:** `RN-FILMES-029` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro recém-alterado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Trocar filtro e ler linha acima da grade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto **Carregando...**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-030-01 — Validar: Grade responsiva

**ID_Regra:** `RN-FILMES-030` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resultados > 0; não loading. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Redimensionar janela do navegador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | 2 a 5 colunas; cards com largura máxima ~210px. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-031-01 — Validar: Nenhum resultado

**ID_Regra:** `RN-FILMES-031` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros restritivos. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Aplicar filtro impossível.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ícone de filtro, título **Nenhum filme encontrado**, sugestão de ajustar filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-032-01 — Validar: Falha ao recarregar no cliente

**ID_Regra:** `RN-FILMES-032` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede cortada ao mudar filtro. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Desligar rede ao trocar filtro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Página continua; grade pode zerar; sem crash. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-033-01 — Validar: Limite inicial de cards na tela

**ID_Regra:** `RN-FILMES-033` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro amplo com centenas de títulos. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Contar cards com filtro **Todos**.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até ~48 cards visíveis na grade por vez (sem botão “carregar mais” nesta página). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-034-01 — Validar: Cards com informação de streaming

**ID_Regra:** `RN-FILMES-034` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com Netflix/Disney+ etc. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Inspecionar card de filme em streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ícones ou pills de plataforma no card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-035-01 — Validar: Saga e coleção no card

**ID_Regra:** `RN-FILMES-035` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com saga cadastrada. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Card de filme conhecido em saga.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Atalho de saga visível no card (detalhe em modais). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-036-01 — Validar: Curadoria de exibição padrão

**ID_Regra:** `RN-FILMES-036` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme incompleto no catálogo vs filme em cartaz. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar filme rascunho vs filme em cartaz.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título sem pôster tende a **não** aparecer; em cartaz pode aparecer mesmo com pouca popularidade. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-037-01 — Validar: Sem pôster

**ID_Regra:** `RN-FILMES-037` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme de teste sem pôster. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Buscar título sem pôster na busca global.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente em Filmes com filtros abertos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-038-01 — Validar: Sem sinopse

**ID_Regra:** `RN-FILMES-038` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme sem overview. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Validar com dado de teste.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na listagem geral. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-039-01 — Validar: Conteúdo adulto explícito

**ID_Regra:** `RN-FILMES-039` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Buscar título adulto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente em Filmes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-040-01 — Validar: Exceção em cartaz ou em breve

**ID_Regra:** `RN-FILMES-040` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme em cartaz com poucos votos. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Testar título em cartaz marginal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Presente ao usar atalho **Em Cartaz** ou **Em Breve**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-041-01 — Validar: Nota mínima com muitos votos

**ID_Regra:** `RN-FILMES-041` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme nota ~5,5 com centenas de votos. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar com filme bem avaliado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na listagem geral. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-042-01 — Validar: Ano corrente ou futuro mais permissivo

**ID_Regra:** `RN-FILMES-042` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano = ano corrente no select. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar ano corrente.<br>3. Procurar estreia futura.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Estreia futura do ano aparece na grade. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-043-01 — Validar: Filtro por ano civil

**ID_Regra:** `RN-FILMES-043` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano 2020 selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar 2020 e abrir detalhes de cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só filmes com data de estreia em 2020. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-044-01 — Validar: Filtro por mês

**ID_Regra:** `RN-FILMES-044` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Março + ano 2025. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Combinar mês e ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só estreias de março/2025. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-045-01 — Validar: Mês sem ano usa ano atual

**ID_Regra:** `RN-FILMES-045` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mês = mês atual; ano = todos. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Em setembro, filtrar setembro com todos os anos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Estreias daquele mês no ano corrente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-046-01 — Validar: Filtro por gênero

**ID_Regra:** `RN-FILMES-046` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero Action. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar um gênero raro e validar cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só filmes daquele gênero. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-047-01 — Validar: Filtro por status

**ID_Regra:** `RN-FILMES-047` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Status específico. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar status e conferir detalhe.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade coerente com status nos detalhes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-048-01 — Validar: Só já lançados (catálogo)

**ID_Regra:** `RN-FILMES-048` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme futuro vs passado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Estreia futura só em **Em Breve**, não como lançado antigo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filme futuro não entra em conjuntos que exigem “já lançado” (ex.: comparar com atalho **Em Breve**). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-049-01 — Validar: Só futuros (catálogo)

**ID_Regra:** `RN-FILMES-049` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme passado e futuro. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar atalhos **Todos** vs **Em Breve**.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Em Breve** alinhado a futuros curados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-050-01 — Validar: Disponibilidade cinema (catálogo)

**ID_Regra:** `RN-FILMES-050` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme só streaming vs em cartaz. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Validar filme em cartaz nos atalhos/gaveta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Em Cartaz** e gaveta **Em cartaz** concentram títulos de cinema. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-051-01 — Validar: Disponibilidade streaming (catálogo)

**ID_Regra:** `RN-FILMES-051` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com plataforma. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar plataforma + ler etiqueta do card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aparece ao filtrar plataforma; etiqueta **No streaming** no card quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-052-01 — Validar: Ordem alfabética em “Todos”

**ID_Regra:** `RN-FILMES-052` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Filmes** ativo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Ler primeiros títulos da grade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Primeiros cards em ordem A–Z por título. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-053-01 — Validar: Listagem mais ampla que a home

**ID_Regra:** `RN-FILMES-053` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Concerto/gravação ao vivo cadastrada. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar mesmo título home vs Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode aparecer em Filmes e **não** no carrossel da home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-054-01 — Validar: Opções de filtro só com filmes

**ID_Regra:** `RN-FILMES-054` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero órfão no cadastro interno. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir todos os gêneros e buscar um raro inexistente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Gênero sem filme **não** aparece no select. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-055-01 — Validar: Anos sem duplicata

**ID_Regra:** `RN-FILMES-055` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filmes no mesmo ano. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir filtro de ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ano único no dropdown. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-056-01 — Validar: Janela temporal da home

**ID_Regra:** `RN-FILMES-056` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme muito antigo fora da janela da home. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filme clássico: Filmes vs home.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Presente em Filmes com filtros; pode faltar na home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-057-01 — Validar: Concertos na listagem

**ID_Regra:** `RN-FILMES-057` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título tipo “Live from…”. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Buscar concerto na página Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card visível em Filmes; pode faltar no carrossel da home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-058-01 — Validar: Curta-metragem futuro na home

**ID_Regra:** `RN-FILMES-058` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Curta com duração conhecida e estreia futura. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar home vs Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode aparecer em Filmes filtrando ano/mês; pode faltar na home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-059-01 — Validar: Duração mínima só na home

**ID_Regra:** `RN-FILMES-059` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme futuro curto. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Mesmo título home vs Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Visível em Filmes se passar curadoria da listagem. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-060-01 — Validar: Abrir detalhe pelo card

**ID_Regra:** `RN-FILMES-060` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card na grade ou gaveta. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Clicar poster/título.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal com sinopse, datas, links. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-061-01 — Validar: Destaques no detalhe

**ID_Regra:** `RN-FILMES-061` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme elegível a destaque editorial. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Abrir detalhe de estreia aguardada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pills no modal além do status normal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-062-01 — Validar: Edição administrativa

**ID_Regra:** `RN-FILMES-062` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta visitante ou usuário comum. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Confirmar ausência de controles de admin na página Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Comportamento da listagem reflete catálogo já publicado; sem UI de edição aqui. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-063-01 — Validar: Ranking “mais esperados”

**ID_Regra:** `RN-FILMES-063` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Estreias próximas no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Comparar filme “mais esperado” na home vs Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filmes pode mostrar pills nos cards/detalhe; ranking completo não é seção fixa aqui. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-064-01 — Validar: Timeline por ano (outras telas)

**ID_Regra:** `RN-FILMES-064` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Confirmar ausência de carrossel mensal contínuo em Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filmes usa grade + filtros ano/mês, não carrossel temporal contínuo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-065-01 — Validar: Timeline por mês (outras telas)

**ID_Regra:** `RN-FILMES-065` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mês selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filtrar mês e rolar grade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade estática filtrada, não slide por slide de timeline. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-066-01 — Validar: Só ano confirmado (outras telas)

**ID_Regra:** `RN-FILMES-066` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme TBA só com ano. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Filme “2027 — data a confirmar” em Filmes vs home.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode listar com data incompleta nos detalhes; sem separador TBD como na home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-067-01 — Validar: Contador alinhado ao total filtrado

**ID_Regra:** `RN-FILMES-067` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro restritivo. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Anotar contador e amostrar busca por título.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contador = quantidade lógica do filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-FILMES-068-01 — Validar: Coerência após recarregar

**ID_Regra:** `RN-FILMES-068` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros alterados; F5. |
| Passos | 1. Abrir o site e navegar até **Filmes** (conforme a regra).<br>2. Alterar filtros e recarregar navegador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Atalho **Todos** e selects voltam ao padrão; nova carga inicial. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-001-01 — Validar: Conteúdo na primeira abertura

**ID_Regra:** `RN-SERIES-001` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Site acessível; catálogo com séries. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir Séries em aba nova.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade e selects visíveis (ou vazio amigável). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-002-01 — Validar: Atualização gradual

**ID_Regra:** `RN-SERIES-002` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo alterado recentemente. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Alterar série de teste.<br>3. Aguardar.<br>4. Recarregar.<br>5. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Recarregar após alguns minutos pode mostrar novidades. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-003-01 — Validar: Falha no carregamento inicial

**ID_Regra:** `RN-SERIES-003` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo indisponível na abertura. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Simular falha na abertura.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Página abre; grade vazia; filtros vazios possíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-004-01 — Validar: Texto do cabeçalho

**ID_Regra:** `RN-SERIES-004` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Séries. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Ler cabeçalho.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título **Séries** e descrição sobre universo de séries. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-005-01 — Validar: Gaveta O que vem aí

**ID_Regra:** `RN-SERIES-005` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo de eventos com séries em **próximos**. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Ambiente com séries futuras.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-006-01 — Validar: Sem gaveta Em cartaz

**ID_Regra:** `RN-SERIES-006` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Destaques recentes de séries existem no resumo. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir Séries com dados de destaque.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bloco **Em cartaz** **ausente**; só **O que vem aí** + filtros + grade. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-007-01 — Validar: Ações na gaveta

**ID_Regra:** `RN-SERIES-007` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gaveta visível. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Favoritar na gaveta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Interações refletem na conta logada. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-008-01 — Validar: Gaveta após a página

**ID_Regra:** `RN-SERIES-008` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página recém-aberta. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Observar ordem de carregamento.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filtros/grade primeiro; gaveta em seguida se houver itens. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-009-01 — Validar: Sem atalhos Em Cartaz/Populares

**ID_Regra:** `RN-SERIES-009` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Séries. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Confirmar ausência de atalhos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Apenas linha de filtros; nenhum botão **Populares**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-010-01 — Validar: Ordem alfabética padrão

**ID_Regra:** `RN-SERIES-010` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Todos os filtros em “todos”. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Ler primeiros cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards em ordem A–Z pelo título/nome exibido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-011-01 — Validar: Ordenação por popularidade (catálogo)

**ID_Regra:** `RN-SERIES-011` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | — |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Confirmar que não há controle de popularidade na UI.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Usuário comum só vê ordem alfabética nesta página. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-012-01 — Validar: Gênero “Todos”

**ID_Regra:** `RN-SERIES-012` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Gêneros**. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Resetar gênero.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade ampla. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-013-01 — Validar: Capitalização do gênero

**ID_Regra:** `RN-SERIES-013` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gêneros listados. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir select de gênero.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Label formatado (ex.: Action). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-014-01 — Validar: Ano “Todos”

**ID_Regra:** `RN-SERIES-014` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Anos**. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Resetar ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Séries de vários anos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-015-01 — Validar: Filtro por ano de estreia

**ID_Regra:** `RN-SERIES-015` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano 2022. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtrar ano e conferir detalhe.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só séries estreadas em 2022. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-016-01 — Validar: Filtro por mês de estreia

**ID_Regra:** `RN-SERIES-016` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Março selecionado. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Combinar mês + ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Séries com estreia em março (com ano definido ou corrente). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-017-01 — Validar: Mês sem ano

**ID_Regra:** `RN-SERIES-017` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Setembro + todos os anos. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtrar mês atual.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Estreias de setembro do ano atual. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-018-01 — Validar: Meses em português

**ID_Regra:** `RN-SERIES-018` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select de mês. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir filtro de mês.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Rótulos PT-BR corretos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-019-01 — Validar: Filtro por plataforma

**ID_Regra:** `RN-SERIES-019` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Netflix selecionada. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtrar plataforma.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só séries com Netflix nos metadados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-020-01 — Validar: Filtro por status

**ID_Regra:** `RN-SERIES-020` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Status escolhido. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtrar status.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade coerente com status no detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-021-01 — Validar: Sem recarga duplicada na abertura

**ID_Regra:** `RN-SERIES-021` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita OK. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir página e aguardar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Conteúdo estável até mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-022-01 — Validar: Mudança de filtro recarrega

**ID_Regra:** `RN-SERIES-022` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer filtro mudado. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Trocar gênero.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner + nova lista. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-023-01 — Validar: Atualização após sync

**ID_Regra:** `RN-SERIES-023` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync em andamento. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Manter Séries aberta durante sync.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards/contador mudam sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-024-01 — Validar: Spinner ao filtrar

**ID_Regra:** `RN-SERIES-024` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Trocar filtro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner até concluir. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-025-01 — Validar: Contador com total global

**ID_Regra:** `RN-SERIES-025` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | > ~48 séries no filtro. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtro amplo.<br>3. Ler contador.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contador alto com subconjunto na grade. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-026-01 — Validar: Contador em carregamento

**ID_Regra:** `RN-SERIES-026` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro recém-alterado. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Trocar filtro rapidamente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem número antigo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-027-01 — Validar: Grade responsiva

**ID_Regra:** `RN-SERIES-027` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resultados > 0. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Redimensionar janela.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Layout adapta ao viewport. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-028-01 — Validar: Nenhum resultado

**ID_Regra:** `RN-SERIES-028` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Combinação impossível. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtro restritivo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Nenhuma série encontrada** + dica de ajustar filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-029-01 — Validar: Falha ao recarregar

**ID_Regra:** `RN-SERIES-029` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede off ao filtrar. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Cortar rede ao filtrar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade pode zerar; sem crash. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-030-01 — Validar: Listagem mais permissiva que a home

**ID_Regra:** `RN-SERIES-030` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série marginal cadastrada. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Comparar mesmo título home vs Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aparece em Séries; pode faltar na home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-031-01 — Validar: Lote inicial na grade

**ID_Regra:** `RN-SERIES-031` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro amplo. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Contar cards vs contador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Dezenas de cards, contador pode ser maior. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-032-01 — Validar: Cards com gêneros e streaming

**ID_Regra:** `RN-SERIES-032` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com gêneros/plataformas. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Inspecionar card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto/ícones no card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-033-01 — Validar: Gêneros visíveis no card

**ID_Regra:** `RN-SERIES-033` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com gêneros. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir card na grade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Gêneros legíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-034-01 — Validar: Conteúdo pode demorar a refletir

**ID_Regra:** `RN-SERIES-034` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Alteração recente. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Ver RN-SERIES-002.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Recarregar após intervalo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-035-01 — Validar: Opções de filtro coerentes

**ID_Regra:** `RN-SERIES-035` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir cada select.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Menus populados sem opções “vazias”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-036-01 — Validar: Anos de estreia no filtro

**ID_Regra:** `RN-SERIES-036` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias temporadas. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Série antiga com ep novo: filtrar ano de estreia.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ano no filtro = ano de estreia, não de episódio recente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-037-01 — Validar: Status em português

**ID_Regra:** `RN-SERIES-037` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Status variados. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir status.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto PT no dropdown. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-038-01 — Validar: Home exige qualidade mínima

**ID_Regra:** `RN-SERIES-038` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série fraca vs forte. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Comparar presença home vs página.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Forte na home e Séries; fraca só em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-039-01 — Validar: Home exige ≥ 2 episódios

**ID_Regra:** `RN-SERIES-039` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série 1 ep. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Comparar contagens.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na home; pode estar em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-040-01 — Validar: Home exige pôster e sinopse

**ID_Regra:** `RN-SERIES-040` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série sem sinopse. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Mesmo título duas telas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente na home; pode listar em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-041-01 — Validar: Engajamento na home

**ID_Regra:** `RN-SERIES-041` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série obscura. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Buscar série obscura.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só na listagem Séries. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-042-01 — Validar: Nota mínima na home

**ID_Regra:** `RN-SERIES-042` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série mal avaliada popular. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Comparar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Listagem Séries pode ainda mostrar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-043-01 — Validar: Estreias planejadas no carrossel mensal

**ID_Regra:** `RN-SERIES-043` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série Planned futura. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Validar na home e em Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode aparecer na home por mês; em Séries aparece se cadastrada. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-044-01 — Validar: Data do episódio na timeline home

**ID_Regra:** `RN-SERIES-044` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com ep semanal. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Série em exibição: home vs filtro mês em Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card na home alinhado ao ep; em Séries filtro mês usa estreia da série. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-045-01 — Validar: Ordem no carrossel mensal

**ID_Regra:** `RN-SERIES-045` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mesmo mês. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Comparar ordem home vs Séries filtrada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ordens diferentes entre telas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-046-01 — Validar: Carrossel por ano (home)

**ID_Regra:** `RN-SERIES-046` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano específico. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Filtrar ano em Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Home: slides; Séries: grade filtrada. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-047-01 — Validar: Ano sem dia confirmado (home)

**ID_Regra:** `RN-SERIES-047` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série TBA. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Comparar home vs detalhe em Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Detalhe pode mostrar incerteza; sem separador TBD aqui. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-048-01 — Validar: Contexto de temporadas na home

**ID_Regra:** `RN-SERIES-048` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Nova temporada distante. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Caso com nova temp.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Home posiciona por ep; Séries filtra por estreia original se ano/mês de estreia. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-049-01 — Validar: Formato do card home vs grade

**ID_Regra:** `RN-SERIES-049` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mesma série. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir card home vs card Séries.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Detalhes extras no carrossel home. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-050-01 — Validar: Limite de itens no carrossel home

**ID_Regra:** `RN-SERIES-050` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Contar visíveis em cada superfície.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Home não lista tudo; Séries lista muito mais via filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-051-01 — Validar: Detalhe pelo card

**ID_Regra:** `RN-SERIES-051` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card na grade/gaveta. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Clicar card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sinopse, temporadas, links. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-052-01 — Validar: Episódios por temporada

**ID_Regra:** `RN-SERIES-052` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com temporadas. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir detalhe → temporada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Episódios visíveis no detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-053-01 — Validar: Sem edição pública

**ID_Regra:** `RN-SERIES-053` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário comum. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Inspecionar página.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem controles de admin em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-054-01 — Validar: Filtros habilitados

**ID_Regra:** `RN-SERIES-054` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Uso normal. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Usar filtros.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Todos clicáveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-055-01 — Validar: Contador coerente

**ID_Regra:** `RN-SERIES-055` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro ativo. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Anotar contador + amostra.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Número faz sentido com busca manual por título. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-056-01 — Validar: Recarregar reseta filtros

**ID_Regra:** `RN-SERIES-056` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros alterados. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. F5 após filtrar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Selects e lista padrão após reload. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-057-01 — Validar: Listagem ampla sem filtro

**ID_Regra:** `RN-SERIES-057` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir Séries padrão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade com títulos variados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-058-01 — Validar: Gêneros só com séries

**ID_Regra:** `RN-SERIES-058` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero órfão. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Revisar lista de gêneros.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente no select. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-059-01 — Validar: Plataformas só com séries

**ID_Regra:** `RN-SERIES-059` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Plataforma sem séries. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir plataformas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente no select. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-060-01 — Validar: Erro total na listagem

**ID_Regra:** `RN-SERIES-060` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo indisponível ao filtrar. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Simular indisponibilidade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Empty ou mensagem; página intacta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-061-01 — Validar: Erro nos filtros

**ID_Regra:** `RN-SERIES-061` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha na abertura. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Abrir com catálogo down.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ver RN-SERIES-003. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-SERIES-062-01 — Validar: Série planejada na listagem

**ID_Regra:** `RN-SERIES-062` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série Planned. |
| Passos | 1. Abrir o site e navegar até **Séries** (conforme a regra).<br>2. Buscar estreia futura.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Card visível; etiqueta **Em breve** quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-001-01 — Validar: Conteúdo na abertura

**ID_Regra:** `RN-ANIMES-001` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo acessível. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Abrir Animes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards e selects visíveis após carregar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-002-01 — Validar: Falha na abertura

**ID_Regra:** `RN-ANIMES-002` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha simulada. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ambiente com catálogo indisponível na abertura.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade vazia; filtros vazios; página utilizável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-003-01 — Validar: Texto do cabeçalho

**ID_Regra:** `RN-ANIMES-003` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Animes. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ler cabeçalho.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Animes** + texto sobre temporadas e clássicos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-004-01 — Validar: Gaveta O que vem aí

**ID_Regra:** `RN-ANIMES-004` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **próximos animes**. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ambiente com estreias futuras.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-005-01 — Validar: Opções dos filtros

**ID_Regra:** `RN-ANIMES-005` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Abrir cada select e comparar com títulos conhecidos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Dropdowns preenchidos; gêneros em ordem alfabética; anos do mais recente ao mais antigo; status com rótulo em português quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-006-01 — Validar: Valor “Todos”

**ID_Regra:** `RN-ANIMES-006` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Todos em todos os selects. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Resetar filtros.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade ampla. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-007-01 — Validar: Recarga ao mudar filtro e na hidratação

**ID_Regra:** `RN-ANIMES-007` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página recém-aberta ou filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Abrir Animes observando loading.<br>3. Depois trocar gênero.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner possível logo após abrir; novo spinner ao mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-008-01 — Validar: Atualização após sync

**ID_Regra:** `RN-ANIMES-008` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync disparada. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Manter Animes aberta durante sync.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista muda sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-009-01 — Validar: Contador = cards da página atual

**ID_Regra:** `RN-ANIMES-009` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mais de ~48 animes para o filtro. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Filtro amplo.<br>3. Comparar contador com total esperado manualmente.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contador pode mostrar até ~48 enquanto existem mais no catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-010-01 — Validar: Grade, loading e vazio

**ID_Regra:** `RN-ANIMES-010` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro impossível ou resultados OK. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Testar filtro vazio e filtro amplo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Nenhum anime encontrado** + dica; ou 2–5 colunas de cards ~210px. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-011-01 — Validar: Lote inicial sem “carregar mais”

**ID_Regra:** `RN-ANIMES-011` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Contar cards com filtros abertos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | ~48 cards visíveis; sem paginação na UI. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-012-01 — Validar: Exclusão de adulto explícito

**ID_Regra:** `RN-ANIMES-012` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Buscar título adulto conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente em Animes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-013-01 — Validar: Tags sensíveis ocultas

**ID_Regra:** `RN-ANIMES-013` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com tag bloqueada. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Validar título de teste com tag sensível.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não aparece na grade pública. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-014-01 — Validar: Filtros combinados

**ID_Regra:** `RN-ANIMES-014` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filtros ativos. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Combinar gênero + ano + formato.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só animes que atendem **todos** os critérios. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-015-01 — Validar: Ordem alfabética padrão

**ID_Regra:** `RN-ANIMES-015` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ler primeiros títulos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ordem A–Z aproximada pelos primeiros cards. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-016-01 — Validar: Listagem vs home / Hoje

**ID_Regra:** `RN-ANIMES-016` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime marginal (baixa popularidade, fora de temporada). |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Comparar mesmo anime nas três áreas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode aparecer em Animes e faltar na home/Hoje streaming. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-017-01 — Validar: Conteúdo pode demorar a atualizar

**ID_Regra:** `RN-ANIMES-017` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Alterar anime de teste.<br>3. Recarregar.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Novidades após reload. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-018-01 — Validar: Metadados de filtro completos

**ID_Regra:** `RN-ANIMES-018` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Percorrer formatos/fontes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem opções “fantasma” no menu. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-019-01 — Validar: Detalhe ao vivo

**ID_Regra:** `RN-ANIMES-019` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card qualquer. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Clicar card.<br>3. Testar título removido.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal/página de detalhe; id inválido não abre conteúdo quebrado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-020-01 — Validar: Próximo episódio (detalhe/agenda)

**ID_Regra:** `RN-ANIMES-020` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime em exibição semanal. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Anime em temporada corrente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contagem ou data de próximo ep no card/detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-001-01 — Validar: Conteúdo na abertura

**ID_Regra:** `RN-JOGOS-001` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo OK. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Abrir Jogos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards e selects visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-002-01 — Validar: Falha na abertura

**ID_Regra:** `RN-JOGOS-002` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo down. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Simular falha inicial.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade vazia; filtros vazios possíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-003-01 — Validar: Sem recarga duplicada na abertura

**ID_Regra:** `RN-JOGOS-003` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita OK. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Abrir e aguardar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Estável até mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-004-01 — Validar: Filtros aplicados

**ID_Regra:** `RN-JOGOS-004` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Valores específicos selecionados. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Alterar cada filtro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista coerente (ex.: só PlayStation). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-005-01 — Validar: Mês sem ano explícito

**ID_Regra:** `RN-JOGOS-005` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Março + todos os anos. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Filtrar mês atual.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Jogos lançados em março do ano atual. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-006-01 — Validar: Mês com ano

**ID_Regra:** `RN-JOGOS-006` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Junho 2023. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Combinar mês e ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só lançamentos de jun/2023. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-007-01 — Validar: Ordem alfabética

**ID_Regra:** `RN-JOGOS-007` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Ler primeiros títulos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | A–Z nos primeiros cards. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-008-01 — Validar: Popularidade (catálogo interno)

**ID_Regra:** `RN-JOGOS-008` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | — |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Confirmar ausência de atalho Populares.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Usuário só vê ordem alfabética aqui. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-009-01 — Validar: Listagem mais permissiva que destaques

**ID_Regra:** `RN-JOGOS-009` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo obscuro. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Comparar mesma busca.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Visível em Jogos; ausente em Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-010-01 — Validar: Lote inicial na grade

**ID_Regra:** `RN-JOGOS-010` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Contar cards vs contador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até ~48 cards; contador segue cards visíveis (como Animes). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-011-01 — Validar: Gaveta O que vem aí

**ID_Regra:** `RN-JOGOS-011` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **próximos jogos**. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Ambiente com jogos futuros.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-012-01 — Validar: Gaveta Eventos recentes

**ID_Regra:** `RN-JOGOS-012` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **eventos recentes**. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Ambiente com eventos no resumo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **Eventos recentes** com cards de evento empilhados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-013-01 — Validar: Loading, contador e vazio

**ID_Regra:** `RN-JOGOS-013` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro vazio ou OK. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Filtro impossível e amplo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Comportamento igual padrão Animes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-014-01 — Validar: Atualização após sync

**ID_Regra:** `RN-JOGOS-014` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync em andamento. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Manter Jogos aberta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards mudam sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-015-01 — Validar: Opções de filtro

**ID_Regra:** `RN-JOGOS-015` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Abrir cada select.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Menus populados coerentemente. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-016-01 — Validar: Preço Steam no detalhe/card

**ID_Regra:** `RN-JOGOS-016` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com Steam cadastrado. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Abrir jogo Steam conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Preço BRL ou indicador de carregamento no detalhe/card conforme produto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-017-01 — Validar: Redirect para Promoções

**ID_Regra:** `RN-JOGOS-017` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário acessa **/jogos-em-alta**. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Digitar URL legada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Navegador vai para **Promoções**, aba **Em Alta**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-018-01 — Validar: Menu do site

**ID_Regra:** `RN-JOGOS-018` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Menu visível. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Clicar item de menu.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Clique abre Promoções na aba Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-019-01 — Validar: Quem entra no ranking

**ID_Regra:** `RN-JOGOS-019` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo lançado há meses sem destaque. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Comparar jogo antigo vs lançamento recente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente do **Top da Semana**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-020-01 — Validar: Top da Semana

**ID_Regra:** `RN-JOGOS-020` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pool de destaques não vazio. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Contar cards e badges.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **Top da Semana** aberta por padrão. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-021-01 — Validar: Mais jogados na Steam

**ID_Regra:** `RN-JOGOS-021` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos Steam com pico de jogadores. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Ambiente com dados Steam.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **Mais jogados na Steam** com carrossel. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-022-01 — Validar: Promoções Steam (dados)

**ID_Regra:** `RN-JOGOS-022` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos com desconto alto na Steam. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Comparar jogo em promo Steam entre abas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Verificar ofertas na aba **Promoções** / carrossel catálogo Steam. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-023-01 — Validar: Por plataforma

**ID_Regra:** `RN-JOGOS-023` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos multiplataforma. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Ler seções por plataforma.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Switch só no bloco Nintendo, etc. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-024-01 — Validar: Por modo de jogo

**ID_Regra:** `RN-JOGOS-024` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos co-op. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Achar jogo co-op conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título listado em **Cooperativo** quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-025-01 — Validar: Por categoria (gênero)

**ID_Regra:** `RN-JOGOS-025` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero com 1 só jogo. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Contar seções de gênero.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Gênero singleton **não** vira seção. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-026-01 — Validar: Semana e métrica (modo completo)

**ID_Regra:** `RN-JOGOS-026` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir Em Alta em contexto que mostra cabeçalho longo (se existir rota dedicada futura). |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Abrir `/promocoes?tab=em-alta`.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Na aba Promoções (**compact**), semana/métrica longa **oculta**; banner de promoções visível. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-027-01 — Validar: Modo compacto na aba Promoções

**ID_Regra:** `RN-JOGOS-027` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba **Em Alta** em Promoções. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Abrir aba Em Alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banner “Ofertas ao vivo…” + link **Ver promoções ao vivo**; grade compacta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-028-01 — Validar: Erro ao carregar

**ID_Regra:** `RN-JOGOS-028` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo/indisponibilidade simulada. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Simular falha.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem **Não foi possível carregar os jogos em alta.** |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-JOGOS-029-01 — Validar: Conteúdo estável por sessão

**ID_Regra:** `RN-JOGOS-029` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba aberta. |
| Passos | 1. Abrir o site e navegar até **Jogos** (conforme a regra).<br>2. Ficar na aba.<br>3. Depois F5.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesmos blocos durante navegação curta; recarregar pode atualizar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-001-01 — Validar: Aba pela URL

**ID_Regra:** `RN-PROMO-001` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir cada URL.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Padrão **Jogos de Graça**; `promocoes` → aba Promoções; `em-alta` → Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-002-01 — Validar: Shell da página

**ID_Regra:** `RN-PROMO-002` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir Promoções com rede lenta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Layout visível; conteúdo das abas grátis/promo preenche depois. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-003-01 — Validar: Três abas

**ID_Regra:** `RN-PROMO-003` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar cada aba.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Alternar abas muda conteúdo principal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-004-01 — Validar: Em Alta sem ofertas de loja

**ID_Regra:** `RN-PROMO-004` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba **Em Alta** ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir Em Alta.<br>3. Observar ausência de grids de oferta.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só blocos de jogos em alta; sem skeleton de 12 cards de deal (salvo loading interno de Em Alta). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-005-01 — Validar: Carregar sob demanda

**ID_Regra:** `RN-PROMO-005` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir direto em Promoções sem passar por Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Entrar direto `?tab=promocoes`.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Promoções carrega ao selecionar aba; Grátis pode não ter sido buscado ainda. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-006-01 — Validar: Várias lojas — grátis

**ID_Regra:** `RN-PROMO-006` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Grátis carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler rodapé após load.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards de lojas diferentes; rodapé lista fontes com contagem. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-007-01 — Validar: Várias lojas — promo pagas

**ID_Regra:** `RN-PROMO-007` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir aba Promoções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ofertas misturadas; ordenação **Popularidade** por padrão. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-008-01 — Validar: Catálogo Orbe na Steam

**ID_Regra:** `RN-PROMO-008` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos Orbe em promo Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Aba Promoções com catálogo populado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **Promoções na Steam (catálogo)** com carrossel horizontal. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-009-01 — Validar: Atualização periódica

**ID_Regra:** `RN-PROMO-009` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba grátis ou promo. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar **Atualizar agora** duas vezes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Horário **Última atualização** muda após atualizar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-010-01 — Validar: Alerta de fontes indisponíveis

**ID_Regra:** `RN-PROMO-010` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fonte externa down no ambiente. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Simular/induzir falha de fonte.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banner listando lojas com falha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-011-01 — Validar: Sem detalhes técnicos internos

**ID_Regra:** `RN-PROMO-011` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer aba de oferta. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Inspecionar UI.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nenhum painel “debug” na interface. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-012-01 — Validar: Conteúdo da aba Grátis

**ID_Regra:** `RN-PROMO-012` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Grátis carregado. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Percorrer aba Grátis.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seções **Estão de graça** e **São de graça**; chips de plataforma. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-013-01 — Validar: Paginação de promoções pagas

**ID_Regra:** `RN-PROMO-013` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitas promoções ao vivo. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar até sumir botão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão **Carregar mais promoções** aumenta grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-014-01 — Validar: Preços em reais

**ID_Regra:** `RN-PROMO-014` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ofertas em dólar. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler rodapé e cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Preço BRL nos cards; linha USD/BRL no rodapé. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-015-01 — Validar: Temporário vs permanente

**ID_Regra:** `RN-PROMO-015` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Deals de ambos tipos. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler subtítulos das seções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Duas seções com textos explicativos diferentes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-016-01 — Validar: Ordenação padrão grátis

**ID_Regra:** `RN-PROMO-016` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Trocar ordenação.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Select de ordenação; mudar reordena temporários. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-017-01 — Validar: Filtro por plataforma/loja

**ID_Regra:** `RN-PROMO-017` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtrar e atualizar. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Filtrar Steam.<br>3. Atualizar se vazio.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Chip some ou volta para **Todas**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-018-01 — Validar: Busca por título

**ID_Regra:** `RN-PROMO-018` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Texto parcial do título. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Buscar substring.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grid reduzido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-019-01 — Validar: Destaques itch.io e EA App

**ID_Regra:** `RN-PROMO-019` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Deals nessas lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Confirmar que itch não repete no grid principal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seções **Grátis na itch.io** / **Grátis na EA** (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-020-01 — Validar: Agrupamento por loja

**ID_Regra:** `RN-PROMO-020` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ver aba Grátis com muitas fontes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Subtítulos EPIC, STEAM, etc., cada um com grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-021-01 — Validar: Contador na aba Grátis

**ID_Regra:** `RN-PROMO-021` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Buscar título raro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Badge diminui. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-022-01 — Validar: Vazio grátis

**ID_Regra:** `RN-PROMO-022` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista filtrada vazia. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Filtrar loja sem giveaways.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagens específicas por seção. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-023-01 — Validar: Ordenação padrão promo

**ID_Regra:** `RN-PROMO-023` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Usar select de ordenação.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Trocar para **Maior desconto** reordena grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-024-01 — Validar: Faixa catálogo Steam

**ID_Regra:** `RN-PROMO-024` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pelo menos um jogo Orbe em promo na Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir Promoções com catálogo em promo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção com link **Ver aba Em Alta →**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-025-01 — Validar: Carregar mais

**ID_Regra:** `RN-PROMO-025` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | >48 promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Buscar título → botão ausente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Carregar mais promoções** append cards; com busca o botão some. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-026-01 — Validar: Contador aba Promoções

**ID_Regra:** `RN-PROMO-026` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro plataforma. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Filtrar Epic.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Número atualiza. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-027-01 — Validar: Wishlist Steam (em breve)

**ID_Regra:** `RN-PROMO-027` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções visível. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ler bloco no topo da aba.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto **Lista de desejos Steam (em breve)**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-028-01 — Validar: Em Alta embutido

**ID_Regra:** `RN-PROMO-028` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Tab `em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Abrir aba Em Alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ver regras RN-JOGOS-019–029 em `05-JOGOS.md`. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-029-01 — Validar: Bookmark antigo

**ID_Regra:** `RN-PROMO-029` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | URL legada. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Acessar URL antiga.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Endereço final `?tab=em-alta`. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-030-01 — Validar: Atualizar agora

**ID_Regra:** `RN-PROMO-030` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Botão no hero. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Clicar em Grátis vs Em Alta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner no ícone; horário atualiza (abas de deal). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-031-01 — Validar: Erro global de ofertas

**ID_Regra:** `RN-PROMO-031` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Indisponibilidade. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Simular falha.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Não foi possível carregar promoções e jogos grátis.** + **Tentar novamente**. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-032-01 — Validar: Skeleton inicial

**ID_Regra:** `RN-PROMO-032` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta, aba ≠ Em Alta. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Throttle + abrir Promoções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Skeleton antes dos cards reais. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-033-01 — Validar: Banner de degradação

**ID_Regra:** `RN-PROMO-033` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fontes parciais down. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Ambiente degradado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banner âmbar/vermelho. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-034-01 — Validar: Rodapé de fontes

**ID_Regra:** `RN-PROMO-034` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Após load grátis/promo. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Comparar com quantidade visível.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Linha **Fontes:** Epic (n), Steam (n)… |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PROMO-035-01 — Validar: Tamanho da primeira página promo

**ID_Regra:** `RN-PROMO-035` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitas ofertas. |
| Passos | 1. Abrir o site e navegar até **Promoções** (conforme a regra).<br>2. Contar antes de carregar mais.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grid inicial ~48; botão carrega resto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

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

## CT-RN-MODAL-001-01 — Validar: Só abre com mídia válida

**ID_Regra:** `RN-MODAL-001` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Clique em card de mídia suportada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir filme, série, anime e jogo a partir de cards.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Overlay e conteúdo aparecem; tipos não suportados não abrem modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-002-01 — Validar: Fechar ao mudar de página

**ID_Regra:** `RN-MODAL-002` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto; clicar link do menu ou digitar outra URL interna. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Com modal aberto, ir para Filmes pelo header.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal fecha; a nova página carrega normalmente (sem “voltar” extra inesperado). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-003-01 — Validar: Detalhes ao abrir

**ID_Regra:** `RN-MODAL-003` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir modal pela primeira vez para um título. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir modal e comparar dados com o card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Breve loading; depois sinopse, elenco, links etc. mais completos que no card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-004-01 — Validar: Falha ao buscar detalhes

**ID_Regra:** `RN-MODAL-004` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede instável ou título problemático. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Simular offline após abrir modal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal ainda mostra o que já vinha do card; raramente tela de erro se não houver nenhum dado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-005-01 — Validar: Botão voltar do navegador

**ID_Regra:** `RN-MODAL-005` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto em desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir modal → botão voltar do navegador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Fechar pelo X, clique fora ou Esc pode voltar uma entrada no histórico; botão “voltar” do browser fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-006-01 — Validar: Rolagem da página de fundo

**ID_Regra:** `RN-MODAL-006` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal visível. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Tentar rolar a listagem com modal aberto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | A página atrás não rola (scroll bloqueado); ao fechar, rolagem normal volta. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-007-01 — Validar: Clique fora fecha

**ID_Regra:** `RN-MODAL-007` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar no backdrop.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal fecha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-008-01 — Validar: Tecla Esc fecha

**ID_Regra:** `RN-MODAL-008` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto (desktop). |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Pressionar Esc.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Esc fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-009-01 — Validar: Premiações no topo

**ID_Regra:** `RN-MODAL-009` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/série/etc. com lista de premiações. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir título premiado conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bloco de prêmios acima do restante do conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-010-01 — Validar: Modo edição (administrador)

**ID_Regra:** `RN-MODAL-010` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário admin; modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Logar como admin vs usuário normal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão de editar visível; alterna para formulários de curadoria; visitante/usuário comum não vê editar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-011-01 — Validar: Conteúdo por tipo

**ID_Regra:** `RN-MODAL-011` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir os quatro tipos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Quatro modais distintos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filme, série, anime e jogo mostram blocos adequados (streaming, temporadas, plataformas, etc.). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-012-01 — Validar: Carregando detalhes

**ID_Regra:** `RN-MODAL-012` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Throttle ao abrir modal.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Indicador de carregamento com mensagem fixa. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-013-01 — Validar: Busca fecha ao abrir detalhe

**ID_Regra:** `RN-MODAL-013` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Overlay de busca visível. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Buscar título → clicar resultado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Busca fecha; modal de detalhe fica por cima. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-020-01 — Validar: Exige login

**ID_Regra:** `RN-MODAL-020` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário **não** logado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anônimo → tentar adicionar evento.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem de erro (toast); submodal de calendário fecha. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-021-01 — Validar: Opções por tipo

**ID_Regra:** `RN-MODAL-021` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; modal de cada tipo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Percorrer fluxo calendário em filme e anime.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filme: estreia e/ou sessão de cinema (data, hora, local). Anime: estreia e/ou lembretes semanais. Série e jogo: estreia única. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-022-01 — Validar: Lembretes semanais (anime/série)

**ID_Regra:** `RN-MODAL-022` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; escolher recorrência semanal. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Criar série de lembretes e conferir quantidade.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Vários eventos espaçados (~7 dias), conforme quantidade de episódios informada ou padrão (~12). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-023-01 — Validar: Estreia sem data

**ID_Regra:** `RN-MODAL-023` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Obra sem data de estreia. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Título sem data → “lançamento”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aviso; nada é salvo; modal fecha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-024-01 — Validar: Ingresso de cinema

**ID_Regra:** `RN-MODAL-024` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com formulário de cinema preenchido. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Preencher e salvar sessão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Evento com data, hora e local informados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-025-01 — Validar: Confirmação de salvamento

**ID_Regra:** `RN-MODAL-025` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; dados completos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Salvar evento válido e inválido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast de sucesso ou erro após tentativa de salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-026-01 — Validar: Botão calendário em filme futuro

**ID_Regra:** `RN-MODAL-026` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com estreia **futura** vs já lançado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme futuro vs lançado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão visível só enquanto a estreia ainda não passou. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-030-01 — Validar: Abrir pelo card

**ID_Regra:** `RN-MODAL-030` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de mídia já lançada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Título futuro vs lançado → botão “Já assisti/joguei”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre modal de avaliação; desabilitado se a obra ainda não lançou. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-031-01 — Validar: Marca como assistido/jogado

**ID_Regra:** `RN-MODAL-031` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; modal de rating aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Avaliar jogo e conferir status na lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Status passa a “assistido” (inclusive para jogos). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-032-01 — Validar: Campos da avaliação

**ID_Regra:** `RN-MODAL-032` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Enviar com e sem comentário.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Opções do tipo gostei / amei / não gostei; campo de texto opcional. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-033-01 — Validar: Login obrigatório

**ID_Regra:** `RN-MODAL-033` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Não logado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anônimo → avaliar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast de aviso; modal fecha sem salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-040-01 — Validar: Título e pôster

**ID_Regra:** `RN-MODAL-040` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com título/pôster alternativos no catálogo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Comparar com listagem.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Título e arte coerentes com curadoria do site. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-041-01 — Validar: Onde assistir

**ID_Regra:** `RN-MODAL-041` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com e sem provedores. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme só cinema vs só streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista de serviços (sem duplicatas óbvias); se nada conhecido, texto “Desconhecido”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-042-01 — Validar: Ingresso

**ID_Regra:** `RN-MODAL-042` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme em cartaz, pré-venda ou com sessões. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme em cartaz com/sem sessões.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão de ingresso conforme disponibilidade; compra habilitada só quando há sessões confirmadas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-043-01 — Validar: Trailer

**ID_Regra:** `RN-MODAL-043` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com trailer oficial e alternativos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir filme com vários vídeos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Prioriza trailer oficial; senão primeiro trailer; senão outro vídeo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-044-01 — Validar: Elenco → página da pessoa

**ID_Regra:** `RN-MODAL-044` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Elenco listado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar nome no elenco → voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Vai para página da pessoa; modal de filme fecha; ao voltar, fluxo de retorno pode reabrir o filme (quando aplicável). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-045-01 — Validar: Continuações no filme

**ID_Regra:** `RN-MODAL-045` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com sequências ou universo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme de franquia conhecida.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aba “Continuação” e/ou “Universo” com obras relacionadas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-050-01 — Validar: Onde assistir

**ID_Regra:** `RN-MODAL-050` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com vários provedores. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Inspecionar bloco streaming.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista deduplicada de serviços. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-051-01 — Validar: Elenco → pessoa

**ID_Regra:** `RN-MODAL-051` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Elenco presente. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar ator.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Navega para a página da pessoa; ao voltar, o modal da série pode reabrir quando o site guardou esse retorno. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-052-01 — Validar: Calendário na série

**ID_Regra:** `RN-MODAL-052` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal de série aberto. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Procurar botão calendário na série.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não há botão dedicado igual ao de filme futuro; calendário pode existir por outros fluxos conforme produto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-053-01 — Validar: Continuações

**ID_Regra:** `RN-MODAL-053` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série ligada a universo compartilhado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Série MCU/DCEU etc.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abas de continuação/universo como no filme. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-060-01 — Validar: Sinopse legível

**ID_Regra:** `RN-MODAL-060` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com sinopse rica ou vazia. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir anime cuja sinopse venha com formatação na origem.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto limpo; se ausente, “(não informado)”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-061-01 — Validar: Fixar na semana

**ID_Regra:** `RN-MODAL-061` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta autenticada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Logar.<br>3. Fixar e desfixar.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão “Fixar na semana” / “Na sua semana” alterna destaque pessoal da semana. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-062-01 — Validar: Plataformas

**ID_Regra:** `RN-MODAL-062` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias plataformas incl. Crunchyroll. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Card de anime multi-plataforma.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista por nome; Crunchyroll pode mostrar só ícone. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-063-01 — Validar: Personagem e dublador

**ID_Regra:** `RN-MODAL-063` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com dublagem BR. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anime dublado → link dublador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Alternar JP/PT-BR; link para página do dublador fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-064-01 — Validar: Rankings

**ID_Regra:** `RN-MODAL-064` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com muitos rankings. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Anime popular em várias listas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até **6** entradas visíveis, com rótulos traduzidos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-070-01 — Validar: Requisitos de PC

**ID_Regra:** `RN-MODAL-070` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo PC com requisitos vs console-only. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Jogo Steam vs exclusivo console.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Drawer ou bloco de requisitos mínimos/recomendados só quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-071-01 — Validar: Desenvolvedora

**ID_Regra:** `RN-MODAL-071` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com empresa cadastrada. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Clicar link da empresa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para página da desenvolvedora. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-072-01 — Validar: Preço Steam

**ID_Regra:** `RN-MODAL-072` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com ID Steam ou preço. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Jogo com página Steam ativa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Exibe preço Steam no bloco de informações quando houver dado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-080-01 — Validar: Salvar alterações de filme

**ID_Regra:** `RN-MODAL-080` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Campos curados editados. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Admin edita título curado → salvar → reabrir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Salvar persiste título, sinopse, pôster etc.; usuário vê dados atualizados ao reabrir. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-081-01 — Validar: Cancelar edição

**ID_Regra:** `RN-MODAL-081` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo edição ativo. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Editar → cancelar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Volta à visualização; dados na tela permanecem os anteriores ao save. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-082-01 — Validar: Tipos editáveis

**ID_Regra:** `RN-MODAL-082` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta admin. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Alternar tipos em modo edição.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Formulários para filme, série, anime e jogo; outros tipos mostram indisponível. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-090-01 — Validar: Carregar sob demanda

**ID_Regra:** `RN-MODAL-090` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/série com franquia. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Abrir aba Continuação em filme de saga.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Conteúdo das abas carrega ao exibir (pode haver loading breve). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-091-01 — Validar: Ocultar se vazio

**ID_Regra:** `RN-MODAL-091` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título isolado. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Filme standalone.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nenhuma aba extra de continuações. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-MODAL-092-01 — Validar: Abas dinâmicas

**ID_Regra:** `RN-MODAL-092` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Só sequência, só universo, ou ambos. |
| Passos | 1. Abrir o site e navegar até **Modais** (conforme a regra).<br>2. Comparar filme sequel vs spin-off universo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aba padrão “Continuação” se houver sequência; senão “Universo”; só abas com conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-001-01 — Validar: Abrir e fechar

**ID_Regra:** `RN-BUSCA-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Site carregado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Clicar lupa → fechar com X/Esc/clique fora.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ícone de busca abre overlay; fechar remove overlay. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-002-01 — Validar: Histórico do navegador

**ID_Regra:** `RN-BUSCA-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca aberta. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Abrir busca → voltar do browser.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão voltar do navegador pode fechar a busca; Esc fecha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-003-01 — Validar: Limpar ao fechar

**ID_Regra:** `RN-BUSCA-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca usada com texto e filtro. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Buscar algo → fechar → reabrir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Campo vazio, categoria “todos”, resultados zerados na próxima abertura. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-004-01 — Validar: Em alta sem digitar

**ID_Regra:** `RN-BUSCA-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira abertura ou após limpar. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Abrir busca sem digitar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até ~20 títulos “em alta” exibidos como sugestão. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-005-01 — Validar: Mínimo de caracteres

**ID_Regra:** `RN-BUSCA-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Digitar 0 ou 1 caractere. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Digitar “a” e parar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem busca remota; resultados de mídia zerados (permanece em alta se vazio). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-006-01 — Validar: Espera antes de buscar

**ID_Regra:** `RN-BUSCA-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Digitar termo com 2+ caracteres. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Digitar rápido “star wars”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Resultados atualizam ~350 ms após parar de digitar; buscas antigas não “piscam” por cima das novas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-007-01 — Validar: Filtro por tipo

**ID_Regra:** `RN-BUSCA-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Query válida. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Buscar termo comum.<br>3. Alternar chips.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Opções: todos, filmes, séries, animes, jogos, pessoas; restringe o que é buscado/exibido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-008-01 — Validar: Resultados de mídia

**ID_Regra:** `RN-BUSCA-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Categoria “todos” ou tipo específico. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Termo que existe em mais de um tipo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filmes, séries, animes e jogos aparecem em grupos conforme filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-009-01 — Validar: Pessoas e dubladores

**ID_Regra:** `RN-BUSCA-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Termo com 2+ chars; categoria todos ou pessoas. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Buscar nome de ator e de dublador.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards de ator/equipe vs dublador com rótulos distintos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-010-01 — Validar: O que mostra por categoria

**ID_Regra:** `RN-BUSCA-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Query ≥ 2; chip selecionado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Mesmo termo em “todos” vs “filmes” vs “pessoas”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Chip “pessoas” esconde grids de mídia; demais chips focam o tipo escolhido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-011-01 — Validar: Seção pessoas

**ID_Regra:** `RN-BUSCA-011` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Query ≥ 2; todos ou pessoas; há matches. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Buscar sobrenome comum.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bloco de pessoas visível só nessas condições. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-012-01 — Validar: Contagem de resultados

**ID_Regra:** `RN-BUSCA-012` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca com resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Comparar total ao mudar chip.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Número reflete mídias visíveis + pessoas quando a seção pessoas está ativa. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-013-01 — Validar: Ações nos cards

**ID_Regra:** `RN-BUSCA-013` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado ou anônimo. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Favoritar da busca logado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesmas regras dos cards nas listagens (login exigido onde aplicável). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-014-01 — Validar: Destaque de foco

**ID_Regra:** `RN-BUSCA-014` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca com vários resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Observar foco ao interagir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Um item pode receber estado visual de foco (navegação completa por teclado pode ser limitada). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-015-01 — Validar: Estados vazios

**ID_Regra:** `RN-BUSCA-015` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sem trending e sem query; ou query sem resultado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Termo inventado “zzzxxyy”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | “Nenhum conteúdo em alta” ou mensagem citando o termo buscado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-020-01 — Validar: Destino do clique

**ID_Regra:** `RN-BUSCA-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resultado de pessoa na busca. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Clicar cada tipo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ator/equipe → página da pessoa; dublador → página do dublador. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-021-01 — Validar: Voltar à busca

**ID_Regra:** `RN-BUSCA-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Veio da overlay de busca. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Busca → pessoa → voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao voltar da página de pessoa/dublador, a busca pode reabrir (fluxo de retorno). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-BUSCA-022-01 — Validar: Subtítulo do card

**ID_Regra:** `RN-BUSCA-022` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cards na grid de pessoas. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Ler subtítulos na busca.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | “Ator / equipe” ou “Dublador” conforme o caso. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-001-01 — Validar: Links principais (desktop)

**ID_Regra:** `RN-HEADER-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Janela larga (layout desktop). |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Redimensionar janela.<br>3. Clicar cada link.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Links visíveis: Filmes, Séries, Animes, Jogos, Continuações, Hoje. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-002-01 — Validar: Menu “Mais”

**ID_Regra:** `RN-HEADER-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Desktop. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Abrir “Mais” e seguir um item.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Dropdown: Promoções, Eventos, Jogos em Alta, Premiações, Minha Lista (animes), Extensão CR. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-003-01 — Validar: Item ativo

**ID_Regra:** `RN-HEADER-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Navegar entre seções. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Estar em Promoções e olhar o header.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link da rota atual com estilo primário/negrito; “Mais” destaca se algum sublink está ativo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-004-01 — Validar: Abrir busca

**ID_Regra:** `RN-HEADER-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer página. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Mobile: abrir menu → busca.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre overlay; fecha menu mobile se estiver aberto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-005-01 — Validar: Tema claro/escuro

**ID_Regra:** `RN-HEADER-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Header visível. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Clicar sol/lua.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ícone alterna tema; cores do site mudam. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-006-01 — Validar: Notificações

**ID_Regra:** `RN-HEADER-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta com ou sem notificações. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Conta com notificações pendentes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre painel/modal de notificações; badge com contagem (máx. exibição “9+”). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-007-01 — Validar: Menu do usuário logado

**ID_Regra:** `RN-HEADER-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sessão ativa. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Logar → menu avatar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Opções: Minha lista, Meu perfil, Sair (volta à home após sair). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-008-01 — Validar: Visitante (desktop)

**ID_Regra:** `RN-HEADER-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo; layout desktop/tablet largo. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Anônimo desktop.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Links Entrar e Inscreva-se visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-009-01 — Validar: Menu mobile

**ID_Regra:** `RN-HEADER-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Layout mobile. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Testar em viewport mobile.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Hambúrguer com catálogo, “descobrir” (itens do Mais) e bloco login/lista/perfil. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-010-01 — Validar: Fechar menus

**ID_Regra:** `RN-HEADER-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dropdown “Mais” ou menu usuário aberto. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Abrir dropdown → clicar página.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Fecha ao clicar fora; overlay escuro fecha menu do usuário. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-020-01 — Validar: Resultado abre detalhe

**ID_Regra:** `RN-HEADER-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca aberta com resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Buscar filme → abrir card.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Clicar card abre modal de detalhe e fecha a busca. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-HEADER-021-01 — Validar: Retorno da página pessoa

**ID_Regra:** `RN-HEADER-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fluxo busca → página pessoa → voltar. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** (conforme a regra).<br>2. Executar RN-BUSCA-021 + voltar do browser ou link voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Busca reabre quando o site guardou “voltar para busca”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-001-01 — Validar: Rotas exigem login

**ID_Regra:** `RN-LISTA-001` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Visitante não autenticado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Anônimo tenta abrir lista de animes pelo menu.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redirecionamento para tela de **Entrar**, com retorno para a página que tentou abrir após login bem-sucedido. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-002-01 — Validar: Camada de UX

**ID_Regra:** `RN-LISTA-002` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Visitante vs logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Comparar anônimo (redirect) vs logado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem login não vê conteúdo da lista; logado vê dados pessoais. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-010-01 — Validar: Quatro tipos de mídia

**ID_Regra:** `RN-LISTA-010` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Clicar Animes vs Filmes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards: Animes, Filmes, Séries, Jogos; **somente Animes** leva a uma lista ativa hoje. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-011-01 — Validar: “Em breve”

**ID_Regra:** `RN-LISTA-011` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Hub aberto. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Tentar clicar Filmes no hub.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Filmes, Séries e Jogos aparecem esmaecidos, sem link, com selo “Em breve”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-012-01 — Validar: Mensagem orientadora

**ID_Regra:** `RN-LISTA-012` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Hub aberto. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Ler texto introdutório.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Texto explicando que a organização começa pelos animes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-020-01 — Validar: Abas Catálogo vs Fila

**ID_Regra:** `RN-LISTA-020` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado em Minha Lista. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Alternar entre hub e fila.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Links “Catálogo Orbe” (hub) e “Fila Crunchyroll”; aba atual destacada. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-021-01 — Validar: Animes fora da barra

**ID_Regra:** `RN-LISTA-021` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Confirmar links da nav vs entrada por animes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | A lista de animes não aparece na barra lateral; acesso via hub, header “Mais” ou atalhos. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-030-01 — Validar: Exige login na tela

**ID_Regra:** `RN-LISTA-030` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sessão expirada na página. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Abrir rota futura sem cookie.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redireciona para Entrar; nada da lista é mostrado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-031-01 — Validar: Carregar lista pessoal

**ID_Regra:** `RN-LISTA-031` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Aplicar filtros e recarregar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grid de obras conforme filtros; falha de permissão → Entrar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-032-01 — Validar: Filtro por status

**ID_Regra:** `RN-LISTA-032` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista com itens variados. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Clicar cada aba.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abas: Tudo, Quero assistir, Acompanhando, Favoritos, Assistidos/jogados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-033-01 — Validar: Filtro por tipo

**ID_Regra:** `RN-LISTA-033` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista mista. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Filtrar só jogos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Chips: todos, filme, série, anime, jogo restringem o grid. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-034-01 — Validar: Itens ocultos

**ID_Regra:** `RN-LISTA-034` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Itens marcados como ocultos. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Marcar “não me interessa” e voltar à lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não aparecem na lista visível. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-035-01 — Validar: Status ao vivo

**ID_Regra:** `RN-LISTA-035` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mudar status em outra tela sem recarregar. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Favoritar na home → abrir minha lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista reflete ação mais recente do usuário sobre o card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-036-01 — Validar: Aviso de itens faltantes

**ID_Regra:** `RN-LISTA-036` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta com referências antigas. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Conta de teste com `missingCount` se existir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem com quantidade de itens não encontrados no catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-037-01 — Validar: Listas vazias

**ID_Regra:** `RN-LISTA-037` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista vazia vs filtros restritivos. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Zerar filtros vs filtro impossível.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagens diferentes para “nada na lista” vs “nenhum item neste filtro”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-040-01 — Validar: Visitante

**ID_Regra:** `RN-LISTA-040` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário não logado (cenário raro nesta rota). |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Validar RN-LISTA-001.<br>3. Esta regra cobre mensagem na página se aplicável.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | CTA “Entrar no Orbe”; em fluxo normal o redirect de RN-LISTA-001 ocorre antes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-041-01 — Validar: Carregar ao abrir

**ID_Regra:** `RN-LISTA-041` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Abrir animes logado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ao entrar na página, lista e estados carregam automaticamente. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-042-01 — Validar: Última sincronização

**ID_Regra:** `RN-LISTA-042` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta com/sem sync prévia. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Conta nova vs conta com extensão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Data/hora da última sync ou texto de nunca sincronizado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-043-01 — Validar: Ações da barra

**ID_Regra:** `RN-LISTA-043` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página animes. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Clicar atualizar.<br>3. Importar arquivo demo se disponível.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botões: atualizar lista, importar backup de arquivo, importar demo (ambiente QA). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-044-01 — Validar: Banners informativos

**ID_Regra:** `RN-LISTA-044` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Simular offline.<br>3. Ver banner.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banners de offline e opt-in de notificações push quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-045-01 — Validar: Painel da extensão

**ID_Regra:** `RN-LISTA-045` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página animes. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Com/sem extensão instalada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bloco com status da extensão do navegador e opção de verificar de novo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-046-01 — Validar: Filtros da watchlist

**ID_Regra:** `RN-LISTA-046` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista com vários estados. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Alternar abas e contar itens.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abas: todos, em andamento (continuar/seguir), começar, terminado, dublagem PT-BR; contagens por aba. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-047-01 — Validar: Lista vazia orientada

**ID_Regra:** `RN-LISTA-047` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Zero itens. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Conta vazia com/sem extensão.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem e CTAs diferentes se extensão instalada (conectar) vs não instalada (instalar). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-048-01 — Validar: Remover item

**ID_Regra:** `RN-LISTA-048` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item na lista. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Remover um título → cancelar e confirmar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Diálogo de confirmação do navegador antes de remover. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-049-01 — Validar: Editar progresso

**ID_Regra:** `RN-LISTA-049` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com progresso. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Editar S2 E5 → salvar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal de edição; salvar atualiza card. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-050-01 — Validar: Feedback de sync/import

**ID_Regra:** `RN-LISTA-050` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Operação concluída. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Sync com sucesso e com erro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Banner verde ou vermelho com opção fechar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-051-01 — Validar: Modo offline

**ID_Regra:** `RN-LISTA-051` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista já carregada uma vez. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Carregar → offline → recarregar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Itens anteriores permanecem visíveis offline quando possível. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-052-01 — Validar: Backup antigo

**ID_Regra:** `RN-LISTA-052` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Arquivo backup formato antigo. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Importar backup legado de QA.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Campos normalizados (identificadores e status antigos mapeados) após import. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-053-01 — Validar: Adicionar do catálogo

**ID_Regra:** `RN-LISTA-053` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Adicionar anime pelo catálogo interno.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Fluxo “adicionar do catálogo Orbe” refresca a lista após incluir. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-060-01 — Validar: Exige login

**ID_Regra:** `RN-LISTA-060` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Abrir fila sem login.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redirect para Entrar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-061-01 — Validar: Ordem da fila

**ID_Regra:** `RN-LISTA-061` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado com fila populada. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Validar ordem dos blocos/linhas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ordem: **Continuar** → **A seguir** → **Começar** (conforme descrição no cabeçalho da página). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-062-01 — Validar: Estados especiais

**ID_Regra:** `RN-LISTA-062` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Itens nesses estados. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Itens de teste nesses estados.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Rótulos em destaque âmbar para “esperando dublagem” e “esperando episódio”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-063-01 — Validar: Dicas de catálogo CR

**ID_Regra:** `RN-LISTA-063` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item na fila. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Ler hint sob um anime.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Resumo de episódios no ar, dublados PT-BR e fronteira sub/dub quando existir. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-064-01 — Validar: Trilha de áudio

**ID_Regra:** `RN-LISTA-064` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com metadados. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Comparar anime dub vs sub.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Linha com temporada/ep e “Trilha PT-BR” ou “Leg/sub”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-065-01 — Validar: Abrir detalhe

**ID_Regra:** `RN-LISTA-065` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime ligado ao catálogo Orbe. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Clicar linha com anime resolvido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre modal de detalhe do anime. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-066-01 — Validar: Ajuda extensão

**ID_Regra:** `RN-LISTA-066` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página fila. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Ler bloco de instruções.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para watchlist Crunchyroll e nota sobre filtro de dublagem PT-BR no popup da extensão. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-070-01 — Validar: Login para interagir

**ID_Regra:** `RN-LISTA-070` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo em tela que mostra cards (ex. após bug). |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Deslogar e tentar favoritar na lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast pedindo login; ação não conclui. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-071-01 — Validar: Significado dos status

**ID_Regra:** `RN-LISTA-071` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Aplicar cada status.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Favorito, quero assistir, acompanhando; “não me interessa” oculta da lista principal. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-LISTA-072-01 — Validar: Acompanhando só anime/série

**ID_Regra:** `RN-LISTA-072` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de filme vs anime. |
| Passos | 1. Abrir o site e navegar até **Minha lista** (conforme a regra).<br>2. Abrir menu em filme e anime.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | “Acompanhando” oferecido para anime e série; não para filme/jogo da mesma forma. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-001-01 — Validar: Campos obrigatórios

**ID_Regra:** `RN-AUTH-001` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Entrar aberta. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Enviar vazio → validação nativa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Email e senha exigidos pelo navegador antes de enviar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-002-01 — Validar: Sucesso

**ID_Regra:** `RN-AUTH-002` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta existente. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Login OK vindo de Minha Lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Usuário entra; redireciona para página anterior segura ou home; nome aparece no header. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-003-01 — Validar: Erro genérico

**ID_Regra:** `RN-AUTH-003` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login falha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Senha errada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast “Ocorreu um erro ao tentar fazer login” (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-004-01 — Validar: Redirect seguro

**ID_Regra:** `RN-AUTH-004` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Link de Entrar vindo de página protegida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Após login, confirmar retorno à Minha Lista.<br>3. Tentar manipular URL de retorno externo se QA tiver cenário.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só redireciona para páginas internas do site; não envia o usuário para sites externos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-005-01 — Validar: Mostrar senha

**ID_Regra:** `RN-AUTH-005` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Campo senha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Clicar olho no campo senha.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ícone alterna texto visível/oculto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-006-01 — Validar: Ir para cadastro

**ID_Regra:** `RN-AUTH-006` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página login. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Clicar cadastro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para Inscreva-se. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-010-01 — Validar: Senha mínima

**ID_Regra:** `RN-AUTH-010` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Senha de 7 chars.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Senha com menos de **8** caracteres bloqueada com aviso antes de enviar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-011-01 — Validar: Confirmar senha

**ID_Regra:** `RN-AUTH-011` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Senhas diferentes. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Senha ≠ confirmar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast de erro; formulário não envia. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-012-01 — Validar: Campos obrigatórios

**ID_Regra:** `RN-AUTH-012` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Formulário. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Enviar incompleto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, email e senhas required. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-013-01 — Validar: Sucesso

**ID_Regra:** `RN-AUTH-013` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Email novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Registrar conta QA.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesmo fluxo pós-login: sessão ativa + redirect seguro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-014-01 — Validar: Erro do servidor

**ID_Regra:** `RN-AUTH-014` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro recusado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Registrar email já usado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast com mensagem retornada ou genérica. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-020-01 — Validar: Restaurar ao abrir o site

**ID_Regra:** `RN-AUTH-020` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fechar aba e reabrir. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Login → fechar browser → reabrir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Continua logado se sessão válida; senão volta anônimo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-021-01 — Validar: Dados após login

**ID_Regra:** `RN-AUTH-021` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login bem-sucedido. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ver badge notificação e favoritos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Notificações, interações nos cards e pins de anime da semana carregam. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-022-01 — Validar: Preferências lembradas

**ID_Regra:** `RN-AUTH-022` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário alterou tema ou favoritos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Mudar tema → F5.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Tema, favoritos e opção de scroll rápido persistem entre visitas no mesmo navegador. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-023-01 — Validar: Sair

**ID_Regra:** `RN-AUTH-023` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Sair → header sem avatar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Limpa usuário, notificações, interações e pins; volta estado de visitante. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-024-01 — Validar: Sessão no navegador

**ID_Regra:** `RN-AUTH-024` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login em produção. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Permanecer logado overnight (QA).<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sessão mantida por vários dias no mesmo dispositivo (comportamento de “permanecer logado”). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-025-01 — Validar: Tipo de conta

**ID_Regra:** `RN-AUTH-025` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Admin vs explorador. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Comparar contas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Admin vê ferramentas extras (ex. edição no modal, links no perfil); demais usuários não. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-030-01 — Validar: Só para logados

**ID_Regra:** `RN-AUTH-030` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo ou sessão inválida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Abrir Meu perfil sem login.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redirect para Entrar; falha ao carregar perfil também redireciona. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-031-01 — Validar: Dados básicos

**ID_Regra:** `RN-AUTH-031` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil carregado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Perfil com avatar externo válido/inválido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, email, papel (Administrador / Explorador); foto só se URL de avatar for de origem permitida. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-032-01 — Validar: Bio

**ID_Regra:** `RN-AUTH-032` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Com/sem bio salva. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Conta sem bio.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bio visível ou placeholder convidando a editar em Configurações. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-033-01 — Validar: Bloco conta

**ID_Regra:** `RN-AUTH-033` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil OK. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ler seção conta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Email, “membro desde” em pt-BR, visibilidade Público/Privado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-034-01 — Validar: Atalhos

**ID_Regra:** `RN-AUTH-034` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil aberto. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Clicar atalhos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Links para Minha lista e Configurações. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-035-01 — Validar: Ferramentas admin

**ID_Regra:** `RN-AUTH-035` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Role admin. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Logar admin.<br>3. Usuário comum não vê.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para logs de sincronização e ação para baixar log de sync (ferramenta temporária de QA/operações). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-040-01 — Validar: Só para logados

**ID_Regra:** `RN-AUTH-040` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Abrir Configurações sem login.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redirect Entrar se perfil não carrega. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-041-01 — Validar: Campos editáveis

**ID_Regra:** `RN-AUTH-041` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Alterar nome e salvar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, URL do avatar, bio, interruptor perfil público (padrão público se nunca definido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-042-01 — Validar: Salvar perfil

**ID_Regra:** `RN-AUTH-042` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dados válidos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Salvar bio nova → ver perfil.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem inline de sucesso ou erro; perfil reflete mudanças. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-043-01 — Validar: Texto de privacidade

**ID_Regra:** `RN-AUTH-043` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Configurações abertas. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ler copy do toggle.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Explica que perfil público afeta visibilidade de lista/favoritos para outros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-044-01 — Validar: Sem troca de senha aqui

**ID_Regra:** `RN-AUTH-044` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Configurações. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Confirmar ausência de “alterar senha”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não há campos de senha ou email nesta tela. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-050-01 — Validar: Minha lista no menu

**ID_Regra:** `RN-AUTH-050` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Header desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Abrir menu avatar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Entrada para Minha lista no menu do usuário e no mobile. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-051-01 — Validar: Perfil e configurações

**ID_Regra:** `RN-AUTH-051` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ir perfil → configurações.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Perfil no menu; Configurações via perfil ou botão dedicado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-001-01 — Validar: Lista inicial

**ID_Regra:** `RN-CONT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Acesso pelo menu Continuações. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir Continuações offline após visita anterior.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Carrega listas de **Sagas** e **Universos**; falha de rede → listas vazias sem quebrar a página. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-002-01 — Validar: Detalhe de saga

**ID_Regra:** `RN-CONT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Saga válida no catálogo. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar card de saga.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mostra timeline da saga; limpa seleção de universo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-003-01 — Validar: Detalhe de universo

**ID_Regra:** `RN-CONT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Universo válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Link de universo cinematográfico.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mostra universo; força visualização de universos; limpa saga. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-004-01 — Validar: Abas na listagem

**ID_Regra:** `RN-CONT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista carregada. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar abas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Alternar “Sagas” vs “Universos cinematográficos”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-005-01 — Validar: Card de saga

**ID_Regra:** `RN-CONT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias sagas. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Ler card antes de entrar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para detalhe; mostra quantidade de filmes e preview de títulos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-006-01 — Validar: Card de universo

**ID_Regra:** `RN-CONT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Universos com ordem. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Universo com filmes numerados.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para detalhe; preview numérico quando há ordem de obras. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-007-01 — Validar: Timeline da saga

**ID_Regra:** `RN-CONT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Saga com filmes. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir saga longa (ex. franquia).<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Linha do tempo cronológica; texto introdutório da saga se existir. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-008-01 — Validar: Detalhe do universo

**ID_Regra:** `RN-CONT-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Universo com filmes e séries. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Universo compartilhado conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contagens, faixa de anos, descrição, timeline filme+série. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-009-01 — Validar: Abrir obra

**ID_Regra:** `RN-CONT-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item filme ou série. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar filme na timeline.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Abre modal de detalhe com informações mínimas até carregar o restante. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-010-01 — Validar: Sem conteúdo

**ID_Regra:** `RN-CONT-010` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Zero sagas/universos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Ambiente vazio.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem orientando que dados podem depender de sincronização do catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-011-01 — Validar: Voltar à lista

**ID_Regra:** `RN-CONT-011` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Detalhe de saga ou universo. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Voltar pelo link.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link “Todas as sagas” / “Todos os universos” retorna à listagem geral. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-CONT-020-01 — Validar: Abas no modal

**ID_Regra:** `RN-CONT-020` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir filme de saga → abas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesmas regras das abas RN-MODAL-090 a RN-MODAL-092 (continuação/universo sob demanda). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-001-01 — Validar: Empresa inválida

**ID_Regra:** `RN-DEV-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Link quebrado ou id inexistente. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir link de desenvolvedora inválido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem de erro sem carregamento infinito. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-002-01 — Validar: Lista paginada

**ID_Regra:** `RN-DEV-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Empresa com muitos jogos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Empresa grande (Nintendo etc.).<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Primeira leva (~24 jogos); indicador de mais páginas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-003-01 — Validar: Scroll infinito

**ID_Regra:** `RN-DEV-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | `hasMore` verdadeiro. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Rolar até carregar 2ª página.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Próxima página carrega automaticamente ao aproximar do fim (~200px). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-004-01 — Validar: Título da página

**ID_Regra:** `RN-DEV-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resposta com nome. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Empresa sem nome na resposta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cabeçalho com nome da desenvolvedora ou fallback “Desenvolvedora”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-005-01 — Validar: Texto informativo

**ID_Regra:** `RN-DEV-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página aberta. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Ler subtítulo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Copy informa a fonte do catálogo de jogos e que rolar carrega mais títulos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-006-01 — Validar: Grid de jogos

**ID_Regra:** `RN-DEV-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos listados. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Favoritar jogo da grid.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cada jogo é card padrão com ações de lista/favorito. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DEV-007-01 — Validar: Entrada pelo modal

**ID_Regra:** `RN-DEV-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal de jogo aberto. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Jogo → link dev → validar URL.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link da desenvolvedora leva a esta página. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DUB-001-01 — Validar: Carregar créditos

**ID_Regra:** `RN-DUB-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | ID válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Dublador conhecido PT-BR.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, foto e obras dubladas. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DUB-002-01 — Validar: Rótulo de idioma

**ID_Regra:** `RN-DUB-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Metadado de idioma. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Comparar dublador BR vs seiyuu.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Português → “Dublagem em português”; japonês → “Voz original”; outro → texto genérico. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DUB-003-01 — Validar: Tipos na filmografia

**ID_Regra:** `RN-DUB-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Créditos variados. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Grid com anime e filme.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode incluir filme, série, anime e jogo com rótulo de tipo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DUB-004-01 — Validar: Personagem no card

**ID_Regra:** `RN-DUB-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Crédito com personagem. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Card “como {personagem}”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome do personagem no card/poster. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DUB-005-01 — Validar: Abrir detalhe

**ID_Regra:** `RN-DUB-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item na grid. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar anime dublado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal abre para o tipo correto (filme, série, anime, jogo). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-DUB-006-01 — Validar: Voltar para busca

**ID_Regra:** `RN-DUB-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Veio da overlay de busca. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Busca → dublador → voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Voltar reabre busca; **não** reabre modal de filme como na página pessoa. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-001-01 — Validar: Ano padrão

**ID_Regra:** `RN-EVT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página aberta. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir eventos em setembro/2026.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ano atual selecionado; opções = ano atual e cinco anteriores. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-002-01 — Validar: Carregar resumo

**ID_Regra:** `RN-EVT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano escolhido. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Trocar ano.<br>3. Simular erro.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista de eventos do ano; erro → estado de falha sem dados. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-003-01 — Validar: Só eventos com jogos

**ID_Regra:** `RN-EVT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano com eventos vazios e cheios. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Ano com evento “sem jogos” oculto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Evento só aparece se tiver pelo menos um jogo associado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-004-01 — Validar: Contador

**ID_Regra:** `RN-EVT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano com eventos relevantes. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Contar cards vs badge.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Número de eventos exibidos naquele ano. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-005-01 — Validar: Loading e erro

**ID_Regra:** `RN-EVT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta ou falha. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Throttle e offline.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Esqueletos durante carga; mensagem/CTA em falha. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-006-01 — Validar: Ano vazio

**ID_Regra:** `RN-EVT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano sem jogos em eventos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Selecionar ano antigo vazio.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sugestão para escolher outro ano. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-EVT-007-01 — Validar: Jogos por evento

**ID_Regra:** `RN-EVT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Evento com jogos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Expandir/rolar evento E3 etc.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cada evento mostra jogos em cards com interações do usuário. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-001-01 — Validar: Carregar créditos

**ID_Regra:** `RN-PERS-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | ID válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir ator conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, foto, biografia e filmografia carregam. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-002-01 — Validar: Erro e loading

**ID_Regra:** `RN-PERS-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pessoa inexistente. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. URL com id inválido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem de erro ou texto de carregamento. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-003-01 — Validar: Perfil resumido

**ID_Regra:** `RN-PERS-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pessoa com foto e bio longa. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Bio longa → “ver mais” se existir ou clamp.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, foto, biografia truncada (~6 linhas). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-004-01 — Validar: Filmografia

**ID_Regra:** `RN-PERS-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Créditos filmes e séries. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar filme vs série.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards clicáveis; personagem opcional exibido. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-005-01 — Validar: Abrir detalhe da obra

**ID_Regra:** `RN-PERS-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item listado. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar poster na grid.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal de detalhe abre para filme ou série. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-006-01 — Validar: Voltar para busca

**ID_Regra:** `RN-PERS-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fluxo busca → pessoa. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. RN-HEADER-021 / RN-BUSCA-021.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Voltar reabre busca quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-007-01 — Validar: Voltar para modal

**ID_Regra:** `RN-PERS-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Retorno guardado pelo site. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Filme → elenco → voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Voltar reabre modal do filme/série anterior. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PERS-008-01 — Validar: Voltar genérico

**ID_Regra:** `RN-PERS-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Entrada direta na URL. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir pessoa em nova aba → voltar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Botão voltar do browser ou fallback para home. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-001-01 — Validar: Modo destaque inicial

**ID_Regra:** `RN-PREM-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita à página. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir prêmios sem mexer filtros.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Blocos com destaques da **última edição** por categoria. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-002-01 — Validar: Modo filtrado

**ID_Regra:** `RN-PREM-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Tipo, prêmio ou ano ≠ todos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Escolher ano específico.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista paginada (48 itens por página) substitui visão de destaques. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-003-01 — Validar: Opções de filtro

**ID_Regra:** `RN-PREM-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página montada. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Abrir dropdowns de filtro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Listas de nomes de prêmios e anos disponíveis nos seletores. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-004-01 — Validar: Reset de página

**ID_Regra:** `RN-PREM-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Estava na página 2+. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Paginar → mudar ano.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Volta para página 1 ao alterar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-005-01 — Validar: Seções por tipo

**ID_Regra:** `RN-PREM-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro tipo = todos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Filtrar só animes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Até quatro blocos: filmes, séries, animes, jogos; filtrar tipo reduz a um bloco. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-006-01 — Validar: Ver todos da premiação

**ID_Regra:** `RN-PREM-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de destaque visível. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Clicar “ver todos” em um destaque.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Aplica filtros com nome/ano daquele prêmio e tipo da seção. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-007-01 — Validar: Paginação

**ID_Regra:** `RN-PREM-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitos resultados. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Navegar páginas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Anterior/próxima desabilitadas nos limites; texto “Página X de Y”. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-008-01 — Validar: Cards interativos

**ID_Regra:** `RN-PREM-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado/anônimo. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Favoritar indicado logado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards com mesmas ações de favorito/lista das outras páginas. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-PREM-009-01 — Validar: Nenhum resultado

**ID_Regra:** `RN-PREM-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Zero prêmios no critério. |
| Passos | 1. Abrir o site e navegar até **Outras telas** (conforme a regra).<br>2. Ano + prêmio sem combinação.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem pedindo ajustar filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |
