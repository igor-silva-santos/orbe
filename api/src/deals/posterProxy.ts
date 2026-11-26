import axios from 'axios';
import { logger } from '../logger';
import { isAllowedPosterUrl } from './dealImages';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 10000;
const ALLOWED_CONTENT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const HEADER_HIT_TTL_MS = 24 * 60 * 60 * 1000;
const HEADER_MISS_TTL_MS = 5 * 60 * 1000;

type HeaderCacheEntry = { url: string | null; expires: number };
const steamHeaderCache = new Map<number, HeaderCacheEntry>();

export type PosterBytes = { data: Buffer; contentType: string };

function refererFor(url: URL): string {
  if (url.hostname === 'www.gamerpower.com') return 'https://www.gamerpower.com/';
  return 'https://store.steampowered.com/';
}

/** Busca a imagem no CDN com User-Agent de navegador. Não segue redirect para fora da allowlist. */
export async function fetchAllowedPoster(imageUrl: string, redirectsLeft = 1): Promise<PosterBytes | null> {
  if (!isAllowedPosterUrl(imageUrl)) return null;

  const url = new URL(imageUrl);
  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: 'arraybuffer',
      timeout: REQUEST_TIMEOUT_MS,
      maxContentLength: MAX_IMAGE_BYTES,
      maxBodyLength: MAX_IMAGE_BYTES,
      maxRedirects: 0,
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: refererFor(url),
      },
      validateStatus: () => true,
    });

    if (response.status >= 300 && response.status < 400 && redirectsLeft > 0) {
      const location = response.headers.location;
      if (typeof location !== 'string' || !location.trim()) return null;
      return fetchAllowedPoster(new URL(location, imageUrl).href, redirectsLeft - 1);
    }

    if (response.status !== 200) return null;

    const contentType = String(response.headers['content-type'] || '')
      .split(';')[0]
      .trim()
      .toLowerCase();
    if (!ALLOWED_CONTENT_TYPES.has(contentType)) return null;

    return { data: Buffer.from(response.data), contentType };
  } catch (error) {
    logger.warn(`Falha ao buscar capa (${url.hostname}): ${error}`);
    return null;
  }
}

/** Header oficial (com hash) para jogos novos, cuja library_600x900 ainda não existe no CDN clássico. */
export async function lookupSteamHeaderImage(appId: number): Promise<string | null> {
  const now = Date.now();
  const cached = steamHeaderCache.get(appId);
  if (cached && cached.expires > now) return cached.url;

  let headerUrl: string | null = null;
  try {
    const response = await axios.get('https://store.steampowered.com/api/appdetails', {
      params: { appids: String(appId), filters: 'basic' },
      timeout: 8000,
      headers: { 'User-Agent': BROWSER_UA, Accept: 'application/json' },
      validateStatus: (status) => status === 200,
    });
    const header = response.data?.[String(appId)]?.data?.header_image;
    if (typeof header === 'string' && isAllowedPosterUrl(header)) headerUrl = header;
  } catch (error) {
    logger.warn(`Steam appdetails do app ${appId} falhou: ${error}`);
  }

  steamHeaderCache.set(appId, {
    url: headerUrl,
    expires: now + (headerUrl ? HEADER_HIT_TTL_MS : HEADER_MISS_TTL_MS),
  });
  return headerUrl;
}

