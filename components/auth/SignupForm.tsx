"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, UserPlus } from "lucide-react";
import { signupSchema, type SignupSchema } from "@/schemas/signupSchema";
import { useSignup } from "@/hooks/useSignup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/common/ErrorMessage";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import RoleSelector from "./RoleSelector";
import TermsCheckbox from "./TermsCheckbox";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

export default function SignupForm() {
  const { signup, isSubmitting } = useSignup();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: "student",
      agreeToTerms: undefined as unknown as true,
    },
  });

  const password = watch("password") || "";
  const role = watch("role");
  const agreeToTerms = watch("agreeToTerms");

  async function onSubmit(values: SignupSchema) {
    setSubmitError(null);
    try {
      await signup({
        fullName: values.fullName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        role: values.role,
      });
    } catch {
      setSubmitError("We couldn't create your account. Please check your details and try again.");
    }
  }

  return (
    <>
      <AuthHeader title="Create Your Account" subtitle="Start your verified learning journey." />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="fullName"
              placeholder="Enter your full name"
              autoComplete="name"
              invalid={!!errors.fullName}
              className="pl-9"
              {...register("fullName")}
            />
          </div>
          <ErrorMessage message={errors.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              invalid={!!errors.email}
              className="pl-9"
              {...register("email")}
            />
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter 10 digit mobile number"
              autoComplete="tel"
              invalid={!!errors.mobile}
              className="pl-9"
              {...register("mobile")}
            />
          </div>
          <ErrorMessage message={errors.mobile?.message} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Create a password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">Password must contain:</p>
          <PasswordStrength password={password} />
        </div>

        <RoleSelector value={role ?? null} onChange={(r) => setValue("role", r)} error={errors.role?.message} />

        <TermsCheckbox
          checked={!!agreeToTerms}
          onCheckedChange={(v) => setValue("agreeToTerms", v as true)}
          error={errors.agreeToTerms?.message}
        />

        <ErrorMessage message={submitError ?? undefined} />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          <UserPlus className="h-4 w-4" />
          {isSubmitting ? "Creating account\u2026" : "Create Account"}
        </Button>

        <AuthFooter>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-violet-600 hover:underline">
            Login
          </Link>
        </AuthFooter>
      </form>
    </>
  );
}
