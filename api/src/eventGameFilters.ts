/** Dias antes do evento em que um lançamento ainda pode contar como anúncio (data exata no palco). */
export const EVENT_ANNOUNCEMENT_GRACE_DAYS_BEFORE = 7;

/** Meses após o evento em que um anúncio de lançamento ainda pertence a essa edição. */
export const EVENT_ANNOUNCEMENT_MAX_MONTHS_AFTER = 24;

type EventLike = {
  start_time?: Date | string | null;
  end_time?: Date | string | null;
};

type GameLike = {
  firstReleaseDate?: Date | string | null;
};

/**
 * Um jogo pertence à lista de um evento quando o lançamento é coerente com o showcase:
 * - não estava no mercado antes do evento;
 * - não é um vínculo herdado da IGDB de anos atrás com lançamento distante.
 *
 * O carrossel de lançamentos usa `firstReleaseDate` diretamente — não este filtro.
 */
export function isGameAnnouncementForEvent(game: GameLike, event: EventLike): boolean {
  if (!event.start_time) return true;

  const eventStart = new Date(event.start_time);
  const graceBeforeMs = EVENT_ANNOUNCEMENT_GRACE_DAYS_BEFORE * 24 * 60 * 60 * 1000;
  const earliestValidRelease = new Date(eventStart.getTime() - graceBeforeMs);

  if (!game.firstReleaseDate) {
    const eventEnd = event.end_time ? new Date(event.end_time) : eventStart;
    const maxAfter = new Date(eventStart);
    maxAfter.setMonth(maxAfter.getMonth() + EVENT_ANNOUNCEMENT_MAX_MONTHS_AFTER);
    const now = new Date();
    return now <= maxAfter && now >= new Date(eventEnd.getTime() - graceBeforeMs);
  }

  const release = new Date(game.firstReleaseDate);

  if (release < earliestValidRelease) return false;

  const maxAfter = new Date(eventStart);
  maxAfter.setMonth(maxAfter.getMonth() + EVENT_ANNOUNCEMENT_MAX_MONTHS_AFTER);
  if (release > maxAfter) return false;

  return true;
}

export function filterGamesForEvent<T extends GameLike>(games: T[], event: EventLike): T[] {
  return games.filter((game) => isGameAnnouncementForEvent(game, event));
}
