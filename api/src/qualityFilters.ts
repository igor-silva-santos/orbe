import { Prisma } from '@prisma/client';
import { isLikelyPortuguese } from './translation';

// =============================================================================
// FILTROS DE RELEVÂNCIA — curadoria estilo AdoroCinema
//
// Duas camadas:
//   SYNC    — permissivo: popula o banco com conteúdo curado, exclui porcarias
//   DISPLAY — restritivo: home, timeline, carrossel, trending
// =============================================================================

// ── Display (home, timeline, carousel) — restritivo ──────────────────────────

/** Popularidade mínima OU voteCount mínimo (lógica OR) */
export const MIN_POPULARITY = 30;
export const MIN_VOTE_COUNT = 100;

/** voteAverage exigido quando voteCount > DISPLAY_VOTE_COUNT_FOR_AVERAGE */
export const DISPLAY_MIN_VOTE_AVERAGE = 6.0;
export const DISPLAY_VOTE_COUNT_FOR_AVERAGE = 50;

export const MIN_OVERVIEW_LENGTH = 50;

export const MIN_SERIE_EPISODES = 2;

/** AniList: score 0–100 */
export const MIN_ANIME_SCORE = 60;
export const MIN_ANIME_POPULARITY = 10000;

/** IGDB: rating 0–100 */
export const MIN_GAME_RATING = 50;
export const MIN_GAME_RATING_COUNT = 10;

// ── Sync — permissivo (popular o banco com listas curadas) ───────────────────

/** INCLUIR se popularity >= 20 OU voteCount >= 50 */
export const SYNC_MIN_POPULARITY = 20;
export const SYNC_MIN_VOTE_COUNT = 50;

/** voteAverage >= 5.5 quando voteCount > SYNC_VOTE_COUNT_FOR_AVERAGE */
export const SYNC_MIN_VOTE_AVERAGE = 5.5;
export const SYNC_VOTE_COUNT_FOR_AVERAGE = 20;

/** EXCLUIR se voteCount < 10 E popularity < 5 (totalmente irrelevante) */
export const SYNC_IRRELEVANT_VOTE_COUNT = 10;
export const SYNC_IRRELEVANT_POPULARITY = 5;

/** EXCLUIR docs/música obscuros: gênero doc/music E voteCount < 100 E popularity < 15 */
export const SYNC_OBSCURE_DOC_VOTE_COUNT = 100;
export const SYNC_OBSCURE_DOC_POPULARITY = 15;

export const SYNC_MIN_ANIME_SCORE = 60;
export const SYNC_MIN_ANIME_POPULARITY = 1000;

/** Popularidade mínima para lançamentos de temporada (bem menor que o filtro global) */
export const MIN_ANIME_SEASON_POPULARITY = 300;

export const RELEVANT_ANIME_FORMATS = ['TV', 'TV_SHORT', 'MOVIE', 'ONA'] as const;

export const SYNC_MIN_GAME_RATING = 50;
export const SYNC_MIN_GAME_RATING_COUNT = 3;

// ── Gêneros obscuros (TMDB) ──────────────────────────────────────────────────

/** IDs TMDB: 99 = Documentary, 104 = Music */
export const OBSCURE_GENRE_IDS = [99, 104];
export const OBSCURE_GENRE_NAMES = ['Documentary', 'Documentário', 'Music', 'Música'];

/** Gêneros narrativos — se presentes com Music, provavelmente é filme (não só concerto) */
const NARRATIVE_FILM_GENRE_IDS = [
  28, 12, 16, 35, 80, 18, 10751, 14, 36, 27, 9648, 878, 10770, 53, 10752, 37, 10749,
];

// ── Prisma filters para exibição ─────────────────────────────────────────────

/** Blockbusters sem entrada BR explícita ainda entram no carrossel */
export const CAROUSEL_BYPASS_MIN_POPULARITY = 15;
export const CAROUSEL_BYPASS_MIN_VOTE_COUNT = 50;

export const filmeQualityFilterRelaxed: Prisma.FilmeWhereInput = {
  AND: [
    { posterPath: { not: null } },
    { overview: { not: null } },
    { NOT: { overview: '' } },
    { OR: [{ adult: false }, { adult: null }] },
    {
      OR: [
        { popularity: { gte: 5 } },
        { voteCount: { gte: 10 } },
        { emCartaz: true },
        { emBreve: true },
      ],
    },
  ],
};

export const getFilmeQualityFilterForYear = (year?: number): Prisma.FilmeWhereInput => {
  const currentYear = new Date().getFullYear();
  if (year && year >= currentYear) {
    return filmeQualityFilterRelaxed;
  }
  return filmeQualityFilter;
};

export const filmeQualityFilter: Prisma.FilmeWhereInput = {
  AND: [
    { posterPath: { not: null } },
    { overview: { not: null } },
    { NOT: { overview: '' } },
    { OR: [{ adult: false }, { adult: null }] },
    {
      OR: [
        { popularity: { gte: MIN_POPULARITY } },
        { voteCount: { gte: MIN_VOTE_COUNT } },
        { emCartaz: true },
        { emBreve: true },
      ],
    },
    {
      OR: [
        { voteCount: { lte: DISPLAY_VOTE_COUNT_FOR_AVERAGE } },
        { voteCount: null },
        { voteAverage: { gte: DISPLAY_MIN_VOTE_AVERAGE } },
      ],
    },
  ],
};

/**
 * Carrossel: prioriza filmes com localização pt-BR (campo do sync).
 * Não exclui filmes sem flag (null = ainda não re-sincronizado) nem blockbusters/em cartaz.
 */
export const filmeCarouselLocalizationFilter: Prisma.FilmeWhereInput = {
  OR: [
    { localizacaoPtBr: true },
    { localizacaoPtBr: null },
    { emCartaz: true },
    { emBreve: true },
    { popularity: { gte: CAROUSEL_BYPASS_MIN_POPULARITY } },
    { voteCount: { gte: CAROUSEL_BYPASS_MIN_VOTE_COUNT } },
  ],
};

export const serieQualityFilter: Prisma.SerieWhereInput = {
  AND: [
    { posterPath: { not: null } },
    { overview: { not: null } },
    { NOT: { overview: '' } },
    { OR: [{ adult: false }, { adult: null }] },
    {
      OR: [
        { popularity: { gte: MIN_POPULARITY } },
        { voteCount: { gte: MIN_VOTE_COUNT } },
      ],
    },
    {
      OR: [
        { voteCount: { lte: DISPLAY_VOTE_COUNT_FOR_AVERAGE } },
        { voteCount: null },
        { voteAverage: { gte: DISPLAY_MIN_VOTE_AVERAGE } },
      ],
    },
    { numberOfEpisodes: { gte: MIN_SERIE_EPISODES } },
  ],
};

export const animeQualityFilter: Prisma.AnimeWhereInput = {
  OR: [
    { averageScore: { gte: MIN_ANIME_SCORE } },
    { popularity: { gte: MIN_ANIME_POPULARITY } },
  ],
  isAdult: false,
};

/** Exibição por temporada — inclui estreias recentes ainda sem nota/popularidade altas */
export const animeSeasonQualityFilter: Prisma.AnimeWhereInput = {
  isAdult: false,
  OR: [
    { averageScore: { gte: MIN_ANIME_SCORE } },
    { popularity: { gte: MIN_ANIME_POPULARITY } },
    { popularity: { gte: MIN_ANIME_SEASON_POPULARITY } },
    { status: { in: ['RELEASING', 'NOT_YET_RELEASED'] } },
  ],
};

export const jogoQualityFilter: Prisma.JogoWhereInput = {
  OR: [
    { rating: { gte: MIN_GAME_RATING } },
    { ratingCount: { gte: MIN_GAME_RATING_COUNT } },
  ],
};

// ── Helpers internos ─────────────────────────────────────────────────────────

type GenreRef = { id?: number; name?: string };

type MovieLike = {
  title?: string | null;
  original_title?: string | null;
  vote_count?: number;
  popularity?: number;
  vote_average?: number;
  poster_path?: string | null;
  overview?: string | null;
  adult?: boolean;
  genre_ids?: number[];
  genres?: GenreRef[];
  emCartaz?: boolean | null;
  emBreve?: boolean | null;
};

type SerieLike = {
  vote_count?: number;
  popularity?: number;
  vote_average?: number;
  poster_path?: string | null;
  overview?: string | null;
  number_of_episodes?: number;
  adult?: boolean;
};

type AnimeLike = {
  averageScore?: number | null;
  popularity?: number | null;
  isAdult?: boolean;
  format?: string | null;
  status?: string | null;
};

type JogoLike = {
  rating?: number | null;
  ratingCount?: number | null;
};

function hasValidPoster(posterPath?: string | null): boolean {
  return !!posterPath?.trim();
}

function hasValidOverview(overview?: string | null, minLength = MIN_OVERVIEW_LENGTH): boolean {
  return (overview?.trim().length ?? 0) >= minLength;
}

function passesVoteAverageGate(
  voteCount: number,
  voteAverage: number,
  minAverage: number,
  voteCountThreshold: number,
): boolean {
  if (voteCount <= voteCountThreshold) return true;
  return voteAverage >= minAverage;
}

function hasObscureGenre(movie: MovieLike): boolean {
  const genreIds = movie.genre_ids ?? movie.genres?.map((g) => g.id).filter(Boolean) ?? [];
  if (genreIds.some((id) => OBSCURE_GENRE_IDS.includes(id!))) return true;

  const genreNames = movie.genres?.map((g) => g.name).filter(Boolean) ?? [];
  return genreNames.some((name) => OBSCURE_GENRE_NAMES.includes(name!));
}

function isTotallyIrrelevant(voteCount: number, popularity: number): boolean {
  return voteCount < SYNC_IRRELEVANT_VOTE_COUNT && popularity < SYNC_IRRELEVANT_POPULARITY;
}

function isObscureDocOrMusic(voteCount: number, popularity: number, movie: MovieLike): boolean {
  return (
    hasObscureGenre(movie) &&
    voteCount < SYNC_OBSCURE_DOC_VOTE_COUNT &&
    popularity < SYNC_OBSCURE_DOC_POPULARITY
  );
}

const LIVE_SHOW_TITLE_PATTERNS = [
  /\blive from\b/i,
  /\blive in\b/i,
  /\blive at\b/i,
  /\blive:\s/i,
  /:\s*live\b/i,
  /\bworld tour\b/i,
  /\b tour\b/i,
  /\bconcert\b/i,
  /\bstand-?up\b/i,
  /\bcomedy special\b/i,
  /\bunplugged\b/i,
  /\blive performance\b/i,
];

/**
 * Show/concerto/gravação ao vivo no TMDB (ex.: "Katy Perry: The Lifetimes Tour - Live from Paris").
 * Aplica mesmo a em cartaz / em breve — o TMDB classifica isso como filme.
 */
export function isConcertOrLiveRecording(movie: MovieLike): boolean {
  const title = `${movie.title ?? ''} ${movie.original_title ?? ''}`;
  if (LIVE_SHOW_TITLE_PATTERNS.some((pattern) => pattern.test(title))) {
    return true;
  }

  const genreIds = movie.genre_ids ?? movie.genres?.map((g) => g.id).filter(Boolean) ?? [];
  if (!genreIds.includes(104)) return false;

  const hasNarrativeGenre = genreIds.some((id) => NARRATIVE_FILM_GENRE_IDS.includes(id!));
  if (hasNarrativeGenre) return false;

  // Só Music, ou Music + Documentary — típico de concert film no TMDB
  const otherGenres = genreIds.filter((id) => id !== 104 && id !== 99);
  return otherGenres.length === 0;
}

function hasSyncEngagement(voteCount: number, popularity: number): boolean {
  return popularity >= SYNC_MIN_POPULARITY || voteCount >= SYNC_MIN_VOTE_COUNT;
}

function hasDisplayEngagement(voteCount: number, popularity: number): boolean {
  return popularity >= MIN_POPULARITY || voteCount >= MIN_VOTE_COUNT;
}

// ── Validação em runtime (TMDB / AniList / IGDB) ─────────────────────────────

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

export function hasPortugueseLocalization(movie: MovieLike): boolean {
  if (hasLocalizedPortugueseTitle(movie)) return true;
  return isLikelyPortuguese(movie.overview) && (movie.overview?.trim().length ?? 0) >= 8;
}

/** Critérios restritivos para exibição na home/timeline (estilo AdoroCinema) */
export function isMovieRelevantForDisplay(movie: MovieLike): boolean {
  if (movie.adult) return false;
  if (!hasValidPoster(movie.poster_path)) return false;

  const voteCount = movie.vote_count ?? 0;
  const popularity = movie.popularity ?? 0;
  const voteAverage = movie.vote_average ?? 0;

  if (hasPortugueseLocalization(movie)) {
    if (isTotallyIrrelevant(voteCount, popularity)) return false;
    return passesVoteAverageGate(
      voteCount,
      voteAverage,
      DISPLAY_MIN_VOTE_AVERAGE,
      DISPLAY_VOTE_COUNT_FOR_AVERAGE,
    ) || voteCount >= 10 || popularity >= 5 || hasLocalizedPortugueseTitle(movie);
  }

  if (!hasValidOverview(movie.overview)) return false;

  const isCurated = movie.emCartaz === true || movie.emBreve === true;
  if (!hasDisplayEngagement(voteCount, popularity) && !isCurated) return false;

  return passesVoteAverageGate(
    voteCount,
    voteAverage,
    DISPLAY_MIN_VOTE_AVERAGE,
    DISPLAY_VOTE_COUNT_FOR_AVERAGE,
  );
}

/** Critérios permissivos para sincronização — exclui porcarias óbvias */
export function isMovieRelevantForSync(movie: MovieLike): boolean {
  if (movie.adult) return false;
  if (isConcertOrLiveRecording(movie)) return false;
  if (!hasValidPoster(movie.poster_path)) return false;

  const voteCount = movie.vote_count ?? 0;
  const popularity = movie.popularity ?? 0;
  const voteAverage = movie.vote_average ?? 0;

  if (hasPortugueseLocalization(movie)) {
    if (isTotallyIrrelevant(voteCount, popularity)) return false;
    return true;
  }

  if (isTotallyIrrelevant(voteCount, popularity)) return false;
  if (isObscureDocOrMusic(voteCount, popularity, movie)) return false;
  if (!hasSyncEngagement(voteCount, popularity)) return false;
  if (!hasValidOverview(movie.overview)) return false;

  return passesVoteAverageGate(
    voteCount,
    voteAverage,
    SYNC_MIN_VOTE_AVERAGE,
    SYNC_VOTE_COUNT_FOR_AVERAGE,
  );
}

export function isSerieRelevantForDisplay(serie: SerieLike): boolean {
  if (serie.adult) return false;
  if (!hasValidPoster(serie.poster_path)) return false;
  if (!hasValidOverview(serie.overview)) return false;

  const voteCount = serie.vote_count ?? 0;
  const popularity = serie.popularity ?? 0;
  const voteAverage = serie.vote_average ?? 0;

  if (!hasDisplayEngagement(voteCount, popularity)) return false;
  if ((serie.number_of_episodes ?? 0) < MIN_SERIE_EPISODES) return false;

  return passesVoteAverageGate(
    voteCount,
    voteAverage,
    DISPLAY_MIN_VOTE_AVERAGE,
    DISPLAY_VOTE_COUNT_FOR_AVERAGE,
  );
}

export function isSerieRelevantForSync(serie: SerieLike): boolean {
  if (serie.adult) return false;
  if (!hasValidPoster(serie.poster_path)) return false;

  const voteCount = serie.vote_count ?? 0;
  const popularity = serie.popularity ?? 0;
  const voteAverage = serie.vote_average ?? 0;

  if (isTotallyIrrelevant(voteCount, popularity)) return false;
  if (!hasSyncEngagement(voteCount, popularity)) return false;
  if (!hasValidOverview(serie.overview)) return false;

  return passesVoteAverageGate(
    voteCount,
    voteAverage,
    SYNC_MIN_VOTE_AVERAGE,
    SYNC_VOTE_COUNT_FOR_AVERAGE,
  );
}

export function isAnimeRelevantForDisplay(anime: AnimeLike): boolean {
  if (anime.isAdult) return false;
  return (
    (anime.averageScore ?? 0) >= MIN_ANIME_SCORE ||
    (anime.popularity ?? 0) >= MIN_ANIME_POPULARITY
  );
}

export function isAnimeRelevantForSync(anime: AnimeLike): boolean {
  if (anime.isAdult) return false;
  return (
    (anime.averageScore ?? 0) >= SYNC_MIN_ANIME_SCORE ||
    (anime.popularity ?? 0) >= SYNC_MIN_ANIME_POPULARITY
  );
}

/** Critérios para animes de temporada — prioriza lançamentos, não clássicos populares */
export function isAnimeRelevantForSeasonalSync(anime: AnimeLike): boolean {
  if (anime.isAdult) return false;

  if (anime.format && !RELEVANT_ANIME_FORMATS.includes(anime.format as typeof RELEVANT_ANIME_FORMATS[number])) {
    return false;
  }

  if ((anime.averageScore ?? 0) >= SYNC_MIN_ANIME_SCORE) return true;
  if ((anime.popularity ?? 0) >= MIN_ANIME_SEASON_POPULARITY) return true;
  if (anime.status === 'RELEASING' || anime.status === 'NOT_YET_RELEASED') return true;

  return false;
}

export function isJogoRelevantForDisplay(jogo: JogoLike): boolean {
  return (
    (jogo.rating ?? 0) >= MIN_GAME_RATING ||
    (jogo.ratingCount ?? 0) >= MIN_GAME_RATING_COUNT
  );
}

export function isJogoRelevantForSync(jogo: JogoLike): boolean {
  return (
    (jogo.rating ?? 0) >= SYNC_MIN_GAME_RATING ||
    (jogo.ratingCount ?? 0) >= SYNC_MIN_GAME_RATING_COUNT
  );
}

/** @deprecated Use isMovieRelevantForDisplay ou isMovieRelevantForSync */
export function isMovieRelevant(movie: MovieLike): boolean {
  return isMovieRelevantForDisplay(movie);
}
