"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { AgentCard } from "@/components/dashboard/AgentCard";
import { BrainStatusItem } from "@/components/dashboard/BrainStatusItem";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ModelStatusItem } from "@/components/dashboard/ModelStatusItem";
import { ObsidianVaultCard } from "@/components/dashboard/ObsidianVaultCard";
import { SystemCard } from "@/components/dashboard/SystemCard";
import { TaskProgressItem } from "@/components/dashboard/TaskProgressItem";
import { TopStatusBar } from "@/components/dashboard/TopStatusBar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { SectionPanel } from "@/components/shared/SectionPanel";
import { getDashboardData } from "@/lib/mock/dashboard";
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
      <div className="flex min-h-screen items-center justify-center bg-jarvis-bg text-cyan-300">
        Loading JARVIS Command Center...
      </div>
    );
  }

  const activeAgent = data.agents.find((agent) => agent.id === activeAgentId) ?? data.agents[0];
  const dashboardAgents = data.agents.slice(0, 5);

  return (
    <div className="min-h-screen bg-jarvis-bg text-cyan-50">
      <div className="flex min-h-screen flex-col md:flex-row">
        <DashboardSidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <TopStatusBar system={data.systemStats} />

          <div className="flex flex-1 flex-col gap-4 p-3 sm:p-6 xl:flex-row">
            <main className="flex min-w-0 flex-1 flex-col gap-4">
              <section className="panel-base rounded-2xl p-5 sm:p-6">
                <h1 className="text-3xl text-cyan-100 sm:text-4xl">Good Afternoon, Boss.</h1>
                <p className="mt-2 text-sm text-cyan-500 sm:text-lg">JARVIS is running smoothly. All systems operational.</p>
              </section>

              <SystemCard system={data.systemStats} />

              <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
                <SectionPanel
                  title="Active Agents"
                  action={
                    <div className="flex items-center gap-2">
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
                      <AgentCard
                        agent={agent}
                        isActive={agent.id === activeAgent.id}
                        key={agent.id}
                        onChat={setActiveAgentId}
                      />
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

            <aside className="flex w-full flex-col gap-4 xl:max-w-[360px]">
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
        </div>
      </div>
    </div>
  );
}
