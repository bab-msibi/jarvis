import { Bot, Circle, Sparkles } from "lucide-react";

import { ChatAgent, ChatModel } from "@/types/chat";
import { cn } from "@/lib/utils";

type ChatHeaderProps = {
  agent: ChatAgent | undefined;
  selectedModelId: string;
  modelOptions: ChatModel[];
  onSelectModel: (modelId: string) => void;
  onOpenChangeModel: () => void;
};

const statusDotClass: Record<ChatAgent["status"], string> = {
  ONLINE: "text-emerald-400",
  IDLE: "text-slate-400",
  BUSY: "text-amber-400",
  OFFLINE: "text-rose-400"
};

export function ChatHeader({ agent, selectedModelId, modelOptions, onSelectModel, onOpenChangeModel }: ChatHeaderProps) {
  if (!agent) {
    return (
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-500">Select an agent to start chatting.</p>
      </header>
    );
  }

  return (
    <header className="flex flex-wrap items-start gap-3 border-b border-cyan-900/35 px-4 py-3">
      <div className="min-w-0 flex flex-1 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/45 bg-cyan-500/12 text-cyan-100">
          <Bot className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-cyan-100">{agent.name}</p>
          <p className="truncate text-xs text-cyan-600">{agent.description}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-cyan-400">
            <Circle className={cn("h-2.5 w-2.5 fill-current", statusDotClass[agent.status])} />
            {agent.status}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
        <label className="flex h-10 min-w-[190px] items-center gap-2 rounded-lg border border-cyan-900/45 bg-sky-950/45 px-3 text-xs text-cyan-500">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <select
            className="w-full bg-transparent text-sm text-cyan-100 outline-none"
            onChange={(event) => onSelectModel(event.target.value)}
            value={selectedModelId}
          >
            {modelOptions.map((model) => (
              <option className="bg-[#071523]" key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="inline-flex h-10 items-center justify-center rounded-lg border border-cyan-500/45 bg-cyan-500/12 px-3 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/20"
          onClick={onOpenChangeModel}
          type="button"
        >
          Change Model
        </button>
      </div>
    </header>
  );
}
