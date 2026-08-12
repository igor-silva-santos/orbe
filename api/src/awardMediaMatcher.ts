import { prisma } from './clients';
import { Prisma } from '@prisma/client';

export type AwardMediaType = 'filme' | 'serie' | 'anime' | 'jogo';

const MIN_SIMILARITY = 0.72;

export const cleanScrapedMediaTitle = (raw: string): string => {
  let title = raw.trim();
  title = title.replace(/\[[^\]]*\]/g, '').trim();
  title = title.split(/[–—]/)[0].trim();
  title = title.replace(/\s*\(\d{4}\)\s*$/, '').trim();
  return title;
};

export const normalizeAwardTitle = (title: string): string =>
  title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[''"]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const titleSearchVariants = (title: string): string[] => {
  const cleaned = cleanScrapedMediaTitle(title);
  const normalized = normalizeAwardTitle(cleaned);
  const variants = new Set<string>();

  if (normalized) variants.add(normalized);

  const noSubtitle = normalized.split(':')[0].trim();
  if (noSubtitle) variants.add(noSubtitle);

  const noArticle = normalized.replace(/^(the|a|an|o|os|as|um|uma)\s+/, '');
  if (noArticle) variants.add(noArticle);

  return [...variants].filter(Boolean);
};

const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

export const titleSimilarity = (a: string, b: string): number => {
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.92;

  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;

  return 1 - levenshteinDistance(a, b) / maxLen;
};

const getMediaTitleFields = (media: Record<string, unknown>, mediaType: AwardMediaType): string[] => {
  switch (mediaType) {
    case 'filme':
      return [media.title, media.originalTitle].filter((v): v is string => typeof v === 'string');
    case 'serie':
      return [media.name, media.originalName].filter((v): v is string => typeof v === 'string');
    case 'anime':
      return [media.titleRomaji, media.titleEnglish, media.titleNative].filter((v): v is string => typeof v === 'string');
    case 'jogo':
      return [media.name].filter((v): v is string => typeof v === 'string');
    default:
      return [];
  }
};

const scoreMedia = (media: Record<string, unknown>, variants: string[], mediaType: AwardMediaType): number => {
  const fields = getMediaTitleFields(media, mediaType).map(normalizeAwardTitle);
  let best = 0;

  for (const variant of variants) {
    for (const field of fields) {
      best = Math.max(best, titleSimilarity(variant, field));
    }
  }

  return best;
};

const buildContainsQuery = (variant: string, mediaType: AwardMediaType) => {
  const token = variant.length >= 4 ? variant : variant.split(' ').find((part) => part.length >= 4) ?? variant;
  if (!token) return null;

  switch (mediaType) {
    case 'filme':
      return {
        OR: [
          { title: { contains: token, mode: 'insensitive' as const } },
          { originalTitle: { contains: token, mode: 'insensitive' as const } },
        ],
      };
    case 'serie':
      return {
        OR: [
          { name: { contains: token, mode: 'insensitive' as const } },
          { originalName: { contains: token, mode: 'insensitive' as const } },
        ],
      };
    case 'anime':
      return {
        OR: [
          { titleRomaji: { contains: token, mode: 'insensitive' as const } },
          { titleEnglish: { contains: token, mode: 'insensitive' as const } },
          { titleNative: { contains: token, mode: 'insensitive' as const } },
        ],
      };
    case 'jogo':
      return { name: { contains: token, mode: 'insensitive' as const } };
    default:
      return null;
  }
};


/**
 * take alto de propósito: para tokens curtos/comuns (ex.: "Up", "It", "Coringa") o `contains`
 * pode casar dezenas de títulos, e sem orderBy por relevância o filme certo podia nunca aparecer
 * nos antigos 12 primeiros — a pontuação por similaridade abaixo é quem realmente decide o match,
 * então o candidato certo só precisa estar no lote, não vir primeiro.
 */
const CANDIDATE_TAKE = 100;

const findCandidates = async (mediaType: AwardMediaType, where: object) => {
  switch (mediaType) {
    case 'filme':
      return prisma.filme.findMany({ where: where as Prisma.FilmeWhereInput, take: CANDIDATE_TAKE });
    case 'serie':
      return prisma.serie.findMany({ where: where as Prisma.SerieWhereInput, take: CANDIDATE_TAKE });
    case 'anime':
      return prisma.anime.findMany({ where: where as Prisma.AnimeWhereInput, take: CANDIDATE_TAKE });
    case 'jogo':
      return prisma.jogo.findMany({ where: where as Prisma.JogoWhereInput, take: CANDIDATE_TAKE });
    default:
      return [];
  }
};

export async function findMediaByAwardTitle(
  rawTitle: string,
  mediaType: AwardMediaType
): Promise<{ media: { id: number; premiacoes: unknown } | null; score: number }> {
  const variants = titleSearchVariants(rawTitle);
  if (variants.length === 0) return { media: null, score: 0 };

  const seen = new Map<number, Record<string, unknown>>();

  for (const variant of variants) {
    const where = buildContainsQuery(variant, mediaType);
    if (!where) continue;

    const results = await findCandidates(mediaType, where);
    for (const result of results) {
      seen.set(result.id, result as Record<string, unknown>);
    }
  }

  let bestMedia: { id: number; premiacoes: unknown } | null = null;
  let bestScore = 0;

  for (const media of seen.values()) {
    const score = scoreMedia(media, variants, mediaType);
    if (score > bestScore) {
      bestScore = score;
      bestMedia = { id: media.id as number, premiacoes: media.premiacoes };
    }
  }

  if (bestMedia && bestScore >= MIN_SIMILARITY) {
    return { media: bestMedia, score: bestScore };
  }

  return { media: null, score: bestScore };
}
