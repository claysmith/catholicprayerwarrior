import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'prayer_reminders';
const CHANNEL_ID = 'prayer-reminders';

export interface ReminderSlot {
  id: string;
  label: string;
  body: string;
  hour: number;
  minute: number;
}

export const REMINDER_SLOTS: ReminderSlot[] = [
  {
    id: 'angelus-morning',
    label: 'Angelus — Morning',
    body: 'The Angel of the Lord declared unto Mary. Pray the Angelus.',
    hour: 6,
    minute: 0,
  },
  {
    id: 'angelus-noon',
    label: 'Angelus — Noon',
    body: 'Behold the handmaid of the Lord. Pray the Angelus.',
    hour: 12,
    minute: 0,
  },
  {
    id: 'angelus-evening',
    label: 'Angelus — Evening',
    body: 'And the Word was made flesh. Pray the Angelus.',
    hour: 18,
    minute: 0,
  },
  {
    id: 'daily-morning',
    label: 'Morning Prayer',
    body: 'Begin your day with prayer. Make your Morning Offering.',
    hour: 7,
    minute: 0,
  },
  {
    id: 'daily-evening',
    label: 'Evening Prayer',
    body: 'End your day with prayer. Reflect on the day and pray.',
    hour: 21,
    minute: 0,
  },
];

type ReminderState = Record<string, boolean>;

let notificationsModule: typeof import('expo-notifications') | null = null;
let notificationsAvailable = false;

async function getNotifications() {
  if (notificationsModule) return notificationsModule;
  try {
    const mod = await import('expo-notifications');
    notificationsModule = mod;
    notificationsAvailable = true;
    mod.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    return mod;
  } catch {
    notificationsAvailable = false;
    return null;
  }
}

async function ensureChannel() {
  if (Platform.OS === 'android') {
    const mod = await getNotifications();
    if (!mod) return;
    await mod.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Prayer Reminders',
      importance: mod.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
}

async function readState(): Promise<ReminderState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed as ReminderState;
      }
    }
  } catch {
    // malformed
  }
  return {};
}

async function writeState(state: ReminderState): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

async function scheduleSlot(slot: ReminderSlot): Promise<string | null> {
  const mod = await getNotifications();
  if (!mod) return null;
  try {
    const id = await mod.scheduleNotificationAsync({
      content: {
        title: 'Catholic Prayer Warrior',
        body: slot.body,
        data: { reminderId: slot.id },
      },
      trigger: {
        type: mod.SchedulableTriggerInputTypes.DAILY,
        hour: slot.hour,
        minute: slot.minute,
        channelId: Platform.OS === 'android' ? CHANNEL_ID : undefined,
      },
    });
    return id;
  } catch {
    return null;
  }
}

export function usePrayerReminders() {
  const [enabled, setEnabled] = useState<ReminderState>({});
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [available, setAvailable] = useState(notificationsAvailable);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      const mod = await getNotifications();
      if (cancelled) return;
      if (!mod) {
        setAvailable(false);
        setIsLoading(false);
        return;
      }
      setAvailable(true);
      await ensureChannel();
      const settings = await mod.getPermissionsAsync();
      const granted =
        settings.granted ||
        settings.ios?.status === mod.IosAuthorizationStatus.PROVISIONAL;
      if (cancelled) return;
      setPermissionGranted(granted);
      const state = await readState();
      if (cancelled) return;
      setEnabled(state);
      setIsLoading(false);
    }
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const mod = await getNotifications();
    if (!mod) return false;
    await ensureChannel();
    const settings = await mod.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    const granted =
      settings.granted || settings.ios?.status === mod.IosAuthorizationStatus.PROVISIONAL;
    setPermissionGranted(granted);
    return granted;
  }, []);

  const toggleReminder = useCallback(
    async (slot: ReminderSlot) => {
      const mod = await getNotifications();
      if (!mod) return;

      const wasOn = !!enabled[slot.id];
      const nextState = !wasOn;

      if (nextState) {
        if (!permissionGranted) {
          const ok = await requestPermission();
          if (!ok) return;
        }
        const id = await scheduleSlot(slot);
        if (!id) return;
        const updated = { ...enabled, [slot.id]: true };
        setEnabled(updated);
        await writeState(updated);
      } else {
        const scheduled = await mod.getAllScheduledNotificationsAsync();
        const target = scheduled.find((n) => n.content.data?.reminderId === slot.id);
        if (target) {
          await mod.cancelScheduledNotificationAsync(target.identifier);
        }
        const updated = { ...enabled };
        delete updated[slot.id];
        setEnabled(updated);
        await writeState(updated);
      }
    },
    [enabled, permissionGranted, requestPermission],
  );

  return { enabled, permissionGranted, isLoading, available, toggleReminder, requestPermission };
}
