import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15",
  {
    variants: {
      variant: {
        default:
          "bg-brand-950 text-brand-100 shadow-[0_16px_28px_-18px_rgba(17,17,17,0.45)] hover:-translate-y-px hover:bg-brand-900",
        secondary:
          "border border-brand-300/70 bg-white/90 text-brand-950 shadow-[0_10px_22px_-18px_rgba(17,17,17,0.16)] hover:border-brand-500/55 hover:bg-brand-100/80",
        ghost: "text-brand-950 hover:bg-brand-100/70",
        outline:
          "border border-brand-300/70 bg-transparent text-brand-950 hover:border-brand-500/55 hover:bg-white/70"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
