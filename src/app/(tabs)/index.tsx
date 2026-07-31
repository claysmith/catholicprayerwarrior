import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

import { PrayerCard } from '@/components/prayer-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { prayers } from '@/data/prayers';
import { usePrayerTracker, useCountTracker, useDailyProgress } from '@/hooks/use-prayer-tracker';

function PrayerCardWithTracker({
  prayerId,
  title,
  description,
  isExternal,
  externalUrl,
  trackingType,
  onPress,
}: {
  prayerId: string;
  title: string;
  description: string;
  isExternal?: boolean;
  externalUrl?: string;
  trackingType?: 'daily' | 'count';
  onPress: () => void;
}) {
  const daily = usePrayerTracker(prayerId);
  const countTracking = useCountTracker(prayerId);

  if (trackingType === 'count') {
    return (
      <PrayerCard
        title={title}
        description={description}
        isExternal={isExternal}
        count={countTracking.count}
        onPress={onPress}
        onIncrement={countTracking.increment}
        onDecrement={countTracking.decrement}
      />
    );
  }

  return (
    <PrayerCard
      title={title}
      description={description}
      isExternal={isExternal}
      isPrayedToday={daily.isPrayedToday}
      onPress={onPress}
      onToggle={daily.togglePrayer}
    />
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const prayerProgress = prayers.map((p) => ({ id: p.id, trackingType: p.trackingType }));
  const { completedCount, totalPrayers } = useDailyProgress(prayerProgress);

  const allPrayed = completedCount === totalPrayers;

  function handlePrayerPress(prayer: (typeof prayers)[number]) {
    if (prayer.type === 'external' && prayer.externalUrl) {
      WebBrowser.openBrowserAsync(prayer.externalUrl);
    } else {
      router.push(`/prayer/${prayer.id}`);
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentInset={{
        ...safeAreaInsets,
        bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
      }}
      contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle" style={styles.title}>
            Prayers
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            {allPrayed
              ? 'All prayers completed today — Deus vult!'
              : `${completedCount} of ${totalPrayers} prayed today`}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.prayerList}>
          {prayers.map((prayer) => (
            <PrayerCardWithTracker
              key={prayer.id}
              prayerId={prayer.id}
              title={prayer.title}
              description={prayer.description}
              trackingType={prayer.trackingType}
              isExternal={prayer.type === 'external'}
              externalUrl={prayer.externalUrl}
              onPress={() => handlePrayerPress(prayer)}
            />
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {},
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
    gap: Spacing.one,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  prayerList: {
    gap: Spacing.two,
  },
});
