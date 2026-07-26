# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Project: Catholic Prayer Warrior

A Catholic daily prayer companion app. Expo SDK 57, React Native 0.86, TypeScript strict, expo-router file-based routing.

## Architecture

- **Root layout** (`src/app/_layout.tsx`): Stack navigator wrapping a (tabs) group + `prayer/[id]` detail screen
- **Tab layout** (`src/app/(tabs)/_layout.tsx`): Delegates to `AppTabs` component
- **Routing**: File-based via expo-router with typed routes enabled
- **Theme system**: `ThemeContext` in `src/contexts/theme-context.tsx` manages dark/light/system preference, persisted to AsyncStorage. All components must use `useColorScheme()` from `@/hooks/use-color-scheme` — never import `useColorScheme` from `react-native` directly

## Key Files

| File | Purpose |
|------|---------|
| `src/contexts/theme-context.tsx` | ThemeProvider, useThemeContext — manages preference + resolved scheme |
| `src/hooks/use-color-scheme.ts` | Returns `resolvedScheme` from context (always 'dark' or 'light') |
| `src/hooks/use-prayer-tracker.ts` | `usePrayerTracker(id)` per-prayer toggle, `useDailyProgress(ids)` for counter. Uses AsyncStorage with date-based keys. Call `notifyPrayerToggled()` to refresh progress. |
| `src/data/prayers.ts` | All prayer data. `type: 'internal'` = full text in app, `type: 'external'` = links out via expo-web-browser |
| `src/components/prayer-card.tsx` | Card with toggle checkbox. Props: `isPrayedToday`, `onToggle`, `isExternal` |
| `src/constants/theme.ts` | Colors (light/dark with accentGold, accent, prayerCard, etc.), Fonts, Spacing |

## Prayers in the App

1. **Chaplet of Divine Mercy** (`divine-mercy`) — internal, full text
2. **Chaplet of St. Michael** (`st-michael`) — internal, full text
3. **The Holy Rosary** (`rosary`) — external, links to https://www.rosarycenter.org/pwa
4. **Auxilium Christianorum** (`auxilium-christianorum`) — external, links to https://apps.apple.com/us/app/auxilium-christianorum/id1422439529

## Adding a New Prayer

1. Add entry to `prayers` array in `src/data/prayers.ts`
2. Set `type: 'internal'` with sections/steps for in-app text, or `type: 'external'` with `externalUrl` for link-out
3. The home screen and tracker automatically pick it up

## Theme System Rules

- Default preference: **light**
- User can select Dark / Light / System on About screen
- Preference persisted to AsyncStorage key `app_color_scheme`
- `useColorScheme()` from `@/hooks/use-color-scheme` returns `'dark' | 'light'` (never `'unspecified'`)
- Access colors via `Colors[scheme]` — no fallback needed

## Daily Prayer Tracking

- Each prayer stores `{prayerId}: "YYYY-MM-DD"` in AsyncStorage
- `usePrayerTracker(id)` returns `{ isPrayedToday, togglePrayer }`
- `useDailyProgress(ids)` returns `{ completedCount, totalPrayers }`
- `notifyPrayerToggled()` must be called after toggle to refresh the progress counter
- Resets automatically at midnight (date comparison)

## Path Aliases

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Scripts

```bash
npx tsc --noEmit        # TypeScript check (use this to verify changes)
npx expo start --clear  # Clear cache and start dev server
npx expo run:ios        # Build for iOS device
npx expo lint           # Lint
```

## Notes

- Expo Go may not support SDK 57 — use `expo run:ios` or EAS Build for physical devices
- React Compiler is enabled (`experiments.reactCompiler: true`)
- Bundle identifier: `com.claysmithr.catholicprayerwarrior`
- EAS project ID: `6496b335-60a3-4566-b0e3-5cc8630394b3`
