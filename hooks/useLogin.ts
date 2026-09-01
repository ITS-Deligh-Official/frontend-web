"use client";

import { useState } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { toast } from "sonner";

import { authService } from "@/services/auth.service";

import {
  getRoleHome,
} from "@/lib/constants";

import { useAuthStore } from "@/store/authStore";

import type {
  LoginPayload,
} from "@/types/auth";

export function useLogin() {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const setSession =
    useAuthStore(
      (state) => state.setSession
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function login(
    payload: LoginPayload
  ) {

    setIsSubmitting(true);

    try {

      const session =
        await authService.login(payload);

      setSession(session);

      toast.success(
        "Welcome back!"
      );

      const redirect =
        searchParams.get("redirect");

      const roleHome =
        getRoleHome(
          session.user.role
        );

      router.push(
        redirect || roleHome
      );

    } catch (error) {

      toast.error(
        "We couldn't log you in. Check your email and password and try again."
      );

      throw error;

    } finally {

      setIsSubmitting(false);

    }
  }

  return {
    login,
    isSubmitting,
  };
}