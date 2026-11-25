# Cenários — Busca e cabeçalho

**Arquivo inventário:** `09-BUSCA-HEADER.md`

---

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
