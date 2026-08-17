export type DealSource = 'epic' | 'gamerpower' | 'cheapshark' | 'steam' | 'orbe';

export type DealKind = 'free' | 'sale';

/** temporary = estão de graça (promo 100%); permanent = são de graça (nunca custaram). */
export type FreeTier = 'temporary' | 'permanent';

export type DealPlatform =
  | 'steam'
  | 'epic'
  | 'gog'
  | 'ubisoft'
  | 'origin'
  | 'itch'
  | 'pc'
  | 'other';

export type UnifiedDeal = {
  id: string;
  source: DealSource;
  kind: DealKind;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  platform: DealPlatform;
  platforms: string[];
  storeUrl: string;
  originalPrice?: string | null;
  salePrice?: string | null;
  originalPriceValue?: number | null;
  salePriceValue?: number | null;
  discountPercent?: number | null;
  currency?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  worth?: string | null;
  instructions?: string | null;
  steamAppId?: number | null;
  dealRating?: number | null;
  status?: string | null;
  freeTier?: FreeTier | null;
  priceConverted?: boolean | null;
  originalSalePriceUsd?: string | null;
  orbeGameId?: number | null;
  orbeUrl?: string | null;
};

export type DealSourceStatus = { ok: boolean; count: number; error?: string };

export type DealsOverview = {
  fetchedAt: string;
  usdBrlRate?: number | null;
  usdBrlRateFetchedAt?: string | null;
  gratis: UnifiedDeal[];
  gratisTemporarios: UnifiedDeal[];
  gratisPermanentes: UnifiedDeal[];
  promocoes: UnifiedDeal[];
  catalogoSteam: UnifiedDeal[];
  sources: {
    epic: DealSourceStatus;
    gamerpower: DealSourceStatus;
    cheapshark: DealSourceStatus;
    steam: DealSourceStatus;
    orbe: DealSourceStatus;
  };
  sourcesHealth?: 'ok' | 'degraded' | 'critical';
};

export type DealsGratisResponse = {
  fetchedAt: string;
  usdBrlRate?: number | null;
  usdBrlRateFetchedAt?: string | null;
  gratisTemporarios: UnifiedDeal[];
  gratisPermanentes: UnifiedDeal[];
  deals: UnifiedDeal[];
  sources: DealsOverview['sources'];
  sourcesHealth?: DealsOverview['sourcesHealth'];
};

export type DealsPromocoesResponse = {
  fetchedAt: string;
  usdBrlRate?: number | null;
  usdBrlRateFetchedAt?: string | null;
  deals: UnifiedDeal[];
  promocoes: UnifiedDeal[];
  catalogoSteam: UnifiedDeal[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  sources: DealsOverview['sources'];
  sourcesHealth?: DealsOverview['sourcesHealth'];
};
