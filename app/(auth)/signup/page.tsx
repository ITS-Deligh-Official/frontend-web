import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Create Account — ITS Deligh" };

export default function SignupPage() {
  return <SignupForm />;
}
