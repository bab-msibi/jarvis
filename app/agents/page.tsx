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
import { CreateAgentInput, CreateAgentModal } from "@/components/agents/create-agent-modal";
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

function getInitials(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return "AG";
  const words = cleaned.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

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
    description: "Add a new AI agent to the system",
    icon: Bot
  },
  {
    key: "import",
    title: "Import Agent",
    description: "Import agent configuration",
    icon: Download
  },
  {
    key: "assign",
    title: "Assign Task",
    description: "Assign a task to an agent",
    icon: Briefcase
  },
  {
    key: "templates",
    title: "Agent Templates",
    description: "Use prebuilt agent templates",
    icon: SquareCheckBig
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

  const handleCreateAgent = (values: CreateAgentInput) => {
    const createdAgent: Agent = {
      id: `agent-${values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
      name: values.name,
      initials: getInitials(values.name),
      role: values.role,
      status: values.status,
      currentTask: values.currentTask,
      assignedModel: values.assignedModel,
      cpuUsage: values.status === "IDLE" ? 2 : 10,
      ramUsage: values.status === "IDLE" ? 6 : 14,
      lastActive: "just now",
      permissions: ["custom_permissions"],
      brain: values.brain,
      createdAt: new Date().toISOString()
    };

    setAgents((current) => [createdAgent, ...current]);
    pushToast({ title: "Agent created", description: `${values.name} has been added to your roster.`, tone: "success" });
  };

  const handleAssignTask = (agentId: string, task: string) => {
    setAgents((current) =>
      current.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              currentTask: task,
              status: "BUSY",
              lastActive: "just now",
              cpuUsage: Math.max(agent.cpuUsage, 18),
              ramUsage: Math.max(agent.ramUsage, 16)
            }
          : agent
      )
    );
    pushToast({ title: "Task assigned", description: "New task was assigned successfully.", tone: "success" });
  };

  const handleEditAgent = (agentId: string, updates: Pick<Agent, "name" | "role" | "status" | "brain">) => {
    setAgents((current) =>
      current.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              ...updates,
              initials: getInitials(updates.name),
              lastActive: "just now"
            }
          : agent
      )
    );
    pushToast({ title: "Agent updated", description: "Agent settings were saved.", tone: "success" });
  };

  const handleDeleteAgent = (agentId: string) => {
    const removedAgent = agents.find((agent) => agent.id === agentId);
    setAgents((current) => current.filter((agent) => agent.id !== agentId));
    pushToast({
      title: "Agent deleted",
      description: removedAgent ? `${removedAgent.name} has been removed.` : "Agent removed from roster.",
      tone: "warning"
    });
    setSelectedAgent(undefined);
  };

  const handleReassignModel = (agentId: string, model: string) => {
    setAgents((current) =>
      current.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              assignedModel: model,
              lastActive: "just now"
            }
          : agent
      )
    );
    pushToast({ title: "Model reassigned", description: `Agent now uses ${model}.`, tone: "info" });
  };

  const openModal = (modal: "chat" | "create" | "edit" | "assign" | "delete" | "reassign", agent?: Agent) => {
    setSelectedAgent(agent);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleMenuAction = (agent: Agent, action: AgentMenuAction) => {
    if (action === "edit") return openModal("edit", agent);
    if (action === "assign") return openModal("assign", agent);
    if (action === "reassign") return openModal("reassign", agent);
    if (action === "delete") return openModal("delete", agent);

    if (action === "pause") {
      setAgents((current) =>
        current.map((currentAgent) =>
          currentAgent.id === agent.id
            ? {
                ...currentAgent,
                status: "IDLE",
                currentTask: "Paused by operator",
                lastActive: "just now"
              }
            : currentAgent
        )
      );
      return pushToast({ title: `${agent.name} paused`, tone: "warning" });
    }

    if (action === "restart") {
      setAgents((current) =>
        current.map((currentAgent) =>
          currentAgent.id === agent.id
            ? {
                ...currentAgent,
                status: "ONLINE",
                currentTask: "System restart completed",
                lastActive: "just now"
              }
            : currentAgent
        )
      );
      return pushToast({ title: `${agent.name} restarted`, tone: "success" });
    }
  };

  const handleQuickAction = (actionKey: (typeof quickActions)[number]["key"]) => {
    if (actionKey === "create") return openModal("create");
    if (actionKey === "assign") return openModal("assign", agents[0]);
    if (actionKey === "import") {
      return pushToast({
        title: "Import ready",
        description: "Agent import pipeline is prepared for backend integration.",
        tone: "info"
      });
    }
    pushToast({
      title: "Templates coming soon",
      description: "Template orchestration will be connected to your backend workflow service.",
      tone: "info"
    });
  };

  return (
    <DashboardLayout system={systemQuery.data?.data.stats ?? systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader subtitle="Manage and monitor all AI agents running on your system." title="Agents" />

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <StatsCard description="Active agents" icon={Bot} label="Total Agents" tone="cyan" value={counts.total} />
            <StatsCard description="Agents online" icon={Activity} label="Online" tone="green" value={counts.online} />
            <StatsCard description="Currently busy" icon={Gauge} label="Busy" tone="amber" value={counts.busy} />
            <StatsCard description="Ready for tasks" icon={CirclePause} label="Idle" tone="slate" value={counts.idle} />
            <StatsCard description="No errors" icon={ShieldAlert} label="Error" tone="rose" value={counts.error} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              onCreate={() => openModal("create")}
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
