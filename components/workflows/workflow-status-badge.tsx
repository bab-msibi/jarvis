import { WorkflowStatus } from "@/types/workflow";
import { cn } from "@/lib/utils";

type WorkflowStatusBadgeProps = {
  status: WorkflowStatus;
};

const statusStyles: Record<WorkflowStatus, string> = {
  ACTIVE: "border-emerald-500/35 bg-emerald-500/15 text-emerald-200",
  INACTIVE: "border-slate-500/35 bg-slate-500/15 text-slate-200",
  RUNNING: "border-cyan-500/35 bg-cyan-500/15 text-cyan-200",
  FAILED: "border-rose-500/35 bg-rose-500/15 text-rose-200",
  DRAFT: "border-violet-500/35 bg-violet-500/15 text-violet-200",
  COMPLETED: "border-green-500/35 bg-green-500/15 text-green-200"
};

export function WorkflowStatusBadge({ status }: WorkflowStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", statusStyles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
