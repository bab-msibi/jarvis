import { Search, Users } from "lucide-react";

import { AgentCard } from "@/components/chat/agent-card";
import { cn } from "@/lib/utils";
import { ChatAgent } from "@/types/chat";

type AgentSelectorPanelProps = {
  agents: ChatAgent[];
  selectedAgentId: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelectAgent: (agentId: string) => void;
  onManageAgents: () => void;
  className?: string;
};

export function AgentSelectorPanel({
  agents,
  selectedAgentId,
  searchValue,
  onSearchChange,
  onSelectAgent,
  onManageAgents,
  className
}: AgentSelectorPanelProps) {
  return (
    <section className={cn("panel-base flex min-h-[620px] min-w-0 flex-col rounded-2xl", className)}>
      <header className="border-b border-cyan-900/35 px-4 py-3">
        <h2 className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-cyan-200">
          <Users className="h-4 w-4 text-cyan-400" />
          Agent Selection
        </h2>
      </header>

      <div className="space-y-3 px-4 py-3">
        <label className="flex h-10 items-center gap-2 rounded-lg border border-cyan-900/45 bg-sky-950/40 px-3">
          <Search className="h-4 w-4 text-cyan-700" />
          <input
            className="w-full bg-transparent text-sm text-cyan-100 outline-none placeholder:text-cyan-700"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search agents..."
            value={searchValue}
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-2.5">
          {agents.length ? (
            agents.map((agent) => <AgentCard active={agent.id === selectedAgentId} agent={agent} key={agent.id} onSelect={onSelectAgent} />)
          ) : (
            <div className="rounded-xl border border-cyan-900/35 bg-sky-950/30 p-3 text-sm text-cyan-500">No agents match your search.</div>
          )}
        </div>
      </div>

      <div className="border-t border-cyan-900/35 p-4">
        <button
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-cyan-500/45 bg-cyan-500/10 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/20"
          onClick={onManageAgents}
          type="button"
        >
          Manage Agents
        </button>
      </div>
    </section>
  );
}
