"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { DocumentItem } from "@/types/document";

type LinkAgentModalProps = {
  open: boolean;
  document?: DocumentItem;
  agentOptions: string[];
  onClose: () => void;
  onLink: (documentId: string, agent: string) => void;
};

export function LinkAgentModal({ open, document, agentOptions, onClose, onLink }: LinkAgentModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!document) return;
    const formData = new FormData(event.currentTarget);
    const agent = String(formData.get("agent") ?? "");
    if (!agent) return;
    onLink(document.id, agent);
    onClose();
  };

  return (
    <ModalShell
      description={document ? `Assign ${document.name} to another agent.` : "Select a document first."}
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
            className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!document}
            form="link-agent-form"
            type="submit"
          >
            Link Agent
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="Link To Agent"
    >
      <form className="space-y-3" id="link-agent-form" onSubmit={onSubmit}>
        <label className="block space-y-1 text-sm text-cyan-300">
          <span>Agent</span>
          <select
            className="w-full rounded-md border border-cyan-900/40 bg-sky-950/40 px-3 py-2 text-cyan-100 outline-none"
            defaultValue={document?.linkedAgent ?? agentOptions[0] ?? ""}
            name="agent"
          >
            {agentOptions.map((agent) => (
              <option className="bg-[#071523]" key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
