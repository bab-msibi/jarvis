import { cn } from "@/lib/utils";

type ModelUsageBarProps = {
  usage: number;
  className?: string;
};

export function ModelUsageBar({ usage, className }: ModelUsageBarProps) {
  const value = Math.max(0, Math.min(100, usage));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-sky-950/75", className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}
