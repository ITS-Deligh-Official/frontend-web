"use client";

import { create } from "zustand";
import { getToken, setToken as persistToken, clearToken } from "@/lib/auth";
import type { AuthResponse } from "@/types/auth";

type AuthUser = AuthResponse["user"];

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthResponse) => void;
  setUser: (user: AuthUser) => void;
  hydrate: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setSession: ({ token, user }) => {
    persistToken(token);
    set({ token, user, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),

  hydrate: () => {
    const token = getToken();
    set({ token, isAuthenticated: !!token });
  },

  logout: () => {
    clearToken();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
