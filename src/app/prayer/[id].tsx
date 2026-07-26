import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { getPrayerById } from '@/data/prayers';
import { useTheme } from '@/hooks/use-theme';

export default function PrayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const prayer = getPrayerById(id);

  if (!prayer) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="default">Prayer not found.</ThemedText>
        <Pressable onPress={() => router.back()}>
          <ThemedText type="linkPrimary">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={{
        ...safeAreaInsets,
        bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
      }}
      contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <SymbolView
              tintColor={theme.text}
              name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
              size={20}
            />
            <ThemedText type="small" themeColor="textSecondary">
              Back
            </ThemedText>
          </Pressable>

          <ThemedText type="subtitle" style={styles.title}>
            {prayer.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
            {prayer.description}
          </ThemedText>
        </ThemedView>

        {prayer.sections.map((section, sectionIndex) => (
          <ThemedView key={sectionIndex} style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedView style={styles.sectionDot} />
              <ThemedText type="smallBold" themeColor="accentGold">
                {section.title}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepsContainer}>
              {section.steps.map((step, stepIndex) => (
                <ThemedView key={stepIndex} style={styles.step}>
                  <ThemedText type="small" themeColor="accent" style={styles.stepLabel}>
                    {step.label}
                  </ThemedText>
                  <ThemedText type="default" style={styles.stepText}>
                    {step.text}
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
    gap: Spacing.one,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.three,
    paddingBottom: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(197, 165, 90, 0.2)',
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
  },
  stepsContainer: {
    gap: Spacing.three,
  },
  step: {
    gap: Spacing.one,
  },
  stepLabel: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stepText: {
    lineHeight: 26,
  },
});
