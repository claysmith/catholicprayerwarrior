import { useThemeContext } from '@/contexts/theme-context';

export function useColorScheme() {
  const { resolvedScheme, isLoading } = useThemeContext();
  if (isLoading) {
    return 'light';
  }
  return resolvedScheme;
}
