"use client";

import { useRouter } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ROLES } from "@/data/roles";
import { ROLE_HOME } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { Button } from "@/components/ui/button";

/**
 * Only renders while NEXT_PUBLIC_USE_MOCK_DATA is true (i.e. the Spring
 * Boot auth endpoints aren't live yet). Lets you jump straight into any
 * role's dashboard without a real login, using mock data. Delete this
 * component (and its import on the login page) once real auth works end
 * to end — it should never ship to production.
 */
export default function DevPreviewPanel() {
  const router = useRouter();
  const devLogin = useAuthStore((s) => s.devLogin);

  if (!USE_MOCK) return null;

  return (
    <div className="mt-8 rounded-xl border border-dashed border-warning-50 bg-warning-10 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-warning-100">
        <FlaskConical className="h-3.5 w-3.5" />
        Preview mode — backend not connected yet
      </div>
      <p className="mt-1 text-xs text-grey-60">
        Skip login and open a dashboard directly with mock data. This panel
        disappears once real login is wired up.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ROLES.map((role) => (
          <Button
            key={role.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              devLogin(role.id);
              router.push(ROLE_HOME[role.id]);
            }}
          >
            <role.icon className="h-3.5 w-3.5" />
            View {role.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
