import { Bot } from "lucide-react";

import { ChatMessageType } from "@/types/chat";

type AIMessageBubbleProps = {
  content: string;
  type: ChatMessageType;
  timestamp: string;
  model: string;
  agentName: string;
  system?: boolean;
};

export function AIMessageBubble({ content, type, timestamp, model, agentName, system = false }: AIMessageBubbleProps) {
  return (
    <article
      className={`max-w-full rounded-2xl border px-4 py-3 ${system ? "border-amber-500/35 bg-amber-500/10 text-amber-100" : "border-cyan-900/45 bg-sky-950/55 text-cyan-100"}`}
    >
      <header className={`mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] ${system ? "text-amber-200/85" : "text-cyan-500"}`}>
        <Bot className="h-3.5 w-3.5" />
        {system ? "System" : agentName}
        <span>/</span>
        <span className="truncate">{model}</span>
      </header>

      {type === "code" ? (
        <pre className="mono-scroll max-w-full rounded-xl border border-cyan-900/40 bg-[#020a14] p-3 text-xs text-cyan-200">{content}</pre>
      ) : (
        <pre className="max-w-full break-anywhere whitespace-pre-wrap font-inherit text-sm">{content}</pre>
      )}

      <p className={`mt-2 text-[11px] ${system ? "text-amber-100/80" : "text-cyan-600"}`}>{timestamp}</p>
    </article>
  );
}
