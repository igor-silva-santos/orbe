const COOKIE_NAME = 'orbe_adult_consent';
const MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export type AdultConsent = 'accepted' | 'declined';

export function getAdultConsent(): AdultConsent | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;

  if (value === 'accepted' || value === 'declined') {
    return value;
  }

  return null;
}

export function setAdultConsent(consent: AdultConsent): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=${consent}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function shouldShowAdultAnime(consent: AdultConsent | null): boolean {
  return consent === 'accepted';
}
