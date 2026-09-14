import Link from "next/link";
import { Button } from "@/components/ui/button";
import AiChatButton from "@/components/dashboard/student/AiChatButton";
import { GraduationCap, ClipboardCheck, TrendingUp } from "lucide-react";

export default function StudentHomePage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <span className="inline-flex items-center rounded-full bg-secondary-10 px-3 py-1 text-xs font-semibold text-secondary-100">
          Welcome to Deligh Campus
        </span>
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-primary sm:text-5xl">
          Turn what you&apos;re learning into a career-ready profile.
        </h1>
        <p className="mt-4 max-w-xl text-grey-70">
          Track your courses, take skill assessments, and build a verified
          record of what you can actually do — all in one dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/student/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <AiChatButton />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-deligh-gradient p-8 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <p className="text-sm font-medium text-white/70">This week</p>
        <p className="mt-1 font-display text-2xl font-bold">You&apos;re 75% through your goals</p>
        <div className="mt-6 space-y-4">
          {[
            { icon: GraduationCap, label: "Communication Skills", detail: "Module 4 of 24" },
            { icon: ClipboardCheck, label: "Soft Skills Assessment", detail: "8 of 20 questions" },
            { icon: TrendingUp, label: "Career readiness", detail: "75% complete" },
          ].map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{row.label}</p>
                  <p className="text-xs text-white/60">{row.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
