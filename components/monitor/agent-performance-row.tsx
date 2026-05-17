"use client";

import { Eye } from "lucide-react";

import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AgentPerformance } from "@/types/monitor";

type AgentPerformanceRowProps = {
  agentPerformance: AgentPerformance;
  onView: (agentPerformance: AgentPerformance) => void;
};

export function AgentPerformanceRow({ agentPerformance, onView }: AgentPerformanceRowProps) {
  return (
    <article className="rounded-xl border border-cyan-900/35 bg-sky-950/25 p-3 transition hover:border-cyan-500/45">
      <div className="flex items-center justify-between gap-2">
        <button className="text-left" onClick={() => onView(agentPerformance)} type="button">
          <p className="text-sm text-cyan-100">{agentPerformance.agent}</p>
          <p className="text-xs text-cyan-600">{agentPerformance.lastActivity}</p>
        </button>
        <StatusBadge status={agentPerformance.status} />
      </div>

      <p className="mt-2 text-xs text-cyan-300">{agentPerformance.currentTask}</p>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-cyan-500">CPU {agentPerformance.cpuUsage}%</p>
          <ProgressBar className="mt-1" value={agentPerformance.cpuUsage} />
        </div>
        <div>
          <p className="text-cyan-500">RAM {agentPerformance.ramUsage}%</p>
          <ProgressBar className="mt-1" value={agentPerformance.ramUsage} />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <p className="text-emerald-300">Success {agentPerformance.successRate}%</p>
        <p className={agentPerformance.errors > 0 ? "text-amber-300" : "text-cyan-600"}>{agentPerformance.errors} errors</p>
      </div>

      <button
        className="mt-3 inline-flex items-center gap-1 rounded-md border border-cyan-900/40 bg-sky-950/60 px-2 py-1 text-xs text-cyan-200 transition hover:border-cyan-500/50 hover:text-cyan-100"
        onClick={() => onView(agentPerformance)}
        type="button"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </button>
    </article>
  );
}
