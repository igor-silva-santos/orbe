'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import orbeNerdApi from '@/data/realApi';
import ContinuacaoTabContent from '@/components/continuacoes/ContinuacaoTabContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ContinuacoesPayload } from '@/types/continuacoes';

type Props = {
  tipo: 'filme' | 'serie';
  tmdbId: number;
  showSagaLink?: boolean;
};

export default function ContinuacoesSuperModalTabs({ tipo, tmdbId, showSagaLink = true }: Props) {
  const [data, setData] = useState<ContinuacoesPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const fetcher =
      tipo === 'filme'
        ? () => orbeNerdApi.getContinuacoesFilme(tmdbId)
        : () => orbeNerdApi.getContinuacoesSerie(tmdbId);

    fetcher()
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tipo, tmdbId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        Carregando...
      </div>
    );
  }

  const continuacao = data?.continuacao ?? [];
  const universo = data?.universoCinematico?.itens ?? [];
  const hasContinuacao = continuacao.length > 0;
  const hasUniverso = universo.length > 0;

  if (!hasContinuacao && !hasUniverso) {
    return null;
  }

  const defaultTab = hasContinuacao ? 'continuacao' : 'universo';

  return (
    <Tabs defaultValue={defaultTab} className="w-full mt-4">
      <TabsList className="w-full justify-start">
        {hasContinuacao && <TabsTrigger value="continuacao">Continuação</TabsTrigger>}
        {hasUniverso && <TabsTrigger value="universo">Universo</TabsTrigger>}
      </TabsList>
      {hasContinuacao && (
        <TabsContent value="continuacao" className="mt-4">
          <ContinuacaoTabContent tipo={tipo} tmdbId={tmdbId} showSagaLink={showSagaLink} section="continuacao" prefetched={data} />
        </TabsContent>
      )}
      {hasUniverso && (
        <TabsContent value="universo" className="mt-4">
          <ContinuacaoTabContent tipo={tipo} tmdbId={tmdbId} showSagaLink={false} section="universo" prefetched={data} />
        </TabsContent>
      )}
    </Tabs>
  );
}
