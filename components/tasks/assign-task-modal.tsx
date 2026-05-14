"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Task } from "@/types/task";

type AssignTaskModalProps = {
  open: boolean;
  task?: Task;
  agentOptions: string[];
  onClose: () => void;
  onAssign: (taskId: string, agent: string, eta: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function AssignTaskModal({ open, task, agentOptions, onClose, onAssign }: AssignTaskModalProps) {
  if (!task) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const agent = String(formData.get("assignedAgent") ?? task.assignedAgent);
    const eta = String(formData.get("eta") ?? task.eta);
    onAssign(task.id, agent, eta);
    onClose();
  };

  return (
    <ModalShell
      description={`Assign "${task.name}" to another agent or update ETA.`}
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
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
            form="assign-task-form"
            type="submit"
          >
            Assign Task
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Assign Task"
    >
      <form className="space-y-3" id="assign-task-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Agent</span>
          <select className={fieldClassName} defaultValue={task.assignedAgent} name="assignedAgent">
            {agentOptions.map((agent) => (
              <option className="bg-[#071523]" key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">ETA</span>
          <input className={fieldClassName} defaultValue={task.eta} name="eta" placeholder="1h 20m" />
        </label>
      </form>
    </ModalShell>
  );
}
