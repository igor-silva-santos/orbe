'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clapperboard, Loader2 } from 'lucide-react';
import orbeNerdApi from '@/data/realApi';
import ContinuacaoCard from '@/components/continuacoes/ContinuacaoCard';
import { useAppStore } from '@/stores/appStore';
import type { ContinuacoesPayload, SagaSummary, SagasListResponse } from '@/types/continuacoes';
import type { Filme, Serie } from '@/types';

function stubMidia(item: ContinuacoesPayload['itens'][0]): Filme | Serie {
  const base = {
    id: item.tmdbId,
    titulo_curado: item.titulo,
    titulo_api: item.titulo,
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

export default function ContinuacoesClient() {
  const searchParams = useSearchParams();
  const sagaIdParam = searchParams?.get('saga') ?? null;
  const openSuperModal = useAppStore((s) => s.openSuperModal);

  const [sagas, setSagas] = useState<SagaSummary[]>([]);
  const [sagaDetail, setSagaDetail] = useState<ContinuacoesPayload | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    orbeNerdApi
      .listSagas()
      .then((res: SagasListResponse) => setSagas(res.sagas ?? []))
      .catch(() => setSagas([]))
      .finally(() => setLoadingList(false));
  }, []);

  const loadSaga = useCallback((id: number) => {
    setLoadingDetail(true);
    orbeNerdApi
      .getSaga(id)
      .then(setSagaDetail)
      .catch(() => setSagaDetail(null))
      .finally(() => setLoadingDetail(false));
  }, []);

  useEffect(() => {
    if (!sagaIdParam) {
      setSagaDetail(null);
      return;
    }
    const id = parseInt(sagaIdParam, 10);
    if (Number.isFinite(id)) loadSaga(id);
  }, [sagaIdParam, loadSaga]);

  const viewingSaga = Boolean(sagaIdParam && sagaDetail);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        {viewingSaga ? (
          <Link
            href="/continuacoes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas as sagas
          </Link>
        ) : null}
        <div className="flex items-center gap-3">
          <Clapperboard className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {viewingSaga ? sagaDetail?.saga?.nome ?? 'Saga' : 'Continuações'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {viewingSaga
                ? 'Ordem cronológica dos filmes desta trilogia ou saga.'
                : 'Trilogias e sagas para maratonar — do primeiro ao último filme.'}
            </p>
          </div>
        </div>
      </div>

      {viewingSaga ? (
        loadingDetail ? (
          <div className="flex justify-center py-16 text-muted-foreground gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            Carregando saga...
          </div>
        ) : sagaDetail ? (
          <div className="space-y-6">
            {sagaDetail.saga?.overview && (
              <p className="text-muted-foreground max-w-3xl">{sagaDetail.saga.overview}</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sagaDetail.itens.map((item) => (
                <ContinuacaoCard
                  key={item.tmdbId}
                  item={item}
                  onClick={() => openSuperModal(stubMidia(item), 'filme')}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Saga não encontrada.</p>
        )
      ) : loadingList ? (
        <div className="flex justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          Carregando sagas...
        </div>
      ) : sagas.length === 0 ? (
        <p className="text-muted-foreground">
          Nenhuma saga cadastrada ainda. Rode o sync de filmes para importar coleções do TMDB.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sagas.map((saga) => (
            <Link
              key={saga.id}
              href={`/continuacoes?saga=${saga.id}`}
              className="rounded-xl border border-border bg-card p-4 hover:bg-muted/50 transition-colors flex gap-4"
            >
              <div className="w-20 shrink-0">
                {saga.posterUrl ? (
                  <img src={saga.posterUrl} alt="" className="rounded-lg w-20 aspect-[2/3] object-cover" />
                ) : (
                  <div className="w-20 aspect-[2/3] rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    Saga
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-lg leading-tight">{saga.nome}</h2>
                <p className="text-sm text-muted-foreground mt-1">{saga.totalFilmes} filmes</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {saga.preview.map((p) => p.titulo).join(' · ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
