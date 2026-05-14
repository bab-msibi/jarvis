import { TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";

type TaskPriorityBadgeProps = {
  priority: TaskPriority;
};

const priorityStyles: Record<TaskPriority, string> = {
  HIGH: "border-rose-500/30 bg-rose-500/15 text-rose-200",
  MEDIUM: "border-amber-500/30 bg-amber-500/15 text-amber-200",
  LOW: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
  NONE: "border-slate-500/30 bg-slate-500/15 text-slate-200"
};

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return <span className={cn("rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]", priorityStyles[priority])}>{priority}</span>;
}
