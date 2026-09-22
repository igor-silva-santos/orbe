# Tela `/` (Home) — Regras de negócio

**Rota:** `/`  
**Componentes:** `frontend/src/app/page.tsx`, `HomeClient.tsx`, `MediaCarousel.tsx`, `AnimeCarousel.tsx`, `MidiaCard.tsx`, `ContinuarAssistindoSection.tsx`  
**API:** `GET /homepage` (`api/src/routes/homeRoutes.ts`), `GET /{filmes|series|jogos}/by-month`, `year-tbd`, `GET /filmes/mais-esperados`, `GET /trending`, `GET /animes/by-season`, `GET /minha-lista/animes/continuar`  
**Utilitários:** `frontend/src/lib/carousel-utils.ts`, `hooks/useCarouselMonthLoader.ts`, `hooks/useCarouselYearTbd.ts`, `api/src/mappers.ts` (`resolveSerieCarouselReleaseDate`), `api/src/qualityFilters.ts`, `api/src/routes/mediaRoutesHelpers.ts`

---

## A — SSR e shell da home

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-SSR-001 | Fetch homepage no servidor | A página chama `fetchHomepage()` no Server Component antes de renderizar o cliente. | API acessível no build/runtime. | `HomeClient` recebe `initialData` com quatro listas. | `page.tsx` L4-12 | Inspecionar props/hidratação com rede ok. |
| RN-HOME-SSR-002 | Degradação se API falha no SSR | Qualquer erro em `fetchHomepage` é capturado. | API indisponível ou 5xx no SSR. | `initialData` = listas vazias para filmes, séries, jogos e animes; a página **não** retorna erro Next. | `page.tsx` L8-9 | Derrubar API e abrir `/`. |
| RN-HOME-SSR-003 | Bootstrap client após SSR vazio | Com listas vazias do SSR, carrosséis disparam `by-month` / `by-season` quando `bootstrapEnabled` fica true. | SSR vazio + seção visível. | Usuário ainda vê conteúdo após loads client (não tela morta). | `useCarouselMonthLoader.ts` L288-317, `HomeClient` bootstrap | Simular falha SSR e scroll até filmes. |
| RN-HOME-HC-001 | Estado local sincronizado com props | `useEffect` reaplica `initialData` quando props do servidor mudam. | Navegação ou revalidação. | `data` state igual ao novo `initialData`. | `HomeClient.tsx` L44-46 | — |
| RN-HOME-HC-002 | Refresh pós-sync na home | `useOrbeDataRefresh` chama `orbeNerdApi.getHomepage()` e substitui as quatro listas. | Evento `orbe:data-refresh` na janela. | Carrosséis recebem dados novos sem `router.refresh` obrigatório. | `HomeClient.tsx` L48-62 | Disparar sync/WS e observar refetch. |
| RN-HOME-HC-003 | Erro silencioso no refresh client | Falha em `getHomepage` no refresh só loga no console. | API down após sync. | Estado anterior permanece; sem toast. | `HomeClient.tsx` L57-58 | — |
| RN-HOME-HC-004 | Ordem das seções | Ordem fixa: hero → Continuar assistindo → Filmes → Séries → Animes → Jogos. | Página carregada. | DOM segue essa sequência. | `HomeClient.tsx` L97-135 | Smoke visual. |
| RN-HOME-HC-005 | Títulos linkam para listagens | Cada `SectionHeading` é `Link` para `/filmes`, `/series`, `/animes`, `/jogos`. | — | Clique navega para rota de categoria. | `HomeClient.tsx` L141-150 | Clicar título “Filmes”. |
| RN-HOME-HC-006 | `startIndex` filmes/séries/jogos | Antes do bootstrap mensal, índice inicial = `resolveCarouselOpenIndex(filterMidiaForCarouselTimeline(data))`. | SSR com itens na janela 90d. | Carrossel tenta abrir no próximo lançamento (regra TL). | `HomeClient.tsx` L104, L114, L132 | Comparar slide focal com data de hoje. |
| RN-HOME-HC-007 | Lazy bootstrap filmes/jogos | `bootstrapEnabled` para filmes e jogos = hero **ou** seção visível (`useSectionVisible`). | Usuário só vê hero. | Fetch mensal de filmes/jogos pode adiar até hero próximo do viewport. | `HomeClient.tsx` L40-42, L105, L133 | Scroll lento: network só ao aproximar `#filmes`. |
| RN-HOME-HC-008 | Lazy bootstrap séries/animes | Séries e animes: `bootstrapEnabled` só quando a própria seção está visível. | Hero visível, séries fora da tela. | Séries não bootstrap até scroll. | `HomeClient.tsx` L115, L123 | — |

---

## B — `GET /homepage` (backend)

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-API-001 | Rate limit homepage | Rota protegida por `homepageRateLimiter`. | Muitas requisições rápidas. | HTTP 429 conforme middleware de segurança. | `homeRoutes.ts` L113 | Stress curl `/homepage`. |
| RN-HOME-API-002 | Cache 12 horas | Resposta cacheada `TWELVE_HOURS` (43200s). | CDN/middleware ativo. | Headers de cache na API. | `homeRoutes.ts` L113 | — |
| RN-HOME-API-003 | Recorte passado/futuro filmes | Busca até 40 filmes com `releaseDate` em [hoje−90d, hoje) desc + até 40 em [hoje, fim mês seguinte] asc; concatena passado **invertido** + futuro. | Data servidor = hoje. | ~80 filmes max; mês atual não “some” por take nos mais antigos. | `homeRoutes.ts` L54-55, L133-140, L195 | Validar presença de lançamento do mês corrente. |
| RN-HOME-API-004 | `recentPastStart` 90 dias | Início do passado recente = hoje − 90 dias, meia-noite local servidor. | — | Alinhado a `CAROUSEL_TIMELINE_PAST_DAYS` no client. | `homeRoutes.ts` L58-63, L119 | Filme lançado há 100d fora do bootstrap. |
| RN-HOME-API-005 | Horizonte futuro filmes/jogos | `nextMonthEnd` = último instante do **mês seguinte** ao mês corrente. | — | Futuro inclui resto do mês atual + mês seguinte completo. | `homeRoutes.ts` L71-72, L138 | Lançamento em M+2 fora do seed. |
| RN-HOME-API-006 | Filmes `homeLaunch: true` | `fetchFilmesForCarousel` com `homeLaunch` aplica runtime mínimo 40 min (ou null) + `filterFilmesHomeLaunchCarousel`. | Filme curta-metragem <40min futuro. | Excluído do seed home se runtime conhecido <40. | `mediaRoutesHelpers.ts` L159-181, `filmeAntecipacao.ts` L4, L96-101 | Filme 30min futuro. |
| RN-HOME-API-007 | Curadoria equilibrada filmes | Where Prisma = `filmeCarouselBalancedWhereInput` + pós `filterFilmesForCarouselBalanced` (exclui concertos). | Título tipo concerto. | Ausente no JSON filmes. | `mediaRoutesHelpers.ts` L168-178, `qualityFilters.ts` L283-317, L415-416 | “Live from Paris” concert. |
| RN-HOME-API-008 | Tags destaque filme no map | Cada filme recebe `resolveFilmeDestaqueFields` com `allowEstreiaSemana: false`. | — | Pills `mais_esperado` etc. conforme `filmeLancamentoTags`. | `homeRoutes.ts` L225-231 | Card com pill esperado. |
| RN-HOME-API-009 | Séries query prioridade | Primeira query: `serieCarouselQualityFilter` + janela [início mês atual, fim mês seguinte] em first/last/next ep ou temporada. | Série com next ep no mês. | Entra em `seriePriority`. | `homeRoutes.ts` L74-91, L141-147 | — |
| RN-HOME-API-010 | Séries query passado recente | Segunda query: mesmas dimensões entre `recentPastStart` e **antes** do início do mês atual. | Episódio há 60d. | Entra em `seriePast`. | `homeRoutes.ts` L93-110, L149-155 | — |
| RN-HOME-API-011 | Dedupe séries por `tmdbId` | Map: entradas de prioridade sobrescrevem antes de passado. | Mesmo id nas duas queries. | Uma entrada; prioridade vence. | `homeRoutes.ts` L196-199 | — |
| RN-HOME-API-012 | Recorte séries `pickAroundToday` | Ordena `sortSeriesByCarouselDate`; recorta 40 antes + 40 depois de hoje usando `resolveSerieCarouselReleaseDate`. | — | Lista centrada em “hoje”. | `homeRoutes.ts` L200-206, `mappers.ts` L714-756 | Série semanal com next ep. |
| RN-HOME-API-013 | Data efetiva série — próximo ep | Se `nextEpisodeAirDate` ≥ hoje → usa essa data no carrossel. | Next ep futuro. | Card posicionado na data do ep. | `mappers.ts` L731-733 | — |
| RN-HOME-API-014 | Data efetiva série — último ep 90d | Senão, se `lastAirDate` ∈ [hoje−90d, hoje] → usa último ep. | Ep exibido ontem. | Série permanece na timeline. | `mappers.ts` L735-737 | — |
| RN-HOME-API-015 | Data efetiva série — temporadas | Senão, temporada recente / próxima / `firstAirDate` nos últimos 90d (ordem no código). | — | Data derivada coerente com comentário no mapper. | `mappers.ts` L740-755 | — |
| RN-HOME-API-016 | Jogos passado/futuro | Mesmo padrão 40+40 em `firstReleaseDate`; include até 4 plataformas. | — | Até ~80 jogos seed. | `homeRoutes.ts` L157-177, L207 | — |
| RN-HOME-API-017 | `jogoQualityFilter` | Jogos devem passar OR rating/ratingCount/hypes/follows mínimos. | Jogo irrelevante IGDB. | Fora do payload. | `qualityFilters.ts` L526-533, `homeRoutes.ts` L159 | — |
| RN-HOME-API-018 | Animes formatos permitidos | Apenas `TV`, `TV_SHORT`, `MOVIE`, `ONA`. | OVA/ SPECIAL no banco. | Não listados no seed home. | `homeRoutes.ts` L182 | — |
| RN-HOME-API-019 | Animes OR de inclusão | (a) `seasonYear`+temporada corrente `getCurrentSeason`; ou (b) `startDate` no mês atual→fim mês seguinte; ou (c) `airingSchedule` entre hoje e hoje+21d. | Anime fora dessas janelas. | Ausente do seed. | `homeRoutes.ts` L115, L121, L183-187 | — |
| RN-HOME-API-020 | `animeQualityFilter` + safe | Exclui hentai (`isAdult`, gênero/tag Hentai); score ou popularidade mínimos. | Hentai tag. | Bloqueado. | `qualityFilters.ts` L493-508 | — |
| RN-HOME-API-021 | Data anime no `pickAroundToday` | Data = primeiro `airingSchedule` futuro (dia) ou `startDate` calendário. | Com próximo airing. | Posição na timeline pelo airing. | `homeRoutes.ts` L208-218 | — |
| RN-HOME-API-022 | Mapper carrossel | Resposta usa `map*ToCarouselCard` (não `map*ToMidia` completo). | — | Payload enxuto para cards. | `homeRoutes.ts` L234-238 | Inspecionar JSON. |
| RN-HOME-API-023 | Erro 500 homepage | Exceção → 500 `{ error: 'Erro ao buscar dados da homepage.' }`. | Falha Prisma. | Client SSR cai no catch (listas vazias). | `homeRoutes.ts` L240-242 | — |

---

## C — Timeline compartilhada (`carousel-utils.ts` + `MediaCarousel`)

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-TL-001 | Janela 90 dias | Só entram itens com data efetiva ≥ hoje−90d (`CAROUSEL_TIMELINE_PAST_DAYS`). | Reestreia há 1 ano. | Removido após `filterMidiaForCarouselTimeline`. | `carousel-utils.ts` L85-96, L244-250 | — |
| RN-HOME-TL-002 | Data efetiva — próximo airing | Se `nextAiringEpisode.airingAt` existe e ≥ hoje, substitui `data_lancamento_api` para posicionamento. | Série com next ep. | Card no mês do ep, não da estreia da série. | `carousel-utils.ts` L31-41 | — |
| RN-HOME-TL-003 | Índice próximo lançamento | `calculateCarouselStartIndex`: primeiro item com data ≥ hoje **e** dentro da janela 90d. | Há futuro na timeline. | Índice desse item. | `carousel-utils.ts` L134-147 | — |
| RN-HOME-TL-004 | Fallback último lançado | Se não há futuro, `calculateLastReleasedIndex` (último ≤ hoje na janela). | Só passado recente. | Abre no último lançado. | `carousel-utils.ts` L152-169 | — |
| RN-HOME-TL-005 | Fallback índice 0 / último slide | `resolveCarouselOpenIndex`: se ambos falham, último índice da lista. | Lista só fora da janela (edge). | Não quebra; índice válido. | `carousel-utils.ts` L198-207 | — |
| RN-HOME-TL-006 | Título do mês no header | Derivado do item focal via `monthTitleFromItem` / `formatCarouselMonthTitle` (pt-BR, capitalizado). | — | “Lançamentos de …” | `carousel-utils.ts` L223-236, `MediaCarousel.tsx` L188-197 | — |
| RN-HOME-TL-007 | Merge por id | `mergeMediaByDate`: dedupe por `id`, ordena por data efetiva. | Dois meses carregados com mesmo filme. | Uma entrada; ordem cronológica. | `carousel-utils.ts` L44-54 | — |
| RN-HOME-TL-008 | Seed SSR marca meses carregados | `initialItems` do month loader registram `monthKey` em `loadedMonthsRef`. | Homepage SSR com itens. | Sem `by-month` redundante para esses meses no mount. | `useCarouselMonthLoader.ts` L67-77 | Network: menos calls by-month. |
| RN-HOME-TL-009 | Bootstrap sequencial sem M−1 | Se SSR insuficiente: carrega mês atual, M+1, M+2 **em série**; **não** prefetch M−1 antes de abrir. | Cold start sem SSR. | Não abre em julho/agosto por prepend acidental. | `useCarouselMonthLoader.ts` L310-315 | Cold start API. |
| RN-HOME-TL-010 | Resolver posição até +6 meses | `resolveOpenPosition` busca próximo lançamento tentando até 6 meses à frente. | Vácuo no mês atual. | Encontra próximo mês com futuro ou cai no último lançado. | `useCarouselMonthLoader.ts` L264-286 | Mês sem lançamentos. |
| RN-HOME-TL-011 | Fila prefetch prioridade | `visible` < `forward` < `backward` na fila de meses. | Scroll rápido. | Mês visível buscado antes dos adjacentes. | `useCarouselMonthLoader.ts` L23-27, L147-149 | — |
| RN-HOME-TL-012 | Borda do mês | A `monthEdgeBuffer` slides do fim/início do mês dispara fetch M+1/M+2 ou M−1. | Índice perto do fim do mês. | Prefetch forward. | `useCarouselMonthLoader.ts` L227-256 | — |
| RN-HOME-TL-013 | Buffer dobra com scroll rápido | `monthEdgeBuffer = fastScrollEnabled ? 8 : 4`. | Toggle Zap ativo. | Prefetch mais cedo. | `MediaCarousel.tsx` L62-63, L114 | — |
| RN-HOME-TL-014 | Ao focar mês garante M+1 e M+2 | `ensureUpcomingMonthsLoaded` enfileira dois meses à frente. | Mudança de mês visível. | Dados futuros prontos. | `useCarouselMonthLoader.ts` L215-224 | — |
| RN-HOME-TL-015 | Navegação mês setas — limite vazios | Até `EMPTY_MONTH_NAV_LIMIT` (8) meses candidatos ao pular mês. | Meses sem títulos. | Não loop infinito. | `MediaCarousel.tsx` L63, L482+ | Clicar seta mês em vácuo. |
| RN-HOME-TL-016 | Prepend ajusta scroll | Se itens prependidos (`firstItemId` mudou), `scrollTo(previousIndex + added)`. | Carregar mês passado. | Viewport não “pula”. | `MediaCarousel.tsx` L413-429 | Scroll para trás no tempo. |
| RN-HOME-TL-017 | Filtro gênero pós-timeline | `applyDisplayFilters` aplica gênero **depois** da janela 90d. | Gênero selecionado. | Lista filtrada; timeline recalculada. | `MediaCarousel.tsx` L124-131 | Filtrar gênero raro. |
| RN-HOME-TL-018 | Mudança de gênero reposiciona | `useEffect` chama `requestScrollToOpenPosition` ao mudar `selectedGenre`. | Trocar gênero. | Volta ao “próximo lançamento” do subconjunto. | `MediaCarousel.tsx` L457-467 | — |
| RN-HOME-TL-019 | Skeleton inicial 10 slides | Até posicionamento, `SKELETON_SLIDE_COUNT=10`, centro `SKELETON_CENTER_INDEX`. | `hasInitialPositioning` true. | Placeholders centralizados (align center Embla). | `MediaCarousel.tsx` L57-59, L253-259 | Reload home. |
| RN-HOME-TL-020 | Ctrl + roda no carrossel | `useCtrlWheelCarousel` navega slides com Ctrl+wheel. | Foco no viewport. | Scroll horizontal do carrossel. | `MediaCarousel.tsx` L251 | Desktop QA. |

---

## D — Ano TBD (TBA) na timeline

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-TBD-001 | Rota isolada | `GET /{tipo}/year-tbd?year=` — não entra na timeline mensal. | Filme só com ano. | Slides append separados. | `useCarouselYearTbd.ts` L17-20 | — |
| RN-HOME-TBD-002 | Critério TBD | `ano_lancamento_api` presente e `data_lancamento_confirmada` falsa/ausente. | — | Classificado TBD. | `useCarouselYearTbd.ts` L85-87 | — |
| RN-HOME-TBD-003 | Append anos corrente..+5 | `displaySlides` adiciona 6 anos de separadores/slides TBD após lista datada. | Modo timeline (não Em alta). | Slides extra no fim. | `MediaCarousel.tsx` L174-176 | Scroll até fim do carrossel. |
| RN-HOME-TBD-004 | Título separador | Copy `Lançamentos de {ano} — sem data confirmada`. | Foco em slide TBD. | Header atualizado. | `useCarouselYearTbd.ts` L81-83, `MediaCarousel.tsx` L355-366 | — |
| RN-HOME-TBD-005 | Prefetch ano corrente no mount | `loadYearTbd(ano atual)` ao montar (se não Em alta). | — | TBD do ano carregado cedo. | `MediaCarousel.tsx` L272-276 | — |
| RN-HOME-TBD-006 | Prefetch ano+1 ao cruzar mês | Ao mudar `monthKey` visível, `loadYearTbd(year + 1)`. | Navegar para dezembro. | Próximo ano TBD buscado. | `MediaCarousel.tsx` L374-379 | — |
| RN-HOME-TBD-007 | Dedupe fetch ano | `loadedYearsRef` evita refetch do mesmo ano. | — | Uma request por ano. | `useCarouselYearTbd.ts` L37-39 | — |

---

## E — Modo “Em alta” (`MediaCarousel`)

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-EA-001 | Desliga timeline | `emAltaMode` true: slides só datados, sem TBD nem prefetch mensal da timeline. | Toggle Em alta. | Sem separadores year-tbd. | `MediaCarousel.tsx` L165-177, L201 | — |
| RN-HOME-EA-002 | Filmes — endpoint | Filmes usam `GET /filmes/mais-esperados?limit=40` (não `filtro=populares`). | Em alta filmes. | Lista por score antecipação. | `MediaCarousel.tsx` L217-220 | Comparar com doc antigo “populares”. |
| RN-HOME-EA-003 | Séries/jogos — trending | `GET /trending?type=series|jogos&limit=40`. | Em alta séries/jogos. | Popularidade/rating conforme `homeRoutes` trending. | `MediaCarousel.tsx` L217-220 | — |
| RN-HOME-EA-004 | Cache por chave filmes | `emAltaLoadedKeyRef` inclui `filmes:${emAltaDisponibilidade}` quando aplicável. | — | Refetch só se chave mudar. | `MediaCarousel.tsx` L212-225 | — |
| RN-HOME-EA-005 | Scroll para 0 ao ativar | `emblaApi.scrollTo(0)` ao entrar Em alta. | Toggle on. | Início da lista em alta. | `MediaCarousel.tsx` L242-247 | — |
| RN-HOME-EA-006 | Ao desligar volta “hoje” | `scrollToToday()` após sair de Em alta. | Toggle off. | Reposiciona na timeline atual. | `MediaCarousel.tsx` L469-479 | — |
| RN-HOME-EA-007 | Gêneros da fonte ativa | Lista de gêneros deriva de `activeSourceItems` (timeline ou em alta). | — | Dropdown coerente com modo. | `MediaCarousel.tsx` L153-158 | — |

---

## F — `AnimeCarousel` (home)

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-AC-001 | Seed `/homepage` | `initialData` do SSR; temporadas extras via `GET /animes/by-season`. | — | Primeira pintura com seed. | `AnimeCarousel.tsx` L38-40, fetch season no arquivo | — |
| RN-HOME-AC-002 | Modo inicial semana 4+ | Se hoje está na ≥4ª semana da temporada corrente → abre **weekly**; senão **launch**. | Data na 4ª semana. | Weekly automático uma vez. | `AnimeCarousel.tsx` L348-364 | Mock data início vs fim de temporada. |
| RN-HOME-AC-003 | Modo inicial não sobrescreve usuário | `initialViewModeApplied` impede reaplicar após toggle manual. | Usuário mudou modo. | Escolha preservada. | `AnimeCarousel.tsx` L135, L350 | Toggle e reload parcial. |
| RN-HOME-AC-004 | Launch — ordenação | Ordena por `animeTimelineDate` (airing ou startDate). | Modo launch. | Cronologia de estreias. | `AnimeCarousel.tsx` L52-60 | — |
| RN-HOME-AC-005 | Launch — abertura corrente | Próximo anime ≥ hoje; senão último ≤ hoje. | Temporada atual. | Scroll inicial coerente. | (lógica build slides no arquivo) | — |
| RN-HOME-AC-006 | Weekly — só com next airing | Agrupa animes com `nextAiringEpisode` por dia da semana local. | Modo weekly. | Separadores por dia. | `AnimeCarousel.tsx` L36, weekly branch | — |
| RN-HOME-AC-007 | Weekly — abre hoje | Posiciona no separador do dia de hoje. | — | Header do dia atual. | weekly scroll no arquivo | — |
| RN-HOME-AC-008 | Toggle launch ↔ weekly | Rebuild slides + scroll pendente. | Clique ícone calendário/lista. | Lista reestruturada. | `AnimeCarousel.tsx` L726 | — |
| RN-HOME-AC-009 | Prefetch temporada mount | Temporada inicial + anterior + posterior (virada WINTER/FALL). | Mount com bootstrap. | 3 seasons em cache. | prefetch no `AnimeCarousel` | — |
| RN-HOME-AC-010 | Buffer borda temporada | 15 slides (25 se fast scroll) da borda dispara prev/next season. | Scroll ao fim. | Fetch próxima estação. | `AnimeCarousel.tsx` L377-405 | — |
| RN-HOME-AC-011 | Filtro client pós-fetch | Formatos relevantes + `!isAdult` mesmo se API incluir adult. | — | Hentai não aparece. | filtros no fetch handler | — |
| RN-HOME-AC-012 | Em alta animes | `GET /animes?filtro=populares&limit=40` + mesmo filtro formato/adult. | Toggle em alta. | Lista popular curada client-side. | `AnimeCarousel` emAlta paths | — |
| RN-HOME-AC-013 | Pins semana logado | Carrega `getAnimeWeeklyPins` se autenticado; limpa se anônimo. | Login/logout. | Store `animeWeeklyPinIds` atualizado. | `AnimeCarousel.tsx` L333-346 | — |
| RN-HOME-AC-014 | Loop Embla só weekly | `loop: viewMode === 'weekly' && !emAltaMode`. | Launch mode. | Sem loop infinito. | `AnimeCarousel.tsx` L192, L208 | — |

---

## G — `MidiaCard` na home

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-CARD-001 | Clique abre SuperModal | Default `onClick` → `openSuperModal(midia, type)`. | Clique no card. | Modal detalhe. | `MidiaCard.tsx` L218-220 | — |
| RN-HOME-CARD-002 | Menu document listener | Menu ⋮ usa listener em `document` (não fixed puro) por transform do Embla. | Abrir menu. | Clique fora fecha. | `MidiaCard.tsx` L100-112 | — |
| RN-HOME-CARD-003 | Ações do menu | Favorito, quero assistir, acompanhando (série/anime), já assisti/joguei, ocultar; anime logado: fixar semana. | — | Itens conforme tipo. | `MidiaCard.tsx` L200-216 | — |
| RN-HOME-CARD-004 | Já assisti/joguei bloqueado | `disabled` se `!midiaHasReleased`; handler ignora se não lançou. | Filme futuro. | Ação indisponível. | `MidiaCard.tsx` L214, L225-226 | — |
| RN-HOME-CARD-005 | Rating antes de assistido | `ja_assisti`/`ja_joguei` abre `openRatingModal` antes de persistir. | Lançado. | Modal de nota. | `MidiaCard.tsx` L226-228 | — |
| RN-HOME-CARD-006 | Badge filme — ordem | pré-venda > em cartaz/sessões > streaming pós-lançamento > em breve. | Flags TMDB/detetive. | Primeira condição verdadeira vence. | `card-status.ts` L69-77 | Matriz de flags. |
| RN-HOME-CARD-007 | Badge série/anime | novo ep (24h) > em exibição > em breve > streaming. | Ep <24h. | “NOVO EP”. | `card-status.ts` L80-102, `MidiaCard.tsx` L138-150 | — |
| RN-HOME-CARD-008 | Novo ep anime vs série | Anime: `data_lancamento_api`; série: `lastAiredEpisode.airingAt`. | — | Janela 24h correta por tipo. | `MidiaCard.tsx` L139-149 | — |
| RN-HOME-CARD-009 | Dublagem no card | Usa `dublagem_info` — não infere de elenco. | Anime dublado sem elenco no card. | “Dublado” correto. | `MidiaCard.tsx` L133-136 | — |
| RN-HOME-CARD-010 | Countdown compartilhado | `<1 dia` tick 1s; senão 1 min (`useSharedTick`). | Next ep amanhã vs hoje. | Atualização de label. | `MidiaCard.tsx` L64-76 | — |
| RN-HOME-CARD-011 | Rodapé próximo ep | Label só se não for “lançamento futuro” puro de anime. | Anime futuro sem ep. | Sem rodapé enganoso. | `MidiaCard.tsx` L152-162 | — |
| RN-HOME-CARD-012 | Saga filme | Link `/continuacoes?saga=` com stopPropagation. | Filme com saga. | Não abre modal ao clicar saga. | handler saga no JSX inferior | — |
| RN-HOME-CARD-013 | Adulto blur | Poster `blur-md` com hover remove blur. | `isAdult` true. | Conteúdo mascarado. | `MidiaCard.tsx` L261 | — |
| RN-HOME-CARD-014 | Indicador lista | Pill de lista só se logado e status favorito/quero/acompanhando. | Anônimo. | Sem pill. | `MidiaCard.tsx` L176-177 | — |
| RN-HOME-CARD-015 | Interação exige login | `useMidiaInteraction` toast se anônimo. | Favoritar deslogado. | Toast erro. | `useMidiaInteraction.ts` | — |

---

## H — Continuar assistindo

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-CA-001 | Oculto anônimo | Componente retorna `null` se `!isAuthenticated`. | Visitante. | Seção ausente. | `ContinuarAssistindoSection.tsx` L23 | — |
| RN-HOME-CA-002 | Oculto lista vazia | `null` se `items.length === 0`. | Logado sem itens. | Seção ausente. | L23 | — |
| RN-HOME-CA-003 | API continuar | `GET /minha-lista/animes/continuar` com auth. | Logado com itens. | Array `results`. | `ContinuarAssistindoSection.tsx` L17-18, `minhaListaAnimesRoutes.ts` L81+ | — |
| RN-HOME-CA-004 | Status API | Backend filtra status `continuar` ou `seguir`, `isRemoved: false`, ordem `updatedAt desc`. | — | Ordem recência. | `minhaListaAnimesRoutes.ts` L87 | — |
| RN-HOME-CA-005 | Limite UI 10 | `slice(0, 10)` no cliente. | >10 itens API. | Máximo 10 cards. | `ContinuarAssistindoSection.tsx` L19 | — |
| RN-HOME-CA-006 | Link Crunchyroll | Se `crunchyrollUrl` → `target=_blank`; senão `/minha-lista/animes`. | Item com URL. | Nova aba. | L37-39 | — |
| RN-HOME-CA-007 | Tempo restante | Mostra `formatRemainingTime` se `remainingTimeSec > 0`. | Ep parcial. | Texto “Restam …”. | L56-59 | — |

---

## I — Hero e CTAs

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-HERO-001 | CTA primário scroll | Botão “Começar agora” faz `scrollIntoView` em `#filmes` (smooth). | — | Não navega rota. | `HomeClient.tsx` L79-84 | — |
| RN-HOME-HERO-002 | CTA secundário promoções | Link `/promocoes?tab=em-alta`. | — | Abre aba em alta. | L86-91 | — |

---

## J — Shell global (impacto na home)

| ID | Nome | Descrição | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOME-SHELL-001 | Layout monta modais globais | `layout.tsx` inclui Header, SearchOverlay, SuperModal, NotificationModal, RatingModal, AppProvider + SyncRefreshListener. | Qualquer rota incl. home. | Cards/modais funcionam na home. | `frontend/src/app/layout.tsx` | Abrir busca e modal a partir do card. |
| RN-HOME-SHELL-002 | Sem AdultContentModal dedicado | Conteúdo adulto: blur no card + filtros API; não há modal de consentimento separado. | Anime adulto (não hentai bloqueado). | Blur apenas. | `qualityFilters.ts` comentário L482-485 | — |
| RN-HOME-SHELL-003 | Fast scroll global | `fastScrollEnabled` no store afeta duração Embla e buffers (carrosséis). | Toggle no header. | Animação mais rápida. | `MediaCarousel.tsx` L109-114 | — |

---

## Notas de divergência (doc legado × código)

| Expectativa antiga | Código atual |
|--------------------|--------------|
| “Em alta” filmes = `?filtro=populares` | Home usa `/filmes/mais-esperados?limit=40` |
| “Em alta” = `/trending` agregado | Séries/jogos: `/trending?type=…&limit=40` |
| `AdultContentModal` na home | Não existe; blur + `animeSafeWhereFilter` |
| Homepage lista todos do mês | Bootstrap ~80/tipo + expansão `by-month`; curadoria forte |

---

## Referência cruzada

- Listagens completas: [`02-FILMES.md`](./02-FILMES.md), [`03-SERIES.md`](./03-SERIES.md), [`04-ANIMES.md`](./04-ANIMES.md)
- Modais e busca acionados pelos cards: [`08-MODAIS.md`](./08-MODAIS.md), [`09-BUSCA-HEADER.md`](./09-BUSCA-HEADER.md)
