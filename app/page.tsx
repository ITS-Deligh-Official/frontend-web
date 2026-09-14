import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BrandLogo from "@/components/auth/BrandLogo";
import { FEATURES } from "@/data/features";
import { ROLES } from "@/data/roles";
import { APP_CONFIG } from "@/lib/config/shared";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-primary">
      <header className="border-b border-grey-20 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <BrandLogo variant="full" theme="light" size={40} href="/" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
            <Button asChild><Link href="/signup">Get Started</Link></Button>
          </div>
        </div>
      </header>

      <section className="bg-deligh-gradient text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">{APP_CONFIG.tagline}</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-tight text-white lg:text-6xl">Build, assess, and verify the skills that shape careers.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{APP_CONFIG.name} connects guided learning, authenticated assessments, verified credentials, and role-based workspaces without displaying fabricated outcomes.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild><Link href="/signup">Create an account <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild><Link href="/login">Open your workspace</Link></Button>
            </div>
          </div>
          <Card className="border-white/15 bg-white/10 p-7 text-white shadow-xl backdrop-blur">
            <ShieldCheck className="h-10 w-10" />
            <h2 className="mt-5 text-2xl font-semibold text-white">Data you can trust</h2>
            <p className="mt-3 leading-7 text-white/75">Learning progress, schedules, assessment results, attendance, and dashboard totals are loaded from authenticated APIs for the signed-in user.</p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Platform journey</p><h2 className="mt-3 text-3xl font-bold">One connected soft-skill workflow</h2></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURES.map(({ icon: Icon, title, description }) => <Card key={title} className="p-5"><Icon className="h-9 w-9 rounded-lg bg-secondary-10 p-2 text-secondary" /><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm text-grey-60">{description}</p></Card>)}
        </div>
      </section>

      <section className="border-y border-grey-20 bg-grey-5">
        <div className="mx-auto max-w-7xl px-6 py-20"><h2 className="text-3xl font-bold">A workspace for every participant</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ROLES.map(({ id, label, icon: Icon }) => <Card key={id} className="p-6"><Icon className="h-6 w-6 text-secondary" /><h3 className="mt-4 font-semibold">{label}</h3><Button variant="link" className="mt-3 h-auto p-0" asChild><Link href={`/signup?role=${encodeURIComponent(id)}`}>Create workspace <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></Card>)}</div></div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-grey-60 sm:flex-row sm:items-center sm:justify-between"><BrandLogo variant="full" theme="light" size={32} href="/" /><div className="flex gap-5"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><a href={`mailto:${APP_CONFIG.supportEmail}`}>Support</a></div></footer>
    </main>
  );
}
