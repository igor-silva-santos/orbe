export type DealSource = 'epic' | 'gamerpower' | 'cheapshark';

export type DealKind = 'free' | 'sale';

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
  discountPercent?: number | null;
  currency?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  worth?: string | null;
  instructions?: string | null;
  steamAppId?: number | null;
  dealRating?: number | null;
  status?: string | null;
};

export type DealsOverview = {
  fetchedAt: string;
  gratis: UnifiedDeal[];
  promocoes: UnifiedDeal[];
  sources: {
    epic: { ok: boolean; count: number; error?: string };
    gamerpower: { ok: boolean; count: number; error?: string };
    cheapshark: { ok: boolean; count: number; error?: string };
  };
};
