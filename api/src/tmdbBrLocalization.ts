import { isLikelyPortuguese } from './translation';

export type TmdbTranslationEntry = {
  iso_3166_1?: string;
  iso_639_1?: string;
  data?: {
    title?: string;
    overview?: string;
  };
};

const MIN_BR_OVERVIEW_LENGTH = 8;

/** Entrada pt-BR explícita na lista de traduções do TMDB (iso BR + idioma pt). */
export function findBrTranslation(
  translations: TmdbTranslationEntry[] | null | undefined,
): TmdbTranslationEntry | undefined {
  if (!translations?.length) return undefined;
  return translations.find((t) => t.iso_3166_1 === 'BR' && t.iso_639_1 === 'pt');
}

/** Título ou sinopse preenchidos na entrada BR (dados crus do TMDB, antes de tradução automática). */
export function hasBrTranslationContent(entry: TmdbTranslationEntry | undefined): boolean {
  if (!entry?.data) return false;

  const title = entry.data.title?.trim();
  if (title && title.length >= 2) return true;

  const overview = entry.data.overview?.trim();
  if (overview && overview.length >= MIN_BR_OVERVIEW_LENGTH && isLikelyPortuguese(overview)) {
    return true;
  }

  return false;
}

type MovieLike = {
  title?: string | null;
  original_title?: string | null;
  overview?: string | null;
};

function hasLocalizedPortugueseTitle(movie: MovieLike): boolean {
  const title = movie.title?.trim();
  if (!title || title.length < 2) return false;

  if (isLikelyPortuguese(title)) return true;
  if (/[ãõáéíóúâêôç]/i.test(title)) return true;

  const original = movie.original_title?.trim();
  if (original && title.localeCompare(original, undefined, { sensitivity: 'accent' }) !== 0) {
    return true;
  }

  return false;
}

/** Sinal composto: entrada BR no TMDB OU título/sinopse pt-BR na resposta com language=pt-BR. */
export function detectMovieBrLocalization(
  movie: MovieLike,
  translations: TmdbTranslationEntry[] | null | undefined,
): boolean {
  const brEntry = findBrTranslation(translations);
  if (hasBrTranslationContent(brEntry)) return true;

  if (hasLocalizedPortugueseTitle(movie)) return true;

  const overview = movie.overview?.trim();
  if (overview && overview.length >= MIN_BR_OVERVIEW_LENGTH && isLikelyPortuguese(overview)) {
    return true;
  }

  return false;
}

/** Sinopse oficial BR quando disponível na entrada de tradução. */
export function getBrOverviewFromTranslations(
  translations: TmdbTranslationEntry[] | null | undefined,
): string | null {
  const overview = findBrTranslation(translations)?.data?.overview?.trim();
  return overview || null;
}

/** Título oficial pt-BR quando disponível na entrada de tradução BR do TMDB. */
export function getBrTitleFromTranslations(
  translations: TmdbTranslationEntry[] | null | undefined,
): string | null {
  const title = findBrTranslation(translations)?.data?.title?.trim();
  return title && title.length >= 2 ? title : null;
}

/**
 * Resolve o melhor título pt-BR para matching com o Ingresso:
 * tradução BR explícita, ou título já localizado na resposta pt-BR do TMDB.
 */
export function resolveMovieTituloBr(
  movie: MovieLike,
  translations: TmdbTranslationEntry[] | null | undefined,
): string | null {
  const fromTranslations = getBrTitleFromTranslations(translations);
  if (fromTranslations) return fromTranslations;

  const title = movie.title?.trim();
  if (!title || title.length < 2) return null;

  if (hasLocalizedPortugueseTitle(movie)) return title;

  return null;
}
