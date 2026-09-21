export type SeasonEpisode = { season: number; episode: number };

export function compareSeasonEpisode(a: SeasonEpisode, b: SeasonEpisode): number {
  if (a.season !== b.season) return a.season - b.season;
  return a.episode - b.episode;
}

export function maxSeasonEpisode(a: SeasonEpisode, b: SeasonEpisode): SeasonEpisode {
  return compareSeasonEpisode(a, b) >= 0 ? a : b;
}

export function isAtOrPastPosition(pos: SeasonEpisode, frontier: SeasonEpisode | null | undefined): boolean {
  if (!frontier) return false;
  return compareSeasonEpisode(pos, frontier) >= 0;
}

/** `true` se há conteúm em sub/leg à frente do que existe em dublagem PT-BR */
export function subAheadOfDub(
  sub: SeasonEpisode | null | undefined,
  dub: SeasonEpisode | null | undefined,
): boolean {
  if (!sub || !dub) return false;
  return compareSeasonEpisode(sub, dub) > 0;
}
