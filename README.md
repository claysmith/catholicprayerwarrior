# Catholic Prayer Warrior

A Catholic daily prayer companion app built with Expo SDK 57. Track daily prayers, read full chaplet texts, and link out to external prayer apps.

## Tech Stack

- **Expo SDK 57** with React Native 0.86 and React 19
- **TypeScript** (strict mode)
- **expo-router** (file-based routing, typed routes enabled)
- **React Compiler** enabled (auto-memoization)
- **AsyncStorage** for persisting theme preference and prayer tracking
- Managed workflow (no native code ejected)

## Features

- **Four daily prayers**: Chaplet of Divine Mercy, Chaplet of St. Michael, The Holy Rosary, Auxilium Christianorum
- **Full prayer text** for Divine Mercy and St. Michael (scrollable in-app)
- **External links** for Rosary (rosarycenter.org/pwa) and Auxilium Christianorum (App Store)
- **Daily prayer tracking** with toggle checkmarks on each card
- **Progress counter** ("2 of 4 prayed today" / "All prayers completed today — Deus vult!")
- **Dark / Light / System theme** with user-selectable preference (defaults to light)
- **About screen** with appearance settings and credits

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx              # Root Stack navigator (ThemeProvider + tabs + prayer detail)
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab layout (delegates to AppTabs)
│   │   ├── index.tsx            # Prayers list screen with daily progress
│   │   └── about.tsx            # About screen with theme settings + credits
│   └── prayer/
│       └── [id].tsx             # Prayer detail screen (full prayer text)
├── components/
│   ├── app-tabs.tsx             # Native tab bar (NativeTabs)
│   ├── app-tabs.web.tsx         # Web tab bar (floating pill-style)
│   ├── prayer-card.tsx          # Prayer card with toggle checkbox
│   ├── animated-icon.tsx        # Native animated splash
│   ├── animated-icon.web.tsx    # Web animated splash
│   ├── external-link.tsx        # Cross-platform external link (in-app browser)
│   ├── themed-text.tsx          # Theme-aware Text component
│   ├── themed-view.tsx          # Theme-aware View component
│   └── ui/collapsible.tsx       # Animated collapsible component
├── contexts/
│   └── theme-context.tsx         # ThemeProvider + useThemeContext (dark/light/system)
├── constants/
│   └── theme.ts                  # Colors, Fonts, Spacing, layout constants
├── data/
│   └── prayers.ts                # Prayer definitions (Divine Mercy, St. Michael, Rosary, Auxilium)
├── hooks/
│   ├── use-color-scheme.ts       # Returns resolved scheme from context (native)
│   ├── use-color-scheme.web.ts   # Returns resolved scheme from context (web, hydration-safe)
│   ├── use-theme.ts              # Returns full color palette for current scheme
│   └── use-prayer-tracker.ts     # Daily prayer tracking with AsyncStorage
└── global.css                    # CSS custom properties for web fonts
```

## Key Conventions

- **Path aliases**: `@/*` → `./src/*`, `@/assets/*` → `./assets/*`
- **Platform-specific files**: `.web.tsx` suffixes for web-specific implementations (Metro resolves automatically)
- **Theme colors**: `Colors.light` and `Colors.dark` in `src/constants/theme.ts` — always access via `useColorScheme()` hook (never `useColorScheme()` from `react-native` directly)
- **Themed components**: `ThemedText` and `ThemedView` accept a `type` prop for variant styling

## Scripts

```bash
npx expo start          # Start dev server
npx expo start --clear  # Clear cache and start
npx expo run:ios        # Build and run on iOS device/simulator
npx expo run:android    # Build and run on Android
npx expo start --web    # Start web version
npx expo lint           # Run linter
npx tsc --noEmit        # TypeScript check
```

## Running on a Physical Device

Expo Go may not support SDK 57 yet. Use a development build:
- **USB**: `npx expo run:ios` (requires Xcode + trusted device)
- **Cloud**: `npx eas build --profile development --platform ios`

## Credits

Made by Clay Smith at [claysweb.design](https://claysweb.design)
