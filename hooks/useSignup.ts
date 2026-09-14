"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/lib/constants";
import type { SignupPayload } from "@/types/auth";

export function useSignup() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function signup(payload: SignupPayload) {
    setIsSubmitting(true);
    try {
      const session = await authService.signup(payload);
      setSession(session);
      toast.success("Account created! Please verify your email.");
      router.push(`${ROUTES.verifyEmail}?email=${encodeURIComponent(payload.email)}`);
    } catch (error) {
      toast.error("We couldn't create your account. Please check your details and try again.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { signup, isSubmitting };
}
