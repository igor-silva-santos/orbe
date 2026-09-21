import stringSimilarity from 'string-similarity';
import { prisma } from './clients';

const MATCH_THRESHOLD = 0.58;

export function normalizeAnimeTitle(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[«»"'’`.:,\-–—!?]/g, ' ')
    .replace(/\b(season|temporada)\s*\d+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleVariants(title: string): string[] {
  const norm = normalizeAnimeTitle(title);
  const variants = new Set<string>([norm]);
  const withoutParen = norm.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  if (withoutParen) variants.add(withoutParen);
  return [...variants];
}

export type AnimeMatchResult = {
  anilistId: number;
  malId: number | null;
  episodes: number | null;
  titleRomaji: string;
  score: number;
};

export async function resolveAnimeByTitleSmart(title: string): Promise<AnimeMatchResult | null> {
  const variants = titleVariants(title);
  const probe = variants[0]?.split(' ').find((t) => t.length >= 3);
  if (!probe) return null;

  const candidates = await prisma.anime.findMany({
    where: {
      OR: [
        { titleRomaji: { contains: probe, mode: 'insensitive' } },
        { titleEnglish: { contains: probe, mode: 'insensitive' } },
        { titleNative: { contains: probe, mode: 'insensitive' } },
      ],
    },
    take: 120,
    orderBy: { popularity: 'desc' },
    select: {
      anilistId: true,
      malId: true,
      episodes: true,
      titleRomaji: true,
      titleEnglish: true,
      titleNative: true,
    },
  });

  let best: AnimeMatchResult | null = null;

  for (const row of candidates) {
    const names = [row.titleRomaji, row.titleEnglish, row.titleNative].filter(Boolean) as string[];
    for (const candidateName of names) {
      const candidateNorm = normalizeAnimeTitle(candidateName);
      for (const query of variants) {
        const score = stringSimilarity.compareTwoStrings(query, candidateNorm);
        if (!best || score > best.score) {
          best = {
            anilistId: row.anilistId,
            malId: row.malId,
            episodes: row.episodes,
            titleRomaji: row.titleRomaji,
            score,
          };
        }
      }
    }
  }

  if (!best || best.score < MATCH_THRESHOLD) return null;
  return best;
}
