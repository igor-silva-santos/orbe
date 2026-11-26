/** Ordem dos carrosséis da home. A mesma lista está em api/src/homeLayout.ts. */
export const HOME_CAROUSEL_IDS = ['filmes', 'series', 'animes', 'jogos'] as const;

export type HomeCarouselId = (typeof HOME_CAROUSEL_IDS)[number];

export const DEFAULT_HOME_LAYOUT: HomeCarouselId[] = [...HOME_CAROUSEL_IDS];

export const HOME_CAROUSEL_LABELS: Record<HomeCarouselId, string> = {
  filmes: 'Filmes',
  series: 'Séries',
  animes: 'Animes',
  jogos: 'Jogos',
};

export const HOME_CAROUSEL_HREFS: Record<HomeCarouselId, string> = {
  filmes: '/filmes',
  series: '/series',
  animes: '/animes',
  jogos: '/jogos',
};

const HOME_CAROUSEL_SET = new Set<string>(HOME_CAROUSEL_IDS);

export function normalizeHomeLayout(value: unknown): HomeCarouselId[] {
  if (!Array.isArray(value) || value.length > HOME_CAROUSEL_IDS.length) {
    return [...DEFAULT_HOME_LAYOUT];
  }
  const seen = new Set<string>();
  const layout: HomeCarouselId[] = [];
  for (const item of value) {
    if (typeof item !== 'string' || !HOME_CAROUSEL_SET.has(item) || seen.has(item)) {
      return [...DEFAULT_HOME_LAYOUT];
    }
    seen.add(item);
    layout.push(item as HomeCarouselId);
  }
  return layout;
}

export function moveHomeCarousel(
  layout: HomeCarouselId[],
  id: HomeCarouselId,
  direction: -1 | 1,
): HomeCarouselId[] {
  const index = layout.indexOf(id);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= layout.length) return layout;
  const copy = layout.slice();
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

export function hideHomeCarousel(layout: HomeCarouselId[], id: HomeCarouselId): HomeCarouselId[] {
  return layout.filter((item) => item !== id);
}

export function showHomeCarousel(layout: HomeCarouselId[], id: HomeCarouselId): HomeCarouselId[] {
  if (!HOME_CAROUSEL_SET.has(id) || layout.includes(id)) return layout;
  return [...layout, id];
}
