"use client";

import { CalendarClock, Clock3 } from "lucide-react";

import { TaskActionMenu, TaskMenuAction } from "@/components/tasks/task-action-menu";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { TaskProgressBar } from "@/components/tasks/task-progress-bar";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { formatDateTime, getInitials, TaskIcon } from "@/components/tasks/task-utils";
import { Task } from "@/types/task";

type TaskRowProps = {
  task: Task;
  mobile?: boolean;
  onOpenDetails: (task: Task) => void;
  onMenuAction: (task: Task, action: TaskMenuAction) => void;
};

export function TaskRow({ task, mobile, onOpenDetails, onMenuAction }: TaskRowProps) {
  if (!mobile) return null;

  return (
    <article
      className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45"
      onClick={() => onOpenDetails(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-cyan-900/35 bg-cyan-500/10 p-1.5 text-cyan-300">
              <TaskIcon className="h-3.5 w-3.5" name={task.name} />
            </span>
            <p className="truncate text-base text-cyan-100">{task.name}</p>
          </div>
          <p className="mt-1 text-xs text-cyan-600">
            {task.linkedModel} / {task.linkedBrain}
          </p>
        </div>
        <TaskActionMenu onAction={(action) => onMenuAction(task, action)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-cyan-200">{getInitials(task.assignedAgent)}</span>
        <p className="text-sm text-cyan-300">{task.assignedAgent}</p>
        <TaskPriorityBadge priority={task.priority} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <TaskStatusBadge status={task.status} />
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-cyan-600">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <TaskProgressBar value={task.progress} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-cyan-600">
        <p className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" />
          ETA {task.eta}
        </p>
        <p className="inline-flex items-center gap-1">
          <CalendarClock className="h-3.5 w-3.5" />
          {formatDateTime(task.createdAt)}
        </p>
      </div>
    </article>
  );
}
