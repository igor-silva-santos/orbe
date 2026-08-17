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
  /** Valor numérico para ordenação (unidade da moeda indicada em currency). */
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
  /** Preço convertido de USD para BRL (aproximado). */
  priceConverted?: boolean | null;
  originalSalePriceUsd?: string | null;
  /** ID IGDB quando o jogo existe no catálogo Orbe. */
  orbeGameId?: number | null;
  /** Caminho interno para a página do jogo no site. */
  orbeUrl?: string | null;
};

export type DealSourceStatus = { ok: boolean; count: number; error?: string };

export type DealsOverview = {
  fetchedAt: string;
  /** Taxa USD→BRL usada na conversão de preços internacionais. */
  usdBrlRate?: number | null;
  usdBrlRateFetchedAt?: string | null;
  /** @deprecated Use gratisTemporarios + gratisPermanentes */
  gratis: UnifiedDeal[];
  /** Jogos que estão de graça — promoção 100% por tempo limitado */
  gratisTemporarios: UnifiedDeal[];
  /** Jogos que são de graça — F2P / preço base zero */
  gratisPermanentes: UnifiedDeal[];
  promocoes: UnifiedDeal[];
  /** Promoções Steam do catálogo Orbe (capas IGDB, link interno). */
  catalogoSteam: UnifiedDeal[];
  sources: {
    epic: DealSourceStatus;
    gamerpower: DealSourceStatus;
    cheapshark: DealSourceStatus;
    steam: DealSourceStatus;
    orbe: DealSourceStatus;
  };
};
