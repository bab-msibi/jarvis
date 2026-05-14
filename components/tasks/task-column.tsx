import { TaskCard } from "@/components/tasks/task-card";
import { TaskMenuAction } from "@/components/tasks/task-action-menu";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

type TaskColumnProps = {
  title: string;
  total: number;
  tasks: Task[];
  tone?: "slate" | "cyan" | "amber" | "emerald" | "rose";
  onOpenDetails: (task: Task) => void;
  onMenuAction: (task: Task, action: TaskMenuAction) => void;
};

const toneStyles: Record<NonNullable<TaskColumnProps["tone"]>, string> = {
  slate: "border-slate-500/30 bg-slate-500/8 text-slate-200",
  cyan: "border-cyan-500/30 bg-cyan-500/8 text-cyan-200",
  amber: "border-amber-500/30 bg-amber-500/8 text-amber-200",
  emerald: "border-emerald-500/30 bg-emerald-500/8 text-emerald-200",
  rose: "border-rose-500/30 bg-rose-500/8 text-rose-200"
};

export function TaskColumn({ title, total, tasks, tone = "slate", onOpenDetails, onMenuAction }: TaskColumnProps) {
  const visibleTasks = tasks.slice(0, 2);
  const remaining = Math.max(0, tasks.length - visibleTasks.length);

  return (
    <section
      aria-label={title}
      className={cn("min-h-[280px] rounded-xl border p-3", toneStyles[tone])}
      data-droppable="true"
      data-status={title.toUpperCase()}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm uppercase tracking-[0.08em]">{title}</h3>
        <span className="rounded-md bg-black/25 px-2 py-0.5 text-xs">{total}</span>
      </header>

      <div className="space-y-2 overflow-y-auto pb-1">
        {visibleTasks.length ? (
          visibleTasks.map((task) => (
            <TaskCard key={task.id} onMenuAction={onMenuAction} onOpenDetails={onOpenDetails} task={task} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-cyan-900/45 bg-sky-950/25 px-3 py-6 text-center text-xs text-cyan-700">
            No tasks in this lane
          </div>
        )}
      </div>

      {remaining > 0 ? (
        <button
          className="mt-3 text-xs text-cyan-400 transition hover:text-cyan-200"
          onClick={() => onOpenDetails(tasks[visibleTasks.length])}
          type="button"
        >
          + {remaining} more tasks
        </button>
      ) : null}
    </section>
  );
}
