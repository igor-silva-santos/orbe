import { tmdbApi } from './clients';
import { logger } from './logger';
import {
  findBrTranslation,
  getBrOverviewFromTranslations,
  type TmdbTranslationEntry,
} from './tmdbBrLocalization';

type TmdbMediaType = 'movie' | 'tv';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getRetryableErrorCode(error: unknown): string | number {
  const err = error as { response?: { status?: number }; code?: string };
  return err?.response?.status ?? err?.code ?? 'unknown';
}

function isRetryableTmdbError(error: unknown): boolean {
  const err = error as { response?: { status?: number }; code?: string };
  const status = err?.response?.status;
  const code = err?.code;
  return (
    status === 429 ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'ENOTFOUND' ||
    code === 'ECONNABORTED'
  );
}

function pickPtOverview(translations: TmdbTranslationEntry[] | undefined): string | null {
  if (!translations?.length) return null;

  const brOverview = getBrOverviewFromTranslations(translations);
  if (brOverview) return brOverview;

  const ptBr = translations.find((t) => t.iso_639_1 === 'pt-BR');
  const ptBrOverview = ptBr?.data?.overview?.trim();
  if (ptBrOverview) return ptBrOverview;

  const pt = translations.find((t) => t.iso_639_1 === 'pt' && t.iso_3166_1 !== 'PT');
  const ptOverview = pt?.data?.overview?.trim();
  if (ptOverview) return ptOverview;

  const ptPt = translations.find((t) => t.iso_3166_1 === 'PT' && t.iso_639_1 === 'pt');
  return ptPt?.data?.overview?.trim() || null;
}

/** Busca overview em português via endpoint de traduções do TMDB (prioriza entrada BR). */
export async function fetchTmdbPtOverview(
  mediaType: TmdbMediaType,
  id: number,
  maxRetries = 4,
): Promise<string | null> {
  const path = mediaType === 'movie' ? `/movie/${id}/translations` : `/tv/${id}/translations`;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const { data } = await tmdbApi.get(path);
      const translations = data?.translations as TmdbTranslationEntry[] | undefined;
      return pickPtOverview(translations);
    } catch (error) {
      const code = getRetryableErrorCode(error);
      if (!isRetryableTmdbError(error) || attempt >= maxRetries) {
        logger.warn(`Falha ao buscar tradução TMDB (${mediaType} ${id}): ${code}`);
        return null;
      }

      const delayMs = 1000 * Math.pow(2, attempt);
      logger.warn(
        `TMDB translations ${mediaType}/${id} (${code}), retry ${attempt + 1}/${maxRetries} em ${delayMs}ms`,
      );
      await delay(delayMs);
    }
  }

  return null;
}

export { findBrTranslation, type TmdbTranslationEntry };
