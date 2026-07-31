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
  count?: number;
  onPress: () => void;
  onToggle?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function PrayerCard({
  title,
  description,
  isExternal,
  isPrayedToday = false,
  count,
  onPress,
  onToggle,
  onIncrement,
  onDecrement,
}: PrayerCardProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme];

  return (
    <ThemedView type="prayerCard" style={styles.card}>
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.pressableArea, pressed && styles.pressed]}>
            <View style={styles.header}>
              <View style={styles.accentBar}>
                <SymbolView
                  tintColor={colors.accentGold}
                  name={{ ios: 'book.fill', android: 'menu_book', web: 'menu_book' }}
                  size={20}
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText type="default" style={styles.title}>
                  {title}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
                  {description}
                </ThemedText>
              </View>
            </View>
          </Pressable>

          {isExternal && (
            <View style={styles.actionSlot}>
              <SymbolView
                tintColor={colors.textSecondary}
                name={{
                  ios: 'arrow.up.right.square',
                  android: 'open_in_new',
                  web: 'open_in_new',
                }}
                size={16}
              />
            </View>
          )}

          {onToggle && (
            <Pressable
              onPress={onToggle}
              style={styles.actionSlot}>
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

        {onIncrement && onDecrement && count !== undefined && (
          <View style={styles.counter}>
            <Pressable
              onPress={onDecrement}
              style={({ pressed }) => [styles.counterButton, pressed && styles.pressed]}>
              <SymbolView
                tintColor={count > 0 ? colors.accentGold : colors.textSecondary}
                name={{ ios: 'minus', android: 'remove', web: 'remove' }}
                size={14}
              />
            </Pressable>
            <ThemedView
              type="backgroundElement"
              style={[
                styles.countDisplay,
                {
                  borderColor: count > 0 ? colors.accentGold : colors.textSecondary,
                },
              ]}>
              <ThemedText
                type="smallBold"
                themeColor={count > 0 ? 'accentGold' : 'textSecondary'}>
                {count}
              </ThemedText>
            </ThemedView>
            <Pressable
              onPress={onIncrement}
              style={({ pressed }) => [styles.counterButton, pressed && styles.pressed]}>
              <SymbolView
                tintColor={colors.accentGold}
                name={{ ios: 'plus', android: 'add', web: 'add' }}
                size={14}
              />
            </Pressable>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(197, 165, 90, 0.2)',
    overflow: 'hidden',
  },
  inner: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressableArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  actionSlot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.one,
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(197, 165, 90, 0.3)',
  },
  countDisplay: {
    width: 36,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
