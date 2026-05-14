"use client";

import { useCallback, useMemo, useState } from "react";
import { Activity, Bot, BrainCircuit, Database, Link2, Plus, RefreshCw, Sparkles } from "lucide-react";

import { AddBrainInput, AddBrainModal } from "@/components/brains/add-brain-modal";
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
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { agents } from "@/lib/mock/agents";
import { brains as baseBrains } from "@/lib/mock/brains";
import { models } from "@/lib/mock/models";
import { systemStats } from "@/lib/mock/system";
import { Brain, BrainStatus } from "@/types/brain";

const pageSize = 10;

const linkedModelTargets = [
  "GPT-4o",
  "Claude 3.5 Sonnet",
  "Llama 3.1 70B",
  "Gemini 1.5 Pro",
  "Mistral Large 2",
  "Phi-3 Medium",
  "Local Ollama Model"
];

const quickActions = [
  { key: "add", title: "Add New Brain", description: "Create a new knowledge brain", icon: Plus },
  { key: "update", title: "Update Brain", description: "Retrain and update knowledge", icon: BrainCircuit },
  { key: "sync", title: "Sync Knowledge Sources", description: "Sync all connected sources", icon: RefreshCw },
  { key: "templates", title: "Brain Templates", description: "Use prebuilt brain templates", icon: Sparkles }
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
  const [selectedBrain, setSelectedBrain] = useState<Brain | undefined>();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const modelOptions = useMemo(() => models.map((model) => model.name), []);
  const agentOptions = useMemo(() => agents.map((agent) => agent.name), []);

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

  const openModal = (modal: "add" | "edit" | "retrain" | "sync" | "delete" | "link_models" | "link_agents", brain?: Brain) => {
    setSelectedBrain(brain);
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const handleAddBrain = (values: AddBrainInput) => {
    const now = new Date().toISOString();
    const created: Brain = {
      id: `brain-${values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
      name: values.name,
      version: values.version,
      status: values.status,
      description: values.description,
      purpose: values.purpose,
      linkedAgents: [],
      linkedModels: [],
      knowledgeSource: values.knowledgeSource,
      memorySource: values.memorySource,
      lastUpdated: now,
      createdAt: now,
      capabilities: ["custom-capability"],
      syncStatus: "SYNCED"
    };

    setBrains((current) => [created, ...current]);
    pushToast({ title: "Brain added", description: `${values.name} is now available.`, tone: "success" });
  };

  const handleEditBrain = (brainId: string, updates: Partial<Brain>) => {
    setBrains((current) =>
      current.map((brain) =>
        brain.id === brainId
          ? {
              ...brain,
              ...updates,
              lastUpdated: new Date().toISOString()
            }
          : brain
      )
    );
    pushToast({ title: "Brain updated", description: "Brain settings saved successfully.", tone: "success" });
  };

  const handleRetrainBrain = (brainId: string) => {
    setBrains((current) =>
      current.map((brain) =>
        brain.id === brainId
          ? {
              ...brain,
              status: "UPDATING",
              lastUpdated: new Date().toISOString()
            }
          : brain
      )
    );
    pushToast({ title: "Retrain started", description: "Brain retraining has been queued.", tone: "info" });
  };

  const handleSyncKnowledge = (brainId: string) => {
    setBrains((current) =>
      current.map((brain) =>
        brain.id === brainId
          ? {
              ...brain,
              syncStatus: "SYNCED",
              status: "ACTIVE",
              lastUpdated: new Date().toISOString()
            }
          : brain
      )
    );
    pushToast({ title: "Knowledge synced", description: "Connected knowledge sources were refreshed.", tone: "success" });
  };

  const handleDeleteBrain = (brainId: string) => {
    const deleted = brains.find((brain) => brain.id === brainId);
    setBrains((current) => current.filter((brain) => brain.id !== brainId));
    pushToast({
      title: "Brain deleted",
      description: deleted ? `${deleted.name} was removed.` : "Brain removed.",
      tone: "warning"
    });
  };

  const handleLinkModels = (brainId: string, modelsLinked: string[]) => {
    setBrains((current) =>
      current.map((brain) =>
        brain.id === brainId
          ? {
              ...brain,
              linkedModels: modelsLinked,
              lastUpdated: new Date().toISOString()
            }
          : brain
      )
    );
    pushToast({ title: "Models linked", description: "Brain model routing has been updated.", tone: "success" });
  };

  const handleLinkAgents = (brainId: string, agentsLinked: string[]) => {
    setBrains((current) =>
      current.map((brain) =>
        brain.id === brainId
          ? {
              ...brain,
              linkedAgents: agentsLinked,
              lastUpdated: new Date().toISOString()
            }
          : brain
      )
    );
    pushToast({ title: "Agents linked", description: "Brain agent access rules were updated.", tone: "success" });
  };

  const handleViewDetails = (brain: Brain) => {
    pushToast({
      title: "Brain detail route ready",
      description: `Prepared for /brains/${brain.id}`,
      tone: "info"
    });
  };

  const handleMenuAction = (brain: Brain, action: BrainMenuAction) => {
    if (action === "view") return handleViewDetails(brain);
    if (action === "edit") return openModal("edit", brain);
    if (action === "sync") return openModal("sync", brain);
    if (action === "retrain") return openModal("retrain", brain);
    if (action === "link_models") return openModal("link_models", brain);
    if (action === "link_agents") return openModal("link_agents", brain);
    if (action === "delete") return openModal("delete", brain);
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "add") return openModal("add");
    if (action === "update") return openModal("edit", brains[0]);
    if (action === "sync") return openModal("sync", brains[0]);
    pushToast({
      title: "Templates coming soon",
      description: "Brain template library will be wired during backend integration.",
      tone: "info"
    });
  };

  return (
    <DashboardLayout system={systemStats}>
      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-4">
          <section className="panel-base rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl text-cyan-100">Brains</h1>
                <p className="mt-1 text-cyan-600">Manage, update and configure all AI brains and knowledge systems.</p>
              </div>
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                onClick={() => openModal("add")}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Add Brain
              </button>
            </div>
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
