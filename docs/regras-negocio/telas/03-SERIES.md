# Tela `/series` — Regras de negócio

**Rota:** `/series`  
**Objetivo:** Catálogo navegável de séries com filtros por gênero, ano, mês, status e plataforma, mais gaveta "O que vem aí" alimentada por eventos.  
**Arquivos-fonte (frontend):** `frontend/src/app/series/page.tsx`, `frontend/src/app/series/SeriesClient.tsx`  
**Arquivos-fonte (API):** `api/src/routes/seriesRoutes.ts`, `api/src/routes/mediaRoutesHelpers.ts`, `api/src/qualityFilters.ts`  
**Endpoints usados pela tela:** `GET /series`, `GET /series/filtros` · **Cliente:** `fetchSeriesPageData`, `realApi.getSeries`

### Contraste com o carrossel da home

| Aspecto | Tela `/series` (`GET /series`) | Carrossel home (`GET /series/homepage-carousel`) |
| --- | --- | --- |
| Filtro de qualidade | **Nenhum** — `where` pode ser `{}` se sem filtros | `serieQualityFilter` (poster, sinopse, adulto, engajamento, nota mínima, ≥2 episódios) |
| Episódios mínimos | Não exige `numberOfEpisodes` na listagem | Exige `numberOfEpisodes >= MIN_SERIE_EPISODES` (2) salvo exceções do carrossel mensal |
| Limite | Paginação 48 padrão | `take: CAROUSEL_ITEM_LIMIT` (120) |
| Janela de datas | Sem restrição global de ano | `firstAirDate` entre ano atual −5 e +5 |
| Mapper | `mapSerieToMidia` | `mapSerieToCarouselCard` |
| Atalhos rápidos na UI | Ausentes (só selects) | N/A na home |
| Seção "Em cartaz" na página | N/A | Filmes têm `destaques_recentes.filmes`; séries **não** renderizam bloco equivalente |

---

## Regras

| ID | Nome | Descrição completa | Pré-condições | Resultado esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |

| RN-SERIES-001 | SSR paralelo lista+filtros | Server Component busca lista e filtros antes do cliente. | API OK. | `fetchSeriesPageData` paralelo `/series` e `/series/filtros`. | `page.tsx` L12–20, `apiServer.ts` L129–143 | HTML inicial com dados quando API responde. |
| RN-SERIES-002 | ISR revalidate 300 | Revalidação incremental. | Next ISR. | `revalidate = 300` na page. | `page.tsx` L10 | Política ~5 min. |
| RN-SERIES-003 | Degradação SSR | Falha não quebra rota. | fetch lança. | `emptyData` com filtros vazios. | `page.tsx` L4–8 | API down no SSR → vazio. |
| RN-SERIES-004 | Cabeçalho Séries | Copy fixa. | Em `/series`. | Título "Séries" e descrição universo de séries. | `SeriesClient.tsx` L91 | Validar header. |
| RN-SERIES-005 | Gaveta O que vem aí | Única gaveta editorial na página de séries. | `resumo.proximos.series.length > 0`. | CollapsibleSection `series-o-que-vem-ai`, type serie. | `SeriesClient.tsx` L93–101 | Sem equivalente "Em cartaz" que filmes têm. |
| RN-SERIES-006 | Sem gaveta destaques recentes | Diferença intencional vs `/filmes`. | Resumo com destaques_recentes.series. | **Não renderizado** em SeriesClient. | Contraste `FilmesClient.tsx` L116–125 vs `SeriesClient.tsx` | Destaques existem no resumo mas UI de séries ignora. |
| RN-SERIES-007 | Interações gaveta | Store + hook de mídia. | Gaveta visível. | `useMidiaInteraction`, `userInteractions`. | `SeriesClient.tsx` L38–39, L95–99 | Favoritar na gaveta. |
| RN-SERIES-008 | Eventos resumo cliente | Fetch `/eventos/resumo` pós-hidratação. | Mount. | `useEventosResumo` uma vez. | `useEventosResumo.ts` | Request resumo após load. |
| RN-SERIES-009 | Sem atalhos rápidos | Não há botões todos/cartaz/populares. | UI `/series`. | Apenas grid de selects; `filtro` nunca enviado pelo cliente. | `SeriesClient.tsx` L104–190 | Network: sem query filtro ao filtrar. |
| RN-SERIES-010 | Ordenação default nome | API sem filtro populares na UI. | GET /series. | `orderBy.name asc`. | `seriesRoutes.ts` L69 | Ordem alfabética por nome. |
| RN-SERIES-011 | Filtro populares só via API | Parâmetro suportado mas não exposto. | `filtro=populares` manual. | `popularity desc`. | `seriesRoutes.ts` L69 | curl com populares. |
| RN-SERIES-012 | Gênero sentinela todos | Omitir genero na request. | Todos os Gêneros. | `genero` undefined. | `SeriesClient.tsx` L63 | Sem query genero. |
| RN-SERIES-013 | Capitalização gênero UI | Mesmo padrão filmes. | Genres no select. | Primeira letra maiúscula. | `SeriesClient.tsx` L115–118 | Label formatado. |
| RN-SERIES-014 | Ano todos | Sem restrição de ano. | Todos os Anos. | `ano` omitido. | `SeriesClient.tsx` L64 | Request sem ano. |
| RN-SERIES-015 | Ano específico firstAirDate | Backend filtra estreia da série. | `ano=2022`. | `firstAirDate` entre 1/jan e 31/dez do ano. | `seriesRoutes.ts` L44–48 | Só séries estreadas em 2022. |
| RN-SERIES-016 | Mês com parseMonthQuery | Filtra por mês de estreia. | `mes` válido. | `firstAirDate` no range UTC do mês. | `seriesRoutes.ts` L40–43 | Março filtra estreias de março. |
| RN-SERIES-017 | Mês sem ano corrente | Default ano atual. | mes sem ano. | Ano corrente em parseMonthQuery. | `mediaRoutesHelpers.ts` L63 | Setembro + mes=9. |
| RN-SERIES-018 | Status filtro | Status TMDB. | status selecionado. | `where.status`. | `seriesRoutes.ts` L57–59 | Filtrar Released etc. |
| RN-SERIES-019 | Plataforma filtro | Provider de streaming. | plataforma ≠ todos. | `streamingProviders.some.provider.name`. | `seriesRoutes.ts` L61–65 | Netflix only. |
| RN-SERIES-020 | MONTHS PT-BR | Labels de mês idênticos a filmes. | Select mês. | Constante MONTHS 1–12. | `SeriesClient.tsx` L18–31 | Janeiro label correto. |
| RN-SERIES-021 | skipInitialFetch | Não refetch imediato pós-SSR. | Primeira montagem. | Ref impede primeiro loadSeries no effect. | `SeriesClient.tsx` L57, L80–86 | Sem GET duplicado instantâneo. |
| RN-SERIES-022 | Refetch em mudança de filtro | Após skip inicial. | Alterar select. | loadSeries com deps. | `SeriesClient.tsx` L59–76 | Novo GET /series. |
| RN-SERIES-023 | useOrbeDataRefresh | Evento global. | orbe:data-refresh. | Recarrega com filtros atuais. | `SeriesClient.tsx` L78 | Disparar evento. |
| RN-SERIES-024 | Loading spinner | isLoading true. | Fetch em andamento. | Spinner central. | `SeriesClient.tsx` L199–200 | Ver spinner. |
| RN-SERIES-025 | Contador total API | Usa total_results. | total > page size. | Plural série/séries; total global. | `SeriesClient.tsx` L70, L194–196 | Contador 150 com 48 cards. |
| RN-SERIES-026 | Carregando label | Durante load. | isLoading. | "Carregando...". | `SeriesClient.tsx` L195 | Texto loading. |
| RN-SERIES-027 | Grid cards serie | MidiaCard type serie. | series.length > 0. | Grid 2–5 colunas max-w 210px. | `SeriesClient.tsx` L202–207 | Layout responsivo. |
| RN-SERIES-028 | Empty state séries | Zero resultados. | series vazio. | "Nenhuma série encontrada". | `SeriesClient.tsx` L210–214 | Filtro vazio. |
| RN-SERIES-029 | Erro API cliente | realApi catch. | Falha rede. | results [] e log error. | `realApi.ts` L76–78 | Offline. |
| RN-SERIES-030 | Listagem SEM quality filter | Diferencial crítico vs carrossel. | GET /series sem filtros. | `where = {}` — nenhum `serieQualityFilter`. | `seriesRoutes.ts` L67–68 | Série 1 episódio sem sinopse pode listar se no banco. |
| RN-SERIES-031 | Paginação 48 default | parsePagination. | Sem params. | page 1 limit 48 max 200. | `mediaRoutesHelpers.ts` L24–27 | curl /series. |
| RN-SERIES-032 | Resposta JSON | Formato listagem. | 200 OK. | results mapSerieToMidia, total, page, limit. | `seriesRoutes.ts` L71–84 | Schema JSON. |
| RN-SERIES-033 | Include genres e providers | findMany include. | Query listagem. | genres+genero, streamingProviders+provider (sem take 4 explícito — todos na relação). | `seriesRoutes.ts` L74–77 | Card mostra gêneros. |
| RN-SERIES-034 | Cache 12h listagem | middleware. | GET /series. | TWELVE_HOURS. | `seriesRoutes.ts` L34 | Cache header. |
| RN-SERIES-035 | Filtros endpoint 24h | /series/filtros. | GET. | Mesma estrutura filmes; genres com series some. | `seriesRoutes.ts` L156–190 | 200 filtros. |
| RN-SERIES-036 | Anos firstAirDate | DISTINCT years. | getDistinctYears Serie. | Anos da data de estreia. | `seriesRoutes.ts` L163 | Anos no select. |
| RN-SERIES-037 | Status traduzidos | translateTmdbStatus. | statuses no filtros. | value + label PT. | `seriesRoutes.ts` L180–183 | Label localizado. |
| RN-SERIES-038 | Carrossel home serieQualityFilter | Contraste curadoria. | homepage-carousel. | AND serieQualityFilter + janela ±5 anos firstAirDate. | `seriesRoutes.ts` L203–220; `qualityFilters.ts` L419–439 | Série fraca na listagem mas forte no carrossel só se passar filtro — inverso: fraca pode estar só na listagem. |
| RN-SERIES-039 | Carrossel MIN 2 episódios | DISPLAY série. | serieQualityFilter. | numberOfEpisodes >= 2. | `qualityFilters.ts` L438 | Listagem /series não aplica. |
| RN-SERIES-040 | Carrossel poster+overview | Qualidade display. | homepage. | poster not null, overview não vazia, não adulto. | `qualityFilters.ts` L421–424 | Mesmos campos não exigidos na listagem. |
| RN-SERIES-041 | Engajamento carrossel | Pop ou votos. | serieQualityFilter. | pop>=30 OR voteCount>=100. | `qualityFilters.ts` L426–429 | Listagem sem gate. |
| RN-SERIES-042 | Vote average gate carrossel | Nota mínima com muitos votos. | voteCount>50. | voteAverage>=6 ou exceções. | `qualityFilters.ts` L431–437 | Só no carrossel/home filter. |
| RN-SERIES-043 | serieCarouselQualityFilter mensal | by-month usa filtro mais permissivo para estreias. | GET /series/by-month. | AND serieCarouselQualityFilter + serieCarouselDateInRange. | `seriesRoutes.ts` L273–277 | Planned/In Production passam com menos episódios. |
| RN-SERIES-044 | serieCarouselDateInRange | Múltiplas datas para carrossel mensal. | by-month. | OR firstAirDate, lastAirDate, nextEpisodeAirDate, seasons.airDate no mês. | `mediaRoutesHelpers.ts` L115–131 | Série com episódio no mês entra no carrossel mensal. |
| RN-SERIES-045 | sortSeriesByCarouselDate | Pós-processamento mensal. | by-month findMany. | Ordenação custom após query. | `seriesRoutes.ts` L273 | Ordem estável no carrossel. |
| RN-SERIES-046 | By-year carrossel | Ano query obrigatório. | year inválido. | 400; serieQualityFilter + firstAirDate no ano. | `seriesRoutes.ts` L229–261 | Diferente de listagem aberta. |
| RN-SERIES-047 | Year-tbd séries | Só ano confirmado. | /series/year-tbd. | yearOnlySerieWhere + serieCarouselQualityFilter. | `seriesRoutes.ts` L291–310 | TBA isolado. |
| RN-SERIES-048 | Carrossel lite include seasons | Metadados para cards. | homepage-carousel. | serieCarouselLiteInclude: até 6 temporadas com airDate. | `mediaRoutesHelpers.ts` L104–112 | Cards carrossel com contexto temporada. |
| RN-SERIES-049 | mapSerieToCarouselCard vs Midia | Formato card home. | Carrossel endpoints. | Mapper carousel na home; listagem mapSerieToMidia. | `seriesRoutes.ts` L221 vs L84 | Campos podem diferir levemente. |
| RN-SERIES-050 | Limite 120 carrossel | CAROUSEL_ITEM_LIMIT. | homepage. | take 120. | `seriesRoutes.ts` L218 | Listagem pagina 48. |
| RN-SERIES-051 | Detalhes série live | TMDB ao vivo. | GET /series/:id/details. | 400 id; 404; rate limit; cache 300s. | `seriesRoutes.ts` L92–106 | Detalhe modal. |
| RN-SERIES-052 | Episódios temporada | Rota auxiliar. | seasonNumber válido. | JSON { episodes }; 400 params inválidos. | `seriesRoutes.ts` L109–126 | Temporada 1 episódios. |
| RN-SERIES-053 | Admin PUT série | Edição admin. | PUT /series/:id. | mapSerieAdminUpdate; invalidate caches. | `seriesRoutes.ts` L130–152 | 403 sem admin. |
| RN-SERIES-054 | isLoadingFilters nunca true | Paridade com filmes. | Código atual. | Selects disabled só se flag true — permanece false. | `SeriesClient.tsx` L44, L111 | Sempre habilitado. |
| RN-SERIES-055 | realApi total_results | Mapeamento total. | getSeries OK. | total_results = response.total. | `realApi.ts` L70–74 | Contador correto. |
| RN-SERIES-056 | serverFetch ISR | SSR alinhado. | fetchSeriesPageData. | revalidate no fetch. | `apiServer.ts` | Coerente 300s. |
| RN-SERIES-057 | Where vazio permitido | Nenhum filtro query. | GET /series limpo. | Prisma where `{}` retorna qualquer série no banco (paginada). | `seriesRoutes.ts` L67 | Série obscura pode aparecer — diferente carrossel. |
| RN-SERIES-058 | Gêneros filtros só com séries | Facet genres. | /series/filtros. | `series: { some: {} }`. | `seriesRoutes.ts` L158–160 | Gênero órfão ausente. |
| RN-SERIES-059 | Plataformas com séries | Providers. | filtros. | where series some. | `seriesRoutes.ts` L171–175 | Lista plataformas. |
| RN-SERIES-060 | Erro 500 listagem | Exceção Prisma. | Erro interno. | 500 JSON erro buscar séries. | `seriesRoutes.ts` L85–87 | Simular erro DB. |
| RN-SERIES-061 | Erro 500 filtros | Falha agregação. | /series/filtros throw. | 500 opções filtros. | `seriesRoutes.ts` L187–189 | 500 filtros. |
| RN-SERIES-062 | Contraste episódios planejados | Carousel quality permite status Planned. | Série Planned 0 eps futura. | Pode entrar carrossel mensal; listagem /series sem filtro qualidade inclui também. | `qualityFilters.ts` L453–467 | Validar presença em cada superfície. |

---

## Referências cruzadas (API — não montadas diretamente na grade `/series`)

| Endpoint | Uso |
| --- | --- |
| `GET /series/:id/details` | Detalhe ao vivo TMDB |
| `GET /series/:id/season/:n/episodes` | Episódios de temporada |
| `GET /series/homepage-carousel` | Carrossel da home |
| `GET /series/by-year`, `/by-month`, `/year-tbd` | Carrosséis com `serieQualityFilter` / `serieCarouselQualityFilter` |
| `PUT /series/:id` | Admin |
