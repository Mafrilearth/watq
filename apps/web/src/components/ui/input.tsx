import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-white/10 bg-[#0C0E14] px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:border-[#D4F024] focus-visible:ring-1 focus-visible:ring-[#D4F024]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
