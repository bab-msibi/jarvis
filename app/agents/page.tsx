"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Bot,
  Briefcase,
  CirclePause,
  Download,
  Gauge,
  ShieldAlert,
  SquareCheckBig
} from "lucide-react";

import { AgentMenuAction } from "@/components/agents/agent-action-menu";
import { AgentChatModal } from "@/components/agents/agent-chat-modal";
import { AgentsTable } from "@/components/agents/agents-table";
import { AssignTaskModal } from "@/components/agents/assign-task-modal";
import { CircularOverviewChart } from "@/components/agents/circular-overview-chart";
import { CreateAgentModal } from "@/components/agents/create-agent-modal";
import { DeleteAgentModal } from "@/components/agents/delete-agent-modal";
import { EditAgentModal } from "@/components/agents/edit-agent-modal";
import { QuickActionCard } from "@/components/agents/quick-action-card";
import { ReassignModelModal } from "@/components/agents/reassign-model-modal";
import { RoleBreakdownItem } from "@/components/agents/role-breakdown-item";
import { SearchToolbar } from "@/components/agents/search-toolbar";
import { SidebarPanel } from "@/components/agents/sidebar-panel";
import { StatsCard } from "@/components/agents/stats-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { fetchDataResource } from "@/lib/api-client";
import { agents as baseAgents } from "@/lib/data/agents";
import { brains } from "@/lib/data/brains";
import { models } from "@/lib/data/models";
import { systemServices, systemStats } from "@/lib/data/system";
import { Agent, AgentStatus } from "@/types/agent";

const pageSize = 8;


function getRoleBreakdown(agents: Agent[]) {
  const buckets = {
    Coordinator: 0,
    Engineer: 0,
    Analyst: 0,
    Writer: 0,
    Designer: 0,
    Tester: 0,
    Others: 0
  };

  agents.forEach((agent) => {
    if (agent.role in buckets) {
      buckets[agent.role as keyof typeof buckets] += 1;
    } else {
      buckets.Others += 1;
    }
  });

  return [
    { label: "Coordinator", value: buckets.Coordinator, barClassName: "bg-gradient-to-r from-violet-500 to-violet-300" },
    { label: "Engineer", value: buckets.Engineer, barClassName: "bg-gradient-to-r from-cyan-500 to-blue-300" },
    { label: "Analyst", value: buckets.Analyst, barClassName: "bg-gradient-to-r from-emerald-500 to-green-300" },
    { label: "Writer", value: buckets.Writer, barClassName: "bg-gradient-to-r from-amber-500 to-orange-300" },
    { label: "Designer", value: buckets.Designer, barClassName: "bg-gradient-to-r from-yellow-500 to-yellow-300" },
    { label: "Tester", value: buckets.Tester, barClassName: "bg-gradient-to-r from-fuchsia-500 to-violet-300" },
    { label: "Others", value: buckets.Others, barClassName: "bg-gradient-to-r from-slate-500 to-slate-300" }
  ];
}

const quickActions = [
  {
    key: "create",
    title: "Create New Agent",
    description: "Upcoming: create local/remote agents",
    icon: Bot,
    upcoming: true
  },
  {
    key: "import",
    title: "Import Agent",
    description: "Upcoming: import agent configuration",
    icon: Download,
    upcoming: true
  },
  {
    key: "assign",
    title: "Assign Task",
    description: "Upcoming: assign a task to an agent",
    icon: Briefcase,
    upcoming: true
  },
  {
    key: "templates",
    title: "Agent Templates",
    description: "Upcoming: use prebuilt agent templates",
    icon: SquareCheckBig,
    upcoming: true
  }
] as const;

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(() => baseAgents);
  const agentsQuery = useQuery({ queryKey: ["data", "agents"], queryFn: () => fetchDataResource("agents", baseAgents) });
  const modelsQuery = useQuery({ queryKey: ["data", "models"], queryFn: () => fetchDataResource("models", models) });
  const brainsQuery = useQuery({ queryKey: ["data", "brains"], queryFn: () => fetchDataResource("brains", brains) });
  const systemQuery = useQuery({ queryKey: ["data", "system"], queryFn: () => fetchDataResource("system", { stats: systemStats, services: systemServices }) });
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AgentStatus>("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<null | "chat" | "create" | "edit" | "assign" | "delete" | "reassign">(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (agentsQuery.data?.data) queueMicrotask(() => setAgents(agentsQuery.data.data));
  }, [agentsQuery.data]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const roleOptions = useMemo(() => Array.from(new Set(agents.map((agent) => agent.role))), [agents]);
  const modelOptions = useMemo(() => (modelsQuery.data?.data ?? models).map((model) => model.name), [modelsQuery.data]);
  const brainOptions = useMemo(() => (brainsQuery.data?.data ?? brains).map((brain) => brain.name), [brainsQuery.data]);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        !searchValue.trim() ||
        [agent.name, agent.role, agent.currentTask, agent.assignedModel, agent.status].join(" ").toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || agent.status === statusFilter;
      const matchesRole = roleFilter === "ALL" || agent.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [agents, roleFilter, searchValue, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAgents.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedAgents = filteredAgents.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const counts = useMemo(() => {
    const total = agents.length;
    const online = agents.filter((agent) => agent.status === "ONLINE").length;
    const busy = agents.filter((agent) => agent.status === "BUSY").length;
    const idle = agents.filter((agent) => agent.status === "IDLE").length;
    const error = agents.filter((agent) => agent.status === "ERROR").length;
    return { total, online, busy, idle, error };
  }, [agents]);

  const roleBreakdown = useMemo(() => getRoleBreakdown(agents), [agents]);

  const showUpcoming = useCallback((description: string, tone: ToastItem["tone"] = "info") => {
    pushToast({ title: "Upcoming feature", description, tone });
  }, [pushToast]);

  const handleCreateAgent = () => {
    showUpcoming("Creating live agents will be enabled after the secure agent lifecycle API is added.");
  };

  const handleAssignTask = () => {
    showUpcoming("Task assignment will connect to the workflow runner in a later build.");
  };

  const handleEditAgent = () => {
    showUpcoming("Editing live agents requires the secure agent config API first.");
  };

  const handleDeleteAgent = () => {
    showUpcoming("Deleting live agents is blocked until lifecycle approvals are implemented.", "warning");
  };

  const handleReassignModel = () => {
    showUpcoming("Model reassignment will be enabled after provider routing policies are live.");
  };

  const openModal = (modal: "chat" | "create" | "edit" | "assign" | "delete" | "reassign", agent?: Agent) => {
    setSelectedAgent(agent);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleMenuAction = (_agent: Agent, action: AgentMenuAction) => {
    showUpcoming(`${action} for live agents will be enabled after secure lifecycle controls are added.`);
  };

  const handleQuickAction = (actionKey: (typeof quickActions)[number]["key"]) => {
    if (actionKey === "create" || actionKey === "assign") {
      return showUpcoming("Agent creation and task assignment need the secure lifecycle API first.");
    }
    if (actionKey === "import") return showUpcoming("Agent import will be enabled after config validation and approvals are added.");
    return showUpcoming("Agent templates will be connected to the backend workflow service later.");
  };

  return (
    <DashboardLayout system={systemQuery.data?.data.stats ?? systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader subtitle="Live OpenClaw agent and service data from this Mac. Controls marked Upcoming are intentionally not active yet." title="Agents" />

          <section className="rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Live mode is enabled: dummy agents were removed. Lifecycle controls are marked Upcoming until secure approvals and backend APIs are added.
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <StatsCard description="Active agents" icon={Bot} label="Total Agents" tone="cyan" value={counts.total} />
            <StatsCard description="Agents online" icon={Activity} label="Online" tone="green" value={counts.online} />
            <StatsCard description="Currently busy" icon={Gauge} label="Busy" tone="amber" value={counts.busy} />
            <StatsCard description="Ready for tasks" icon={CirclePause} label="Idle" tone="slate" value={counts.idle} />
            <StatsCard description="No errors" icon={ShieldAlert} label="Error" tone="rose" value={counts.error} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              onCreate={() => showUpcoming("Creating agents will be enabled after secure lifecycle controls are added.")}
              onReset={() => {
                setSearchValue("");
                setStatusFilter("ALL");
                setRoleFilter("ALL");
                setCurrentPage(1);
              }}
              onRoleChange={(value) => {
                setRoleFilter(value);
                setCurrentPage(1);
              }}
              onSearchChange={(value) => {
                setSearchValue(value);
                setCurrentPage(1);
              }}
              onStatusChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              roleFilter={roleFilter}
              roleOptions={roleOptions}
              searchValue={searchValue}
              statusFilter={statusFilter}
            />
          </section>

          <AgentsTable
            agents={pagedAgents}
            currentPage={safeCurrentPage}
            onChat={(agent) => openModal("chat", agent)}
            onMenuAction={handleMenuAction}
            onOpenProfile={(agent) =>
              pushToast({
                title: "Agent profile route ready",
                description: `Prepared for /agents/${agent.id}`,
                tone: "info"
              })
            }
            onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
            onView={(agent) =>
              pushToast({
                title: `Viewing ${agent.name}`,
                description: "Detailed profile page is prepared for the next route step.",
                tone: "info"
              })
            }
            pageSize={pageSize}
            totalAgents={filteredAgents.length}
            totalPages={totalPages}
          />
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Agent Overview">
            <CircularOverviewChart busy={counts.busy} error={counts.error} idle={counts.idle} online={counts.online} total={counts.total} />
          </SidebarPanel>

          <SidebarPanel title="Roles Breakdown">
            <div className="space-y-2.5">
              {roleBreakdown.map((roleStat) => (
                <RoleBreakdownItem
                  barClassName={roleStat.barClassName}
                  key={roleStat.label}
                  label={roleStat.label}
                  total={counts.total}
                  value={roleStat.value}
                />
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Quick Actions">
            <div className="space-y-2.5">
              {quickActions.map((action) => (
                <QuickActionCard
                  description={action.description}
                  icon={action.icon}
                  key={action.key}
                  onClick={() => handleQuickAction(action.key)}
                  title={action.title}
                  upcoming={action.upcoming}
                />
              ))}
            </div>
          </SidebarPanel>
        </aside>
      </div>

      <CreateAgentModal
        brainOptions={brainOptions}
        modelOptions={modelOptions}
        onClose={closeModal}
        onCreate={handleCreateAgent}
        open={activeModal === "create"}
        roleOptions={roleOptions.length ? roleOptions : ["Coordinator", "Engineer", "Analyst", "Writer", "Designer", "Tester"]}
      />

      <EditAgentModal
        agent={selectedAgent}
        onClose={closeModal}
        onSave={handleEditAgent}
        open={activeModal === "edit"}
        roleOptions={roleOptions.length ? roleOptions : ["Coordinator", "Engineer", "Analyst", "Writer", "Designer", "Tester"]}
      />

      <AssignTaskModal agent={selectedAgent} onAssign={handleAssignTask} onClose={closeModal} open={activeModal === "assign"} />

      <DeleteAgentModal agent={selectedAgent} onClose={closeModal} onDelete={handleDeleteAgent} open={activeModal === "delete"} />

      <ReassignModelModal
        agent={selectedAgent}
        modelOptions={modelOptions}
        onClose={closeModal}
        onReassign={handleReassignModel}
        open={activeModal === "reassign"}
      />

      <AgentChatModal
        agent={selectedAgent}
        key={`chat-${selectedAgent?.id ?? "none"}`}
        onClose={closeModal}
        open={activeModal === "chat"}
      />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
