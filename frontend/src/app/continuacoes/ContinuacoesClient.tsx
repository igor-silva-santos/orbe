'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clapperboard, Film, Loader2, Sparkles, Tv } from 'lucide-react';
import orbeNerdApi from '@/data/realApi';
import ContinuacaoCard from '@/components/continuacoes/ContinuacaoCard';
import { useAppStore } from '@/stores/appStore';
import type {
  ContinuacoesPayload,
  SagaSummary,
  SagasListResponse,
  UniversoPayload,
  UniversoSummary,
  UniversosListResponse,
} from '@/types/continuacoes';
import type { Filme, Serie } from '@/types';

type TabId = 'sagas' | 'universos';

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

function formatYearRange(primeira: string | null, ultima: string | null): string | null {
  if (!primeira && !ultima) return null;
  const start = primeira?.slice(0, 4) ?? '?';
  const end = ultima?.slice(0, 4) ?? '?';
  return start === end ? start : `${start} – ${end}`;
}

function SagaGridCard({ saga }: { saga: SagaSummary }) {
  return (
    <Link
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
  );
}

function UniverseListCard({ universe }: { universe: UniversoSummary }) {
  const yearRange = formatYearRange(universe.primeiraData, universe.ultimaData);

  return (
    <Link
      href={`/continuacoes?universo=${universe.id}`}
      className="rounded-xl border border-border bg-card overflow-hidden hover:bg-muted/40 transition-colors block"
    >
      <div className="p-5 border-b border-border/60 bg-muted/20 flex gap-4">
        <div className="w-16 shrink-0">
          {universe.posterUrl ? (
            <img src={universe.posterUrl} alt="" className="rounded-lg w-16 aspect-[2/3] object-cover" />
          ) : (
            <div className="w-16 aspect-[2/3] rounded-lg bg-muted flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="font-bold text-xl leading-tight">{universe.nome}</h2>
          <p className="text-sm text-muted-foreground mt-1">{universe.descricao}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {universe.totalFilmes} filmes · {universe.totalSeries} séries
            {yearRange ? ` · ${yearRange}` : ''}
          </p>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {universe.preview.map((item) => (
          <div key={`${item.tipo}-${item.tmdbId}`} className="rounded-lg border border-border overflow-hidden bg-muted/20">
            <div className="relative aspect-[2/3]">
              {item.posterUrl ? (
                <img src={item.posterUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">?</div>
              )}
              {item.ordem > 0 ? (
                <span className="absolute top-1 left-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5">
                  {item.ordem}
                </span>
              ) : null}
            </div>
            <p className="p-2 text-[11px] font-medium line-clamp-2 leading-snug">{item.titulo}</p>
          </div>
        ))}
      </div>
      <p className="px-4 pb-4 text-xs text-primary">Ver linha do tempo completa em ordem cronológica →</p>
    </Link>
  );
}

function ChronologicalTimeline({
  itens,
  onItemClick,
}: {
  itens: ContinuacoesPayload['itens'];
  onItemClick: (item: ContinuacoesPayload['itens'][0]) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {itens.map((item) => (
        <ContinuacaoCard
          key={`${item.tipo}-${item.tmdbId}`}
          item={item}
          onClick={() => onItemClick(item)}
          showOrder
        />
      ))}
    </div>
  );
}

export default function ContinuacoesClient() {
  const searchParams = useSearchParams();
  const sagaIdParam = searchParams?.get('saga') ?? null;
  const universoIdParam = searchParams?.get('universo') ?? null;
  const openSuperModal = useAppStore((s) => s.openSuperModal);

  const [activeTab, setActiveTab] = useState<TabId>(universoIdParam ? 'universos' : 'sagas');
  const [sagas, setSagas] = useState<SagaSummary[]>([]);
  const [universos, setUniversos] = useState<UniversoSummary[]>([]);
  const [sagaDetail, setSagaDetail] = useState<ContinuacoesPayload | null>(null);
  const [universoDetail, setUniversoDetail] = useState<UniversoPayload | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    Promise.all([
      orbeNerdApi.listSagas(),
      orbeNerdApi.listUniversos(),
    ])
      .then(([sagasRes, universosRes]: [SagasListResponse, UniversosListResponse]) => {
        setSagas(sagasRes.sagas ?? []);
        setUniversos(universosRes.universos ?? []);
      })
      .catch(() => {
        setSagas([]);
        setUniversos([]);
      })
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

  const loadUniverso = useCallback((id: string) => {
    setLoadingDetail(true);
    orbeNerdApi
      .getUniverso(id)
      .then(setUniversoDetail)
      .catch(() => setUniversoDetail(null))
      .finally(() => setLoadingDetail(false));
  }, []);

  useEffect(() => {
    if (universoIdParam) {
      setSagaDetail(null);
      loadUniverso(universoIdParam);
      setActiveTab('universos');
      return;
    }
    setUniversoDetail(null);
    if (!sagaIdParam) {
      setSagaDetail(null);
      return;
    }
    const id = parseInt(sagaIdParam, 10);
    if (Number.isFinite(id)) loadSaga(id);
  }, [sagaIdParam, universoIdParam, loadSaga, loadUniverso]);

  const viewingSaga = Boolean(sagaIdParam && sagaDetail);
  const viewingUniverso = Boolean(universoIdParam && universoDetail);
  const viewingDetail = viewingSaga || viewingUniverso;

  const handleItemClick = (item: ContinuacoesPayload['itens'][0]) => {
    openSuperModal(stubMidia(item), item.tipo);
  };

  const backHref = '/continuacoes';
  const backLabel = viewingUniverso ? 'Todos os universos' : 'Todas as sagas';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        {viewingDetail ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        ) : null}
        <div className="flex items-center gap-3">
          <Clapperboard className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {viewingUniverso
                ? universoDetail?.universo.nome ?? 'Universo'
                : viewingSaga
                  ? sagaDetail?.saga?.nome ?? 'Saga'
                  : 'Continuações'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {viewingUniverso
                ? 'Filmes e séries em ordem cronológica de lançamento.'
                : viewingSaga
                  ? 'Ordem cronológica dos filmes desta trilogia ou saga.'
                  : 'Sagas, universos cinematográficos e maratonas — do primeiro ao último título.'}
            </p>
          </div>
        </div>
      </div>

      {!viewingDetail && (
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab('sagas')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'sagas'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Film className="h-4 w-4" />
            Sagas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('universos')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'universos'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Universos cinematográficos
          </button>
        </div>
      )}

      {viewingUniverso ? (
        loadingDetail ? (
          <div className="flex justify-center py-16 text-muted-foreground gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            Carregando universo...
          </div>
        ) : universoDetail ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Film className="h-4 w-4" />
                {universoDetail.itens.filter((i) => i.tipo === 'filme').length} filmes
              </span>
              <span className="inline-flex items-center gap-1">
                <Tv className="h-4 w-4" />
                {universoDetail.itens.filter((i) => i.tipo === 'serie').length} séries
              </span>
              {formatYearRange(
                universoDetail.itens[0]?.releaseDate ?? null,
                universoDetail.itens[universoDetail.itens.length - 1]?.releaseDate ?? null,
              ) ? (
                <span>
                  {formatYearRange(
                    universoDetail.itens[0]?.releaseDate ?? null,
                    universoDetail.itens[universoDetail.itens.length - 1]?.releaseDate ?? null,
                  )}
                </span>
              ) : null}
            </div>
            {universoDetail.universo.descricao && (
              <p className="text-muted-foreground max-w-3xl">{universoDetail.universo.descricao}</p>
            )}
            <ChronologicalTimeline itens={universoDetail.itens} onItemClick={handleItemClick} />
          </div>
        ) : (
          <p className="text-muted-foreground">Universo não encontrado.</p>
        )
      ) : viewingSaga ? (
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
            <ChronologicalTimeline itens={sagaDetail.itens} onItemClick={handleItemClick} />
          </div>
        ) : (
          <p className="text-muted-foreground">Saga não encontrada.</p>
        )
      ) : loadingList ? (
        <div className="flex justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          Carregando...
        </div>
      ) : activeTab === 'universos' ? (
        universos.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhum universo encontrado no catálogo atual. Confira a aba Sagas ou rode o sync de filmes e séries.
          </p>
        ) : (
          <div className="space-y-6">
            {universos.map((universe) => (
              <UniverseListCard key={universe.id} universe={universe} />
            ))}
          </div>
        )
      ) : sagas.length === 0 ? (
        <p className="text-muted-foreground">
          Nenhuma saga cadastrada ainda. Rode o sync de filmes para importar coleções do TMDB.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sagas.map((saga) => (
            <SagaGridCard key={saga.id} saga={saga} />
          ))}
        </div>
      )}
    </div>
  );
}
