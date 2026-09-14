import { Check, X } from "lucide-react";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";

const REQUIREMENTS = [
  { key: "minLength", label: "Minimum 8 characters" },
  { key: "hasUppercase", label: "1 uppercase letter" },
  { key: "hasLowercase", label: "1 lowercase letter" },
  { key: "hasNumber", label: "1 number" },
  { key: "hasSpecialChar", label: "1 special character" },
] as const;

export default function PasswordStrength({ password }: { password: string }) {
  const { checks } = usePasswordStrength(password);

  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
      {REQUIREMENTS.map((req) => {
        const met = checks[req.key];
        return (
          <div key={req.key} className="flex items-center gap-1.5 text-xs">
            {met ? <Check className="h-3.5 w-3.5 shrink-0 text-success" /> : <X className="h-3.5 w-3.5 shrink-0 text-grey-30" />}
            <span className={met ? "text-grey-60" : "text-grey-40"}>{req.label}</span>
          </div>
        );
      })}
    </div>
  );
}
