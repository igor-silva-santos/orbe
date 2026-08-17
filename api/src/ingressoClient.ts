import axios from 'axios';
import stringSimilarity from 'string-similarity';
import { logger } from './logger';

const INGRESSO_API_BASE = 'https://api-content.ingresso.com/v0';
const INGRESSO_FILM_BASE = 'https://www.ingresso.com/filme';
const DEFAULT_CITY_IDS = [1, 2]; // São Paulo, Rio de Janeiro
const SEARCH_TIMEOUT_MS = 12_000;
const SIMILARITY_THRESHOLD = 0.82;
const ORIGINAL_TITLE_SIMILARITY_THRESHOLD = 0.78;
const SEARCH_STOPWORDS = new Set([
  'the',
  'uma',
  'um',
  'uns',
  'umas',
  'dos',
  'das',
  'nos',
  'nas',
  'para',
  'com',
  'sem',
  'por',
  'and',
  'de',
  'do',
  'da',
  'no',
  'na',
  'em',
  'ao',
  'aos',
  'as',
  'os',
  'e',
  'o',
  'a',
]);

export interface IngressoEvent {
  id: string;
  title: string;
  originalTitle?: string;
  type?: string;
  urlKey: string;
  inPreSale: boolean;
  isPlaying: boolean;
  countIsPlaying: number;
  isComingSoon?: boolean;
  nationalSiteURL?: string;
  siteURL?: string;
}

export interface IngressoMatch {
  urlKey: string;
  title: string;
  link: string;
  inPreSale: boolean;
  isPlaying: boolean;
  hasCinemaSessions: boolean;
  source: 'catalog' | 'search' | 'url_key';
  score?: number;
}

export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function normalizeTitle(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildIngressoLink(urlKey: string): string {
  return `${INGRESSO_FILM_BASE}/${urlKey}`;
}

/** Extrai o slug do filme a partir de uma URL do ingresso.com. */
export function extractIngressoUrlKey(link: string | null | undefined): string | null {
  if (!link) return null;
  const match = link.match(/\/filme\/([^/?#]+)/i);
  return match?.[1]?.toLowerCase() ?? null;
}

function buildSlugCandidates(filme: {
  title: string;
  originalTitle?: string | null;
  releaseDate?: Date | null;
}): string[] {
  const slugs = new Set<string>();
  const titles = [filme.title, filme.originalTitle].filter((title): title is string => Boolean(title?.trim()));

  for (const title of titles) {
    const base = slugify(title);
    if (base) slugs.add(base);

    if (filme.releaseDate) {
      const year = new Date(filme.releaseDate).getFullYear();
      if (base && year > 1900) slugs.add(`${base}-${year}`);
    }
  }

  return Array.from(slugs);
}

function eventToMatch(event: IngressoEvent, source: IngressoMatch['source'], score?: number): IngressoMatch {
  const hasCinemaSessions = Boolean(event.isPlaying && event.countIsPlaying > 0);
  return {
    urlKey: event.urlKey,
    title: event.title,
    link: buildIngressoLink(event.urlKey),
    inPreSale: Boolean(event.inPreSale),
    isPlaying: Boolean(event.isPlaying),
    hasCinemaSessions,
    source,
    score,
  };
}

function isFilmEvent(event: IngressoEvent): boolean {
  const type = (event.type ?? '').toLowerCase();
  return !type || type === 'filme';
}

function collectNormalizedTitles(filme: { title: string; originalTitle?: string | null }): string[] {
  const titles = new Set<string>();
  for (const raw of [filme.title, filme.originalTitle]) {
    const normalized = normalizeTitle(raw ?? '');
    if (normalized) titles.add(normalized);
  }
  return Array.from(titles);
}

function collectEventTitles(event: IngressoEvent): string[] {
  const titles = new Set<string>();
  for (const raw of [event.title, event.originalTitle]) {
    const normalized = normalizeTitle(raw ?? '');
    if (normalized) titles.add(normalized);
  }
  return Array.from(titles);
}

function titlesMatchExactly(filmeTitles: string[], eventTitles: string[]): boolean {
  for (const filmeTitle of filmeTitles) {
    for (const eventTitle of eventTitles) {
      if (filmeTitle === eventTitle) return true;
    }
  }
  return false;
}

function scoreTitlePair(left: string, right: string): number {
  if (!left || !right) return 0;
  if (left === right) return 1;
  return stringSimilarity.compareTwoStrings(left, right);
}

function buildSearchTerms(filme: {
  title: string;
  originalTitle?: string | null;
  releaseDate?: Date | null;
}): string[] {
  const terms = new Set<string>();

  for (const title of [filme.title, filme.originalTitle].filter((value): value is string => Boolean(value?.trim()))) {
    terms.add(title);
    const slug = slugify(title);
    if (slug) {
      terms.add(slug);
      terms.add(slug.replace(/-/g, ' '));
    }
  }

  for (const title of [filme.title, filme.originalTitle].filter((value): value is string => Boolean(value?.trim()))) {
    for (const word of normalizeTitle(title).split(' ')) {
      if (word.length >= 4 && !SEARCH_STOPWORDS.has(word)) {
        terms.add(word);
      }
    }
  }

  for (const slug of buildSlugCandidates(filme)) {
    terms.add(slug);
  }

  return Array.from(terms);
}

export function pickBestMatch(
  filme: { title: string; originalTitle?: string | null },
  events: IngressoEvent[],
  source: IngressoMatch['source'],
): IngressoMatch | null {
  const candidates = events.filter(isFilmEvent);
  if (candidates.length === 0) return null;

  const filmeTitles = collectNormalizedTitles(filme);
  const normalizedTitle = filmeTitles[0] ?? '';
  const normalizedOriginal = normalizeTitle(filme.originalTitle ?? '');

  for (const event of candidates) {
    if (titlesMatchExactly(filmeTitles, collectEventTitles(event))) {
      return eventToMatch(event, source, 1);
    }
  }

  let best: { event: IngressoEvent; score: number } | null = null;
  for (const event of candidates) {
    const eventTitles = collectEventTitles(event);
    for (const filmeTitle of filmeTitles) {
      for (const eventTitle of eventTitles) {
        const score = scoreTitlePair(filmeTitle, eventTitle);
        if (!best || score > best.score) {
          best = { event, score };
        }
      }
    }
  }

  if (!best) return null;

  const threshold =
    normalizedOriginal &&
    collectEventTitles(best.event).some(
      (eventTitle) => scoreTitlePair(normalizedOriginal, eventTitle) >= ORIGINAL_TITLE_SIMILARITY_THRESHOLD,
    )
      ? ORIGINAL_TITLE_SIMILARITY_THRESHOLD
      : SIMILARITY_THRESHOLD;

  if (best.score >= threshold) {
    return eventToMatch(best.event, source, best.score);
  }

  return null;
}

async function fetchIngressoJson<T>(url: string, label: string): Promise<T | null> {
  try {
    logger.info(`[ingresso-api] GET ${label}: ${url}`);
    const response = await axios.get<T>(url, {
      timeout: SEARCH_TIMEOUT_MS,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'OrbeDetetive/2.1',
      },
      validateStatus: (status) => status === 200 || status === 204,
    });

    if (response.status === 204) {
      logger.info(`[ingresso-api] ${label} retornou 204 (vazio)`);
      return null;
    }

    return response.data;
  } catch (error: any) {
    logger.warn(`[ingresso-api] Falha em ${label}: ${error?.message ?? error}`);
    return null;
  }
}

export async function fetchIngressoCatalog(cityIds: number[] = DEFAULT_CITY_IDS): Promise<IngressoEvent[]> {
  const byUrlKey = new Map<string, IngressoEvent>();

  for (const cityId of cityIds) {
    const url = `${INGRESSO_API_BASE}/events/coming-soon?cityId=${cityId}&partnership=home`;
    const events = await fetchIngressoJson<IngressoEvent[]>(url, `coming-soon cityId=${cityId}`);
    if (!events?.length) continue;

    for (const event of events) {
      if (event.urlKey) byUrlKey.set(event.urlKey, event);
    }
    logger.info(`[ingresso-api] cityId=${cityId}: ${events.length} eventos (${byUrlKey.size} únicos no catálogo)`);
  }

  return Array.from(byUrlKey.values());
}

export async function searchIngressoByTerm(term: string, cityId = 1): Promise<IngressoEvent[]> {
  const normalizedTerm = slugify(term);
  if (!normalizedTerm || normalizedTerm.length < 3) return [];

  const url = `${INGRESSO_API_BASE}/events/search/${encodeURIComponent(normalizedTerm)}?cityId=${cityId}`;
  const events = await fetchIngressoJson<IngressoEvent[]>(url, `search term="${normalizedTerm}"`);
  return events ?? [];
}

/**
 * Busca evento pelo urlKey exato (ex.: link já salvo no banco).
 * Mais confiável que o catálogo coming-soon, que pode estar desatualizado ou sem o filme.
 */
export async function fetchIngressoByUrlKey(urlKey: string): Promise<IngressoMatch | null> {
  const key = urlKey.toLowerCase().trim();
  if (!key) return null;

  for (const cityId of DEFAULT_CITY_IDS) {
    const results = await searchIngressoByTerm(key, cityId);
    const exact = results.find((event) => event.urlKey?.toLowerCase() === key);
    if (exact) {
      logger.info(
        `[ingresso-api] Refresh por urlKey "${key}" cityId=${cityId} → inPreSale=${exact.inPreSale}, playing=${exact.countIsPlaying}`,
      );
      return eventToMatch(exact, 'url_key', 1);
    }
  }

  return null;
}

export async function findIngressoMatchInCatalog(
  filme: { title: string; originalTitle?: string | null },
  catalog: IngressoEvent[],
): Promise<IngressoMatch | null> {
  const slugCandidates = buildSlugCandidates(filme);
  for (const slug of slugCandidates) {
    const byKey = catalog.find((event) => event.urlKey === slug);
    if (byKey) {
      logger.info(`[ingresso-api] Match por urlKey "${slug}" → "${byKey.title}"`);
      return eventToMatch(byKey, 'url_key', 1);
    }
  }

  const match = pickBestMatch(filme, catalog, 'catalog');
  if (match) {
    logger.info(
      `[ingresso-api] Match no catálogo (score=${match.score?.toFixed(2)}) → "${match.title}" [${match.urlKey}]`,
    );
  }
  return match;
}

export async function findIngressoMatchViaSearch(
  filme: { title: string; originalTitle?: string | null; releaseDate?: Date | null },
): Promise<IngressoMatch | null> {
  const searchTerms = buildSearchTerms(filme);

  for (const term of searchTerms) {
    for (const cityId of DEFAULT_CITY_IDS) {
      const results = await searchIngressoByTerm(term, cityId);
      if (!results.length) continue;

      const exactBySlug = results.find((event) => {
        if (!isFilmEvent(event)) return false;
        return buildSlugCandidates(filme).includes(event.urlKey);
      });
      if (exactBySlug) {
        const match = eventToMatch(exactBySlug, 'search', 1);
        logger.info(
          `[ingresso-api] Match na busca "${term}" cityId=${cityId} por urlKey → "${match.title}" [${match.urlKey}]`,
        );
        return match;
      }

      const match = pickBestMatch(filme, results, 'search');
      if (match) {
        logger.info(
          `[ingresso-api] Match na busca "${term}" cityId=${cityId} (score=${match.score?.toFixed(2)}) → "${match.title}"`,
        );
        return match;
      }
    }
  }

  return null;
}

export function buildIngressoSlugCandidates(filme: {
  title: string;
  originalTitle?: string | null;
  releaseDate?: Date | null;
}): string[] {
  return buildSlugCandidates(filme);
}
