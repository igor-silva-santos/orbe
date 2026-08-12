'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter, Gamepad2, Star, Calendar, Sparkles } from 'lucide-react';
import { realApi } from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import type { Jogo } from '@/types';
import type { JogosPageData } from '@/lib/apiServer';
import { useOrbeDataRefresh } from '@/lib/hooks/useOrbeDataRefresh';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useEventosResumo } from '@/lib/hooks/useEventosResumo';
import { useAppStore } from '@/stores/appStore';

import PageHeader from '@/components/layout/PageHeader';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { HorizontalMediaRow } from '@/components/ui/HorizontalMediaRow';
import { GameEventCard } from '@/components/ui/GameEventCard';

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

interface JogosClientProps {
  initialData: JogosPageData;
}

export default function JogosClient({ initialData }: JogosClientProps) {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const { resumo } = useEventosResumo();
  const [jogos, setJogos] = useState<Jogo[]>(initialData.results);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  const [availableGenres, setAvailableGenres] = useState<string[]>(initialData.filters.genres);
  const [availablePlatforms, setAvailablePlatforms] = useState<string[]>(initialData.filters.platforms);
  const [availableGameModes, setAvailableGameModes] = useState<string[]>(initialData.filters.gameModes);
  const [availableYears, setAvailableYears] = useState<number[]>(initialData.filters.years ?? []);

  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('todos');
  const [selectedGameMode, setSelectedGameMode] = useState<string>('todos');
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [selectedMonth, setSelectedMonth] = useState<string>('todos');

  const skipInitialFetch = useRef(true);

  const loadJogos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await realApi.getJogos({
        genero: selectedGenre === 'todos' ? undefined : selectedGenre,
        plataforma: selectedPlatform === 'todos' ? undefined : selectedPlatform,
        modo: selectedGameMode === 'todos' ? undefined : selectedGameMode,
        ano: selectedYear === 'todos' ? undefined : selectedYear,
        mes: selectedMonth === 'todos' ? undefined : selectedMonth,
      });
      setJogos(response.results);
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGenre, selectedPlatform, selectedGameMode, selectedYear, selectedMonth]);

  useOrbeDataRefresh(loadJogos);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    loadJogos();
  }, [loadJogos]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <PageHeader title="Jogos" description="Explore o vasto universo dos games, dos indies aos blockbusters." />

      {resumo && resumo.proximos.jogos.length > 0 && (
        <CollapsibleSection id="jogos-o-que-vem-ai" title="O que vem aí" icon={Sparkles} className="mb-8">
          <HorizontalMediaRow
            items={resumo.proximos.jogos}
            type="jogo"
            userInteractions={userInteractions}
            onInteraction={handleInteraction}
          />
        </CollapsibleSection>
      )}

      {resumo && resumo.destaques_recentes.eventos.length > 0 && (
        <CollapsibleSection id="jogos-eventos-recentes" title="Eventos recentes" icon={Gamepad2} className="mb-8">
          <div className="space-y-6">
            {resumo.destaques_recentes.eventos.map((evento) => (
              <GameEventCard
                key={`recent-${evento.id}`}
                evento={evento}
                userInteractions={userInteractions}
                onInteraction={handleInteraction}
              />
            ))}
          </div>
        </CollapsibleSection>
      )}

      <div className="mb-6 md:mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 w-full">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Gêneros</option>
              {availableGenres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Anos</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Meses</option>
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Gamepad2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todas as Plataformas</option>
              {availablePlatforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Star className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedGameMode} onChange={(e) => setSelectedGameMode(e.target.value)} disabled={isLoadingFilters} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
              <option value="todos">Todos os Modos</option>
              {availableGameModes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          {isLoading ? 'Carregando...' : `${jogos.length} ${jogos.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12"><div className="loading-spinner h-8 w-8"></div></div>
      ) : jogos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 items-stretch">
          {jogos.map((jogo) => (
            <div key={jogo.id} className="h-full w-full max-w-[210px] mx-auto">
              <MidiaCard midia={jogo} type="jogo" userInteractions={userInteractions} onInteraction={handleInteraction} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4"><Filter className="h-12 w-12 text-muted-foreground mx-auto" /></div>
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Nenhum jogo encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros para encontrar mais resultados</p>
        </div>
      )}
    </div>
  );
}
