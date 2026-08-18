export type EventStatus = 'upcoming' | 'ongoing' | 'past';

type EventTiming = {
  start_time?: Date | string | null;
  end_time?: Date | string | null;
};

export function getYearBounds(year: number) {
  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const end = new Date(year, 11, 31, 23, 59, 59, 999);
  return { start, end };
}

/** Evento com qualquer interseção com o ano civil (início ou fim dentro do ano, ou span que cruza o ano). */
export function eventOverlapsYear(event: EventTiming, year: number): boolean {
  const { start: yearStart, end: yearEnd } = getYearBounds(year);
  const start = event.start_time ? new Date(event.start_time) : null;
  const end = event.end_time ? new Date(event.end_time) : start;

  if (!start && !end) return false;
  const effectiveStart = start ?? end!;
  const effectiveEnd = end ?? start!;

  return effectiveStart <= yearEnd && effectiveEnd >= yearStart;
}

export function getEventStatus(event: EventTiming, now = new Date()): EventStatus {
  if (!event.start_time) return 'upcoming';

  const start = new Date(event.start_time);
  const end = event.end_time ? new Date(event.end_time) : start;

  if (now < start) return 'upcoming';
  if (now <= end) return 'ongoing';
  return 'past';
}

export function pickEventWebsiteUrl(event: {
  event_networks?: Array<{ url?: string | null; network_type?: { name?: string | null } | number | null }>;
}): string | null {
  const networks = event.event_networks ?? [];
  if (!networks.length) return null;

  const withUrl = networks.filter((n) => n.url?.trim());
  if (!withUrl.length) return null;

  const official = withUrl.find((n) => {
    const typeName =
      typeof n.network_type === 'object' && n.network_type?.name
        ? n.network_type.name.toLowerCase()
        : '';
    return /official|website|site|home/i.test(typeName);
  });

  return (official?.url ?? withUrl[0].url)?.trim() ?? null;
}

export function buildIgdbEventUrl(slug?: string | null, igdbId?: number | null): string | null {
  if (slug?.trim()) return `https://www.igdb.com/events/${slug.trim()}`;
  if (igdbId != null) return `https://www.igdb.com/events/${igdbId}`;
  return null;
}
