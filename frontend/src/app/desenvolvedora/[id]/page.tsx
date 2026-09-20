'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import MidiaCard from '@/components/media/MidiaCard';
import { useAppStore } from '@/stores/appStore';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import type { Jogo } from '@/types';

const PAGE_SIZE = 24;

export default function DesenvolvedoraPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const companyId = parseInt(params.id, 10);
  const userInteractions = useAppStore((s) => s.userInteractions);
  const handleInteraction = useMidiaInteraction();

  const [companyName, setCompanyName] = useState<string | null>(null);
  const [games, setGames] = useState<Jogo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(
    async (pageToLoad: number, append: boolean) => {
      if (!Number.isFinite(companyId) || companyId <= 0) {
        setHasError(true);
        setLoading(false);
        return;
      }
      if (pageToLoad === 1) setLoading(true);
      else setLoadingMore(true);
      setHasError(false);
      try {
        const res = await orbeNerdApi.getDeveloperGames(companyId, pageToLoad, PAGE_SIZE);
        setCompanyName(res.company?.name ?? null);
        const batch = (res.results ?? []) as Jogo[];
        setGames((prev) => (append ? [...prev, ...batch] : batch));
        setHasMore(Boolean(res.hasMore));
        setPage(pageToLoad);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [companyId],
  );

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  const loadingMoreRef = useRef(false);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingMoreRef.current || !hasMore) return;
        loadingMoreRef.current = true;
        loadPage(page + 1, true).finally(() => {
          loadingMoreRef.current = false;
        });
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, loadPage, page]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold orbe-text-primary">
          {companyName ?? 'Desenvolvedora'}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Catálogo IGDB — role para carregar mais jogos.
        </p>
      </header>

      {loading && (
        <div className="flex justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Carregando jogos...
        </div>
      )}

      {hasError && !loading && (
        <p className="text-muted-foreground text-center py-12">Não foi possível carregar os jogos.</p>
      )}

      {!loading && !hasError && games.length === 0 && (
        <p className="text-muted-foreground text-center py-12">Nenhum jogo encontrado para esta desenvolvedora.</p>
      )}

      {games.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((jogo) => (
            <MidiaCard
              key={jogo.id}
              midia={jogo}
              type="jogo"
              userInteractions={userInteractions}
              onInteraction={handleInteraction}
            />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="h-8" aria-hidden />
      {loadingMore && (
        <div className="flex justify-center py-6 text-muted-foreground gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando mais...
        </div>
      )}
    </div>
  );
}
