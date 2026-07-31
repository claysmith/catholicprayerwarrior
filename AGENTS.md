# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Project: Catholic Prayer Warrior

A Catholic daily prayer companion app. Expo SDK 57, React Native 0.86, TypeScript strict, expo-router file-based routing, React 19.

## Architecture

- **Root layout** (`src/app/_layout.tsx`): `AppThemeProvider` wraps `ThemedApp` which contains `ThemeProvider` (expo-router) + `AnimatedSplashOverlay` + Stack navigator. Stack has `(tabs)` + `prayer/[id]`.
- **Tab layout** (`src/app/(tabs)/_layout.tsx`): Delegates to `AppTabs` component.
- **Routing**: File-based via expo-router with typed routes enabled. `prayer/[id]` uses `presentation: 'card'` with `slide_from_right` animation.
- **Theme system**: `ThemeContext` in `src/contexts/theme-context.tsx` manages dark/light/system preference, persisted to AsyncStorage key `app_color_scheme`. Default preference: **light**. Resolves to `'dark' | 'light'` (never `'unspecified'`).
- **Splash screen**: `expo-splash-screen` prevented from auto-hide, then `AnimatedSplashOverlay` handles animated transition with `react-native-reanimated` Keyframes.

## Key Files

| File | Purpose |
|------|---------|
| `src/app/_layout.tsx` | Root layout: AppThemeProvider → ThemeProvider (expo-router) → AnimatedSplashOverlay + Stack |
| `src/app/(tabs)/index.tsx` | Home screen: prayer list with daily progress counter |
| `src/app/(tabs)/about.tsx` | About screen: theme radio buttons (Dark/Light/System) + credits |
| `src/app/prayer/[id].tsx` | Prayer detail screen: back button, title, description, scrollable sections/steps |
| `src/contexts/theme-context.tsx` | ThemeProvider, useThemeContext — manages preference + resolved scheme |
| `src/hooks/use-color-scheme.ts` | Native: returns `resolvedScheme` from context (always 'dark' or 'light') |
| `src/hooks/use-color-scheme.web.ts` | Web: returns 'light' during hydration, then resolved scheme |
| `src/hooks/use-theme.ts` | Returns full color palette for current scheme via `Colors[scheme]` |
| `src/hooks/use-prayer-tracker.ts` | `usePrayerTracker(id)` per-prayer toggle, `useCountTracker(id)` for count-based prayers, `useDailyProgress(ids)` for counter. Uses AsyncStorage with date-based keys. Call `notifyPrayerToggled()` to refresh progress. |
| `src/data/prayers.ts` | All prayer data. `type: 'internal'` = full text in app, `type: 'external'` = links out via expo-web-browser |
| `src/components/prayer-card.tsx` | Card with icon + description + action widget (checkbox for daily, [-][N][+] counter for count). Counter sits below description in its own row. Checkbox inline to the right. All widgets are sibling Pressables to the navigation Pressable (not nested). |
| `src/components/app-tabs.tsx` | Native tab bar using `NativeTabs` from `expo-router/unstable-native-tabs` |
| `src/components/app-tabs.web.tsx` | Web tab bar: floating pill-style with brand text + tab triggers |
| `src/components/themed-text.tsx` | Theme-aware Text component. Types: default, title, small, smallBold, subtitle, link, linkPrimary, code |
| `src/components/themed-view.tsx` | Theme-aware View component. Accepts `type` prop for `ThemeColor` background |
| `src/components/external-link.tsx` | Cross-platform external link. Opens in-app browser on native via `expo-web-browser` |
| `src/components/ui/collapsible.tsx` | Animated collapsible component using `react-native-reanimated` FadeIn |
| `src/components/animated-icon.tsx` | Native animated splash overlay with Keyframe animations |
| `src/components/animated-icon.web.tsx` | Web animated splash (returns null for overlay) |
| `src/components/hint-row.tsx` | Hint row component (leftover from template) |
| `src/components/web-badge.tsx` | Expo version badge (leftover from template) |
| `src/constants/theme.ts` | Colors (light/dark), Fonts, Spacing, BottomTabInset, MaxContentWidth |
| `src/global.css` | CSS custom properties for web fonts (--font-display, --font-mono, --font-rounded, --font-serif) |

## Prayers in the App

1. **The Holy Rosary** (`rosary`) — external, links to https://www.rosarycenter.org/pwa. Tracking: daily toggle.
2. **The Angelus** (`angelus`) — internal, full text (1 section: 6 versicle/response pairs + closing collect + Glory Be). Tracking: **count** (track number of times prayed per day, traditionally 3x at 6am/noon/6pm).
3. **Chaplet of Divine Mercy** (`divine-mercy`) — internal, full text (7 sections: Opening + 5 Decades + Closing). Tracking: daily toggle.
4. **Chaplet of St. Michael** (`st-michael`) — internal, full text (10 sections: Opening + 9 Salutations for angel choirs). Tracking: daily toggle.
5. **Auxilium Christianorum** (`auxilium-christianorum`) — external, links to https://apps.apple.com/us/app/auxilium-christianorum/id1422439529. Tracking: daily toggle.

## Adding a New Prayer

1. Add entry to `prayers` array in `src/data/prayers.ts`
2. Set `type: 'internal'` with sections/steps for in-app text, or `type: 'external'` with `externalUrl` for link-out
3. Set `trackingType: 'daily'` (default, binary toggle) or `'count'` (increment/decrement counter per day) on the Prayer entry
4. The home screen and tracker automatically pick it up

## Theme System Rules

- Default preference: **light**
- User can select Dark / Light / System on About screen via radio buttons
- Preference persisted to AsyncStorage key `app_color_scheme`
- `useColorScheme()` from `@/hooks/use-color-scheme` returns `'dark' | 'light'` (never `'unspecified'`)
- Web hook returns `'light'` during hydration (isLoading) to prevent flash
- Access colors via `Colors[scheme]` — no fallback needed

### Theme Colors

| Key | Light | Dark |
|-----|-------|------|
| `text` | `#000000` | `#ffffff` |
| `background` | `#ffffff` | `#0A0A0A` |
| `backgroundElement` | `#F0F0F3` | `#1C1C1E` |
| `backgroundSelected` | `#E0E1E6` | `#2C2C2E` |
| `textSecondary` | `#60646C` | `#B0B4BA` |
| `accent` | `#8B1A1A` | `#D4444A` |
| `accentGold` | `#C5A55A` | `#D4AF37` |
| `prayerCard` | `#FAF8F5` | `#1C1C1E` |
| `prayerCardBorder` | `#E8E0D4` | `#3A3A3C` |

## Daily Prayer Tracking

- Each prayer stores `{prayerId}: "YYYY-MM-DD"` in AsyncStorage with key `prayer_tracker_{prayerId}`
- `usePrayerTracker(id)` returns `{ isPrayedToday, isLoading, togglePrayer }`
- `useCountTracker(id)` returns `{ count, isLoading, increment, decrement }` for count-based prayers (stores `JSON { date, count }`)
- `useDailyProgress(ids)` accepts `{ id, trackingType }[]` — returns `{ completedCount, totalPrayers, isLoading }`
- `notifyPrayerToggled()` must be called after toggle to refresh the progress counter (uses listener pattern)
- Resets automatically at midnight (date comparison via `getTodayKey()`)

## Path Aliases

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Platform-Specific Files

- `app-tabs.tsx` (native) vs `app-tabs.web.tsx` (web) — Metro resolves automatically
- `use-color-scheme.ts` (native) vs `use-color-scheme.web.ts` (web) — hydration-safe for web
- `animated-icon.tsx` (native) vs `animated-icon.web.tsx` (web) — web returns null for splash overlay
- `animated-icon.module.css` — CSS for web background gradient

## Scripts

```bash
npx tsc --noEmit        # TypeScript check (use this to verify changes)
npx expo start --clear  # Clear cache and start dev server
npx expo run:ios        # Build for iOS device
npx expo run:android    # Build for Android
npx expo start --web    # Start web version
npx expo lint           # Lint
eas build --platform ios --profile production  # Production EAS build
eas submit --platform ios --profile production # Submit to App Store Connect
```

## EAS Build & App Store Submission

- **Production build**: `eas build --platform ios --profile production` (uses `autoIncrement: true`)
- **Submit**: `eas submit --platform ios --profile production` (requires Apple Developer account + App Store Connect record)
- Bundle ID: `com.claysmithr.catholicprayerwarrior`
- EAS project ID: `6496b335-60a3-4566-b0e3-5cc8630394b3`
- Build profiles in `eas.json`: `development` (dev client, internal), `preview` (internal), `production` (App Store)

## Known Rendering Issues

### Text clipping in ScrollView with long text

**Symptom**: A `<Text>` element inside deeply nested `<View>` wrappers within a `ScrollView` clips mid-sentence without ellipsis (iOS).

**Root cause**: An explicit `lineHeight` on the `<Text>` (including the `lineHeight: 24` baked into `ThemedText type="default"`) causes iOS `NSLayoutManager` to report an under-counted height to Yoga. The Text's frame is capped at the under-reported height, and the remaining text overflows with default `overflow: hidden`.

**Fix** (applied to `src/app/prayer/[id].tsx`):
1. Remove `lineHeight` from the text entirely — render the body with a plain `<Text>` styled with `fontSize`/`fontWeight`/theme color and NO `lineHeight`, so iOS uses the font's natural line height (inheriting `ThemedText type="default"`'s `lineHeight: 24` is NOT sufficient — it still clips)
2. Add `paddingBottom` (e.g., `Spacing.two` = 8px) on the step container as a safety buffer
3. Do NOT set `overflow: 'visible'` or `flexShrink: 1` on a column child `<Text>` — on iOS this worsens the truncation (drops the entire tail of the paragraph)

### Horizontal clipping — final word cut at right edge of screen

**Symptom**: The last word on a line (e.g., "evil" in the Our Father) is horizontally cut off at the right screen boundary (iOS).

**Root cause**: The Text's bounding box ends flush with the line's last glyph; any font/measurement rounding pushes the last glyph past the box, and the box clips it. A Text child inside a `flexDirection: 'row'` container without `flexShrink: 1` can also overflow the row's width.

**Fix** (applied to `src/app/prayer/[id].tsx`):
1. Give the Text `paddingRight` (e.g., `Spacing.two` = 8px) so the wrap width has slack at the right edge — lines end before the bounding box boundary
2. Add `flexShrink: 1` to any Text inside a flex `row` (e.g., section headers) so long titles wrap instead of overflowing
3. Keep `overflow: 'visible'` on long body text as a belt-and-suspenders guard

### Layout centering — avoid `flexDirection: 'row'` on ScrollView contentContainer

**Don't:**
```ts
contentContainer: { flexDirection: 'row', justifyContent: 'center' }
container: { flexGrow: 1 }
```

**Do:**
```ts
contentContainer: {}
container: { alignSelf: 'center', width: '100%', maxWidth: MaxContentWidth }
```

The row-direction pattern causes Yoga to calculate cross-axis (vertical) height from the ScrollView's viewport instead of content, leading to height miscalculations. Using `alignSelf: 'center'` on the inner container with `width: '100%'` and `maxWidth` achieves the same centering without affecting child layout.

## Key Dependencies

- `expo-router/unstable-native-tabs` — NativeTabs for native tab bar
- `react-native-reanimated` — Keyframe animations (splash, collapsible)
- `react-native-worklets` — scheduleOnRN for splash callback
- `expo-symbols` — SymbolView for platform-native icons (chevron, checkmark, book, etc.)
- `expo-web-browser` — In-app browser for external prayer links
- `expo-image` — Image component for animated splash
- `@react-native-async-storage/async-storage` — Theme + prayer tracking persistence

## Notes

- Expo Go may not support SDK 57 — use `expo run:ios` or EAS Build for physical devices
- React Compiler is enabled (`experiments.reactCompiler: true`)
- Bundle identifier: `com.claysmithr.catholicprayerwarrior`
- EAS project ID: `6496b335-60a3-4566-b0e3-5cc8630394b3`
- `BottomTabInset`: iOS = 50, Android = 80 (used for scroll content insets)
- `MaxContentWidth`: 800 (constrains content on wide screens)
- Splash background color: `#208AEF`
- Android adaptive icon background: `#E6F4FE`
