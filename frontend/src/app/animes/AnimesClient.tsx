'use client';

import { useState, useEffect, useRef } from 'react';
import { Filter, Calendar, Star, BookOpen, Layers } from 'lucide-react';
import { realApi } from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import type { Anime } from '@/types';
import type { AnimesPageData } from '@/lib/apiServer';

import PageHeader from '@/components/layout/PageHeader';

interface AnimesClientProps {
  initialData: AnimesPageData;
}

export default function AnimesClient({ initialData }: AnimesClientProps) {
  const [animes, setAnimes] = useState<Anime[]>(initialData.results);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  const [availableGenres, setAvailableGenres] = useState<string[]>(initialData.filters.genres);
  const [availableYears, setAvailableYears] = useState<number[]>(initialData.filters.years);
  const [availableFormats, setAvailableFormats] = useState<string[]>(initialData.filters.formats);
  const [availableSources, setAvailableSources] = useState<string[]>(initialData.filters.sources);
  const [availableStatuses, setAvailableStatuses] = useState<string[]>(initialData.filters.statuses);

  // Estados para os filtros selecionados
  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [selectedFormat, setSelectedFormat] = useState<string>('todos');
  const [selectedSource, setSelectedSource] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');

  const skipInitialFetch = useRef(true);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const loadAnimes = async () => {
      setIsLoading(true);
      try {
        const response = await realApi.getAnimes({
          genero: selectedGenre === 'todos' ? undefined : selectedGenre,
          ano: selectedYear === 'todos' ? undefined : selectedYear,
          formato: selectedFormat === 'todos' ? undefined : selectedFormat,
          fonte: selectedSource === 'todos' ? undefined : selectedSource,
          status: selectedStatus === 'todos' ? undefined : selectedStatus,
        });
        setAnimes(response.results);
      } catch (error) {
        console.error('Erro ao carregar animes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimes();
  }, [selectedGenre, selectedYear, selectedFormat, selectedSource, selectedStatus]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <PageHeader title="Animes" description="Navegue pelo universo dos animes, das últimas temporadas aos clássicos." />

      <div className="mb-6 md:mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Gênero */}
          <div className="flex items-center gap-2 w-full">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Gêneros</option>
              {availableGenres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          {/* Ano */}
          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Anos</option>
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          {/* Formato */}
          <div className="flex items-center gap-2 w-full">
            <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Formatos</option>
              {availableFormats.map(f => <option key={f} value={f!}>{f}</option>)}
            </select>
          </div>
          {/* Fonte */}
          <div className="flex items-center gap-2 w-full">
            <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todas as Fontes</option>
              {availableSources.map(s => <option key={s} value={s!}>{s}</option>)}
            </select>
          </div>
          {/* Status */}
          <div className="flex items-center gap-2 w-full">
            <Star className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Status</option>
              {availableStatuses.map(s => <option key={s} value={s!}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          {isLoading ? 'Carregando...' : `${animes.length} ${animes.length === 1 ? 'anime encontrado' : 'animes encontrados'}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12"><div className="loading-spinner h-8 w-8"></div></div>
      ) : animes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {animes.map((anime) => (
            <MidiaCard key={anime.id} midia={anime} type="anime" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4"><Filter className="h-12 w-12 text-muted-foreground mx-auto" /></div>
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Nenhum anime encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros para encontrar mais resultados</p>
        </div>
      )}
    </div>
  );
}