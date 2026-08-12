import { Midia, Filme, Serie, Anime, Jogo, Character } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const NOT_INFORMED = '(não informado)';

/** Título de filme unificado — API TMDB (`title`) ou card/listagem (`titulo_api`) */
export const resolveFilmeTitle = (filme: {
  title?: string | null;
  titulo_api?: string | null;
  titulo_curado?: string | null;
}): string =>
  filme.title?.trim() ||
  filme.titulo_curado?.trim() ||
  filme.titulo_api?.trim() ||
  'Filme';

/** Poster de filme — detalhes TMDB ou card da API Orbe */
export const resolveFilmePoster = (filme: {
  posterPath?: string | null;
  poster_url_api?: string | null;
  poster_curado?: string | null;
}): string | null => {
  if (filme.posterPath) return `https://image.tmdb.org/t/p/w500${filme.posterPath}`;
  return filme.poster_curado || filme.poster_url_api || null;
};

/**
 * Normaliza o nome de um provedor de streaming para um valor padrão.
 */
export const normalizeProviderName = (name?: string | null): string => {
  if (!name) return 'Desconhecido';
  const lowerName = name.toLowerCase();
  if (lowerName.includes('netflix')) return 'Netflix';
  if (lowerName.includes('hbo') || lowerName === 'max') return 'Max';
  if (lowerName.includes('prime video') || lowerName.includes('amazon prime')) return 'Prime Video';
  if (lowerName === 'amazon' || lowerName.includes('amazon.')) return 'Prime Video';
  if (lowerName.includes('disney')) return 'Disney+';
  if (lowerName.includes('crunchyroll')) return 'Crunchyroll';
  if (lowerName.includes('star+') || lowerName.includes('star plus')) return 'Star+';
  if (lowerName.includes('apple tv')) return 'Apple TV+';
  if (lowerName.includes('globoplay') || lowerName.includes('globo play')) return 'Globoplay';
  if (lowerName.includes('claro')) return 'Claro TV+';
  if (lowerName.includes('hidive')) return 'HIDIVE';
  if (lowerName.includes('funimation')) return 'Funimation';
  if (lowerName.includes('tmdb')) return 'TMDB';
  return name;
};

export const inferProviderFromUrl = (url?: string | null): string | null => {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('crunchyroll')) return 'Crunchyroll';
  if (lower.includes('netflix')) return 'Netflix';
  if (lower.includes('disneyplus') || lower.includes('disney.com')) return 'Disney+';
  if (lower.includes('primevideo') || lower.includes('amazon.')) return 'Prime Video';
  if (lower.includes('hbomax') || lower.includes('max.com')) return 'Max';
  if (lower.includes('tv.apple') || lower.includes('apple.com/tv')) return 'Apple TV+';
  if (lower.includes('globoplay')) return 'Globoplay';
  if (lower.includes('claro')) return 'Claro TV+';
  if (lower.includes('starplus') || lower.includes('star-plus')) return 'Star+';
  if (lower.includes('hidive')) return 'HIDIVE';
  if (lower.includes('funimation')) return 'Funimation';
  return null;
};

/**
 * Extrai uma lista única e normalizada de provedores de streaming de um item de mídia.
 * @param item O objeto de mídia (filme, série ou anime).
 * @returns Uma lista de objetos de provedor com nome e ícone.
 */
export const getStreamingProviders = (item: Midia): { name: string; icon: string; logo_path?: string | null }[] => {
  const seen = new Map<string, { name: string; icon: string; logo_path?: string | null }>();

  for (const provider of item.plataformas_api ?? []) {
    const inferredFromUrl = inferProviderFromUrl(provider.url);
    let name = normalizeProviderName(provider.nome);
    if (name === 'Desconhecido' || !provider.nome?.trim()) {
      if (inferredFromUrl) name = inferredFromUrl;
    } else if (inferredFromUrl && name === provider.nome) {
      name = inferredFromUrl;
    }
    if (name === 'Desconhecido' || seen.has(name)) continue;
    seen.set(name, {
      name,
      icon: name.toLowerCase().replace('+', 'plus').replace(/ /g, '-'),
      logo_path: provider.logo_path ?? null,
    });
  }

  const providers = Array.from(seen.values());

  if (providers.length === 0) {
    const isFilmeCard =
      'duracao' in item || (item as { type?: string }).type === 'filme';
    const emPrevenda = 'em_prevenda' in item && Boolean((item as Filme).em_prevenda);
    const releaseRaw = item.data_lancamento_api;
    const isFutureRelease =
      releaseRaw &&
      !Number.isNaN(new Date(releaseRaw as string).getTime()) &&
      new Date(releaseRaw as string) > new Date();

    if (isFilmeCard && (emPrevenda || isFutureRelease)) {
      return [{ name: 'Nos Cinemas', icon: 'cinema' }];
    }
  }

  return providers;
};

/**
 * Extrai uma lista única e padronizada de plataformas de um jogo.
 * @param item O objeto de jogo.
 * @returns Uma lista de objetos de plataforma com nome e ícone.
 */
export const getGamePlatforms = (item: Jogo): { name: string; icon: string }[] => {
  const platformNames = item.plataformas_api?.map(p => p.nome) ?? [];
  const normalized = new Set<string>();

  platformNames.forEach(name => {
    if (!name) return;
    const lowerName = name.toLowerCase();
    if (lowerName.includes('playstation')) {
      normalized.add('PlayStation');
    } else if (lowerName.includes('xbox')) {
      normalized.add('Xbox');
    } else if (lowerName.includes('pc') || lowerName.includes('windows')) {
      normalized.add('PC');
    } else if (lowerName.includes('switch')) {
      normalized.add('Nintendo Switch');
    } else {
      normalized.add(name);
    }
  });

  return Array.from(normalized).map(name => ({
    name: name,
    icon: name.toLowerCase().replace(/ /g, '-')
  }));
};

/**
 * Verifica se um anime possui dublagem em português.
 * A lógica foi robustecida para iterar sobre todos os personagens.
 * @param item O objeto de anime.
 * @returns "Dublado" ou "Legendado".
 */
export const getAnimeDubStatus = (item: Anime): 'Dublado' | 'Legendado' => {
  if (!item.personagens || item.personagens.length === 0) {
    return 'Legendado';
  }

  for (const character of item.personagens) {
    // A propriedade `pt` indica a presença de dublador brasileiro.
    if (character.dubladores?.pt) {
      return 'Dublado';
    }
  }

  return 'Legendado';
};

/**
 * Formata a nota de avaliação de um item de mídia para uma string (ex: "8.1").
 * @param item O objeto de mídia.
 * @param type O tipo da mídia ('filme', 'serie', 'anime').
 * @returns A nota formatada ou null se não houver nota.
 */
export const formatRating = (item: Midia, type: 'filme' | 'serie' | 'anime' | 'jogo'): string | null => {
  const rating = item.avaliacao;
  if (typeof rating === 'number' && rating > 0) {
    return (rating / 10).toFixed(1);
  }
  return null;
};

/** Jogo PC/Steam com possibilidade de preço na loja Steam */
export const isPcOrSteamGame = (jogo: Jogo | Midia): boolean => {
  const platforms = jogo.plataformas_api || [];
  const hasPcPlatform = platforms.some((p) => /\b(pc|windows|steam|mac)\b/i.test(p.nome || ''));
  const steamAppId = 'steam_app_id' in jogo ? jogo.steam_app_id : undefined;
  return hasPcPlatform || Boolean(steamAppId);
};

export const formatSteamPriceBRL = (cents: number | null | undefined): string | null => {
  if (cents == null || cents < 0) return null;
  if (cents === 0) return 'Grátis';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
};

export const getSteamStoreUrl = (steamAppId: number | null | undefined): string | null => {
  if (!steamAppId) return null;
  return `https://store.steampowered.com/app/${steamAppId}`;
};

export const hasSteamPriceDisplay = (item: Jogo | Midia): boolean => {
  if (!isPcOrSteamGame(item)) return false;
  const appId = 'steam_app_id' in item ? item.steam_app_id : null;
  const cents = 'steam_price_cents' in item ? item.steam_price_cents : null;
  return Boolean(appId) && cents != null;
};

/**
 * Extrai e formata os links de lojas digitais de um objeto de jogo.
 * @param item O objeto de jogo.
 * @returns Uma lista de objetos de loja com nome, ícone e URL.
 */
export const getGameStores = (item: Jogo): { name: string; icon: string; url: string }[] => {
  if (!item.websites) return [];

  // Mapeamento de IDs de categoria de website da IGDB para informações da loja
  const storeCategoryMapping: { [key: number]: { name: string; icon: string; } } = {
    13: { name: 'Steam', icon: 'steam' },
    16: { name: 'Epic Games', icon: 'epic' },
    17: { name: 'GOG', icon: 'gog' },
    10: { name: 'App Store', icon: 'apple' },
    11: { name: 'App Store', icon: 'apple' },
    12: { name: 'Google Play', icon: 'google-play' },
    1: { name: 'Steam', icon: 'steam' },
    2: { name: 'Xbox', icon: 'xbox' },
    3: { name: 'PlayStation Store', icon: 'playstation' },
    4: { name: 'App Store', icon: 'apple' },
    5: { name: 'GOG', icon: 'gog' },
    6: { name: 'Nintendo eShop', icon: 'nintendo switch' },
    14: { name: 'Epic Games', icon: 'epic' },
  };

  // Mapeamento de substrings de URL para informações da loja
  const storeUrlMapping = [
    { contains: 'store.steampowered.com', name: 'Steam', icon: 'steam' },
    { contains: 'steampowered.com', name: 'Steam', icon: 'steam' },
    { contains: 'epicgames.com', name: 'Epic Games', icon: 'epic' },
    { contains: 'store.playstation.com', name: 'PlayStation Store', icon: 'playstation' },
    { contains: 'playstation.com', name: 'PlayStation Store', icon: 'playstation' },
    { contains: 'xbox.com', name: 'Xbox Store', icon: 'xbox' },
    { contains: 'nintendo.com', name: 'Nintendo eShop', icon: 'nintendo switch' },
    { contains: 'gog.com', name: 'GOG', icon: 'gog' },
    { contains: 'itch.io', name: 'itch.io', icon: 'itch' },
    { contains: 'humblebundle.com', name: 'Humble', icon: 'humble' },
    { contains: 'ubisoft.com', name: 'Ubisoft', icon: 'ubisoft' },
    { contains: 'ea.com', name: 'EA App', icon: 'ea' },
    { contains: 'battle.net', name: 'Battle.net', icon: 'battlenet' },
  ];

  const foundStores = new Map<string, { name: string; icon: string; url: string }>();

  for (const website of item.websites) {
    if (!website?.url) continue;
    let storeInfo: { name: string; icon: string; } | null = null;

    // 1. Tenta encontrar pela categoria
    if (website.category != null && storeCategoryMapping[website.category]) {
      storeInfo = storeCategoryMapping[website.category];
    }
    // 2. Se não encontrou, tenta encontrar por substring da URL
    else {
      const urlMatch = storeUrlMapping.find((mapping) => website.url.includes(mapping.contains));
      if (urlMatch) {
        storeInfo = urlMatch;
      }
    }

    // Se encontrou uma loja e ela ainda não foi adicionada, adiciona à lista
    if (storeInfo && !foundStores.has(storeInfo.name)) {
      foundStores.set(storeInfo.name, {
        ...storeInfo,
        url: website.url,
      });
    }
  }

  return Array.from(foundStores.values());
};

/** Links clicáveis de lojas/plataformas para o modal de jogos */
export const getGamePlatformLinks = (item: Jogo): { name: string; icon: string; url: string }[] => {
  const links = new Map<string, { name: string; icon: string; url: string }>();

  for (const store of getGameStores(item)) {
    links.set(store.name, store);
  }

  const steamUrl = getSteamStoreUrl(item.steam_app_id);
  if (steamUrl && !links.has('Steam')) {
    links.set('Steam', { name: 'Steam', icon: 'steam', url: steamUrl });
  }

  return Array.from(links.values());
};

function platformIconKey(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('playstation') || lower === 'ps4' || lower === 'ps5') return 'playstation';
  if (lower.includes('xbox')) return 'xbox';
  if (lower.includes('nintendo') || lower.includes('switch')) return 'nintendo';
  if (lower.includes('steam')) return 'steam';
  if (lower.includes('epic')) return 'epic';
  if (lower.includes('gog')) return 'gog';
  if (lower === 'pc' || lower.includes('windows') || lower.includes('mac')) return 'pc';
  return lower;
}

export type GamePlatformDisplayItem = {
  name: string;
  icon: string;
  url?: string;
};

/** Lojas com link + ícones de plataforma (hardware) sem duplicar */
export const getGamePlatformDisplayItems = (jogo: Jogo): GamePlatformDisplayItem[] => {
  const result: GamePlatformDisplayItem[] = [];
  const seen = new Set<string>();

  const add = (item: GamePlatformDisplayItem) => {
    const key = platformIconKey(item.icon);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(item);
  };

  for (const store of getGamePlatformLinks(jogo)) {
    add({ name: store.name, icon: store.icon, url: store.url });
  }

  for (const platform of getGamePlatforms(jogo)) {
    const key = platformIconKey(platform.icon);
    if (seen.has(key)) continue;
    add({ name: platform.name, icon: platform.icon });
  }

  return result;
};

/**
 * Traduz uma função (job) de inglês para português.
 * @param role A função em inglês.
 * @returns A função traduzida ou a original se não houver tradução.
 */
export const translateRole = (role?: string | null): string => {
  if (!role) return NOT_INFORMED;
  const roleDictionary: { [key: string]: string } = {
    'Director': 'Diretor(a)',
    'Screenplay': 'Roteiro',
    'Writer': 'Escritor(a)',
    'Creator': 'Criador(a)',
    'Producer': 'Produtor(a)',
    'Original Story': 'História Original',
    'Voice Actor': 'Dublador(a)',
  };

  return roleDictionary[role] || role;
};

const animeGenreDictionary: Record<string, string> = {
  Action: 'Ação',
  Adventure: 'Aventura',
  Comedy: 'Comédia',
  Drama: 'Drama',
  Ecchi: 'Ecchi',
  Fantasy: 'Fantasia',
  Horror: 'Terror',
  'Mahou Shoujo': 'Garota Mágica',
  Mecha: 'Mecha',
  Music: 'Música',
  Mystery: 'Mistério',
  Psychological: 'Psicológico',
  Romance: 'Romance',
  'Sci-Fi': 'Ficção Científica',
  'Slice of Life': 'Cotidiano',
  Sports: 'Esportes',
  Supernatural: 'Sobrenatural',
  Thriller: 'Suspense',
  Suspense: 'Suspense',
};

export const translateAnimeGenre = (genre: string): string =>
  animeGenreDictionary[genre] || genre;

/** Tipos de relação da AniList (seção "Relacionados" do modal de anime) */
const animeRelationTypeDictionary: Record<string, string> = {
  ADAPTATION: 'Adaptação',
  PREQUEL: 'Prequela',
  SEQUEL: 'Sequência',
  PARENT: 'Obra Principal',
  SIDE_STORY: 'História Paralela',
  CHARACTER: 'Personagem',
  SUMMARY: 'Resumo',
  ALTERNATIVE: 'Versão Alternativa',
  SPIN_OFF: 'Spin-off',
  OTHER: 'Outro',
  SOURCE: 'Obra Original',
  COMPILATION: 'Compilação',
  CONTAINS: 'Contém',
};

export const translateAnimeRelationType = (relationType?: string | null): string =>
  (relationType && animeRelationTypeDictionary[relationType]) || relationType || 'Relacionado';

/** Tipos de ranking da AniList (seção "Rankings" do modal de anime) */
const animeRankingTypeDictionary: Record<string, string> = {
  RATED: 'Avaliação',
  POPULAR: 'Popularidade',
};

export const translateAnimeRankingType = (rankingType?: string | null): string =>
  (rankingType && animeRankingTypeDictionary[rankingType]) || rankingType || '';

/** Frases livres da AniList em `rankings[].context` (ex.: "highest rated all time") */
const animeRankingContextDictionary: [RegExp, string][] = [
  [/highest rated/gi, 'mais bem avaliado'],
  [/most popular/gi, 'mais popular'],
  [/all time/gi, 'de todos os tempos'],
];

export const translateAnimeRankingContext = (context?: string | null): string => {
  if (!context) return '';
  return animeRankingContextDictionary.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    context,
  );
};

const translationErrorPattern = /MYMEMORY\s+WARNING|YOU\s+USED\s+ALL\s+AVAILABLE\s+FREE|TRANSLATED\.NET/i;

/** Remove tags HTML e normaliza quebras de linha */
export const stripHtml = (html: string): string =>
  html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const sanitizeTranslatedText = (text: string | null | undefined): string => {
  if (!text) return '';
  if (translationErrorPattern.test(text)) return '';
  return text;
};

const capitalizeWeekday = (weekday: string) =>
  weekday
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');

export const formatNextEpisodeWeekday = (airingAt: string): string => {
  try {
    return capitalizeWeekday(format(new Date(airingAt), 'EEEE', { locale: ptBR }));
  } catch {
    return '';
  }
};

/** Modal — ex.: "Ep. 8 em 16/08/2026 - Domingo" */
export const formatNextEpisodeDetail = (
  airingAt: string,
  episode: number,
): string => {
  try {
    const date = new Date(airingAt);
    const dateLabel = format(date, 'dd/MM/yyyy', { locale: ptBR });
    const weekday = formatNextEpisodeWeekday(airingAt);
    return weekday
      ? `Ep. ${episode} em ${dateLabel} - ${weekday}`
      : `Ep. ${episode} em ${dateLabel}`;
  } catch {
    return `Ep. ${episode}`;
  }
};

/** Card — ex.: "Ep 8 · 6d 10h" */
export const formatNextEpisodeCard = (
  airingAt: string,
  episode: number,
  countdown: string,
): string => {
  const countdownLabel = countdown || 'em breve';
  return `Ep ${episode} · ${countdownLabel}`;
};

/** @deprecated Use formatNextEpisodeDetail */
export const formatNextEpisodeSchedule = formatNextEpisodeDetail;
