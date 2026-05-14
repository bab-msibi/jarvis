import { BrainStatus } from "@/types/brain";
import { cn } from "@/lib/utils";

type BrainStatusBadgeProps = {
  status: BrainStatus;
  className?: string;
};

const statusStyles: Record<BrainStatus, string> = {
  ACTIVE: "border-emerald-400/35 bg-emerald-500/10 text-emerald-200",
  IDLE: "border-slate-400/35 bg-slate-500/10 text-slate-200",
  ERROR: "border-rose-400/35 bg-rose-500/10 text-rose-200",
  UPDATING: "border-amber-400/35 bg-amber-500/10 text-amber-200"
};

export function BrainStatusBadge({ status, className }: BrainStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs", statusStyles[status], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
