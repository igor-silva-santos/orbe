# Cenários — Página inicial

**Arquivo inventário:** `01-HOME.md`

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
