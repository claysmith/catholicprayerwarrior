import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Pressable, Text } from 'react-native';
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
              <ThemedText type="smallBold" themeColor="accentGold" style={styles.sectionTitle}>
                {section.title}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepsContainer}>
              {section.steps.map((step, stepIndex) => (
                <ThemedView key={stepIndex} style={styles.step}>
                  <ThemedText type="small" themeColor="accent" style={styles.stepLabel}>
                    {step.label}
                  </ThemedText>
                  <Text style={[styles.stepText, { color: theme.text }]}>
                    {step.text}
                  </Text>
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
  contentContainer: {},
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
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
    width: '100%',
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
  sectionTitle: {
    flexShrink: 1,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
  },
  stepsContainer: {
    width: '100%',
    gap: Spacing.three,
  },
  step: {
    width: '100%',
    gap: Spacing.one,
    paddingBottom: Spacing.two,
  },
  stepLabel: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '500',
    paddingRight: Spacing.two,
  },
});
