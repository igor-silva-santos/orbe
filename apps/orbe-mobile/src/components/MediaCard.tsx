import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/theme';
import { cardTitle, type CarouselCard } from '@/types/media';

type Props = {
  item: CarouselCard;
  width?: number;
  onPress?: () => void;
};

export function MediaCard({ item, width = 120, onPress }: Props) {
  const title = cardTitle(item);
  const poster = item.poster_url_api;

  return (
    <Pressable onPress={onPress} style={[styles.wrap, { width }]}>
      <View style={[styles.posterBox, { width, height: width * 1.5 }]}>
        {poster ? (
          <Image source={{ uri: poster }} style={styles.poster} contentFit="cover" transition={200} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Sem imagem</Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginRight: 12 },
  posterBox: { borderRadius: 8, overflow: 'hidden', backgroundColor: colors.surface },
  poster: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 },
  placeholderText: { color: colors.textMuted, fontSize: 11, textAlign: 'center' },
  title: { color: colors.text, fontSize: 12, marginTop: 6, fontWeight: '600' },
});