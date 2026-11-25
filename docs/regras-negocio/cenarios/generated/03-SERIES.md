# Cenários — Séries

**Arquivo inventário:** `03-SERIES.md`

---

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
