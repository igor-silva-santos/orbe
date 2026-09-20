'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import MinhaListaNav from '@/components/minha-lista/MinhaListaNav';
import MidiaCard from '@/components/media/MidiaCard';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';
import orbeNerdApi from '@/lib/api';
import type { Anime, Filme, Jogo, Serie, TipoMidia, UserInteraction } from '@/types';

type ListaStatusFilter = 'todos' | UserInteraction['status'];
type ListaTipoFilter = 'todos' | TipoMidia;

type ListaApiItem = {
  id: number;
  midia_id: number;
  tipo_midia: TipoMidia;
  status: UserInteraction['status'];
  avaliacao?: UserInteraction['avaliacao'];
  data_interacao: string;
  midia: Filme | Serie | Anime | Jogo;
};

const STATUS_TABS: { id: ListaStatusFilter; label: string }[] = [
  { id: 'todos', label: 'Tudo' },
  { id: 'quero_assistir', label: 'Quero assistir' },
  { id: 'acompanhando', label: 'Acompanhando' },
  { id: 'favorito', label: 'Favoritos' },
  { id: 'assistido', label: 'Assistidos / jogados' },
];

const TIPO_CHIPS: { id: ListaTipoFilter; label: string }[] = [
  { id: 'todos', label: 'Todos os tipos' },
  { id: 'filme', label: 'Filmes' },
  { id: 'serie', label: 'Séries' },
  { id: 'anime', label: 'Animes' },
  { id: 'jogo', label: 'Jogos' },
];

export default function MinhaListaClient() {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const userInteractions = useAppStore((s) => s.userInteractions);
  const handleInteraction = useMidiaInteraction();

  const [statusFilter, setStatusFilter] = useState<ListaStatusFilter>('todos');
  const [tipoFilter, setTipoFilter] = useState<ListaTipoFilter>('todos');
  const [items, setItems] = useState<ListaApiItem[]>([]);
  const [missingCount, setMissingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLista = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params: { status?: string; tipo?: string } = {};
      if (statusFilter !== 'todos') params.status = statusFilter;
      if (tipoFilter !== 'todos') params.tipo = tipoFilter;
      const data = await orbeNerdApi.getMinhaLista(params);
      setItems(data.items ?? []);
      setMissingCount(data.missingCount ?? 0);
    } catch (err) {
      console.error('Erro ao carregar minha lista:', err);
      setError('Não foi possível carregar sua lista. Tente de novo em instantes.');
      if ((err as { status?: number })?.status === 401 || (err as { status?: number })?.status === 403) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, router, statusFilter, tipoFilter]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchLista();
  }, [fetchLista, isAuthenticated, router]);

  const visibleItems = useMemo(() => {
    return items.filter((row) => {
      const live = userInteractions.find(
        (i) => i.midia_id === row.midia_id && i.tipo_midia === row.tipo_midia,
      );
      const status = live?.status ?? row.status;
      if (status === 'oculto') return false;
      if (statusFilter !== 'todos' && status !== statusFilter) return false;
      return true;
    });
  }, [items, userInteractions, statusFilter]);

  const emptyMessage = useMemo(() => {
    if (statusFilter === 'todos' && tipoFilter === 'todos') {
      return 'Sua lista está vazia. Use o menu ⋮ nos cards para favoritar, marcar “quero assistir” ou acompanhar.';
    }
    return 'Nenhum item com esses filtros. Tente outra combinação.';
  }, [statusFilter, tipoFilter]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <PageHeader
        title="Minha lista"
        description="Filmes, séries, animes e jogos que você salvou no Orbe — sincronizado com sua conta."
      />
      <MinhaListaNav />

      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              statusFilter === tab.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border bg-muted/40 hover:bg-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TIPO_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setTipoFilter(chip.id)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm border transition-colors ${
              tipoFilter === chip.id
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-destructive py-12">{error}</p>
      )}

      {!loading && !error && visibleItems.length === 0 && (
        <p className="text-center text-muted-foreground py-12 max-w-lg mx-auto">{emptyMessage}</p>
      )}

      {!loading && !error && visibleItems.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 items-stretch">
            {visibleItems.map((row) => (
              <MidiaCard
                key={`${row.tipo_midia}-${row.midia_id}-${row.status}`}
                midia={row.midia}
                type={row.tipo_midia}
                userInteractions={userInteractions}
                onInteraction={handleInteraction}
              />
            ))}
          </div>
          {missingCount > 0 && (
            <p className="mt-6 text-xs text-muted-foreground text-center">
              {missingCount} {missingCount === 1 ? 'item ainda não está' : 'itens ainda não estão'} no catálogo Orbe e
              não aparecem aqui.
            </p>
          )}
        </>
      )}
    </div>
  );
}
