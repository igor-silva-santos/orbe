import { tmdbApi } from './clients';
import { logger } from './logger';

type TmdbMediaType = 'movie' | 'tv';

/** Busca overview em português via endpoint de traduções do TMDB */
export async function fetchTmdbPtOverview(
  mediaType: TmdbMediaType,
  id: number
): Promise<string | null> {
  try {
    const path = mediaType === 'movie' ? `/movie/${id}/translations` : `/tv/${id}/translations`;
    const { data } = await tmdbApi.get(path);
    const translations = data?.translations as Array<{
      iso_639_1?: string;
      data?: { overview?: string };
    }> | undefined;

    if (!translations?.length) return null;

    const pt =
      translations.find((t) => t.iso_639_1 === 'pt') ??
      translations.find((t) => t.iso_639_1 === 'pt-BR');

    const overview = pt?.data?.overview?.trim();
    return overview || null;
  } catch (error) {
    logger.warn(`Falha ao buscar tradução TMDB (${mediaType} ${id}):`, error);
    return null;
  }
}
