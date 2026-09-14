"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { getRoleHome } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";

import type {
  LoginPayload,
  AuthResponse,
} from "@/types/auth";

function getLoginErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    if (response?.data?.message) {
      return response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to log in. Please try again.";
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSession = useAuthStore(
    (state) => state.setSession
  );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function login(
    payload: LoginPayload
  ): Promise<AuthResponse> {
    setIsSubmitting(true);

    try {
      let session: AuthResponse;

      /*
       * STEP 1:
       * Authenticate with backend.
       */
      try {
        session = await authService.login(payload);
      } catch (error) {
        const message =
          getLoginErrorMessage(error);

        toast.error(message);

        throw new Error(message);
      }

      /*
       * STEP 2:
       * Validate successful backend response.
       */
      if (!session?.token) {
        throw new Error(
          "Login succeeded but no access token was received."
        );
      }

      if (!session?.user) {
        throw new Error(
          "Login succeeded but user information was not received."
        );
      }

      /*
       * STEP 3:
       * Save authenticated session.
       */
      setSession(session);

      /*
       * STEP 4:
       * Determine destination.
       */
      const redirect =
        searchParams.get("redirect");

      const roleHome =
        getRoleHome(
          session.user.role
        );

      /*
       * STEP 5:
       * Show success message.
       */
      toast.success("Welcome back!");

      /*
       * STEP 6:
       * Redirect user.
       */
      router.replace(
        redirect || roleHome
      );

      return session;

    } catch (error) {
      /*
       * Backend authentication errors were already
       * handled above. Frontend/session errors come here.
       */
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(
        "Unable to complete login. Please try again."
      );

    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    login,
    isSubmitting,
  };
}