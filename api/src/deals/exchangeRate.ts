import axios from 'axios';
import { logger } from '../logger';
import { getUsdBrlRate } from './dealPricing';

const CACHE_TTL_MS = 60 * 60 * 1000;

let cachedRate: { value: number; expiresAt: number } | null = null;

/** Busca cotação USD→BRL ao vivo (Frankfurter) com fallback para env. */
export async function resolveUsdBrlRate(): Promise<number> {
  if (cachedRate && Date.now() < cachedRate.expiresAt) {
    return cachedRate.value;
  }

  try {
    const response = await axios.get<{ rates?: { BRL?: number } }>(
      'https://api.frankfurter.app/latest?from=USD&to=BRL',
      { timeout: 8000 },
    );
    const rate = response.data?.rates?.BRL;
    if (rate != null && Number.isFinite(rate) && rate > 0) {
      cachedRate = { value: rate, expiresAt: Date.now() + CACHE_TTL_MS };
      return rate;
    }
  } catch (error: any) {
    logger.warn(`[deals] Cotação USD/BRL indisponível: ${error.message}`);
  }

  const fallback = getUsdBrlRate();
  cachedRate = { value: fallback, expiresAt: Date.now() + CACHE_TTL_MS };
  return fallback;
}

export function clearExchangeRateCache(): void {
  cachedRate = null;
}
