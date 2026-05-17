import { forwardRef, SelectHTMLAttributes } from "react";

import { SettingsFieldOption } from "@/types/settings";
import { cn } from "@/lib/utils";

type SettingsSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: SettingsFieldOption[];
};

export const SettingsSelect = forwardRef<HTMLSelectElement, SettingsSelectProps>(function SettingsSelect({ className, options, ...props }, ref) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-cyan-900/45 bg-sky-950/45 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60",
        className
      )}
      ref={ref}
      {...props}
    >
      {options.map((option) => (
        <option className="bg-[#071523]" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
