/** Extrai valor numérico de strings como "$24.99", "R$ 19,90" ou "Grátis". */
export function parsePriceNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === 'n/a' || normalized === 'free' || normalized === 'grátis' || normalized === 'gratis') {
    return 0;
  }

  const cleaned = normalized.replace(/[r$€£\s]/gi, '');

  let numeric: string;
  if (/\d,\d{1,2}$/.test(cleaned)) {
    // BRL: vírgula decimal — remove pontos de milhar (1.234,56 → 1234.56)
    numeric = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (/\d\.\d{1,2}$/.test(cleaned)) {
    // USD/EUR: ponto decimal — remove vírgulas de milhar ($1,234.56 → 1234.56)
    numeric = cleaned.replace(/,/g, '');
  } else {
    const match = cleaned.match(/(\d+(?:[.,]\d+)?)/);
    if (!match) return null;
    numeric = match[1].includes(',') && !match[1].includes('.')
      ? match[1].replace(',', '.')
      : match[1].replace(/,/g, '');
  }

  const parsed = Number.parseFloat(numeric);
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
