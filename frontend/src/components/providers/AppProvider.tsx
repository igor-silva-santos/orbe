'use client';
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAppStore } from '@/stores/appStore';
import { useTheme } from '@/hooks/useTheme';
import { bootstrapSession } from '@/lib/auth/session';
import { mapNotifications, type ApiNotification } from '@/lib/notifications';
import { realApi } from '@/data/realApi';
import SyncRefreshListener from '@/components/providers/SyncRefreshListener';
import orbeNerdApi from '@/lib/api';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const {
    setNotifications,
    login,
    setUser,
    setInteractions,
    setAnimeWeeklyPinIds,
    setAnimeWeeklyPinned,
  } = useAppStore();
  const { isDark } = useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      const user = await bootstrapSession();
      if (!user) {
        setUser(null);
        return;
      }

      login(user);

      try {
        const notifications = await realApi.getNotifications();
        setNotifications(mapNotifications(notifications as ApiNotification[]));
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      }

      try {
        const interactions = await realApi.getInteractions();
        setInteractions(interactions);
      } catch (error) {
        console.error('Erro ao carregar interações do usuário:', error);
      }

      try {
        const weekly = await orbeNerdApi.getAnimeWeeklyPins();
        setAnimeWeeklyPinIds(weekly.anilistIds ?? []);
        setAnimeWeeklyPinned(weekly.animes ?? []);
      } catch (error) {
        console.error('Erro ao carregar animes da semana:', error);
      }
    };

    initializeApp();
  }, [login, setUser, setNotifications, setInteractions, setAnimeWeeklyPinIds, setAnimeWeeklyPinned]);

  return (
    <>
      <SyncRefreshListener />
      {children}
      <Toaster theme={isDark ? 'dark' : 'light'} richColors closeButton position="bottom-right" />
    </>
  );
};
