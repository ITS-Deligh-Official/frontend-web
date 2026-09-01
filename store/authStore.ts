"use client";

import { create } from "zustand";

import {
  getToken,
  setToken as persistToken,
  clearToken,
} from "@/lib/auth";

import type {
  AuthResponse,
  AuthUser,
  SystemRole,
} from "@/types/auth";

interface AuthState {

  user: AuthUser | null;

  token: string | null;

  isAuthenticated: boolean;

  setSession: (
    session: AuthResponse
  ) => void;

  setUser: (
    user: AuthUser
  ) => void;

  hydrate: () => void;

  logout: () => void;

  /**
   * Development preview only.
   */
  devLogin: (
    role: SystemRole
  ) => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({

    user: null,

    token: null,

    isAuthenticated: false,

    setSession: ({
      token,
      user,
    }) => {

      persistToken(token);

      set({
        token,
        user,
        isAuthenticated: true,
      });

    },

    setUser: (
      user
    ) => {

      set({
        user,
      });

    },

    hydrate: () => {

      const token =
        getToken();

      set({
        token,
        isAuthenticated: !!token,
      });

    },

    logout: () => {

      clearToken();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });

    },

    devLogin: (
      role
    ) => {

      const fakeToken =
        `dev-preview-${role}`;

      const fakeUser: AuthUser = {
        id: `dev-${role}`,
        fullName: `${role} Preview`,
        email: `${role}@preview.local`,
        role: role,
        roles: [role],
        emailVerified: true,
      };

      persistToken(fakeToken);

      set({
        token: fakeToken,
        user: fakeUser,
        isAuthenticated: true,
      });

    },

  }));