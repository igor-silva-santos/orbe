'use client';

import { useAppStore } from '@/stores/appStore';
import { orbeNerdApi } from '@/lib/api';
import type { Filme, Serie, Anime, Jogo, TipoMidia, UserAction, UserInteraction } from '@/types';

const ACTION_TO_STATUS: Partial<Record<UserAction, UserInteraction['status']>> = {
  favoritar: 'favorito',
  quero_assistir: 'quero_assistir',
  acompanhando: 'acompanhando',
  nao_me_interessa: 'oculto',
};

/**
 * Handler compartilhado pro menu de ações do MidiaCard (Favoritar, Quero Assistir,
 * Acompanhando, Não me Interessa). Sem isso conectado, os botões do menu não faziam
 * nada — a API e o store já existiam, só faltava a ligação com a UI. ("Já Assisti"/
 * "Já Joguei" já são tratados dentro do próprio MidiaCard, que abre o RatingModal
 * diretamente antes de chamar onInteraction — nunca chegam até aqui.)
 * O MidiaCard repassa o próprio `type` no callback, então funciona tanto em listas de um
 * tipo só quanto em listas mistas (Hoje, Eventos, Prêmios, Busca).
 */
export function useMidiaInteraction() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const upsertInteraction = useAppStore((s) => s.upsertInteraction);

  return async (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para fazer isso.');
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
    } catch (error) {
      console.error('Erro ao salvar interação:', error);
      alert('Não foi possível salvar. Tente novamente.');
    }
  };
}
