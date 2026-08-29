import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'selected_prayers';

let selectionListeners: (() => void)[] = [];

export function notifySelectionChanged() {
  selectionListeners.forEach((fn) => fn());
}

async function readSelection(allIds: string[]): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed)) {
        const set = new Set(parsed as string[]);
        // Filter to only known prayer IDs
        const valid = new Set(allIds.filter((id) => set.has(id)));
        // If all are unselected, default to all (never show empty list)
        if (valid.size === 0) {
          return new Set(allIds);
        }
        return valid;
      }
    }
  } catch {
    // malformed
  }
  return new Set(allIds);
}

async function writeSelection(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useSelectedPrayers(allIds: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set(allIds));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const result = await readSelection(allIds);
      if (cancelled) return;
      setSelected(result);
      setIsLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIds.join(',')]);

  useEffect(() => {
    const listener = () => {
      readSelection(allIds).then(setSelected);
    };
    selectionListeners.push(listener);
    return () => {
      selectionListeners = selectionListeners.filter((fn) => fn !== listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIds.join(',')]);

  const toggle = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          // Don't allow deselecting if it would leave zero prayers
          if (next.size > 1) {
            next.delete(id);
          } else {
            return prev;
          }
        } else {
          next.add(id);
        }
        writeSelection([...next]);
        notifySelectionChanged();
        return next;
      });
    },
    [],
  );

  return { selected, toggle, isLoading };
}
