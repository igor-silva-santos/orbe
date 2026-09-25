'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarClock, RefreshCw, Sparkles, Users } from 'lucide-react';
import realApi from '@/data/realApi';
import GameRecommendationCard from '@/components/jogos/GameRecommendationCard';
import HorizontalDealsRow from '@/components/deals/HorizontalDealsRow';
import type { GameRecommendation, GameRecommendationsResponse } from '@/types/gameRecommendations';
import type { UnifiedDeal } from '@/types/deals';

function formatFetchedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'agora';
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Converte recomendação em deal horizontal (reuso do carrossel) quando só há Steam. */
function asHorizontalDeal(item: GameRecommendation): UnifiedDeal {
  return {
    id: item.id,
    source: 'steam',
    kind: 'sale',
    title: item.title,
    imageUrl: item.imageUrl,
    platform: 'steam',
    platforms: ['Steam'],
    storeUrl: item.storeUrl,
    salePrice: item.priceLabel,
    originalPrice: null,
    salePriceValue: null,
    originalPriceValue: null,
    discountPercent: null,
    currency: 'BRL',
    steamAppId: item.steamAppId,
    dealRating: 100 - item.rank,
    status: item.kind === 'demo' ? 'demo' : 'early_access',
    freeTier: item.priceLabel?.toLowerCase().includes('grátis') ? 'permanent' : null,
    orbeGameId: item.orbeGameId ?? undefined,
    orbeUrl: item.orbeUrl ?? undefined,
    priceConverted: false,
  };
}

function RecommendationGrid({ items, priorityCount = 6 }: { items: GameRecommendation[]; priorityCount?: number }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        Nenhum título nesta categoria no momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
      {items.map((item, index) => (
        <GameRecommendationCard key={item.id} item={item} priority={index < priorityCount} />
      ))}
    </div>
  );
}

type JogosRecomendacoesContentProps = {
  compact?: boolean;
};

export default function JogosRecomendacoesContent({ compact = false }: JogosRecomendacoesContentProps) {
  const [data, setData] = useState<GameRecommendationsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);
    try {
      const response = (await realApi.getGameRecommendations()) as GameRecommendationsResponse;
      setData(response);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar as recomendações.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
  }, [load]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {Array.from({ length: compact ? 6 : 12 }).map((_, i) => (
          <div key={i} className="w-full max-w-[210px] aspect-[206/290] rounded-[20px] bg-skeleton orbe-shimmer" />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-card rounded-lg border border-border p-10 text-center">
        <p className="text-muted-foreground">{error ?? 'Sem dados.'}</p>
        <button
          type="button"
          onClick={() => void load(false)}
          className="mt-4 bg-primary text-primary-foreground text-sm font-medium px-6 py-2.5 rounded-lg"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 shrink-0" />
            Atualização do dia: <strong className="orbe-text-primary">{data.dateKey}</strong>
          </p>
          <p className="text-xs">
            Lista renovada automaticamente — demos e acesso antecipado na Steam, priorizando multijogador.
            Última busca: {formatFetchedAt(data.fetchedAt)}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load(true)}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      <section className="space-y-4 rounded-xl border border-primary/30 bg-primary/5 p-4 md:p-6">
        <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Destaques multijogador
          <span className="text-sm font-normal text-muted-foreground">({data.highlights.length})</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Demos e early access com tags de multijogador ou co-op na Steam, ordenados do mais recente para o mais
          antigo no recorte do dia.
        </p>
        {!compact && data.highlights.length > 8 ? (
          <HorizontalDealsRow
            deals={data.highlights.slice(0, 24).map(asHorizontalDeal)}
            enableDrag
            priorityCount={8}
          />
        ) : (
          <RecommendationGrid items={data.highlights} />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--orbe-accent-2)]" />
          Demos grátis
          <span className="text-sm font-normal text-muted-foreground">({data.demos.length})</span>
        </h2>
        <RecommendationGrid items={data.demos} priorityCount={4} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          Acesso antecipado
          <span className="text-sm font-normal text-muted-foreground">({data.earlyAccess.length})</span>
        </h2>
        <RecommendationGrid items={data.earlyAccess} priorityCount={4} />
      </section>

      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        Fonte: Steam Store (Brasil). Jogos com página no Orbe exibem atalho &quot;Ver no Orbe&quot;. A lista muda conforme
        novos demos e early access entram na loja — volte amanhã ou use Atualizar após o cache (algumas horas).
      </p>
    </div>
  );
}
