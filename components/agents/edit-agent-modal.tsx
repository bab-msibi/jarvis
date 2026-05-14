"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Agent, AgentStatus } from "@/types/agent";

type EditAgentModalProps = {
  open: boolean;
  agent?: Agent;
  roleOptions: string[];
  onClose: () => void;
  onSave: (agentId: string, updates: Pick<Agent, "name" | "role" | "status" | "brain">) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-500/60";

export function EditAgentModal({ open, agent, roleOptions, onClose, onSave }: EditAgentModalProps) {
  if (!agent) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave(agent.id, {
      name: String(formData.get("name") ?? agent.name).trim() || agent.name,
      role: String(formData.get("role") ?? agent.role),
      status: String(formData.get("status") ?? agent.status) as AgentStatus,
      brain: String(formData.get("brain") ?? agent.brain)
    });
    onClose();
  };

  return (
    <ModalShell
      description="Update profile and operational defaults for this agent."
      onClose={onClose}
      open={open}
      title="Edit Agent"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="edit-agent-form" type="submit">
            Save Changes
          </button>
        </>
      }
    >
      <form className="space-y-3" id="edit-agent-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Agent Name</span>
          <input className={fieldClassName} defaultValue={agent.name} name="name" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Role</span>
            <select className={fieldClassName} defaultValue={agent.role} name="role">
              {roleOptions.map((roleOption) => (
                <option className="bg-[#071523]" key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Status</span>
            <select className={fieldClassName} defaultValue={agent.status} name="status">
              {["ONLINE", "BUSY", "IDLE", "ERROR"].map((statusOption) => (
                <option className="bg-[#071523]" key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Assigned Brain</span>
          <input className={fieldClassName} defaultValue={agent.brain} name="brain" />
        </label>
      </form>
    </ModalShell>
  );
}
