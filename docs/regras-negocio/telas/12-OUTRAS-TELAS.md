# Regras de negócio — Continuações, Prêmios, Eventos, Pessoa, Dublador, Desenvolvedora

## Continuações (`app/continuacoes/ContinuacoesClient.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-CONT-001 | Listagem inicial | Carrega `listSagas()` e `listUniversos()` em paralelo; erros resultam em listas vazias. | `ContinuacoesClient.tsx` (167–180) |
| RN-CONT-002 | Query saga | `?saga={id}` carrega detalhe via `getSaga(id)` e limpa universo. | `ContinuacoesClient.tsx` (201–215) |
| RN-CONT-003 | Query universo | `?universo={id}` carrega `getUniverso`, força aba universos e limpa saga. | `ContinuacoesClient.tsx` (201–206, 159) |
| RN-CONT-004 | Abas lista | Sem detalhe aberto: alterna “Sagas” vs “Universos cinematográficos”. | `ContinuacoesClient.tsx` (261–287) |
| RN-CONT-005 | Card saga | Link `/continuacoes?saga={id}`; mostra total de filmes e preview de títulos. | `ContinuacoesClient.tsx` (55–78) |
| RN-CONT-006 | Card universo | Link `/continuacoes?universo={id}`; preview com ordem numérica quando `ordem > 0`. | `ContinuacoesClient.tsx` (81–128) |
| RN-CONT-007 | Detalhe saga | Timeline cronológica de filmes; overview da saga se existir. | `ContinuacoesClient.tsx` (327–339) |
| RN-CONT-008 | Detalhe universo | Contagens filmes/séries, faixa de anos, descrição, timeline mista filme+série. | `ContinuacoesClient.tsx` (290–323) |
| RN-CONT-009 | Clique no item | Abre SuperModal com stub mínimo (`stubMidia`) e tipo `filme` ou `serie`. | `ContinuacoesClient.tsx` (22–46, 221–223) |
| RN-CONT-010 | Empty states | Mensagens orientam sync TMDB quando não há sagas/universos. | `ContinuacoesClient.tsx` (349–363) |
| RN-CONT-011 | Voltar | Em detalhe, link “Todas as sagas” ou “Todos os universos” para `/continuacoes`. | `ContinuacoesClient.tsx` (225–238) |

### Continuações no SuperModal

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-CONT-020 | Tabs no filme/série | Ver RN-MODAL-090 a RN-MODAL-092 em `08-MODAIS.md`. | `ContinuacoesSuperModalTabs.tsx` |

## Prêmios (`app/premios/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-PREM-001 | Modo destaque | Com filtros default (tipo, prêmio e ano = `todos`), carrega `getAwardHighlights()` — última edição por categoria. | `premios/page.tsx` (39–43, 60, 84–88) |
| RN-PREM-002 | Modo filtrado | Qualquer filtro alterado usa `getAwards` paginado (`PAGE_SIZE = 48`). | `premios/page.tsx` (29, 89–99) |
| RN-PREM-003 | Filtros disponíveis | Nomes e anos vêm de `getAwardFilters()` na montagem. | `premios/page.tsx` (63–74) |
| RN-PREM-004 | Reset página | Mudança de filtro zera `page` para 1. | `premios/page.tsx` (76–78) |
| RN-PREM-005 | Seções destaque | Quatro blocos: filmes, séries, animes, jogos; filtro de tipo reduz a uma seção. | `premios/page.tsx` (111–154, 217–268) |
| RN-PREM-006 | Ver todos da premiação | Botão aplica filtro com nome/ano do destaque e tipo da seção. | `premios/page.tsx` (156–161, 231–249) |
| RN-PREM-007 | Paginação | Anterior/próxima desabilitadas nos limites; exibe “Página X de Y”. | `premios/page.tsx` (276–299) |
| RN-PREM-008 | Cards interativos | `MidiaCard` + `useMidiaInteraction` (mesmas regras de login/lista). | `premios/page.tsx` (26–27, 254–261, 305–312) |
| RN-PREM-009 | Empty filtrado | Mensagem para ajustar filtros quando `awards.length === 0`. | `premios/page.tsx` (316–320) |

## Eventos (`app/eventos/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-EVT-001 | Ano default | Seletor inicia em `CURRENT_YEAR`; opções = ano atual e 5 anteriores. | `eventos/page.tsx` (14–15, 21, 72–75) |
| RN-EVT-002 | Carga | `getEventosResumo(year)`; erro deixa `resumo` nulo. | `eventos/page.tsx` (24–35) |
| RN-EVT-003 | Filtro relevância | Só lista eventos de games com pelo menos um jogo (`jogos.length` ou `total_jogos > 0`). | `eventos/page.tsx` (41–46, 101) |
| RN-EVT-004 | Contador | Badge com quantidade de eventos relevantes no ano selecionado. | `eventos/page.tsx` (77–80) |
| RN-EVT-005 | Loading / erro | Skeleton de cards; estado de falha com CTA textual. | `eventos/page.tsx` (84–97) |
| RN-EVT-006 | Empty ano | Se nenhum evento relevante no ano, sugere outro ano. | `eventos/page.tsx` (104–109) |
| RN-EVT-007 | GameEventCard | Cada evento renderiza jogos com `MidiaCard` e interações do usuário. | `eventos/page.tsx` (111–119); `GameEventCard` (import) |

## Pessoa (`app/pessoa/[id]/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-PERS-001 | API | `GET /pessoas/{id}/creditos` via `apiClient`. | `pessoa/[id]/page.tsx` (41–42) |
| RN-PERS-002 | Erro | Falha mostra mensagem destrutiva; loading textual. | `pessoa/[id]/page.tsx` (123–126) |
| RN-PERS-003 | Perfil | Nome, foto (`profilePath`), biografia truncada (`line-clamp-6`). | `pessoa/[id]/page.tsx` (130–148) |
| RN-PERS-004 | Filmografia | Grid clicável; tipos `filme` e `serie`; personagem opcional. | `pessoa/[id]/page.tsx` (152–185) |
| RN-PERS-005 | Abrir mídia | Stub mínimo + `openSuperModal(stub, mediaType)`. | `pessoa/[id]/page.tsx` (57–72) |
| RN-PERS-006 | Voltar busca | Se `orbe:returnTo === 'search'`, reabre busca e `router.back()`. | `pessoa/[id]/page.tsx` (74–80) |
| RN-PERS-007 | Voltar modal | Se `orbe:superModalReturn` válido, volta histórico e reabre SuperModal com detalhes `realApi` (filme ou série). | `pessoa/[id]/page.tsx` (83–100) |
| RN-PERS-008 | Fallback voltar | Senão, `router.back()` ou `/`. | `pessoa/[id]/page.tsx` (106–110) |

## Dublador (`app/dublador/[id]/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-DUB-001 | API | `GET /dubladores/{id}/creditos`. | `dublador/[id]/page.tsx` (47–48) |
| RN-DUB-002 | Idioma | Label derivado de `language`: português → “Dublagem em português”; japonês → “Voz original”; senão genérico. | `dublador/[id]/page.tsx` (123–128) |
| RN-DUB-003 | Tipos de mídia | Filmografia pode incluir filme, série, anime, jogo (`MEDIA_LABEL`). | `dublador/[id]/page.tsx` (28–33, 168) |
| RN-DUB-004 | Personagem no card | Overlay no pôster e linha “como {character}” quando há personagem. | `dublador/[id]/page.tsx` (156–167) |
| RN-DUB-005 | Abrir mídia | Mesmo padrão stub + SuperModal para os quatro tipos. | `dublador/[id]/page.tsx` (63–78) |
| RN-DUB-006 | Voltar | Suporta retorno à busca (`orbe:returnTo`); não reimplementa `superModalReturn` (diferente de pessoa). | `dublador/[id]/page.tsx` (80–90) |

## Desenvolvedora (`app/desenvolvedora/[id]/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-DEV-001 | ID inválido | `companyId` não finito ou ≤ 0 → erro sem chamar API. | `desenvolvedora/[id]/page.tsx` (16, 31–35) |
| RN-DEV-002 | Paginação | `getDeveloperGames(companyId, page, PAGE_SIZE=24)`; `hasMore` controla scroll infinito. | `desenvolvedora/[id]/page.tsx` (12, 40–45) |
| RN-DEV-003 | Infinite scroll | `IntersectionObserver` com `rootMargin: 200px` carrega página seguinte. | `desenvolvedora/[id]/page.tsx` (62–78) |
| RN-DEV-004 | Título | Nome da empresa da resposta API ou fallback “Desenvolvedora”. | `desenvolvedora/[id]/page.tsx` (41, 96–98) |
| RN-DEV-005 | Catálogo IGDB | Copy informa origem IGDB e scroll para mais jogos. | `desenvolvedora/[id]/page.tsx` (99–101) |
| RN-DEV-006 | Grid jogos | Cada jogo é `MidiaCard` tipo `jogo` com interações. | `desenvolvedora/[id]/page.tsx` (119–129) |
| RN-DEV-007 | Entrada pelo modal | Links a partir de `JogoInfoBlock` no SuperModal (`/desenvolvedora/{igdbId}`). | `JogoInfoBlock.tsx` (73–74) |
