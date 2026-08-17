/** URL de capa Steam — CDN estável, melhor que thumbs do CheapShark. */
export function steamCapsuleImageUrl(appId: number): string {
  return `https://shared.fastly.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`;
}

export function steamHeaderImageUrl(appId: number): string {
  return `https://shared.fastly.steamstatic.com/steam/apps/${appId}/header.jpg`;
}

/** Prioriza imagem Steam quando há appId; senão mantém a URL original. */
export function resolveDealImageUrl(
  imageUrl: string | null | undefined,
  steamAppId: number | null | undefined,
): string | null {
  if (steamAppId != null && Number.isFinite(steamAppId) && steamAppId > 0) {
    return steamCapsuleImageUrl(steamAppId);
  }
  return imageUrl?.trim() || null;
}
