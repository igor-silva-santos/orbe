import { prisma } from './clients';
import { jogoQualityFilter } from './qualityFilters';
import {
  fetchSteamDemosAndEarlyAccess,
  steamCapsuleImage,
  type SteamSearchHit,
} from './steamStoreSearch';
import { formatBrlFromCents } from './deals/dealPricing';
import { fetchSteamAppDetails } from './steamClient';
import { logger } from './logger';

export type GameRecommendationDto = {
  id: string;
  kind: 'demo' | 'early_access';
  title: string;
  steamAppId: number;
  imageUrl: string;
  storeUrl: string;
  multiplayer: boolean;
  priceLabel: string | null;
  orbeGameId: number | null;
  orbeUrl: string | null;
  /** Posição na lista Steam (0 = mais recente no recorte) */
  rank: number;
};

export type GameRecommendationsPayload = {
  fetchedAt: string;
  dateKey: string;
  source: 'steam' | 'steam+orbe';
  demos: GameRecommendationDto[];
  earlyAccess: GameRecommendationDto[];
  highlights: GameRecommendationDto[];
};

function todayKeyBrazil(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
}

async function enrichHits(
  hits: SteamSearchHit[],
  kind: 'demo' | 'early_access',
): Promise<GameRecommendationDto[]> {
  if (hits.length === 0) return [];

  const appIds = hits.map((h) => h.appId);
  const catalog = await prisma.jogo.findMany({
    where: {
      AND: [jogoQualityFilter, { steamAppId: { in: appIds } }],
    },
    select: {
      igdbId: true,
      steamAppId: true,
      name: true,
      cover: true,
      steamPriceCents: true,
    },
  });
  const bySteam = new Map(catalog.map((j) => [j.steamAppId!, j]));

  const results: GameRecommendationDto[] = [];

  for (let rank = 0; rank < hits.length; rank++) {
    const hit = hits[rank];
    const db = bySteam.get(hit.appId);
    let priceLabel: string | null = null;

    if (db?.steamPriceCents != null) {
      priceLabel = db.steamPriceCents === 0 ? 'Grátis' : formatBrlFromCents(db.steamPriceCents);
    } else if (rank < 12) {
      const details = await fetchSteamAppDetails(hit.appId);
      if (details?.priceCents != null) {
        priceLabel = details.priceCents === 0 ? 'Grátis' : formatBrlFromCents(details.priceCents);
      } else if (details?.isFree) {
        priceLabel = 'Grátis';
      }
    }

    const imageUrl =
      db?.cover ??
      hit.imageUrl ??
      steamCapsuleImage(hit.appId);

    results.push({
      id: db ? `orbe:${db.igdbId}` : `steam:${hit.appId}`,
      kind,
      title: db?.name ?? hit.name,
      steamAppId: hit.appId,
      imageUrl,
      storeUrl: `https://store.steampowered.com/app/${hit.appId}`,
      multiplayer: hit.tagIds.some((t) => [3859, 3843, 1774, 1685].includes(t)),
      priceLabel: kind === 'demo' ? priceLabel ?? 'Demo grátis' : priceLabel,
      orbeGameId: db?.igdbId ?? null,
      orbeUrl: db ? `/jogos/${db.igdbId}` : null,
      rank,
    });
  }

  return results;
}

/** Lista diária: demos e acesso antecipado com foco em multijogador (Steam, ordenado por lançamento). */
export async function buildGameRecommendations(): Promise<GameRecommendationsPayload> {
  const fetchedAt = new Date().toISOString();
  const dateKey = todayKeyBrazil();

  const { demos, earlyAccess } = await fetchSteamDemosAndEarlyAccess({
    maxPerKind: 36,
    multiplayerOnly: true,
  });

  const [demoDtos, eaDtos] = await Promise.all([
    enrichHits(demos, 'demo'),
    enrichHits(earlyAccess, 'early_access'),
  ]);

  const highlights = [...demoDtos, ...eaDtos]
    .filter((item) => item.multiplayer)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 48);

  if (highlights.length === 0) {
    logger.warn('Recomendacoes: nenhum highlight multiplayer; usando lista completa.');
  }

  const fallbackHighlights =
    highlights.length > 0 ? highlights : [...demoDtos, ...eaDtos].slice(0, 48);

  return {
    fetchedAt,
    dateKey,
    source: demoDtos.some((d) => d.orbeGameId) || eaDtos.some((d) => d.orbeGameId) ? 'steam+orbe' : 'steam',
    demos: demoDtos,
    earlyAccess: eaDtos,
    highlights: fallbackHighlights,
  };
}

/** Jogos do catálogo Orbe com modos multijogador (fallback se Steam falhar). */
export async function buildCatalogMultiplayerFallback(): Promise<GameRecommendationDto[]> {
  const jogos = await prisma.jogo.findMany({
    where: {
      AND: [
        jogoQualityFilter,
        { steamAppId: { not: null } },
        {
          gameModes: {
            some: {
              gameMode: {
                OR: [
                  { name: { contains: 'Multi', mode: 'insensitive' } },
                  { name: { contains: 'Cooperativ', mode: 'insensitive' } },
                  { name: { contains: 'MMO', mode: 'insensitive' } },
                ],
              },
            },
          },
        },
      ],
    },
    orderBy: [{ updatedAt: 'desc' }, { hypes: 'desc' }],
    take: 24,
    select: {
      igdbId: true,
      name: true,
      cover: true,
      steamAppId: true,
      steamPriceCents: true,
      url: true,
      status: true,
    },
  });

  return jogos.map((j, rank) => ({
    id: `orbe:${j.igdbId}`,
    kind: j.status?.toLowerCase().includes('early') ? ('early_access' as const) : ('demo' as const),
    title: j.name,
    steamAppId: j.steamAppId!,
    imageUrl: j.cover ?? steamCapsuleImage(j.steamAppId!),
    storeUrl: `https://store.steampowered.com/app/${j.steamAppId}`,
    multiplayer: true,
    priceLabel:
      j.steamPriceCents != null
        ? j.steamPriceCents === 0
          ? 'Grátis'
          : formatBrlFromCents(j.steamPriceCents)
        : null,
    orbeGameId: j.igdbId,
    orbeUrl: `/jogos/${j.igdbId}`,
    rank,
  }));
}
