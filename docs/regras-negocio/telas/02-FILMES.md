# Tela `/filmes` — Regras de negócio

**Rota:** `/filmes`  
**Objetivo:** Catálogo navegável de filmes com atalhos de curadoria (em cartaz, em breve, populares), filtros facetados e destaques editoriais vindos do resumo de eventos.  
**Arquivos-fonte (frontend):** `frontend/src/app/filmes/page.tsx`, `frontend/src/app/filmes/FilmesClient.tsx`  
**Arquivos-fonte (API):** `api/src/routes/filmesRoutes.ts`, `api/src/routes/mediaRoutesHelpers.ts`, `api/src/qualityFilters.ts`  
**Endpoints usados pela tela:** `GET /filmes`, `GET /filmes/filtros` · **Cliente:** `fetchFilmesPageData` (`frontend/src/lib/apiServer.ts`), `realApi.getFilmes` (`frontend/src/data/realApi.ts`)

### Contraste com o carrossel da home

| Aspecto | Tela `/filmes` (`GET /filmes`) | Carrossel home (`GET /filmes/homepage-carousel`, `fetchFilmesForCarousel`) |
| --- | --- | --- |
| Filtro Prisma principal | `filmeQualityFilter` / `getFilmeQualityFilterForYear` (DISPLAY) | `filmeCarouselBalancedWhereInput` + exclusão de concertos + pós-filtro `filterFilmesForCarouselBalanced` |
| Concertos / stand-up | Podem aparecer se passarem qualidade DISPLAY | Excluídos por `filmeCarouselConcertExclusionFilter` e `isConcertOrLiveRecording` |
| Limite de itens | Paginado (`DEFAULT_LIST_LIMIT` 48, máx. 200) | `CAROUSEL_ITEM_LIMIT` (120), sem paginação na rota do carrossel |
| Janela de datas | Qualquer filme no banco que passe `where` | Homepage: `releaseDate` entre ano atual −5 e +5 |
| Mapper de saída | `mapFilmeToMidia` (grade) | Carrossel por ano/mês: `mapFilmeToCarouselCard`; homepage-carousel usa `mapFilmeToMidia` |
| `homeLaunch` / runtime | Não aplicado na listagem | `homeLaunch: true` exige runtime ≥ `HOME_LAUNCH_MIN_RUNTIME_MINUTES` ou `null` |
| UI de atalhos | Botões Em Cartaz / Em Breve / Populares | Não exposto na home — curadoria automática no backend |

---

## Regras

| ID | Nome | Descrição completa | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |

| RN-FILMES-001 | SSR paralelo lista+filtros | A página `/filmes` é Server Component que busca dados antes de hidratar o cliente. | API acessível em build/runtime. | `fetchFilmesPageData()` dispara em paralelo `GET /filmes` e `GET /filmes/filtros`; monta `FilmesPageData`. | `page.tsx` L12–20, `apiServer.ts` L112–126 | Abrir `/filmes`; inspecionar HTML inicial com cards quando API OK. |
| RN-FILMES-002 | ISR revalidate 300 | Página participa de revalidação incremental do Next. | Deploy Next com ISR. | `export const revalidate = 300` (~5 min). | `page.tsx` L10 | Após deploy, confirmar política de cache da rota no Next. |
| RN-FILMES-003 | Degradação SSR | Falha no fetch servidor não derruba a rota. | `fetchFilmesPageData` lança. | `FilmesClient` recebe `emptyData`: lista vazia e filtros vazios. | `page.tsx` L4–8, L14–17 | Simular API 500 no SSR; página abre com empty state. |
| RN-FILMES-004 | Cabeçalho estático | Título e descrição da área são fixos no cliente. | Usuário em `/filmes`. | `PageHeader` título "Filmes" e descrição sobre cartaz, lançamentos e clássicos. | `FilmesClient.tsx` L100–103 | Validar copy no topo da página. |
| RN-FILMES-005 | Gaveta O que vem aí | Seção horizontal de lançamentos futuros de filmes. | `useEventosResumo` retorna `resumo.proximos.filmes.length > 0`. | `CollapsibleSection` id `filmes-o-que-vem-ai`, `HorizontalMediaRow` type `filme`. | `FilmesClient.tsx` L105–114 | Com payload em `/eventos/resumo`; sem itens a seção não renderiza. |
| RN-FILMES-006 | Interações na gaveta futuros | Cards da gaveta usam store de interações. | Seção visível. | `userInteractions` do `useAppStore` e `useMidiaInteraction` em `onInteraction`. | `FilmesClient.tsx` L38–39, L107–112 | Favoritar card na gaveta; estado reflete como na grade. |
| RN-FILMES-007 | Gaveta Em cartaz destaque | Segunda gaveta editorial acima dos filtros. | `resumo.destaques_recentes.filmes.length > 0`. | `CollapsibleSection` id `filmes-em-cartaz-destaque`, ícone Clapperboard, título "Em cartaz". | `FilmesClient.tsx` L116–125 | Com destaques no resumo; sem dados bloco ausente. |
| RN-FILMES-008 | Resumo de eventos no cliente | Gavetas não vêm do SSR da página de filmes. | Montagem do cliente. | `useEventosResumo` chama `getEventosResumo()` uma vez após hidratar. | `useEventosResumo.ts` L15–31 | Network: request `/eventos/resumo` após load da página. |
| RN-FILMES-009 | Atalho Todos os Filmes | Primeiro botão de filtro rápido. | Clique no botão Grid. | `selectedFilter = 'todos'`; request sem query `filtro`. | `FilmesClient.tsx` L51, L58–59, L71 | Clicar "Todos"; `GET /filmes` sem parâmetro filtro. |
| RN-FILMES-010 | Atalho Em Cartaz | Segundo atalho restringe flag de cartaz. | Clique "Em Cartaz". | `filtro=em_cartaz` na API; `where.emCartaz = true`. | `FilmesClient.tsx` L60, L71; `filmesRoutes.ts` L77–78 | Ativar atalho; só filmes com `emCartaz`. |
| RN-FILMES-011 | Atalho Em Breve | Terceiro atalho para estreias futuras curadas. | Clique "Em Breve". | `filtro=em_breve`; `where.emBreve = true`. | `FilmesClient.tsx` L61; `filmesRoutes.ts` L79–80 | Filme só `emBreve` aparece; outros somem. |
| RN-FILMES-012 | Atalho Populares | Quarto atalho altera ordenação. | Clique "Populares". | `filtro=populares`; `orderBy.popularity desc`. | `FilmesClient.tsx` L62; `filmesRoutes.ts` L103 | Lista reordenada por popularidade decrescente. |
| RN-FILMES-013 | Estilo do atalho ativo | Feedback visual do filtro rápido selecionado. | Qualquer atalho clicado. | Botão ativo: `bg-primary text-primary-foreground`; inativo: `bg-muted`. | `FilmesClient.tsx` L133–137 | Alternar atalhos; apenas um com estilo primário. |
| RN-FILMES-014 | Sentinela todos em gênero | Gênero "Todos" não restringe API. | Select em "Todos os Gêneros". | Parâmetro `genero` omitido em `getFilmes`. | `FilmesClient.tsx` L72 | Network sem `genero`. |
| RN-FILMES-015 | Capitalização de gênero na UI | Labels de gênero são formatados no select. | Lista `availableGenres` populada. | Opção exibe `genre.charAt(0).toUpperCase() + genre.slice(1)`. | `FilmesClient.tsx` L155–158 | Gênero "action" aparece "Action" no dropdown. |
| RN-FILMES-016 | Filtro ano sentinela | Ano "Todos" libera qualquer ano (sujeito a qualidade). | Select "Todos os Anos". | `ano` omitido na request. | `FilmesClient.tsx` L73 | Sem query `ano`. |
| RN-FILMES-017 | Lista de anos do SSR | Anos do dropdown vêm de `/filmes/filtros`. | SSR OK. | `availableYears` inicial = `initialData.filters.years` (desc no SQL). | `apiServer.ts` L122; `mediaRoutesHelpers.ts` L41–50 | Comparar anos do select com JSON de filtros. |
| RN-FILMES-018 | Filtro mês com calendário fixo | Meses 1–12 com labels em português. | Select de mês. | Constante `MONTHS` com value string `'1'`…`'12'`. | `FilmesClient.tsx` L18–31, L189–192 | Janeiro value `1`; dezembro `12`. |
| RN-FILMES-019 | Mês todos omite parâmetro | "Todos os Meses" não envia `mes`. | Mês em todos. | `mes` undefined na API. | `FilmesClient.tsx` L74 | Request sem `mes`. |
| RN-FILMES-020 | Status com label traduzido | Opções de status vêm do backend com `value` e `label`. | `/filmes/filtros` retorna statuses. | Select usa `status.label` para exibição e `status.value` no value. | `FilmesClient.tsx` L206–209; `filmesRoutes.ts` L266–269 | Label em PT quando `translateTmdbStatus` conhece o status. |
| RN-FILMES-021 | Filtro plataforma streaming | Restringe filmes com provider específico. | Plataforma selecionada ≠ todos. | API: `streamingProviders.some.provider.name = plataforma`. | `FilmesClient.tsx` L76; `filmesRoutes.ts` L70–74 | Netflix no select; só filmes com Netflix. |
| RN-FILMES-022 | Plataformas ordenadas A–Z | Metadado de filtros. | `GET /filmes/filtros`. | `platforms` de providers com filmes, `orderBy name asc`. | `filmesRoutes.ts` L257–261 | Ordem alfabética no select. |
| RN-FILMES-023 | Selects desabilitados por flag | Estado `isLoadingFilters` controla disabled. | Flag true (hoje nunca setada no código). | Selects com `disabled={isLoadingFilters}` e opacidade reduzida. | `FilmesClient.tsx` L44, L151 | Buscar no código: flag permanece false — selects sempre habilitados. |
| RN-FILMES-024 | skipInitialFetch na montagem | Evita duplicar request logo após SSR. | Primeira montagem do cliente com dados SSR. | Primeiro `useEffect` de `loadFilmes` retorna sem chamar API; ref `skipInitialFetch`. | `FilmesClient.tsx` L65, L89–95 | Abrir `/filmes`; apenas 2 requests SSR (lista+filtros), sem terceiro GET imediato no client. |
| RN-FILMES-025 | Refetch ao mudar filtro | Após primeira montagem, qualquer mudança de filtro recarrega. | Usuário altera select ou atalho. | `loadFilmes` executado; dependências no `useCallback`. | `FilmesClient.tsx` L67–85, L89–96 | Trocar gênero; novo `GET /filmes` com query. |
| RN-FILMES-026 | Refresh global orbe:data-refresh | Sync de dados dispara recarga. | Evento `orbe:data-refresh` na window. | `useOrbeDataRefresh(loadFilmes)` reexecuta com filtros atuais. | `useOrbeDataRefresh.ts`; `FilmesClient.tsx` L87 | Disparar evento após sync; lista atualiza. |
| RN-FILMES-027 | Loading na grade | Durante fetch cliente a grade some. | `isLoading true`. | Spinner central `loading-spinner` em vez do grid. | `FilmesClient.tsx` L239–242 | Mudar filtro; spinner até resposta. |
| RN-FILMES-028 | Contador usa total da API | Texto de resultados reflete `total` do backend, não só página. | Resposta com `total` > `results.length`. | `totalResults` de `response.total_results`; pluralização filme/filmes. | `FilmesClient.tsx` L79, L234–236; `realApi.ts` L50–51 | Com >48 filmes, contador mostra total global (ex.: 200) enquanto grade mostra 48. |
| RN-FILMES-029 | Contador em loading | Durante carregamento não mostra número stale enganoso. | `isLoading`. | Texto "Carregando...". | `FilmesClient.tsx` L235 | Trocar filtro; label Carregando. |
| RN-FILMES-030 | Grid responsivo de cards | Layout da listagem principal. | `filmes.length > 0` e não loading. | Grid 2–5 colunas, `max-w-[210px]`, `MidiaCard` type `filme`. | `FilmesClient.tsx` L244–254 | Redimensionar viewport; colunas mudam. |
| RN-FILMES-031 | Empty state | Nenhum resultado após filtros. | `filmes.length === 0` e não loading. | Ícone Filter, título "Nenhum filme encontrado", hint ajustar filtros. | `FilmesClient.tsx` L257–267 | Filtro impossível; mensagem central. |
| RN-FILMES-032 | Erro de API no cliente silencioso na UI | Falha no fetch não limpa necessariamente lista anterior. | `getFilmes` throw (realApi retorna vazio no catch). | `console.error`; `realApi` devolve `{results:[], total_results:0}`. | `FilmesClient.tsx` L80–81; `realApi.ts` L53–55 | API offline no client; grade pode zerar após erro. |
| RN-FILMES-033 | Paginação padrão API | Listagem backend paginada. | `GET /filmes` sem page/limit. | `page=1`, `limit=48` (máx. 200). | `mediaRoutesHelpers.ts` L19–27 | curl `/filmes`; validar limit 48. |
| RN-FILMES-034 | Resposta JSON listagem | Formato estável para o frontend. | GET bem-sucedido. | `{ results, total, page, limit }`; results mapeados `mapFilmeToMidia`. | `filmesRoutes.ts` L105–115 | Validar campos no JSON. |
| RN-FILMES-035 | Include cardListInclude | Cards trazem gêneros, providers e coleção. | Query findMany. | `include: cardListInclude` (até 4 providers, collection). | `filmesRoutes.ts` L108; `mediaRoutesHelpers.ts` L138–142 | Card na UI mostra gêneros/streaming quando existem. |
| RN-FILMES-036 | Qualidade DISPLAY padrão | Sem ano/mês específico aplica filtro restritivo. | GET sem `ano` e sem `mes` válido. | `allConditions` inclui `filmeQualityFilter`. | `filmesRoutes.ts` L58–59; `qualityFilters.ts` L111–133 | Filme sem poster não listado. |
| RN-FILMES-037 | Poster obrigatório na qualidade | Parte do filtro DISPLAY. | Filme `posterPath` null. | Excluído de `/filmes`. | `qualityFilters.ts` L113 | Filme sem poster ausente na grade. |
| RN-FILMES-038 | Sinopse obrigatória DISPLAY | Overview não vazia. | Overview null ou "". | Excluído salvo exceções em cartaz/breve no OR de engajamento. | `qualityFilters.ts` L114–115 | Filme sem sinopse fora de emCartaz/emBreve tende a sumir. |
| RN-FILMES-039 | Adulto excluído DISPLAY | Conteúdo adulto TMDB. | `adult: true`. | Excluído (`adult false ou null`). | `qualityFilters.ts` L116 | Filme adulto não na listagem pública. |
| RN-FILMES-040 | Engajamento OR em DISPLAY | Popularidade ou votos ou flags de cartaz. | Filme marginal. | Passa se `popularity>=30` OU `voteCount>=100` OU `emCartaz` OU `emBreve`. | `qualityFilters.ts` L118–123 | Filme em cartaz com baixa pop ainda aparece. |
| RN-FILMES-041 | Gate voteAverage DISPLAY | Nota mínima quando muitos votos. | `voteCount > 50`. | Exige `voteAverage >= 6.0` salvo voteCount baixo/null. | `qualityFilters.ts` L125–131 | Filme nota 5.5 com 200 votos filtrado. |
| RN-FILMES-042 | Qualidade relaxada ano corrente+ | Ano filtrado >= ano atual usa filtro mais permissivo. | `GET /filmes?ano=2026` (ano >= currentYear). | `getFilmeQualityFilterForYear` retorna `filmeQualityFilterRelaxed`. | `qualityFilters.ts` L103–108 | Estreia futura com pop 10 pode entrar no ano atual. |
| RN-FILMES-043 | Filtro por ano civil | Restringe `releaseDate` ao ano calendário. | `ano` numérico ≠ todos, sem mês. | Intervalo 1/jan–31/dez UTC local Date + qualidade do ano. | `filmesRoutes.ts` L52–57 | Ano 2020 só filmes desse ano. |
| RN-FILMES-044 | Filtro por mês | Parâmetro `mes` com opcional `ano`. | `mes` 1–12. | `parseMonthQuery`; filtra `releaseDate` no range UTC do mês; qualidade conforme ano. | `filmesRoutes.ts` L43–51; `mediaRoutesHelpers.ts` L60–66 | Março 2025: só estreias desse mês. |
| RN-FILMES-045 | Mês sem ano usa ano corrente | Default de parseMonthQuery. | `mes=3` sem ano. | Ano = `new Date().getFullYear()`. | `mediaRoutesHelpers.ts` L63 | Em setembro, `mes=9` filtra setembro do ano atual. |
| RN-FILMES-046 | Filtro gênero por nome | Match exato no nome do gênero. | `genero=Action`. | `genres.some.genero.name`. | `filmesRoutes.ts` L62–64 | Só filmes com gênero Action. |
| RN-FILMES-047 | Filtro status TMDB | Status bruto do banco. | `status=Released`. | `where.status = status`. | `filmesRoutes.ts` L66–68 | Status filtrado na query. |
| RN-FILMES-048 | Filtro lancados (API only) | Data de lançamento já passou. | `filtro=lancados` (não exposto na UI atual). | `releaseDate <= now`. | `filmesRoutes.ts` L81–82 | curl com filtro lancados. |
| RN-FILMES-049 | Filtro futuros (API only) | Lançamentos futuros por data. | `filtro=futuros`. | `releaseDate >= now`. | `filmesRoutes.ts` L83–84 | curl filtro futuros. |
| RN-FILMES-050 | Disponibilidade cinema (API) | Subfiltro para modo Em Alta. | `disponibilidade=cinema`. | `estreia_cinema` e OR em cartaz/breve/sessões/pré-venda. | `filmesRoutes.ts` L90–94 | Não há UI em FilmesClient; testar via API. |
| RN-FILMES-051 | Disponibilidade streaming (API) | Filmes com streaming. | `disponibilidade=streaming`. | `estreia_streaming` OU qualquer provider. | `filmesRoutes.ts` L95–98 | curl disponibilidade=streaming. |
| RN-FILMES-052 | Ordenação alfabética default | Sem filtro populares. | `filtro` ausente ou todos. | `orderBy.title asc`. | `filmesRoutes.ts` L103 | Primeiro card alfabético por título. |
| RN-FILMES-053 | Cache HTTP listagem 12h | Resposta cacheada no edge/API. | GET `/filmes` 200. | `cacheMiddleware(TWELVE_HOURS)`. | `filmesRoutes.ts` L37 | Header/cache conforme middleware. |
| RN-FILMES-054 | Endpoint filtros 24h | Metadados de facetas. | `GET /filmes/filtros`. | genres com filmes, years DISTINCT, statuses distinct, platforms; cache 24h. | `filmesRoutes.ts` L242–271 | 200 com arrays; erro 500. |
| RN-FILMES-055 | Gêneros só com filmes | Evita gêneros órfãos. | Query genres. | `where: { filmes: { some: {} } }`. | `filmesRoutes.ts` L244–247 | Gênero sem filme não no select. |
| RN-FILMES-056 | Anos DISTINCT SQL | Performance F-07. | getDistinctYears Filme releaseDate. | `EXTRACT(YEAR)` ordenado DESC. | `mediaRoutesHelpers.ts` L41–50 | Anos sem duplicata no filtro. |
| RN-FILMES-057 | Carrossel homepage janela ±5 anos | Contraste home vs listagem aberta. | `GET /filmes/homepage-carousel`. | `releaseDate` entre currentYear±5; `fetchFilmesForCarousel` + balanced filter. | `filmesRoutes.ts` L306–319 | Filme fora da janela pode estar em `/filmes` mas não no carrossel. |
| RN-FILMES-058 | Carrossel exclui concertos | Pós-filtro balanced. | Título tipo "Live from Paris". | Removido por `filterFilmesForCarouselBalanced`. | `qualityFilters.ts` L403–411; `mediaRoutesHelpers.ts` L178 | Mesmo filme pode aparecer em `/filmes` se passar DISPLAY. |
| RN-FILMES-059 | homeLaunch runtime mínimo | Só rotas de carrossel com flag. | `fetchFilmesForCarousel` homeLaunch true. | Runtime null OU >= HOME_LAUNCH_MIN_RUNTIME_MINUTES. | `mediaRoutesHelpers.ts` L159–163 | Listagem `/filmes` não aplica gate de runtime. |
| RN-FILMES-060 | Detalhes rate limit + cache 300s | Fora da grade. | `GET /filmes/:id/details`. | 400 id inválido; 404 não encontrado; `detailsRateLimiter`; cache 300s. | `filmesRoutes.ts` L123–151 | Id abc → 400. |
| RN-FILMES-061 | Destaques no detalhe ao vivo | Enriquecimento mais esperado / estreia. | Detalhe encontrado. | Merge `resolveFilmeDestaqueFields` com `maisEsperadoIds`. | `filmesRoutes.ts` L136–147 | Pills no JSON de detalhe. |
| RN-FILMES-062 | Admin PUT filme | Edição restrita. | PUT com adminMiddleware. | 400 sem campos; update por tmdbId; invalida cache mídia. | `filmesRoutes.ts` L216–238 | Sem token admin → 403. |
| RN-FILMES-063 | Mais esperados ranking | Endpoint de antecipação. | `GET /filmes/mais-esperados`. | Horizonte 120 dias; `sortFilmesByAntecipacaoScore`; pills mais_esperado. | `filmesRoutes.ts` L279–302 | Não renderizado diretamente em FilmesClient. |
| RN-FILMES-064 | By-year carrossel cards | Carrossel temporal. | `GET /filmes/by-year?year=`. | 400 ano inválido; `mapFilmeToCarouselCard`. | `filmesRoutes.ts` L327–345 | Diferente mapper da grade. |
| RN-FILMES-065 | By-month carrossel | Mês obrigatório válido. | year+month query. | `parseYearMonthQuery`; fetchFilmesForCarousel. | `filmesRoutes.ts` L348–365 | 400 se mês inválido. |
| RN-FILMES-066 | Year-tbd isolado | Lançamentos só com ano. | `GET /filmes/year-tbd`. | `yearOnlyFilmeWhere`; order releaseYear. | `filmesRoutes.ts` L369–384 | Não mistura timeline mensal. |
| RN-FILMES-067 | realApi total_pages | Adapter frontend. | Resposta API com total e limit. | `total_pages = ceil(total/limit)`; `total_results = total`. | `realApi.ts` L47–51 | Cliente usa total_results no contador. |
| RN-FILMES-068 | serverFetch revalidate alinhado | SSR usa mesma janela ISR. | fetchFilmesPageData. | `next: { revalidate: REVALIDATE_SECONDS }` em serverFetch. | `apiServer.ts` L92–94 | Coerente com page revalidate 300. |

---

## Referências cruzadas (API — não montadas diretamente na grade `/filmes`)

| Endpoint | Uso |
| --- | --- |
| `GET /filmes/:id/details` | Modal/página de detalhe (TMDB ao vivo) |
| `GET /filmes/mais-esperados` | Ranking de antecipação (home/outras telas) |
| `GET /filmes/homepage-carousel` | Carrossel multimídia da home |
| `GET /filmes/by-year`, `/by-month`, `/year-tbd` | Carrosséis temporais com curadoria reforçada |
| `PUT /filmes/:id` | Admin |
| `GET /pessoas/:id/creditos` | Filmografia (filmes + séries) |
