'use client';
import React, { useEffect } from 'react';
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
  } = useAppStore();
  
  useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const userData = await orbeNerdApi.getCurrentUser();
          setUser(userData);
          
          const notifications = await realApi.getNotifications();
          setNotifications(notifications);

          const interactions = await realApi.getInteractions();
          setInteractions(interactions);
        }
      } catch (error) {
        console.error('Erro ao inicializar app:', error);
      }
    };

    initializeApp();
  }, [setUser, setNotifications, setInteractions]);

  return (
    <>
      <SyncRefreshListener />
      {children}
    </>
  );
}
