/**
 * Preferências Orbe — perfil logado, personalização e Match.
 * Espelhado em api/src/types/preferencias.ts (manter sincronizado).
 */

export type TipoMidiaPerfil = 'filme' | 'serie' | 'anime' | 'jogo';

export type CarouselId = 'filmes' | 'series' | 'animes' | 'jogos';

export interface TituloReferencia {
  tipo: TipoMidiaPerfil;
  externalId: number;
  titulo: string;
  fonte: 'orbe' | 'tmdb' | 'igdb' | 'anilist';
}

export interface GenerosFavoritosPorTipo {
  tipo: string;
  ids: number[];
}

export interface TasteProfile {
  tiposAtivos: TipoMidiaPerfil[];
  generosFavoritos: GenerosFavoritosPorTipo[];
  plataformasJogo: number[];
  titulosReferencia: TituloReferencia[];
  generosInferidos: number[];
  keywords: string[];
  ultimaAtualizacao: string | null;
}

export interface OrbeCarouselConfig {
  id: CarouselId;
  visivel: boolean;
  ordem: number;
  filtroPersonalizado: boolean;
  filtroAcompanhando: boolean;
}

export interface PopupPersonalizacaoConfig {
  naoMostrar: boolean;
  ultimaExibicao: string | null;
}

export interface PreferenciasOrbe {
  personalizacaoAtiva: boolean;
  onboardingCompleto: boolean;
  dataUltimoOnboarding: string | null;
  popup: PopupPersonalizacaoConfig;
  tasteProfile: TasteProfile;
  carrosseis: OrbeCarouselConfig[];
  querAvaliar: boolean;
}

/** @deprecated Preferências legadas de tema/notificações — usar PreferenciasOrbe */
export interface PreferenciasLegado {
  tema?: 'light' | 'dark' | 'system';
  notificacoes_email?: boolean;
  notificacoes_push?: boolean;
  idioma?: string;
}

const DEFAULT_CARROSSEIS: OrbeCarouselConfig[] = [
  { id: 'filmes', visivel: true, ordem: 0, filtroPersonalizado: false, filtroAcompanhando: false },
  { id: 'series', visivel: true, ordem: 1, filtroPersonalizado: false, filtroAcompanhando: false },
  { id: 'animes', visivel: true, ordem: 2, filtroPersonalizado: false, filtroAcompanhando: false },
  { id: 'jogos', visivel: true, ordem: 3, filtroPersonalizado: false, filtroAcompanhando: false },
];

export function getDefaultTasteProfile(): TasteProfile {
  return {
    tiposAtivos: [],
    generosFavoritos: [],
    plataformasJogo: [],
    titulosReferencia: [],
    generosInferidos: [],
    keywords: [],
    ultimaAtualizacao: null,
  };
}

export function getDefaultPreferenciasOrbe(querAvaliar = true): PreferenciasOrbe {
  return {
    personalizacaoAtiva: false,
    onboardingCompleto: false,
    dataUltimoOnboarding: null,
    popup: {
      naoMostrar: false,
      ultimaExibicao: null,
    },
    tasteProfile: getDefaultTasteProfile(),
    carrosseis: DEFAULT_CARROSSEIS.map((c) => ({ ...c })),
    querAvaliar,
  };
}
