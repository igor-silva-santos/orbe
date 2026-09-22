# Cenários — Filmes

**Arquivo inventário:** `02-FILMES.md`

---

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
