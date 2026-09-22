# Telas `/jogos` e `/jogos-em-alta` — Regras de negócio

**Rotas:** `/jogos` (catálogo) · `/jogos-em-alta` (redirect) · conteúdo "Em Alta" também em `/promocoes?tab=em-alta`  
**Objetivo:** Explorar jogos com filtros; consolidar ranking semanal e blocos Steam/IGDB na aba Promoções.  
**Stack:** `jogos/page.tsx`, `JogosClient.tsx`, `jogos-em-alta/page.tsx`, `JogosEmAltaContent.tsx` · API `api/src/routes/jogosRoutes.ts`

---

## Catálogo `/jogos`

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-JOGOS-001 | SSR com revalidação | Dados iniciais de lista + filtros no servidor. | API OK no SSR. | `fetchJogosPageData()` → `GET /jogos` + `GET /jogos/filtros`; `revalidate = 300`. | `jogos/page.tsx`, `apiServer.ts` L164–178 | HTML inicial com jogos; ISR 5 min. |
| RN-JOGOS-002 | Fallback SSR vazio | Erro na busca servidor não derruba a rota. | Exceção em `fetchJogosPageData`. | `emptyData` com filtros vazios. | `jogos/page.tsx` L4–17 | API down no SSR → página vazia funcional. |
| RN-JOGOS-003 | Evitar refetch na hidratação | Primeira renderização cliente usa dados SSR sem duplicar request imediato. | Montagem inicial com `initialData`. | `skipInitialFetch` impede primeiro `useEffect` de chamar API; mudança de filtro dispara busca. | `JogosClient.tsx` L57–85 | Uma chamada SSR; segunda só ao alterar filtro. |
| RN-JOGOS-004 | Filtros enviados à API | Gênero, plataforma, modo, ano e mês mapeados para query string. | Valores ≠ `todos`. | `realApi.getJogos` com parâmetros opcionais. | `JogosClient.tsx` L62–68 | Alterar plataforma → query `plataforma=`. |
| RN-JOGOS-005 | Mês sem ano explícito | Filtro mensal assume ano corrente se ano = todos. | `mes` 1–12, `ano` omitido ou `todos`. | API `parseMonthQuery` usa `new Date().getFullYear()`. | `mediaRoutesHelpers.ts` L60–65, `jogosRoutes.ts` L38–41 | Março + "Todos os Anos" → lançamentos de março do ano atual (UTC). |
| RN-JOGOS-006 | Prioridade mês sobre ano | Mês e ano juntos restringem ao intervalo do mês naquele ano. | `mes` válido. | `firstReleaseDate` entre início/fim do mês UTC; se só `ano`, ano civil completo. | `jogosRoutes.ts` L38–52 | Ano 2023 + mês 6 → só junho/2023. |
| RN-JOGOS-007 | Ordenação padrão alfabética | UI não envia `filtro`; API ordena por nome. | `GET /jogos` sem `filtro=populares`. | `orderBy: { name: 'asc' }`. | `jogosRoutes.ts` L68–71 | Lista A–Z por `name`. |
| RN-JOGOS-008 | Ordenação "populares" na API | Quando `filtro=populares`, popularidade IGDB (`follows`) prevalece. | Query `filtro=populares`. | `follows desc` (nulls last), desempate `rating desc`. | `jogosRoutes.ts` L66–71 | Endpoint com filtro populares vs alfabético. |
| RN-JOGOS-009 | Listagem sem `jogoQualityFilter` | Catálogo `/jogos` não exige rating/hypes mínimos (diferente de em-alta e hoje). | Jogo fraco no banco. | Pode listar se passar filtros de usuário. | `jogosRoutes.ts` L32–90 vs `jogoQualityFilter` | Jogo abaixo do limiar de qualidade visível em `/jogos` mas não em destaques. |
| RN-JOGOS-010 | Paginação e cache | Mesmo contrato que outras listas de mídia. | GET `/jogos`. | `limit` default 48, máx. 200; cache 12 h. | `mediaRoutesHelpers.ts`, `jogosRoutes.ts` L32 | Validar `total` e headers de cache. |
| RN-JOGOS-011 | Seção "O que vem aí" | Próximos jogos do resumo de eventos. | `resumo.proximos.jogos.length > 0`. | `CollapsibleSection` + `HorizontalMediaRow` tipo `jogo`. | `JogosClient.tsx` L91–99 | Com eventos futuros, seção visível. |
| RN-JOGOS-012 | Eventos recentes | Bloco de eventos de games da semana passada / destaques. | `resumo.destaques_recentes.eventos.length > 0`. | Lista de `GameEventCard`. | `JogosClient.tsx` L102–114 | Dados em `/eventos/resumo` com eventos → cards. |
| RN-JOGOS-013 | UI de contagem e empty state | Igual padrão animes: conta `results.length`, empty com sugestão. | Filtros aplicados. | Loading spinner; grid ou mensagem "Nenhum jogo encontrado". | `JogosClient.tsx` L165–187 | Filtro sem match → empty state. |
| RN-JOGOS-014 | Refresh pós-sync | Evento global recarrega lista. | `orbe:data-refresh`. | `useOrbeDataRefresh(loadJogos)`. | `JogosClient.tsx` L77 | Após sync, grade atualiza. |
| RN-JOGOS-015 | Metadados `/jogos/filtros` | Gêneros, plataformas, modos, engines, anos distintos. | GET filtros. | Anos via `getDistinctYears('Jogo','firstReleaseDate')`; cache 24 h. | `jogosRoutes.ts` L245–264 | Dropdowns alinhados à API. |
| RN-JOGOS-016 | Preço Steam sob demanda | Cards podem enriquecer preço via endpoint dedicado (fora da listagem). | Jogo com `steamAppId`. | Cache 15 min; revalida Steam se stale > 6 h ou preço inválido. | `jogosRoutes.ts` L94–156 | `GET /jogos/:id/steam-price` retorna centavos BRL. |

---

## Redirect `/jogos-em-alta`

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-JOGOS-017 | Redirect permanente de rota legada | URL antiga aponta para aba unificada em Promoções. | Request `GET /jogos-em-alta`. | HTTP redirect Next para `/promocoes?tab=em-alta` (sem conteúdo próprio). | `jogos-em-alta/page.tsx` L3–6 | Acessar `/jogos-em-alta` → URL final com `tab=em-alta`. |
| RN-JOGOS-018 | Navegação do site | Links de header/footer usam destino canônico. | Menu principal. | Href `/promocoes?tab=em-alta` label "Jogos em Alta". | `Header.tsx`, `Footer.tsx` | Clicar menu → mesma URL do redirect. |

---

## API e UI `GET /jogos/em-alta` (`JogosEmAltaContent`)

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-JOGOS-019 | Pool de candidatos "recentes" | Jogos elegíveis para destaques semanais. | Consulta em-alta. | `jogoQualityFilter` AND (lançamento ≥ 7 dias OR `hypes >= 5` OR `rating >= 75`); top 150 por `hypes`, `rating`. | `jogosRoutes.ts` L470–491 | Jogo antigo sem hype/nota não entra no pool. |
| RN-JOGOS-020 | Destaques (top 12) | Grid principal da semana. | Pool não vazio. | `destaques = mapped.slice(0, 12)`; UI badges #1–#3 em `JogosEmAltaContent`. | `jogosRoutes.ts` L567, `JogosEmAltaContent.tsx` L176–188 | Até 12 cards; três primeiros numerados. |
| RN-JOGOS-021 | Steam mais jogados | Ranking por jogadores simultâneos. | Jogos com `steamPlayerCount` não nulo. | Até 12, ordenado `steamPlayerCount desc`; seção só se length > 0. | `jogosRoutes.ts` L492–506, L568, UI L197–207 | Com dados Steam, faixa horizontal aparece. |
| RN-JOGOS-022 | Steam promoções (em-alta) | Descontos Steam no payload em-alta. | `steamDiscountPercent >= 10`. | Até 12 em `steam_promocoes` (não exibido como seção separada no componente atual; disponível no JSON). | `jogosRoutes.ts` L507–521, L569 | Inspecionar payload API. |
| RN-JOGOS-023 | Blocos por plataforma | Agrupa por regex em nomes de plataforma. | Pool mapeado. | Blocos PC/Xbox/PlayStation/Nintendo; até 8 jogos cada; oculta bloco com total 0; UI ordena PC→Xbox→PS→Nintendo. | `jogosRoutes.ts` L449–454, L528–533, UI L40–45, L209–217 | Jogo só Switch aparece em Nintendo. |
| RN-JOGOS-024 | Blocos por modo | Multijogador, cooperativo, um jogador. | Modos no jogo mapeado. | Match regex em `modos_jogo`; máx. 8; bloco vazio removido. | `jogosRoutes.ts` L456–460, L535–540 | Co-op listado em bloco Cooperativo. |
| RN-JOGOS-025 | Blocos por gênero (categoria) | Até 6 gêneros com ≥ 2 jogos. | Gêneros em `generos_api`. | Máx. 8 jogos/gênero; ordena por total desc, nome pt-BR. | `jogosRoutes.ts` L542–557, UI L229–238 | Gênero com 1 jogo não vira seção. |
| RN-JOGOS-026 | Label e métrica da semana | Contexto textual para o usuário. | Resposta em-alta. | `semana`: "Semana N · mês ano" (pt-BR); `metrica` menciona Steam+IGDB ou só IGDB se sem Steam. | `jogosRoutes.ts` L559–566 | Sem `STEAM_API_KEY`/dados, texto de fallback na métrica. |
| RN-JOGOS-027 | Modo compacto na aba Promoções | Na tab `em-alta`, cabeçalho semana/métrica e banner opcional. | `PromocoesClient` → `JogosEmAltaContent` `compact` + `showPromocoesBanner`. | Sem bloco semana/métrica; banner link para `/promocoes?tab=promocoes`; skeleton 6 cards. | `PromocoesClient.tsx` L768–769, `JogosEmAltaContent.tsx` L104–174 | Aba Em Alta dentro de Promoções vs página dedicada (redirect). |
| RN-JOGOS-028 | Erro de carregamento em-alta | Falha na API no cliente. | `getJogosEmAlta` rejeita. | Mensagem "Não foi possível carregar os jogos em alta." | `JogosEmAltaContent.tsx` L116–141 | API 500 → card de erro. |
| RN-JOGOS-029 | Cache em-alta | Performance da aba. | GET `/jogos/em-alta`. | `cacheMiddleware(TWELVE_HOURS)`. | `jogosRoutes.ts` L442 | Header cache 12 h. |

---

## Endpoints relacionados (não na grade `/jogos`)

| Endpoint | Regra resumida |
| --- | --- |
| `GET /jogos/steam/trending` | Top 25 `steamPlayerCount`, `jogoQualityFilter` |
| `GET /jogos/steam/sales` | Desconto ≥ 5%, top 25 |
| `GET /jogos/by-year`, `/by-month`, `/year-tbd` | Carrosséis com qualidade + limites de data |
| `GET /jogos/:id/details` | IGDB ao vivo, rate limit |
