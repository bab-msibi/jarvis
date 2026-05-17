"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BrainCircuit,
  CalendarDays,
  FileText,
  FolderGit2,
  Link2,
  Network,
  Paperclip,
  Plus,
  RefreshCw,
  SquareArrowOutUpRight
} from "lucide-react";

import { DeleteNoteModal } from "@/components/obsidian/delete-note-modal";
import { GraphSettingsModal } from "@/components/obsidian/graph-settings-modal";
import { ImportNotesModal } from "@/components/obsidian/import-notes-modal";
import { KnowledgeGraphPreview } from "@/components/obsidian/knowledge-graph-preview";
import { NewDailyNoteInput, NewDailyNoteModal } from "@/components/obsidian/new-daily-note-modal";
import { NewNoteInput, NewNoteModal } from "@/components/obsidian/new-note-modal";
import { NoteMenuAction } from "@/components/obsidian/note-action-menu";
import { NotesTable, NotesViewMode } from "@/components/obsidian/notes-table";
import { NotesSortOption, SearchToolbar } from "@/components/obsidian/search-toolbar";
import { SidebarPanel } from "@/components/obsidian/sidebar-panel";
import { StatsCard } from "@/components/obsidian/stats-card";
import { SyncVaultModal } from "@/components/obsidian/sync-vault-modal";
import { TopTagsPanel } from "@/components/obsidian/top-tags-panel";
import { VaultOverviewChart } from "@/components/obsidian/vault-overview-chart";
import { VaultSettingsModal } from "@/components/obsidian/vault-settings-modal";
import { ObsidianTabs } from "@/components/obsidian/obsidian-tabs";
import { QuickActionCard } from "@/components/obsidian/quick-action-card";
import { VaultStructureTree } from "@/components/obsidian/vault-structure-tree";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { fetchDataResource } from "@/lib/api-client";
import { obsidianData, obsidianStats } from "@/lib/data/obsidian";
import { systemServices, systemStats } from "@/lib/data/system";
import { useObsidianStore } from "@/lib/store/obsidian-store";
import { NoteType, ObsidianNote, ObsidianTab, VaultFolder } from "@/types/obsidian";

type ModalState = null | "sync" | "new_note" | "new_daily" | "import" | "settings" | "graph_settings" | "delete";

const quickActionItems = [
  { key: "new_note", title: "New Note", description: "Create a new note", icon: Plus },
  { key: "new_daily", title: "New Daily Note", description: "Create today's note", icon: CalendarDays },
  { key: "sync", title: "Sync Vault", description: "Sync with Obsidian", icon: RefreshCw },
  { key: "graph", title: "Graph View", description: "Open knowledge graph", icon: Network },
  { key: "import", title: "Import Notes", description: "Import from files", icon: FileText },
  { key: "settings", title: "Vault Settings", description: "Configure integration", icon: FolderGit2 }
] as const;

function flattenFolders(folders: VaultFolder[]): VaultFolder[] {
  const output: VaultFolder[] = [];

  function walk(nodes: VaultFolder[]) {
    nodes.forEach((node) => {
      output.push(node);
      if (node.children?.length) walk(node.children);
    });
  }

  walk(folders);
  return output;
}

function folderIdMap(folders: VaultFolder[]) {
  const map = new Map<string, VaultFolder>();
  const items = flattenFolders(folders);
  items.forEach((item) => map.set(item.id, item));
  return map;
}

function parseRelativeTime(value: string) {
  const trimmed = value.toLowerCase();
  const minutes = Number(trimmed.match(/(\d+)\s*m/)?.[1] ?? 0);
  const hours = Number(trimmed.match(/(\d+)\s*h/)?.[1] ?? 0);
  const days = Number(trimmed.match(/(\d+)\s*d/)?.[1] ?? 0);
  return days * 1440 + hours * 60 + minutes;
}

function matchesTab(note: ObsidianNote, activeTab: ObsidianTab) {
  if (activeTab === "Daily Notes") return note.noteType === "daily";
  if (activeTab === "Attachments") return note.noteType === "attachment";
  if (activeTab === "Notes") return note.noteType !== "attachment";
  return true;
}

function sortNotes(notes: ObsidianNote[], sortBy: NotesSortOption) {
  const sorted = [...notes];

  if (sortBy === "updated_newest") {
    sorted.sort((a, b) => parseRelativeTime(a.updatedAt) - parseRelativeTime(b.updatedAt));
    return sorted;
  }
  if (sortBy === "updated_oldest") {
    sorted.sort((a, b) => parseRelativeTime(b.updatedAt) - parseRelativeTime(a.updatedAt));
    return sorted;
  }
  if (sortBy === "backlinks_desc") {
    sorted.sort((a, b) => b.backlinks - a.backlinks);
    return sorted;
  }

  sorted.sort((a, b) => a.title.localeCompare(b.title));
  return sorted;
}

export default function ObsidianPage() {
  const [notes, setNotes] = useState<ObsidianNote[]>(() => obsidianData.notes);
  const obsidianQuery = useQuery({ queryKey: ["data", "obsidian"], queryFn: () => fetchDataResource("obsidian", { ...obsidianData, stats: obsidianStats }) });
  const systemQuery = useQuery({ queryKey: ["data", "system"], queryFn: () => fetchDataResource("system", { stats: systemStats, services: systemServices }) });
  const [searchValue, setSearchValue] = useState("");
  const [folderFilter, setFolderFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("ALL");
  const [noteTypeFilter, setNoteTypeFilter] = useState<"ALL" | NoteType>("ALL");
  const [sortBy, setSortBy] = useState<NotesSortOption>("updated_newest");
  const [viewMode, setViewMode] = useState<NotesViewMode>("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [selectedNote, setSelectedNote] = useState<ObsidianNote | undefined>();
  const [vaultState, setVaultState] = useState({
    vaultName: obsidianData.vaultName,
    vaultPath: obsidianData.vaultPath,
    lastSync: obsidianStats.lastSync,
    syncStatus: obsidianStats.syncStatus as "synced" | "syncing" | "error"
  });
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (!obsidianQuery.data?.data.notes) return;
    queueMicrotask(() => {
      setNotes(obsidianQuery.data.data.notes);
      setVaultState({
        vaultName: obsidianQuery.data.data.vaultName,
        vaultPath: obsidianQuery.data.data.vaultPath,
        lastSync: obsidianQuery.data.data.stats.lastSync,
        syncStatus: obsidianQuery.data.data.stats.syncStatus as "synced" | "syncing" | "error"
      });
    });
  }, [obsidianQuery.data]);

  const liveObsidianData = obsidianQuery.data?.data ?? { ...obsidianData, stats: obsidianStats };
  const liveObsidianStats = liveObsidianData.stats;

  const activeTab = useObsidianStore((state) => state.activeTab);
  const setActiveTab = useObsidianStore((state) => state.setActiveTab);
  const expandedFolderIds = useObsidianStore((state) => state.expandedFolderIds);
  const toggleFolder = useObsidianStore((state) => state.toggleFolder);
  const selectedFolderId = useObsidianStore((state) => state.selectedFolderId);
  const setSelectedFolderId = useObsidianStore((state) => state.setSelectedFolderId);
  const graphPhysics = useObsidianStore((state) => state.graphPhysics);
  const graphGlow = useObsidianStore((state) => state.graphGlow);
  const setGraphPhysics = useObsidianStore((state) => state.setGraphPhysics);
  const setGraphGlow = useObsidianStore((state) => state.setGraphGlow);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const foldersFlat = useMemo(() => flattenFolders(liveObsidianData.folders).filter((folder) => folder.id !== "root"), [liveObsidianData.folders]);
  const folderMap = useMemo(() => folderIdMap(liveObsidianData.folders), [liveObsidianData.folders]);
  const folderOptions = useMemo(() => foldersFlat.map((folder) => folder.name), [foldersFlat]);

  const filteredNotes = useMemo(() => {
    const selectedFolderPath = selectedFolderId ? folderMap.get(selectedFolderId)?.name : null;
    const queried = notes.filter((note) => {
      const matchesSearch =
        !searchValue.trim() ||
        [note.title, note.folder, note.tags.join(" "), note.noteType].join(" ").toLowerCase().includes(searchValue.toLowerCase());
      const matchesFolder = folderFilter === "ALL" || note.folder.includes(folderFilter);
      const matchesTreeFolder = !selectedFolderPath || note.folder.includes(selectedFolderPath);
      const matchesTag = tagFilter === "ALL" || note.tags.includes(tagFilter);
      const matchesType = noteTypeFilter === "ALL" || note.noteType === noteTypeFilter;
      const matchesActiveTab = matchesTab(note, activeTab);
      return matchesSearch && matchesFolder && matchesTreeFolder && matchesTag && matchesType && matchesActiveTab;
    });

    const tabSorted = activeTab === "Backlinks" ? [...queried].sort((a, b) => b.backlinks - a.backlinks) : queried;
    return sortNotes(tabSorted, sortBy);
  }, [activeTab, folderFilter, folderMap, noteTypeFilter, notes, searchValue, selectedFolderId, sortBy, tagFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedNotes = filteredNotes.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const openModal = (modal: ModalState, note?: ObsidianNote) => {
    setSelectedNote(note);
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const handleNewNote = (values: NewNoteInput) => {
    const createdNote: ObsidianNote = {
      id: `note-${values.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
      title: values.title,
      folder: values.folder,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      updatedAt: "just now",
      backlinks: 0,
      linkedBrains: ["General Brain"],
      noteType: values.noteType,
      wordCount: 220
    };

    setNotes((current) => [createdNote, ...current]);
    pushToast({ title: "Note created", description: `${values.title} was created.`, tone: "success" });
  };

  const handleNewDailyNote = (values: NewDailyNoteInput) => {
    const title = `Daily Note - ${new Date(values.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    const createdNote: ObsidianNote = {
      id: `daily-${values.date}`,
      title,
      folder: "Daily Notes",
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      updatedAt: "just now",
      backlinks: 0,
      linkedBrains: ["General Brain"],
      noteType: "daily",
      wordCount: 180
    };
    setNotes((current) => [createdNote, ...current]);
    pushToast({ title: "Daily note created", description: title, tone: "success" });
  };

  const handleDeleteNote = (noteId: string) => {
    const deleted = notes.find((note) => note.id === noteId);
    setNotes((current) => current.filter((note) => note.id !== noteId));
    setSelectedNote(undefined);
    pushToast({
      title: "Note deleted",
      description: deleted ? `${deleted.title} was removed.` : "Note removed.",
      tone: "warning"
    });
  };

  const handleSyncVault = (mode: "full" | "incremental") => {
    setVaultState((current) => ({
      ...current,
      syncStatus: "synced",
      lastSync: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })
    }));
    pushToast({
      title: mode === "full" ? "Full sync complete" : "Incremental sync complete",
      description: "Vault knowledge index is now up to date.",
      tone: "success"
    });
  };

  const handleImportNotes = (source: string, value: string) => {
    pushToast({
      title: "Import queued",
      description: value ? `${source} import source received.` : `${source} import initialized.`,
      tone: "info"
    });
  };

  const handleSaveVaultSettings = (settings: { vaultName: string; vaultPath: string; autoSync: boolean }) => {
    setVaultState((current) => ({
      ...current,
      vaultName: settings.vaultName,
      vaultPath: settings.vaultPath
    }));
    pushToast({
      title: "Vault settings saved",
      description: settings.autoSync ? "Auto-sync is enabled." : "Auto-sync is disabled.",
      tone: "success"
    });
  };

  const handleNoteMenuAction = (note: ObsidianNote, action: NoteMenuAction) => {
    if (action === "open") {
      return pushToast({
        title: "Note opened",
        description: `${note.title} is ready for editor integration.`,
        tone: "info"
      });
    }
    if (action === "daily") return openModal("new_daily");
    if (action === "delete") return openModal("delete", note);
  };

  const handleQuickAction = (key: (typeof quickActionItems)[number]["key"]) => {
    if (key === "new_note") return openModal("new_note");
    if (key === "new_daily") return openModal("new_daily");
    if (key === "sync") return openModal("sync");
    if (key === "graph") {
      setActiveTab("Graph View");
      return pushToast({ title: "Graph tab selected", description: "Graph preview is active.", tone: "info" });
    }
    if (key === "import") return openModal("import");
    openModal("settings");
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
                  onClick={() => openModal("sync")}
                  type="button"
                >
                  + Sync Now
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={() =>
                    pushToast({
                      title: "Obsidian handoff ready",
                      description: "Desktop open action can be connected in backend integration.",
                      tone: "info"
                    })
                  }
                  type="button"
                >
                  + Open in Obsidian
                  <SquareArrowOutUpRight className="h-3.5 w-3.5" />
                </button>
              </ActionButtonGroup>
            }
            subtitle="Manage your Obsidian vault, notes, knowledge graph and AI knowledge synchronization."
            title="Obsidian Integration"
          />

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="All notes in vault" icon={FileText} label="Total Notes" tone="cyan" value={liveObsidianStats.notes.toLocaleString()} />
            <StatsCard description="This month" icon={CalendarDays} label="Daily Notes" tone="green" value={liveObsidianData.dailyNotesCount.toLocaleString()} />
            <StatsCard description="Active brains" icon={BrainCircuit} label="Linked to Brains" tone="amber" value={liveObsidianData.linkedBrainsCount} />
            <StatsCard description="Total backlinks" icon={Link2} label="Backlinks" tone="slate" value={liveObsidianStats.links.toLocaleString()} />
            <StatsCard description="Knowledge nodes" icon={Network} label="Graph Nodes" tone="cyan" value="5,672" />
            <StatsCard description="Files in vault" icon={Paperclip} label="Attachments" tone="rose" value={liveObsidianData.attachmentsCount.toLocaleString()} />
          </section>

          <section className="panel-base rounded-2xl">
            <ObsidianTabs
              activeTab={activeTab}
              onChange={(tab) => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            />
            <div className="p-4 sm:p-5">
              <SearchToolbar
                folderFilter={folderFilter}
                folderOptions={folderOptions}
                noteTypeFilter={noteTypeFilter}
                onFolderChange={(value) => {
                  setFolderFilter(value);
                  setCurrentPage(1);
                }}
                onNoteTypeChange={(value) => {
                  setNoteTypeFilter(value);
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
                onTagChange={(value) => {
                  setTagFilter(value);
                  setCurrentPage(1);
                }}
                onViewModeChange={setViewMode}
                onReset={() => {
                  setSearchValue("");
                  setFolderFilter("ALL");
                  setTagFilter("ALL");
                  setNoteTypeFilter("ALL");
                  setSortBy("updated_newest");
                  setCurrentPage(1);
                }}
                searchValue={searchValue}
                sortBy={sortBy}
                tagFilter={tagFilter}
                tagOptions={liveObsidianData.tags}
                viewMode={viewMode}
              />
            </div>
          </section>

          <section className="grid gap-3 xl:grid-cols-[300px_minmax(0,1fr)]">
            <VaultStructureTree
              expandedFolderIds={expandedFolderIds}
              folders={liveObsidianData.folders}
              onSelectFolder={(folderId) => {
                setSelectedFolderId(folderId === selectedFolderId ? null : folderId);
                setCurrentPage(1);
              }}
              onToggleFolder={toggleFolder}
              selectedFolderId={selectedFolderId}
            />

            <NotesTable
              currentPage={safeCurrentPage}
              notes={pagedNotes}
              onMenuAction={handleNoteMenuAction}
              onOpen={(note) =>
                pushToast({
                  title: "Note opened",
                  description: `${note.title} is ready for editor integration.`,
                  tone: "info"
                })
              }
              onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              pageSize={pageSize}
              totalDisplayCount={liveObsidianStats.notes}
              totalNotes={filteredNotes.length}
              totalPages={totalPages}
              viewMode={viewMode}
            />
          </section>

          <KnowledgeGraphPreview
            edges={liveObsidianData.graphEdges.map((edge) => ({ ...edge, type: "graphConnection" }))}
            nodes={liveObsidianData.graphNodes}
            onOpenFullGraph={() =>
              pushToast({
                title: "Full graph preview ready",
                description: "Full knowledge graph page is prepared for integration.",
                tone: "info"
              })
            }
            onOpenGraphSettings={() => openModal("graph_settings")}
            totalNodes={5672}
          />

          <section className="panel-base rounded-xl px-4 py-2.5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="inline-flex items-center gap-2 text-cyan-600">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Last Sync: {vaultState.lastSync}
              </div>
              <div className="inline-flex items-center gap-2">
                <StatusBadge status={vaultState.syncStatus} />
                <span className="text-cyan-500">Synced indicator</span>
              </div>
            </div>
          </section>
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Vault Overview">
            <VaultOverviewChart distribution={liveObsidianData.vaultDistribution} totalNotes={liveObsidianStats.notes} />
          </SidebarPanel>

          <SidebarPanel title="Top Tags">
            <TopTagsPanel tags={liveObsidianData.tags} />
          </SidebarPanel>

          <SidebarPanel title="Quick Actions">
            <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-1">
              {quickActionItems.map((item) => (
                <QuickActionCard
                  description={item.description}
                  icon={item.icon}
                  key={item.key}
                  onClick={() => handleQuickAction(item.key)}
                  title={item.title}
                />
              ))}
            </div>
          </SidebarPanel>
        </aside>
      </div>

      <SyncVaultModal onClose={closeModal} onSync={handleSyncVault} open={activeModal === "sync"} />

      <NewNoteModal folders={folderOptions} onClose={closeModal} onCreate={handleNewNote} open={activeModal === "new_note"} />

      <NewDailyNoteModal onClose={closeModal} onCreate={handleNewDailyNote} open={activeModal === "new_daily"} />

      <ImportNotesModal onClose={closeModal} onImport={handleImportNotes} open={activeModal === "import"} />

      <VaultSettingsModal
        onClose={closeModal}
        onSave={handleSaveVaultSettings}
        open={activeModal === "settings"}
        vaultName={vaultState.vaultName}
        vaultPath={vaultState.vaultPath}
      />

      <GraphSettingsModal
        graphGlow={graphGlow}
        graphPhysics={graphPhysics}
        onClose={closeModal}
        onSave={(settings) => {
          setGraphGlow(settings.graphGlow);
          setGraphPhysics(settings.graphPhysics);
          pushToast({ title: "Graph settings saved", description: "Graph preferences updated.", tone: "success" });
        }}
        open={activeModal === "graph_settings"}
      />

      <DeleteNoteModal note={selectedNote} onClose={closeModal} onDelete={handleDeleteNote} open={activeModal === "delete"} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
