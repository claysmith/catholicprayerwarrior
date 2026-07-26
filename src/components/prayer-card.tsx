import { StyleSheet, Pressable, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PrayerCardProps {
  title: string;
  description: string;
  isExternal?: boolean;
  isPrayedToday?: boolean;
  onPress: () => void;
  onToggle?: () => void;
}

export function PrayerCard({
  title,
  description,
  isExternal,
  isPrayedToday = false,
  onPress,
  onToggle,
}: PrayerCardProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.cardPressable, pressed && styles.pressed]}>
        <ThemedView style={styles.card}>
          <ThemedView style={styles.header}>
            <ThemedView style={styles.accentBar}>
              <SymbolView
                tintColor={colors.accentGold}
                name={{ ios: 'book.fill', android: 'menu_book', web: 'menu_book' }}
                size={20}
              />
            </ThemedView>
            <ThemedView style={styles.textContainer}>
              <ThemedText type="default" style={styles.title}>
                {title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
                {description}
              </ThemedText>
            </ThemedView>
            {isExternal && (
              <SymbolView
                tintColor={colors.textSecondary}
                name={{
                  ios: 'arrow.up.right.square',
                  android: 'open_in_new',
                  web: 'open_in_new',
                }}
                size={16}
              />
            )}
          </ThemedView>
        </ThemedView>
      </Pressable>

      {onToggle && (
        <Pressable
          onPress={onToggle}
          style={({ pressed }) => [styles.toggleButton, pressed && styles.pressed]}>
          <View
            style={[
              styles.checkbox,
              { borderColor: isPrayedToday ? colors.accentGold : colors.textSecondary },
              isPrayedToday && { backgroundColor: colors.accentGold },
            ]}>
            {isPrayedToday && (
              <SymbolView
                tintColor={colors.background}
                name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                size={14}
              />
            )}
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardPressable: {
    flex: 1,
  },
  card: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(197, 165, 90, 0.2)',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    gap: Spacing.two,
  },
  accentBar: {
    width: 40,
    height: 40,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(197, 165, 90, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  toggleButton: {
    padding: Spacing.two,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
