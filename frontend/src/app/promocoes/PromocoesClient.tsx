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
  AlertTriangle,
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
import type {
  DealsGratisResponse,
  DealsOverview,
  DealsPromocoesResponse,
  DealPlatform,
  UnifiedDeal,
} from '@/types/deals';

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;
const PAGE_SIZE = 48;

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

function DealsByPlatform({
  deals,
  platformFilter,
}: {
  deals: UnifiedDeal[];
  platformFilter: DealPlatform | 'all';
}) {
  const filtered = useMemo(
    () => filterByPlatform(deals, platformFilter),
    [deals, platformFilter],
  );
  const byPlatform = useMemo(() => groupByPlatform(filtered), [filtered]);

  if (filtered.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-10 text-center">
        <p className="text-muted-foreground">Nenhum jogo nesta plataforma no momento.</p>
      </div>
    );
  }

  if (platformFilter !== 'all') {
    return <DealsGrid deals={filtered} />;
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

function SourcesAlert({
  sources,
  health,
}: {
  sources?: DealsOverview['sources'];
  health?: DealsOverview['sourcesHealth'];
}) {
  if (!sources || health === 'ok' || !health) return null;

  const failed = Object.entries(sources).filter(([, status]) => !status.ok);
  if (failed.length === 0) return null;

  return (
    <div
      className={`rounded-lg border p-4 flex gap-3 ${
        health === 'critical'
          ? 'border-destructive/40 bg-destructive/10'
          : 'border-amber-500/40 bg-amber-500/10'
      }`}
    >
      <AlertTriangle
        className={`h-5 w-5 shrink-0 ${health === 'critical' ? 'text-destructive' : 'text-amber-600'}`}
      />
      <div className="text-sm">
        <p className="font-medium orbe-text-primary">
          {health === 'critical'
            ? 'A maioria das fontes está indisponível'
            : 'Algumas fontes estão indisponíveis'}
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Falha em: {failed.map(([name]) => name).join(', ')}. A lista pode estar incompleta — tente atualizar em alguns minutos.
        </p>
      </div>
    </div>
  );
}

function SourceFooter({
  data,
}: {
  data: Pick<DealsOverview, 'sources' | 'usdBrlRate'>;
}) {
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
      <span className={data.sources.orbe?.ok ? 'text-emerald-600' : 'text-destructive'}>
        Orbe ({data.sources.orbe?.count ?? 0})
      </span>
      {data.usdBrlRate != null && (
        <span className="text-muted-foreground/80">· USD/BRL: {data.usdBrlRate.toFixed(2)}</span>
      )}
    </div>
  );
}

type PromocoesClientProps = {
  initialTab?: 'gratis' | 'promocoes';
};

export default function PromocoesClient({ initialTab = 'gratis' }: PromocoesClientProps) {
  const [gratisData, setGratisData] = useState<DealsGratisResponse | null>(null);
  const [promoData, setPromoData] = useState<DealsPromocoesResponse | null>(null);
  const [promoDeals, setPromoDeals] = useState<UnifiedDeal[]>([]);
  const [catalogoSteam, setCatalogoSteam] = useState<UnifiedDeal[]>([]);
  const [promoPage, setPromoPage] = useState(1);
  const [promoHasMore, setPromoHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<DealPlatform | 'all'>('all');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [freeSort, setFreeSort] = useState<DealSortOption>('ending_soon');
  const [saleSort, setSaleSort] = useState<DealSortOption>('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const loadGratis = useCallback(async () => {
    const response = (await realApi.getFreeDeals()) as DealsGratisResponse;
    setGratisData(response);
    return response;
  }, []);

  const loadPromocoes = useCallback(async (page = 1, append = false) => {
    const response = (await realApi.getSaleDeals({ page, limit: PAGE_SIZE })) as DealsPromocoesResponse;
    setPromoData(response);
    setCatalogoSteam(response.catalogoSteam ?? []);
    setPromoPage(response.page);
    setPromoHasMore(response.hasMore);
    setPromoDeals((current) => (append ? [...current, ...response.deals] : response.deals));
    return response;
  }, []);

  const loadActiveTab = useCallback(
    async (silent = false, tab = activeTab) => {
      if (!silent) setIsLoading(true);
      else setIsRefreshing(true);
      setError(null);
      try {
        if (tab === 'gratis') {
          await loadGratis();
        } else {
          await loadPromocoes(1, false);
        }
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar promoções e jogos grátis.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [activeTab, loadGratis, loadPromocoes],
  );

  useEffect(() => {
    void loadActiveTab(false, initialTab);
  }, [initialTab, loadActiveTab]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadActiveTab(true);
    }, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [loadActiveTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'gratis' && !gratisData) void loadGratis();
    if (tab === 'promocoes' && !promoData) void loadPromocoes(1, false);
  };

  const handleLoadMorePromos = async () => {
    if (!promoHasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      await loadPromocoes(promoPage + 1, true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const fetchedAt = gratisData?.fetchedAt ?? promoData?.fetchedAt;
  const sources = gratisData?.sources ?? promoData?.sources;
  const sourcesHealth = gratisData?.sourcesHealth ?? promoData?.sourcesHealth;
  const usdBrlRate = gratisData?.usdBrlRate ?? promoData?.usdBrlRate;

  const gratisTemporarios = useMemo(() => {
    if (!gratisData) return [];
    return gratisData.gratisTemporarios?.length
      ? gratisData.gratisTemporarios
      : gratisData.deals.filter((d) => d.freeTier !== 'permanent');
  }, [gratisData]);

  const gratisPermanentes = useMemo(() => {
    if (!gratisData) return [];
    return gratisData.gratisPermanentes?.length
      ? gratisData.gratisPermanentes
      : gratisData.deals.filter((d) => d.freeTier === 'permanent');
  }, [gratisData]);

  const allFreeDeals = useMemo(
    () => [...gratisTemporarios, ...gratisPermanentes],
    [gratisTemporarios, gratisPermanentes],
  );

  const freePlatformOptions = useMemo(
    () => availablePlatformFilters(allFreeDeals),
    [allFreeDeals],
  );

  const salePool = useMemo(() => promoDeals, [promoDeals]);

  const salePlatformOptions = useMemo(
    () => availablePlatformFilters([...salePool, ...catalogoSteam]),
    [salePool, catalogoSteam],
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
    const filtered = filterBySearch(filterByPlatform(salePool, platformFilter), searchQuery);
    return sortDeals(filtered, saleSort);
  }, [salePool, platformFilter, searchQuery, saleSort]);

  const filteredCatalogo = useMemo(() => {
    const filtered = filterBySearch(filterByPlatform(catalogoSteam, platformFilter), searchQuery);
    return sortDeals(filtered, saleSort);
  }, [catalogoSteam, platformFilter, searchQuery, saleSort]);

  const permanentSectionDefaultOpen = filteredTemporarios.length === 0 && filteredPermanentes.length > 0;

  const footerData = sources
    ? { sources, usdBrlRate }
    : null;

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
                Ofertas ao vivo da Epic, Steam, GamerPower e CheapShark — com catálogo Orbe e câmbio USD/BRL atualizado.
              </p>
              {fetchedAt && (
                <p className="text-xs text-muted-foreground mt-3">
                  Última atualização: {formatFetchedAt(fetchedAt)}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadActiveTab(true)}
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
              onClick={() => void loadActiveTab()}
              className="mt-4 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-lg"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
            <SourcesAlert sources={sources} health={sourcesHealth} />

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
                <span className="text-xs opacity-70">
                  ({filteredPromocoes.length + filteredCatalogo.length})
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gratis" className="space-y-10 mt-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <SortSelect value={freeSort} onChange={setFreeSort} tab="gratis" />
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
                </div>

                {filteredTemporarios.length === 0 ? (
                  <div className="bg-card rounded-lg border border-border p-10 text-center">
                    <p className="text-muted-foreground">Nenhum jogo temporariamente grátis no momento.</p>
                  </div>
                ) : (
                  <DealsByPlatform deals={filteredTemporarios} platformFilter={platformFilter} />
                )}
              </section>

              <CollapsibleSection
                id="promocoes-jogos-sempre-gratis"
                title="São de graça"
                icon={Gift}
                defaultOpen={permanentSectionDefaultOpen}
              >
                {filteredPermanentes.length > 0 ? (
                  <DealsByPlatform deals={filteredPermanentes} platformFilter={platformFilter} />
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-muted-foreground text-sm">Nenhum jogo permanentemente grátis no momento.</p>
                  </div>
                )}
              </CollapsibleSection>

              {footerData && <SourceFooter data={footerData} />}
            </TabsContent>

            <TabsContent value="promocoes" className="space-y-6 mt-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <SortSelect value={saleSort} onChange={setSaleSort} tab="promocoes" />
              </div>

              <PlatformFilters
                options={salePlatformOptions}
                platformFilter={platformFilter}
                onChange={setPlatformFilter}
              />

              {filteredCatalogo.length > 0 && (
                <section className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                      Catálogo Orbe em promoção
                      <span className="text-sm font-normal text-muted-foreground">
                        ({filteredCatalogo.length})
                      </span>
                    </h2>
                    <Link
                      href="/jogos-em-alta"
                      className="text-xs text-primary hover:underline"
                    >
                      Ver em Jogos em Alta →
                    </Link>
                  </div>
                  <DealsGrid deals={filteredCatalogo} priorityCount={6} />
                </section>
              )}

              <section className="space-y-4">
                <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                  <Tag className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                  Ofertas ao vivo
                  <span className="text-sm font-normal text-muted-foreground">
                    ({filteredPromocoes.length})
                  </span>
                </h2>

                {filteredPromocoes.length > 0 ? (
                  <>
                    <DealsGrid deals={filteredPromocoes} priorityCount={6} />
                    {promoHasMore && !searchQuery && platformFilter === 'all' && (
                      <div className="flex justify-center pt-2">
                        <button
                          type="button"
                          onClick={() => void handleLoadMorePromos()}
                          disabled={isLoadingMore}
                          className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium orbe-text-primary hover:bg-muted transition-colors disabled:opacity-60"
                        >
                          {isLoadingMore ? 'Carregando...' : 'Carregar mais promoções'}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-muted-foreground text-sm">Nenhuma promoção ao vivo nesta plataforma.</p>
                  </div>
                )}
              </section>

              {footerData && <SourceFooter data={footerData} />}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
