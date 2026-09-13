# Catholic Prayer Warrior

A Catholic daily prayer companion app built with Expo SDK 57. Track daily prayers, read full chaplet texts, and link out to external prayer apps.

## Tech Stack

- **Expo SDK 57** with React Native 0.86 and React 19
- **TypeScript** (strict mode)
- **expo-router** (file-based routing, typed routes enabled)
- **React Compiler** enabled (auto-memoization)
- **AsyncStorage** for persisting theme preference, prayer tracking, streak history, and reminder settings
- **expo-notifications** for daily prayer reminders
- Managed workflow (no native code ejected)

## Features

- **Twelve daily prayers**: The Holy Rosary, The Angelus, Chaplet of Divine Mercy, Chaplet of St. Michael, Auxilium Christianorum, Prayer to St. Michael (Short), The Memorare, Anima Christi, Act of Contrition, Morning Offering, Prayer to St. Joseph, Prayer to Your Guardian Angel
- **Full prayer text** for all internal prayers (scrollable in-app)
- **External links** for Rosary (rosarycenter.org/pwa) and Auxilium Christianorum (App Store)
- **Daily prayer tracking** with toggle checkmarks (daily) or [-][N][+] counter (Angelus, counted 3x/day)
- **Faithful prayer texts** — the Angelus closes with the Glory Be recited three times; the Chaplet of Divine Mercy follows the full official structure including the opening and closing prayers from St. Faustina's Diary; the Chaplet of St. Michael (revealed to Antónia d'Astónaco, approved by Pope Pius IX) follows the EWTN guide with each choir's intercessory prayer followed by one Our Father and three Hail Marys
- **Progress counter** ("3 of 12 prayed today" / "All prayers completed today — Deus vult!")
- **Streak & history** — current streak, longest streak, and a 7-day week grid showing complete/partial/none days
- **Prayer reminders** — daily notifications for the Angelus (6 AM / noon / 6 PM) and morning/evening prayer
- **Dark / Light / System theme** with user-selectable preference (defaults to light)
- **About screen** with appearance settings, reminder toggles, and credits

## App Store Listing

### Promotional Text

Pray without ceasing. Track twelve daily prayers, build your streak, and keep the Angelus with reminders at 6 AM, noon, and 6 PM.

### Description

Catholic Prayer Warrior is a daily prayer companion built around one simple goal: pray without ceasing.

Keep your daily prayers close at hand with full texts for twelve beloved devotions — the Rosary, the Angelus, the Chaplets of Divine Mercy and St. Michael, the Morning Offering, the Memorare, the Act of Contrition, Anima Christi, prayers to St. Joseph, your Guardian Angel, and more. External devotions like the Rosary open in a beautiful in-app browser so nothing pulls you out of prayer.

Built to build a habit:

• Daily tracking — tap the checkmark when you've prayed; the Angelus tracks each of its three traditional times (6 AM, noon, 6 PM) with a simple counter.
• Streaks & history — see your current and longest streak plus a 7-day grid marking complete, partial, and missed days.
• Prayer reminders — gentle daily notifications for the Angelus, morning prayer, and evening prayer.
• Beautiful, calm design — a warm maroon-and-gold theme inspired by the Church, with dark, light, or system appearance to match your day.

All prayer data is stored privately on your device — no account, no ads, no tracking.

Faithfully researched, faithful to the tradition:

• The Angelus with the closing Glory Be recited three times
• The Chaplet of Divine Mercy in its full official form, including the opening and closing prayers from the Diary of St. Faustina Kowalska
• The Chaplet of St. Michael as revealed to the Servant of God Antónia d'Astónaco, approved by Pope Pius IX, with each choir's intercessory prayer followed by one Our Father and three Hail Marys

Made by Clay Smith at claysweb.design.

### What's New in 1.0.1

Prayer text refinements based on official sources:

• The Angelus now notes that the Glory Be is recited three times at the end.
• The Chaplet of Divine Mercy has been restructured to follow the complete official format — including St. Faustina's Prayer for Sinners, the "O Blood and Water" invocation (said three times), and the full closing prayers from the Diary.
• The Chaplet of St. Michael now follows the EWTN guide — the intercessory prayer to each choir comes first, followed by one Our Father and three Hail Marys (replacing the Glory Be in each salutation). The Principalities prayer has been corrected, and the Chaplet now includes four Our Fathers in honor of the leading Angels before the concluding prayers.
• Credits and description for the St. Michael Chaplet have been updated to reflect its true history — revealed to Antónia d'Astónaco in 1750, approved by Pope Pius IX in 1851.

## Splash Screen

The native splash (`expo-splash-screen`, maroon `#8B1A1A` background, 96px `splash-icon.png` with 20px border radius) is held while the app boots, then `AnimatedSplashOverlay` takes over with a staggered entrance animation:

1. **Icon** springs in (`ZoomIn` with damped spring, 600ms)
2. **Gold divider** fades in (`#C5A55A`, 48px wide)
3. **App name** "Catholic Prayer Warrior" fades in (white, 24px)
4. **Tagline** "Pray without ceasing" fades in (gold, uppercase)

Total duration is 1600ms — holds at full opacity until 55% (time to read), then fades out with a cubic-bezier `Easing.bezier(0.4, 0, 0.2, 1)` (Material standard easing). The native splash `imageWidth` in `app.json` is set to 96 to match the animated overlay's icon size for a seamless handoff.

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx              # Root Stack navigator (ThemeProvider + tabs + prayer detail)
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab layout (delegates to AppTabs)
│   │   ├── index.tsx            # Prayers list screen with daily progress + streak history
│   │   └── about.tsx            # About screen with theme settings + reminder toggles + credits
│   └── prayer/
│       └── [id].tsx             # Prayer detail screen (full prayer text)
├── components/
│   ├── app-tabs.tsx             # Native tab bar (NativeTabs)
│   ├── app-tabs.web.tsx         # Web tab bar (floating pill-style)
│   ├── prayer-card.tsx          # Prayer card with checkbox (daily) or [-][N][+] counter (count)
│   ├── streak-history.tsx       # Streak counter + 7-day week grid
│   ├── animated-icon.tsx        # Native animated splash overlay (staggered icon + divider + title + tagline, 1600ms, 20px icon border radius)
│   ├── animated-icon.web.tsx    # Web animated splash (returns null for overlay)
│   ├── external-link.tsx        # Cross-platform external link (in-app browser)
│   ├── themed-text.tsx          # Theme-aware Text component
│   ├── themed-view.tsx          # Theme-aware View component
│   └── ui/collapsible.tsx       # Animated collapsible component
├── contexts/
│   └── theme-context.tsx         # ThemeProvider + useThemeContext (dark/light/system)
├── constants/
│   └── theme.ts                  # Colors, Fonts, Spacing, layout constants
├── data/
│   └── prayers.ts                # Prayer definitions (12 prayers)
├── hooks/
│   ├── use-color-scheme.ts       # Returns resolved scheme from context (native)
│   ├── use-color-scheme.web.ts   # Returns resolved scheme from context (web, hydration-safe)
│   ├── use-theme.ts              # Returns full color palette for current scheme
│   ├── use-prayer-tracker.ts     # Daily prayer tracking + completion helper
│   ├── use-prayer-history.ts     # Streak + 7-day history (persisted to AsyncStorage)
│   └── use-prayer-reminders.ts   # Notification scheduling + permissions
└── global.css                    # CSS custom properties for web fonts
```

## Key Conventions

- **Path aliases**: `@/*` → `./src/*`, `@/assets/*` → `./assets/*`
- **Platform-specific files**: `.web.tsx` suffixes for web-specific implementations (Metro resolves automatically)
- **Theme colors**: `Colors.light` and `Colors.dark` in `src/constants/theme.ts` — always access via `useColorScheme()` hook (never `useColorScheme()` from `react-native` directly)
- **Themed components**: `ThemedText` and `ThemedView` accept a `type` prop for variant styling

## Theme System

| Color Key | Light | Dark |
|-----------|-------|------|
| `text` | `#000000` | `#ffffff` |
| `background` | `#ffffff` | `#0A0A0A` |
| `backgroundElement` | `#F0F0F3` | `#1C1C1E` |
| `backgroundSelected` | `#E0E1E6` | `#2C2C2E` |
| `textSecondary` | `#60646C` | `#B0B4BA` |
| `accent` | `#8B1A1A` | `#D4444A` |
| `accentGold` | `#C5A55A` | `#D4AF37` |
| `prayerCard` | `#FAF8F5` | `#1C1C1E` |
| `prayerCardBorder` | `#E8E0D4` | `#3A3A3C` |

## Prayer Reminders

Daily notifications are scheduled via `expo-notifications` with `DAILY` triggers:

| Slot | Time | Label |
|------|------|-------|
| `angelus-morning` | 6:00 AM | Angelus — Morning |
| `daily-morning` | 7:00 AM | Morning Prayer |
| `angelus-noon` | 12:00 PM | Angelus — Noon |
| `angelus-evening` | 6:00 PM | Angelus — Evening |
| `daily-evening` | 9:00 PM | Evening Prayer |

- Toggled from the About screen; state persisted to AsyncStorage key `prayer_reminders`
- Android channel: `prayer-reminders` (HIGH importance)
- Permissions requested on first toggle

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

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo-router/unstable-native-tabs` | Native tab bar |
| `react-native-reanimated` | Splash + collapsible animations |
| `react-native-worklets` | Splash callback scheduling |
| `expo-symbols` | Platform-native icons (SymbolView) |
| `expo-web-browser` | In-app browser for external prayers |
| `expo-notifications` | Daily prayer reminders |
| `@react-native-async-storage/async-storage` | Theme + tracking + history + reminders persistence |

## Build & Distribution

### Production Build (iOS)

```bash
eas build --platform ios --profile production
```

### Submit to App Store Connect

```bash
eas submit --platform ios --profile production
```

Requires an Apple Developer account and an App Store Connect record for bundle ID `com.claysmithr.catholicprayerwarrior`.

### Development Build

```bash
npx expo run:ios
# or
eas build --profile development --platform ios
```

## Credits

Made by Clay Smith at [claysweb.design](https://claysweb.design)
