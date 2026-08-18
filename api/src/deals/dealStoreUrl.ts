/** Hostnames de lojas oficiais — links diretos, sem agregadores/redirecionadores. */
const OFFICIAL_STORE_HOSTS = new Set([
  'store.steampowered.com',
  'steampowered.com',
  'store.epicgames.com',
  'epicgames.com',
  'ea.com',
  'www.ea.com',
  'microsoft.com',
  'www.microsoft.com',
  'xbox.com',
  'www.xbox.com',
  'itch.io',
  'gog.com',
  'www.gog.com',
  'ubisoft.com',
  'www.ubisoft.com',
  'store.ubi.com',
  'store.playstation.com',
  'playstation.com',
  'www.playstation.com',
]);

/** Agregadores e intermediários que não devem ser usados como destino do usuário. */
const BLOCKED_STORE_HOSTS = new Set([
  'cheapshark.com',
  'www.cheapshark.com',
  'gamerpower.com',
  'www.gamerpower.com',
  'isthereanydeal.com',
  'www.isthereanydeal.com',
]);

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, '');
}

export function isOfficialStoreUrl(url: string | null | undefined): boolean {
  if (!url?.trim()) return false;
  try {
    const host = normalizeHostname(new URL(url).hostname);
    if (BLOCKED_STORE_HOSTS.has(host)) return false;
    if (OFFICIAL_STORE_HOSTS.has(host)) return true;
    // itch.io subdomínios de jogos (ex.: dev.itch.io)
    if (host.endsWith('.itch.io')) return true;
    return false;
  } catch {
    return false;
  }
}

export function filterDealsWithOfficialStoreUrls<T extends { storeUrl: string }>(deals: T[]): T[] {
  return deals.filter((deal) => isOfficialStoreUrl(deal.storeUrl));
}
