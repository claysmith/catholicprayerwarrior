import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useThemeContext, type ThemePreference } from '@/contexts/theme-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

export default function AboutScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const { colorScheme, setColorScheme } = useThemeContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme];

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
            About
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.text}>
            Catholic Prayer Warrior is a daily prayer companion app. Track your daily prayers and
            grow in faith.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Appearance
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.settingsCard}>
            {THEME_OPTIONS.map((option) => {
              const isSelected = colorScheme === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => setColorScheme(option.value)}
                  style={({ pressed }) => [
                    styles.optionRow,
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText type="default" style={styles.optionLabel}>
                    {option.label}
                  </ThemedText>
                  <View
                    style={[
                      styles.radio,
                      { borderColor: isSelected ? colors.accentGold : colors.textSecondary },
                      isSelected && { backgroundColor: colors.accentGold },
                    ]}>
                    {isSelected && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.credit}>
            Made by Clay Smith at{' '}
            <ExternalLink href="https://claysweb.design">
              <ThemedText type="linkPrimary">claysweb.design</ThemedText>
            </ExternalLink>
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.copyright}>
            (c) 2026
          </ThemedText>
        </ThemedView>
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
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    gap: Spacing.two,
  },
  sectionTitle: {
    marginBottom: Spacing.one,
  },
  text: {
    lineHeight: 24,
  },
  settingsCard: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    paddingBottom: Spacing.six,
  },
  credit: {
    textAlign: 'center',
  },
  copyright: {
    textAlign: 'center',
    marginTop: Spacing.one,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  optionLabel: {
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.7,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});
