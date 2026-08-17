'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownUp,
  ArrowLeft,
  Gift,
  RefreshCw,
  Tag,
  Sparkles,
  Clock,
  Search,
  TrendingUp,
} from 'lucide-react';
import realApi from '@/data/realApi';
import DealCard from '@/components/deals/DealCard';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sortDeals, sortOptionsForTab, type DealSortOption } from '@/lib/dealSort';
import {
  ALL_PLATFORM_FILTERS,
  availablePlatformFilters,
  filterByPlatform,
  filterBySearch,
  groupByPlatform,
} from '@/lib/dealFilters';
import type { DealsOverview, DealPlatform, UnifiedDeal } from '@/types/deals';

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;
const PAGE_SIZE = 24;

function formatFetchedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'agora';
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function DealsGrid({ deals, priorityCount = 6 }: { deals: UnifiedDeal[]; priorityCount?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
      {deals.map((deal, index) => (
        <DealCard key={deal.id} deal={deal} priority={index < priorityCount} />
      ))}
    </div>
  );
}

function LoadMoreButton({
  visibleCount,
  totalCount,
  onLoadMore,
}: {
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
}) {
  if (visibleCount >= totalCount) return null;
  return (
    <div className="flex justify-center pt-4">
      <button
        type="button"
        onClick={onLoadMore}
        className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium orbe-text-primary hover:bg-muted transition-colors"
      >
        Carregar mais ({Math.min(PAGE_SIZE, totalCount - visibleCount)} de {totalCount - visibleCount} restantes)
      </button>
    </div>
  );
}

function DealsByPlatform({
  deals,
  platformFilter,
  visibleCount,
}: {
  deals: UnifiedDeal[];
  platformFilter: DealPlatform | 'all';
  visibleCount: number;
}) {
  const filtered = useMemo(
    () => filterByPlatform(deals, platformFilter),
    [deals, platformFilter],
  );
  const visible = filtered.slice(0, visibleCount);
  const byPlatform = useMemo(() => groupByPlatform(visible), [visible]);

  if (filtered.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-10 text-center">
        <p className="text-muted-foreground">Nenhum jogo nesta plataforma no momento.</p>
      </div>
    );
  }

  if (platformFilter !== 'all') {
    return <DealsGrid deals={visible} />;
  }

  return (
    <div className="space-y-8">
      {Object.entries(byPlatform).map(([platform, platformDeals]) => (
        <div key={platform}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {ALL_PLATFORM_FILTERS.find((f) => f.id === platform)?.label ?? platform}
          </h3>
          <DealsGrid deals={platformDeals} />
        </div>
      ))}
    </div>
  );
}

function PlatformFilters({
  options,
  platformFilter,
  onChange,
}: {
  options: typeof ALL_PLATFORM_FILTERS;
  platformFilter: DealPlatform | 'all';
  onChange: (value: DealPlatform | 'all') => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
            platformFilter === filter.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-border orbe-text-primary hover:bg-muted'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function SortSelect({
  value,
  onChange,
  tab,
}: {
  value: DealSortOption;
  onChange: (value: DealSortOption) => void;
  tab: 'gratis' | 'promocoes';
}) {
  const options = sortOptionsForTab(tab);
  return (
    <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <ArrowDownUp className="h-3.5 w-3.5 shrink-0" />
      <span className="sr-only">Ordenar por</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as DealSortOption)}
        className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs orbe-text-primary"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="relative block w-full sm:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar jogo..."
        className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm orbe-text-primary placeholder:text-muted-foreground"
      />
    </label>
  );
}

function SourceFooter({ data }: { data: DealsOverview }) {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t border-border pt-4">
      <span>Fontes:</span>
      <span className={data.sources.epic.ok ? 'text-emerald-600' : 'text-destructive'}>
        Epic ({data.sources.epic.count})
      </span>
      <span className={data.sources.gamerpower.ok ? 'text-emerald-600' : 'text-destructive'}>
        GamerPower ({data.sources.gamerpower.count})
      </span>
      <span className={data.sources.cheapshark.ok ? 'text-emerald-600' : 'text-destructive'}>
        CheapShark ({data.sources.cheapshark.count})
      </span>
      <span className={data.sources.steam?.ok ? 'text-emerald-600' : 'text-destructive'}>
        Steam ({data.sources.steam?.count ?? 0})
      </span>
      <span className="text-muted-foreground/80">· Preços USD convertidos com câmbio aproximado</span>
    </div>
  );
}

function JogosEmAltaBanner() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-start gap-3">
        <TrendingUp className="h-5 w-5 text-[var(--orbe-accent-2)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium orbe-text-primary">Promoções do catálogo Orbe</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Veja também descontos Steam dos jogos do nosso catálogo, com capas IGDB e notas da comunidade.
          </p>
        </div>
      </div>
      <Link
        href="/jogos-em-alta"
        className="inline-flex items-center justify-center rounded-lg border border-primary/40 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/5 transition-colors shrink-0"
      >
        Abrir Jogos em Alta
      </Link>
    </div>
  );
}

type PromocoesClientProps = {
  initialTab?: 'gratis' | 'promocoes';
};

export default function PromocoesClient({ initialTab = 'gratis' }: PromocoesClientProps) {
  const [data, setData] = useState<DealsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<DealPlatform | 'all'>('all');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [freeSort, setFreeSort] = useState<DealSortOption>('ending_soon');
  const [saleSort, setSaleSort] = useState<DealSortOption>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleTemporarios, setVisibleTemporarios] = useState(PAGE_SIZE);
  const [visiblePermanentes, setVisiblePermanentes] = useState(PAGE_SIZE);
  const [visiblePromocoes, setVisiblePromocoes] = useState(PAGE_SIZE);

  const loadDeals = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);
    try {
      const overview = await realApi.getDeals();
      setData(overview as DealsOverview);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar promoções e jogos grátis.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDeals();
  }, [loadDeals]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadDeals(true);
    }, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [loadDeals]);

  useEffect(() => {
    setVisibleTemporarios(PAGE_SIZE);
    setVisiblePermanentes(PAGE_SIZE);
    setVisiblePromocoes(PAGE_SIZE);
  }, [platformFilter, searchQuery, freeSort, saleSort, activeTab]);

  const gratisTemporarios = useMemo(() => {
    if (!data) return [];
    if (data.gratisTemporarios?.length) return data.gratisTemporarios;
    return data.gratis.filter((d) => d.freeTier !== 'permanent');
  }, [data]);

  const gratisPermanentes = useMemo(() => {
    if (!data) return [];
    if (data.gratisPermanentes?.length) return data.gratisPermanentes;
    return data.gratis.filter((d) => d.freeTier === 'permanent');
  }, [data]);

  const allFreeDeals = useMemo(
    () => [...gratisTemporarios, ...gratisPermanentes],
    [gratisTemporarios, gratisPermanentes],
  );

  const freePlatformOptions = useMemo(
    () => availablePlatformFilters(allFreeDeals),
    [allFreeDeals],
  );

  const salePlatformOptions = useMemo(
    () => availablePlatformFilters(data?.promocoes ?? []),
    [data?.promocoes],
  );

  const activePlatformOptions = activeTab === 'promocoes' ? salePlatformOptions : freePlatformOptions;

  useEffect(() => {
    if (platformFilter === 'all') return;
    const hasFilter = activePlatformOptions.some((option) => option.id === platformFilter);
    if (!hasFilter) setPlatformFilter('all');
  }, [activePlatformOptions, platformFilter]);

  const filteredTemporarios = useMemo(() => {
    const filtered = filterBySearch(
      filterByPlatform(gratisTemporarios, platformFilter),
      searchQuery,
    );
    return sortDeals(filtered, freeSort);
  }, [gratisTemporarios, platformFilter, searchQuery, freeSort]);

  const filteredPermanentes = useMemo(() => {
    const filtered = filterBySearch(
      filterByPlatform(gratisPermanentes, platformFilter),
      searchQuery,
    );
    return sortDeals(filtered, freeSort === 'ending_soon' ? 'title' : freeSort);
  }, [gratisPermanentes, platformFilter, searchQuery, freeSort]);

  const filteredPromocoes = useMemo(() => {
    if (!data) return [];
    const filtered = filterBySearch(
      filterByPlatform(data.promocoes, platformFilter),
      searchQuery,
    );
    return sortDeals(filtered, saleSort);
  }, [data, platformFilter, searchQuery, saleSort]);

  const permanentSectionDefaultOpen = filteredTemporarios.length === 0 && filteredPermanentes.length > 0;

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-[var(--orbe-divider)] py-10 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--orbe-accent-2)] font-medium uppercase tracking-wide mb-4">
                Atualização automática a cada 10 min
              </p>
              <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight orbe-text-primary flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-[var(--orbe-accent-2)] shrink-0" />
                Promoções & Jogos Grátis
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
                Ofertas gratuitas e promoções reunidas da Epic Games, Steam, GamerPower e CheapShark — preços normalizados em R$ quando possível.
              </p>
              {data?.fetchedAt && (
                <p className="text-xs text-muted-foreground mt-3">
                  Última atualização: {formatFetchedAt(data.fetchedAt)}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadDeals(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 self-start md:self-auto bg-primary text-primary-foreground font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Atualizar agora
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full max-w-[210px] aspect-[206/290] rounded-[20px] bg-skeleton orbe-shimmer" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-card rounded-lg border border-border p-10 text-center">
            <p className="text-muted-foreground font-medium">{error}</p>
            <button
              type="button"
              onClick={() => void loadDeals()}
              className="mt-4 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-lg"
            >
              Tentar novamente
            </button>
          </div>
        ) : data ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="h-auto flex-wrap gap-1 p-1 w-full sm:w-auto">
              <TabsTrigger value="gratis" className="gap-2 px-4 py-2">
                <Gift className="h-4 w-4" />
                Jogos de Graça
                <span className="text-xs opacity-70">
                  ({filterBySearch(filterByPlatform(allFreeDeals, platformFilter), searchQuery).length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="promocoes" className="gap-2 px-4 py-2">
                <Tag className="h-4 w-4" />
                Promoções
                <span className="text-xs opacity-70">({filteredPromocoes.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gratis" className="space-y-10 mt-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-end">
                  <SortSelect value={freeSort} onChange={setFreeSort} tab="gratis" />
                </div>
              </div>

              <PlatformFilters
                options={freePlatformOptions}
                platformFilter={platformFilter}
                onChange={setPlatformFilter}
              />

              <section className="space-y-4">
                <div>
                  <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    Estão de graça
                    <span className="text-sm font-normal text-muted-foreground">
                      ({filteredTemporarios.length})
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Jogos que custavam e estão com 100% de desconto por tempo limitado — resgate antes que acabe.
                  </p>
                </div>

                {filteredTemporarios.length === 0 ? (
                  <div className="bg-card rounded-lg border border-border p-10 text-center">
                    <p className="text-muted-foreground">
                      Nenhum jogo temporariamente grátis nesta plataforma no momento.
                    </p>
                  </div>
                ) : (
                  <>
                    <DealsByPlatform
                      deals={filteredTemporarios}
                      platformFilter={platformFilter}
                      visibleCount={visibleTemporarios}
                    />
                    <LoadMoreButton
                      visibleCount={visibleTemporarios}
                      totalCount={filteredTemporarios.length}
                      onLoadMore={() => setVisibleTemporarios((count) => count + PAGE_SIZE)}
                    />
                  </>
                )}
              </section>

              <CollapsibleSection
                id="promocoes-jogos-sempre-gratis"
                title="São de graça"
                icon={Gift}
                defaultOpen={permanentSectionDefaultOpen}
              >
                <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                  Jogos free-to-play ou com preço base zero — separados das promoções por tempo limitado.
                </p>
                {filteredPermanentes.length > 0 ? (
                  <>
                    <DealsByPlatform
                      deals={filteredPermanentes}
                      platformFilter={platformFilter}
                      visibleCount={visiblePermanentes}
                    />
                    <LoadMoreButton
                      visibleCount={visiblePermanentes}
                      totalCount={filteredPermanentes.length}
                      onLoadMore={() => setVisiblePermanentes((count) => count + PAGE_SIZE)}
                    />
                  </>
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-muted-foreground text-sm">Nenhum jogo permanentemente grátis no momento.</p>
                  </div>
                )}
              </CollapsibleSection>

              <SourceFooter data={data} />
            </TabsContent>

            <TabsContent value="promocoes" className="space-y-4 mt-0">
              <JogosEmAltaBanner />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2">
                    <Tag className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                    Melhores promoções
                    <span className="text-sm font-normal text-muted-foreground">
                      ({filteredPromocoes.length})
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Descontos na Steam, Epic e lojas parceiras — valores em R$ (câmbio aproximado para ofertas internacionais).
                  </p>
                </div>
                <SortSelect value={saleSort} onChange={setSaleSort} tab="promocoes" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <PlatformFilters
                  options={salePlatformOptions}
                  platformFilter={platformFilter}
                  onChange={setPlatformFilter}
                />
              </div>

              {filteredPromocoes.length > 0 ? (
                <>
                  <DealsGrid
                    deals={filteredPromocoes.slice(0, visiblePromocoes)}
                    priorityCount={6}
                  />
                  <LoadMoreButton
                    visibleCount={visiblePromocoes}
                    totalCount={filteredPromocoes.length}
                    onLoadMore={() => setVisiblePromocoes((count) => count + PAGE_SIZE)}
                  />
                </>
              ) : (
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <p className="text-muted-foreground text-sm">Nenhuma promoção destacada nesta plataforma no momento.</p>
                </div>
              )}

              <SourceFooter data={data} />
            </TabsContent>
          </Tabs>
        ) : null}
      </main>
    </div>
  );
}
