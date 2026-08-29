import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ATHLETE' | 'COACH' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setRole: (role: 'ATHLETE' | 'COACH') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'usr_1',
    email: 'alex.rivera@fitness.com',
    firstName: 'Alex',
    lastName: 'Rivera',
    role: 'ATHLETE'
  },
  accessToken: 'mock_access_token_phase4',
  refreshToken: 'mock_refresh_token_phase4',
  isAuthenticated: true,

  setAuth: (user, accessToken, refreshToken) => set({
    user,
    accessToken,
    refreshToken,
    isAuthenticated: true
  }),

  setRole: (role) => set((state) => ({
    user: state.user ? { ...state.user, role } : null
  })),

  logout: () => set({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
  })
}));
