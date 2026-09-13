import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'prayer_tracker';

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getStorageKey(prayerId: string): string {
  return `${STORAGE_KEY}_${prayerId}`;
}

export function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

export async function loadCompletionForDate(
  prayerInputs: PrayerProgressItem[],
  dateKey: string,
): Promise<{ completedCount: number; totalPrayers: number }> {
  let count = 0;
  for (const { id, trackingType } of prayerInputs) {
    const stored = await AsyncStorage.getItem(getStorageKey(id));
    if (trackingType === 'count') {
      if (stored && stored.startsWith('{')) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.date === dateKey && parsed.count > 0) {
            count++;
          }
        } catch {
          // malformed storage, skip
        }
      }
    } else {
      if (stored === dateKey) {
        count++;
      }
    }
  }
  return { completedCount: count, totalPrayers: prayerInputs.length };
}

let refreshListeners: (() => void)[] = [];

export function notifyPrayerToggled() {
  refreshListeners.forEach((fn) => fn());
}

export function usePrayerTracker(prayerId: string, onToggle?: () => void) {
  const [isPrayedToday, setIsPrayedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(getStorageKey(prayerId));
        if (stored) {
          setIsPrayedToday(stored === getTodayKey());
        } else {
          setIsPrayedToday(false);
        }
      } catch {
        setIsPrayedToday(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [prayerId]);

  const togglePrayer = useCallback(async () => {
    const today = getTodayKey();
    const newState = !isPrayedToday;
    setIsPrayedToday(newState);

    try {
      if (newState) {
        await AsyncStorage.setItem(getStorageKey(prayerId), today);
      } else {
        await AsyncStorage.removeItem(getStorageKey(prayerId));
      }
      onToggle?.();
      notifyPrayerToggled();
    } catch {
      setIsPrayedToday(!newState);
    }
  }, [prayerId, isPrayedToday, onToggle]);

  return { isPrayedToday, isLoading, togglePrayer };
}

export function useCountTracker(prayerId: string, onToggle?: () => void) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(getStorageKey(prayerId));
        if (stored && stored.startsWith('{')) {
          const parsed = JSON.parse(stored);
          if (parsed.date === getTodayKey()) {
            setCount(parsed.count);
          } else {
            setCount(0);
          }
        } else {
          setCount(0);
        }
      } catch {
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [prayerId]);

  const increment = useCallback(async () => {
    const newCount = count + 1;
    setCount(newCount);
    try {
      await AsyncStorage.setItem(
        getStorageKey(prayerId),
        JSON.stringify({ date: getTodayKey(), count: newCount }),
      );
      onToggle?.();
      notifyPrayerToggled();
    } catch {
      setCount(count);
    }
  }, [prayerId, count, onToggle]);

  const decrement = useCallback(async () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    try {
      if (newCount > 0) {
        await AsyncStorage.setItem(
          getStorageKey(prayerId),
          JSON.stringify({ date: getTodayKey(), count: newCount }),
        );
      } else {
        await AsyncStorage.removeItem(getStorageKey(prayerId));
      }
      onToggle?.();
      notifyPrayerToggled();
    } catch {
      setCount(count);
    }
  }, [prayerId, count, onToggle]);

  return { count, isLoading, increment, decrement };
}

export type PrayerProgressItem = { id: string; trackingType?: 'daily' | 'count' };

export function useDailyProgress(prayerInputs: PrayerProgressItem[]) {
  const [completedCount, setCompletedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    refreshListeners.push(listener);
    return () => {
      refreshListeners = refreshListeners.filter((fn) => fn !== listener);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await loadCompletionForDate(prayerInputs, getTodayKey());
        setCompletedCount(result.completedCount);
      } catch {
        setCompletedCount(0);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [prayerInputs.map((p) => p.id).join(','), tick]);

  return { completedCount, totalPrayers: prayerInputs.length, isLoading };
}