import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-3xl bg-white shadow-sm ring-1 ring-slate-100", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
