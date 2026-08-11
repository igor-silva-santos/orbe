import orbeNerdApi from '@/lib/api';
import type { Filme, Serie, Anime, Jogo, SearchResultItem } from '@/types';

type ApiResponseItem = {
  id: number;
  titulo: string;
  poster: string;
  data_lancamento: string;
  sinopse: string;
  plataformas: string[];
  generos: string[];
  duracao?: string;
  direcao?: string;
  roteiro?: string;
  em_prevenda?: boolean;
  numero_temporadas?: number;
  numero_episodios?: number;
  criadores?: string[];
  fonte?: string;
  estudio?: string;
  status_dublagem?: string;
  proximo_episodio?: string;
  desenvolvedores?: string[];
  publicadoras?: string[];
  tipo?: string;
};



// API real substituindo os dados mockados
export const realApi = {
  // Helper para construir a URL da imagem
  getImageUrl: (path: string | null) => {
    if (!path) return '/placeholder.svg';
    return `https://image.tmdb.org/t/p/w500${path}`;
  },

  // Filmes
  getFilmes: async (params: { filtro?: string; genero?: string; page?: number; limit?: number; ano?: string; mes?: string; status?: string; plataforma?: string }): Promise<{ results: Filme[]; total_pages: number; total_results: number }> => {
    try {
      const response = await orbeNerdApi.getFilmes(params);
      
      const mappedResults = response.results.map((filme: Filme) => ({
        ...filme 
      }));

      const limit = response.limit ?? 48;
      return {
        results: mappedResults,
        total_pages: Math.ceil(response.total / limit),
        total_results: response.total
      };
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return { results: [], total_pages: 0, total_results: 0 };
    }
  },

  getFilmeFilters: orbeNerdApi.getFilmeFilters,

  // Series
  getSeries: async (params: { filtro?: string; genero?: string; page?: number; limit?: number; ano?: string; mes?: string; status?: string; plataforma?: string }): Promise<{ results: Serie[]; total_pages: number; total_results: number }> => {
    try {
      const response = await orbeNerdApi.getSeries(params);
      
      const mappedResults = response.results.map((serie: Serie) => ({
        ...serie
      }));

      const limit = response.limit ?? 48;
      return {
        results: mappedResults,
        total_pages: Math.ceil(response.total / limit),
        total_results: response.total
      };
    } catch (error) {
      console.error('Erro ao buscar séries:', error);
      return { results: [], total_pages: 0, total_results: 0 };
    }
  },

  getSerieFilters: orbeNerdApi.getSerieFilters,

  // Animes
  getAnimes: async (params: { filtro?: string; genero?: string; page?: number; limit?: number; ano?: string; formato?: string; fonte?: string; status?: string; includeAdult?: boolean }): Promise<{ results: Anime[]; total_pages: number; total_results: number }> => {
    try {
      const response = await orbeNerdApi.getAnimes(params);
      
      const mappedResults = response.results.map((anime: Anime) => ({
        ...anime
      }));

      const limit = response.limit ?? 48;
      return {
        results: mappedResults,
        total_pages: Math.ceil(response.total / limit),
        total_results: response.total
      };
    } catch (error) {
      console.error('Erro ao buscar animes:', error);
      return { results: [], total_pages: 0, total_results: 0 };
    }
  },

  getAnimeFilters: orbeNerdApi.getAnimeFilters,

  // Jogos
  getJogos: async (params: { filtro?: string; genero?: string; page?: number; limit?: number; plataforma?: string; modo?: string; ano?: string; mes?: string }): Promise<{ results: Jogo[]; total_pages: number; total_results: number }> => {
    try {
      const response = await orbeNerdApi.getJogos(params);
      
      const mappedResults = response.results.map((jogo: Jogo) => ({
          ...jogo
      }));

      const limit = response.limit ?? 48;
      return {
        results: mappedResults,
        total_pages: Math.ceil(response.total / limit),
        total_results: response.total
      };
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      return { results: [], total_pages: 0, total_results: 0 };
    }
  },

  getJogoFilters: orbeNerdApi.getJogoFilters,

  // Manter os outros métodos como estão, pois não foram reportados erros neles
  getFilmeDetails: orbeNerdApi.getFilmeDetails,
  getSerieDetails: orbeNerdApi.getSerieDetails,
  getAnimeDetails: orbeNerdApi.getAnimeDetails,
  getAnimeNextEpisode: orbeNerdApi.getAnimeNextEpisode,
  getJogoDetails: orbeNerdApi.getJogoDetails,
  updateFilme: orbeNerdApi.updateFilme,
  updateSerie: orbeNerdApi.updateSerie,
  updateAnime: orbeNerdApi.updateAnime,
  updateJogo: orbeNerdApi.updateJogo,
  search: async (query: string, category?: string, page: number = 1) => {
    try {
      const response = await orbeNerdApi.search(query, category, page);
      
      if (!response) {
        return { filmes: [], series: [], animes: [], jogos: [], total: 0 };
      }

      return {
        filmes: (response.filmes || []).map((item: Filme) => ({ ...item, type: 'filme' as const })),
        series: (response.series || []).map((item: Serie) => ({ ...item, type: 'serie' as const })),
        animes: (response.animes || []).map((item: Anime) => ({ ...item, type: 'anime' as const })),
        jogos: (response.jogos || []).map((item: Jogo) => ({ ...item, type: 'jogo' as const })),
      };

    } catch (error) {
      console.error('Erro na pesquisa:', error);
      return { filmes: [], series: [], animes: [], jogos: [], total: 0 };
    }
  },
  getTrending: async (type?: string, limit: number = 10) => {
    try {
      const response = await orbeNerdApi.getTrending(type, limit);
      if (!response) return [];
      const items = Array.isArray(response) ? response : (response.results || []);
      return items.map((item: ApiResponseItem) => item);
    } catch (error) {
      console.error('Erro ao buscar conteúdo em alta:', error);
      return [];
    }
  },
  getJogosEmAlta: async () => {
    try {
      return await orbeNerdApi.getJogosEmAlta();
    } catch (error) {
      console.error('Erro ao buscar jogos em alta:', error);
      return { destaques: [], categorias: [], modos: [], plataformas: [], semana: '' };
    }
  },
  getHoje: async () => {
    try {
      return await orbeNerdApi.getHoje();
    } catch (error) {
      console.error('Erro ao buscar conteúdo de hoje:', error);
      return { data: '', cinema: [], streamingFilmes: [], streamingSeries: [], destaquesJogos: [] };
    }
  },
  getNotifications: orbeNerdApi.getNotifications,
  markNotificationAsRead: orbeNerdApi.markNotificationAsRead,
  login: orbeNerdApi.login,
  getInteractions: orbeNerdApi.getInteractions,
  upsertInteraction: orbeNerdApi.upsertInteraction,
  getAwards: orbeNerdApi.getAwards,
};

export default realApi;