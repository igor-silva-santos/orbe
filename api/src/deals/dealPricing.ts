/** Extrai valor numérico de strings como "$24.99", "R$ 19,90" ou "Grátis". */
export function parsePriceNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === 'n/a' || normalized === 'free' || normalized === 'grátis' || normalized === 'gratis') {
    return 0;
  }
  const match = normalized.replace(/\./g, '').replace(',', '.').match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatBrlFromCents(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
}

/** Taxa USD→BRL fallback (configurável via env). */
export function getUsdBrlRate(): number {
  const raw = Number(process.env.DEALS_USD_BRL_RATE ?? 5.5);
  return Number.isFinite(raw) && raw > 0 ? raw : 5.5;
}
