"use client";

import { FormEvent } from "react";

import { ModalShell } from "@/components/ui/modal-shell";
import { ChatAgent, ChatModel } from "@/types/chat";

export type NewChatValues = {
  agentId: string;
  modelId: string;
  title: string;
};

type NewChatModalProps = {
  open: boolean;
  agents: ChatAgent[];
  models: ChatModel[];
  onClose: () => void;
  onCreate: (values: NewChatValues) => void;
};

const fieldClassName =
  "h-10 w-full rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60";

export function NewChatModal({ open, agents, models, onClose, onCreate }: NewChatModalProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onCreate({
      agentId: String(formData.get("agentId") ?? agents[0]?.id ?? ""),
      modelId: String(formData.get("modelId") ?? models[0]?.id ?? ""),
      title: String(formData.get("title") ?? "").trim()
    });

    onClose();
  };

  return (
    <ModalShell
      description="Create a new conversation session with your selected agent and model."
      footer={
        <>
          <button
            className="rounded-md border border-cyan-900/40 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-100"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30" form="new-chat-form" type="submit">
            Create Chat
          </button>
        </>
      }
      onClose={onClose}
      open={open}
      title="New Chat Session"
    >
      <form className="space-y-3" id="new-chat-form" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Session Title (Optional)</span>
          <input className={fieldClassName} name="title" placeholder="Example: Sprint Planning Sync" />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Agent</span>
          <select className={fieldClassName} defaultValue={agents[0]?.id} name="agentId">
            {agents.map((agent) => (
              <option className="bg-[#071523]" key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.08em] text-cyan-600">Model</span>
          <select className={fieldClassName} defaultValue={models[0]?.id} name="modelId">
            {models.map((model) => (
              <option className="bg-[#071523]" key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
      </form>
    </ModalShell>
  );
}
