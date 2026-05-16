"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Activity,
  Archive,
  BrainCircuit,
  Database,
  HardDrive,
  History,
  Layers,
  Search,
  Settings,
  Sparkles,
  Upload
} from "lucide-react";

import { ConfigureRetentionModal } from "@/components/memory/configure-retention-modal";
import { CreateMemoryInput, CreateMemoryModal } from "@/components/memory/create-memory-modal";
import { DeleteMemoryModal } from "@/components/memory/delete-memory-modal";
import { EditMemoryModal } from "@/components/memory/edit-memory-modal";
import { ExportMemoryModal } from "@/components/memory/export-memory-modal";
import { MemoriesTable } from "@/components/memory/memories-table";
import { MemoryDistributionChart } from "@/components/memory/memory-distribution-chart";
import { MemoryMenuAction } from "@/components/memory/memory-action-menu";
import { MemoryOverviewChart } from "@/components/memory/memory-overview-chart";
import { MemorySettingsModal, MemorySettingsValues } from "@/components/memory/memory-settings-modal";
import { MemoryTimelineChart } from "@/components/memory/memory-timeline-chart";
import { MemoryTypesRadarChart } from "@/components/memory/memory-types-radar-chart";
import { MemoryUsagePanel } from "@/components/memory/memory-usage-panel";
import { OptimizeMemoryModal } from "@/components/memory/optimize-memory-modal";
import { QuickActionCard } from "@/components/memory/quick-action-card";
import { SearchToolbar, MemorySortOption, MemoryTimeRange } from "@/components/memory/search-toolbar";
import { SidebarPanel } from "@/components/memory/sidebar-panel";
import { StatsCard } from "@/components/memory/stats-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { memoryData } from "@/lib/mock/memory";
import { systemStats } from "@/lib/mock/system";
import { useMemoryStore } from "@/lib/store/memory-store";
import { MemoryImportance, MemoryItem, MemoryType } from "@/types/memory";

type ModalState = null | "create" | "edit" | "optimize" | "export" | "retention" | "settings" | "delete";

const pageSizeDefault = 10;

const importanceRank: Record<MemoryImportance, number> = {
  High: 4,
  Medium: 3,
  Low: 2,
  "Very Low": 1
};

const quickActions = [
  { key: "create", title: "Create Memory", description: "Add new memory", icon: Database },
  { key: "search", title: "Search Memories", description: "Advanced search", icon: Search },
  { key: "optimize", title: "Optimize Memory", description: "Clean and optimize", icon: Sparkles },
  { key: "export", title: "Export Memories", description: "Export to file", icon: Upload },
  { key: "retention", title: "Configure Retention", description: "Set retention rules", icon: History },
  { key: "settings", title: "Memory Settings", description: "Configure memory", icon: Settings }
] as const;

function parseRelativeTime(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("just now")) return 0;
  const minutes = Number(normalized.match(/(\d+)\s*m/)?.[1] ?? 0);
  const hours = Number(normalized.match(/(\d+)\s*h/)?.[1] ?? 0);
  const days = Number(normalized.match(/(\d+)\s*d/)?.[1] ?? 0);
  return days * 1440 + hours * 60 + minutes;
}

function matchesTimeRange(lastAccessed: string, timeRange: MemoryTimeRange) {
  if (timeRange === "ALL") return true;
  const elapsedMinutes = parseRelativeTime(lastAccessed);
  if (timeRange === "24H") return elapsedMinutes <= 1440;
  if (timeRange === "7D") return elapsedMinutes <= 10080;
  if (timeRange === "30D") return elapsedMinutes <= 43200;
  return elapsedMinutes <= 129600;
}

function sortMemories(memories: MemoryItem[], sortBy: MemorySortOption) {
  const sorted = [...memories];

  if (sortBy === "accessed_recent") {
    sorted.sort((a, b) => parseRelativeTime(a.lastAccessed) - parseRelativeTime(b.lastAccessed));
    return sorted;
  }
  if (sortBy === "accessed_oldest") {
    sorted.sort((a, b) => parseRelativeTime(b.lastAccessed) - parseRelativeTime(a.lastAccessed));
    return sorted;
  }
  if (sortBy === "importance") {
    sorted.sort((a, b) => importanceRank[b.importance] - importanceRank[a.importance]);
    return sorted;
  }

  sorted.sort((a, b) => a.type.localeCompare(b.type));
  return sorted;
}

export default function MemoryPage() {
  const [memories, setMemories] = useState<MemoryItem[]>(() => memoryData.memories);
  const [optimizationLogs, setOptimizationLogs] = useState(() => memoryData.optimizationLogs);
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | MemoryType>("ALL");
  const [brainFilter, setBrainFilter] = useState("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");
  const [importanceFilter, setImportanceFilter] = useState<"ALL" | MemoryImportance>("ALL");
  const [timeRange, setTimeRange] = useState<MemoryTimeRange>("ALL");
  const [sortBy, setSortBy] = useState<MemorySortOption>("accessed_recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [nextOptimizationCountdown, setNextOptimizationCountdown] = useState("05h 32m 18s");

  const viewMode = useMemoryStore((state) => state.viewMode);
  const setViewMode = useMemoryStore((state) => state.setViewMode);
  const selectedMemoryId = useMemoryStore((state) => state.selectedMemoryId);
  const setSelectedMemoryId = useMemoryStore((state) => state.setSelectedMemoryId);
  const autoOptimizationEnabled = useMemoryStore((state) => state.autoOptimizationEnabled);
  const setAutoOptimizationEnabled = useMemoryStore((state) => state.setAutoOptimizationEnabled);

  const selectedMemory = useMemo(() => memories.find((memory) => memory.id === selectedMemoryId), [memories, selectedMemoryId]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const typeOptions = useMemo(() => Array.from(new Set(memories.map((memory) => memory.type))), [memories]);
  const brainOptions = useMemo(() => Array.from(new Set(memories.map((memory) => memory.brain))), [memories]);
  const agentOptions = useMemo(() => Array.from(new Set(memories.map((memory) => memory.agent))), [memories]);

  const filteredMemories = useMemo(() => {
    const queried = memories.filter((memory) => {
      const matchesSearch =
        !searchValue.trim() ||
        [memory.content, memory.type, memory.brain, memory.agent, memory.importance, memory.decayStatus, memory.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const matchesType = typeFilter === "ALL" || memory.type === typeFilter;
      const matchesBrain = brainFilter === "ALL" || memory.brain === brainFilter;
      const matchesAgent = agentFilter === "ALL" || memory.agent === agentFilter;
      const matchesImportance = importanceFilter === "ALL" || memory.importance === importanceFilter;
      const matchesRange = matchesTimeRange(memory.lastAccessed, timeRange);
      return matchesSearch && matchesType && matchesBrain && matchesAgent && matchesImportance && matchesRange;
    });

    return sortMemories(queried, sortBy);
  }, [agentFilter, brainFilter, importanceFilter, memories, searchValue, sortBy, timeRange, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMemories.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedMemories = filteredMemories.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const openModal = (modal: ModalState, memory?: MemoryItem) => {
    setSelectedMemoryId(memory?.id ?? null);
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const handleCreateMemory = (values: CreateMemoryInput) => {
    const createdMemory: MemoryItem = {
      id: `mem-${Date.now().toString(36)}`,
      content: values.content,
      type: values.type,
      brain: values.brain,
      agent: values.agent,
      importance: values.importance,
      decayStatus: values.decayStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastAccessed: "just now",
      embeddingId: `emb-${Math.floor(Math.random() * 90000 + 10000)}`,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      pinned: false,
      shared: false,
      memoryClass: values.memoryClass
    };

    setMemories((current) => [createdMemory, ...current]);
    setCurrentPage(1);
    pushToast({ title: "Memory created", description: "New memory item added to active store.", tone: "success" });
  };

  const handleEditMemory = (memoryId: string, values: CreateMemoryInput) => {
    setMemories((current) =>
      current.map((memory) =>
        memory.id === memoryId
          ? {
              ...memory,
              content: values.content,
              type: values.type,
              brain: values.brain,
              agent: values.agent,
              importance: values.importance,
              decayStatus: values.decayStatus,
              memoryClass: values.memoryClass,
              tags: values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
              updatedAt: new Date().toISOString()
            }
          : memory
      )
    );
    pushToast({ title: "Memory updated", description: "Memory metadata saved.", tone: "success" });
  };

  const handleDeleteMemory = (memoryId: string) => {
    const deleted = memories.find((memory) => memory.id === memoryId);
    setMemories((current) => current.filter((memory) => memory.id !== memoryId));
    setSelectedMemoryId(null);
    pushToast({
      title: "Memory deleted",
      description: deleted ? `${deleted.embeddingId} removed from store.` : "Memory removed.",
      tone: "warning"
    });
  };

  const handleOptimizeMemory = (mode: "standard" | "deep") => {
    const runningLog = {
      id: `ol-${Date.now().toString(36)}`,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      status: "Running" as const,
      details: `${mode === "deep" ? "Deep" : "Standard"} optimization in progress.`
    };
    setOptimizationLogs((current) => [runningLog, ...current]);
    pushToast({ title: "Optimization started", description: `${mode === "deep" ? "Deep" : "Standard"} memory optimization queued.`, tone: "info" });

    window.setTimeout(() => {
      setOptimizationLogs((current) => {
        const [first, ...rest] = current;
        if (!first) return current;
        return [
          {
            ...first,
            status: "Successful",
            details: "Compaction and decay refresh completed successfully."
          },
          ...rest
        ];
      });
      setNextOptimizationCountdown("23h 59m 59s");
      pushToast({ title: "Optimization complete", description: "Memory optimization finished successfully.", tone: "success" });
    }, 1400);
  };

  const handleExportMemory = (format: "json" | "csv" | "md", scope: "filtered" | "all") => {
    pushToast({ title: "Export queued", description: `${scope === "all" ? "All" : "Filtered"} memories export in ${format.toUpperCase()} format.`, tone: "info" });
  };

  const handleRetentionSave = (policyId: string, maxDays: number, action: "Archive" | "Compress" | "Delete") => {
    pushToast({ title: "Retention updated", description: `Policy ${policyId} set to ${maxDays} days (${action}).`, tone: "success" });
  };

  const handleSettingsSave = (settings: MemorySettingsValues) => {
    pushToast({
      title: "Memory settings saved",
      description: settings.crossAgentSync ? "Cross-agent sync enabled." : "Cross-agent sync disabled.",
      tone: "success"
    });
  };

  const handleViewMemory = (memory: MemoryItem) => {
    pushToast({ title: "Memory viewer ready", description: `${memory.embeddingId} is prepared for detail drawer integration.`, tone: "info" });
  };

  const handlePinMemory = (memory: MemoryItem) => {
    setMemories((current) => current.map((item) => (item.id === memory.id ? { ...item, pinned: !item.pinned } : item)));
    pushToast({ title: memory.pinned ? "Memory unpinned" : "Memory pinned", description: memory.embeddingId, tone: "info" });
  };

  const handleShareMemory = (memory: MemoryItem) => {
    setMemories((current) => current.map((item) => (item.id === memory.id ? { ...item, shared: true } : item)));
    pushToast({ title: "Memory shared", description: `${memory.embeddingId} shared with linked agents.`, tone: "success" });
  };

  const handleMenuAction = (memory: MemoryItem, action: MemoryMenuAction) => {
    if (action === "edit") return openModal("edit", memory);
    if (action === "export") return openModal("export", memory);
    if (action === "delete") return openModal("delete", memory);

    if (action === "move") {
      return pushToast({ title: "Memory move ready", description: "Move action prepared for backend integration.", tone: "info" });
    }
    if (action === "link_brain") {
      return pushToast({ title: "Brain link updated", description: `${memory.embeddingId} can be rerouted in detail editor.`, tone: "info" });
    }

    pushToast({ title: "Agent link updated", description: `${memory.embeddingId} can be reassigned in detail editor.`, tone: "info" });
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "create") return openModal("create");
    if (action === "optimize") return openModal("optimize");
    if (action === "export") return openModal("export", selectedMemory ?? memories[0]);
    if (action === "retention") return openModal("retention");
    if (action === "settings") return openModal("settings");

    pushToast({ title: "Search scope expanded", description: "Semantic search integration is prepared.", tone: "info" });
  };

  return (
    <DashboardLayout system={systemStats}>
      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-4">
          <section className="panel-base rounded-2xl p-5 sm:p-6">
            <h1 className="text-3xl text-cyan-100">Memory Management</h1>
            <p className="mt-1 text-cyan-600">Monitor, manage and optimize AI memory across all systems and agents.</p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="All time memories" icon={Database} label="Total Memories" tone="cyan" value={memoryData.totals.totalMemories.toLocaleString()} />
            <StatsCard description="In use" icon={Activity} label="Active Memories" tone="green" value={memoryData.totals.activeMemories.toLocaleString()} />
            <StatsCard description="Temporary" icon={Layers} label="Short Term" tone="rose" value={memoryData.totals.shortTerm.toLocaleString()} />
            <StatsCard description="Persistent" icon={Archive} label="Long Term" tone="amber" value={memoryData.totals.longTerm.toLocaleString()} />
            <StatsCard description="Total embeddings" icon={BrainCircuit} label="Vector Embeddings" tone="slate" value={memoryData.totals.embeddings} />
            <StatsCard description="Storage used" icon={HardDrive} label="Memory Usage" tone="cyan" value={memoryData.totals.memoryUsage} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              agentFilter={agentFilter}
              agentOptions={agentOptions}
              brainFilter={brainFilter}
              brainOptions={brainOptions}
              importanceFilter={importanceFilter}
              onAgentChange={(value) => {
                setAgentFilter(value);
                setCurrentPage(1);
              }}
              onBrainChange={(value) => {
                setBrainFilter(value);
                setCurrentPage(1);
              }}
              onImportanceChange={(value) => {
                setImportanceFilter(value);
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
              onTimeRangeChange={(value) => {
                setTimeRange(value);
                setCurrentPage(1);
              }}
              onTypeChange={(value) => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
              onViewModeChange={(value) => setViewMode(value)}
              searchValue={searchValue}
              sortBy={sortBy}
              timeRange={timeRange}
              typeFilter={typeFilter}
              typeOptions={typeOptions}
              viewMode={viewMode}
            />
          </section>

          <MemoriesTable
            currentPage={safeCurrentPage}
            memories={pagedMemories}
            onMenuAction={handleMenuAction}
            onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onPin={handlePinMemory}
            onShare={handleShareMemory}
            onView={handleViewMemory}
            pageSize={pageSize}
            totalDisplayCount={memoryData.totals.totalMemories}
            totalMemories={filteredMemories.length}
            totalPages={totalPages}
            viewMode={viewMode}
          />

          <section className="grid gap-3 xl:grid-cols-3">
            <MemoryDistributionChart data={memoryData.memoryDistributionByBrain} total={memoryData.totals.totalMemories} />
            <MemoryTimelineChart data={memoryData.memoryTimeline} />
            <MemoryTypesRadarChart data={memoryData.memoryTypesRadar} />
          </section>

          <section className="panel-base rounded-xl px-4 py-3">
            <div className="grid gap-3 text-sm md:grid-cols-4 md:items-center">
              <div>
                <p className="text-cyan-200">Memory System Status</p>
                <p className="text-emerald-300">All systems operational</p>
              </div>

              <div>
                <p className="text-cyan-500">Last Optimization</p>
                <p className="text-cyan-200">{optimizationLogs[0]?.timestamp ?? "N/A"}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={optimizationLogs[0]?.status ?? "Successful"} />
                  <label className="inline-flex items-center gap-2 text-cyan-300">
                    <span className="text-xs">Auto Optimization</span>
                    <button
                      aria-label="Toggle auto optimization"
                      className={`h-5 w-10 rounded-full border transition ${
                        autoOptimizationEnabled ? "border-emerald-400/50 bg-emerald-500/20" : "border-cyan-900/45 bg-sky-950/50"
                      }`}
                      onClick={() => setAutoOptimizationEnabled(!autoOptimizationEnabled)}
                      type="button"
                    >
                      <span
                        className={`block h-4 w-4 rounded-full transition ${
                          autoOptimizationEnabled ? "translate-x-[18px] bg-emerald-300" : "translate-x-[2px] bg-cyan-500"
                        }`}
                      />
                    </button>
                  </label>
                </div>
                <p className="text-xs text-cyan-600">{autoOptimizationEnabled ? "Enabled" : "Disabled"}</p>
              </div>

              <div>
                <p className="text-cyan-500">Next Optimization</p>
                <p className="text-cyan-100">{nextOptimizationCountdown}</p>
              </div>
            </div>
          </section>
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Memory Overview">
            <MemoryOverviewChart data={memoryData.memoryOverview} total={memoryData.totals.totalMemories} />
          </SidebarPanel>

          <SidebarPanel title="Memory Importance">
            <div className="space-y-2.5">
              {memoryData.memoryImportanceBreakdown.map((item) => {
                const max = Math.max(1, ...memoryData.memoryImportanceBreakdown.map((entry) => entry.value));
                const percent = Math.round((item.value / max) * 100);
                return (
                  <div className="space-y-1" key={item.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cyan-200">{item.label}</span>
                      <span className="text-cyan-500">
                        {item.value.toLocaleString()} ({((item.value / memoryData.totals.totalMemories) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-sky-950/70">
                      <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Memory Usage">
            <MemoryUsagePanel
              availableGB={memoryData.memoryUsage.availableGB}
              slices={memoryData.memoryUsage.slices}
              totalAllocatedGB={memoryData.memoryUsage.totalAllocatedGB}
              usedGB={memoryData.memoryUsage.usedGB}
            />
          </SidebarPanel>

          <SidebarPanel title="Quick Actions">
            <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-1">
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

      <CreateMemoryModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        onClose={closeModal}
        onCreate={handleCreateMemory}
        open={activeModal === "create"}
        typeOptions={typeOptions}
      />

      <EditMemoryModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        memory={selectedMemory}
        onClose={closeModal}
        onSave={handleEditMemory}
        open={activeModal === "edit"}
        typeOptions={typeOptions}
      />

      <OptimizeMemoryModal onClose={closeModal} onOptimize={handleOptimizeMemory} open={activeModal === "optimize"} />

      <ExportMemoryModal onClose={closeModal} onExport={handleExportMemory} open={activeModal === "export"} />

      <ConfigureRetentionModal onClose={closeModal} onSave={handleRetentionSave} open={activeModal === "retention"} policies={memoryData.retentionPolicies} />

      <MemorySettingsModal onClose={closeModal} onSave={handleSettingsSave} open={activeModal === "settings"} />

      <DeleteMemoryModal memory={selectedMemory} onClose={closeModal} onDelete={handleDeleteMemory} open={activeModal === "delete"} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
