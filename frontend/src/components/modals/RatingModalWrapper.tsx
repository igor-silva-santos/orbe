'use client';

import RatingModal from './RatingModal';
import { useAppStore } from '@/stores/appStore';
import { API_BASE } from '@/lib/apiBase';

const RatingModalWrapper = () => {
  const { 
    isRatingModalOpen, 
    ratingModalData, 
    closeRatingModal 
  } = useAppStore();

  const handleRating = async (rating: 'gostei' | 'amei' | 'nao_gostei', review?: string) => {
    const { midia, type, action } = ratingModalData;

    if (!midia) return;

    // midia.id É o id da mídia na API externa (tmdbId/anilistId/igdbId) — o backend
    // já mapeia isso em `id` na resposta (ver mapFilmeToCarouselCard etc.), então não
    // existe (nem nunca existiu) tmdbId/anilistId/igdbId como campo separado no objeto.
    const midiaId = midia.id;
    // 'jogado' não é um status válido no backend (schema só documenta favorito/
    // quero_assistir/acompanhando/assistido/oculto) — usa 'assistido' pra todo tipo de mídia.
    const status = 'assistido';

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para avaliar.');
        closeRatingModal();
        return;
      }

      const response = await fetch(`${API_BASE}/me/interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          midia_id: midiaId,
          tipo_midia: type,
          status: status,
          avaliacao: rating,
          comentario: review
        })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || 'Erro ao salvar avaliação');
      }

      closeRatingModal();
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      alert(error instanceof Error ? error.message : 'Erro ao salvar avaliação. Tente novamente.');
    }
  };

  return (
    <RatingModal
      isOpen={isRatingModalOpen}
      midia={ratingModalData.midia}
      type={ratingModalData.type || ''}
      action={ratingModalData.action || 'ja_assisti'}
      onClose={closeRatingModal}
      onRating={handleRating}
    />
  );
};

export default RatingModalWrapper;

