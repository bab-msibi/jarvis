"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Brain } from "@/types/brain";

type LinkAgentsModalProps = {
  open: boolean;
  brain?: Brain;
  agentOptions: string[];
  onClose: () => void;
  onSave: (brainId: string, agents: string[]) => void;
};

export function LinkAgentsModal({ open, brain, agentOptions, onClose, onSave }: LinkAgentsModalProps) {
  if (!brain) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const agents = formData.getAll("agents").map((value) => String(value));
    onSave(brain.id, agents);
    onClose();
  };

  return (
    <ModalShell
      description={`Update linked agents for ${brain.name}.`}
      onClose={onClose}
      open={open}
      title="Link Agents"
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="link-agents-form" type="submit">
            Save Links
          </button>
        </>
      }
    >
      <form className="space-y-2" id="link-agents-form" onSubmit={onSubmit}>
        {agentOptions.map((agent) => (
          <label className="flex items-center gap-2 rounded-md border border-cyan-900/30 bg-sky-950/30 px-3 py-2 text-sm text-cyan-100" key={agent}>
            <input className="accent-cyan-400" defaultChecked={brain.linkedAgents.includes(agent)} name="agents" type="checkbox" value={agent} />
            {agent}
          </label>
        ))}
      </form>
    </ModalShell>
  );
}
