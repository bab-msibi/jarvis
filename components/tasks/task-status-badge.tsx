import { TaskStatus } from "@/types/task";
import { cn } from "@/lib/utils";

type TaskStatusBadgeProps = {
  status: TaskStatus;
};

const statusStyles: Record<TaskStatus, string> = {
  "NOT STARTED": "border-slate-500/30 bg-slate-500/15 text-slate-200",
  "IN PROGRESS": "border-cyan-500/30 bg-cyan-500/15 text-cyan-200",
  "ON HOLD": "border-amber-500/30 bg-amber-500/15 text-amber-200",
  COMPLETED: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
  FAILED: "border-rose-500/30 bg-rose-500/15 text-rose-200"
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]",
        statusStyles[status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
