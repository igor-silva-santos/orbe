'use client';

import { useCallback, useEffect } from 'react';
import orbeNerdApi from '@/lib/api';
import { mapNotifications, type ApiNotification } from '@/lib/notifications';
import { useAppStore } from '@/stores/appStore';

export function useNotifications() {
  const { isAuthenticated, setNotifications, notifications } = useAppStore();

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      return;
    }
    try {
      const data = await orbeNerdApi.getNotifications();
      setNotifications(mapNotifications(data as ApiNotification[]));
    } catch {
      setNotifications([]);
    }
  }, [isAuthenticated, setNotifications]);

  useEffect(() => {
    refresh();
    if (!isAuthenticated) return;
    const interval = setInterval(refresh, 60_000);
    return () => clearInterval(interval);
  }, [isAuthenticated, refresh]);

  const markAsRead = useCallback(
    async (id: number) => {
      await orbeNerdApi.markNotificationAsRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, foi_visualizada: true } : n))
      );
    },
    [notifications, setNotifications]
  );

  const markAllRead = useCallback(async () => {
    await orbeNerdApi.markAllNotificationsAsRead();
    setNotifications(notifications.map((n) => ({ ...n, foi_visualizada: true })));
  }, [notifications, setNotifications]);

  return { refresh, markAsRead, markAllRead };
}
