/** Extrai valor numérico de strings como "$24.99", "R$ 19,90" ou "Grátis". */
export function parsePriceNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === 'n/a' || normalized === 'free' || normalized === 'grátis' || normalized === 'gratis') {
    return 0;
  }

  const isExplicitBrl = normalized.includes('r$') || normalized.includes('brl');
  const isExplicitUsd =
    normalized.includes('usd') || normalized.includes('us$') || /^\$/.test(normalized.trim());

  let numericPart = normalized.replace(/[^\d.,]/g, '');
  if (!numericPart) return null;

  const commaCount = (numericPart.match(/,/g) ?? []).length;
  const dotCount = (numericPart.match(/\./g) ?? []).length;

  let canonical: string;

  if (isExplicitBrl || (commaCount >= 1 && dotCount >= 1)) {
    // BR: 1.234,56
    canonical = numericPart.replace(/\./g, '').replace(',', '.');
  } else if (commaCount === 1 && dotCount === 0) {
    // BR sem milhar: 34,50
    canonical = numericPart.replace(',', '.');
  } else if (isExplicitUsd || (dotCount === 1 && commaCount === 0)) {
    // US: $34.50
    canonical = numericPart;
  } else if (dotCount > 1) {
    // Milhar BR sem vírgula (raro): 1.234.567
    canonical = numericPart.replace(/\./g, '');
  } else {
    canonical = numericPart.replace(',', '.');
  }

  const match = canonical.match(/(\d+(?:\.\d+)?)/);
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
