# Cenários — Outras telas

**Arquivo inventário:** `12-OUTRAS-TELAS.md`

---

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
