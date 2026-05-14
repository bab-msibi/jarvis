"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { ModalShell } from "@/components/ui/modal-shell";
import { Agent } from "@/types/agent";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "agent" | "user";
  text: string;
};

type AgentChatModalProps = {
  open: boolean;
  agent?: Agent;
  onClose: () => void;
};

function createInitialMessages(agentName: string): Message[] {
  return [
    {
      id: "m-1",
      role: "agent",
      text: `Ready for your command, Boss. ${agentName} is standing by.`
    }
  ];
}

export function AgentChatModal({ open, agent, onClose }: AgentChatModalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(createInitialMessages(agent?.name ?? "Agent"));

  if (!agent) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = input.trim();
    if (!message) return;

    const userMessage: Message = { id: `u-${Date.now()}`, role: "user", text: message };
    const agentMessage: Message = {
      id: `a-${Date.now()}`,
      role: "agent",
      text: `${agent.name} received: "${message}". Mock execution has started.`
    };

    setMessages((current) => [...current, userMessage, agentMessage]);
    setInput("");
  };

  return (
    <ModalShell
      description={`Direct communication channel with ${agent.name}.`}
      onClose={onClose}
      open={open}
      title="Agent Chat"
      footer={
        <button
          className="rounded-md border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/30"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      }
    >
      <div className="space-y-3">
        <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-cyan-900/30 bg-sky-950/25 p-3">
          {messages.map((message) => (
            <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")} key={message.id}>
              <div
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  message.role === "user" ? "bg-cyan-500/25 text-cyan-50" : "border border-cyan-900/40 bg-sky-950/60 text-cyan-100"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form className="flex items-center gap-2" onSubmit={onSubmit}>
          <input
            className="h-10 flex-1 rounded-lg border border-cyan-900/40 bg-sky-950/50 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/60"
            onChange={(event) => setInput(event.target.value)}
            placeholder={`Message ${agent.name}...`}
            value={input}
          />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-700/50 bg-cyan-500/15 text-cyan-200 transition hover:border-cyan-400/70 hover:text-cyan-100"
            type="submit"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </ModalShell>
  );
}
