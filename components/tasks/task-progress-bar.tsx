import { cn } from "@/lib/utils";

type TaskProgressBarProps = {
  value: number;
  className?: string;
};

export function TaskProgressBar({ value, className }: TaskProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-sky-950/75", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
