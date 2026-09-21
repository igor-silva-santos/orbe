import { isConcertOrLiveRecording } from './qualityFilters';

export const ANTECIPACAO_HORIZON_DAYS = 120;
export const HOME_LAUNCH_MIN_RUNTIME_MINUTES = 40;

export type FilmeAntecipacaoCandidate = {
  title: string;
  originalTitle?: string | null;
  overview?: string | null;
  popularity?: number | null;
  voteCount?: number | null;
  releaseDate?: Date | string | null;
  collectionId?: number | null;
  emBreve?: boolean | null;
  em_prevenda?: boolean | null;
  localizacaoPtBr?: boolean | null;
  runtime?: number | null;
  genres?: { genero: { tmdbId: number } }[];
  videos?: { type: string }[];
};

function releaseTime(value: Date | string | null | undefined): number | null {
  if (!value) return null;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? null : t;
}

export function isFilmeUpcoming(
  filme: FilmeAntecipacaoCandidate,
  now: Date = new Date(),
): boolean {
  const t = releaseTime(filme.releaseDate);
  return t !== null && t >= now.getTime();
}

export function hasFichaMinimaAntecipacao(filme: FilmeAntecipacaoCandidate): boolean {
  const overviewOk = (filme.overview?.trim().length ?? 0) >= 40;
  const tentpole = (filme.popularity ?? 0) >= 35;
  const marketing = Boolean(filme.emBreve || filme.em_prevenda || filme.localizacaoPtBr);
  return overviewOk || tentpole || marketing;
}

export function scoreFilmeAntecipacao(filme: FilmeAntecipacaoCandidate, now: Date = new Date()): number {
  const pop = filme.popularity ?? 0;
  const release = releaseTime(filme.releaseDate);
  const days =
    release !== null
      ? Math.max(0, Math.ceil((release - now.getTime()) / 86_400_000))
      : 999;

  let score = Math.log10(pop + 1) * 42;
  if (days <= 90) score += (90 - days) * 0.15;
  if (filme.collectionId) score += 12;
  if (filme.emBreve || filme.em_prevenda) score += 8;
  if (filme.localizacaoPtBr) score += 8;
  if (filme.videos?.some((v) => v.type === 'Trailer')) score += 4;
  return score;
}

export function computeAdaptivePopularityFloor(popularities: number[]): number {
  if (popularities.length === 0) return 22;
  const sorted = [...popularities].sort((a, b) => a - b);
  const p70 = sorted[Math.floor(sorted.length * 0.7)] ?? 0;
  return Math.max(8, Math.min(22, p70 * 0.45));
}

function passesConcertExclusion(filme: FilmeAntecipacaoCandidate): boolean {
  return !isConcertOrLiveRecording({
    title: filme.title,
    original_title: filme.originalTitle ?? undefined,
    genre_ids: filme.genres?.map((g) => g.genero.tmdbId) ?? [],
  });
}

/** Gate para estreias futuras — não remove já lançados do carrossel */
export function filterFilmesAntecipacaoGate<T extends FilmeAntecipacaoCandidate>(
  filmes: T[],
  now: Date = new Date(),
): T[] {
  const upcoming = filmes.filter((f) => isFilmeUpcoming(f, now) && passesConcertExclusion(f));
  const eligible = upcoming.filter(hasFichaMinimaAntecipacao);
  const floor = computeAdaptivePopularityFloor(eligible.map((f) => f.popularity ?? 0));

  return filmes.filter((f) => {
    if (!isFilmeUpcoming(f, now)) return true;
    if (!passesConcertExclusion(f) || !hasFichaMinimaAntecipacao(f)) return false;
    return (f.popularity ?? 0) >= floor;
  });
}

export function passesHomeLaunchRuntime(filme: FilmeAntecipacaoCandidate): boolean {
  if (filme.runtime == null) return true;
  return filme.runtime >= HOME_LAUNCH_MIN_RUNTIME_MINUTES;
}

export function filterFilmesHomeLaunchCarousel<T extends FilmeAntecipacaoCandidate>(
  filmes: T[],
  now: Date = new Date(),
): T[] {
  const gated = filterFilmesAntecipacaoGate(filmes, now);
  return gated.filter(passesHomeLaunchRuntime);
}

export function sortFilmesByAntecipacaoScore<T extends FilmeAntecipacaoCandidate>(
  filmes: T[],
  now: Date = new Date(),
): T[] {
  return [...filmes]
    .filter((f) => isFilmeUpcoming(f, now) && hasFichaMinimaAntecipacao(f) && passesConcertExclusion(f))
    .sort((a, b) => scoreFilmeAntecipacao(b, now) - scoreFilmeAntecipacao(a, now));
}
