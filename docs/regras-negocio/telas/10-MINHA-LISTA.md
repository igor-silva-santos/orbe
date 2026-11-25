# Minha Lista — Regras de negócio (visão de tela)

**Onde o usuário está:** área **Minha Lista** do site (menu do usuário, menu “Mais” ou atalhos equivalentes), exclusiva para quem entrou na conta.

**O que existe neste fluxo:** hub por tipo de mídia; lista de animes sincronizada com Crunchyroll; fila de assistir; navegação interna entre “Catálogo Orbe” e “Fila Crunchyroll”.

---

## 1 — Acesso e proteção

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-001 | Rotas exigem login | Qualquer área sob Minha Lista. | Visitante não autenticado. | Redirecionamento para tela de **Entrar**, com retorno para a página que tentou abrir após login bem-sucedido. | Anônimo tenta abrir lista de animes pelo menu. |
| RN-LISTA-002 | Camada de UX | O site barra acesso visual cedo; ações sensíveis ainda dependem da sessão válida. | Visitante vs logado. | Sem login não vê conteúdo da lista; logado vê dados pessoais. | Comparar anônimo (redirect) vs logado. |

---

## 2 — Hub Minha Lista (escolha do tipo)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-010 | Quatro tipos de mídia | Página inicial da Minha Lista. | Usuário logado. | Cards: Animes, Filmes, Séries, Jogos; **somente Animes** leva a uma lista ativa hoje. | Clicar Animes vs Filmes. |
| RN-LISTA-011 | “Em breve” | Tipos ainda não disponíveis. | Hub aberto. | Filmes, Séries e Jogos aparecem esmaecidos, sem link, com selo “Em breve”. | Tentar clicar Filmes no hub. |
| RN-LISTA-012 | Mensagem orientadora | Copy da página. | Hub aberto. | Texto explicando que a organização começa pelos animes. | Ler texto introdutório. |

---

## 3 — Navegação interna

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-020 | Abas Catálogo vs Fila | Barra local em subpáginas. | Logado em Minha Lista. | Links “Catálogo Orbe” (hub) e “Fila Crunchyroll”; aba atual destacada. | Alternar entre hub e fila. |
| RN-LISTA-021 | Animes fora da barra | Acesso à lista de animes. | Logado. | A lista de animes não aparece na barra lateral; acesso via hub, header “Mais” ou atalhos. | Confirmar links da nav vs entrada por animes. |

---

## 4 — Catálogo Orbe unificado (componente preparado)

Regras abaixo descrevem o fluxo de **lista única** de interações (todos os tipos). O hub atual ainda não monta essa tela; serve para QA quando a rota for ligada.

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-030 | Exige login na tela | Renderização client-side. | Sessão expirada na página. | Redireciona para Entrar; nada da lista é mostrado. | Abrir rota futura sem cookie. |
| RN-LISTA-031 | Carregar lista pessoal | Dados do usuário. | Logado. | Grid de obras conforme filtros; falha de permissão → Entrar. | Aplicar filtros e recarregar. |
| RN-LISTA-032 | Filtro por status | Abas de estado. | Lista com itens variados. | Abas: Tudo, Quero assistir, Acompanhando, Favoritos, Assistidos/jogados. | Clicar cada aba. |
| RN-LISTA-033 | Filtro por tipo | Chips de mídia. | Lista mista. | Chips: todos, filme, série, anime, jogo restringem o grid. | Filtrar só jogos. |
| RN-LISTA-034 | Itens ocultos | Status “oculto” / não me interessa. | Itens marcados como ocultos. | Não aparecem na lista visível. | Marcar “não me interessa” e voltar à lista. |
| RN-LISTA-035 | Status ao vivo | Alterações recentes nos cards. | Mudar status em outra tela sem recarregar. | Lista reflete ação mais recente do usuário sobre o card. | Favoritar na home → abrir minha lista. |
| RN-LISTA-036 | Aviso de itens faltantes | Obras salvas fora do catálogo atual. | Conta com referências antigas. | Mensagem com quantidade de itens não encontrados no catálogo. | Conta de teste com `missingCount` se existir. |
| RN-LISTA-037 | Listas vazias | Sem itens ou filtro sem match. | Lista vazia vs filtros restritivos. | Mensagens diferentes para “nada na lista” vs “nenhum item neste filtro”. | Zerar filtros vs filtro impossível. |

---

## 5 — Animes — watchlist Crunchyroll

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-040 | Visitante | Fallback se a página carregar sem sessão. | Usuário não logado (cenário raro nesta rota). | CTA “Entrar no Orbe”; em fluxo normal o redirect de RN-LISTA-001 ocorre antes. | Validar RN-LISTA-001; esta regra cobre mensagem na página se aplicável. |
| RN-LISTA-041 | Carregar ao abrir | Lista de animes pessoal. | Logado. | Ao entrar na página, lista e estados carregam automaticamente. | Abrir animes logado. |
| RN-LISTA-042 | Última sincronização | Informação de frescor dos dados. | Conta com/sem sync prévia. | Data/hora da última sync ou texto de nunca sincronizado. | Conta nova vs conta com extensão. |
| RN-LISTA-043 | Ações da barra | Ferramentas no topo. | Página animes. | Botões: atualizar lista, importar backup de arquivo, importar demo (ambiente QA). | Clicar atualizar; importar arquivo demo se disponível. |
| RN-LISTA-044 | Banners informativos | Topo da página. | Página carregada. | Banners de offline e opt-in de notificações push quando aplicável. | Simular offline; ver banner. |
| RN-LISTA-045 | Painel da extensão | Integração Crunchyroll. | Página animes. | Bloco com status da extensão do navegador e opção de verificar de novo. | Com/sem extensão instalada. |
| RN-LISTA-046 | Filtros da watchlist | Abas locais. | Lista com vários estados. | Abas: todos, em andamento (continuar/seguir), começar, terminado, dublagem PT-BR; contagens por aba. | Alternar abas e contar itens. |
| RN-LISTA-047 | Lista vazia orientada | Sem animes na lista. | Zero itens. | Mensagem e CTAs diferentes se extensão instalada (conectar) vs não instalada (instalar). | Conta vazia com/sem extensão. |
| RN-LISTA-048 | Remover item | Exclusão de um anime. | Item na lista. | Diálogo de confirmação do navegador antes de remover. | Remover um título → cancelar e confirmar. |
| RN-LISTA-049 | Editar progresso | Temporada/episódio assistido. | Item com progresso. | Modal de edição; salvar atualiza card. | Editar S2 E5 → salvar. |
| RN-LISTA-050 | Feedback de sync/import | Após atualizar ou importar. | Operação concluída. | Banner verde ou vermelho com opção fechar. | Sync com sucesso e com erro. |
| RN-LISTA-051 | Modo offline | Sem rede após já ter dados. | Lista já carregada uma vez. | Itens anteriores permanecem visíveis offline quando possível. | Carregar → offline → recarregar. |
| RN-LISTA-052 | Backup antigo | Import de arquivo legado. | Arquivo backup formato antigo. | Campos normalizados (identificadores e status antigos mapeados) após import. | Importar backup legado de QA. |
| RN-LISTA-053 | Adicionar do catálogo | Inclusão manual. | Logado. | Fluxo “adicionar do catálogo Orbe” refresca a lista após incluir. | Adicionar anime pelo catálogo interno. |

---

## 6 — Fila Crunchyroll

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-060 | Exige login | Mesmo padrão das demais rotas. | Anônimo. | Redirect para Entrar. | Abrir fila sem login. |
| RN-LISTA-061 | Ordem da fila | Prioridade de assistir. | Logado com fila populada. | Ordem: **Continuar** → **A seguir** → **Começar** (conforme descrição no cabeçalho da página). | Validar ordem dos blocos/linhas. |
| RN-LISTA-062 | Estados especiais | Espera de dublagem ou episódio. | Itens nesses estados. | Rótulos em destaque âmbar para “esperando dublagem” e “esperando episódio”. | Itens de teste nesses estados. |
| RN-LISTA-063 | Dicas de catálogo CR | Texto auxiliar por linha. | Item na fila. | Resumo de episódios no ar, dublados PT-BR e fronteira sub/dub quando existir. | Ler hint sob um anime. |
| RN-LISTA-064 | Trilha de áudio | Informação de legenda vs dublagem. | Item com metadados. | Linha com temporada/ep e “Trilha PT-BR” ou “Leg/sub”. | Comparar anime dub vs sub. |
| RN-LISTA-065 | Abrir detalhe | Clique na linha. | Anime ligado ao catálogo Orbe. | Abre modal de detalhe do anime. | Clicar linha com anime resolvido. |
| RN-LISTA-066 | Ajuda extensão | Orientação na página. | Página fila. | Link para watchlist Crunchyroll e nota sobre filtro de dublagem PT-BR no popup da extensão. | Ler bloco de instruções. |

---

## 7 — Ações nos cards (compartilhado)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-LISTA-070 | Login para interagir | Favoritar, listas, etc. | Anônimo em tela que mostra cards (ex. após bug). | Toast pedindo login; ação não conclui. | Deslogar e tentar favoritar na lista. |
| RN-LISTA-071 | Significado dos status | Menu do card. | Logado. | Favorito, quero assistir, acompanhando; “não me interessa” oculta da lista principal. | Aplicar cada status. |
| RN-LISTA-072 | Acompanhando só anime/série | Opção no menu. | Card de filme vs anime. | “Acompanhando” oferecido para anime e série; não para filme/jogo da mesma forma. | Abrir menu em filme e anime. |
