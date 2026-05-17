import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SettingsInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SettingsInput = forwardRef<HTMLInputElement, SettingsInputProps>(function SettingsInput({ className, ...props }, ref) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-cyan-900/45 bg-sky-950/45 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
