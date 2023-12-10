import create from 'zustand';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },
  checkUser: async () => {
    try {
      const { data } = await supabase.auth.getUser();
      set({ user: data.user });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
}));

export default useAuthStore;
