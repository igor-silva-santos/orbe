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
  Gamepad2,
} from 'lucide-react';
import realApi from '@/data/realApi';
import DealCard from '@/components/deals/DealCard';
import HorizontalDealsRow from '@/components/deals/HorizontalDealsRow';
import JogosEmAltaContent from '@/components/jogos/JogosEmAltaContent';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  isBargainPromo,
  isSteamDeal,
  PROMO_BARGAIN_MAX_BRL,
} from '@/lib/dealPricing';
import { sortDeals, sortOptionsForTab, type DealSortOption } from '@/lib/dealSort';
import {
  ALL_PLATFORM_FILTERS,
  FREE_FEATURED_PLATFORMS,
  availablePlatformFilters,
  filterByPlatform,
  filterBySearch,
  getPlatformLabel,
  groupByPlatform,
} from '@/lib/dealFilters';
import type {
  DealsGratisResponse,
  DealsOverview,
  DealsPromocoesResponse,
  DealPlatform,
  UnifiedDeal,
} from '@/types/deals';

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

function excludePlatforms(deals: UnifiedDeal[], platforms: DealPlatform[]): UnifiedDeal[] {
  if (platforms.length === 0) return deals;
  return deals.filter((deal) => !platforms.includes(deal.platform));
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
            {getPlatformLabel(platform)}
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

function FreeQuickFilters({
  deals,
  platformFilter,
  onChange,
}: {
  deals: UnifiedDeal[];
  platformFilter: DealPlatform | 'all';
  onChange: (value: DealPlatform | 'all') => void;
}) {
  const quickOptions = FREE_FEATURED_PLATFORMS.filter((platform) =>
    deals.some((deal) => deal.platform === platform),
  );

  if (quickOptions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Destaques:</span>
      {quickOptions.map((platform) => {
        const isActive = platformFilter === platform;
        return (
          <button
            key={platform}
            type="button"
            onClick={() => onChange(isActive ? 'all' : platform)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border orbe-text-primary hover:bg-muted'
            }`}
          >
            {getPlatformLabel(platform)}
          </button>
        );
      })}
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
  data: Pick<DealsOverview, 'sources' | 'usdBrlRate' | 'usdBrlRateFetchedAt'>;
}) {
  const sources = data.sources;
  if (!sources?.epic || !sources.gamerpower || !sources.cheapshark) return null;

  return (
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t border-border pt-4">
      <span>Fontes:</span>
      <span className={sources.epic.ok ? 'text-emerald-600' : 'text-destructive'}>
        Epic ({sources.epic.count})
      </span>
      <span className={sources.gamerpower.ok ? 'text-emerald-600' : 'text-destructive'}>
        GamerPower ({sources.gamerpower.count})
      </span>
      <span className={sources.cheapshark.ok ? 'text-emerald-600' : 'text-destructive'}>
        CheapShark ({sources.cheapshark.count})
      </span>
      <span className={sources.itch?.ok ? 'text-emerald-600' : 'text-destructive'}>
        itch.io ({sources.itch?.count ?? 0})
      </span>
      <span className={sources.itad?.ok ? 'text-emerald-600' : 'text-destructive'}>
        ITAD ({sources.itad?.count ?? 0})
      </span>
      <span className={sources.steam?.ok ? 'text-emerald-600' : 'text-destructive'}>
        Steam ({sources.steam?.count ?? 0})
      </span>
      <span className={sources.orbe?.ok ? 'text-emerald-600' : 'text-destructive'}>
        Orbe ({sources.orbe?.count ?? 0})
      </span>
      {data.usdBrlRate != null && (
        <span className="text-muted-foreground/80">
          · USD/BRL: {data.usdBrlRate.toFixed(2)}
          {data.usdBrlRateFetchedAt && (
            <>
              {' '}
              (atualizada{' '}
              {new Date(data.usdBrlRateFetchedAt).toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
              )
            </>
          )}
        </span>
      )}
    </div>
  );
}

type PromocoesTab = 'gratis' | 'promocoes' | 'em-alta';

type PromocoesClientProps = {
  initialTab?: PromocoesTab;
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
  const [activeTab, setActiveTab] = useState<PromocoesTab>(initialTab);
  const [freeSort, setFreeSort] = useState<DealSortOption>('ending_soon');
  const [saleSort, setSaleSort] = useState<DealSortOption>('price_asc');
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

  const loadActiveTab = useCallback(async (silent = false, tab: PromocoesTab) => {
    if (tab === 'em-alta') {
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }
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
  }, [loadGratis, loadPromocoes]);

  useEffect(() => {
    void loadActiveTab(false, initialTab);
  }, [initialTab, loadActiveTab]);

  const handleTabChange = (tab: PromocoesTab) => {
    setActiveTab(tab);
    if (tab === 'gratis' && !gratisData) void loadGratis();
    if (tab === 'promocoes' && !promoData) void loadPromocoes(1, false);
    if (tab === 'em-alta') setIsLoading(false);
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
  const usdBrlRateFetchedAt = gratisData?.usdBrlRateFetchedAt ?? promoData?.usdBrlRateFetchedAt;

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

  const showFeaturedSections = platformFilter === 'all' && !searchQuery.trim();

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

  const featuredPlatformsWithDeals = useMemo(() => {
    if (!showFeaturedSections) return [];
    return FREE_FEATURED_PLATFORMS.filter(
      (platform) =>
        filteredTemporarios.some((deal) => deal.platform === platform) ||
        filteredPermanentes.some((deal) => deal.platform === platform),
    );
  }, [filteredTemporarios, filteredPermanentes, showFeaturedSections]);

  const mainTemporarios = useMemo(() => {
    if (!showFeaturedSections) return filteredTemporarios;
    return excludePlatforms(filteredTemporarios, featuredPlatformsWithDeals);
  }, [filteredTemporarios, featuredPlatformsWithDeals, showFeaturedSections]);

  const mainPermanentes = useMemo(() => {
    if (!showFeaturedSections) return filteredPermanentes;
    return excludePlatforms(filteredPermanentes, featuredPlatformsWithDeals);
  }, [filteredPermanentes, featuredPlatformsWithDeals, showFeaturedSections]);

  const featuredDealsByPlatform = useMemo(() => {
    const grouped: Partial<Record<DealPlatform, UnifiedDeal[]>> = {};
    for (const platform of featuredPlatformsWithDeals) {
      const pool = sortDeals(
        filterBySearch(
          [...gratisTemporarios, ...gratisPermanentes].filter((deal) => deal.platform === platform),
          searchQuery,
        ),
        freeSort === 'ending_soon' ? 'title' : freeSort,
      );
      grouped[platform] = pool;
    }
    return grouped;
  }, [featuredPlatformsWithDeals, gratisTemporarios, gratisPermanentes, searchQuery, freeSort]);

  const filteredPromocoes = useMemo(() => {
    const filtered = filterBySearch(filterByPlatform(salePool, platformFilter), searchQuery);
    return sortDeals(filtered, saleSort);
  }, [salePool, platformFilter, searchQuery, saleSort]);

  const filteredCatalogo = useMemo(() => {
    const filtered = filterBySearch(filterByPlatform(catalogoSteam, platformFilter), searchQuery);
    return sortDeals(filtered, saleSort);
  }, [catalogoSteam, platformFilter, searchQuery, saleSort]);

  const promosSteamAoVivo = useMemo(
    () => filteredPromocoes.filter((deal) => isSteamDeal(deal)),
    [filteredPromocoes],
  );

  const promosOutrasLojas = useMemo(
    () => filteredPromocoes.filter((deal) => !isSteamDeal(deal)),
    [filteredPromocoes],
  );

  const promosAbaixoDe30 = useMemo(() => {
    const seen = new Set<string>();
    const pool = [...filteredPromocoes, ...filteredCatalogo].filter((deal) => {
      if (seen.has(deal.id)) return false;
      seen.add(deal.id);
      return isBargainPromo(deal);
    });
    return sortDeals(pool, 'price_asc');
  }, [filteredPromocoes, filteredCatalogo]);

  const permanentSectionDefaultOpen = mainTemporarios.length === 0 && mainPermanentes.length > 0;

  const footerData = sources ? { sources, usdBrlRate, usdBrlRateFetchedAt } : null;

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
                Catálogo atualizado a cada minuto — clique em Atualizar para ver o mais recente
              </p>
              <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight orbe-text-primary flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-[var(--orbe-accent-2)] shrink-0" />
                Promoções & Jogos Grátis
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
                Ofertas ao vivo da Epic, EA App, Steam, GamerPower, CheapShark e itch.io
                — com catálogo Orbe, preços em BRL (ITAD quando configurado) e câmbio USD/BRL atualizado.
              </p>
              {fetchedAt && (
                <p className="text-xs text-muted-foreground mt-3">
                  Última atualização: {formatFetchedAt(fetchedAt)}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadActiveTab(true, activeTab)}
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
        {isLoading && activeTab !== 'em-alta' ? (
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
              onClick={() => void loadActiveTab(false, activeTab)}
              className="mt-4 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-lg"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(value) => handleTabChange(value as PromocoesTab)}
            className="space-y-8"
          >
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
              <TabsTrigger value="em-alta" className="gap-2 px-4 py-2">
                <Gamepad2 className="h-4 w-4" />
                Em Alta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gratis" className="space-y-10 mt-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <SortSelect value={freeSort} onChange={setFreeSort} tab="gratis" />
              </div>

              <FreeQuickFilters
                deals={allFreeDeals}
                platformFilter={platformFilter}
                onChange={setPlatformFilter}
              />

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
                      ({mainTemporarios.length})
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Jogos que custavam e estão com 100% de desconto por tempo limitado — vale resgatar agora.
                  </p>
                </div>

                {mainTemporarios.length === 0 ? (
                  <div className="bg-card rounded-lg border border-border p-10 text-center">
                    <p className="text-muted-foreground">Nenhum jogo temporariamente grátis no momento.</p>
                  </div>
                ) : (
                  <DealsByPlatform deals={mainTemporarios} platformFilter={platformFilter} />
                )}
              </section>

              {featuredPlatformsWithDeals.map((platform) => {
                const deals = featuredDealsByPlatform[platform] ?? [];
                if (deals.length === 0) return null;

                const sectionTitle =
                  platform === 'origin'
                    ? 'Grátis na EA'
                    : `Grátis na ${getPlatformLabel(platform)}`;

                return (
                  <CollapsibleSection
                    key={platform}
                    id={`promocoes-gratis-${platform}`}
                    title={sectionTitle}
                    icon={Gift}
                    defaultOpen
                  >
                    <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                      {platform === 'itch'
                        ? 'Jogos gratuitos na itch.io — incluindo ofertas permanentes e temporárias.'
                        : `Giveaways gratuitos na ${getPlatformLabel(platform)} via GamerPower.`}
                    </p>
                    <DealsGrid deals={deals} />
                  </CollapsibleSection>
                );
              })}

              <CollapsibleSection
                id="promocoes-jogos-sempre-gratis"
                title="São de graça"
                icon={Gift}
                defaultOpen={permanentSectionDefaultOpen}
              >
                <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                  Jogos que nunca custaram — free-to-play ou preço base zero.
                </p>
                {mainPermanentes.length > 0 ? (
                  <DealsByPlatform deals={mainPermanentes} platformFilter={platformFilter} />
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-muted-foreground text-sm">Nenhum jogo permanentemente grátis no momento.</p>
                  </div>
                )}
              </CollapsibleSection>

              {footerData && <SourceFooter data={footerData} />}
            </TabsContent>

            <TabsContent value="promocoes" className="space-y-6 mt-0">
              <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
                <p className="font-medium orbe-text-primary">Lista de desejos Steam (em breve)</p>
                <p className="text-muted-foreground text-xs mt-1 max-w-2xl">
                  Vamos permitir conectar sua conta Steam para cruzar a wishlist com promoções ativas.
                  Isso exige login OpenID da Steam e chave de API — estamos preparando essa integração.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <SortSelect value={saleSort} onChange={setSaleSort} tab="promocoes" />
              </div>

              <PlatformFilters
                options={salePlatformOptions}
                platformFilter={platformFilter}
                onChange={setPlatformFilter}
              />

              {showFeaturedSections && promosAbaixoDe30.length > 0 && (
                <section className="space-y-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 md:p-6">
                  <div>
                    <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                      <Tag className="h-5 w-5 text-emerald-600" />
                      Até R$ {PROMO_BARGAIN_MAX_BRL}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({promosAbaixoDe30.length})
                      </span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                      Promoções com preço final até R$ {PROMO_BARGAIN_MAX_BRL},00 — Steam e outras lojas,
                      ordenadas do menor para o maior.
                    </p>
                  </div>
                  <HorizontalDealsRow deals={promosAbaixoDe30} enableDrag priorityCount={10} />
                </section>
              )}

              {filteredCatalogo.length > 0 && (
                <section className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                      Promoções na Steam (catálogo)
                      <span className="text-sm font-normal text-muted-foreground">
                        ({filteredCatalogo.length})
                      </span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleTabChange('em-alta')}
                      className="text-xs text-primary hover:underline"
                    >
                      Ver aba Em Alta →
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    Jogos do catálogo Orbe com desconto na Steam — preços em BRL, ordenados por popularidade.
                  </p>
                  <HorizontalDealsRow deals={filteredCatalogo} enableDrag priorityCount={8} />
                </section>
              )}

              <section className="space-y-6">
                <div className="space-y-4">
                  <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                    <Tag className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                    Ofertas ao vivo — Steam
                    <span className="text-sm font-normal text-muted-foreground">
                      ({promosSteamAoVivo.length})
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl -mt-2">
                    Descontos na Steam (e catálogo Orbe) com preço em BRL na loja brasileira.
                  </p>

                  {promosSteamAoVivo.length > 0 ? (
                    <DealsGrid deals={promosSteamAoVivo} priorityCount={6} />
                  ) : (
                    <div className="bg-card rounded-lg border border-border p-8 text-center">
                      <p className="text-muted-foreground text-sm">
                        Nenhuma promoção ao vivo na Steam neste filtro.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                    <Tag className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                    Ofertas ao vivo — outras lojas
                    <span className="text-sm font-normal text-muted-foreground">
                      ({promosOutrasLojas.length})
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl -mt-2">
                    Epic, GOG, Ubisoft, itch.io e parceiros — valores convertidos para BRL quando a fonte
                    informa USD.
                  </p>

                  {promosOutrasLojas.length > 0 ? (
                    <DealsGrid deals={promosOutrasLojas} priorityCount={6} />
                  ) : (
                    <div className="bg-card rounded-lg border border-border p-8 text-center">
                      <p className="text-muted-foreground text-sm">
                        Nenhuma promoção ao vivo em outras lojas neste filtro.
                      </p>
                    </div>
                  )}
                </div>

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
              </section>

              {footerData && <SourceFooter data={footerData} />}
            </TabsContent>

            <TabsContent value="em-alta" className="space-y-6 mt-0">
              <JogosEmAltaContent showPromocoesBanner compact />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
