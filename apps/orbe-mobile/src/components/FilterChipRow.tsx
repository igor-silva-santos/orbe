import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme';

export type FilterChip = { id: string; label: string };

type Props = {
  chips: FilterChip[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function FilterChipRow({ chips, activeId, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {chips.map((chip) => {
        const active = chip.id === activeId;
        return (
          <Pressable
            key={chip.id}
            onPress={() => onSelect(chip.id)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{chip.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 16, gap: 8, paddingBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.surface,
  },
  chipActive: { borderColor: colors.accent, backgroundColor: '#2a1814' },
  chipText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: colors.accentBright },
});