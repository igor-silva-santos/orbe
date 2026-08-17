export type DealSource = 'epic' | 'gamerpower' | 'cheapshark' | 'steam';

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
};

export type DealsOverview = {
  fetchedAt: string;
  /** @deprecated Use gratisTemporarios + gratisPermanentes */
  gratis: UnifiedDeal[];
  /** Jogos que estão de graça — promoção 100% por tempo limitado */
  gratisTemporarios: UnifiedDeal[];
  /** Jogos que são de graça — F2P / preço base zero */
  gratisPermanentes: UnifiedDeal[];
  promocoes: UnifiedDeal[];
  sources: {
    epic: { ok: boolean; count: number; error?: string };
    gamerpower: { ok: boolean; count: number; error?: string };
    cheapshark: { ok: boolean; count: number; error?: string };
    steam: { ok: boolean; count: number; error?: string };
  };
};
