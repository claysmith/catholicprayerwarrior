import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme, type ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'app_color_scheme';

export type ThemePreference = 'dark' | 'light' | 'system';
export type ResolvedScheme = 'dark' | 'light';

interface ThemeContextValue {
  colorScheme: ThemePreference;
  resolvedScheme: ResolvedScheme;
  setColorScheme: (scheme: ThemePreference) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  colorScheme: 'light',
  resolvedScheme: 'light',
  setColorScheme: () => {},
  isLoading: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useRNColorScheme();
  const [preference, setPreference] = useState<ThemePreference>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === 'dark' || stored === 'light' || stored === 'system') {
        setPreference(stored);
      }
      setIsLoading(false);
    });
  }, []);

  const setColorScheme = useCallback((scheme: ThemePreference) => {
    setPreference(scheme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
  }, []);

  const resolvedScheme: ResolvedScheme =
    preference === 'system'
      ? systemScheme === 'light'
        ? 'light'
        : 'dark'
      : preference;

  return (
    <ThemeContext.Provider value={{ colorScheme: preference, resolvedScheme, setColorScheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
