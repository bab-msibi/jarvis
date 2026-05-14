"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { Task } from "@/types/task";

type DeleteTaskModalProps = {
  open: boolean;
  task?: Task;
  onClose: () => void;
  onDelete: (taskId: string) => void;
};

export function DeleteTaskModal({ open, task, onClose, onDelete }: DeleteTaskModalProps) {
  if (!task) return null;

  return (
    <ModalShell
      description="This action removes the task from your orchestration queue."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md border border-rose-500/50 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => {
              onDelete(task.id);
              onClose();
            }}
            type="button"
          >
            Delete Task
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Delete Task"
    >
      <p className="text-sm text-cyan-300">
        Delete <span className="text-cyan-100">{task.name}</span>? This cannot be undone.
      </p>
    </ModalShell>
  );
}
