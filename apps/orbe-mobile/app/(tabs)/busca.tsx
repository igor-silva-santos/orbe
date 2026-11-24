import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { fetchSearch } from '@/api/search';
import { MediaCard } from '@/components/MediaCard';
import { colors } from '@/theme';
import { cardTitle, type CarouselCard } from '@/types/media';

type Row =
  | { kind: 'header'; id: string; title: string }
  | { kind: 'item'; id: string; item: CarouselCard };

export default function BuscaScreen() {
  const [text, setText] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(text.trim()), 400);
    return () => clearTimeout(t);
  }, [text]);

  const enabled = debounced.length >= 2;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => fetchSearch(debounced),
    enabled,
  });

  const rows = useMemo((): Row[] => {
    if (!data) return [];
    const sections: { title: string; items: CarouselCard[] }[] = [
      { title: 'Filmes', items: data.filmes },
      { title: 'Séries', items: data.series },
      { title: 'Animes', items: data.animes },
      { title: 'Jogos', items: data.jogos },
    ];
    const out: Row[] = [];
    for (const section of sections) {
      if (!section.items.length) continue;
      out.push({ kind: 'header', id: `h-${section.title}`, title: section.title });
      for (const item of section.items) {
        out.push({ kind: 'item', id: `${section.title}-${item.type}-${item.id}`, item });
      }
    }
    return out;
  }, [data]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar filmes, séries…"
        placeholderTextColor={colors.textMuted}
        value={text}
        onChangeText={setText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {!enabled && <Text style={styles.hint}>Digite pelo menos 2 caracteres.</Text>}
      {enabled && isLoading && <ActivityIndicator style={styles.loader} color={colors.accent} />}
      {enabled && isError && (
        <Text style={styles.error}>{error instanceof Error ? error.message : 'Erro na busca.'}</Text>
      )}
      {enabled && !isLoading && rows.length === 0 && <Text style={styles.hint}>Nenhum resultado.</Text>}
      <View style={styles.listHost}>
        <FlashList
          data={rows}
          estimatedItemSize={80}
          keyExtractor={(row) => row.id}
          renderItem={({ item: row }) => {
            if (row.kind === 'header') {
              return <Text style={styles.section}>{row.title}</Text>;
            }
            return (
              <View style={styles.resultRow}>
                <MediaCard item={row.item} width={56} />
                <Text style={styles.resultTitle} numberOfLines={2}>
                  {cardTitle(row.item)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 8 },
  input: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    color: colors.text,
    marginBottom: 8,
  },
  hint: { color: colors.textMuted, paddingHorizontal: 16, fontSize: 13 },
  loader: { marginVertical: 12 },
  error: { color: colors.error, paddingHorizontal: 16 },
  listHost: { flex: 1, marginTop: 8 },
  section: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
  },
  resultRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  resultTitle: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '600' },
});