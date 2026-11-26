export type GameRecommendationKind = 'demo' | 'early_access';

export type GameRecommendation = {
  id: string;
  kind: GameRecommendationKind;
  title: string;
  steamAppId: number;
  imageUrl: string;
  storeUrl: string;
  multiplayer: boolean;
  priceLabel: string | null;
  orbeGameId: number | null;
  orbeUrl: string | null;
  rank: number;
};

export type GameRecommendationsResponse = {
  fetchedAt: string;
  dateKey: string;
  source: 'steam' | 'steam+orbe';
  demos: GameRecommendation[];
  earlyAccess: GameRecommendation[];
  highlights: GameRecommendation[];
};
