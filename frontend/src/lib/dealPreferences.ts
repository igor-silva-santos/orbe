import type { UnifiedDeal, DealPreference, DealPreferenceStatus } from '@/types/deals';

export const DEAL_PREFERENCE_LABELS: Record<DealPreferenceStatus, string> = {
  ja_tenho: 'Já tenho',
  sem_interesse: 'Sem interesse',
  quero: 'Quero este jogo',
};

/** Oculta ofertas marcadas como já tenho ou sem interesse (quero permanece visível para alertas). */
export function filterDealsByUserPreference(
  deals: UnifiedDeal[],
  preferences: DealPreference[],
  showHidden: boolean,
): UnifiedDeal[] {
  if (showHidden) return deals;
  const hidden = new Set(
    preferences
      .filter((p) => p.status === 'ja_tenho' || p.status === 'sem_interesse')
      .map((p) => p.deal_id),
  );
  return deals.filter((deal) => !hidden.has(deal.id));
}

export function getDealPreference(
  dealId: string,
  preferences: DealPreference[],
): DealPreference | undefined {
  return preferences.find((p) => p.deal_id === dealId);
}
