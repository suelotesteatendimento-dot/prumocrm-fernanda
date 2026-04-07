import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]",
  {
    variants: {
      variant: {
        default: "bg-brand-950 text-brand-100",
        outline: "border border-brand-300/70 bg-white/80 text-brand-950",
        muted: "border border-brand-300/40 bg-brand-100/80 text-brand-600"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
