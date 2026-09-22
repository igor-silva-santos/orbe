# Tela `/animes` — Regras de negócio

**Rota:** `/animes`  
**Objetivo:** Catálogo navegável de animes com filtros e destaques de lançamentos futuros.  
**Stack:** `frontend/src/app/animes/page.tsx`, `AnimesClient.tsx` · API `GET /animes`, `GET /animes/filtros` (`api/src/routes/animesRoutes.ts`)

---

## Regras

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-ANIMES-001 | Renderização SSR com revalidação | A página é Server Component que busca lista e filtros no servidor antes de hidratar o cliente. | API acessível a partir do frontend em build/runtime. | `fetchAnimesPageData()` chama em paralelo `GET /animes` e `GET /animes/filtros`; `revalidate = 300` (ISR ~5 min). | `page.tsx` L10–20, `apiServer.ts` L146–161 | Abrir `/animes` com rede OK; inspecionar HTML inicial com cards; após 5+ min, confirmar revalidação no deploy Next. |
| RN-ANIMES-002 | Degradação graciosa no SSR | Falha na API no servidor não quebra a página. | `fetchAnimesPageData` lança erro. | Cliente recebe `emptyData` (lista vazia, filtros vazios). | `page.tsx` L4–8, L14–17 | Simular API indisponível no SSR; página abre com estado vazio e filtros sem opções. |
| RN-ANIMES-003 | Cabeçalho e copy fixos | Título e descrição da área de animes são estáticos. | Usuário em `/animes`. | `PageHeader` com título "Animes" e descrição sobre temporadas e clássicos. | `AnimesClient.tsx` L75 | Verificar texto do cabeçalho na UI. |
| RN-ANIMES-004 | Seção "O que vem aí" condicional | Destaques de animes futuros vêm do resumo de eventos, não da listagem principal. | `useEventosResumo()` retorna `resumo.proximos.animes` com length > 0. | `CollapsibleSection` "O que vem aí" com `HorizontalMediaRow` tipo `anime`; interações via `useMidiaInteraction` e `userInteractions` do store. | `AnimesClient.tsx` L25, L77–86 | Com dados em `/eventos/resumo`; seção aparece. Sem itens em `proximos.animes`, seção ausente. |
| RN-ANIMES-005 | Opções de filtro vindas do servidor | Gêneros, anos, formatos, fontes e status populam os `<select>`. | SSR ou estado inicial com `initialData.filters`. | Listas refletem resposta de `GET /animes/filtros` (gêneros ordenados A–Z; anos `seasonYear` desc; status com `value` + `label` traduzido). | `animesRoutes.ts` L137–154, `AnimesClient.tsx` L30–34 | Comparar opções do dropdown com payload de `/animes/filtros`. |
| RN-ANIMES-006 | Valor sentinela `todos` | Filtros não enviam parâmetro à API quando o usuário não restringe. | Qualquer filtro em "Todos os …". | Parâmetro omitido em `realApi.getAnimes` (`undefined`). | `AnimesClient.tsx` L46–51 | Selecionar "Todos os Gêneros"; request sem `genero`. |
| RN-ANIMES-007 | Recarga ao mudar filtro | Lista no cliente é sempre atualizada quando filtros mudam. | Cliente montado. | `useEffect` chama `loadAnimes` em cada mudança de filtro (inclui primeira montagem após hidratação — refetch mesmo com dados SSR). | `AnimesClient.tsx` L43–71 | Abrir página; ver segunda chamada `GET /animes` no network após load. |
| RN-ANIMES-008 | Refresh global pós-sync | Após sincronização de dados no app, a grade recarrega. | Evento `orbe:data-refresh` disparado na janela. | `useOrbeDataRefresh(loadAnimes)` reexecuta busca com filtros atuais. | `useOrbeDataRefresh.ts`, `AnimesClient.tsx` L67 | Disparar evento de refresh; lista atualiza sem reload completo. |
| RN-ANIMES-009 | Contador na UI usa página atual | O texto "X animes encontrados" reflete o tamanho do array retornado na página, não o `total` global. | Resposta paginada com `total` > `results.length`. | Mensagem usa `animes.length`; durante loading mostra "Carregando...". | `AnimesClient.tsx` L133–136, API L82 | Com mais de 48 animes no banco, contador mostra até 48 (limite padrão) se cliente não paginar. |
| RN-ANIMES-010 | Grade e estado vazio | Layout responsivo de cards ou empty state. | Lista carregada. | Grid 2–5 colunas, `MidiaCard` tipo `anime`, max-width 210px; se `results` vazio, ícone + "Nenhum anime encontrado" + sugestão de ajustar filtros. | `AnimesClient.tsx` L139–154 | Aplicar filtros impossíveis; empty state. Com resultados, cards clicáveis. |
| RN-ANIMES-011 | Paginação padrão da API | Listagem backend paginada com limites seguros. | `GET /animes` sem `page`/`limit`. | `page=1`, `limit=48` (máx. 200); resposta `{ results, total, page, limit }`. | `mediaRoutesHelpers.ts` L19–27, `animesRoutes.ts` L31–82 | `curl /animes`; validar JSON e limite 48. |
| RN-ANIMES-012 | Exclusão de conteúdo adulto (lista) | Por padrão animes marcados adultos não entram na listagem. | `includeAdult` ausente ou ≠ `true`. | `where.isAdult = false`. | `animesRoutes.ts` L34–38 | Anime `isAdult: true` não aparece na listagem pública. |
| RN-ANIMES-013 | Safe search por tags bloqueadas | Tags sensíveis são excluídas quando safe search ativo. | `safeSearch=true` **ou** conteúdo adulto não liberado. | `tags.none` com nomes em `["Hentai","Ecchi","Yaoi","Yuri","Adult"]`. | `animesRoutes.ts` L26, L58–68 | Anime com tag Hentai não listado sem `includeAdult=true` e sem desligar safe search. |
| RN-ANIMES-014 | Filtros de query na listagem | Parâmetros opcionais restringem o `where` Prisma. | Query com `genero`, `formato`, `fonte`, `status`, `ano` ≠ `todos`. | Filtro por relação de gênero, campos `format`, `source`, `status`, `seasonYear` inteiro. | `animesRoutes.ts` L40–56 | `GET /animes?genero=Action&ano=2024` retorna só correspondentes. |
| RN-ANIMES-015 | Ordenação da listagem | Modo de ordenação controlado por `filtro`. | Query `filtro`. | `populares` → `popularity desc`; caso contrário → `titleRomaji asc`. (UI atual não expõe `filtro`; default alfabético.) | `animesRoutes.ts` L70 | `GET /animes?filtro=populares` ordena por popularidade. |
| RN-ANIMES-016 | Listagem sem `animeQualityFilter` | A rota `/animes` **não** aplica o filtro de qualidade usado em home/hoje/carrosséis. | Anime com nota/popularidade baixa e não adulto. | Pode aparecer na listagem se passar filtros de adulto/tags. | Contraste `animesRoutes.ts` L33–81 vs `qualityFilters.ts` `animeQualityFilter` | Comparar anime marginal em `/animes` vs `/hoje` streaming. |
| RN-ANIMES-017 | Cache HTTP da listagem | Respostas de lista cacheadas no edge/API. | GET bem-sucedido. | `cacheMiddleware(TWELVE_HOURS)` (12 h). | `animesRoutes.ts` L29 | Header de cache na resposta da API. |
| RN-ANIMES-018 | Endpoint de filtros e cache | Metadados de filtros agregados do banco. | `GET /animes/filtros`. | JSON com arrays `genres`, `years`, `formats`, `sources`, `statuses`; cache 24 h; erro → 500. | `animesRoutes.ts` L137–159 | Endpoint responde 200 e status labels em PT quando aplicável. |
| RN-ANIMES-019 | Detalhes ao vivo (fora da grade) | Modal/página de detalhe usa rota separada com rate limit. | `GET /animes/:id/details`, id numérico positivo. | Dados AniList ao vivo; 400 id inválido; 404 não encontrado; cache 300 s. | `animesRoutes.ts` L90–105 | Id inválido → 400; id inexistente → 404. |
| RN-ANIMES-020 | Próximo episódio | Agenda do próximo lançamento futuro. | `GET /animes/:id/next-episode`. | Primeiro `airingSchedule` com `airingAt >= now`, ordenado por `airingAt asc`. | `animesRoutes.ts` L163–187 | Anime em exibição retorna próximo episódio cronológico. |

---

## Referências cruzadas (API, não expostas diretamente na tela)

| Endpoint | Uso |
| --- | --- |
| `GET /animes/weekly-schedule` | Cronograma semanal agrupado por dia |
| `GET /animes/by-year`, `GET /animes/by-season` | Carrosséis com `animeQualityFilter` / `animeSeasonQualityFilter` |
| `PUT /animes/:id` | Admin only |
