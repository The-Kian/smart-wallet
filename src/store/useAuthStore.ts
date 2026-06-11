// store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  name: string;
  avatarUrl: string;
  email: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  signIn: (user: UserProfile) => void;
  signOut: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set: (state: Partial<AuthState>) => void) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      signIn: (user: UserProfile) => set({ user, isAuthenticated: true }),
      signOut: () => set({ user: null, isAuthenticated: false }),
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
    }),
    {
      name: 'smart-wallet-auth',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state: AuthState | undefined) => {
        state?.setHydrated(true);
      },
    }
  )
);