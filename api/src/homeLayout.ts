/** Ordem dos carrosséis da home. A mesma lista está em frontend/src/lib/home-layout.ts. */
export const HOME_CAROUSEL_IDS = ['filmes', 'series', 'animes', 'jogos'] as const;

export type HomeCarouselId = (typeof HOME_CAROUSEL_IDS)[number];

export const DEFAULT_HOME_LAYOUT: HomeCarouselId[] = [...HOME_CAROUSEL_IDS];

const HOME_CAROUSEL_SET = new Set<string>(HOME_CAROUSEL_IDS);

/** `null` quando o valor não é uma lista válida. Lista vazia é válida (tudo oculto). */
export function parseHomeLayout(value: unknown): HomeCarouselId[] | null {
  if (!Array.isArray(value) || value.length > HOME_CAROUSEL_IDS.length) return null;

  const seen = new Set<string>();
  const layout: HomeCarouselId[] = [];
  for (const item of value) {
    if (typeof item !== 'string' || !HOME_CAROUSEL_SET.has(item) || seen.has(item)) return null;
    seen.add(item);
    layout.push(item as HomeCarouselId);
  }
  return layout;
}

export function readHomeLayout(preferencias: unknown): HomeCarouselId[] {
  if (!preferencias || typeof preferencias !== 'object' || Array.isArray(preferencias)) {
    return [...DEFAULT_HOME_LAYOUT];
  }
  const raw = (preferencias as Record<string, unknown>).homeLayout;
  if (raw === undefined) return [...DEFAULT_HOME_LAYOUT];
  return parseHomeLayout(raw) ?? [...DEFAULT_HOME_LAYOUT];
}

/** Guarda a ordem em `preferencias.homeLayout` sem apagar as outras chaves. */
export function mergeHomeLayout(current: unknown, layout: HomeCarouselId[]): Record<string, unknown> {
  const base: Record<string, unknown> = {};
  if (current && typeof current === 'object' && !Array.isArray(current)) {
    for (const [key, value] of Object.entries(current as Record<string, unknown>)) {
      if (key !== 'homeLayout') base[key] = value;
    }
  }
  base.homeLayout = layout;
  return base;
}
