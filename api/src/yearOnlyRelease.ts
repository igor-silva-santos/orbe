/**
 * Lançamentos com ano conhecido mas sem dia/mês (TBA).
 * Isolados da timeline mensal do carrossel — nunca usar sentinela YYYY-01-01 em releaseDate.
 */

export type ResolvedRelease = {
  calendarDate: Date | null;
  releaseYear: number | null;
  isYearOnly: boolean;
};

const TMDB_TBA_STATUSES = new Set(['Rumored', 'Planned', 'Post Production', 'In Production']);

export function isYearWithinRange(year: number, start: Date, end: Date): boolean {
  return year >= start.getFullYear() && year <= end.getFullYear();
}

/** Filme/Série TMDB: data completa ou ano TBA explícito */
export function resolveTmdbRelease(
  releaseDateRaw: string | null | undefined,
  status: string | null | undefined,
): ResolvedRelease {
  if (releaseDateRaw) {
    const full = new Date(releaseDateRaw);
    if (!Number.isNaN(full.getTime())) {
      const iso = releaseDateRaw.slice(0, 10);
      if (/^\d{4}-01-01$/.test(iso) && status && TMDB_TBA_STATUSES.has(status)) {
        const year = parseInt(iso.slice(0, 4), 10);
        return { calendarDate: null, releaseYear: year, isYearOnly: true };
      }
      return { calendarDate: full, releaseYear: full.getFullYear(), isYearOnly: false };
    }
    if (/^\d{4}$/.test(releaseDateRaw)) {
      const year = parseInt(releaseDateRaw, 10);
      return { calendarDate: null, releaseYear: year, isYearOnly: true };
    }
  }
  return { calendarDate: null, releaseYear: null, isYearOnly: false };
}

/** IGDB: first_release_date unix ou release_dates com categoria TBD (7) */
export function resolveIgdbRelease(game: {
  first_release_date?: number | null;
  release_dates?: { date?: number; category?: number }[] | null;
}): ResolvedRelease {
  if (game.first_release_date) {
    const d = new Date(game.first_release_date * 1000);
    if (!Number.isNaN(d.getTime())) {
      return { calendarDate: d, releaseYear: d.getFullYear(), isYearOnly: false };
    }
  }

  const tbdDates = (game.release_dates ?? []).filter((rd) => rd.date && rd.category === 7);
  if (tbdDates.length > 0) {
    const years = tbdDates
      .map((rd) => new Date((rd.date as number) * 1000).getFullYear())
      .filter((y) => y > 1970);
    if (years.length > 0) {
      const year = Math.min(...years);
      return { calendarDate: null, releaseYear: year, isYearOnly: true };
    }
  }

  const anyDates = (game.release_dates ?? []).filter((rd) => rd.date);
  if (anyDates.length > 0) {
    const years = anyDates
      .map((rd) => new Date((rd.date as number) * 1000).getFullYear())
      .filter((y) => y > 1970);
    if (years.length > 0) {
      const year = Math.min(...years);
      return { calendarDate: null, releaseYear: year, isYearOnly: true };
    }
  }

  return { calendarDate: null, releaseYear: null, isYearOnly: false };
}

export function yearOnlyFilmeWhere(year: number) {
  return {
    releaseYear: year,
    releaseDate: null as null,
  };
}

export function yearOnlySerieWhere(year: number) {
  return {
    releaseYear: year,
    firstAirDate: null as null,
  };
}

export function yearOnlyJogoWhere(year: number) {
  return {
    releaseYear: year,
    firstReleaseDate: null as null,
  };
}
