"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck, Loader2, XCircle } from "lucide-react";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import AuthHeader from "@/components/auth/AuthHeader";

type Status = "pending" | "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>(token ? "verifying" : "pending");

  useEffect(() => {
    if (!token) return;
    authService
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  if (status === "pending") {
    return (
      <>
        <AuthHeader title="Verify Your Email" subtitle="We've sent a verification link to your email address." />
        <div className="mt-8 flex flex-col items-center gap-4 rounded-lg bg-violet-50 p-6 text-center">
          <MailCheck className="h-8 w-8 text-violet-600" />
          <p className="text-sm text-slate-600">
            Click the link in that email to activate your account. Didn&apos;t get it? Check
            your spam folder or request a new one below.
          </p>
          <Button type="button" variant="outline">
            Resend Verification Email
          </Button>
        </div>
      </>
    );
  }

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-sm text-slate-500">Verifying your email\u2026</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <XCircle className="h-8 w-8 text-red-500" />
        <p className="text-sm text-slate-600">
          That verification link is invalid or has expired.
        </p>
        <Button type="button" variant="outline">
          Resend Verification Email
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <MailCheck className="h-8 w-8 text-emerald-500" />
      <p className="text-sm font-medium text-slate-900">Your email is verified!</p>
      <Button asChild className="mt-2 w-full">
        <Link href="/complete-profile">Continue</Link>
      </Button>
    </div>
  );
}
