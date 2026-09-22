# Tela `/hoje` — Regras de negócio

**Rota:** `/hoje`  
**Objetivo:** Panorama do que está em cartaz, estreias da semana, destaques de streaming e jogos, com personalização local de seções.  
**Stack:** `hoje/page.tsx`, `HojeClient.tsx`, `hoje-preferences.ts` · API `GET /hoje` (`api/src/routes/homeRoutes.ts`)

---

## Frontend

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOJE-001 | Shell SSR, dados no cliente | Página não faz fetch de `/hoje` no servidor. | Montagem `HojeClient`. | `revalidate = 300` na page; `useEffect` chama `realApi.getHoje()` uma vez. | `page.tsx` L3–6, `HojeClient.tsx` L76–81 | HTML sem cards até hidratar; depois request `/hoje`. |
| RN-HOJE-002 | Cabeçalho e data formatada | Data legível vem da API. | Resposta com campo `data`. | `PageHeader` "Hoje" + linha com ícone calendário e `data` (string pt-BR longa, capitalizada na UI). | `HojeClient.tsx` L150–159, API L387 | Data exibida coincide com `toLocaleDateString pt-BR` do servidor. |
| RN-HOJE-003 | Preferências de seção (localStorage) | Usuário escolhe quais blocos ver. | Browser com `localStorage`. | Chave `orbe-hoje-sections`; default todas as 6 seções; persistência em toggle. | `hoje-preferences.ts` L18–39 | Desmarcar "Cinema"; recarregar → cinema oculto. |
| RN-HOJE-004 | Mínimo uma seção ativa | Não permite desligar todas as seções. | Uma seção habilitada, usuário tenta desmarcar. | Toggle ignorado se `next.size === 1` após remoção. | `HojeClient.tsx` L86–88 | Com uma seção on, clique não desativa. |
| RN-HOJE-005 | Ordem fixa das seções | Blocos renderizados na ordem definida no código. | Várias seções habilitadas. | cinema → estreiasSemana → streamingFilmes → streamingSeries → streamingAnimes → destaquesJogos. | `HojeClient.tsx` L97–143 | Reordenar preferências não muda ordem (só visibilidade). |
| RN-HOJE-006 | Seção oculta se vazia | Não mostra título sem itens. | Array da seção length 0. | `MediaRow` retorna `null`. | `HojeClient.tsx` L44, L196–206 | Seção habilitada sem dados → não aparece heading vazio. |
| RN-HOJE-007 | Empty global | Todas seções visíveis sem itens ou todas desabilitadas com dados. | `hasVisibleContent === false`. | Mensagem "Nenhum destaque disponível para os filtros selecionados." | `HojeClient.tsx` L146, L208–214 | Desabilitar seções com conteúdo → mensagem. |
| RN-HOJE-008 | Erro de API | Falha no fetch. | `getHoje` rejeita. | `data === null` após load → "Não foi possível carregar o conteúdo de hoje." | `HojeClient.tsx` L216–219 | API offline → mensagem de erro. |
| RN-HOJE-009 | Loading skeleton | Estado intermediário. | `isLoading`. | 8 `MidiaCardSkeleton` em grid. | `HojeClient.tsx` L188–193 | Primeiro paint mostra skeletons. |
| RN-HOJE-010 | Cards e interações | Mesmo padrão das outras telas de mídia. | Itens em seção. | `MidiaCard` com tipo por seção; `useMidiaInteraction` + store. | `HojeClient.tsx` L68–69, L52–61 | Favoritar filme em cartaz persiste como nas outras rotas. |

---

## Backend `GET /hoje`

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-HOJE-011 | Janela "última semana" | Referência temporal para streaming e animes. | `now` no servidor. | `weekAgo = now - 7 dias` usado em filtros de lançamento/exibição. | `homeRoutes.ts` L248–250 | Filme lançado há 8 dias não entra no pool "esta semana" de streaming. |
| RN-HOJE-012 | Cinema em cartaz | Filmes atualmente em exibição comercial. | Filmes `emCartaz: true`. | Até 12; `filmeCarouselQualityFilter` + `filmeCarouselLocalizationFilter`; ordem `popularity desc`. | `homeRoutes.ts` L272–276 | Só filmes marcados em cartaz; máx. 12. |
| RN-HOJE-013 | Estreias da semana (BR) | Filmes estreando na semana civil brasileira. | Calendário BR via `loadEstreiasSemanaFilmes`. | Até 24; qualidade + localização; `allowEstreiaSemana: true` nos destaques (`estreia_semana` pill). | `filmeLancamentoTags.ts` L99–116, `homeRoutes.ts` L390 | Filme fora da semana BR não listado em `estreiasSemana`. |
| RN-HOJE-014 | Tags "mais esperado" em filmes | Enriquecimento com antecipação. | `loadMaisEsperadoTmdbIds(now)`. | Campos `mais_esperado`, `destaque_pill` via `resolveFilmeDestaqueFields`; estreia da semana tem prioridade sobre mais esperado. | `homeRoutes.ts` L260, L375–384, `filmeLancamentoTags.ts` L78–96 | Card estreia mostra pill estreia; outro filme futuro pode mostrar mais esperado. |
| RN-HOJE-015 | Streaming filmes — prioridade semanal | Preferência por lançamentos recentes em streaming. | Filme com provider, não em cartaz. | Query A: `releaseDate` entre `weekAgo` e `now`; Query B: fallback geral streaming; merge dedupe por `tmdbId`, slice 12. | `homeRoutes.ts` L252–257, L279–291, L353–371 | Filme popular antigo só aparece se pool semanal < 12. |
| RN-HOJE-016 | Streaming séries — prioridade semanal | Séries com atividade recente. | `serieQualityFilter`, tem streaming. | OR `lastAirDate` ou `firstAirDate` na janela semana; fallback popularidade; dedupe; 12 itens. | `homeRoutes.ts` L293–317, L372 | Série sem episódio na semana pode entrar pelo fallback. |
| RN-HOJE-017 | Animes em exibição — prioridade semanal | Animes que exibiram episódio na última semana. | `animeQualityFilter`, `status: RELEASING`. | `airingSchedule` com `airingAt` entre `weekAgo` e `now`; ordem popularidade + `averageScore`. | `homeRoutes.ts` L318–332 | Anime RELEASING sem episódio na semana não entra no pool primário. |
| RN-HOJE-018 | Animes — fallback | Completa lista se pool semanal insuficiente. | Segunda query animes. | `status IN (RELEASING, NOT_YET_RELEASED)` + `animeQualityFilter`; merge dedupe `anilistId`, 12 total. | `homeRoutes.ts` L334–341, L362–373 | Lista final até 12 animes mesmo com poucos episódios recentes. |
| RN-HOJE-019 | Destaques jogos | Jogos em hype/nota no catálogo curado. | Jogos passando `jogoQualityFilter`. | Top 8 por `hypes desc`, `rating desc`. | `homeRoutes.ts` L342–350 | Máximo 8 jogos; jogos fracos excluídos pelo filtro de qualidade. |
| RN-HOJE-020 | Qualidade de animes na rota | Diferente da listagem `/animes`. | Anime sem score/popularidade mínima. | Excluído por `animeQualityFilter` (score OU popularidade mínima + safe adult). | `qualityFilters.ts` L499–508 | Anime marginal visível em `/animes` mas não em `/hoje` streaming. |
| RN-HOJE-021 | Sinopses sem tradução ao vivo | Texto já persistido no sync. | Resposta `/hoje`. | Comentário no código: sinopse do banco, sem tradução em request. | `homeRoutes.ts` L387–389 | Conteúdo igual ao de `/filmes`/`/series` para mesma mídia. |
| RN-HOJE-022 | Cache da rota | Performance. | GET `/hoje`. | `cacheMiddleware(TWELVE_HOURS)` (12 h). | `homeRoutes.ts` L247 | Resposta cacheável 12 h no API layer. |
| RN-HOJE-023 | Erro servidor | Falha nas queries paralelas. | Exceção no `Promise.all`. | HTTP 500 `{ error: 'Erro ao buscar conteúdo de hoje.' }`. | `homeRoutes.ts` L397–400 | Simular erro DB → 500. |
| RN-HOJE-024 | Payload JSON | Contrato consumido pelo cliente. | Sucesso. | Campos: `data`, `estreiasSemana`, `cinema`, `streamingFilmes`, `streamingSeries`, `streamingAnimes`, `destaquesJogos` (arrays mapeados `map*ToMidia`). | `homeRoutes.ts` L386–396 | Schema bate com interface `HojeData` no client. |

---

## Mapeamento seção UI ↔ API

| Chave preferência | Título na UI | Campo API | Tipo card |
| --- | --- | --- | --- |
| `cinema` | Em cartaz nos cinemas | `cinema` | filme |
| `estreiasSemana` | Estreias da semana | `estreiasSemana` | filme |
| `streamingFilmes` | Filmes populares no streaming esta semana | `streamingFilmes` | filme |
| `streamingSeries` | Séries populares no streaming esta semana | `streamingSeries` | serie |
| `streamingAnimes` | Animes em exibição esta semana | `streamingAnimes` | anime |
| `destaquesJogos` | Jogos em destaque | `destaquesJogos` | jogo |

---

## Relação com outras rotas

| Rota | Diferença em relação a `/hoje` |
| --- | --- |
| `GET /homepage` | Carrossel multimídia em torno de hoje (filmes/séries/jogos/animes), não o layout editorial de `/hoje`. |
| `GET /trending` | Ranking por tipo ou misto; sem seções cinema/streaming. |
| `/animes`, `/jogos` | Catálogos completos com filtros; sem agregação "semana atual". |
