import type { DealsRejectedSample, DealsUrlRejectReason } from './dealsLogger';

/** Hostnames de lojas oficiais — links diretos, sem agregadores/redirecionadores. */
const OFFICIAL_STORE_HOSTS = new Set([
  'store.steampowered.com',
  'steampowered.com',
  'store.epicgames.com',
  'epicgames.com',
  'ea.com',
  'microsoft.com',
  'xbox.com',
  'itch.io',
  'gog.com',
  'ubisoft.com',
  'store.ubi.com',
  'store.playstation.com',
  'playstation.com',
]);

/** Agregadores e intermediários que não devem ser usados como destino do usuário. */
const BLOCKED_STORE_HOSTS = new Set([
  'cheapshark.com',
  'gamerpower.com',
  'isthereanydeal.com',
]);

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, '');
}

export function extractStoreHostname(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  try {
    return normalizeHostname(new URL(url).hostname);
  } catch {
    return null;
  }
}

export function getStoreUrlRejectReason(url: string | null | undefined): DealsUrlRejectReason | null {
  if (!url?.trim()) return 'empty';
  try {
    const host = normalizeHostname(new URL(url).hostname);
    if (BLOCKED_STORE_HOSTS.has(host)) return 'blocked_aggregator';
    if (OFFICIAL_STORE_HOSTS.has(host)) return null;
    if (host.endsWith('.itch.io')) return null;
    return 'unofficial_host';
  } catch {
    return 'invalid_url';
  }
}

export function isOfficialStoreUrl(url: string | null | undefined): boolean {
  return getStoreUrlRejectReason(url) === null;
}

export type DealWithStoreUrl = {
  id: string;
  title: string;
  source: string;
  storeUrl: string;
};

export function filterDealsWithOfficialStoreUrls<T extends DealWithStoreUrl>(deals: T[]): T[] {
  return filterDealsWithUrlReport(deals).accepted;
}

export function filterDealsWithUrlReport<T extends DealWithStoreUrl>(
  deals: T[],
  section: 'gratis' | 'promocoes' = 'gratis',
): {
  accepted: T[];
  rejected: DealsRejectedSample[];
} {
  const accepted: T[] = [];
  const rejected: DealsRejectedSample[] = [];

  for (const deal of deals) {
    const reason = getStoreUrlRejectReason(deal.storeUrl);
    if (reason === null) {
      accepted.push(deal);
      continue;
    }
    rejected.push({
      id: deal.id,
      title: deal.title,
      source: deal.source,
      storeUrl: deal.storeUrl,
      reason,
      hostname: extractStoreHostname(deal.storeUrl),
      section,
    });
  }

  return { accepted, rejected };
}
