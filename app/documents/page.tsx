"use client";

import { useCallback, useMemo, useState } from "react";
import {
  FilePlus2,
  FileSearch,
  Files,
  FolderPlus,
  HardDrive,
  ScanSearch,
  Share2,
  Sparkles,
  Upload
} from "lucide-react";

import { AIAnalyzeModal } from "@/components/documents/ai-analyze-modal";
import { CategoriesPanel } from "@/components/documents/categories-panel";
import { DeleteDocumentModal } from "@/components/documents/delete-document-modal";
import { DocumentMenuAction } from "@/components/documents/document-action-menu";
import { DocumentOverviewChart } from "@/components/documents/document-overview-chart";
import { DocumentSettingsModal, DocumentSettingsValues } from "@/components/documents/document-settings-modal";
import { DocumentsTable } from "@/components/documents/documents-table";
import { ImportFolderModal } from "@/components/documents/import-folder-modal";
import { LinkAgentModal } from "@/components/documents/link-agent-modal";
import { LinkBrainModal } from "@/components/documents/link-brain-modal";
import { QuickActionCard } from "@/components/documents/quick-action-card";
import { RecentActivityPanel } from "@/components/documents/recent-activity-panel";
import { SearchToolbar, DocumentSortOption } from "@/components/documents/search-toolbar";
import { ShareDocumentModal } from "@/components/documents/share-document-modal";
import { SidebarPanel } from "@/components/documents/sidebar-panel";
import { StatsCard } from "@/components/documents/stats-card";
import { StorageOverviewChart } from "@/components/documents/storage-overview-chart";
import { TopCategoriesPanel } from "@/components/documents/top-categories-panel";
import { UploadDocumentInput, UploadDocumentModal } from "@/components/documents/upload-document-modal";
import { UploadedByPanel } from "@/components/documents/uploaded-by-panel";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { documentsData } from "@/lib/mock/documents";
import { systemStats } from "@/lib/mock/system";
import { DocumentsViewMode, useDocumentsStore } from "@/lib/store/documents-store";
import { DocumentItem, DocumentType } from "@/types/document";
import { toSizeInMB } from "@/components/documents/document-utils";

type ModalState = null | "upload" | "import" | "analyze" | "link_agent" | "link_brain" | "settings" | "delete" | "share";

const quickActions = [
  { key: "upload", title: "Upload Document", description: "Upload new files", icon: Upload },
  { key: "import", title: "Import Folder", description: "Import from system", icon: FolderPlus },
  { key: "scan", title: "Scan & Index", description: "AI scan & index docs", icon: ScanSearch },
  { key: "analyze", title: "AI Analyze", description: "Analyze with AI", icon: Sparkles },
  { key: "shared", title: "Shared Documents", description: "Manage sharing", icon: Share2 },
  { key: "settings", title: "Document Settings", description: "Configure preferences", icon: FileSearch }
] as const;

function parseRelativeTime(value: string) {
  const trimmed = value.toLowerCase();
  if (trimmed.includes("just now")) return 0;
  const minutes = Number(trimmed.match(/(\d+)\s*m/)?.[1] ?? 0);
  const hours = Number(trimmed.match(/(\d+)\s*h/)?.[1] ?? 0);
  const days = Number(trimmed.match(/(\d+)\s*d/)?.[1] ?? 0);
  return days * 1440 + hours * 60 + minutes;
}

function sortDocuments(documents: DocumentItem[], sortBy: DocumentSortOption) {
  const sorted = [...documents];

  if (sortBy === "updated_newest") {
    sorted.sort((a, b) => parseRelativeTime(a.updatedAt) - parseRelativeTime(b.updatedAt));
    return sorted;
  }
  if (sortBy === "updated_oldest") {
    sorted.sort((a, b) => parseRelativeTime(b.updatedAt) - parseRelativeTime(a.updatedAt));
    return sorted;
  }
  if (sortBy === "size_desc") {
    sorted.sort((a, b) => toSizeInMB(b.size) - toSizeInMB(a.size));
    return sorted;
  }

  sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => documentsData.documents);
  const [activityLogs, setActivityLogs] = useState(() => documentsData.activityLogs);
  const [indexingStatus, setIndexingStatus] = useState(() => documentsData.indexingStatus);
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | DocumentType>("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");
  const [brainFilter, setBrainFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<DocumentSortOption>("updated_newest");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const viewMode = useDocumentsStore((state) => state.viewMode);
  const setViewMode = useDocumentsStore((state) => state.setViewMode);
  const selectedDocumentId = useDocumentsStore((state) => state.selectedDocumentId);
  const setSelectedDocumentId = useDocumentsStore((state) => state.setSelectedDocumentId);
  const isIndexerRunning = useDocumentsStore((state) => state.isIndexerRunning);
  const setIndexerRunning = useDocumentsStore((state) => state.setIndexerRunning);

  const selectedDocument = useMemo(() => documents.find((document) => document.id === selectedDocumentId), [documents, selectedDocumentId]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const categoryOptions = useMemo(() => documentsData.categories.map((entry) => entry.name), []);
  const typeOptions = useMemo(() => Array.from(new Set(documents.map((document) => document.type))), [documents]);
  const agentOptions = useMemo(() => Array.from(new Set(documents.map((document) => document.linkedAgent))), [documents]);
  const brainOptions = useMemo(() => Array.from(new Set(documents.map((document) => document.linkedBrain))), [documents]);

  const filteredDocuments = useMemo(() => {
    const queried = documents.filter((document) => {
      const matchesSearch =
        !searchValue.trim() ||
        [
          document.name,
          document.category,
          document.type,
          document.uploadedBy,
          document.linkedAgent,
          document.linkedBrain,
          document.aiStatus,
          document.tags.join(" ")
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const matchesCategory = categoryFilter === "ALL" || document.category === categoryFilter;
      const matchesType = typeFilter === "ALL" || document.type === typeFilter;
      const matchesAgent = agentFilter === "ALL" || document.linkedAgent === agentFilter;
      const matchesBrain = brainFilter === "ALL" || document.linkedBrain === brainFilter;
      return matchesSearch && matchesCategory && matchesType && matchesAgent && matchesBrain;
    });

    return sortDocuments(queried, sortBy);
  }, [agentFilter, brainFilter, categoryFilter, documents, searchValue, sortBy, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedDocuments = filteredDocuments.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const aiProcessedCount = useMemo(() => documents.filter((document) => document.aiStatus === "Indexed").length, [documents]);

  const openModal = (modal: ModalState, document?: DocumentItem) => {
    setSelectedDocumentId(document?.id ?? null);
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const handleUpload = (values: UploadDocumentInput) => {
    const createdDocument: DocumentItem = {
      id: `doc-${values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
      name: values.name,
      category: values.category,
      type: values.type,
      size: values.size,
      uploadedBy: values.uploadedBy,
      linkedAgent: values.linkedAgent,
      linkedBrain: values.linkedBrain,
      aiStatus: "Processing",
      updatedAt: "just now",
      createdAt: new Date().toISOString(),
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      storagePath: `/vault/documents/${values.category.toLowerCase().replace(/\s+/g, "-")}/${values.name}`,
      indexed: false,
      shared: values.shared
    };

    setDocuments((current) => [createdDocument, ...current]);
    setActivityLogs((current) => [
      {
        id: `activity-${Date.now().toString(36)}`,
        documentName: values.name,
        action: `Uploaded by ${values.uploadedBy}`,
        actor: values.uploadedBy,
        timestamp: "just now",
        type: values.type
      },
      ...current.slice(0, 7)
    ]);
    setCurrentPage(1);
    pushToast({ title: "Document uploaded", description: `${values.name} is now processing.`, tone: "success" });
  };

  const handleImportFolder = (folderPath: string, recursive: boolean) => {
    pushToast({
      title: "Folder import queued",
      description: `${folderPath} (${recursive ? "recursive" : "flat"}) was queued for indexing.`,
      tone: "info"
    });
  };

  const handleScanAndIndex = () => {
    setIndexerRunning(true);
    setIndexingStatus((current) => ({ ...current, scanStatus: "Running" }));
    pushToast({ title: "Scan started", description: "AI indexing is running on your vault.", tone: "info" });

    window.setTimeout(() => {
      setIndexerRunning(false);
      setIndexingStatus((current) => ({
        ...current,
        scanStatus: "Completed",
        progress: Math.min(100, current.progress + 2),
        indexedCount: Math.min(current.totalCount, current.indexedCount + 18),
        lastScan: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })
      }));
      pushToast({ title: "Scan complete", description: "Indexing refresh finished successfully.", tone: "success" });
    }, 1300);
  };

  const handleAnalyzeDocument = (documentId: string, mode: "quick" | "deep") => {
    const target = documents.find((document) => document.id === documentId);
    if (!target) return;

    setDocuments((current) => current.map((document) => (document.id === documentId ? { ...document, aiStatus: "Processing", updatedAt: "just now" } : document)));
    pushToast({
      title: "AI analysis queued",
      description: `${target.name} queued for ${mode === "quick" ? "quick" : "deep"} analysis.`,
      tone: "info"
    });
  };

  const handleLinkAgent = (documentId: string, linkedAgent: string) => {
    setDocuments((current) => current.map((document) => (document.id === documentId ? { ...document, linkedAgent, updatedAt: "just now" } : document)));
    pushToast({ title: "Agent linked", description: `Document linked to ${linkedAgent}.`, tone: "success" });
  };

  const handleLinkBrain = (documentId: string, linkedBrain: string) => {
    setDocuments((current) => current.map((document) => (document.id === documentId ? { ...document, linkedBrain, updatedAt: "just now" } : document)));
    pushToast({ title: "Brain linked", description: `Document linked to ${linkedBrain}.`, tone: "success" });
  };

  const handleSaveSettings = (values: DocumentSettingsValues) => {
    pushToast({
      title: "Settings saved",
      description: values.semanticSearch ? "Semantic indexing is enabled." : "Semantic indexing is disabled.",
      tone: "success"
    });
  };

  const handleDeleteDocument = (documentId: string) => {
    const deleted = documents.find((document) => document.id === documentId);
    setDocuments((current) => current.filter((document) => document.id !== documentId));
    setSelectedDocumentId(null);
    pushToast({
      title: "Document deleted",
      description: deleted ? `${deleted.name} was removed.` : "Document removed.",
      tone: "warning"
    });
  };

  const handleShareDocument = (documentId: string, recipients: string, permission: "view" | "edit") => {
    const target = documents.find((document) => document.id === documentId);
    setDocuments((current) => current.map((document) => (document.id === documentId ? { ...document, shared: true, updatedAt: "just now" } : document)));
    pushToast({
      title: "Document shared",
      description: `${target?.name ?? "Document"} shared with ${recipients} (${permission}).`,
      tone: "success"
    });
  };

  const handleViewDocument = (document: DocumentItem) => {
    pushToast({ title: "Document preview ready", description: `${document.name} is ready for viewer integration.`, tone: "info" });
  };

  const handleDownloadDocument = (document: DocumentItem) => {
    pushToast({ title: "Download prepared", description: `${document.name} download task queued.`, tone: "info" });
  };

  const handleMenuAction = (document: DocumentItem, action: DocumentMenuAction) => {
    if (action === "edit_metadata") return openModal("settings", document);
    if (action === "link_agent") return openModal("link_agent", document);
    if (action === "link_brain") return openModal("link_brain", document);
    if (action === "ai_analyze") return openModal("analyze", document);
    if (action === "delete") return openModal("delete", document);

    if (action === "move") {
      return pushToast({ title: "Move workflow ready", description: `${document.name} move action prepared for backend integration.`, tone: "info" });
    }

    pushToast({ title: "Document archived", description: `${document.name} moved to archive queue.`, tone: "warning" });
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "upload") return openModal("upload");
    if (action === "import") return openModal("import");
    if (action === "scan") return handleScanAndIndex();
    if (action === "analyze") return openModal("analyze", selectedDocument ?? documents[0]);
    if (action === "settings") return openModal("settings");

    pushToast({ title: "Shared documents", description: "Sharing center is prepared for collaboration backend integration.", tone: "info" });
  };

  const indexStatusLabel = isIndexerRunning ? "Running" : indexingStatus.scanStatus;

  return (
    <DashboardLayout system={systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            actions={
              <ActionButtonGroup>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={() => openModal("upload")}
                  type="button"
                >
                  <Upload className="h-4 w-4" />
                  Upload Document
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={() => openModal("import")}
                  type="button"
                >
                  <FolderPlus className="h-4 w-4" />
                  Import Folder
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={handleScanAndIndex}
                  type="button"
                >
                  <ScanSearch className="h-4 w-4" />
                  Scan & Index
                </button>
              </ActionButtonGroup>
            }
            subtitle="Store, organize and manage all your important documents and files."
            title="Documents"
          />

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="All documents" icon={Files} label="Total Documents" tone="cyan" value={documentsData.totals.documents.toLocaleString()} />
            <StatsCard description="Storage used" icon={HardDrive} label="Total Size" tone="green" value={documentsData.totals.totalSize} />
            <StatsCard description="Last 7 days" icon={Upload} label="Recent Uploads" tone="cyan" value={documentsData.totals.recentUploads} />
            <StatsCard description="Document categories" icon={FilePlus2} label="Categories" tone="amber" value={documentsData.totals.categories} />
            <StatsCard description="Shared with agents" icon={Share2} label="Shared Documents" tone="rose" value={documentsData.totals.sharedDocuments} />
            <StatsCard description="AI indexed docs" icon={Sparkles} label="AI Processed" tone="slate" value={aiProcessedCount.toLocaleString()} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              agentFilter={agentFilter}
              agentOptions={agentOptions}
              brainFilter={brainFilter}
              brainOptions={brainOptions}
              categoryFilter={categoryFilter}
              categoryOptions={categoryOptions}
              onAgentChange={(value) => {
                setAgentFilter(value);
                setCurrentPage(1);
              }}
              onBrainChange={(value) => {
                setBrainFilter(value);
                setCurrentPage(1);
              }}
              onCategoryChange={(value) => {
                setCategoryFilter(value);
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
              onTypeChange={(value) => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
              onViewModeChange={(value) => setViewMode(value as DocumentsViewMode)}
              searchValue={searchValue}
              sortBy={sortBy}
              typeFilter={typeFilter}
              typeOptions={typeOptions}
              viewMode={viewMode}
            />
          </section>

          <DocumentsTable
            currentPage={safeCurrentPage}
            documents={pagedDocuments}
            onDownload={handleDownloadDocument}
            onMenuAction={handleMenuAction}
            onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onShare={(document) => openModal("share", document)}
            onView={handleViewDocument}
            pageSize={pageSize}
            totalDisplayCount={documentsData.totals.documents}
            totalDocuments={filteredDocuments.length}
            totalPages={totalPages}
            viewMode={viewMode}
          />

          <section className="grid gap-3 xl:grid-cols-3">
            <CategoriesPanel categories={documentsData.categories} />
            <StorageOverviewChart storage={documentsData.storage} />
            <RecentActivityPanel logs={activityLogs} />
          </section>

          <section className="panel-base rounded-xl px-4 py-3">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="inline-flex items-center gap-2 text-cyan-600">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Last Scan: {indexingStatus.lastScan}
              </div>

              <StatusBadge status={indexStatusLabel} />

              <div className="ml-auto min-w-[260px] flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs text-cyan-600">
                  <span>
                    AI Index Status: {indexingStatus.indexedCount.toLocaleString()} / {indexingStatus.totalCount.toLocaleString()} indexed
                  </span>
                  <span>{indexingStatus.progress}%</span>
                </div>
                <ProgressBar value={indexingStatus.progress} />
              </div>
            </div>
          </section>
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Document Overview">
            <DocumentOverviewChart breakdown={documentsData.documentTypeBreakdown} totalDocuments={documentsData.totals.documents} />
          </SidebarPanel>

          <SidebarPanel title="Top Categories">
            <TopCategoriesPanel categories={documentsData.categories} />
          </SidebarPanel>

          <SidebarPanel title="Top Uploaded By">
            <UploadedByPanel uploads={documentsData.uploads} />
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

      <UploadDocumentModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        categories={categoryOptions}
        onClose={closeModal}
        onUpload={handleUpload}
        open={activeModal === "upload"}
      />

      <ImportFolderModal onClose={closeModal} onImport={handleImportFolder} open={activeModal === "import"} />

      <AIAnalyzeModal document={selectedDocument} onAnalyze={handleAnalyzeDocument} onClose={closeModal} open={activeModal === "analyze"} />

      <LinkAgentModal
        agentOptions={agentOptions}
        document={selectedDocument}
        onClose={closeModal}
        onLink={handleLinkAgent}
        open={activeModal === "link_agent"}
      />

      <LinkBrainModal
        brainOptions={brainOptions}
        document={selectedDocument}
        onClose={closeModal}
        onLink={handleLinkBrain}
        open={activeModal === "link_brain"}
      />

      <DocumentSettingsModal onClose={closeModal} onSave={handleSaveSettings} open={activeModal === "settings"} />

      <DeleteDocumentModal document={selectedDocument} onClose={closeModal} onDelete={handleDeleteDocument} open={activeModal === "delete"} />

      <ShareDocumentModal document={selectedDocument} onClose={closeModal} onShare={handleShareDocument} open={activeModal === "share"} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
