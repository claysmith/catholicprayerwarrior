import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  dateToKey,
  loadCompletionForDate,
  type PrayerProgressItem,
} from '@/hooks/use-prayer-tracker';

const HISTORY_KEY = 'prayer_history';

export type DayStatus = 'complete' | 'partial' | 'none';

export interface DayRecord {
  dateKey: string;
  weekday: string;
  completed: number;
  total: number;
  status: DayStatus;
  isToday: boolean;
}

interface DaySnapshot {
  completed: number;
  total: number;
}

type HistoryMap = Record<string, DaySnapshot>;

let historyListeners: (() => void)[] = [];

export function notifyHistoryChanged() {
  historyListeners.forEach((fn) => fn());
}

async function readHistory(): Promise<HistoryMap> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed as HistoryMap;
      }
    }
  } catch {
    // malformed, start fresh
  }
  return {};
}

async function writeHistory(history: HistoryMap): Promise<void> {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore write failure
  }
}

async function snapshotToday(prayerInputs: PrayerProgressItem[]): Promise<DaySnapshot | null> {
  const todayKey = dateToKey(new Date());
  const { completedCount, totalPrayers } = await loadCompletionForDate(prayerInputs, todayKey);
  if (completedCount === 0) {
    return null;
  }
  return { completed: completedCount, total: totalPrayers };
}

function computeStreak(history: HistoryMap): { current: number; longest: number } {
  const today = new Date();
  const todayKey = dateToKey(today);

  // Current streak: walk back starting yesterday if today has no entry,
  // otherwise include today. A day counts if completed > 0.
  let current = 0;
  const todayEntry = history[todayKey];
  if (todayEntry && todayEntry.completed > 0) {
    current = 1;
  }
  let cursor = new Date(today);
  cursor.setDate(cursor.getDate() - 1);
  while (true) {
    const key = dateToKey(cursor);
    const entry = history[key];
    if (entry && entry.completed > 0) {
      current++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  // Longest streak: scan all recorded days sorted ascending, find max run.
  let longest = 0;
  let run = 0;
  let prevKey: string | null = null;
  const sortedKeys = Object.keys(history)
    .filter((k) => history[k].completed > 0)
    .sort();
  for (const key of sortedKeys) {
    if (prevKey !== null) {
      const prevDate = new Date(prevKey + 'T00:00:00');
      const curDate = new Date(key + 'T00:00:00');
      const diffDays = Math.round(
        (curDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays === 1) {
        run++;
      } else {
        run = 1;
      }
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
    prevKey = key;
  }
  if (current > longest) longest = current;

  return { current, longest };
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildWeek(history: HistoryMap): DayRecord[] {
  const today = new Date();
  const todayKey = dateToKey(today);
  const days: DayRecord[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = dateToKey(d);
    const entry = history[key];
    const completed = entry?.completed ?? 0;
    const total = entry?.total ?? 0;
    let status: DayStatus = 'none';
    if (completed > 0 && total > 0 && completed >= total) {
      status = 'complete';
    } else if (completed > 0) {
      status = 'partial';
    }
    days.push({
      dateKey: key,
      weekday: WEEKDAY_LABELS[d.getDay()],
      completed,
      total,
      status,
      isToday: key === todayKey,
    });
  }
  return days;
}

export function usePrayerStreak(prayerInputs: PrayerProgressItem[]) {
  const [streak, setStreak] = useState(0);
  const [longest, setLongest] = useState(0);
  const [week, setWeek] = useState<DayRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);

  // Refresh when any prayer toggles, then re-snapshot today.
  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    historyListeners.push(listener);
    return () => {
      historyListeners = historyListeners.filter((fn) => fn !== listener);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function refresh() {
      const history = await readHistory();
      const todaySnap = await snapshotToday(prayerInputs);
      const todayKey = dateToKey(new Date());
      let changed = false;
      if (todaySnap) {
        const existing = history[todayKey];
        if (
          !existing ||
          existing.completed !== todaySnap.completed ||
          existing.total !== todaySnap.total
        ) {
          history[todayKey] = todaySnap;
          changed = true;
        }
      } else if (history[todayKey]) {
        delete history[todayKey];
        changed = true;
      }
      if (changed) {
        await writeHistory(history);
      }
      if (cancelled) return;
      const { current, longest: longestCalc } = computeStreak(history);
      setStreak(current);
      setLongest(longestCalc);
      setWeek(buildWeek(history));
      setIsLoading(false);
    }
    refresh();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerInputs.map((p) => p.id).join(','), tick]);

  return { streak, longest, week, isLoading };
}
