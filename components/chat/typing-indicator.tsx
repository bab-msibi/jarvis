import { Bot } from "lucide-react";

type TypingIndicatorProps = {
  agentName: string;
};

export function TypingIndicator({ agentName }: TypingIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-900/45 bg-sky-950/55 px-3 py-1.5 text-xs text-cyan-300">
      <Bot className="h-3.5 w-3.5" />
      <span>{agentName} is typing</span>
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:240ms]" />
      </span>
    </div>
  );
}
