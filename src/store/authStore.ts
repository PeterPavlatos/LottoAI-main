import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  credits: number;
  setUser: (user: any) => void;
  setCredits: (credits: number) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  credits: 0,
  setUser: (user) => set({ user }),
  setCredits: (credits) => set({ credits }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, credits: 0 });
    window.location.href = '/';
  },
}));