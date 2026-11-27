'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Film, Gamepad2, Sparkles, Tv, User, Users } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import MidiaCard from '@/components/media/MidiaCard';
import orbeNerdApi from '@/lib/api';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';
import type { Anime, Filme, Jogo, Serie, TipoMidia } from '@/types';

type MatchTipo = TipoMidia;
type MatchModo = 'solo' | 'dupla';
type GamePlay = 'multiplayer' | 'single';
type Step = 'tipo' | 'companhia' | 'modo-jogo' | 'origem' | 'escolher' | 'resultado';

type PickedTitle = {
  id: number;
  titulo: string;
  poster: string | null;
};

type SearchHit = {
  id: number;
  titulo_api?: string;
  titulo_curado?: string;
  poster_url_api?: string | null;
};

type MatchItem = (Filme | Serie | Anime | Jogo) & {
  generos_em_comum?: string[];
};

type MatchResponse = {
  tipo: MatchTipo;
  modo: MatchModo;
  reason: string;
  message: string;
  sementes: MatchItem[];
  itens: MatchItem[];
};

const TIPOS: { id: MatchTipo; label: string; icon: typeof Film }[] = [
  { id: 'filme', label: 'Filme', icon: Film },
  { id: 'serie', label: 'Série', icon: Tv },
  { id: 'anime', label: 'Anime', icon: Sparkles },
  { id: 'jogo', label: 'Jogo', icon: Gamepad2 },
];

const SEARCH_KEY: Record<MatchTipo, 'filmes' | 'series' | 'animes' | 'jogos'> = {
  filme: 'filmes',
  serie: 'series',
  anime: 'animes',
  jogo: 'jogos',
};

const chipClass = (active: boolean) =>
  `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-card orbe-text-primary hover:bg-muted'
  }`;

function titleOf(hit: SearchHit | MatchItem): string {
  return ('titulo_curado' in hit && hit.titulo_curado) || hit.titulo_api || 'Sem título';
}

function PosterThumb({ src, alt }: { src: string | null | undefined; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Film className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" aria-hidden />
      )}
    </span>
  );
}

export default function MatchClient() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [step, setStep] = useState<Step>('tipo');
  const [tipo, setTipo] = useState<MatchTipo | null>(null);
  const [modo, setModo] = useState<MatchModo | null>(null);
  const [gamePlay, setGamePlay] = useState<GamePlay | null>(null);
  const [slot, setSlot] = useState<0 | 1>(0);
  const [picks, setPicks] = useState<Array<PickedTitle | null>>([null, null]);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResponse | null>(null);

  useEffect(() => {
    if (step !== 'escolher' || !tipo) return;
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      setSearchError(null);
      setSearching(false);
      return;
    }
    let cancelled = false;
    const handle = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await orbeNerdApi.search(q, SEARCH_KEY[tipo]);
        if (cancelled) return;
        const list = (data?.[SEARCH_KEY[tipo]] ?? []) as SearchHit[];
        setHits(list.slice(0, 8));
        setSearchError(null);
      } catch {
        if (!cancelled) {
          setHits([]);
          setSearchError('Não foi possível buscar no catálogo agora.');
        }
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query, step, tipo]);

  const goTipo = (next: MatchTipo) => {
    setTipo(next);
    setModo(null);
    setGamePlay(null);
    setPicks([null, null]);
    setResult(null);
    setNotice(null);
    setError(null);
    setStep('companhia');
  };

  const goModo = (next: MatchModo) => {
    setModo(next);
    setPicks([null, null]);
    setNotice(null);
    setError(null);
    setResult(null);
    if (tipo === 'jogo') setStep('modo-jogo');
    else setStep(next === 'solo' ? 'origem' : 'escolher');
  };

  const goGamePlay = (next: GamePlay) => {
    setGamePlay(next);
    setNotice(null);
    setError(null);
    setStep(modo === 'solo' ? 'origem' : 'escolher');
  };

  const pickTitle = (hit: SearchHit) => {
    const other = slot === 0 ? 1 : 0;
    if (modo === 'dupla' && picks[other]?.id === hit.id) {
      setNotice('Cada pessoa escolhe um título diferente.');
      return;
    }
    setNotice(null);
    const picked: PickedTitle = {
      id: hit.id,
      titulo: titleOf(hit),
      poster: hit.poster_url_api ?? null,
    };
    setPicks((current) => {
      const next = [...current];
      next[slot] = picked;
      return next;
    });
    if (modo === 'dupla' && slot === 0) setSlot(1);
  };

  const calcular = async (origem: 'base' | 'titulos') => {
    if (!tipo || !modo) return;
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const ids = origem === 'titulos'
        ? picks.slice(0, modo === 'dupla' ? 2 : 1).map((item) => item?.id).filter((id): id is number => Boolean(id))
        : [];
      const data = await orbeNerdApi.getMatch({
        tipo,
        modo,
        base: origem === 'base' ? 1 : undefined,
        ids: ids.length ? ids.join(',') : undefined,
        jogo: tipo === 'jogo' && gamePlay ? gamePlay : undefined,
      }) as MatchResponse;
      if (data.reason === 'sem_base' || data.reason === 'precisa_login') {
        setNotice(data.message);
        setStep('escolher');
        return;
      }
      setResult(data);
      setStep('resultado');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível calcular o match.');
    } finally {
      setLoading(false);
    }
  };

  const picksReady = modo === 'dupla' ? Boolean(picks[0] && picks[1]) : Boolean(picks[0]);
  const sameTitle = modo === 'dupla' && picks[0] && picks[1] && picks[0].id === picks[1].id;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Match"
        description="Escolha filme, série, anime ou jogo. O Orbe compara os atributos do que você gosta e sugere outro título no mesmo caminho."
      />

      {step !== 'tipo' && (
        <button
          type="button"
          onClick={() => {
            setError(null);
            if (step === 'companhia') setStep('tipo');
            else if (step === 'modo-jogo') setStep('companhia');
            else if (step === 'origem') setStep(tipo === 'jogo' ? 'modo-jogo' : 'companhia');
            else if (step === 'escolher') setStep(modo === 'solo' ? 'origem' : tipo === 'jogo' ? 'modo-jogo' : 'companhia');
            else setStep(modo === 'solo' ? 'origem' : 'escolher');
          }}
          className="mb-6 text-sm text-muted-foreground hover:text-foreground"
        >
          Voltar
        </button>
      )}

      {step === 'tipo' && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TIPOS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" onClick={() => goTipo(item.id)} className="rounded-2xl border border-border bg-card p-5 text-left hover:border-primary">
                <Icon className="h-6 w-6 text-primary mb-3" />
                <span className="font-semibold orbe-text-primary">{item.label}</span>
              </button>
            );
          })}
        </section>
      )}

      {step === 'companhia' && (
        <section className="grid sm:grid-cols-2 gap-3">
          <button type="button" onClick={() => goModo('solo')} className="rounded-2xl border border-border bg-card p-5 text-left hover:border-primary">
            <User className="h-6 w-6 text-primary mb-3" />
            <span className="block font-semibold orbe-text-primary">Sozinho</span>
            <span className="mt-1 block text-sm text-muted-foreground">Usa um título ou o que você já marcou como gostei e favorito.</span>
          </button>
          <button type="button" onClick={() => goModo('dupla')} className="rounded-2xl border border-border bg-card p-5 text-left hover:border-primary">
            <Users className="h-6 w-6 text-primary mb-3" />
            <span className="block font-semibold orbe-text-primary">Em dupla</span>
            <span className="mt-1 block text-sm text-muted-foreground">Cada pessoa escolhe um título nesta tela. Os dois são do mesmo tipo.</span>
          </button>
        </section>
      )}

      {step === 'modo-jogo' && (
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground">O match segue o modo que você escolher. Jogo com os dois modos pode aparecer nos dois.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chipClass(false)} onClick={() => goGamePlay('multiplayer')}>Multijogador</button>
            <button type="button" className={chipClass(false)} onClick={() => goGamePlay('single')}>Um jogador</button>
          </div>
        </section>
      )}

      {step === 'origem' && (
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground">A base pessoal reúne favoritos e títulos marcados como gostei ou amei.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chipClass(false)} disabled={loading} onClick={() => void calcular('base')}>
              {loading ? 'Calculando...' : 'Usar o que eu já marquei'}
            </button>
            <button type="button" className={chipClass(false)} onClick={() => { setNotice(null); setStep('escolher'); }}>
              Escolher um título
            </button>
          </div>
          {notice && <EmptyNote message={notice} login={notice.includes('conta')} />}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </section>
      )}

      {step === 'escolher' && tipo && (
        <section className="space-y-4">
          {notice && <EmptyNote message={notice} login={notice.includes('conta')} />}
          {modo === 'dupla' && (
            <div className="flex flex-wrap gap-2">
              {([0, 1] as const).map((index) => (
                <button key={index} type="button" className={chipClass(slot === index)} onClick={() => setSlot(index)}>
                  Pessoa {index + 1}: {picks[index]?.titulo ?? 'escolher'}
                </button>
              ))}
            </div>
          )}
          {picks.some(Boolean) && (
            <div className="flex flex-wrap gap-3">
              {picks.filter((pick): pick is PickedTitle => Boolean(pick)).map((pick) => (
                <div key={pick.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
                  <PosterThumb src={pick.poster} alt={pick.titulo} />
                  <span className="text-sm font-medium orbe-text-primary">{pick.titulo}</span>
                </div>
              ))}
            </div>
          )}
          <label className="block text-sm text-muted-foreground">
            Buscar no catálogo
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={tipo === 'jogo' ? 'Nome do jogo' : 'Nome do título'}
              className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 orbe-text-primary"
            />
          </label>
          {searching && (
            <div className="space-y-2" aria-live="polite">
              <p className="text-sm text-muted-foreground">Buscando...</p>
              <ul className="space-y-2">
                {[0, 1, 2].map((index) => (
                  <li key={index} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
                    <span className="h-14 w-10 shrink-0 animate-pulse rounded-md bg-muted" />
                    <span className="h-3 w-40 animate-pulse rounded bg-muted" />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {searchError && <p className="text-sm text-muted-foreground">{searchError}</p>}
          {!searching && !searchError && query.trim().length >= 2 && hits.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum título com esse nome no catálogo.</p>
          )}
          {!searching && !loading && (
          <ul className="space-y-2">
            {hits.map((hit) => (
              <li key={hit.id}>
                <button type="button" onClick={() => pickTitle(hit)} className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 text-left hover:border-primary">
                  <PosterThumb src={hit.poster_url_api} alt={titleOf(hit)} />
                  <span className="font-medium orbe-text-primary">{titleOf(hit)}</span>
                </button>
              </li>
            ))}
          </ul>
          )}
          {sameTitle && <p className="text-sm text-muted-foreground">Cada pessoa escolhe um título diferente.</p>}
          <button
            type="button"
            disabled={!picksReady || Boolean(sameTitle) || loading}
            onClick={() => void calcular('titulos')}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {loading ? 'Calculando...' : 'Ver match'}
          </button>
          {loading && (
            <div className="flex flex-wrap gap-3" aria-live="polite">
              {picks.filter((pick): pick is PickedTitle => Boolean(pick)).map((pick) => (
                <div key={pick.id} className="flex items-center gap-3">
                  <PosterThumb src={pick.poster} alt={pick.titulo} />
                  <span className="text-sm text-muted-foreground">Calculando a partir de {pick.titulo}</span>
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </section>
      )}

      {step === 'resultado' && result && tipo && (
        <section className="space-y-6">
          <p className="text-sm text-muted-foreground">{result.message}</p>
          {result.sementes.length > 0 && (
            <p className="text-sm orbe-text-primary">
              A partir de {result.sementes.map((item) => titleOf(item)).join(result.modo === 'dupla' ? ' e ' : ', ')}.
            </p>
          )}
          {result.itens.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Nada para mostrar neste catálogo.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
              {result.itens.map((item) => (
                <div key={item.id} className="w-full max-w-[210px]">
                  <MidiaCard
                    midia={item}
                    type={tipo}
                    userInteractions={userInteractions}
                    onInteraction={handleInteraction}
                  />
                  {item.generos_em_comum && item.generos_em_comum.length > 0 && (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      Em comum: {item.generos_em_comum.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function EmptyNote({ message, login }: { message: string; login: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
      <p>{message}</p>
      {login && (
        <Link href="/login?redirect=/match" className="mt-2 inline-block font-medium text-primary">
          Entrar
        </Link>
      )}
    </div>
  );
}
