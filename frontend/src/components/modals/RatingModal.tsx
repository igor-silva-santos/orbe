'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Heart, Star, ThumbsDown } from 'lucide-react';
import type { Filme, Serie, Anime, Jogo } from '@/types';

interface RatingModalProps {
  isOpen: boolean;
  midia: Filme | Serie | Anime | Jogo | null;
  type: string;
  action: 'ja_assisti' | 'ja_joguei';
  onClose: () => void;
  onRating: (rating: 'gostei' | 'amei' | 'nao_gostei', review?: string) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  midia,
  type,
  action,
  onClose,
  onRating
}) => {
  const [selectedRating, setSelectedRating] = useState<'gostei' | 'amei' | 'nao_gostei' | null>(null);
  const [review, setReview] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (!isOpen || !midia) return null;

  const getActionText = () => {
    if (action === 'ja_joguei') return 'Jogar';
    return 'Assistir';
  };

  const getMediaText = () => {
    if (type === 'jogo') return 'Jogo';
    if (type === 'filme') return 'Filme';
    if (type === 'serie') return 'Série';
    if (type === 'anime') return 'Anime';
    return 'mídia';
  };

  const handleRatingSelect = (rating: 'gostei' | 'amei' | 'nao_gostei') => {
    setSelectedRating(rating);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (skipReview: boolean = false) => {
    if (selectedRating) {
      onRating(selectedRating, skipReview ? undefined : review);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedRating(null);
    setReview('');
    setShowReviewModal(false);
    onClose();
  };

  return (
    <>
      {/* Modal de Avaliação */}
      <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
        <div className="bg-background rounded-t-2xl sm:rounded-lg shadow-xl max-w-md w-full max-h-[92dvh] overflow-y-auto">
          <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-border">
            <h2 className="text-lg sm:text-xl font-bold break-words">
              Você gostou de {getActionText()} esse {getMediaText()}?
            </h2>
            <button
              onClick={handleClose}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-4 mb-6 min-w-0">
              <Image
                src={midia.poster_curado || midia.poster_url_api}
                alt={midia.titulo_curado || midia.titulo_api}
                width={64}
                height={96}
                className="w-16 h-24 object-cover rounded"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-base sm:text-lg break-words">
                  {midia.titulo_curado || midia.titulo_api}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {getMediaText()}
                </p>
              </div>
            </div>

            {/* Opções de Avaliação */}
            <div className="space-y-3">
              <button
                onClick={() => handleRatingSelect('amei')}
                className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                <Heart className="h-6 w-6 fill-current" />
                <span className="font-semibold text-lg">Amei</span>
              </button>

              <button
                onClick={() => handleRatingSelect('gostei')}
                className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-colors"
              >
                <Star className="h-6 w-6 fill-current" />
                <span className="font-semibold text-lg">Gostei</span>
              </button>

              <button
                onClick={() => handleRatingSelect('nao_gostei')}
                className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-500 text-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
              >
                <ThumbsDown className="h-6 w-6" />
                <span className="font-semibold text-lg">Não Gostei</span>
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Esta avaliação é obrigatória e não pode ser pulada.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Review (aparece após selecionar avaliação) */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[70] p-0 sm:p-4">
          <div className="bg-background rounded-t-2xl sm:rounded-lg shadow-xl max-w-md w-full max-h-[92dvh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-border">
              <h2 className="text-lg sm:text-xl font-bold break-words">
                Gostaria de deixar sua análise desse {getMediaText()}?
              </h2>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-6 min-w-0">
                <Image
                  src={midia.poster_curado || midia.poster_url_api}
                  alt={midia.titulo_curado || midia.titulo_api}
                  width={64}
                  height={96}
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg break-words">
                    {midia.titulo_curado || midia.titulo_api}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Avaliação: {selectedRating === 'amei' ? '❤️ Amei' : selectedRating === 'gostei' ? '⭐ Gostei' : '👎 Não Gostei'}
                  </p>
                </div>
              </div>

              {/* Campo de Review */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Sua análise (opcional):
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder={`Conte o que você achou desse ${getMediaText().toLowerCase()}...`}
                  className="w-full h-32 p-3 text-base border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {review.length}/500 caracteres
                </p>
              </div>

              {/* Botões */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleReviewSubmit(false)}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Avaliar
                </button>
                <button
                  onClick={() => handleReviewSubmit(true)}
                  className="flex-1 bg-muted text-muted-foreground py-3 px-4 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                >
                  Pular
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingModal;

