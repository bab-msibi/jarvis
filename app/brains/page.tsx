"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, Bot, BrainCircuit, Database, Link2, Plus, RefreshCw, Sparkles } from "lucide-react";

import { AddBrainModal } from "@/components/brains/add-brain-modal";
import { BrainMenuAction } from "@/components/brains/brain-action-menu";
import { BrainsGrid } from "@/components/brains/brains-grid";
import { BrainsTable } from "@/components/brains/brains-table";
import { CircularOverviewChart } from "@/components/brains/circular-overview-chart";
import { DeleteBrainModal } from "@/components/brains/delete-brain-modal";
import { EditBrainModal } from "@/components/brains/edit-brain-modal";
import { LinkAgentsModal } from "@/components/brains/link-agents-modal";
import { LinkedModelsBreakdown } from "@/components/brains/linked-models-breakdown";
import { LinkModelsModal } from "@/components/brains/link-models-modal";
import { QuickActionCard } from "@/components/brains/quick-action-card";
import { RetrainBrainModal } from "@/components/brains/retrain-brain-modal";
import { SearchToolbar, BrainSortOption } from "@/components/brains/search-toolbar";
import { SidebarPanel } from "@/components/brains/sidebar-panel";
import { StatsCard } from "@/components/brains/stats-card";
import { SyncKnowledgeModal } from "@/components/brains/sync-knowledge-modal";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { fetchDataResource } from "@/lib/api-client";
import { agents } from "@/lib/data/agents";
import { brains as baseBrains } from "@/lib/data/brains";
import { models } from "@/lib/data/models";
import { systemServices, systemStats } from "@/lib/data/system";
import { Brain, BrainStatus } from "@/types/brain";

const pageSize = 10;

const linkedModelTargets = ["Configured by runtime", "Ollama", "OpenAI", "Anthropic", "Google"];

const quickActions = [
  { key: "add", title: "Add New Brain", description: "Upcoming: create a knowledge brain", icon: Plus, upcoming: true },
  { key: "update", title: "Update Brain", description: "Upcoming: retrain and update knowledge", icon: BrainCircuit, upcoming: true },
  { key: "sync", title: "Sync Knowledge Sources", description: "Upcoming: sync connected sources", icon: RefreshCw, upcoming: true },
  { key: "templates", title: "Brain Templates", description: "Upcoming: use prebuilt brain templates", icon: Sparkles, upcoming: true }
] as const;

function formatRelativeTime(isoDate: string) {
  const timestamp = Date.parse(isoDate);
  if (Number.isNaN(timestamp)) return isoDate;
  const diffMs = Date.now() - timestamp;
  const minutes = Math.max(1, Math.floor(diffMs / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getBrainType(brain: Brain) {
  return brain.name.replace(/\s*Brain$/i, "").trim() || "General";
}

function sortBrains(brains: Brain[], sortBy: BrainSortOption) {
  const sorted = [...brains];

  if (sortBy === "recent") {
    sorted.sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated));
    return sorted;
  }
  if (sortBy === "agents_desc") {
    sorted.sort((a, b) => b.linkedAgents.length - a.linkedAgents.length);
    return sorted;
  }
  if (sortBy === "models_desc") {
    sorted.sort((a, b) => b.linkedModels.length - a.linkedModels.length);
    return sorted;
  }
  if (sortBy === "status") {
    sorted.sort((a, b) => a.status.localeCompare(b.status));
    return sorted;
  }

  sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

export default function BrainsPage() {
  const [brains, setBrains] = useState<Brain[]>(() => baseBrains);
  const brainsQuery = useQuery({ queryKey: ["data", "brains"], queryFn: () => fetchDataResource("brains", baseBrains) });
  const agentsQuery = useQuery({ queryKey: ["data", "agents"], queryFn: () => fetchDataResource("agents", agents) });
  const modelsQuery = useQuery({ queryKey: ["data", "models"], queryFn: () => fetchDataResource("models", models) });
  const systemQuery = useQuery({ queryKey: ["data", "system"], queryFn: () => fetchDataResource("system", { stats: systemStats, services: systemServices }) });
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | BrainStatus>("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [linkedModelFilter, setLinkedModelFilter] = useState("ALL");
  const [linkedAgentFilter, setLinkedAgentFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<BrainSortOption>("recent");
  const [compactCards, setCompactCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<
    null | "add" | "edit" | "retrain" | "sync" | "delete" | "link_models" | "link_agents"
  >(null);
  const selectedBrain = undefined as Brain | undefined;
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (brainsQuery.data?.data) queueMicrotask(() => setBrains(brainsQuery.data.data));
  }, [brainsQuery.data]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const modelOptions = useMemo(() => (modelsQuery.data?.data ?? models).map((model) => model.name), [modelsQuery.data]);
  const agentOptions = useMemo(() => (agentsQuery.data?.data ?? agents).map((agent) => agent.name), [agentsQuery.data]);

  const typeOptions = useMemo(() => Array.from(new Set(brains.map(getBrainType))), [brains]);

  const filteredBrains = useMemo(() => {
    const queried = brains.filter((brain) => {
      const matchesSearch =
        !searchValue.trim() ||
        [brain.name, brain.description, brain.purpose, brain.knowledgeSource, brain.memorySource, brain.status]
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || brain.status === statusFilter;
      const matchesType = typeFilter === "ALL" || getBrainType(brain) === typeFilter;
      const matchesModel = linkedModelFilter === "ALL" || brain.linkedModels.includes(linkedModelFilter);
      const matchesAgent = linkedAgentFilter === "ALL" || brain.linkedAgents.includes(linkedAgentFilter);
      return matchesSearch && matchesStatus && matchesType && matchesModel && matchesAgent;
    });

    return sortBrains(queried, sortBy);
  }, [brains, linkedAgentFilter, linkedModelFilter, searchValue, sortBy, statusFilter, typeFilter]);

  const displayBrains = useMemo(
    () => filteredBrains.map((brain) => ({ ...brain, lastUpdated: formatRelativeTime(brain.lastUpdated) })),
    [filteredBrains]
  );

  const totalPages = Math.max(1, Math.ceil(displayBrains.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedBrains = displayBrains.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const counts = useMemo(() => {
    const total = brains.length;
    const active = brains.filter((brain) => brain.status === "ACTIVE").length;
    const idle = brains.filter((brain) => brain.status === "IDLE").length;
    const error = brains.filter((brain) => brain.status === "ERROR").length;
    const totalAgentsLinked = brains.reduce((sum, brain) => sum + brain.linkedAgents.length, 0);
    const totalModelsLinked = brains.reduce((sum, brain) => sum + brain.linkedModels.length, 0);
    return { total, active, idle, error, totalAgentsLinked, totalModelsLinked };
  }, [brains]);

  const linkedModelBreakdown = useMemo(() => {
    return linkedModelTargets.map((modelName) => ({
      modelName,
      count: brains.filter((brain) => brain.linkedModels.includes(modelName)).length
    }));
  }, [brains]);

  const closeModal = () => setActiveModal(null);

  const showUpcoming = useCallback((description: string, tone: ToastItem["tone"] = "info") => {
    pushToast({ title: "Upcoming feature", description, tone });
  }, [pushToast]);

  const handleAddBrain = () => {
    showUpcoming("Creating brains will be enabled after the knowledge-source registration API is added.");
  };

  const handleEditBrain = () => {
    showUpcoming("Editing live brains requires safe knowledge-source configuration first.");
  };

  const handleRetrainBrain = () => {
    showUpcoming("Retraining/index rebuilds will be enabled after approved background jobs are added.");
  };

  const handleSyncKnowledge = () => {
    showUpcoming("Knowledge sync will connect to the real indexer in a later build.");
  };

  const handleDeleteBrain = () => {
    showUpcoming("Deleting brains is blocked until approval controls are implemented.", "warning");
  };

  const handleLinkModels = () => {
    showUpcoming("Model linking will be enabled after provider routing policies are live.");
  };

  const handleLinkAgents = () => {
    showUpcoming("Agent linking will be enabled after agent access policies are live.");
  };

  const handleViewDetails = () => {
    showUpcoming("Brain detail routes will be added after live source inspection is available.");
  };

  const handleMenuAction = (_brain: Brain, action: BrainMenuAction) => {
    showUpcoming(`${action} for live brains will be enabled after safe knowledge controls are added.`);
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "add") return showUpcoming("Adding brains needs knowledge-source registration and approval controls first.");
    if (action === "update") return showUpcoming("Brain updates/retraining will run through approved background jobs later.");
    if (action === "sync") return showUpcoming("Knowledge sync will connect to the real indexer in a later build.");
    return showUpcoming("Brain templates will be connected after live brain creation is implemented.");
  };

  return (
    <DashboardLayout system={systemQuery.data?.data.stats ?? systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            actions={
              <ActionButtonGroup>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={() => showUpcoming("Adding brains needs knowledge-source registration and approval controls first.")}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  Add Brain
                  <span className="rounded-full border border-amber-400/30 px-1.5 py-0.5 text-[10px] uppercase text-amber-200">Upcoming</span>
                </button>
              </ActionButtonGroup>
            }
            subtitle="Live workspace knowledge sources from this Mac. Controls marked Upcoming are intentionally not active yet."
            title="Brains"
          />

          <section className="rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Live mode is enabled: dummy brains were removed. Brains now reflect real workspace memory, second-brain, project, and JARVIS repo sources.
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <StatsCard description="All knowledge systems" icon={BrainCircuit} label="Total Brains" tone="cyan" value={counts.total} />
            <StatsCard description="Currently active" icon={Activity} label="Active Brains" tone="green" value={counts.active} />
            <StatsCard description="Not currently in use" icon={Database} label="Idle Brains" tone="slate" value={counts.idle} />
            <StatsCard description="Across all brains" icon={Bot} label="Total Agents Linked" tone="amber" value={counts.totalAgentsLinked} />
            <StatsCard description="Across all brains" icon={Link2} label="Total Models Linked" tone="rose" value={counts.totalModelsLinked} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              agentOptions={agentOptions}
              compactCards={compactCards}
              linkedAgentFilter={linkedAgentFilter}
              linkedModelFilter={linkedModelFilter}
              modelOptions={modelOptions}
              onLinkedAgentChange={(value) => {
                setLinkedAgentFilter(value);
                setCurrentPage(1);
              }}
              onLinkedModelChange={(value) => {
                setLinkedModelFilter(value);
                setCurrentPage(1);
              }}
              onSearchChange={(value) => {
                setSearchValue(value);
                setCurrentPage(1);
              }}
              onSortChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}
              onStatusChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              onToggleLayout={() => setCompactCards((current) => !current)}
              onReset={() => {
                setSearchValue("");
                setStatusFilter("ALL");
                setTypeFilter("ALL");
                setLinkedModelFilter("ALL");
                setLinkedAgentFilter("ALL");
                setSortBy("recent");
                setCurrentPage(1);
              }}
              onTypeChange={(value) => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
              searchValue={searchValue}
              sortBy={sortBy}
              statusFilter={statusFilter}
              typeFilter={typeFilter}
              typeOptions={typeOptions}
            />
          </section>

          <BrainsGrid brains={displayBrains} compact={compactCards} onMenuAction={handleMenuAction} onViewDetails={handleViewDetails} />

          <BrainsTable
            brains={pagedBrains}
            currentPage={safeCurrentPage}
            onMenuAction={handleMenuAction}
            onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
            onViewDetails={handleViewDetails}
            pageSize={pageSize}
            totalBrains={displayBrains.length}
            totalPages={totalPages}
          />
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Brains Overview">
            <CircularOverviewChart active={counts.active} error={counts.error} idle={counts.idle} total={counts.total} />
          </SidebarPanel>

          <SidebarPanel title="Linked Models Breakdown">
            <div className="space-y-2.5">
              {linkedModelBreakdown.map((item) => (
                <LinkedModelsBreakdown count={item.count} key={item.modelName} model={item.modelName} total={counts.total} />
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

      <AddBrainModal onAdd={handleAddBrain} onClose={closeModal} open={activeModal === "add"} />

      <EditBrainModal brain={selectedBrain} onClose={closeModal} onSave={handleEditBrain} open={activeModal === "edit"} />

      <RetrainBrainModal brain={selectedBrain} onClose={closeModal} onRetrain={handleRetrainBrain} open={activeModal === "retrain"} />

      <SyncKnowledgeModal brain={selectedBrain} onClose={closeModal} onSync={handleSyncKnowledge} open={activeModal === "sync"} />

      <DeleteBrainModal brain={selectedBrain} onClose={closeModal} onDelete={handleDeleteBrain} open={activeModal === "delete"} />

      <LinkModelsModal
        brain={selectedBrain}
        modelOptions={modelOptions}
        onClose={closeModal}
        onSave={handleLinkModels}
        open={activeModal === "link_models"}
      />

      <LinkAgentsModal
        agentOptions={agentOptions}
        brain={selectedBrain}
        onClose={closeModal}
        onSave={handleLinkAgents}
        open={activeModal === "link_agents"}
      />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
