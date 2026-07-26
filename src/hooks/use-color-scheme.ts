import { useThemeContext } from '@/contexts/theme-context';

export function useColorScheme() {
  const { resolvedScheme } = useThemeContext();
  return resolvedScheme;
}
