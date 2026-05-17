"use client";

import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { TaskProgressBar } from "@/components/tasks/task-progress-bar";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { formatDateTime } from "@/components/tasks/task-utils";
import { ResponsiveDrawer } from "@/components/ui/responsive-drawer";
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
    <ResponsiveDrawer
      description={task.description}
      footer={
        <>
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
        </>
      }
      onClose={onClose}
      open={open}
      title={task.name}
    >
      <p className="mb-4 text-sm uppercase tracking-[0.08em] text-cyan-600">Task Details</p>
      <div className="space-y-4">
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
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Assigned Agent</dt>
            <dd className="break-anywhere text-right text-cyan-100">{task.assignedAgent}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Linked Model</dt>
            <dd className="break-anywhere text-right text-cyan-100">{task.linkedModel}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Linked Brain</dt>
            <dd className="break-anywhere text-right text-cyan-100">{task.linkedBrain}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">ETA</dt>
            <dd className="text-right text-cyan-100">{task.eta}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Created</dt>
            <dd className="text-right text-cyan-100">{formatDateTime(task.createdAt)}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Updated</dt>
            <dd className="text-right text-cyan-100">{formatDateTime(task.updatedAt)}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Due Date</dt>
            <dd className="text-right text-cyan-100">{formatDateTime(task.dueDate)}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-cyan-600">Estimated Hours</dt>
            <dd className="text-right text-cyan-100">{task.estimatedHours}</dd>
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
    </ResponsiveDrawer>
  );
}
