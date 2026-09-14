import { Construction } from "lucide-react";

export default function TrainerHomePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-10 text-secondary">
        <Construction className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-bold text-primary">
        Trainer workspace is on the way
      </h1>
      <p className="mt-2 max-w-md text-sm text-grey-60">
        The Student dashboard is live first. The Trainer workspace — session planning, learner progress tracking, and coaching outcomes —
        is next, built to the same brand system and reusing this same sidebar shell.
      </p>
    </div>
  );
}
