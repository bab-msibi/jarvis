"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { AgentMenuAction } from "@/components/agents/agent-action-menu";
import { AgentRow } from "@/components/agents/agent-row";
import { DataTableWrapper } from "@/components/shared/data-table-wrapper";
import { EmptyState } from "@/components/shared/empty-state";
import { Agent } from "@/types/agent";

type AgentsTableProps = {
  agents: Agent[];
  totalAgents: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onChat: (agent: Agent) => void;
  onView: (agent: Agent) => void;
  onOpenProfile: (agent: Agent) => void;
  onMenuAction: (agent: Agent, action: AgentMenuAction) => void;
};

const tableHeaders = ["Agent", "Role", "Status", "Current Task", "Model", "CPU", "RAM", "Actions"];

export function AgentsTable({
  agents,
  totalAgents,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onChat,
  onView,
  onOpenProfile,
  onMenuAction
}: AgentsTableProps) {
  const start = totalAgents ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalAgents);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <section className="panel-base rounded-2xl">
      <DataTableWrapper>
        <table className="table-sticky-head w-full min-w-[980px]">
          <thead>
            <tr className="border-b border-cyan-900/35 text-left text-xs uppercase tracking-[0.08em] text-cyan-600">
              {tableHeaders.map((header) => (
                <th className="px-4 py-4" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <AgentRow
                agent={agent}
                key={agent.id}
                onChat={onChat}
                onMenuAction={onMenuAction}
                onOpenProfile={onOpenProfile}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </DataTableWrapper>

      <div className="space-y-3 p-3 md:hidden">
        {agents.map((agent) => (
          <AgentRow
            agent={agent}
            key={agent.id}
            mobile
            onChat={onChat}
            onMenuAction={onMenuAction}
            onOpenProfile={onOpenProfile}
            onView={onView}
          />
        ))}
      </div>

      {!agents.length ? (
        <div className="px-3 pb-3">
          <EmptyState description="Try adjusting filters or create a new agent to populate the table." title="No agents found" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-900/35 px-4 py-3">
        <p className="text-sm text-cyan-600">
          Showing {start} to {end} of {totalAgents} agents
        </p>

        <div className="flex items-center gap-1">
          <button
            className="rounded-md border border-cyan-900/40 p-2 text-cyan-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pages.map((pageNumber) => (
            <button
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                pageNumber === currentPage
                  ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-100"
                  : "border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50 hover:text-cyan-100"
              }`}
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="rounded-md border border-cyan-900/40 p-2 text-cyan-300 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
