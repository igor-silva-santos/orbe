export const BRAZIL_TIMEZONE = 'America/Sao_Paulo';

const WEEKDAY_SHORT_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getWeekdayInBrazil(date: Date): number {
  const short = new Intl.DateTimeFormat('en-US', {
    timeZone: BRAZIL_TIMEZONE,
    weekday: 'short',
  }).format(date);
  return WEEKDAY_SHORT_TO_INDEX[short] ?? date.getUTCDay();
}

export function getBrazilDateParts(date: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BRAZIL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: get('year'), month: get('month'), day: get('day') };
}

function addCalendarDays(year: number, month: number, day: number, delta: number) {
  const next = new Date(Date.UTC(year, month - 1, day + delta));
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

export function brazilLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
  ms = 0,
): Date {
  let ts = Date.UTC(year, month - 1, day, hour + 3, minute, second, ms);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: BRAZIL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const parts = formatter.formatToParts(new Date(ts));
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((part) => part.type === type)?.value ?? 0);
    const actualYear = get('year');
    const actualMonth = get('month');
    const actualDay = get('day');
    const actualHour = get('hour');
    const actualMinute = get('minute');
    const actualSecond = get('second');

    const dayDiffMs = Date.UTC(actualYear, actualMonth - 1, actualDay) - Date.UTC(year, month - 1, day);
    const timeDiffMs =
      (actualHour - hour) * 3_600_000 +
      (actualMinute - minute) * 60_000 +
      (actualSecond - second) * 1_000;
    const totalDiff = dayDiffMs + timeDiffMs;
    if (Math.abs(totalDiff) < 500) {
      return new Date(ts);
    }
    ts -= totalDiff;
  }

  return new Date(ts);
}

export function getBrazilCalendarWeekBounds(reference = new Date()) {
  const { year, month, day } = getBrazilDateParts(reference);
  const dayOfWeek = getWeekdayInBrazil(reference);
  const startParts = addCalendarDays(year, month, day, -dayOfWeek);
  const endParts = addCalendarDays(startParts.year, startParts.month, startParts.day, 6);

  return {
    start: brazilLocalToUtc(startParts.year, startParts.month, startParts.day, 0, 0, 0, 0),
    end: brazilLocalToUtc(endParts.year, endParts.month, endParts.day, 23, 59, 59, 999),
  };
}
