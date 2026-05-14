"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Agent } from "@/types/agent";

type ReassignModelModalProps = {
  open: boolean;
  agent?: Agent;
  modelOptions: string[];
  onClose: () => void;
  onReassign: (agentId: string, model: string) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function ReassignModelModal({ open, agent, modelOptions, onClose, onReassign }: ReassignModelModalProps) {
  if (!agent) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const model = String(formData.get("model") ?? "").trim();
    if (!model) return;
    onReassign(agent.id, model);
    onClose();
  };

  return (
    <ModalShell
      description={`Switch the runtime model used by ${agent?.name ?? "this agent"}.`}
      onClose={onClose}
      open={open}
      title="Reassign Model"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="reassign-model-form" type="submit">
            Save Model
          </button>
        </>
      }
    >
      <form id="reassign-model-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Model</span>
          <select className={fieldClassName} defaultValue={agent.assignedModel} name="model">
            {modelOptions.map((modelOption) => (
              <option className="bg-[#071523]" key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
