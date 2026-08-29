import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useThemeContext, type ThemePreference } from '@/contexts/theme-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { REMINDER_SLOTS, usePrayerReminders } from '@/hooks/use-prayer-reminders';
import { useSelectedPrayers } from '@/hooks/use-selected-prayers';
import { prayers } from '@/data/prayers';

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

function formatTime(hour: number, minute: number): string {
  const period = hour < 12 ? 'AM' : 'PM';
  let displayHour = hour % 12;
  if (displayHour === 0) displayHour = 12;
  return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
}

export default function AboutScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const { colorScheme, setColorScheme } = useThemeContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { enabled, available, toggleReminder } = usePrayerReminders();
  const { selected, toggle } = useSelectedPrayers(prayers.map((p) => p.id));

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

        <ThemedView style={styles.section}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Daily Prayers
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.text}>
            Choose which prayers to include in your daily routine. The home screen and progress
            counter only show selected prayers.
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.settingsCard}>
            {prayers.map((prayer) => {
              const isOn = selected.has(prayer.id);
              const isLast = selected.size === 1 && isOn;
              return (
                <Pressable
                  key={prayer.id}
                  onPress={() => toggle(prayer.id)}
                  style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}>
                  <View style={styles.reminderInfo}>
                    <ThemedText type="default" style={styles.optionLabel}>
                      {prayer.title}
                    </ThemedText>
                    {isLast && (
                      <ThemedText type="small" themeColor="textSecondary">
                        At least one prayer required
                      </ThemedText>
                    )}
                  </View>
                  <View
                    style={[
                      styles.switch,
                      { backgroundColor: isOn ? colors.accentGold : colors.backgroundSelected },
                    ]}>
                    <View
                      style={[
                        styles.switchKnob,
                        isOn ? styles.switchKnobOn : styles.switchKnobOff,
                        { backgroundColor: isOn ? colors.background : colors.textSecondary },
                      ]}
                    />
                  </View>
                </Pressable>
              );
            })}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Prayer Reminders
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.text}>
            Receive daily notifications to remind you to pray.
          </ThemedText>

          {!available ? (
            <ThemedView type="backgroundElement" style={styles.settingsCard}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.unavailableText}>
                Notifications require a development build. Run &quot;npx expo run:ios&quot; to enable prayer
                reminders.
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView type="backgroundElement" style={styles.settingsCard}>
              {REMINDER_SLOTS.map((slot) => {
                const isOn = !!enabled[slot.id];
                const timeLabel = formatTime(slot.hour, slot.minute);
                return (
                  <Pressable
                    key={slot.id}
                    onPress={() => toggleReminder(slot)}
                    style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}>
                    <View style={styles.reminderInfo}>
                      <ThemedText type="default" style={styles.optionLabel}>
                        {slot.label}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {timeLabel}
                      </ThemedText>
                    </View>
                    <View
                      style={[
                        styles.switch,
                        { backgroundColor: isOn ? colors.accentGold : colors.backgroundSelected },
                      ]}>
                      <View
                        style={[
                          styles.switchKnob,
                          isOn ? styles.switchKnobOn : styles.switchKnobOff,
                          { backgroundColor: isOn ? colors.background : colors.textSecondary },
                        ]}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </ThemedView>
          )}
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
  unavailableText: {
    padding: Spacing.three,
    lineHeight: 20,
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
  reminderInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  switch: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
  },
  switchKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  switchKnobOn: {
    alignSelf: 'flex-end',
  },
  switchKnobOff: {
    alignSelf: 'flex-start',
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
