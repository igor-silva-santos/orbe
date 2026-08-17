import axios from 'axios';
import { logger } from '../logger';
import { getUsdBrlRate } from './dealPricing';

/** Alinha cache da cotação ao soft TTL das promoções (~10 min). */
const CACHE_TTL_MS = 10 * 60 * 1000;

let cachedRate: { value: number; expiresAt: number; fetchedAt: string } | null = null;

export type ExchangeRateResult = {
  rate: number;
  fetchedAt: string;
  fromLiveApi: boolean;
};

/** Busca cotação USD→BRL ao vivo (Frankfurter) com fallback para env. */
export async function resolveUsdBrlRate(options?: { forceRefresh?: boolean }): Promise<ExchangeRateResult> {
  const now = Date.now();
  if (!options?.forceRefresh && cachedRate && now < cachedRate.expiresAt) {
    return { rate: cachedRate.value, fetchedAt: cachedRate.fetchedAt, fromLiveApi: true };
  }

  const fetchedAt = new Date().toISOString();

  try {
    const response = await axios.get<{ rates?: { BRL?: number } }>(
      'https://api.frankfurter.app/latest?from=USD&to=BRL',
      { timeout: 8000 },
    );
    const rate = response.data?.rates?.BRL;
    if (rate != null && Number.isFinite(rate) && rate > 0) {
      cachedRate = { value: rate, expiresAt: now + CACHE_TTL_MS, fetchedAt };
      return { rate, fetchedAt, fromLiveApi: true };
    }
  } catch (error: any) {
    logger.warn(`[deals] Cotação USD/BRL indisponível: ${error.message}`);
  }

  const fallback = getUsdBrlRate();
  cachedRate = { value: fallback, expiresAt: now + CACHE_TTL_MS, fetchedAt };
  return { rate: fallback, fetchedAt, fromLiveApi: false };
}

export function clearExchangeRateCache(): void {
  cachedRate = null;
}
