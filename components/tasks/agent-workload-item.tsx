import { cn } from "@/lib/utils";

type AgentWorkloadItemProps = {
  label: string;
  value: number;
  total: number;
  barClassName?: string;
};

export function AgentWorkloadItem({ label, value, total, barClassName }: AgentWorkloadItemProps) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-cyan-200">{label}</span>
        <span className="text-cyan-500">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-sky-950/70">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400", barClassName)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
