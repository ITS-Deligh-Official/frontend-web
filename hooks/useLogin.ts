"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/lib/constants";
import type { LoginPayload } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function login(payload: LoginPayload) {
    setIsSubmitting(true);
    try {
      const session = await authService.login(payload);
      setSession(session);
      toast.success("Welcome back!");
      const redirect = searchParams.get("redirect") || ROUTES.dashboard;
      router.push(redirect);
    } catch (error) {
      toast.error("We couldn't log you in. Check your email and password and try again.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { login, isSubmitting };
}
