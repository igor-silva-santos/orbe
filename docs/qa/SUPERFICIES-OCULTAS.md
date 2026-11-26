# Superfícies Orbe — além das `page.tsx`

Itens que **não aparecem** como rota própria, mas impactam QA e podem quebrar silenciosamente.

| Superfície | Onde | Como testar |
|------------|------|-------------|
| **SuperModal** | Global (`SuperModal.tsx`) | Clique em card; abas detalhes/temporadas/requisitos PC |
| **Busca overlay** | `SearchOverlay` + store `openSearch` | Header → query → categorias |
| **Notificações** | `NotificationModal` | Sino (logado); push VAPID `/api/notifications/vapid-public-key` |
| **Avaliação** | `RatingModal` | Menu card → “Já assisti / Já joguei” |
| **Calendário** | `CalendarModal` | Botão agenda no modal de mídia |
| **Rolagem rápida carrossel** | `MediaCarousel` / `AnimeCarousel` | Botão com `aria-pressed` no carrossel; persiste no Zustand |
| **Preferências Hoje** | `localStorage` `orbe-hoje-sections` | Chips em `/hoje`; `aria-pressed` |
| **Pins anime semanal** | Store `animeWeeklyPinIds` | Carrossel anime home (logado) |
| **Tema claro/escuro** | Header + persist theme | Botão tema |
| **PWA / Serwist** | `src/app/sw.ts`, `manifest` | Instalação offline limitada |
| **Extensão CR** | `/extensao/crunchyroll` | Integração watchlist fila |
| **Admin sync** | `/admin/sync-logs` | Protegido; proxy `/api/sync/status` |
| **Redirects** | `next.config` | `/jogos-em-alta` → promoções em alta |
| **Proxy API** | `rewrites` → Render | Todo `/api/*` |
| **Sessão JWT** | Cookie + `middleware` | `/perfil`, `/configuracoes`, `/minha-lista/*` |
| **Detalhe legado** | `currentDetailModal` no store | Verificar se ainda usado vs SuperModal |

Explorador E2E cobre a maioria (exceto fluxos **logados** e extensão instalada).
