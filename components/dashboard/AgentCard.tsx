import { MessageCircle } from "lucide-react";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { Agent } from "@/types/agent";
import { cn } from "@/lib/utils";

type AgentCardProps = {
  agent: Agent;
  isActive?: boolean;
  onChat: (agentId: string) => void;
};

export function AgentCard({ agent, isActive, onChat }: AgentCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border bg-sky-950/25 px-4 py-3 transition",
        "border-cyan-900/35 hover:border-cyan-500/50 hover:bg-cyan-500/10",
        isActive && "border-cyan-500/60 bg-cyan-500/10 shadow-glow"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative mt-1 h-12 w-12 shrink-0">
          <div
            className="absolute inset-0 border border-cyan-400/60 bg-cyan-500/10"
            style={{ clipPath: "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm tracking-wide text-cyan-100">{agent.initials}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-lg text-cyan-100">{agent.name}</p>
              <p className="text-xs text-cyan-700">{agent.role}</p>
            </div>
            <StatusBadge status={agent.status} />
          </div>
          <p className="mt-2 text-sm text-sky-100/90">{agent.currentTask}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-cyan-500">
            <p>CPU {agent.cpuUsage}%</p>
            <p>RAM {agent.ramUsage}%</p>
            <p className="truncate">Model {agent.assignedModel}</p>
          </div>
        </div>

        <button
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-cyan-800/60 bg-sky-950/70 px-3 py-2 text-xs uppercase tracking-[0.09em] text-cyan-200 transition hover:border-cyan-400/70 hover:text-cyan-100"
          onClick={() => onChat(agent.id)}
          type="button"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Chat
        </button>
      </div>
    </article>
  );
}
