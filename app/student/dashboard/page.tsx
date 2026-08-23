import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressRing from "@/components/dashboard/ProgressRing";
import ScheduleDialog from "@/components/dashboard/student/ScheduleDialog";
import { studentDashboardService } from "@/services/student/dashboard.service";
import {
  BookOpen,
  CalendarClock,
  Clock,
  Activity,
  Trophy,
  Star,
  ArrowRight,
} from "lucide-react";

const ICONS = {
  learning: BookOpen,
  classes: CalendarClock,
  assessment: Clock,
  activity: Activity,
  achievements: Trophy,
  recommended: Star,
} as const;

const ICON_BG = {
  learning: "bg-success-10 text-success-80",
  classes: "bg-secondary-10 text-secondary-90",
  assessment: "bg-warning-10 text-warning-80",
  activity: "bg-secondary-20 text-secondary-90",
  achievements: "bg-error-10 text-error-70",
  recommended: "bg-primary-10/15 text-primary",
} as const;

export default async function StudentDashboardPage() {
  const data = await studentDashboardService.getDashboard();

  const medalColors = ["#F59E0B", "#9E9E9E", "#B07004"]; // gold, silver, bronze-ish per brand warning scale

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {/* Welcome banner */}
        <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">
              Welcome back, {data.welcomeName}!
            </h1>
            <p className="mt-1 text-sm text-grey-60">Keep learning, keep growing — you&apos;re doing great.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/student/learning">
                <Button>Continue Learning</Button>
              </Link>
              <ScheduleDialog />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-grey-10 p-4">
            <p className="text-xs font-medium text-grey-60">This week&apos;s progress</p>
            <ProgressRing percent={data.weekProgressPercent} color="#22C55E" />
            <p className="text-xs font-medium text-success-80">Keep it up! ↗</p>
          </div>
        </Card>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {data.summaryCards.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <Link key={card.id} href={card.href}>
                <Card className="group flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-card-hover">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ICON_BG[card.icon]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{card.title}</p>
                    <p className="mt-1 text-sm text-grey-60">{card.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right rail: top performers + rank list */}
      <div className="space-y-6">
        <Card className="p-5">
          <h2 className="font-display text-base font-bold text-primary">Top Performers</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {data.topPerformers.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: medalColors[p.rank - 1] }}
                >
                  {p.name.slice(0, 1)}
                </div>
                <p className="mt-2 text-xs font-semibold text-primary">{p.name}</p>
                <p className="text-[10px] text-grey-50">{p.track}</p>
                <span className="mt-1 text-[10px] font-semibold text-grey-60">
                  {p.rank === 1 ? "First" : p.rank === 2 ? "Second" : "Third"}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-primary">Rank List</h2>
            <Link href="/student/career" className="flex items-center gap-1 text-xs font-medium text-secondary hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-grey-20 text-left text-xs font-medium text-grey-50">
                <th className="pb-2 pr-2">Rank</th>
                <th className="pb-2 pr-2">Name</th>
                <th className="pb-2">Course</th>
              </tr>
            </thead>
            <tbody>
              {data.rankList.map((row) => (
                <tr key={row.rank} className="border-b border-grey-20/60 last:border-0">
                  <td className="py-2 pr-2 font-semibold text-primary">{row.rank}</td>
                  <td className="py-2 pr-2 text-grey-70">{row.name}</td>
                  <td className="py-2 text-grey-60">{row.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
