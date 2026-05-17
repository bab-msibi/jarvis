import { forwardRef, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SettingsTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const SettingsTextarea = forwardRef<HTMLTextAreaElement, SettingsTextareaProps>(function SettingsTextarea({ className, ...props }, ref) {
  return (
    <textarea
      className={cn(
        "min-h-[92px] w-full rounded-md border border-cyan-900/45 bg-sky-950/45 px-3 py-2 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
