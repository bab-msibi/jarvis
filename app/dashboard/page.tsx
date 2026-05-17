"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { AgentCard } from "@/components/dashboard/AgentCard";
import { BrainStatusItem } from "@/components/dashboard/BrainStatusItem";
import { ModelStatusItem } from "@/components/dashboard/ModelStatusItem";
import { ObsidianVaultCard } from "@/components/dashboard/ObsidianVaultCard";
import { SystemCard } from "@/components/dashboard/SystemCard";
import { TaskProgressItem } from "@/components/dashboard/TaskProgressItem";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { SectionPanel } from "@/components/shared/SectionPanel";
import { getDashboardData } from "@/lib/mock/dashboard";
import { systemStats } from "@/lib/mock/system";
import { useUIStore } from "@/lib/store/ui-store";

const actionButtonStyles =
  "rounded-md border border-cyan-700/60 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-cyan-200 transition hover:border-cyan-400/70 hover:text-cyan-100";

export default function DashboardPage() {
  const activeAgentId = useUIStore((state) => state.activeAgentId);
  const setActiveAgentId = useUIStore((state) => state.setActiveAgentId);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData
  });

  useEffect(() => {
    if (!data?.agents.length) return;
    const hasSelected = data.agents.some((agent) => agent.id === activeAgentId);
    if (!hasSelected) {
      setActiveAgentId(data.agents[0]?.id ?? "agent-pm");
    }
  }, [activeAgentId, data?.agents, setActiveAgentId]);

  if (isLoading || !data) {
    return (
      <DashboardLayout system={systemStats}>
        <LoadingState label="Loading JARVIS Command Center..." />
      </DashboardLayout>
    );
  }

  const activeAgent = data.agents.find((agent) => agent.id === activeAgentId) ?? data.agents[0];
  const dashboardAgents = data.agents.slice(0, 5);

  return (
    <DashboardLayout system={data.systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            subtitle="JARVIS is running smoothly. All systems operational."
            title="Good Afternoon, Boss."
          />

          <SystemCard system={data.systemStats} />

          <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
            <SectionPanel
              title="Active Agents"
              action={
                <div className="action-wrap">
                  <button className={actionButtonStyles} type="button">
                    + New Agent
                  </button>
                  <button className={actionButtonStyles} type="button">
                    Manage All
                  </button>
                </div>
              }
            >
              <div className="space-y-3">
                {dashboardAgents.map((agent) => (
                  <AgentCard agent={agent} isActive={agent.id === activeAgent.id} key={agent.id} onChat={setActiveAgentId} />
                ))}
              </div>
            </SectionPanel>

            <SectionPanel
              title="Active Tasks"
              action={
                <button className={actionButtonStyles} type="button">
                  View All
                </button>
              }
            >
              <div className="space-y-3">
                {data.tasks.map((task) => (
                  <TaskProgressItem key={task.id} task={task} />
                ))}
              </div>
            </SectionPanel>
          </div>

          <ChatPanel agent={activeAgent} />
        </main>

        <aside className="min-w-0 space-y-4">
          <SectionPanel
            title="Models"
            action={
              <button className={actionButtonStyles} type="button">
                Manage
              </button>
            }
          >
            <div className="space-y-2.5">
              {data.models.map((model) => (
                <ModelStatusItem key={model.id} model={model} />
              ))}
              <button
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-cyan-700/50 bg-cyan-500/10 px-3 py-2 text-xs uppercase tracking-[0.1em] text-cyan-200 transition hover:border-cyan-400/70 hover:text-cyan-100"
                type="button"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Model
              </button>
            </div>
          </SectionPanel>

          <SectionPanel
            title="Brains"
            action={
              <button className={actionButtonStyles} type="button">
                Manage
              </button>
            }
          >
            <div className="space-y-2.5">
              {data.brains.map((brain) => (
                <BrainStatusItem brain={brain} key={brain.id} />
              ))}
              <button
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-cyan-700/50 bg-cyan-500/10 px-3 py-2 text-xs uppercase tracking-[0.1em] text-cyan-200 transition hover:border-cyan-400/70 hover:text-cyan-100"
                type="button"
              >
                <Plus className="h-3.5 w-3.5" />
                Add / Update Brain
              </button>
            </div>
          </SectionPanel>

          <SectionPanel
            title="Obsidian Vault"
            action={
              <button className={actionButtonStyles} type="button">
                Open Vault
              </button>
            }
          >
            <ObsidianVaultCard vault={data.obsidianStats} />
          </SectionPanel>
        </aside>
      </div>
    </DashboardLayout>
  );
}
