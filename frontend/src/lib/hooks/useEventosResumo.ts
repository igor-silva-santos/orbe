'use client';

import { useEffect, useState } from 'react';
import orbeNerdApi from '@/lib/api';
import type { EventoResumo } from '@/types';

/**
 * Busca o resumo de eventos (`/eventos/resumo`) uma vez — usado pelas gavetas "O que vem
 * aí" / "Destaques recentes" nas páginas de categoria (filmes, séries, animes, jogos).
 */
export function useEventosResumo() {
  const [resumo, setResumo] = useState<EventoResumo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    orbeNerdApi
      .getEventosResumo()
      .then((data) => {
        if (!cancelled) setResumo(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar resumo de eventos:', error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { resumo, isLoading };
}
