"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/common/ErrorMessage";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, label, error, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors focus-within:ring-2",
            error
              ? "border-red-400 focus-within:ring-red-100"
              : "border-slate-200 focus-within:border-violet-500 focus-within:ring-violet-100"
          )}
        >
          <Lock className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            ref={ref}
            id={id}
            type={visible ? "text" : "password"}
            aria-invalid={!!error}
            className={cn("w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none", className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="shrink-0 text-slate-400 hover:text-slate-600"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <ErrorMessage message={error} />
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
