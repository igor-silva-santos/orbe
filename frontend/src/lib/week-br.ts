const BR_TZ = 'America/Sao_Paulo';

export function ymdInBr(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: BR_TZ }).format(date);
}

function parseYmd(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatYmdLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Semana domingo–sábado no fuso de Brasília */
export function getWeekBoundsBr(reference: Date = new Date()): {
  startYmd: string;
  endYmd: string;
  startDay: number;
  endDay: number;
} {
  const today = parseYmd(ymdInBr(reference));
  const dow = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dow);
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  return {
    startYmd: formatYmdLocal(sunday),
    endYmd: formatYmdLocal(saturday),
    startDay: sunday.getDate(),
    endDay: saturday.getDate(),
  };
}

export function airingYmdFromIso(airingAt: string): string {
  const match = airingAt.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  return ymdInBr(new Date(airingAt));
}

export function isYmdInRange(ymd: string, startYmd: string, endYmd: string): boolean {
  return ymd >= startYmd && ymd <= endYmd;
}

export function formatWeeklyCarouselTitle(dayName: string, reference: Date = new Date()): string {
  const { startDay, endDay } = getWeekBoundsBr(reference);
  return `Semana ${startDay} a ${endDay}: ${dayName}`;
}
