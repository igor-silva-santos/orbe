export type StreamingLinkInput = {
  name: string;
  url: string;
  logo_path?: string | null;
  providerTmdbId?: number | null;
};

const ADS_SUFFIX = /\s+(standard\s+)?with\s+ads$/i;
const CHANNEL_SUFFIX = /\s+(amazon|apple tv|roku|google play movies|youtube)\s+channel$/i;

/** Agrupa variantes TMDB (with Ads, Amazon Channel, etc.) em uma família exibível. */
export function normalizeStreamingFamily(name: string): string {
  let family = name.trim();
  family = family.replace(ADS_SUFFIX, '');
  family = family.replace(CHANNEL_SUFFIX, '');
  return family.trim();
}

function pickPreferredUrl(existing: StreamingLinkInput | undefined, candidate: StreamingLinkInput): StreamingLinkInput {
  if (!existing) return candidate;
  const existingAds = /with ads/i.test(existing.name);
  const candidateAds = /with ads/i.test(candidate.name);
  if (existingAds && !candidateAds) return candidate;
  return existing;
}

export function dedupeStreamingProviders(links: StreamingLinkInput[]): StreamingLinkInput[] {
  const byFamily = new Map<string, StreamingLinkInput>();
  for (const link of links) {
    if (!link.url || !link.name) continue;
    const family = normalizeStreamingFamily(link.name);
    const key = link.providerTmdbId != null ? `id:${link.providerTmdbId}` : `name:${family.toLowerCase()}`;
    const normalized: StreamingLinkInput = { ...link, name: family };
    byFamily.set(key, pickPreferredUrl(byFamily.get(key), normalized));
  }
  return Array.from(byFamily.values()).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}
