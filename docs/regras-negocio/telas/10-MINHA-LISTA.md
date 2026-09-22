# Regras de negócio — Minha Lista (todas as rotas)

Rotas sob `/minha-lista/*` e componentes associados.

## Proteção e acesso (`middleware.ts`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-001 | Rotas protegidas | `/minha-lista` e subrotas exigem cookie `orbe_session` com JWT válido; senão redirect `/login?redirect={pathname}`. | `frontend/src/middleware.ts` (linhas 5–26, 31–33) |
| RN-LISTA-002 | Gate de UX | Comentário no middleware: validação de cookie é gate de UX; autorização real fica na API. | `frontend/src/middleware.ts` (linhas 20–21) |

## Hub `/minha-lista` (`app/minha-lista/page.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-010 | Hub por tipo | Página inicial lista quatro tipos (Animes, Filmes, Séries, Jogos); só **Animes** está `available: true` com link `/minha-lista/animes`. | `page.tsx` (linhas 6–35, 69–75) |
| RN-LISTA-011 | Em breve | Tipos indisponíveis renderizam card opaco, sem link, badge “Em breve”. | `page.tsx` (linhas 51–65) |
| RN-LISTA-012 | Mensagem | Copy: organização começa pelos animes. | `page.tsx` (linhas 41–44) |

## Navegação interna (`MinhaListaNav.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-020 | Abas locais | Links: “Catálogo Orbe” (`/minha-lista`) e “Fila Crunchyroll” (`/minha-lista/fila`); destaque por `pathname`. | `MinhaListaNav.tsx` (linhas 6–28) |
| RN-LISTA-021 | Animes fora da nav | Rota `/minha-lista/animes` não aparece na nav lateral (acesso via hub ou header “Mais”). | `MinhaListaNav.tsx` (só dois links); `Header.tsx` (`/minha-lista/animes`) |

## Catálogo Orbe — componente `MinhaListaClient` (não montado em rota atual)

O arquivo implementa a lista unificada de interações (filmes/séries/animes/jogos), mas **nenhuma página importa** `MinhaListaClient` hoje; o hub em `/minha-lista` não usa este fluxo. Regras refletem o código pronto para uso.

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-030 | Auth client-side | Sem `isAuthenticated`, redireciona `/login` e não renderiza. | `MinhaListaClient.tsx` (linhas 80–86, 107–109) |
| RN-LISTA-031 | API lista | `orbeNerdApi.getMinhaLista` com filtros opcionais `status` e `tipo`; 401/403 → login. | `MinhaListaClient.tsx` (linhas 55–77) |
| RN-LISTA-032 | Filtros de status | Abas: Tudo, Quero assistir, Acompanhando, Favoritos, Assistidos/jogados. | `MinhaListaClient.tsx` (linhas 26–32, 119–133) |
| RN-LISTA-033 | Filtros de tipo | Chips: todos os tipos, filme, série, anime, jogo (enviados à API). | `MinhaListaClient.tsx` (linhas 34–40, 136–150) |
| RN-LISTA-034 | Ocultos | Itens com status `oculto` (store local ou API) não aparecem em `visibleItems`. | `MinhaListaClient.tsx` (linhas 88–97) |
| RN-LISTA-035 | Store ao vivo | Status exibido prefere `userInteractions` do Zustand sobre o status da linha da API. | `MinhaListaClient.tsx` (linhas 90–93) |
| RN-LISTA-036 | missingCount | Se API informa itens fora do catálogo, mostra aviso com contagem. | `MinhaListaClient.tsx` (linhas 180–185) |
| RN-LISTA-037 | Empty states | Mensagens distintas para lista vazia total vs filtros sem match. | `MinhaListaClient.tsx` (linhas 100–105, 163–165) |

## Animes — watchlist Crunchyroll `/minha-lista/animes`

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-040 | Visitante | Sem login: tela com CTA “Entrar no Orbe” (middleware já redireciona, mas página trata estado). | `animes/page.tsx` (linhas 86–96) |
| RN-LISTA-041 | Carga inicial | Autenticado: `fetchItems()` do `watchlistStore` no mount. | `animes/page.tsx` (linhas 48–50) |
| RN-LISTA-042 | Última sync | Exibe data formatada `lastSyncedAt` ou mensagem de nunca sincronizado. | `animes/page.tsx` (linhas 65–115) |
| RN-LISTA-043 | Ações toolbar | Atualizar lista, importar backup JSON, importar demo QA (`QA_DEMO_WATCHLIST_ITEMS`). | `animes/page.tsx` (linhas 117–137) |
| RN-LISTA-044 | Banners | `OfflineBanner` e `PushOptInBanner` no topo. | `animes/page.tsx` (linhas 100–101) |
| RN-LISTA-045 | Extensão | `ExtensionPanel` com status da extensão e recheck. | `animes/page.tsx` (linhas 163) |
| RN-LISTA-046 | Filtros watchlist | Tabs: all, andamento (`continuar`/`seguir`), comecar, terminado, dub (`hasDub`); contagens por filtro. | `watchlistStore.ts` (144–159); `animes/page.tsx` (54–63, 165) |
| RN-LISTA-047 | Empty orientado | Mensagem e CTAs dependem se extensão está `installed` (conectar vs instalar). | `animes/page.tsx` (177–198) |
| RN-LISTA-048 | Remoção | Confirmação `window.confirm` antes de `removeItem`. | `animes/page.tsx` (74–84) |
| RN-LISTA-049 | Edição progresso | `EditProgressModal` salva via `updateItem` da store. | `animes/page.tsx` (213–218) |
| RN-LISTA-050 | Sync feedback | Banner success/error após import/sync com botão fechar. | `animes/page.tsx` (142–161); `watchlistStore.ts` (109–120) |
| RN-LISTA-051 | Cache offline | `fetchItems` mantém itens em cache se offline e já havia dados. | `watchlistStore.ts` (77–80) |
| RN-LISTA-052 | Backup legado | `mapLegacyBackupItem` normaliza campos antigos (`malId`, `st`, etc.) antes do sync. | `watchlistStore.ts` (29–44, 112) |
| RN-LISTA-053 | Catálogo manual | `AddAnimeFromCatalog` permite adicionar do catálogo Orbe e refresca lista. | `animes/page.tsx` (linha 140) |

## Fila Crunchyroll `/minha-lista/fila` (`FilaAnimeClient.tsx`)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-060 | Auth | Não autenticado → redirect `/login`. | `FilaAnimeClient.tsx` (58–62, 70) |
| RN-LISTA-061 | Fonte de dados | Lista via `orbeNerdApi.getFilaAnimes()` (prioridade servidor: Continuar → A seguir → Começar). | `FilaAnimeClient.tsx` (63–67); descrição no `PageHeader` (74–76) |
| RN-LISTA-062 | Estados especiais | Labels âmbar para `esperando_dublagem` e `esperando_episodio`. | `FilaAnimeClient.tsx` (129–137) |
| RN-LISTA-063 | Metadados CR | `catalogHint` resume eps no ar, dublados PT-BR e fronteiras sub/dub. | `FilaAnimeClient.tsx` (37–48, 141–143) |
| RN-LISTA-064 | Trilha de áudio | Linha inferior mostra temporada/ep e “Trilha PT-BR” vs “Leg/sub”. | `FilaAnimeClient.tsx` (144–147) |
| RN-LISTA-065 | Abrir anime | Clique na linha abre SuperModal se `row.anime` existir. | `FilaAnimeClient.tsx` (111–114) |
| RN-LISTA-066 | Instrução extensão | Link para watchlist Crunchyroll e nota sobre filtro só dublagem PT-BR no popup. | `FilaAnimeClient.tsx` (80–91) |

## Interações compartilhadas (cards na lista)

| ID | Regra | Descrição | Evidência |
|----|-------|-----------|-----------|
| RN-LISTA-070 | Login para ações | `useMidiaInteraction` exige autenticação; toast se anônimo. | `useMidiaInteraction.ts` (39–42) |
| RN-LISTA-071 | Mapeamento de status | favoritar → `favorito`, quero_assistir, acompanhando, nao_me_interessa → `oculto`. | `useMidiaInteraction.ts` (10–15, 59–67) |
| RN-LISTA-072 | Acompanhando | Menu do card só oferece “Acompanhando” para anime e série. | `MidiaCard.tsx` (203) |
