import { MessageSquareQuote } from "lucide-react";

type UserMessageBubbleProps = {
  content: string;
  timestamp: string;
  model: string;
};

export function UserMessageBubble({ content, timestamp, model }: UserMessageBubbleProps) {
  return (
    <article className="max-w-full rounded-2xl border border-cyan-500/45 bg-cyan-500/18 px-4 py-3 text-cyan-50 shadow-glow">
      <header className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-cyan-200/90">
        <MessageSquareQuote className="h-3.5 w-3.5" />
        You
        <span className="text-cyan-300/70">/</span>
        <span className="truncate">{model}</span>
      </header>
      <p className="break-anywhere whitespace-pre-wrap text-sm">{content}</p>
      <p className="mt-2 text-right text-[11px] text-cyan-200/85">{timestamp}</p>
    </article>
  );
}
