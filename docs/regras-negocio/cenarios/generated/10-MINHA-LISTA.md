# Cenários — Minha lista

**Arquivo inventário:** `10-MINHA-LISTA.md`

---

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
