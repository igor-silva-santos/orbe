// Tipos base para o Orbe Nerd

export interface Video {
  type: string;
  official: boolean;
  key: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Award {
  nome: string;
  categoria: string;
  ano: number;
  status: 'vencedor' | 'indicado';
}

export interface CastMember {
  id: number;
  nome: string;
  personagem: string;
  foto_url?: string;
}

export interface VoiceActor {
  id?: number;
  nome: string;
  foto_url?: string;
}

export interface StaffMember {
  id: number;
  nome: string;
  funcao: string;
  foto_url?: string;
}

export interface Character {
  id: number;
  nome: string;
  foto_url?: string;
  dubladores: {
    jp?: VoiceActor;
    pt?: VoiceActor;
  };
}

export interface Website {
  category: number;
  url: string;
}

export interface Creator {
  nome: string;
}

export interface GamePlatform {
  id: number;
  nome: string;
  logo_url?: string;
  store_url?: string;
}

export interface Plataforma {
  nome: string;
  url?: string;
  logo_path?: string | null;
}

// Interface base para mídia
export interface Midia {
  id: number;
  titulo_curado: string;
  titulo_api: string;
  poster_curado?: string;
  poster_url_api: string;
  data_lancamento_curada?: string;
  data_lancamento_api: string | null;
  /** Ano conhecido sem dia/mês (TBA) — não entra na timeline mensal */
  ano_lancamento_api?: number | null;
  /** false quando só ano_lancamento_api está definido */
  data_lancamento_confirmada?: boolean;
  sinopse?: string;
  sinopse_curada?: string;
  sinopse_api: string;
  plataformas_curadas?: Plataforma[];
  plataformas_api: Plataforma[];
  generos_curados?: Genre[];
  generos_api: string[];
  premiacoes?: Award[];
  trailer_key?: string;
  trailer_url_curado?: string;
  trailer_url_api?: string;
  avaliacao?: number; // Propriedade adicionada
  siteUrl?: string;
  /** Preço Steam (centavos BRL) — presente em cards de jogo do carrossel */
  steam_app_id?: number | null;
  steam_price_cents?: number | null;
  steam_discount_percent?: number | null;
  nextAiringEpisode?: {
    airingAt: string;
    episode: number;
    season?: number;
  } | null;
  lastAiredEpisode?: {
    airingAt: string;
    episode: number;
    season?: number;
  } | null;
}

// Interfaces específicas por tipo de mídia
export interface Filme extends Midia {
  homepage?: string;
  duracao: string | null;
  diretor: string | null;
  escritor: string | null;
  elenco: CastMember[];
  ingresso_link?: string;
  em_prevenda: boolean;
  em_cartaz?: boolean;
  em_breve?: boolean;
  tem_sessoes?: boolean;
  estreia_cinema?: boolean;
  estreia_streaming?: boolean;
  saga?: { id: number; nome: string } | null;
  popularity?: number | null;
  ultima_verificacao_ingresso?: string;
  videos?: Video[];
  status?: string;
  status_label?: string;
}

export interface Temporada {
  numero: number;
  nome?: string;
  episodios: number;
}

export interface SerieStreamingProvider {
  provider: StreamingProviderInfo;
  url: string | null;
}

export interface Serie extends Midia {
  homepage?: string;
  numero_temporadas: number;
  numero_episodios: number;
  status?: string;
  status_label?: string;
  estreia_streaming?: boolean;
  criadores: Creator[];
  elenco: CastMember[];
  videos?: Video[];
  temporadas?: Temporada[];
  streamingProviders?: SerieStreamingProvider[]; // Adicionado para consistência
}

export interface Relation {
  relationType: string;
  node?: { id: number; title: { romaji: string } };
}

export interface Anime extends Serie {
  titleRomaji?: string;
  titleEnglish?: string;
  titleNative?: string;
  mal_link?: string;
  fonte: string;
  estudio: string;
  dublagem_info: boolean;
  staff: StaffMember[];
  personagens: Character[];
  proximo_episodio?: string;
  numero_episodio_atual?: number;
  eventos_recorrentes_calendario?: boolean;
  tags_api?: string[];
  rankings?: { type: string; rank: number; year?: number; context?: string; allTime?: boolean }[];
  relations?: Relation[];
  airingSchedule?: any[];
  format?: string;
  isAdult?: boolean;
  nextAiringEpisode?: {
    airingAt: string;
    episode: number;
  } | null;
  startDate?: {
      year: number;
      month: number;
      day: number;
  };
}

export interface Jogo extends Midia {
  desenvolvedores: string[];
  publicadoras: string[];
  plataformas_jogo: GamePlatform[];
  modos_jogo?: string[];
  perspectivas?: string[];
  screenshots?: string[];
  evento_anuncio_id?: number;
  websites?: Website[];
  temas?: string[];
  videos?: Video[];
  steam_app_id?: number | null;
  steam_player_count?: number | null;
  steam_price_cents?: number | null;
  steam_discount_percent?: number | null;
  hypes?: number | null;
  follows?: number | null;
  pc_requirements?: { minimum?: string; recommended?: string } | null;
}

export interface Preferencias {
  tema: 'light' | 'dark' | 'system';
  notificacoes_email: boolean;
  notificacoes_push: boolean;
  idioma: string;
}

// Tipos de mídia
export type TipoMidia = 'filme' | 'serie' | 'anime' | 'jogo';

// Interface para usuário
export interface User {
  id: number;
  nome: string;
  email: string;
  avatar: string | null;
  role: 'user' | 'admin';
  quer_avaliar: boolean;
  data_criacao: string;
  preferencias?: Preferencias;
}

// Interface para interações do usuário
export interface UserInteraction {
  id: number;
  usuario_id: number;
  midia_id: number;
  tipo_midia: TipoMidia;
  status: 'favorito' | 'quero_assistir' | 'acompanhando' | 'assistido' | 'oculto';
  avaliacao?: 'gostei' | 'amei' | 'nao_gostei';
  data_interacao: string;
}

// Interface para notificações
export interface Notification {
  id: number;
  midia_id?: number | null;
  tipo_midia?: TipoMidia | null;
  message: string;
  type: string;
  foi_visualizada: boolean;
  createdAt: string;
}

export interface WatchlistAnime {
  id: string;
  crunchyrollId?: string | null;
  crunchyrollUrl?: string | null;
  malId?: number | null;
  animeId?: number | null;
  title: string;
  titleAlt?: string | null;
  posterUrl?: string | null;
  genres?: string[];
  season: number;
  episode: number;
  totalEpisodes?: number | null;
  episodeDurationSec?: number | null;
  remainingTimeSec?: number | null;
  status: 'comecar' | 'continuar' | 'seguir' | 'novamente' | 'terminado';
  lists?: string[];
  hasDub: boolean;
  note?: string | null;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
  lastSyncedAt?: string;
}

// Interface para eventos de games (IGDB)
export interface Evento {
  id: number;
  igdbId: number;
  nome: string;
  descricao?: string | null;
  data_inicio?: string | null;
  data_fim?: string | null;
  url?: string | null;
  total_jogos: number;
  jogos: Jogo[];
}

export interface EventoProximos {
  filmes: Filme[];
  series: Serie[];
  animes: Anime[];
  jogos: Jogo[];
}

export interface EventoDestaquesRecentes {
  filmes: Filme[];
  eventos: Evento[];
}

export interface EventoResumo {
  eventos_games: Evento[];
  proximos: EventoProximos;
  destaques_recentes: EventoDestaquesRecentes;
}

// Interface para eventos de anúncio (legado)
export interface EventoAnuncio {
  id: number;
  nome: string;
  data_evento: string;
}

// Props para componentes
export interface MidiaCardProps {
  midia: Filme | Serie | Anime | Jogo;
  type: TipoMidia;
  showCountdown?: boolean;
  userInteractions?: UserInteraction[];
  onInteraction?: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
  onClick?: () => void;
  isFocused?: boolean;
  priority?: boolean;
  onPosterLoad?: () => void;
}

export interface HeaderProps {
  currentPage?: string;
  user?: User | null;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onThemeToggle?: () => void;
}

export interface CarouselProps {
  title: string;
  items: (Filme | Serie | Anime | Jogo)[];
  type: TipoMidia;
  showNavigation?: boolean;
  onTitleClick?: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export interface DetailsModalProps {
  midia: Filme | Serie | Anime | Jogo;
  type: TipoMidia;
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  isAdmin?: boolean;
}

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  popularSearches?: string[];
}

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onNotificationClick: (notification: Notification) => void;
}

// Tipos para filtros
export interface FilterOptions {
  generos?: number[];
  plataformas?: string[];
  ano?: number;
  status?: string;
  tags?: string[];
}

// Tipos para respostas da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos para busca
export interface SearchResult {
  filmes: Filme[];
  series: Serie[];
  animes: Anime[];
  jogos: Jogo[];
  total: number;
}

export type SearchResultItem = (Filme & { type: 'filme' }) | (Serie & { type: 'serie' }) | (Anime & { type: 'anime' }) | (Jogo & { type: 'jogo' });

// Tipos para tema
export type Theme = 'light' | 'dark' | 'system';

// Tipos para calendário
export interface CalendarModalData {
  midia: Filme | Serie | Anime | Jogo | null;
  type: TipoMidia | null;
  eventType?: 'premiere' | 'recurring' | 'ticket';
}

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  recurring?: boolean;
  recurrenceRule?: string;
}

// Tipos para avaliação
export interface AvaliacaoModal {
  midia: Filme | Serie | Anime | Jogo;
  tipo: TipoMidia;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (avaliacao: 'gostei' | 'amei' | 'nao_gostei', analise?: string) => void;
}

// Tipos para estado global
export interface AppState {
  user: User | null;
  theme: Theme;
  notifications: Notification[];
  unreadCount: number;
  isSearchOpen: boolean;
  currentModal: string | null;
}

// Tipos para ações do usuário
export type UserAction = 
  | 'favoritar'
  | 'quero_assistir'
  | 'acompanhando'
  | 'ja_assisti'
  | 'ja_joguei'
  | 'nao_me_interessa';

// Tipos para status de carregamento
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Tipos para configurações de carrossel

export interface CarouselConfig {

  itemsPerView: number;

  spaceBetween: number;

  breakpoints: {

    [key: number]: {

      itemsPerView: number;

      spaceBetween: number;

    };

  };

}



// Tipos para Detalhes de Mídia (estrutura completa da API)



export interface Pessoa {

  id: number;

  name: string;

  profilePath: string | null;

}



export interface CrewMember {

  job: string;

  pessoa: Pessoa;

}



export interface CastMemberDetalhes {

  character: string;

  pessoa: Pessoa;

}



export interface FilmeGenre {

  genero: Genre;

}



export interface StreamingProviderInfo {

  id: number;

  name: string;

  logoPath: string | null;

}



export interface FilmeStreamingProvider {



  provider: StreamingProviderInfo;



  url: string | null;



}



export interface FilmeDetalhes {

  id: number;

  tmdbId: number;

  title: string;

  originalTitle: string | null;

  releaseDate: string | null;

  runtime: number | null;

  overview: string | null;

  posterPath: string | null;

  backdropPath: string | null;

  status: string;

  popularity?: number | null;
  voteAverage?: number | null;
  voteCount?: number | null;

  em_prevenda: boolean;

  em_cartaz?: boolean;

  ingresso_link: string | null;

  tem_sessoes?: boolean | null;
  estreia_cinema?: boolean;
  estreia_streaming?: boolean;

  genres: FilmeGenre[];

  crew: CrewMember[];

  cast: CastMemberDetalhes[];

  streamingProviders: FilmeStreamingProvider[];

  videos: Video[];

}



