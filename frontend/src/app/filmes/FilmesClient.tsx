'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter, Grid, Calendar, Star, TrendingUp, Monitor, Sparkles, Clapperboard } from 'lucide-react';
import { realApi } from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import type { Filme } from '@/types';
import type { FilmesPageData } from '@/lib/apiServer';

import PageHeader from '@/components/layout/PageHeader';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { HorizontalMediaRow } from '@/components/ui/HorizontalMediaRow';
import { useOrbeDataRefresh } from '@/lib/hooks/useOrbeDataRefresh';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useEventosResumo } from '@/lib/hooks/useEventosResumo';
import { useAppStore } from '@/stores/appStore';

const MONTHS = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
];

interface FilmesClientProps {
  initialData: FilmesPageData;
}

export default function FilmesClient({ initialData }: FilmesClientProps) {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const { resumo } = useEventosResumo();
  const [filmes, setFilmes] = useState<Filme[]>(initialData.results);
  const [totalResults, setTotalResults] = useState(initialData.total);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  const [availableGenres, setAvailableGenres] = useState<string[]>(initialData.filters.genres);
  const [availableYears, setAvailableYears] = useState<number[]>(initialData.filters.years);
  const [availableStatuses, setAvailableStatuses] = useState(initialData.filters.statuses);
  const [availablePlatforms, setAvailablePlatforms] = useState<string[]>(initialData.filters.platforms);

  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'em_cartaz' | 'em_breve' | 'populares'>('todos');
  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [selectedMonth, setSelectedMonth] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('todos');

  const filters = [
    { id: 'todos' as const, label: 'Todos os Filmes', icon: Grid },
    { id: 'em_cartaz' as const, label: 'Em Cartaz', icon: Calendar },
    { id: 'em_breve' as const, label: 'Em Breve', icon: TrendingUp },
    { id: 'populares' as const, label: 'Populares', icon: Star },
  ];

  const skipInitialFetch = useRef(true);

  const loadFilmes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await realApi.getFilmes({
        filtro: selectedFilter === 'todos' ? undefined : selectedFilter,
        genero: selectedGenre === 'todos' ? undefined : selectedGenre,
        ano: selectedYear === 'todos' ? undefined : selectedYear,
        mes: selectedMonth === 'todos' ? undefined : selectedMonth,
        status: selectedStatus === 'todos' ? undefined : selectedStatus,
        plataforma: selectedPlatform === 'todos' ? undefined : selectedPlatform,
      });
      setFilmes(response.results);
      setTotalResults(response.total_results);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFilter, selectedGenre, selectedYear, selectedMonth, selectedStatus, selectedPlatform]);

  useOrbeDataRefresh(loadFilmes);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    loadFilmes();
  }, [loadFilmes]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <PageHeader
        title="Filmes"
        description="Descubra os melhores filmes em cartaz, lançamentos e clássicos do cinema"
      />

      {resumo && resumo.proximos.filmes.length > 0 && (
        <CollapsibleSection id="filmes-o-que-vem-ai" title="O que vem aí" icon={Sparkles} className="mb-8">
          <HorizontalMediaRow
            items={resumo.proximos.filmes}
            type="filme"
            userInteractions={userInteractions}
            onInteraction={handleInteraction}
          />
        </CollapsibleSection>
      )}

      {resumo && resumo.destaques_recentes.filmes.length > 0 && (
        <CollapsibleSection id="filmes-em-cartaz-destaque" title="Em cartaz" icon={Clapperboard} className="mb-8">
          <HorizontalMediaRow
            items={resumo.destaques_recentes.filmes}
            type="filme"
            userInteractions={userInteractions}
            onInteraction={handleInteraction}
          />
        </CollapsibleSection>
      )}

      <div className="mb-6 md:mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted orbe-text-primary hover:bg-muted/80'
              }`}
            >
              <filter.icon className="h-4 w-4" />
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 w-full">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              disabled={isLoadingFilters}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="todos">Todos os Gêneros</option>
              {availableGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={isLoadingFilters}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="todos">Todos os Anos</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={isLoadingFilters}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="todos">Todos os Meses</option>
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Star className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={isLoadingFilters}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="todos">Todos os Status</option>
              {availableStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              disabled={isLoadingFilters}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="todos">Todas as Plataformas</option>
              {availablePlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          {isLoading ? 'Carregando...' : `${totalResults} ${totalResults === 1 ? 'filme encontrado' : 'filmes encontrados'}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-spinner h-8 w-8"></div>
        </div>
      ) : filmes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 items-stretch">
          {filmes.map((filme) => (
            <div key={filme.id} className="h-full w-full max-w-[210px] mx-auto">
              <MidiaCard
                midia={filme}
                type="filme"
                userInteractions={userInteractions}
                onInteraction={handleInteraction}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">
            Nenhum filme encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros para encontrar mais resultados
          </p>
        </div>
      )}
    </div>
  );
}
