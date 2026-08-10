import { Prisma } from '@prisma/client';

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

export const SYNC_MIN_GAME_RATING = 50;
export const SYNC_MIN_GAME_RATING_COUNT = 3;

// ── Gêneros obscuros (TMDB) ──────────────────────────────────────────────────

/** IDs TMDB: 99 = Documentary, 104 = Music */
export const OBSCURE_GENRE_IDS = [99, 104];
export const OBSCURE_GENRE_NAMES = ['Documentary', 'Documentário', 'Music', 'Música'];

// ── Prisma filters para exibição ─────────────────────────────────────────────

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

export const jogoQualityFilter: Prisma.JogoWhereInput = {
  OR: [
    { rating: { gte: MIN_GAME_RATING } },
    { ratingCount: { gte: MIN_GAME_RATING_COUNT } },
  ],
};

// ── Helpers internos ─────────────────────────────────────────────────────────

type GenreRef = { id?: number; name?: string };

type MovieLike = {
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

function hasSyncEngagement(voteCount: number, popularity: number): boolean {
  return popularity >= SYNC_MIN_POPULARITY || voteCount >= SYNC_MIN_VOTE_COUNT;
}

function hasDisplayEngagement(voteCount: number, popularity: number): boolean {
  return popularity >= MIN_POPULARITY || voteCount >= MIN_VOTE_COUNT;
}

// ── Validação em runtime (TMDB / AniList / IGDB) ─────────────────────────────

/** Critérios restritivos para exibição na home/timeline (estilo AdoroCinema) */
export function isMovieRelevantForDisplay(movie: MovieLike): boolean {
  if (movie.adult) return false;
  if (!hasValidPoster(movie.poster_path)) return false;
  if (!hasValidOverview(movie.overview)) return false;

  const voteCount = movie.vote_count ?? 0;
  const popularity = movie.popularity ?? 0;
  const voteAverage = movie.vote_average ?? 0;

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
  if (!hasValidPoster(movie.poster_path)) return false;

  const voteCount = movie.vote_count ?? 0;
  const popularity = movie.popularity ?? 0;
  const voteAverage = movie.vote_average ?? 0;

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
