/** Dia de calendário em America/Sao_Paulo (YYYY-MM-DD). */
export function getCalendarDateKeyInBr(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(date);
}

export function calendarDateKeyFromValue(value: Date | string | null | undefined): string | null {
  if (value == null) return null;
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** true se a data de calendário do episódio é hoje (BR) ou no futuro */
export function isCalendarDateTodayOrFutureBr(
  value: Date | string | null | undefined,
  now: Date = new Date(),
): boolean {
  const episodeKey = calendarDateKeyFromValue(value);
  if (!episodeKey) return false;
  const todayKey = getCalendarDateKeyInBr(now);
  return episodeKey >= todayKey;
}
