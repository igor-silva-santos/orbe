import axios from 'axios';
import stringSimilarity from 'string-similarity';
import { logger } from './logger';

const INGRESSO_API_BASE = 'https://api-content.ingresso.com/v0';
const INGRESSO_FILM_BASE = 'https://www.ingresso.com/filme';
const DEFAULT_CITY_IDS = [1, 2]; // São Paulo, Rio de Janeiro
const SEARCH_TIMEOUT_MS = 12_000;
const SIMILARITY_THRESHOLD = 0.82;

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

function pickBestMatch(
  filme: { title: string; originalTitle?: string | null },
  events: IngressoEvent[],
  source: IngressoMatch['source'],
): IngressoMatch | null {
  const candidates = events.filter(isFilmEvent);
  if (candidates.length === 0) return null;

  const normalizedTitle = normalizeTitle(filme.title);
  const normalizedOriginal = normalizeTitle(filme.originalTitle ?? '');

  for (const event of candidates) {
    const eventTitles = [event.title, event.originalTitle ?? ''].map(normalizeTitle).filter(Boolean);
    for (const eventTitle of eventTitles) {
      if (eventTitle === normalizedTitle || (normalizedOriginal && eventTitle === normalizedOriginal)) {
        return eventToMatch(event, source, 1);
      }
    }
  }

  let best: { event: IngressoEvent; score: number } | null = null;
  for (const event of candidates) {
    const compareAgainst = [event.title, event.originalTitle ?? ''].filter(Boolean);
    for (const candidateTitle of compareAgainst) {
      const scoreTitle = stringSimilarity.compareTwoStrings(normalizedTitle, normalizeTitle(candidateTitle));
      const scoreOriginal =
        normalizedOriginal &&
        stringSimilarity.compareTwoStrings(normalizedOriginal, normalizeTitle(candidateTitle));
      const score = Math.max(scoreTitle, scoreOriginal || 0);
      if (!best || score > best.score) {
        best = { event, score };
      }
    }
  }

  if (best && best.score >= SIMILARITY_THRESHOLD) {
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
  const searchTerms = new Set<string>();
  for (const title of [filme.title, filme.originalTitle].filter((t): t is string => Boolean(t?.trim()))) {
    searchTerms.add(title);
    const slug = slugify(title);
    if (slug) searchTerms.add(slug.replace(/-/g, ' '));
  }

  for (const term of searchTerms) {
    for (const cityId of DEFAULT_CITY_IDS) {
      const results = await searchIngressoByTerm(term, cityId);
      if (!results.length) continue;

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
