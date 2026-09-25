/**
 * Inventário canônico de rotas UI do Orbe (App Router).
 * Variantes de query contam como URLs distintas para validação.
 */
export const STATIC_UI_ROUTES: string[] = [
  '/',
  '/filmes',
  '/series',
  '/animes',
  '/jogos',
  '/premios',
  '/premios?ano=2025',
  '/hoje',
  '/eventos',
  '/eventos?ano=2025',
  '/continuacoes',
  '/promocoes',
  '/promocoes?tab=gratis',
  '/promocoes?tab=promocoes',
  '/promocoes?tab=em-alta',
  '/promocoes?tab=recomendacoes',
  '/jogos-em-alta',
  '/minha-lista',
  '/minha-lista/animes',
  '/minha-lista/fila',
  '/login',
  '/register',
  '/perfil',
  '/configuracoes',
  '/admin/sync-logs',
  '/extensao',
  '/extensao/crunchyroll',
  '/ajuda',
  '/apoie',
  '/sugestoes',
  '/bug-report',
  '/contato',
  '/termos',
  '/privacidade',
  '/cookies',
  '/dmca',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.webmanifest',
];

/** Padrões dinâmicos — preenchidos em runtime com IDs reais da API. */
export type DynamicRouteTemplate = {
  pattern: string;
  build: (samples: RouteSamples) => string | null;
  label: string;
};

export type RouteSamples = {
  filmeId: number | null;
  serieId: number | null;
  animeId: number | null;
  jogoId: number | null;
  pessoaId: number | null;
  dubladorId: number | null;
  companyId: number | null;
  sagaId: string | null;
  universoId: string | null;
};

export const DYNAMIC_UI_ROUTES: DynamicRouteTemplate[] = [
  {
    label: 'Pessoa (filmografia)',
    pattern: '/pessoa/[id]',
    build: (s) => (s.pessoaId ? `/pessoa/${s.pessoaId}` : null),
  },
  {
    label: 'Dublador',
    pattern: '/dublador/[id]',
    build: (s) => (s.dubladorId ? `/dublador/${s.dubladorId}` : null),
  },
  {
    label: 'Desenvolvedora',
    pattern: '/desenvolvedora/[id]',
    build: (s) => (s.companyId ? `/desenvolvedora/${s.companyId}` : null),
  },
  {
    label: 'Continuações — saga',
    pattern: '/continuacoes?saga=',
    build: (s) => (s.sagaId ? `/continuacoes?saga=${encodeURIComponent(s.sagaId)}` : null),
  },
  {
    label: 'Continuações — universo',
    pattern: '/continuacoes?universo=',
    build: (s) => (s.universoId ? `/continuacoes?universo=${encodeURIComponent(s.universoId)}` : null),
  },
];

/** Endpoints GET públicos da API Express (smoke). Auth-only listados à parte. */
export const PUBLIC_API_GET_ROUTES: string[] = [
  '/api/homepage',
  '/api/hoje',
  '/api/trending',
  '/api/pesquisa?q=ab',
  '/api/filmes?limit=2',
  '/api/filmes/filtros',
  '/api/filmes/homepage-carousel',
  '/api/series?limit=2',
  '/api/series/filtros',
  '/api/animes?limit=2',
  '/api/animes/filtros',
  '/api/animes/weekly-schedule',
  '/api/jogos?limit=2',
  '/api/jogos/filtros',
  '/api/jogos/em-alta',
  '/api/jogos/recomendacoes',
  '/api/jogos/steam/trending',
  '/api/jogos/steam/sales',
  '/api/deals/gratis?limit=5',
  '/api/deals/promocoes?limit=5',
  '/api/deals',
  '/api/premios',
  '/api/eventos',
  '/api/eventos/resumo',
  '/api/continuacoes/sagas',
  '/api/continuacoes/universos',
  '/api/sync/status',
];

export const AUTH_EXPECTED_ROUTES: { path: string; expectRedirectLogin: boolean }[] = [
  { path: '/perfil', expectRedirectLogin: true },
  { path: '/configuracoes', expectRedirectLogin: true },
  { path: '/minha-lista/animes', expectRedirectLogin: true },
  { path: '/admin/sync-logs', expectRedirectLogin: true },
];
