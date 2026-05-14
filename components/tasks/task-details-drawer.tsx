"use client";

import { X } from "lucide-react";

import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { TaskProgressBar } from "@/components/tasks/task-progress-bar";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { formatDateTime } from "@/components/tasks/task-utils";
import { Task } from "@/types/task";

type TaskDetailsDrawerProps = {
  open: boolean;
  task?: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onAssign: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskDetailsDrawer({ open, task, onClose, onEdit, onAssign, onDelete }: TaskDetailsDrawerProps) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#01050ccc]" onClick={onClose}>
      <aside
        className="panel-base absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-cyan-700/40"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-cyan-900/35 px-4 py-3">
          <div>
            <p className="text-sm uppercase tracking-[0.08em] text-cyan-600">Task Details</p>
            <h3 className="text-lg text-cyan-100">{task.name}</h3>
          </div>
          <button
            aria-label="Close task details"
            className="rounded-md border border-cyan-900/40 p-1.5 text-cyan-500 transition hover:border-cyan-500/60 hover:text-cyan-200"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <p className="text-sm text-cyan-300">{task.description}</p>

          <div className="flex flex-wrap items-center gap-2">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>

          <div className="rounded-xl border border-cyan-900/35 bg-sky-950/35 p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Progress</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="w-10 text-sm text-cyan-200">{task.progress}%</span>
              <TaskProgressBar value={task.progress} />
            </div>
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Assigned Agent</dt>
              <dd className="text-cyan-100">{task.assignedAgent}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Linked Model</dt>
              <dd className="text-cyan-100">{task.linkedModel}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Linked Brain</dt>
              <dd className="text-cyan-100">{task.linkedBrain}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">ETA</dt>
              <dd className="text-cyan-100">{task.eta}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Created</dt>
              <dd className="text-cyan-100">{formatDateTime(task.createdAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Updated</dt>
              <dd className="text-cyan-100">{formatDateTime(task.updatedAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Due Date</dt>
              <dd className="text-cyan-100">{formatDateTime(task.dueDate)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cyan-600">Estimated Hours</dt>
              <dd className="text-cyan-100">{task.estimatedHours}</dd>
            </div>
          </dl>

          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-cyan-600">Tags</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {task.tags.length ? (
                task.tags.map((tag) => (
                  <span className="rounded-md border border-cyan-900/40 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200" key={tag}>
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-cyan-700">No tags</span>
              )}
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-cyan-900/35 px-4 py-3">
          <button
            className="rounded-md border border-cyan-700/50 bg-cyan-500/15 px-3 py-2 text-sm text-cyan-100 transition hover:border-cyan-500/70 hover:bg-cyan-500/25"
            onClick={() => onAssign(task)}
            type="button"
          >
            Assign
          </button>
          <button
            className="rounded-md border border-cyan-700/50 bg-cyan-500/15 px-3 py-2 text-sm text-cyan-100 transition hover:border-cyan-500/70 hover:bg-cyan-500/25"
            onClick={() => onEdit(task)}
            type="button"
          >
            Edit
          </button>
          <button
            className="rounded-md border border-rose-500/50 bg-rose-500/20 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => onDelete(task)}
            type="button"
          >
            Delete
          </button>
        </footer>
      </aside>
    </div>
  );
}
