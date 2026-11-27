'use client';

import { useEffect, useState } from 'react';
import { Award, Calendar, ExternalLink, Film, Gamepad2, Sparkles, Tv } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import PageHeader from '@/components/layout/PageHeader';

type MediaTypeFilter = 'todos' | 'filme' | 'serie' | 'anime' | 'jogo';
type CeremonyPhase = 'votacao_aberta' | 'aguardando' | 'encerrado';

type AwardNominee = {
  titulo: string;
  tipo: 'filme' | 'serie' | 'anime' | 'jogo';
  poster?: string | null;
};
type AwardCategory = {
  nome: string;
  indicados: AwardNominee[];
  vencedor: string | null;
};

type AwardCeremony = {
  id: string;
  nome: string;
  ano: number;
  tipos: Array<'filme' | 'serie' | 'anime' | 'jogo'>;
  data: string;
  descricao: string;
  url: string | null;
  fase: CeremonyPhase;
  votacaoAberta: boolean;
  avisoVotacao: string | null;
  urlVotacao: string | null;
  categorias: AwardCategory[];
};

type OpenFanVote = {
  id: string;
  nome: string;
  ano: number;
  aviso: string;
  url: string | null;
};

type AwardEventsPayload = {
  names: string[];
  years: number[];
  votacoesAbertas: OpenFanVote[];
  eventos: AwardCeremony[];
};

const MEDIA_TYPE_OPTIONS: { id: MediaTypeFilter; label: string }[] = [
  { id: 'todos', label: 'Tudo' },
  { id: 'filme', label: 'Filmes' },
  { id: 'serie', label: 'Séries' },
  { id: 'anime', label: 'Animes' },
  { id: 'jogo', label: 'Jogos' },
];

const TYPE_META = {
  filme: { label: 'Filmes', Icon: Film },
  serie: { label: 'Séries', Icon: Tv },
  anime: { label: 'Animes', Icon: Sparkles },
  jogo: { label: 'Jogos', Icon: Gamepad2 },
} as const;

const PHASE_LABEL: Record<CeremonyPhase, string> = {
  votacao_aberta: 'Votação aberta',
  aguardando: 'Aguardando cerimônia',
  encerrado: 'Cerimônia encerrada',
};

const PHASE_CLASS: Record<CeremonyPhase, string> = {
  votacao_aberta: 'bg-[var(--orbe-accent-2)]/15 text-[var(--orbe-accent-2)]',
  aguardando: 'bg-muted text-muted-foreground',
  encerrado: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
};

export default function PremiosPage() {
  const [payload, setPayload] = useState<AwardEventsPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedAwardName, setSelectedAwardName] = useState('todos');
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedMediaType, setSelectedMediaType] = useState<MediaTypeFilter>('todos');

  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      setIsLoading(true);
      setLoadError(false);
      try {
        const data = await orbeNerdApi.getAwardEvents({
          awardName: selectedAwardName === 'todos' ? undefined : selectedAwardName,
          year: selectedYear === 'todos' ? undefined : parseInt(selectedYear, 10),
          mediaType: selectedMediaType === 'todos' ? undefined : selectedMediaType,
        });
        if (!cancelled) setPayload(data);
      } catch (error) {
        console.error('Erro ao carregar premiações:', error);
        if (!cancelled) {
          setPayload(null);
          setLoadError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadEvents();
    return () => {
      cancelled = true;
    };
  }, [selectedAwardName, selectedYear, selectedMediaType]);

  const names = payload?.names ?? [];
  const years = payload?.years ?? [];
  const eventos = payload?.eventos ?? [];
  const votacoesAbertas = payload?.votacoesAbertas ?? [];

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <PageHeader
        title="Premiações"
        description="Eventos de premiação, os títulos que concorrem e, quando a cerimônia já aconteceu, quem venceu cada categoria."
      />

      <div className="mb-6 md:mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 w-full">
            <Award className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedMediaType}
              onChange={(e) => setSelectedMediaType(e.target.value as MediaTypeFilter)}
              aria-label="Tipo de mídia"
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MEDIA_TYPE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Award className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedAwardName}
              onChange={(e) => setSelectedAwardName(e.target.value)}
              aria-label="Prêmio"
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos os Prêmios</option>
              {names.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Ano"
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos os Anos</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-spinner h-8 w-8" />
        </div>
      ) : loadError ? (
        <div className="orbe-block bg-card rounded-[20px] p-10 text-center">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold orbe-text-primary mb-2">Não foi possível carregar as premiações</h2>
          <p className="text-muted-foreground">Tente novamente em alguns instantes.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {votacoesAbertas.map((votacao) => (
            <aside
              key={votacao.id}
              className="orbe-block bg-card rounded-[20px] border-l-4 border-[var(--orbe-accent-2)] p-4 md:p-5"
            >
              <p className="font-semibold orbe-text-primary">Votação dos fãs aberta</p>
              <p className="text-sm text-muted-foreground mt-1">{votacao.aviso}</p>
              {votacao.url && (
                <a
                  href={votacao.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary hover:underline"
                >
                  Votar no site oficial
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </aside>
          ))}

          {eventos.length === 0 ? (
            <div className="orbe-block bg-card rounded-[20px] p-10 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-semibold orbe-text-primary mb-2">Nenhum evento de premiação para esses filtros</h2>
              <p className="text-muted-foreground">Tente outro prêmio, ano ou tipo de mídia.</p>
            </div>
          ) : (
            eventos.map((evento) => (
              <article key={evento.id} className="orbe-block bg-card rounded-[20px] p-4 md:p-6 space-y-5">
                <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {evento.tipos.map((tipo) => {
                        const meta = TYPE_META[tipo];
                        const Icon = meta.Icon;
                        return (
                          <span key={tipo} className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                            <Icon className="h-4 w-4 text-primary" />
                            {meta.label}
                          </span>
                        );
                      })}
                    </div>
                    <h2 className="font-display text-lg sm:text-xl md:text-2xl orbe-text-primary break-words">
                      {evento.nome} {evento.ano}
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{evento.data}</span>
                    </p>
                    <p className="text-sm orbe-text-secondary">{evento.descricao}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${PHASE_CLASS[evento.fase]}`}>
                      {PHASE_LABEL[evento.fase]}
                    </span>
                    {evento.url && (
                      <a
                        href={evento.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="orbe-block-sm inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-[10px]"
                      >
                        Site
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {evento.categorias.map((categoria) => (
                    <section key={categoria.nome} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                      <h3 className="font-semibold orbe-text-primary">{categoria.nome}</h3>
                      {evento.fase === 'encerrado' && !categoria.vencedor && (
                        <p className="text-sm text-muted-foreground">O resultado desta categoria ainda não foi publicado.</p>
                      )}
                      <div>
                        <p className="mb-2 text-sm text-muted-foreground">Indicados</p>
                        <ul className="space-y-2">
                          {categoria.indicados.map((indicado) => {
                            const venceu = categoria.vencedor === indicado.titulo;
                            return (
                              <li
                                key={indicado.titulo}
                                className={`flex items-center gap-3 rounded-lg px-1 py-1 text-sm orbe-text-primary ${venceu ? 'bg-emerald-500/10 font-semibold' : ''}`}
                              >
                                <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                                  {indicado.poster ? (
                                    <img src={indicado.poster} alt="" className="h-full w-full object-cover" />
                                  ) : (
                                    <Film className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" aria-hidden />
                                  )}
                                </span>
                                <span className="min-w-0">
                                  <span className="block leading-snug">{indicado.titulo}</span>
                                  {venceu && <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">Venceu</span>}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
