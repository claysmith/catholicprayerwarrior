import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { DayRecord } from '@/hooks/use-prayer-history';

interface StreakHistoryProps {
  streak: number;
  longest: number;
  week: DayRecord[];
}

export function StreakHistory({ streak, longest, week }: StreakHistoryProps) {
  const colors = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.streakRow}>
        <View style={styles.streakBlock}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
            Current streak
          </ThemedText>
          <View style={styles.streakValueRow}>
            <ThemedText type="subtitle" themeColor="accent" style={styles.streakValue}>
              {streak}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {streak === 1 ? 'day' : 'days'}
            </ThemedText>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.streakBlock}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
            Best
          </ThemedText>
          <View style={styles.streakValueRow}>
            <ThemedText type="subtitle" themeColor="accentGold" style={styles.streakValue}>
              {longest}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {longest === 1 ? 'day' : 'days'}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.weekRow}>
        {week.map((day) => {
          const fillColor =
            day.status === 'complete'
              ? colors.accentGold
              : day.status === 'partial'
                ? colors.accent
                : colors.backgroundSelected;
          return (
            <View key={day.dateKey} style={styles.dayCell}>
              <View
                style={[
                  styles.dayDot,
                  { backgroundColor: fillColor },
                  day.isToday && { borderColor: colors.accent, borderWidth: 2 },
                ]}>
                <ThemedText
                  type="smallBold"
                  themeColor={day.status === 'none' ? 'textSecondary' : 'background'}
                  style={styles.dayLabel}>
                  {day.weekday}
                </ThemedText>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendSwatch, { backgroundColor: colors.accentGold }]} />
          <ThemedText type="small" themeColor="textSecondary">
            All prayers
          </ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendSwatch, { backgroundColor: colors.accent }]} />
          <ThemedText type="small" themeColor="textSecondary">
            Some
          </ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendSwatch, { backgroundColor: colors.backgroundSelected }]} />
          <ThemedText type="small" themeColor="textSecondary">
            None
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakBlock: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  streakValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
  },
  streakValue: {
    fontSize: 28,
    lineHeight: 32,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCell: {
    alignItems: 'center',
  },
  dayDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 13,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  legendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
