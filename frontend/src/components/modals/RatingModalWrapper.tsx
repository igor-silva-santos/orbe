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

    // Determinar o ID da mídia externa
    const midiaId = (midia as any).tmdbId || (midia as any).anilistId || (midia as any).igdbId;
    const status = action === 'ja_assisti' ? 'assistido' : action === 'ja_joguei' ? 'jogado' : 'assistido';

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Usuário não autenticado');
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
        throw new Error('Erro ao salvar avaliação');
      }

      console.log('Avaliação salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    } finally {
      closeRatingModal();
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

