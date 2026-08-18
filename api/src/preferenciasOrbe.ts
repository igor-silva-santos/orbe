/**
 * Preferências Orbe — perfil logado, personalização e Match.
 * Espelhado em frontend/src/types/perfil.ts (manter sincronizado).
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

const CAROUSEL_IDS: CarouselId[] = ['filmes', 'series', 'animes', 'jogos'];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeCarouselConfig(stored: unknown, defaults: OrbeCarouselConfig[]): OrbeCarouselConfig[] {
  if (!Array.isArray(stored)) {
    return defaults.map((c) => ({ ...c }));
  }

  const byId = new Map<CarouselId, OrbeCarouselConfig>();
  for (const item of stored) {
    if (!isPlainObject(item)) continue;
    const id = item.id;
    if (typeof id !== 'string' || !CAROUSEL_IDS.includes(id as CarouselId)) continue;
    const base = defaults.find((d) => d.id === id) ?? {
      id: id as CarouselId,
      visivel: true,
      ordem: 0,
      filtroPersonalizado: false,
      filtroAcompanhando: false,
    };
    byId.set(id as CarouselId, {
      id: id as CarouselId,
      visivel: typeof item.visivel === 'boolean' ? item.visivel : base.visivel,
      ordem: typeof item.ordem === 'number' ? item.ordem : base.ordem,
      filtroPersonalizado:
        typeof item.filtroPersonalizado === 'boolean' ? item.filtroPersonalizado : base.filtroPersonalizado,
      filtroAcompanhando:
        typeof item.filtroAcompanhando === 'boolean' ? item.filtroAcompanhando : base.filtroAcompanhando,
    });
  }

  return defaults.map((d) => byId.get(d.id) ?? { ...d });
}

function mergeTasteProfile(stored: unknown, defaults: TasteProfile): TasteProfile {
  if (!isPlainObject(stored)) {
    return { ...defaults };
  }

  const tiposAtivos = Array.isArray(stored.tiposAtivos)
    ? stored.tiposAtivos.filter(
        (t): t is TipoMidiaPerfil =>
          typeof t === 'string' && ['filme', 'serie', 'anime', 'jogo'].includes(t),
      )
    : defaults.tiposAtivos;

  return {
    tiposAtivos,
    generosFavoritos: Array.isArray(stored.generosFavoritos)
      ? (stored.generosFavoritos as GenerosFavoritosPorTipo[])
      : defaults.generosFavoritos,
    plataformasJogo: Array.isArray(stored.plataformasJogo)
      ? stored.plataformasJogo.filter((id): id is number => typeof id === 'number')
      : defaults.plataformasJogo,
    titulosReferencia: Array.isArray(stored.titulosReferencia)
      ? (stored.titulosReferencia as TituloReferencia[])
      : defaults.titulosReferencia,
    generosInferidos: Array.isArray(stored.generosInferidos)
      ? stored.generosInferidos.filter((id): id is number => typeof id === 'number')
      : defaults.generosInferidos,
    keywords: Array.isArray(stored.keywords)
      ? stored.keywords.filter((k): k is string => typeof k === 'string')
      : defaults.keywords,
    ultimaAtualizacao:
      typeof stored.ultimaAtualizacao === 'string' ? stored.ultimaAtualizacao : defaults.ultimaAtualizacao,
  };
}

/**
 * Mescla JSON armazenado (parcial, legado ou null) com defaults documentados.
 * Campos desconhecidos no root são preservados para compatibilidade (ex.: tema legado).
 */
export function mergePreferenciasOrbe(
  stored: unknown,
  options?: { querAvaliar?: boolean },
): PreferenciasOrbe & Record<string, unknown> {
  const defaults = getDefaultPreferenciasOrbe(options?.querAvaliar ?? true);
  const src = isPlainObject(stored) ? stored : {};

  const popupSrc = isPlainObject(src.popup) ? src.popup : {};
  const merged: PreferenciasOrbe & Record<string, unknown> = {
    ...src,
    personalizacaoAtiva:
      typeof src.personalizacaoAtiva === 'boolean' ? src.personalizacaoAtiva : defaults.personalizacaoAtiva,
    onboardingCompleto:
      typeof src.onboardingCompleto === 'boolean' ? src.onboardingCompleto : defaults.onboardingCompleto,
    dataUltimoOnboarding:
      typeof src.dataUltimoOnboarding === 'string' || src.dataUltimoOnboarding === null
        ? src.dataUltimoOnboarding
        : defaults.dataUltimoOnboarding,
    popup: {
      naoMostrar:
        typeof popupSrc.naoMostrar === 'boolean' ? popupSrc.naoMostrar : defaults.popup.naoMostrar,
      ultimaExibicao:
        typeof popupSrc.ultimaExibicao === 'string' || popupSrc.ultimaExibicao === null
          ? popupSrc.ultimaExibicao
          : defaults.popup.ultimaExibicao,
    },
    tasteProfile: mergeTasteProfile(src.tasteProfile, defaults.tasteProfile),
    carrosseis: mergeCarouselConfig(src.carrosseis, defaults.carrosseis),
    querAvaliar:
      typeof src.querAvaliar === 'boolean'
        ? src.querAvaliar
        : options?.querAvaliar ?? defaults.querAvaliar,
  };

  return merged;
}
