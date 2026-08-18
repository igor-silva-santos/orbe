'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAppStore } from '@/stores/appStore';
import { orbeNerdApi } from '@/lib/api';
import { DEAL_PREFERENCE_LABELS } from '@/lib/dealPreferences';
import type { DealPreference, DealPreferenceStatus } from '@/types/deals';
import type { UnifiedDeal } from '@/types/deals';

export function useDealPreference() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const upsertDealPreference = useAppStore((s) => s.upsertDealPreference);
  const removeDealPreference = useAppStore((s) => s.removeDealPreference);
  const dealPreferences = useAppStore((s) => s.dealPreferences);

  const getPreference = useCallback(
    (dealId: string) => dealPreferences.find((p) => p.deal_id === dealId),
    [dealPreferences],
  );

  const setPreference = useCallback(
    async (deal: UnifiedDeal, status: DealPreferenceStatus) => {
      if (!isAuthenticated) {
        toast.error('Faça login para marcar ofertas.');
        return;
      }

      const current = getPreference(deal.id);
      if (current?.status === status) {
        try {
          await orbeNerdApi.deleteDealPreference(deal.id);
          removeDealPreference(deal.id);
          toast.success('Marcação removida.');
        } catch {
          toast.error('Não foi possível remover a marcação.');
        }
        return;
      }

      try {
        const preference = (await orbeNerdApi.upsertDealPreference({
          deal_id: deal.id,
          status,
          steam_app_id: deal.steamAppId ?? undefined,
          platform: deal.platform,
          title: deal.title,
          orbe_game_id: deal.orbeGameId ?? undefined,
        })) as DealPreference;
        upsertDealPreference(preference);

        if (status === 'quero') {
          toast.success('Salvo! Em breve você poderá receber alertas quando este jogo estiver em promoção ou grátis.');
        } else {
          toast.success(DEAL_PREFERENCE_LABELS[status]);
        }
      } catch {
        toast.error('Não foi possível salvar. Tente novamente.');
      }
    },
    [isAuthenticated, getPreference, removeDealPreference, upsertDealPreference],
  );

  return { getPreference, setPreference, isAuthenticated };
}
