"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Agent } from "@/types/agent";

type AssignTaskModalProps = {
  open: boolean;
  agent?: Agent;
  onClose: () => void;
  onAssign: (agentId: string, task: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function AssignTaskModal({ open, agent, onClose, onAssign }: AssignTaskModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agent) return;
    const formData = new FormData(event.currentTarget);
    const task = String(formData.get("task") ?? "").trim();
    if (!task) return;
    onAssign(agent.id, task);
    onClose();
  };

  return (
    <ModalShell
      description={`Assign a new task to ${agent?.name ?? "this agent"} and switch workload state.`}
      onClose={onClose}
      open={open}
      title="Assign Task"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="assign-task-form" type="submit">
            Assign Task
          </button>
        </>
      }
    >
      <form className="space-y-3" id="assign-task-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Task Name</span>
          <input className={fieldClassName} name="task" placeholder="Example: Security hardening checklist" />
        </label>
      </form>
    </ModalShell>
  );
}
