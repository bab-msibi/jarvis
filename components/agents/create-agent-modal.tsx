"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { AgentStatus } from "@/types/agent";

export type CreateAgentInput = {
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string;
  assignedModel: string;
  brain: string;
};

type CreateAgentModalProps = {
  open: boolean;
  roleOptions: string[];
  modelOptions: string[];
  brainOptions: string[];
  onClose: () => void;
  onCreate: (values: CreateAgentInput) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function CreateAgentModal({ open, roleOptions, modelOptions, brainOptions, onClose, onCreate }: CreateAgentModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;

    onCreate({
      name,
      role: String(formData.get("role") ?? roleOptions[0] ?? "Engineer"),
      status: String(formData.get("status") ?? "ONLINE") as AgentStatus,
      currentTask: String(formData.get("currentTask") ?? "").trim() || "Waiting for assignment",
      assignedModel: String(formData.get("assignedModel") ?? modelOptions[0] ?? "GPT-4o"),
      brain: String(formData.get("brain") ?? brainOptions[0] ?? "General Brain")
    });

    onClose();
  };

  return (
    <ModalShell
      description="Create a new AI agent and assign the default runtime setup."
      onClose={onClose}
      open={open}
      title="Create New Agent"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" type="submit" form="create-agent-form">
            Create Agent
          </button>
        </>
      }
    >
      <form className="space-y-3" id="create-agent-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Agent Name</span>
          <input className={fieldClassName} name="name" placeholder="Example: Security Analyst" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Role</span>
            <select className={fieldClassName} defaultValue={roleOptions[0] ?? "Engineer"} name="role">
              {roleOptions.map((role) => (
                <option className="bg-[#071523]" key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
            <select className={fieldClassName} defaultValue="ONLINE" name="status">
              {["ONLINE", "BUSY", "IDLE", "ERROR"].map((status) => (
                <option className="bg-[#071523]" key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Current Task</span>
          <input className={fieldClassName} name="currentTask" placeholder="Optional" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Model</span>
            <select className={fieldClassName} defaultValue={modelOptions[0] ?? "GPT-4o"} name="assignedModel">
              {modelOptions.map((model) => (
                <option className="bg-[#071523]" key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Brain</span>
            <select className={fieldClassName} defaultValue={brainOptions[0] ?? "General Brain"} name="brain">
              {brainOptions.map((brain) => (
                <option className="bg-[#071523]" key={brain} value={brain}>
                  {brain}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </ModalShell>
  );
}
