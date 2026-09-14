import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function TermsCheckbox({
  checked,
  onCheckedChange,
  error,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm text-grey-60">
        <Checkbox
          className="mt-0.5"
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="font-medium text-secondary hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-secondary hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>
      <ErrorMessage message={error} />
    </div>
  );
}
