import BrandLogo from "./BrandLogo";
import { Card } from "@/components/ui/card";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mx-auto flex w-full max-w-md flex-col justify-center p-8 sm:p-10">
      <div className="mb-6 lg:hidden">
        <BrandLogo variant="light" size={36} />
      </div>
      {children}
    </Card>
  );
}
