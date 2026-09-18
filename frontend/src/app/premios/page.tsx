'use client';

import { useState, useEffect, useMemo } from 'react';
import { Award, Calendar, ChevronLeft, ChevronRight, Film, Gamepad2, Sparkles, Tv } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import MidiaCard from '@/components/media/MidiaCard';
import type { Filme, Serie, Anime, Jogo, TipoMidia } from '@/types';

type AwardItem = (Filme | Serie | Anime | Jogo) & { type: TipoMidia };

type MediaTypeFilter = 'todos' | 'filme' | 'serie' | 'anime' | 'jogo';

type AwardHighlight = {
  award: { nome: string; ano: number } | null;
  results: AwardItem[];
};

type AwardHighlights = {
  filmes: AwardHighlight;
  series: AwardHighlight;
  animes: AwardHighlight;
  jogos: AwardHighlight;
};

import PageHeader from '@/components/layout/PageHeader';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

const PAGE_SIZE = 48;

const MEDIA_TYPE_OPTIONS: { id: MediaTypeFilter; label: string }[] = [
  { id: 'todos', label: 'Tudo' },
  { id: 'filme', label: 'Filmes' },
  { id: 'serie', label: 'Séries' },
  { id: 'anime', label: 'Animes' },
  { id: 'jogo', label: 'Jogos' },
];

const isDefaultFilters = (
  mediaType: MediaTypeFilter,
  awardName: string,
  year: string,
) => mediaType === 'todos' && awardName === 'todos' && year === 'todos';

export default function PremiosPage() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [highlights, setHighlights] = useState<AwardHighlights | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAwardName, setSelectedAwardName] = useState<string>('todos');
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [selectedMediaType, setSelectedMediaType] = useState<MediaTypeFilter>('todos');

  const [availableAwards, setAvailableAwards] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const showHighlights = isDefaultFilters(selectedMediaType, selectedAwardName, selectedYear);
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await orbeNerdApi.getAwardFilters();
        setAvailableAwards(filters.names ?? []);
        setAvailableYears((filters.years ?? []).filter((y: number) => y > 0));
      } catch (error) {
        console.error('Erro ao carregar filtros de prêmios:', error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedAwardName, selectedYear, selectedMediaType]);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        if (showHighlights) {
          const data = await orbeNerdApi.getAwardHighlights();
          setHighlights(data);
          setAwards([]);
          setTotalResults(0);
        } else {
          const response = await orbeNerdApi.getAwards({
            awardName: selectedAwardName === 'todos' ? undefined : selectedAwardName,
            year: selectedYear === 'todos' ? undefined : parseInt(selectedYear, 10),
            mediaType: selectedMediaType === 'todos' ? undefined : selectedMediaType,
            page,
            limit: PAGE_SIZE,
          });
          setAwards(response.results ?? []);
          setTotalResults(response.total ?? 0);
          setHighlights(null);
        }
      } catch (error) {
        console.error('Erro ao carregar premiações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [selectedAwardName, selectedYear, selectedMediaType, page, showHighlights]);

  const highlightSections = useMemo(() => {
    if (!highlights) return [];
    const sections = [
      {
        key: 'filmes',
        title: 'Última premiação — Filmes',
        icon: Film,
        award: highlights.filmes.award,
        items: highlights.filmes.results,
      },
      {
        key: 'series',
        title: 'Última premiação — Séries',
        icon: Tv,
        award: highlights.series.award,
        items: highlights.series.results,
      },
      {
        key: 'animes',
        title: 'Última premiação — Animes',
        icon: Sparkles,
        award: highlights.animes.award,
        items: highlights.animes.results,
      },
      {
        key: 'jogos',
        title: 'Última premiação — Jogos',
        icon: Gamepad2,
        award: highlights.jogos.award,
        items: highlights.jogos.results,
      },
    ];
    if (selectedMediaType !== 'todos') {
      const map: Record<MediaTypeFilter, string> = {
        todos: '',
        filme: 'filmes',
        serie: 'series',
        anime: 'animes',
        jogo: 'jogos',
      };
      return sections.filter((section) => section.key === map[selectedMediaType]);
    }
    return sections;
  }, [highlights, selectedMediaType]);

  const applyHighlightFilter = (award: { nome: string; ano: number } | null, mediaType: MediaTypeFilter) => {
    if (!award) return;
    setSelectedMediaType(mediaType);
    setSelectedAwardName(award.nome);
    setSelectedYear(String(award.ano));
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <PageHeader
        title="Premiações"
        description="Vencedores e indicados dos maiores prêmios — por padrão, a última edição de cada categoria."
      />

      <div className="mb-6 md:mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 w-full">
            <Award className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedMediaType}
              onChange={(e) => setSelectedMediaType(e.target.value as MediaTypeFilter)}
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
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos os Prêmios</option>
              {availableAwards.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos os Anos</option>
              {availableYears.map((year) => (
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
      ) : showHighlights ? (
        <div className="space-y-12">
          {highlightSections.map((section) => (
            <section key={section.key} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                  {section.award && (
                    <span className="text-sm font-normal text-muted-foreground">
                      ({section.award.nome} · {section.award.ano})
                    </span>
                  )}
                </h2>
                {section.award && (
                  <button
                    type="button"
                    onClick={() =>
                      applyHighlightFilter(
                        section.award,
                        section.key === 'filmes'
                          ? 'filme'
                          : section.key === 'series'
                            ? 'serie'
                            : section.key === 'animes'
                              ? 'anime'
                              : 'jogo',
                      )
                    }
                    className="text-xs text-primary hover:underline"
                  >
                    Ver todos desta premiação
                  </button>
                )}
              </div>
              {section.items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                  {section.items.map((awardItem) => (
                    <MidiaCard
                      key={`${awardItem.type}-${awardItem.id}`}
                      midia={awardItem}
                      type={awardItem.type as TipoMidia}
                      userInteractions={userInteractions}
                      onInteraction={handleInteraction}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum vencedor cadastrado para esta categoria.</p>
              )}
            </section>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-muted-foreground">
              {`${totalResults} ${totalResults === 1 ? 'premiação encontrada' : 'premiações encontradas'}`}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40"
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {awards.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {awards.map((awardItem) => (
                <MidiaCard
                  key={`${awardItem.type}-${awardItem.id}`}
                  midia={awardItem}
                  type={awardItem.type as TipoMidia}
                  userInteractions={userInteractions}
                  onInteraction={handleInteraction}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold orbe-text-primary mb-2">Nenhuma premiação encontrada</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros para encontrar mais resultados</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
