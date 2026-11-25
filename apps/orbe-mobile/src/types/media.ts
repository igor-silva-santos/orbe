export type MediaType = 'filme' | 'serie' | 'anime' | 'jogo';

export type CarouselCard = {
  type?: MediaType;
  id: number;
  titulo_api?: string;
  titulo_curado?: string | null;
  poster_url_api?: string | null;
  data_lancamento_api?: string | null;
};

export type HomepageResponse = {
  filmes: CarouselCard[];
  series: CarouselCard[];
  animes: CarouselCard[];
  jogos: CarouselCard[];
};

export type FilmesListResponse = {
  results: CarouselCard[];
  total: number;
  page: number;
  limit: number;
};

export type SearchResponse = {
  filmes: CarouselCard[];
  series: CarouselCard[];
  animes: CarouselCard[];
  jogos: CarouselCard[];
};

export type AuthUser = {
  id: number;
  email: string;
  role?: string;
};

export function cardTitle(item: CarouselCard): string {
  return item.titulo_curado || item.titulo_api || '—';
}