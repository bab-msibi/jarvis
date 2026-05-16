import { Bot } from "lucide-react";

import { getInitials } from "@/components/documents/document-utils";

type LinkedAgentBadgeProps = {
  agent: string;
};

export function LinkedAgentBadge({ agent }: LinkedAgentBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/15 px-2 py-1 text-xs text-cyan-200">
      <Bot className="h-3 w-3" />
      <span className="rounded bg-cyan-500/20 px-1 text-[10px] uppercase tracking-[0.08em]">{getInitials(agent)}</span>
      <span className="truncate">{agent}</span>
    </span>
  );
}
