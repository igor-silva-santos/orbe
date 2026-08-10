'use client';

import { useState, useEffect } from 'react';
import { Award, Calendar } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import MidiaCard from '@/components/media/MidiaCard';
import type { Filme, Serie, Anime, Jogo } from '@/types';

interface AwardItem extends Filme, Serie, Anime, Jogo {
  type: 'filme' | 'serie' | 'anime' | 'jogo';
}

import PageHeader from '@/components/layout/PageHeader';

export default function PremiosPage() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAwardName, setSelectedAwardName] = useState<string>('todos');
  const [selectedYear, setSelectedYear] = useState<string>('todos');

  const [availableAwards, setAvailableAwards] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await orbeNerdApi.getAwardFilters();
        setAvailableAwards(filters.names);
        setAvailableYears(filters.years);
      } catch (error) {
        console.error('Erro ao carregar filtros de prêmios:', error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const loadAwards = async () => {
      setIsLoading(true);
      try {
        const response = await orbeNerdApi.getAwards({
          awardName: selectedAwardName === 'todos' ? undefined : selectedAwardName,
          year: selectedYear === 'todos' ? undefined : parseInt(selectedYear),
        });
        setAwards(response);
      } catch (error) {
        console.error('Erro ao carregar premiações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAwards();
  }, [selectedAwardName, selectedYear]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <PageHeader title="Premiações" description="Explore os vencedores e indicados dos maiores prêmios da indústria." />

      <div className="mb-6 md:mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Filtro por Nome do Prêmio */}
          <div className="flex items-center gap-2 w-full">
            <Award className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedAwardName} onChange={(e) => setSelectedAwardName(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="todos">Todos os Prêmios</option>
              {availableAwards.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          {/* Filtro por Ano */}
          <div className="flex items-center gap-2 w-full">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm orbe-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="todos">Todos os Anos</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          {isLoading ? 'Carregando...' : `${awards.length} ${awards.length === 1 ? 'premiação encontrada' : 'premiações encontradas'}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12"><div className="loading-spinner h-8 w-8"></div></div>
      ) : awards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {awards.map((awardItem) => (
            <MidiaCard key={`${awardItem.type}-${awardItem.id}`} midia={awardItem} type={awardItem.type} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4"><Award className="h-12 w-12 text-muted-foreground mx-auto" /></div>
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Nenhuma premiação encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros para encontrar mais resultados</p>
        </div>
      )}
    </div>
  );
}