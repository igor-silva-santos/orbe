'use client';
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAppStore } from '@/stores/appStore';
import { useTheme } from '@/hooks/useTheme';
import { realApi } from '@/data/realApi';
import orbeNerdApi from '@/lib/api';
import SyncRefreshListener from '@/components/providers/SyncRefreshListener';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { 
    setNotifications,
    setUser,
    setInteractions,
    setAnimeWeeklyPinIds,
    setAnimeWeeklyPinned,
  } = useAppStore();
  
  const { isDark } = useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const userData = await orbeNerdApi.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar usuário atual:', error);
        return;
      }

      try {
        const notifications = await realApi.getNotifications();
        setNotifications(notifications);
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
  }, [setUser, setNotifications, setInteractions, setAnimeWeeklyPinIds, setAnimeWeeklyPinned]);

  return (
    <>
      <SyncRefreshListener />
      {children}
      <Toaster theme={isDark ? 'dark' : 'light'} richColors closeButton position="bottom-right" />
    </>
  );
}
