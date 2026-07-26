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

let refreshListeners: Array<() => void> = [];

export function notifyPrayerToggled() {
  refreshListeners.forEach((fn) => fn());
}

export function usePrayerTracker(prayerId: string, onToggle?: () => void) {
  const [isPrayedToday, setIsPrayedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStatus();
  }, [prayerId]);

  async function loadStatus() {
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
  }

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

export function useDailyProgress(prayerIds: string[]) {
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
    loadProgress();
  }, [prayerIds.join(','), tick]);

  async function loadProgress() {
    try {
      const today = getTodayKey();
      let count = 0;

      for (const id of prayerIds) {
        const stored = await AsyncStorage.getItem(getStorageKey(id));
        if (stored === today) {
          count++;
        }
      }

      setCompletedCount(count);
    } catch {
      setCompletedCount(0);
    } finally {
      setIsLoading(false);
    }
  }

  return { completedCount, totalPrayers: prayerIds.length, isLoading };
}
