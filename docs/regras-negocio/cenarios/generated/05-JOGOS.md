# Cenários — Jogos

**Arquivo inventário:** `05-JOGOS.md`

---

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
