import { Prisma } from '@prisma/client';

/** Critérios de relevância para filmes/séries na home e timeline */
export const MIN_VOTE_COUNT = 100;
export const MIN_POPULARITY = 30;
export const MIN_VOTE_AVERAGE = 5.0;

export const MIN_SERIE_EPISODES = 2;
export const MIN_ANIME_SCORE = 65;
export const MIN_ANIME_POPULARITY = 10000;
export const MIN_GAME_RATING = 60;
export const MIN_GAME_RATING_COUNT = 10;

export const filmeQualityFilter: Prisma.FilmeWhereInput = {
  AND: [
    { voteCount: { gte: MIN_VOTE_COUNT } },
    { popularity: { gte: MIN_POPULARITY } },
    { voteAverage: { gte: MIN_VOTE_AVERAGE } },
    { posterPath: { not: null } },
    { overview: { not: null } },
    { NOT: { overview: '' } },
  ],
};

export const serieQualityFilter: Prisma.SerieWhereInput = {
  AND: [
    { voteCount: { gte: MIN_VOTE_COUNT } },
    { popularity: { gte: MIN_POPULARITY } },
    { voteAverage: { gte: MIN_VOTE_AVERAGE } },
    { numberOfEpisodes: { gte: MIN_SERIE_EPISODES } },
    { posterPath: { not: null } },
    { overview: { not: null } },
    { NOT: { overview: '' } },
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

/** Valida relevância de um filme retornado pelo TMDB antes de inserir no banco */
export function isMovieRelevant(movie: {
  vote_count?: number;
  popularity?: number;
  vote_average?: number;
  poster_path?: string | null;
  overview?: string | null;
}): boolean {
  return (
    (movie.vote_count ?? 0) >= MIN_VOTE_COUNT &&
    (movie.popularity ?? 0) >= MIN_POPULARITY &&
    (movie.vote_average ?? 0) >= MIN_VOTE_AVERAGE &&
    !!movie.poster_path?.trim() &&
    !!movie.overview?.trim()
  );
}
