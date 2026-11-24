import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchHomepage } from '@/api/homepage';
import { MediaCarousel } from '@/components/MediaCarousel';
import { colors } from '@/theme';
import { getApiBase } from '@/config';
import { mediaDetailHref } from '@/navigation/mediaRoutes';
import type { CarouselCard } from '@/types/media';

export default function HomeScreen() {
  const router = useRouter();
  const openCard = (item: CarouselCard) => {
    const href = mediaDetailHref({ ...item, type: item.type ?? 'filme' });
    if (href) router.push(href);
  };

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['homepage'],
    queryFn: fetchHomepage,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} tintColor={colors.accent} />}
    >
      <Text style={styles.sub}>Lançamentos</Text>
      <Text style={styles.meta}>API: {getApiBase()}</Text>
      {isError && (
        <Text style={styles.error}>{error instanceof Error ? error.message : 'Erro ao carregar a home.'}</Text>
      )}
      <MediaCarousel title="Filmes" data={data?.filmes ?? []} onItemPress={openCard} />
      <MediaCarousel title="Séries" data={data?.series ?? []} />
      <MediaCarousel title="Animes" data={data?.animes ?? []} />
      <MediaCarousel title="Jogos" data={data?.jogos ?? []} />
      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  sub: { color: colors.text, fontSize: 20, fontWeight: '800', paddingHorizontal: 16, paddingTop: 8 },
  meta: { color: colors.textMuted, fontSize: 11, paddingHorizontal: 16, marginBottom: 12 },
  error: { color: colors.error, paddingHorizontal: 16, marginBottom: 12 },
  footer: { height: 24 },
});