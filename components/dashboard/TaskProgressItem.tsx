import { ChartBarBig, ClipboardCheck, PenSquare, ShieldCheck, Waypoints, type LucideProps } from "lucide-react";
import { JSX } from "react";

import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Task } from "@/types/task";

type TaskProgressItemProps = {
  task: Task;
};

function TaskIcon({ name, ...props }: { name: string } & LucideProps): JSX.Element {
  if (/roadmap|planning/i.test(name)) return <Waypoints {...props} />;
  if (/auth|security|access/i.test(name)) return <ShieldCheck {...props} />;
  if (/analysis|trend|market|insight/i.test(name)) return <ChartBarBig {...props} />;
  if (/report|sales|metrics/i.test(name)) return <ClipboardCheck {...props} />;
  if (/content|strategy|draft|creative/i.test(name)) return <PenSquare {...props} />;
  return <Waypoints {...props} />;
}

function getInitials(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return "AG";
  const words = cleaned.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function TaskProgressItem({ task }: TaskProgressItemProps) {
  return (
    <article className="rounded-xl border border-cyan-900/30 bg-sky-950/20 p-3">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 rounded-md border border-cyan-900/30 bg-cyan-500/10 p-1.5">
          <TaskIcon className="h-3.5 w-3.5 text-cyan-300" name={task.name} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-cyan-100">{task.name}</p>
            <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.09em] text-cyan-200">
              {getInitials(task.assignedAgent)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <ProgressBar value={task.progress} />
            <p className="w-10 text-right text-xs text-cyan-400">{task.progress}%</p>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <StatusBadge status={task.status} />
            <p className="text-cyan-600">{task.status === "COMPLETED" ? "Completed" : `ETA ${task.eta}`}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
