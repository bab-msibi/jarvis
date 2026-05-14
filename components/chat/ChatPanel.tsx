"use client";

import { FormEvent, useMemo, useState } from "react";
import { SendHorizontal, X } from "lucide-react";

import { Agent } from "@/types/agent";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "agent" | "user";
  text: string;
  createdAt: string;
};

type ChatPanelProps = {
  agent: Agent | undefined;
};

const defaultMessages: Record<string, ChatMessage[]> = {
  "agent-pm": [
    {
      id: "msg-1",
      role: "agent",
      text: "I've updated the project timeline and resource plan for Q2.",
      createdAt: "2:10 PM"
    },
    {
      id: "msg-2",
      role: "user",
      text: "Great. Please share the updated roadmap and highlight any risks.",
      createdAt: "2:11 PM"
    }
  ]
};

export function ChatPanel({ agent }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [messageMap, setMessageMap] = useState<Record<string, ChatMessage[]>>(defaultMessages);

  const activeAgent = agent?.id ?? "agent-pm";
  const messages = useMemo(() => messageMap[activeAgent] ?? defaultMessages["agent-pm"] ?? [], [activeAgent, messageMap]);

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const nextMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: input.trim(),
      createdAt: "now"
    };

    setMessageMap((current) => ({
      ...current,
      [activeAgent]: [...(current[activeAgent] ?? []), nextMessage]
    }));
    setInput("");
  };

  const clearChat = () => {
    setMessageMap((current) => ({ ...current, [activeAgent]: [] }));
  };

  return (
    <section className="panel-base mx-auto w-full max-w-4xl rounded-2xl">
      <header className="flex items-center justify-between border-b border-cyan-900/30 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-cyan-600">Project Manager Chat Preview</p>
          <p className="text-sm text-cyan-100">{agent?.name ?? "Project Manager"}</p>
        </div>
        <button
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-cyan-600 transition hover:bg-cyan-500/10 hover:text-cyan-100"
          onClick={clearChat}
          type="button"
        >
          <X className="h-3.5 w-3.5" />
          Clear Chat
        </button>
      </header>

      <div className="space-y-3 p-4">
        <div className="max-h-[220px] space-y-2 overflow-auto pr-1">
          {messages.length === 0 ? (
            <p className="rounded-lg border border-cyan-900/30 bg-sky-950/35 p-3 text-sm text-cyan-500">No messages yet. Start the conversation.</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[82%] rounded-xl px-3 py-2 text-sm",
                    message.role === "user" ? "bg-cyan-600/25 text-cyan-50" : "border border-cyan-900/30 bg-sky-950/50 text-cyan-100"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form className="flex items-center gap-2" onSubmit={submitMessage}>
          <input
            className="h-10 flex-1 rounded-lg border border-cyan-900/50 bg-sky-950/60 px-3 text-sm text-cyan-100 outline-none transition placeholder:text-cyan-700 focus:border-cyan-500/70"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            value={input}
          />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-700/70 bg-cyan-500/15 text-cyan-200 transition hover:border-cyan-400 hover:text-cyan-100"
            type="submit"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
