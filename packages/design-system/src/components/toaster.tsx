"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#12151D] group-[.toaster]:text-[#F8FAFC] group-[.toaster]:border-white/[0.1] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-slate-400 font-mono text-xs",
          actionButton:
            "group-[.toast]:bg-[#D4F024] group-[.toast]:text-[#08090C] font-semibold",
          cancelButton:
            "group-[.toast]:bg-white/[0.06] group-[.toast]:text-slate-300",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
