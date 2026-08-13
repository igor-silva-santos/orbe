import type { Filme, Serie, Anime, Jogo, EventoResumo } from '@/types';
import type { DealsOverview } from '@/types/deals';
import { API_BASE } from './apiBase';
import { clearBrowserSession } from './session';

const API_BASE_URL = API_BASE;

// Timeout padrao para chamadas via apiClient. Evita requisicao pendurada
// deixando a UI presa em "carregando" pra sempre quando a API nao responde.
// 30s cobre a imensa maioria das rotas; endpoints que legitimamente precisam
// de mais tempo (ex.: sync/detalhes ao vivo) ja documentam seus proprios
// timeouts nos arquivos correspondentes da API e devem tratar isso lá, nao aqui.
const DEFAULT_TIMEOUT_MS = 30000;

// NOTA (duplicacao intencional do token — cookie httpOnly + localStorage):
// O login/registro grava o JWT tanto no cookie httpOnly de sessao
// (ver lib/session.ts, usado só pelo middleware pra gate de UX em /perfil
// e /configuracoes) quanto aqui no localStorage, de onde o apiClient le pra
// montar o header Authorization em toda chamada à API.
// Por que a duplicacao existe: o cookie httpOnly nao pode ser lido por
// JavaScript (é o ponto dele), entao o cliente HTTP nao teria como montar o
// header Authorization a partir dele sem passar as chamadas por um proxy
// server-side. Como isso ainda nao foi implementado, o token tambem fica no
// localStorage, que É legível por JS.
// Risco real: qualquer XSS no app consegue ler o token direto do
// localStorage e se passar pelo usuário nas chamadas à API — a protecao do
// cookie httpOnly nao ajuda nesse cenário, porque o vazamento acontece por
// um caminho que nunca toca o cookie.
// Correcao completa (fora de escopo aqui — mudanca de arquitetura maior):
// fazer o proxy /api/* do Next (ver rewrites em next.config.mjs) repassar o
// cookie de sessao como header Authorization nas rotas que passam por ele,
// e parar de gravar/ler o JWT no localStorage. Isso exige decidir como
// tratar chamadas que hoje vao direto pra API_BASE_URL sem passar pelo
// proxy, entao foi deixado como decisao consciente pra quando houver
// contexto de produto pra isso, e nao um descuido.
// Função para obter o token do localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Função para salvar o token no localStorage
export const saveToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Função para remover o token do localStorage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearBrowserSession();
  }
};

// Extrai a mensagem de erro do corpo da resposta (`{ error: '...' }`), com fallback genérico
const throwHttpError = async (response: Response): Promise<never> => {
  const body = await response.json().catch(() => null);
  throw new Error(body?.error || `HTTP error! status: ${response.status}`);
};

const buildUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string => {
  let urlString = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, params[key]!.toString());
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      urlString += `?${queryString}`;
    }
  }

  return urlString;
};

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

// Núcleo único do cliente HTTP: monta headers, aplica timeout e trata 401
// de forma consistente pra todos os métodos (get/post/patch/put/delete).
// Os cinco métodos exportados abaixo são apenas invólucros de uma linha
// em cima dessa função — preserva assinatura pública de cada um.
const request = async (
  method: HttpMethod,
  endpoint: string,
  options?: {
    params?: Record<string, string | number | boolean | undefined | null>;
    body?: any;
  }
): Promise<any> => {
  const urlString = buildUrl(endpoint, options?.params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(urlString, {
    method,
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  if (response.status === 401) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login?error=session_expired';
    }
    throw new Error('Sessão expirada. Por favor, faça login novamente.');
  }

  if (!response.ok) {
    await throwHttpError(response);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Cliente HTTP centralizado
export const apiClient = {
  get: async (endpoint: string, params?: Record<string, string | number | boolean | undefined | null>) => {
    return request('GET', endpoint, { params });
  },

  post: async (endpoint: string, data: Record<string, unknown>) => {
    return request('POST', endpoint, { body: data });
  },

  patch: async (endpoint: string, data: any) => {
    return request('PATCH', endpoint, { body: data });
  },

  put: async (endpoint: string, data: any) => {
    return request('PUT', endpoint, { body: data });
  },

  delete: async (endpoint: string) => {
    return request('DELETE', endpoint);
  },
};

// API específica para o Orbe Nerd
export const orbeNerdApi = {
  // Filmes
  getFilmes: async (params?: { page?: number; limit?: number; filtro?: string; genero?: string; ano?: string; mes?: string; status?: string; plataforma?: string }) => {
    return apiClient.get('/filmes', params);
  },

  getFilmeDetails: async (id: number) => {
    return apiClient.get(`/filmes/${id}/details`);
  },

  getFilmeFilters: async () => {
    return apiClient.get('/filmes/filtros');
  },

  // Séries
  getSeries: async (params?: { page?: number; limit?: number; filtro?: string; genero?: string; ano?: string; mes?: string; status?: string; plataforma?: string }) => {
    return apiClient.get('/series', params);
  },

  getSerieDetails: async (id: number) => {
    return apiClient.get(`/series/${id}/details`);
  },

  getSerieFilters: async () => {
    return apiClient.get('/series/filtros');
  },

  // Animes
  getAnimes: async (params?: { page?: number; limit?: number; filtro?: string; genero?: string; ano?: string; formato?: string; fonte?: string; status?: string; includeAdult?: boolean }) => {
    return apiClient.get('/animes', {
      ...params,
      includeAdult: params?.includeAdult ? 'true' : undefined,
      safeSearch: params?.includeAdult ? undefined : 'true',
    });
  },

  getAnimeDetails: async (id: number) => {
    return apiClient.get(`/animes/${id}/details`);
  },

  getAnimeFilters: async () => {
    return apiClient.get('/animes/filtros');
  },

  getAnimeNextEpisode: async (id: number) => {
    return apiClient.get(`/animes/${id}/next-episode`);
  },

  // Jogos
  getJogos: async (params?: { page?: number; limit?: number; filtro?: string; genero?: string; plataforma?: string; modo?: string; ano?: string; mes?: string }) => {
    return apiClient.get('/jogos', params);
  },

  getJogoDetails: async (id: number) => {
    return apiClient.get(`/jogos/${id}/details`);
  },

  getJogoFilters: async () => {
    return apiClient.get('/jogos/filtros');
  },

  // Updates (Admin)
  updateFilme: async (id: number, data: Filme) => {
    return apiClient.put(`/filmes/${id}`, data);
  },
  updateSerie: async (id: number, data: Serie) => {
    return apiClient.put(`/series/${id}`, data);
  },
  updateAnime: async (id: number, data: Anime) => {
    return apiClient.put(`/animes/${id}`, data);
  },
  updateJogo: async (id: number, data: Jogo) => {
    return apiClient.put(`/jogos/${id}`, data);
  },

  // Premiações
  getAwards: async (params?: { awardName?: string; year?: number; page?: number; limit?: number }) => {
    return apiClient.get('/premios', params);
  },

  getAwardFilters: async () => {
    return apiClient.get('/premios/filtros');
  },

  getEventos: async (status?: 'upcoming' | 'ongoing' | 'past' | 'all') => {
    return apiClient.get('/eventos', status && status !== 'all' ? { status } : undefined);
  },

  getEventosResumo: async (): Promise<EventoResumo> => {
    return apiClient.get('/eventos/resumo');
  },

  // Pesquisa
  search: async (query: string, category?: string, page?: number) => {
    return apiClient.get('/pesquisa', { q: query, category, page });
  },

  // Conteúdo em alta
  getTrending: async (type?: string, limit?: number) => {
    return apiClient.get('/trending', { type, limit });
  },

  getJogosEmAlta: async () => {
    return apiClient.get('/jogos/em-alta');
  },

  getHoje: async () => {
    return apiClient.get('/hoje');
  },

  getHomepage: async () => {
    return apiClient.get('/homepage');
  },

  // Autenticação
  register: async (userData: { nome: string; email: string; password: string }) => {
    return apiClient.post('/auth/register', userData);
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiClient.post('/auth/login', credentials);
  },

  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },

  // Perfil e Configurações
  getUserProfile: async () => {
    return apiClient.get('/users/me');
  },

  updateUserProfile: async (data: { nome?: string; bio?: string; avatar?: string; preferencias?: any; perfil_publico?: boolean }) => {
    return apiClient.patch('/users/me', data);
  },

  // Interações do Usuário
  getInteractions: async () => {
    return apiClient.get('/me/interactions');
  },

  upsertInteraction: async (data: { midia_id: number; tipo_midia: string; status: string }) => {
    return apiClient.post('/me/interactions', data);
  },

  // Notificações
  getNotifications: async () => {
    return apiClient.get('/notifications');
  },

  markNotificationAsRead: async (id: number) => {
    return apiClient.put(`/notifications/${id}/read`, {});
  },

  markAllNotificationsAsRead: async () => {
    return apiClient.put('/notifications/read-all', {});
  },

  deleteNotification: async (id: number) => {
    return apiClient.delete(`/notifications/${id}`);
  },

  // Calendário
  getCalendarEvents: async () => {
    return apiClient.get('/calendar-events');
  },

  addCalendarEvents: async (events: Array<{
    title: string;
    date: string;
    type: 'release' | 'episode' | 'cinema';
    midiaId: number;
    mediaType: string;
    time?: string;
    location?: string;
  }>) => {
    return apiClient.post('/calendar-events', { events });
  },

  deleteCalendarEvent: async (id: number) => {
    return apiClient.delete(`/calendar-events/${id}`);
  },

  // Contato
  sendContactMessage: async (data: { nome: string; email: string; assunto: string; mensagem: string }) => {
    return apiClient.post('/contato', data);
  },

  // Promoções e jogos grátis (Epic, GamerPower, CheapShark)
  getDeals: async (): Promise<DealsOverview> => apiClient.get('/deals'),
  getFreeDeals: async () => apiClient.get('/deals/gratis'),
  getSaleDeals: async () => apiClient.get('/deals/promocoes'),
  getEpicFreeGames: async () => apiClient.get('/deals/epic'),
  getGamerPowerGiveaways: async (params?: { platform?: string; type?: string }) => {
    const query = new URLSearchParams();
    if (params?.platform) query.set('platform', params.platform);
    if (params?.type) query.set('type', params.type);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiClient.get(`/deals/gamerpower${suffix}`);
  },
  getCheapSharkDeals: async (params?: { storeId?: string; freeOnly?: boolean; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.storeId) query.set('storeId', params.storeId);
    if (params?.freeOnly) query.set('freeOnly', '1');
    if (params?.limit) query.set('limit', String(params.limit));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiClient.get(`/deals/cheapshark${suffix}`);
  },
};

export default orbeNerdApi;

