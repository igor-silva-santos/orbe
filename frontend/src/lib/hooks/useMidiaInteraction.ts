'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAppStore } from '@/stores/appStore';
import { orbeNerdApi } from '@/lib/api';
import { toggleAnimeWeeklyPin } from '@/lib/animeWeeklyPinActions';
import type { Filme, Serie, Anime, Jogo, TipoMidia, UserAction, UserInteraction } from '@/types';

const ACTION_TO_STATUS: Partial<Record<UserAction, UserInteraction['status']>> = {
  favoritar: 'favorito',
  quero_assistir: 'quero_assistir',
  acompanhando: 'acompanhando',
  nao_me_interessa: 'oculto',
};

const SAVED_TOAST: Partial<Record<UserAction, string>> = {
  favoritar: 'Adicionado aos favoritos.',
  quero_assistir: 'Marcado como quero assistir.',
  acompanhando: 'Marcado como acompanhando.',
  nao_me_interessa: 'Marcado como não me interessa.',
};

const REMOVED_TOAST: Partial<Record<UserInteraction['status'], string>> = {
  favorito: 'Removido dos favoritos.',
  quero_assistir: 'Removido de quero assistir.',
  acompanhando: 'Você não está mais acompanhando.',
  assistido: 'Marcação de já assisti / já joguei desfeita.',
  oculto: 'Voltou a aparecer para você.',
};

/**
 * Menu de ações do card. A mesma opção, tocada de novo, desfaz a marcação.
 * Lê as interações com getState() para a função manter a mesma identidade
 * entre renders e não invalidar o memo dos cards.
 */
export function useMidiaInteraction() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const upsertInteraction = useAppStore((s) => s.upsertInteraction);
  const removeInteraction = useAppStore((s) => s.removeInteraction);
  const animeWeeklyPinIds = useAppStore((s) => s.animeWeeklyPinIds);
  const setAnimeWeeklyPinIds = useAppStore((s) => s.setAnimeWeeklyPinIds);
  const mergePinnedAnimes = useAppStore((s) => s.mergePinnedAnimes);

  return useCallback(
    async (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => {
      if (!isAuthenticated) {
        toast.error('Entre na sua conta para salvar isso.');
        return;
      }

      if (action === 'toggle_semana_anime') {
        if (type !== 'anime') return;
        try {
          await toggleAnimeWeeklyPin(midia.id, {
            animeWeeklyPinIds,
            setAnimeWeeklyPinIds,
            mergePinnedAnimes,
          });
        } catch (error) {
          console.error('Erro ao atualizar anime da semana:', error);
          toast.error('Não foi possível atualizar sua semana.');
        }
        return;
      }

      const toggleStatus: UserInteraction['status'] | undefined =
        action === 'ja_assisti' || action === 'ja_joguei'
          ? 'assistido'
          : ACTION_TO_STATUS[action];

      const current = useAppStore.getState().userInteractions.find(
        (interaction) => interaction.midia_id === midia.id && interaction.tipo_midia === type,
      );

      if (toggleStatus && current?.status === toggleStatus) {
        try {
          await orbeNerdApi.deleteInteraction(midia.id, type);
          removeInteraction(midia.id, type);
          toast.success(REMOVED_TOAST[toggleStatus] ?? 'Marcação removida.');
        } catch (error) {
          console.error('Erro ao remover interação:', error);
          toast.error('Não foi possível desfazer. Tente novamente.');
        }
        return;
      }

      const status = ACTION_TO_STATUS[action];
      if (!status) return;

      try {
        const interaction: UserInteraction = await orbeNerdApi.upsertInteraction({
          midia_id: midia.id,
          tipo_midia: type,
          status,
        });
        upsertInteraction(interaction);
        toast.success(SAVED_TOAST[action] ?? 'Salvo na sua lista.');
      } catch (error) {
        console.error('Erro ao salvar interação:', error);
        toast.error('Não foi possível salvar. Tente novamente.');
      }
    },
    [
      isAuthenticated,
      upsertInteraction,
      removeInteraction,
      animeWeeklyPinIds,
      setAnimeWeeklyPinIds,
      mergePinnedAnimes,
    ]
  );
}
