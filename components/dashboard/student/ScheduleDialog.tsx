"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CalendarClock } from "lucide-react";

// TODO: swap for GET /api/student/schedule once the backend endpoint exists.
// Shape: { id, title, withName, startsAt, durationMinutes }[]
const MOCK_SESSIONS = [
  { id: "s1", title: "Communication Skills — Live Roleplay", withName: "Trainer Aisha K.", startsAt: "2026-08-25T17:00:00", durationMinutes: 45 },
  { id: "s2", title: "Leadership & Teamwork — Case Study", withName: "Trainer Rohan D.", startsAt: "2026-08-27T18:30:00", durationMinutes: 60 },
];

export default function ScheduleDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Schedule
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Upcoming Classes</DialogTitle>
          <DialogDescription>Your next live sessions this week.</DialogDescription>

          <div className="mt-5 space-y-3">
            {MOCK_SESSIONS.map((session) => (
              <div key={session.id} className="flex items-start gap-3 rounded-xl border border-grey-20 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-10 text-secondary-90">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary">{session.title}</p>
                  <p className="text-xs text-grey-60">with {session.withName}</p>
                  <p className="mt-0.5 text-xs text-grey-50">
                    {new Date(session.startsAt).toLocaleString("en-IN", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    · {session.durationMinutes} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
