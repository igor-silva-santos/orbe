# Continuações, prêmios, eventos e perfis — Regras de negócio (visão de tela)

**Onde o usuário está:** páginas de descoberta e créditos acessadas pelo menu — **Continuações**, **Premiações**, **Eventos**, **Pessoa**, **Dublador** e **Desenvolvedora** — além de abas de continuação dentro do modal de filme/série.

---

## 1 — Continuações

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-CONT-001 | Lista inicial | Página aberta sem detalhe selecionado. | Acesso pelo menu Continuações. | Carrega listas de **Sagas** e **Universos**; falha de rede → listas vazias sem quebrar a página. | Abrir Continuações offline após visita anterior. |
| RN-CONT-002 | Detalhe de saga | Saga selecionada na navegação. | Saga válida no catálogo. | Mostra timeline da saga; limpa seleção de universo. | Clicar card de saga. |
| RN-CONT-003 | Detalhe de universo | Universo selecionado. | Universo válido. | Mostra universo; força visualização de universos; limpa saga. | Link de universo cinematográfico. |
| RN-CONT-004 | Abas na listagem | Sem detalhe aberto. | Lista carregada. | Alternar “Sagas” vs “Universos cinematográficos”. | Clicar abas. |
| RN-CONT-005 | Card de saga | Preview na grade. | Várias sagas. | Link para detalhe; mostra quantidade de filmes e preview de títulos. | Ler card antes de entrar. |
| RN-CONT-006 | Card de universo | Preview na grade. | Universos com ordem. | Link para detalhe; preview numérico quando há ordem de obras. | Universo com filmes numerados. |
| RN-CONT-007 | Timeline da saga | Detalhe aberto. | Saga com filmes. | Linha do tempo cronológica; texto introdutório da saga se existir. | Abrir saga longa (ex. franquia). |
| RN-CONT-008 | Detalhe do universo | Visão mista. | Universo com filmes e séries. | Contagens, faixa de anos, descrição, timeline filme+série. | Universo compartilhado conhecido. |
| RN-CONT-009 | Abrir obra | Clique em item da timeline. | Item filme ou série. | Abre modal de detalhe com informações mínimas até carregar o restante. | Clicar filme na timeline. |
| RN-CONT-010 | Sem conteúdo | Catálogo vazio. | Zero sagas/universos. | Mensagem orientando que dados podem depender de sincronização do catálogo. | Ambiente vazio. |
| RN-CONT-011 | Voltar à lista | Do detalhe. | Detalhe de saga ou universo. | Link “Todas as sagas” / “Todos os universos” retorna à listagem geral. | Voltar pelo link. |

### Continuações no modal de filme/série

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-CONT-020 | Abas no modal | Detalhe de filme/série com franquia. | Modal aberto. | Mesmas regras das abas RN-MODAL-090 a RN-MODAL-092 (continuação/universo sob demanda). | Abrir filme de saga → abas. |

---

## 2 — Premiações

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PREM-001 | Modo destaque inicial | Filtros no padrão “todos”. | Primeira visita à página. | Blocos com destaques da **última edição** por categoria. | Abrir prêmios sem mexer filtros. |
| RN-PREM-002 | Modo filtrado | Qualquer filtro alterado. | Tipo, prêmio ou ano ≠ todos. | Lista paginada (48 itens por página) substitui visão de destaques. | Escolher ano específico. |
| RN-PREM-003 | Opções de filtro | Carregamento da página. | Página montada. | Listas de nomes de prêmios e anos disponíveis nos seletores. | Abrir dropdowns de filtro. |
| RN-PREM-004 | Reset de página | Mudança de filtro. | Estava na página 2+. | Volta para página 1 ao alterar filtro. | Paginar → mudar ano. |
| RN-PREM-005 | Seções por tipo | Modo destaque. | Filtro tipo = todos. | Até quatro blocos: filmes, séries, animes, jogos; filtrar tipo reduz a um bloco. | Filtrar só animes. |
| RN-PREM-006 | Ver todos da premiação | Botão em destaque. | Card de destaque visível. | Aplica filtros com nome/ano daquele prêmio e tipo da seção. | Clicar “ver todos” em um destaque. |
| RN-PREM-007 | Paginação | Modo filtrado. | Muitos resultados. | Anterior/próxima desabilitadas nos limites; texto “Página X de Y”. | Navegar páginas. |
| RN-PREM-008 | Cards interativos | Obras indicadas. | Logado/anônimo. | Cards com mesmas ações de favorito/lista das outras páginas. | Favoritar indicado logado. |
| RN-PREM-009 | Nenhum resultado | Filtro impossível. | Zero prêmios no critério. | Mensagem pedindo ajustar filtros. | Ano + prêmio sem combinação. |

---

## 3 — Eventos de games

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-EVT-001 | Ano padrão | Seletor no topo. | Página aberta. | Ano atual selecionado; opções = ano atual e cinco anteriores. | Abrir eventos em setembro/2026. |
| RN-EVT-002 | Carregar resumo | Troca de ano. | Ano escolhido. | Lista de eventos do ano; erro → estado de falha sem dados. | Trocar ano; simular erro. |
| RN-EVT-003 | Só eventos com jogos | Relevância. | Ano com eventos vazios e cheios. | Evento só aparece se tiver pelo menos um jogo associado. | Ano com evento “sem jogos” oculto. |
| RN-EVT-004 | Contador | Badge no cabeçalho da lista. | Ano com eventos relevantes. | Número de eventos exibidos naquele ano. | Contar cards vs badge. |
| RN-EVT-005 | Loading e erro | Estados intermediários. | Rede lenta ou falha. | Esqueletos durante carga; mensagem/CTA em falha. | Throttle e offline. |
| RN-EVT-006 | Ano vazio | Nenhum evento relevante. | Ano sem jogos em eventos. | Sugestão para escolher outro ano. | Selecionar ano antigo vazio. |
| RN-EVT-007 | Jogos por evento | Card de evento. | Evento com jogos. | Cada evento mostra jogos em cards com interações do usuário. | Expandir/rolar evento E3 etc. |

---

## 4 — Pessoa — ator/equipe

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PERS-001 | Carregar créditos | Página da pessoa. | ID válido. | Nome, foto, biografia e filmografia carregam. | Abrir ator conhecido. |
| RN-PERS-002 | Erro e loading | ID inválido ou falha. | Pessoa inexistente. | Mensagem de erro ou texto de carregamento. | URL com id inválido. |
| RN-PERS-003 | Perfil resumido | Dados básicos. | Pessoa com foto e bio longa. | Nome, foto, biografia truncada (~6 linhas). | Bio longa → “ver mais” se existir ou clamp. |
| RN-PERS-004 | Filmografia | Grid de obras. | Créditos filmes e séries. | Cards clicáveis; personagem opcional exibido. | Clicar filme vs série. |
| RN-PERS-005 | Abrir detalhe da obra | Clique na filmografia. | Item listado. | Modal de detalhe abre para filme ou série. | Clicar poster na grid. |
| RN-PERS-006 | Voltar para busca | Veio da busca global. | Fluxo busca → pessoa. | Voltar reabre busca quando aplicável. | RN-HEADER-021 / RN-BUSCA-021. |
| RN-PERS-007 | Voltar para modal | Veio do elenco de filme/série. | Retorno guardado pelo site. | Voltar reabre modal do filme/série anterior. | Filme → elenco → voltar. |
| RN-PERS-008 | Voltar genérico | Sem contexto salvo. | Entrada direta na URL. | Botão voltar do browser ou fallback para home. | Abrir pessoa em nova aba → voltar. |

---

## 5 — Dublador

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-DUB-001 | Carregar créditos | Página do dublador. | ID válido. | Nome, foto e obras dubladas. | Dublador conhecido PT-BR. |
| RN-DUB-002 | Rótulo de idioma | Contexto da carreira. | Metadado de idioma. | Português → “Dublagem em português”; japonês → “Voz original”; outro → texto genérico. | Comparar dublador BR vs seiyuu. |
| RN-DUB-003 | Tipos na filmografia | Obras dubladas. | Créditos variados. | Pode incluir filme, série, anime e jogo com rótulo de tipo. | Grid com anime e filme. |
| RN-DUB-004 | Personagem no card | Papel dublado. | Crédito com personagem. | Nome do personagem no card/poster. | Card “como {personagem}”. |
| RN-DUB-005 | Abrir detalhe | Clique na obra. | Item na grid. | Modal abre para o tipo correto (filme, série, anime, jogo). | Clicar anime dublado. |
| RN-DUB-006 | Voltar para busca | Contexto de busca. | Veio da overlay de busca. | Voltar reabre busca; **não** reabre modal de filme como na página pessoa. | Busca → dublador → voltar. |

---

## 6 — Desenvolvedora de jogos

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-DEV-001 | Empresa inválida | Endereço ou identificador incorreto. | Link quebrado ou id inexistente. | Mensagem de erro sem carregamento infinito. | Abrir link de desenvolvedora inválido. |
| RN-DEV-002 | Lista paginada | Catálogo de jogos da empresa. | Empresa com muitos jogos. | Primeira leva (~24 jogos); indicador de mais páginas. | Empresa grande (Nintendo etc.). |
| RN-DEV-003 | Scroll infinito | Usuário rola até o fim. | `hasMore` verdadeiro. | Próxima página carrega automaticamente ao aproximar do fim (~200px). | Rolar até carregar 2ª página. |
| RN-DEV-004 | Título da página | Nome da empresa. | Resposta com nome. | Cabeçalho com nome da desenvolvedora ou fallback “Desenvolvedora”. | Empresa sem nome na resposta. |
| RN-DEV-005 | Texto informativo | Origem dos dados. | Página aberta. | Copy informa a fonte do catálogo de jogos e que rolar carrega mais títulos. | Ler subtítulo. |
| RN-DEV-006 | Grid de jogos | Cards na página. | Jogos listados. | Cada jogo é card padrão com ações de lista/favorito. | Favoritar jogo da grid. |
| RN-DEV-007 | Entrada pelo modal | Link no detalhe do jogo. | Modal de jogo aberto. | Link da desenvolvedora leva a esta página. | Jogo → link dev → validar URL. |
