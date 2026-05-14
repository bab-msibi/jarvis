"use client";

import { TaskActionMenu, TaskMenuAction } from "@/components/tasks/task-action-menu";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { TaskProgressBar } from "@/components/tasks/task-progress-bar";
import { TaskIcon } from "@/components/tasks/task-utils";
import { Task } from "@/types/task";

type TaskCardProps = {
  task: Task;
  onOpenDetails: (task: Task) => void;
  onMenuAction: (task: Task, action: TaskMenuAction) => void;
};

export function TaskCard({ task, onOpenDetails, onMenuAction }: TaskCardProps) {
  return (
    <article
      className="rounded-lg border border-cyan-900/35 bg-sky-950/35 p-3 transition hover:border-cyan-500/45"
      onClick={() => onOpenDetails(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <TaskIcon className="h-3.5 w-3.5 text-cyan-300" name={task.name} />
            <p className="line-clamp-2 text-sm text-cyan-100">{task.name}</p>
          </div>
          <p className="mt-1 text-xs text-cyan-600">{task.assignedAgent}</p>
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <TaskActionMenu onAction={(action) => onMenuAction(task, action)} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-cyan-900/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-200">
          {task.linkedModel}
        </span>
        <TaskPriorityBadge priority={task.priority} />
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-cyan-600">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <TaskProgressBar value={task.progress} />
      </div>
    </article>
  );
}
