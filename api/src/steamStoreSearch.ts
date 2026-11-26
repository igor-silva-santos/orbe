import axios from 'axios';
import { logger } from './logger';

const steamStore = axios.create({
  baseURL: 'https://store.steampowered.com',
  timeout: 25000,
  headers: {
    'User-Agent': 'OrbeNerd/1.0 (recomendacoes@orbe.app)',
    Accept: 'application/json, text/javascript, */*; q=0.01',
  },
});

/** Tags Steam associadas a multijogador / co-op (filtro heurístico). */
export const STEAM_MULTIPLAYER_TAG_IDS = new Set([
  3859, // Multi-player
  3843, // Online Co-Op
  1774, // Co-op
  1685, // PvP
  1775, // PvE
  4695, // Economy (MMO-ish — opcional, skip)
  1741, // MMO
  5711, // Team-Based
]);

export type SteamSearchHit = {
  appId: number;
  name: string;
  imageUrl: string | null;
  tagIds: number[];
  priceCents: number | null;
  currency: string | null;
};

type ParsedRow = {
  appId: number;
  name: string;
  imageUrl: string | null;
  tagIds: number[];
};

export function parseSearchResultsHtml(html: string): ParsedRow[] {
  const rows = html.split('search_result_row');
  const results: ParsedRow[] = [];
  const seen = new Set<number>();

  for (const chunk of rows) {
    const appMatch = chunk.match(/data-ds-appid="(\d+)"/);
    if (!appMatch) continue;
    const appId = Number.parseInt(appMatch[1], 10);
    if (!Number.isFinite(appId) || seen.has(appId)) continue;
    seen.add(appId);

    const titleMatch = chunk.match(/class="title">([^<]+)</);
    const imgMatch = chunk.match(/<img src="([^"]+)"/);
    const tagsMatch = chunk.match(/data-ds-tagids="(\[[^\]]*\])"/);
    let tagIds: number[] = [];
    if (tagsMatch) {
      try {
        tagIds = JSON.parse(tagsMatch[1].replace(/&quot;/g, '"')) as number[];
      } catch {
        tagIds = [];
      }
    }

    results.push({
      appId,
      name: titleMatch?.[1]?.trim() ?? `Steam ${appId}`,
      imageUrl: imgMatch?.[1]?.replace(/\\\//g, '/') ?? null,
      tagIds,
    });
  }

  return results;
}

function hasMultiplayerTags(tagIds: number[]): boolean {
  return tagIds.some((id) => STEAM_MULTIPLAYER_TAG_IDS.has(id));
}

async function fetchSearchPage(params: Record<string, string | number>): Promise<ParsedRow[]> {
  const response = await steamStore.get('/search/results/', {
    params: {
      query: '',
      start: 0,
      count: 50,
      dynamicdata: '',
      sort_by: 'Released_DESC',
      infinite: 1,
      snr: '1_7_7_popularnew_7',
      ...params,
    },
  });

  const data = response.data;
  if (!data?.success || !data.results_html) return [];
  return parseSearchResultsHtml(String(data.results_html));
}

export async function fetchSteamDemosAndEarlyAccess(options?: {
  maxPerKind?: number;
  multiplayerOnly?: boolean;
}): Promise<{ demos: SteamSearchHit[]; earlyAccess: SteamSearchHit[] }> {
  const maxPerKind = options?.maxPerKind ?? 40;
  const multiplayerOnly = options?.multiplayerOnly ?? true;

  try {
    const [demoRows, eaRows] = await Promise.all([
      fetchSearchPage({ category1: 10, filters: 5219 }),
      fetchSearchPage({ category1: 998 }),
    ]);

    const mapRows = (rows: ParsedRow[]): SteamSearchHit[] => {
      let list = rows;
      if (multiplayerOnly) {
        const mp = rows.filter((r) => hasMultiplayerTags(r.tagIds));
        list = mp.length >= 8 ? mp : rows;
      }
      return list.slice(0, maxPerKind).map((r) => ({
        appId: r.appId,
        name: r.name,
        imageUrl: r.imageUrl,
        tagIds: r.tagIds,
        priceCents: null,
        currency: 'BRL',
      }));
    };

    return {
      demos: mapRows(demoRows),
      earlyAccess: mapRows(eaRows),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Steam search demos/EA falhou: ${message}`);
    return { demos: [], earlyAccess: [] };
  }
}

export function steamCapsuleImage(appId: number): string {
  return `https://shared.fastly.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`;
}
