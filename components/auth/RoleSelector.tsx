import { ROLES } from "@/data/roles";
import type { SignupRole } from "@/types/auth";
import ErrorMessage from "@/components/common/ErrorMessage";
import { cn } from "@/lib/utils";

export default function RoleSelector({
  value,
  onChange,
  error,
}: {
  value: SignupRole | null;
  onChange: (role: SignupRole) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-grey-70">
        Select Your Role
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ROLES.map(({ id, label, icon: Icon }) => {
          const role = id as SignupRole;
          const selected = value === role;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(role)}
              aria-pressed={selected}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-colors",
                selected
                  ? "border-secondary bg-secondary-10 text-secondary-90"
                  : "border-grey-20 text-grey-60 hover:bg-grey-5"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </div>

      <ErrorMessage message={error} />
    </div>
  );
}