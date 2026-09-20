import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Notification, Theme, Filme, Serie, Anime, Jogo, UserInteraction } from '@/types';
import orbeNerdApi from '@/lib/api';

interface AppState {
  // Estado do usuário
  user: User | null;
  isAuthenticated: boolean;
  userInteractions: UserInteraction[];
  animeWeeklyPinIds: number[];
  animeWeeklyPinned: Anime[];

  // Estado do tema
  theme: Theme;
  
  // Estado das notificações
  notifications: Notification[];
  unreadCount: number;
  
  // Estado dos modais
  isSearchOpen: boolean;
  isNotificationModalOpen: boolean;
  isSuperModalOpen: boolean;
  superModalData: {
    midia: Filme | Serie | Anime | Jogo | null;
    type: 'filme' | 'serie' | 'anime' | 'jogo' | null;
  };
  isRatingModalOpen: boolean;
  ratingModalData: {
    midia: Filme | Serie | Anime | Jogo | null;
    type: 'filme' | 'serie' | 'anime' | 'jogo' | null;
    action: 'ja_assisti' | 'ja_joguei' | null;
  };
  isCalendarModalOpen: boolean;
  calendarModalData: {
    midia: Filme | Serie | Anime | Jogo | null;
    type: 'filme' | 'serie' | 'anime' | 'jogo' | null;
  };
  currentDetailModal: {
    isOpen: boolean;
    midia: Filme | Serie | Anime | Jogo | null;
    type: string;
  } | null;
  
  // Estado de carregamento
  isLoading: boolean;

  // Rolagem rápida dos carrosséis
  fastScrollEnabled: boolean;
  toggleFastScroll: () => void;

  // Ações do usuário
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  setInteractions: (interactions: UserInteraction[]) => void;
  upsertInteraction: (interaction: UserInteraction) => void;
  setAnimeWeeklyPinIds: (ids: number[]) => void;
  setAnimeWeeklyPinned: (animes: Anime[]) => void;
  mergePinnedAnimes: (animes: Anime[]) => void;

  // Ações do tema
  setTheme: (theme: Theme) => void;
  
  // Ações das notificações
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: number) => void;
  
  // Ações dos modais
  openSearch: () => void;
  closeSearch: () => void;
  openNotificationModal: () => void;
  closeNotificationModal: () => void;
  openSuperModal: (midia: Filme | Serie | Anime | Jogo, type: 'filme' | 'serie' | 'anime' | 'jogo') => void;
  closeSuperModal: () => void;
  openRatingModal: (midia: Filme | Serie | Anime | Jogo, type: 'filme' | 'serie' | 'anime' | 'jogo', action: 'ja_assisti' | 'ja_joguei') => void;
  closeRatingModal: () => void;
  openCalendarModal: (data: { midia: Filme | Serie | Anime | Jogo | null; type: 'filme' | 'serie' | 'anime' | 'jogo' | null; }) => void;
  closeCalendarModal: () => void;
  openDetailModal: (midia: Filme | Serie | Anime | Jogo, type: string) => void;
  closeDetailModal: () => void;
  
  // Ações de carregamento
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      userInteractions: [],
      animeWeeklyPinIds: [],
      animeWeeklyPinned: [],
      theme: 'system',
      notifications: [],
      unreadCount: 0,
      isSearchOpen: false,
      isNotificationModalOpen: false,
      isSuperModalOpen: false,
      superModalData: {
        midia: null,
        type: null
      },
      isRatingModalOpen: false,
      ratingModalData: {
        midia: null,
        type: null,
        action: null
      },
      isCalendarModalOpen: false,
      calendarModalData: {
        midia: null,
        type: null
      },
      currentDetailModal: null,
      isLoading: false,
      fastScrollEnabled: false,
      toggleFastScroll: () => set((state) => ({ fastScrollEnabled: !state.fastScrollEnabled })),

      // Ações do usuário
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        notifications: [],
        unreadCount: 0,
        userInteractions: [],
        animeWeeklyPinIds: [],
        animeWeeklyPinned: [],
      }),

      setInteractions: (interactions) => set({ userInteractions: interactions }),

      setAnimeWeeklyPinIds: (ids) => set({ animeWeeklyPinIds: ids }),

      setAnimeWeeklyPinned: (animes) => set({ animeWeeklyPinned: animes }),

      mergePinnedAnimes: (animes) => {
        const { animeWeeklyPinned } = get();
        const byId = new Map(animeWeeklyPinned.map((a) => [a.id, a]));
        animes.forEach((a) => byId.set(a.id, a));
        set({ animeWeeklyPinned: Array.from(byId.values()) });
      },

      upsertInteraction: (interaction) => {
        const { userInteractions } = get();
        const index = userInteractions.findIndex(i => i.midia_id === interaction.midia_id && i.tipo_midia === interaction.tipo_midia);
        const newInteractions = [...userInteractions];
        if (index > -1) {
          newInteractions[index] = interaction;
        } else {
          newInteractions.push(interaction);
        }
        set({ userInteractions: newInteractions });
      },

      // Ações do tema
      setTheme: (theme) => set({ theme }),

      // Ações das notificações
      setNotifications: (notifications) => {
        const unreadCount = notifications.filter(n => !n.foi_visualizada).length;
        set({ notifications, unreadCount });
      },
      
      addNotification: (notification) => {
        const { notifications } = get();
        const newNotifications = [notification, ...notifications];
        const unreadCount = newNotifications.filter(n => !n.foi_visualizada).length;
        set({ 
          notifications: newNotifications, 
          unreadCount 
        });
      },
      
      markNotificationAsRead: (id) => {
        const { notifications } = get();
        const previous = notifications;
        const updatedNotifications = notifications.map(n =>
          n.id === id ? { ...n, foi_visualizada: true } : n
        );
        const unreadCount = updatedNotifications.filter(n => !n.foi_visualizada).length;
        set({
          notifications: updatedNotifications,
          unreadCount
        });

        orbeNerdApi.markNotificationAsRead(id).catch((error) => {
          console.error('Erro ao marcar notificação como lida:', error);
          const revertedUnreadCount = previous.filter(n => !n.foi_visualizada).length;
          set({ notifications: previous, unreadCount: revertedUnreadCount });
        });
      },

      markAllNotificationsAsRead: () => {
        const { notifications } = get();
        const previous = notifications;
        const updatedNotifications = notifications.map(n => ({
          ...n,
          foi_visualizada: true
        }));
        set({
          notifications: updatedNotifications,
          unreadCount: 0
        });

        orbeNerdApi.markAllNotificationsAsRead().catch((error) => {
          console.error('Erro ao marcar todas notificações como lidas:', error);
          const revertedUnreadCount = previous.filter(n => !n.foi_visualizada).length;
          set({ notifications: previous, unreadCount: revertedUnreadCount });
        });
      },

      deleteNotification: (id) => {
        const { notifications } = get();
        const previous = notifications;
        const updatedNotifications = notifications.filter(n => n.id !== id);
        const unreadCount = updatedNotifications.filter(n => !n.foi_visualizada).length;
        set({
          notifications: updatedNotifications,
          unreadCount
        });

        orbeNerdApi.deleteNotification(id).catch((error) => {
          console.error('Erro ao excluir notificação:', error);
          const revertedUnreadCount = previous.filter(n => !n.foi_visualizada).length;
          set({ notifications: previous, unreadCount: revertedUnreadCount });
        });
      },

      // Ações dos modais
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      
      openNotificationModal: () => set({ isNotificationModalOpen: true }),
      closeNotificationModal: () => set({ isNotificationModalOpen: false }),
      
      openSuperModal: (midia: Filme | Serie | Anime | Jogo, type: 'filme' | 'serie' | 'anime' | 'jogo') => {
        set({
          isSuperModalOpen: true,
          superModalData: { midia, type },
          // Evita o modal de detalhe abrir atrás do overlay de busca quando aberto a partir de um resultado
          isSearchOpen: false,
        });
      },

      closeSuperModal: () => {
        set({ 
          isSuperModalOpen: false,
          superModalData: { midia: null, type: null }
        });
      },

      openRatingModal: (midia: Filme | Serie | Anime | Jogo, type: 'filme' | 'serie' | 'anime' | 'jogo', action: 'ja_assisti' | 'ja_joguei') => {
        set({ 
          isRatingModalOpen: true,
          ratingModalData: { midia, type, action }
        });
      },

      closeRatingModal: () => {
        set({ 
          isRatingModalOpen: false,
          ratingModalData: { midia: null, type: null, action: null }
        });
      },

      openCalendarModal: (data) => {
        set({ 
          isCalendarModalOpen: true,
          calendarModalData: data
        });
      },
      closeCalendarModal: () => {
        set({ 
          isCalendarModalOpen: false,
          calendarModalData: { midia: null, type: null }
        });
      },
      
      openDetailModal: (midia, type) => set({ 
        currentDetailModal: { isOpen: true, midia, type } 
      }),
      closeDetailModal: () => set({ 
        currentDetailModal: null 
      }),

      // Ações de carregamento
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'orbe-nerd-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        userInteractions: state.userInteractions,
        fastScrollEnabled: state.fastScrollEnabled,
      }),
    }
  )
);

