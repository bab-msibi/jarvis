import { ChatAgent } from "@/types/chat";
import { cn } from "@/lib/utils";

type AgentCardProps = {
  agent: ChatAgent;
  active: boolean;
  onSelect: (agentId: string) => void;
};

const toneClassMap: Record<ChatAgent["avatarTone"], string> = {
  cyan: "border-cyan-500/55 bg-cyan-500/12 text-cyan-100",
  violet: "border-violet-500/55 bg-violet-500/12 text-violet-100",
  emerald: "border-emerald-500/55 bg-emerald-500/12 text-emerald-100",
  amber: "border-amber-500/55 bg-amber-500/12 text-amber-100",
  sky: "border-sky-500/55 bg-sky-500/12 text-sky-100"
};

const statusClassMap: Record<ChatAgent["status"], string> = {
  ONLINE: "bg-emerald-400",
  IDLE: "bg-slate-400",
  BUSY: "bg-amber-400",
  OFFLINE: "bg-rose-400"
};

export function AgentCard({ agent, active, onSelect }: AgentCardProps) {
  return (
    <button
      className={cn(
        "w-full rounded-xl border p-3 text-left transition",
        "border-cyan-900/35 bg-sky-950/35 hover:border-cyan-500/50 hover:bg-cyan-500/10",
        active && "border-cyan-500/70 bg-cyan-500/14 shadow-glow"
      )}
      onClick={() => onSelect(agent.id)}
      type="button"
    >
      <div className="flex items-start gap-3">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center border text-xs font-semibold tracking-[0.08em]", toneClassMap[agent.avatarTone], "[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]")}>
          {agent.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-cyan-100" title={agent.name}>
            {agent.name}
          </p>
          <p className="truncate text-xs text-cyan-600" title={agent.role}>
            {agent.role}
          </p>
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-cyan-900/40 bg-sky-950/50 px-2 py-0.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", statusClassMap[agent.status])} />
            <span className="text-[10px] uppercase tracking-[0.08em] text-cyan-300">{agent.status}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
