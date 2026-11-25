import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { fetchFilmeDetails } from '@/api/filmes';
import { colors } from '@/theme';
import { cardTitle } from '@/types/media';

export default function FilmeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tmdbId = id ?? '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['filme', tmdbId],
    queryFn: () => fetchFilmeDetails(tmdbId),
    enabled: Boolean(tmdbId),
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error instanceof Error ? error.message : 'Filme não encontrado.'}</Text>
      </View>
    );
  }

  const title = data.titulo_curado || data.titulo_api || 'Filme';
  const poster = data.poster_url_api;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} contentFit="cover" />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]}>
          <Text style={styles.meta}>Sem poster</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {data.data_lancamento_api ? (
        <Text style={styles.meta}>Lançamento: {data.data_lancamento_api}</Text>
      ) : null}
      {data.duracao ? <Text style={styles.meta}>Duração: {data.duracao}</Text> : null}
      {data.generos_api?.length ? (
        <Text style={styles.meta}>{data.generos_api.join(' · ')}</Text>
      ) : null}
      {data.sinopse ? <Text style={styles.sinopse}>{data.sinopse}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg, padding: 24 },
  poster: { width: '100%', aspectRatio: 2 / 3, borderRadius: 12, backgroundColor: colors.surface },
  posterPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 16 },
  meta: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
  sinopse: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 16 },
  error: { color: colors.error, textAlign: 'center' },
});