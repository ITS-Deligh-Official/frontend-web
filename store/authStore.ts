"use client";

import { create } from "zustand";
import { getToken, setToken as persistToken, clearToken } from "@/lib/auth";
import type { AuthResponse } from "@/types/auth";
import type { Role } from "@/types/auth";

type AuthUser = AuthResponse["user"];

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthResponse) => void;
  setUser: (user: AuthUser) => void;
  hydrate: () => void;
  logout: () => void;
  /**
   * PREVIEW-ONLY. Lets you open a role's dashboard before the Spring Boot
   * auth endpoints exist, by faking a session locally — no network call.
   * Only ever surfaced in the UI while NEXT_PUBLIC_USE_MOCK_DATA=true (see
   * the "Preview mode" panel on the login page). Safe to delete once real
   * login is wired up; nothing else in the app depends on this.
   */
  devLogin: (role: Role) => void;
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

  devLogin: (role) => {
    const fakeToken = `dev-preview-${role}`;
    const fakeUser: AuthUser = {
      id: `dev-${role}`,
      fullName: role.charAt(0).toUpperCase() + role.slice(1) + " Preview",
      email: `${role}@preview.local`,
      role,
      emailVerified: true,
    };
    persistToken(fakeToken);
    set({ token: fakeToken, user: fakeUser, isAuthenticated: true });
  },
}));
