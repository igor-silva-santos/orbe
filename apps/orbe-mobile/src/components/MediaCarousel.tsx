import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MediaCard } from '@/components/MediaCard';
import { colors } from '@/theme';
import type { CarouselCard } from '@/types/media';

type Props = {
  title: string;
  data: CarouselCard[];
};

const CARD_W = 124;
const ESTIMATED_H = CARD_W * 1.5 + 44;

export function MediaCarousel({ title, data }: Props) {
  if (!data.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.listHost}>
        <FlashList
          data={data}
          horizontal
          estimatedItemSize={CARD_W}
          estimatedListSize={{ height: ESTIMATED_H, width: 360 }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.type ?? 'm'}-${item.id}-${index}`}
          renderItem={({ item }) => <MediaCard item={item} width={CARD_W} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 20 },
  heading: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 10, paddingHorizontal: 16 },
  listHost: { minHeight: ESTIMATED_H, paddingLeft: 16 },
});