# Tela `/promocoes` — Regras de negócio

**Rota:** `/promocoes` (query `?tab=gratis|promocoes|em-alta`)  
**Objetivo:** Agregar jogos grátis e promoções de múltiplas lojas, com aba de jogos em alta do catálogo Orbe.  
**Stack:** `promocoes/page.tsx`, `PromocoesClient.tsx`, `JogosEmAltaContent.tsx` · API `api/src/dealsRoutes.ts`, `api/src/deals/dealsService.ts`, `GET /jogos/em-alta`

---

## Navegação e estrutura

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-PROMO-001 | Aba inicial por query string | Tab padrão derivada de `searchParams.tab`. | Acesso `/promocoes`. | Sem param ou inválido → `gratis`; `tab=promocoes` → promoções; `tab=em-alta` → em alta. | `page.tsx` L11–18 | `/promocoes?tab=em-alta` abre aba Em Alta. |
| RN-PROMO-002 | ISR da página | Shell da página revalida no servidor. | Build Next. | `revalidate = 600` (10 min); dados de deals são client-side. | `page.tsx` L3 | Página estática revalidada; deals via API no browser. |
| RN-PROMO-003 | Três abas funcionais | Grátis, Promoções, Em Alta. | Cliente montado. | `Tabs` com contadores nas duas primeiras; Em Alta sem contador de deals. | `PromocoesClient.tsx` L571–597 | Alternar abas; conteúdo distinto. |
| RN-PROMO-004 | Em Alta não carrega deals | Aba em-alta usa só `/jogos/em-alta`. | `activeTab === 'em-alta'`. | `loadActiveTab` retorna sem chamar `/deals/*`; loading global desligado. | `PromocoesClient.tsx` L350–354, L553 | Na aba Em Alta, network sem `/deals/gratis`. |
| RN-PROMO-005 | Lazy load por aba | Dados carregados na primeira visita à aba. | Troca de tab. | Grátis: `loadGratis` se `!gratisData`; Promoções: `loadPromocoes(1)` se `!promoData`. | `PromocoesClient.tsx` L377–381 | Ir direto a Promoções → uma chamada `/deals/promocoes`. |

---

## Agregação backend (`dealsService` + `dealsRoutes`)

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-PROMO-006 | Fontes de jogos grátis | Merge Epic, GamerPower, CheapShark, Steam, itch, ITAD (quando configurado). | Refresh do overview. | `gratisAll` deduplicado, normalizado BRL, enriquecido com links Orbe; split temporário/permanente. | `dealsService.ts` L147–168 | Overview contém itens de múltiplas `source`. |
| RN-PROMO-007 | Fontes de promoções pagas | Vendas CheapShark (geral, Epic store, Ubisoft), Epic sales, ITAD, Steam, itch. | Refresh. | `promocoes` ordenadas por `dealRating`, desconto, título; dedupe. | `dealsService.ts` L172–187 | Promo com maior dealRating no topo após sort servidor. |
| RN-PROMO-008 | Catálogo Steam Orbe | Promoções de jogos já no banco com desconto Steam. | Sync catálogo + Steam. | `catalogoSteam` separado de `promocoes` ao vivo. | `dealsService.ts` L170, L126 | Resposta `/deals/promocoes` inclui `catalogoSteam`. |
| RN-PROMO-009 | Cache em camadas | Redis/memória + TTL soft/hard. | Requests repetidos. | Soft TTL 60 s (revalidação background); hard 120 s; HTTP `max-age=60`, `s-maxage` soft TTL. | `dealsService.ts` L18–21, `dealsRoutes.ts` L24–31 | Header `X-Deals-Fetched-At` presente. |
| RN-PROMO-010 | Saúde das fontes | Estado agregado para alertas na UI. | Pelo menos uma fonte falhou. | `sourcesHealth`: 0 falhas → `ok`; 1+ → `degraded`; quase todas → `critical`. | `dealsService.ts` L557–562 | Simular falha Epic → alerta âmbar na UI. |
| RN-PROMO-011 | Meta interna não vaza | `_meta` removido das respostas públicas. | Qualquer rota `/deals*`. | Middleware `dealsJsonMiddleware` strip `_meta`. | `dealsRoutes.ts` L35–46 | JSON público sem campo `_meta`. |
| RN-PROMO-012 | GET `/deals/gratis` | Payload da aba grátis. | Chamada frontend `getFreeDeals`. | `gratisTemporarios`, `gratisPermanentes`, `deals` (= todos grátis), `sources`, `sourcesHealth`, câmbio USD/BRL. | `dealsRoutes.ts` L88–105 | Contrato bate com `DealsGratisResponse`. |
| RN-PROMO-013 | GET `/deals/promocoes` paginado | Ofertas ao vivo com paginação server-side em memória. | `page`, `limit` query. | Default page 1, limit 48; máx. limit 100; `hasMore` quando há mais itens; inclui `catalogoSteam` completo (não paginado). | `dealsRoutes.ts` L108–131, `paginateDeals` | `page=2` retorna próximo slice; `catalogoSteam` sempre no body. |
| RN-PROMO-014 | Câmbio USD→BRL | Preços convertidos quando aplicável. | `resolveUsdBrlRate` no refresh. | `usdBrlRate` e `usdBrlRateFetchedAt` nas respostas grátis/promo. | `dealsService.ts` L109–111, UI `SourceFooter` | Rodapé mostra taxa e hora. |

---

## Aba "Jogos de Graça"

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-PROMO-015 | Separação temporário vs permanente | UI distingue giveaways limitados de F2P/zero permanente. | `gratisData` carregado. | Preferência arrays `gratisTemporarios`/`gratisPermanentes`; fallback filtra `freeTier`. | `PromocoesClient.tsx` L402–414 | Seção "Estão de graça" vs "São de graça". |
| RN-PROMO-016 | Ordenação padrão grátis | Temporários por urgência. | Aba grátis. | Default `freeSort = ending_soon`; permanentes usam `title` se sort for `ending_soon`. | `PromocoesClient.tsx` L329, L456 | Ordenar "Acaba primeiro" muda ordem dos temporários. |
| RN-PROMO-017 | Filtro por plataforma | Chips dinâmicos só com plataformas presentes. | Deals carregados. | `availablePlatformFilters`; se filtro ativo some da lista, reset para `all`. | `dealFilters.ts`, `PromocoesClient.tsx` L435–438 | Filtrar Steam; chip some se não houver Steam. |
| RN-PROMO-018 | Busca por título | Filtro client-side case-insensitive. | `searchQuery` não vazio. | `filterBySearch` em temporários, permanentes e destaques. | `dealFilters.ts` L39–43 | Buscar substring do título reduz grid. |
| RN-PROMO-019 | Destaques por plataforma (grátis) | Seções colapsáveis itch e EA App. | `platformFilter=all`, sem busca, deals nessas plataformas. | `FREE_FEATURED_PLATFORMS` = itch, origin; deals removidos do bloco principal e mostrados em seção dedicada. | `dealFilters.ts` L25, `PromocoesClient.tsx` L459–491 | itch aparece em seção "Grátis na itch.io", não duplicado no principal. |
| RN-PROMO-020 | Agrupamento por loja | Lista principal agrupa por `platform` quando filtro = todas. | `DealsByPlatform` com `all`. | Subtítulos uppercase por plataforma; grid 2–6 colunas. | `PromocoesClient.tsx` L70–106 | Várias lojas → múltiplos subtítulos. |
| RN-PROMO-021 | Contador na tab Grátis | Badge no trigger da aba. | Filtros ativos. | Conta deals grátis após plataforma + busca. | `PromocoesClient.tsx` L582–584 | Busca reduz número no badge. |
| RN-PROMO-022 | Empty states grátis | Mensagens quando não há itens. | Listas filtradas vazias. | Textos específicos para temporários/permanentes vazios. | `PromocoesClient.tsx` L631–634, L679–681 | Sem giveaways → mensagem amigável. |

---

## Aba "Promoções"

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-PROMO-023 | Ordenação padrão promoções | Popularidade de deal. | Aba promoções. | `saleSort = popular` (`dealRating` desc). | `PromocoesClient.tsx` L330, `dealSort.ts` | Trocar para "Maior desconto" reordena. |
| RN-PROMO-024 | Faixa catálogo Steam | Carrossel horizontal de `catalogoSteam` filtrado. | `catalogoSteam.length > 0`. | Seção "Promoções na Steam (catálogo)" com `HorizontalDealsRow`; link para aba Em Alta. | `PromocoesClient.tsx` L708–730 | Jogos Orbe em promo na Steam no topo da aba. |
| RN-PROMO-025 | Ofertas ao vivo paginadas no cliente | Primeira página 48; "Carregar mais" append. | `promoHasMore`, sem busca, plataforma all. | `loadPromocoes(page+1, true)` concatena `promoDeals`; botão oculto se busca ou filtro plataforma. | `PromocoesClient.tsx` L339–347, L384–394, L745–756 | Carregar mais aumenta grid; com busca ativa botão some. |
| RN-PROMO-026 | Contador tab Promoções | Soma promo filtradas + catálogo filtrado. | Filtros aplicados. | Badge = `filteredPromocoes.length + filteredCatalogo.length`. | `PromocoesClient.tsx` L589–591 | Filtrar plataforma atualiza contador. |
| RN-PROMO-027 | Banner wishlist (informativo) | Placeholder de feature futura. | Aba promoções visível. | Caixa tracejada "Lista de desejos Steam (em breve)" sem ação. | `PromocoesClient.tsx` L689–695 | Texto visível, sem botão funcional Steam. |

---

## Aba "Em Alta" e redirect legado

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-PROMO-028 | Conteúdo Em Alta embutido | Reutiliza componente compartilhado. | Tab `em-alta`. | `JogosEmAltaContent` com `compact` e banner para promoções ao vivo. | `PromocoesClient.tsx` L768–769 | Ver regras RN-JOGOS-019–029 em `05-JOGOS.md`. |
| RN-PROMO-029 | Entrada via redirect | `/jogos-em-alta` → esta aba. | Redirect Next. | URL canônica `/promocoes?tab=em-alta`. | `jogos-em-alta/page.tsx` | Bookmarks antigos funcionam. |

---

## UX global da página

| ID | Nome | Descrição | Pré-condições | Esperado | Evidência | Cenário QA |
| --- | --- | --- | --- | --- | --- | --- |
| RN-PROMO-030 | Atualizar agora | Refetch da aba ativa (exceto em-alta). | Botão "Atualizar agora". | `loadActiveTab(true, activeTab)` com spinner; em-alta não refetch deals. | `PromocoesClient.tsx` L539–547, L349–370 | Clicar atualizar na aba Grátis → novo `fetchedAt`. |
| RN-PROMO-031 | Estado de erro global | Falha no fetch de deals. | API 500. | Mensagem "Não foi possível carregar promoções e jogos grátis." + Tentar novamente. | `PromocoesClient.tsx` L364–368, L559–568 | Derrubar API deals → card erro. |
| RN-PROMO-032 | Skeleton loading | Placeholder enquanto carrega aba grátis/promo. | `isLoading && tab !== em-alta`. | 12 cards skeleton shimmer. | `PromocoesClient.tsx` L553–558 | Primeira visita mostra skeleton. |
| RN-PROMO-033 | Alerta fontes indisponíveis | UI de degradação. | `sourcesHealth` degraded/critical. | Banner âmbar ou vermelho listando fontes com `ok: false`. | `PromocoesClient.tsx` L221–255, L576 | Epic down → nome na lista de falhas. |
| RN-PROMO-034 | Rodapé de fontes | Transparência de origem dos dados. | `sources` presente após load grátis/promo. | Contagens por Epic, GamerPower, CheapShark, itch, ITAD, Steam, Orbe com cor ok/erro. | `PromocoesClient.tsx` L258–307, L685, L765 | Contadores batem com `sources.*.count`. |
| RN-PROMO-035 | PAGE_SIZE cliente | Alinhado à paginação API default. | Load promoções. | `PAGE_SIZE = 48` em `getSaleDeals`. | `PromocoesClient.tsx` L42, L340 | Primeira página com até 48 ofertas. |

---

## Rotas auxiliares `/deals` (API)

| Rota | Regra |
| --- | --- |
| `GET /deals?sections=gratis,promocoes` | Resposta parcial sem `all` |
| `GET /deals/epic` | Subconjunto Epic grátis |
| `GET /deals/gamerpower?platform&type` | Filtros opcionais em giveaways |
| `GET /deals/cheapshark?storeId&freeOnly` | Mapeamento storeId → plataforma |
| `GET /deals/cheapshark/stores` | Lista lojas (cache 24 h) |
