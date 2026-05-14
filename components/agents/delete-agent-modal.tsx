"use client";

import { ModalShell } from "@/components/ui/modal-shell";
import { Agent } from "@/types/agent";

type DeleteAgentModalProps = {
  open: boolean;
  agent?: Agent;
  onClose: () => void;
  onDelete: (agentId: string) => void;
};

export function DeleteAgentModal({ open, agent, onClose, onDelete }: DeleteAgentModalProps) {
  return (
    <ModalShell
      description={`This will remove ${agent?.name ?? "this agent"} from the active roster.`}
      onClose={onClose}
      open={open}
      title="Delete Agent"
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
            className="rounded-md border border-rose-500/60 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/30"
            onClick={() => {
              if (!agent) return;
              onDelete(agent.id);
              onClose();
            }}
            type="button"
          >
            Delete Agent
          </button>
        </>
      }
    >
      <p className="text-sm text-cyan-300">
        Agent data can be restored later from backups, but running assignments will be cleared immediately.
      </p>
    </ModalShell>
  );
}
