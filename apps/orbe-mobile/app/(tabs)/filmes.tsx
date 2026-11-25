import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFilmes, type FilmesQuery } from '@/api/filmes';
import { FilterChipRow, type FilterChip } from '@/components/FilterChipRow';
import { MediaCard } from '@/components/MediaCard';
import { colors } from '@/theme';
import type { CarouselCard } from '@/types/media';

const now = new Date();
const CURRENT_MONTH = String(now.getMonth() + 1);
const CURRENT_YEAR = String(now.getFullYear());

const FILTER_CHIPS: FilterChip[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'este_mes', label: 'Este mês' },
];

function queryForFilter(filterId: string): Omit<FilmesQuery, 'page'> {
  if (filterId === 'este_mes') {
    return { mes: CURRENT_MONTH, ano: CURRENT_YEAR };
  }
  return {};
}

export default function FilmesScreen() {
  const router = useRouter();
  const [filterId, setFilterId] = useState('todos');
  const baseQuery = useMemo(() => queryForFilter(filterId), [filterId]);

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['filmes', filterId],
    queryFn: ({ pageParam }) => fetchFilmes({ ...baseQuery, page: pageParam, limit: 24 }),
    initialPageParam: 1,
    getNextPageParam: (last, pages) => {
      const loaded = pages.reduce((sum, p) => sum + p.results.length, 0);
      if (loaded >= last.total || last.results.length === 0) return undefined;
      return last.page + 1;
    },
  });

  const rows = useMemo(() => data?.pages.flatMap((p) => p.results) ?? [], [data]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: CarouselCard }) => (
      <View style={styles.cell}>
        <MediaCard item={item} width={CARD_W} onPress={() => router.push(`/filme/${item.id}`)} />
      </View>
    ),
    [router],
  );

  return (
    <View style={styles.container}>
      <FilterChipRow chips={FILTER_CHIPS} activeId={filterId} onSelect={setFilterId} />
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      )}
      {isError && (
        <Text style={styles.error}>{error instanceof Error ? error.message : 'Erro ao listar filmes.'}</Text>
      )}
      {!isLoading && rows.length === 0 && <Text style={styles.empty}>Nenhum filme neste filtro.</Text>}
      <View style={styles.listHost}>
        <FlashList
          data={rows}
          numColumns={2}
          estimatedItemSize={CARD_W * 1.5 + 40}
          keyExtractor={(item, index) => `filme-${item.id}-${index}`}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footerLoader} color={colors.accent} />
            ) : null
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const CARD_W = 156;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  listHost: { flex: 1, paddingHorizontal: 8 },
  listContent: { paddingBottom: 24 },
  cell: { flex: 1, padding: 8, alignItems: 'center' },
  center: { padding: 24 },
  error: { color: colors.error, paddingHorizontal: 16, marginBottom: 8 },
  empty: { color: colors.textMuted, paddingHorizontal: 16 },
  footerLoader: { marginVertical: 16 },
});