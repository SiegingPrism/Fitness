import { create } from 'zustand';

interface ToastAlert {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppState {
  currentScreen: string;
  showNotificationDrawer: boolean;
  toasts: ToastAlert[];
  
  setCurrentScreen: (screen: string) => void;
  toggleNotificationDrawer: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 'dashboard',
  showNotificationDrawer: false,
  toasts: [],

  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  toggleNotificationDrawer: () => set((state) => ({ showNotificationDrawer: !state.showNotificationDrawer })),
  
  showToast: (message, type = 'info') => {
    const id = `toast_${Date.now()}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },

  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));
