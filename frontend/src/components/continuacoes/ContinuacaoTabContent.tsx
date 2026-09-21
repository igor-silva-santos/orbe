'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import orbeNerdApi from '@/data/realApi';
import ContinuacaoCard from '@/components/continuacoes/ContinuacaoCard';
import { useAppStore } from '@/stores/appStore';
import type { ContinuacoesPayload } from '@/types/continuacoes';
import type { Filme, Serie } from '@/types';

type Props = {
  tipo: 'filme' | 'serie';
  tmdbId: number;
  showSagaLink?: boolean;
  section?: 'all' | 'continuacao' | 'universo';
  prefetched?: ContinuacoesPayload | null;
};

function stubMidia(item: ContinuacoesPayload['itens'][0]): Filme | Serie {
  const base = {
    id: item.tmdbId,
    titulo_curado: item.titulo,
    titulo_api: item.titulo,
    poster_curado: item.posterUrl ?? undefined,
    poster_url_api: item.posterUrl ?? '',
    data_lancamento_api: item.releaseDate ?? '',
    generos_api: [] as string[],
    nota_api: 0,
    popularidade_api: 0,
  };
  if (item.tipo === 'serie') {
    return {
      ...base,
      sinopse_api: '',
      numero_temporadas: 0,
      numero_episodios: 0,
      criadores: [],
      elenco: [],
      temporadas: [],
      plataformas_api: [],
    } as unknown as Serie;
  }
  return base as unknown as Filme;
}

export default function ContinuacaoTabContent({
  tipo,
  tmdbId,
  showSagaLink = true,
  section = 'all',
  prefetched,
}: Props) {
  const openSuperModal = useAppStore((s) => s.openSuperModal);
  const [data, setData] = useState<ContinuacoesPayload | null>(prefetched ?? null);
  const [loading, setLoading] = useState(!prefetched);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefetched) {
      setData(prefetched);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetcher =
      tipo === 'filme'
        ? () => orbeNerdApi.getContinuacoesFilme(tmdbId)
        : () => orbeNerdApi.getContinuacoesSerie(tmdbId);

    fetcher()
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar continuações.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tipo, tmdbId, prefetched]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        Carregando continuações...
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-muted-foreground py-6">{error}</p>;
  }

  const itens =
    section === 'continuacao'
      ? data?.continuacao ?? []
      : section === 'universo'
        ? data?.universoCinematico?.itens ?? []
        : data?.itens ?? [];

  if (!data || itens.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6">
        {section === 'universo'
          ? 'Nenhum título do mesmo universo encontrado.'
          : 'Nenhuma continuação encontrada para esta obra no momento.'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {section === 'universo' && data.universoCinematico && (
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Universo</p>
          <p className="font-semibold text-lg">{data.universoCinematico.nome}</p>
          <p className="text-sm text-muted-foreground mt-1">{data.universoCinematico.descricao}</p>
        </div>
      )}
      {data.saga && showSagaLink && section !== 'universo' && (
        <div className="rounded-lg border border-border bg-muted/40 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Saga</p>
            <p className="font-semibold text-lg">{data.saga.nome}</p>
            {data.saga.overview && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{data.saga.overview}</p>
            )}
          </div>
          <Link
            href={`/continuacoes?saga=${data.saga.id}`}
            className="text-sm font-medium text-primary hover:underline shrink-0"
          >
            Ver saga completa →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {itens.map((item) => (
          <ContinuacaoCard
            key={`${item.tipo}-${item.tmdbId}`}
            item={item}
            compact
            onClick={() => openSuperModal(stubMidia(item), item.tipo === 'serie' ? 'serie' : 'filme')}
          />
        ))}
      </div>
    </div>
  );
}
