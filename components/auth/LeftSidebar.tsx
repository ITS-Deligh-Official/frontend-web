import BrandLogo from "./BrandLogo";
import FeatureTimeline from "./FeatureTimeline";
import LoginIllustration from "./LoginIllustration";

export type SidebarVariant = "login" | "signup" | "generic";

const COPY: Record<SidebarVariant, { heading: React.ReactNode; body: string }> = {
  login: {
    heading: (
      <>
        Learn. Assess.
        <br />
        Get Verified.{" "}
        <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
          Get Hired.
        </span>
      </>
    ),
    body: "ITS Deligh bridges the gap between education and employability through verified skills, assessments and trusted talent discovery.",
  },
  signup: {
    heading: (
      <>
        Join <span className="text-violet-300">Thousands</span>
        <br />
        of Future Professionals
      </>
    ),
    body: "Create your account and start your journey towards verified skills and better career opportunities.",
  },
  generic: {
    heading: (
      <>
        Building the Future of
        <br />
        <span className="text-violet-300">Verified Employability</span>
      </>
    ),
    body: "A trusted ecosystem connecting learning, assessment, certification and talent discovery in one journey.",
  },
};

export default function LeftSidebar({ variant = "generic" }: { variant?: SidebarVariant }) {
  const copy = COPY[variant];

  return (
    <div className="relative hidden w-full max-w-md flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#14102b] via-[#241650] to-[#3a1c73] p-8 text-white lg:flex">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-1/3 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-40 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">
        <BrandLogo />

        <div className="mt-10">
          <h1 className="text-3xl font-bold leading-tight">{copy.heading}</h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{copy.body}</p>
        </div>

        <FeatureTimeline />
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <LoginIllustration />
      </div>
    </div>
  );
}
