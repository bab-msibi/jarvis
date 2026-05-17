"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  CirclePause,
  CopyPlus,
  Download,
  Plus,
  ShieldAlert,
  Sparkles
} from "lucide-react";

import { AgentWorkloadItem } from "@/components/tasks/agent-workload-item";
import { CircularOverviewChart } from "@/components/workflows/circular-overview-chart";
import { CreateWorkflowInput, CreateWorkflowModal } from "@/components/workflows/create-workflow-modal";
import { DeleteWorkflowModal } from "@/components/workflows/delete-workflow-modal";
import { EditWorkflowModal } from "@/components/workflows/edit-workflow-modal";
import { ImportWorkflowModal } from "@/components/workflows/import-workflow-modal";
import { QuickActionCard } from "@/components/workflows/quick-action-card";
import { SearchToolbar, WorkflowSortOption, WorkflowViewMode } from "@/components/workflows/search-toolbar";
import { StatsCard } from "@/components/workflows/stats-card";
import { TriggerConfigModal } from "@/components/workflows/trigger-config-modal";
import { WorkflowBuilder } from "@/components/workflows/workflow-builder";
import { WorkflowGrid } from "@/components/workflows/workflow-grid";
import { WorkflowMenuAction } from "@/components/workflows/workflow-action-menu";
import { WorkflowRunModal } from "@/components/workflows/workflow-run-modal";
import { WorkflowSidebarPanel } from "@/components/workflows/workflow-sidebar-panel";
import { WorkflowTemplateModal } from "@/components/workflows/workflow-template-modal";
import { WorkflowsTable } from "@/components/workflows/workflows-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { workflowNodeConfigs } from "@/lib/mock/workflow-nodes";
import { workflows as baseWorkflows } from "@/lib/mock/workflows";
import { systemStats } from "@/lib/mock/system";
import { useWorkflowBuilderStore } from "@/lib/store/workflow-builder-store";
import { Workflow, WorkflowStatus, WorkflowTrigger } from "@/types/workflow";

const pageSize = 8;

const quickActions = [
  { key: "create", title: "Create New Workflow", description: "Build a new automation workflow", icon: Plus },
  { key: "import", title: "Import Workflow", description: "Import from JSON or file", icon: Download },
  { key: "templates", title: "Workflow Templates", description: "Use prebuilt workflow templates", icon: Sparkles },
  { key: "runs", title: "Workflow Runs", description: "View workflow executions", icon: Activity },
  { key: "calendar", title: "Workflow Calendar", description: "View scheduled workflows", icon: CalendarClock }
] as const;

function sortWorkflows(workflows: Workflow[], sortBy: WorkflowSortOption) {
  const sorted = [...workflows];

  if (sortBy === "recent") {
    sorted.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    return sorted;
  }
  if (sortBy === "name_asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }
  if (sortBy === "runs_desc") {
    sorted.sort((a, b) => b.runs - a.runs);
    return sorted;
  }
  if (sortBy === "success_desc") {
    sorted.sort((a, b) => b.successRate - a.successRate);
    return sorted;
  }

  sorted.sort((a, b) => a.status.localeCompare(b.status));
  return sorted;
}

function buildWorkflowFromInput(values: CreateWorkflowInput): Workflow {
  const now = new Date().toISOString();

  return {
    id: `workflow-${values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
    name: values.name,
    description: values.description || "New workflow orchestration pipeline",
    trigger: values.trigger,
    assignedAgent: values.assignedAgent,
    linkedModel: values.linkedModel,
    linkedBrain: values.linkedBrain,
    status: values.status,
    runs: 0,
    successRate: 0,
    lastRun: "never",
    createdAt: now,
    updatedAt: now,
    steps: [
      {
        id: "step-trigger",
        title: "Trigger",
        type: "Trigger",
        status: "IDLE",
        description: `${values.trigger} trigger`
      },
      {
        id: "step-process",
        title: "Process Step",
        type: "Agent Step",
        assignedAgent: values.assignedAgent,
        assignedModel: values.linkedModel,
        status: "IDLE"
      },
      {
        id: "step-notify",
        title: "Notification",
        type: "Notification",
        status: "IDLE"
      }
    ],
    tags: values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  };
}

function cloneConfig(workflowId: string) {
  const target = workflowNodeConfigs.find((config) => config.workflowId === workflowId) ?? workflowNodeConfigs[0];
  if (!target) return null;
  return {
    workflowId,
    nodes: target.nodes.map((node) => ({ ...node, position: { ...node.position }, data: { ...node.data } })),
    edges: target.edges.map((edge) => ({ ...edge }))
  };
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(() => baseWorkflows);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | WorkflowStatus>("ALL");
  const [triggerFilter, setTriggerFilter] = useState<"ALL" | WorkflowTrigger>("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");
  const [modelFilter, setModelFilter] = useState("ALL");
  const [brainFilter, setBrainFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<WorkflowSortOption>("recent");
  const [viewMode, setViewMode] = useState<WorkflowViewMode>("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<null | "create" | "edit" | "run" | "import" | "template" | "delete" | "trigger">(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | undefined>();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const selectedWorkflowId = useWorkflowBuilderStore((state) => state.selectedWorkflowId);
  const setSelectedWorkflowId = useWorkflowBuilderStore((state) => state.setSelectedWorkflowId);
  const setWorkflowGraph = useWorkflowBuilderStore((state) => state.setWorkflow);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const agentOptions = useMemo(() => Array.from(new Set(workflows.map((workflow) => workflow.assignedAgent))), [workflows]);
  const modelOptions = useMemo(() => Array.from(new Set(workflows.map((workflow) => workflow.linkedModel))), [workflows]);
  const brainOptions = useMemo(() => Array.from(new Set(workflows.map((workflow) => workflow.linkedBrain))), [workflows]);

  const filteredWorkflows = useMemo(() => {
    const queried = workflows.filter((workflow) => {
      const matchesSearch =
        !searchValue.trim() ||
        [workflow.name, workflow.description, workflow.assignedAgent, workflow.linkedModel, workflow.linkedBrain, workflow.trigger, workflow.status, workflow.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || workflow.status === statusFilter;
      const matchesTrigger = triggerFilter === "ALL" || workflow.trigger === triggerFilter;
      const matchesAgent = agentFilter === "ALL" || workflow.assignedAgent === agentFilter;
      const matchesModel = modelFilter === "ALL" || workflow.linkedModel === modelFilter;
      const matchesBrain = brainFilter === "ALL" || workflow.linkedBrain === brainFilter;
      return matchesSearch && matchesStatus && matchesTrigger && matchesAgent && matchesModel && matchesBrain;
    });

    return sortWorkflows(queried, sortBy);
  }, [agentFilter, brainFilter, modelFilter, searchValue, sortBy, statusFilter, triggerFilter, workflows]);

  const totalPages = Math.max(1, Math.ceil(filteredWorkflows.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedWorkflows = filteredWorkflows.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const counts = useMemo(() => {
    const total = workflows.length;
    const active = workflows.filter((workflow) => workflow.status === "ACTIVE" || workflow.status === "RUNNING").length;
    const inactive = workflows.filter((workflow) => workflow.status === "INACTIVE").length;
    const completed = workflows.filter((workflow) => workflow.status === "COMPLETED").length;
    const failed = workflows.filter((workflow) => workflow.status === "FAILED").length;
    const drafts = workflows.filter((workflow) => workflow.status === "DRAFT").length;
    return { total, active, inactive, completed, failed, drafts };
  }, [workflows]);

  const triggerBreakdown = useMemo(() => {
    const order: WorkflowTrigger[] = ["Schedule", "Webhook", "Manual", "Event", "API"];
    return order.map((trigger) => ({
      trigger,
      value: workflows.filter((workflow) => workflow.trigger === trigger).length
    }));
  }, [workflows]);

  const topAgentBreakdown = useMemo(
    () =>
      agentOptions
        .map((agent) => ({
          agent,
          value: workflows.filter((workflow) => workflow.assignedAgent === agent).length
        }))
        .sort((a, b) => b.value - a.value),
    [agentOptions, workflows]
  );

  const topAgentMax = useMemo(() => Math.max(1, ...topAgentBreakdown.map((item) => item.value)), [topAgentBreakdown]);

  const activeWorkflow = useMemo(() => {
    return workflows.find((workflow) => workflow.id === selectedWorkflowId) ?? workflows[0];
  }, [selectedWorkflowId, workflows]);

  useEffect(() => {
    const targetId = workflows.some((workflow) => workflow.id === selectedWorkflowId) ? selectedWorkflowId : workflows[0]?.id;
    if (!targetId) return;

    if (targetId !== selectedWorkflowId) {
      setSelectedWorkflowId(targetId);
    }

    const graph = cloneConfig(targetId);
    if (!graph) return;

    setWorkflowGraph(targetId, graph.nodes, graph.edges);
  }, [selectedWorkflowId, setSelectedWorkflowId, setWorkflowGraph, workflows]);

  const openModal = (modal: "create" | "edit" | "run" | "import" | "template" | "delete" | "trigger", workflow?: Workflow) => {
    setSelectedWorkflow(workflow);
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const handleCreateWorkflow = (values: CreateWorkflowInput) => {
    const workflow = buildWorkflowFromInput(values);
    setWorkflows((current) => [workflow, ...current]);
    setSelectedWorkflowId(workflow.id);
    setCurrentPage(1);
    pushToast({ title: "Workflow created", description: `${workflow.name} has been added.`, tone: "success" });
  };

  const handleEditWorkflow = (workflowId: string, updates: Partial<Workflow>) => {
    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              ...updates,
              updatedAt: new Date().toISOString()
            }
          : workflow
      )
    );
    pushToast({ title: "Workflow updated", description: "Workflow settings were saved.", tone: "success" });
  };

  const handleRunWorkflow = (workflowId: string, runMode: "test" | "full") => {
    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              status: "RUNNING",
              runs: workflow.runs + 1,
              lastRun: "just now",
              updatedAt: new Date().toISOString(),
              successRate: runMode === "test" ? workflow.successRate : Math.min(100, workflow.successRate + 1)
            }
          : workflow
      )
    );
    pushToast({
      title: runMode === "test" ? "Test run started" : "Workflow started",
      description: "Execution has been queued in orchestration runtime.",
      tone: "info"
    });
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    const removed = workflows.find((workflow) => workflow.id === workflowId);
    const remaining = workflows.filter((workflow) => workflow.id !== workflowId);
    setWorkflows(remaining);
    if (selectedWorkflowId === workflowId && remaining[0]) {
      setSelectedWorkflowId(remaining[0].id);
    }
    setSelectedWorkflow(undefined);
    pushToast({
      title: "Workflow deleted",
      description: removed ? `${removed.name} was removed.` : "Workflow removed.",
      tone: "warning"
    });
  };

  const handleTriggerConfigSave = (workflowId: string, configSummary: string) => {
    setWorkflows((current) => current.map((workflow) => (workflow.id === workflowId ? { ...workflow, updatedAt: new Date().toISOString() } : workflow)));
    pushToast({ title: "Trigger updated", description: configSummary, tone: "success" });
  };

  const handleImportWorkflow = (source: string, value: string) => {
    pushToast({
      title: "Import queued",
      description: value ? `${source} source captured for import.` : `${source} import initialized.`,
      tone: "info"
    });
  };

  const handleTemplateApply = (template: CreateWorkflowInput) => {
    handleCreateWorkflow(template);
  };

  const handleOpenWorkflow = (workflow: Workflow) => {
    setSelectedWorkflowId(workflow.id);
    pushToast({
      title: "Workflow selected",
      description: `Builder loaded for ${workflow.name}.`,
      tone: "info"
    });
  };

  const handleMenuAction = (workflow: Workflow, action: WorkflowMenuAction) => {
    if (action === "edit") return openModal("edit", workflow);
    if (action === "run") return openModal("run", workflow);
    if (action === "trigger") return openModal("trigger", workflow);
    if (action === "delete") return openModal("delete", workflow);
    if (action === "duplicate") {
      const duplicate: Workflow = {
        ...workflow,
        id: `${workflow.id}-copy-${Date.now().toString(36)}`,
        name: `${workflow.name} Copy`,
        status: "DRAFT",
        runs: 0,
        successRate: 0,
        lastRun: "never",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setWorkflows((current) => [duplicate, ...current]);
      setCurrentPage(1);
      return pushToast({ title: "Workflow duplicated", description: `${duplicate.name} created.`, tone: "success" });
    }
  };

  const handleQuickAction = (key: (typeof quickActions)[number]["key"]) => {
    if (key === "create") return openModal("create");
    if (key === "import") return openModal("import");
    if (key === "templates") return openModal("template");
    if (key === "runs") {
      if (activeWorkflow) return openModal("run", activeWorkflow);
      return;
    }
    pushToast({
      title: "Calendar integration ready",
      description: "Workflow calendar will be connected in backend integration.",
      tone: "info"
    });
  };

  return (
    <DashboardLayout system={systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            actions={
              <ActionButtonGroup>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={() => openModal("create")}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  New Workflow
                </button>
              </ActionButtonGroup>
            }
            subtitle="Design, automate and monitor AI workflows across your agents, models and brains."
            title="Workflows"
          />

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="All workflows" icon={CopyPlus} label="Total Workflows" tone="cyan" value={counts.total} />
            <StatsCard description="Running now" icon={Activity} label="Active" tone="green" value={counts.active} />
            <StatsCard description="Not running" icon={CirclePause} label="Inactive" tone="slate" value={counts.inactive} />
            <StatsCard description="Successfully completed" icon={CheckCircle2} label="Completed" tone="amber" value={counts.completed} />
            <StatsCard description="Errors encountered" icon={ShieldAlert} label="Failed" tone="rose" value={counts.failed} />
            <StatsCard description="In development" icon={Sparkles} label="Drafts" tone="cyan" value={counts.drafts} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              agentFilter={agentFilter}
              agentOptions={agentOptions}
              brainFilter={brainFilter}
              brainOptions={brainOptions}
              modelFilter={modelFilter}
              modelOptions={modelOptions}
              onAgentChange={(value) => {
                setAgentFilter(value);
                setCurrentPage(1);
              }}
              onBrainChange={(value) => {
                setBrainFilter(value);
                setCurrentPage(1);
              }}
              onModelChange={(value) => {
                setModelFilter(value);
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
              onTriggerChange={(value) => {
                setTriggerFilter(value);
                setCurrentPage(1);
              }}
              onViewModeChange={(value) => setViewMode(value)}
              onReset={() => {
                setSearchValue("");
                setStatusFilter("ALL");
                setTriggerFilter("ALL");
                setAgentFilter("ALL");
                setModelFilter("ALL");
                setBrainFilter("ALL");
                setSortBy("recent");
                setCurrentPage(1);
              }}
              searchValue={searchValue}
              sortBy={sortBy}
              statusFilter={statusFilter}
              triggerFilter={triggerFilter}
              viewMode={viewMode}
            />
          </section>

          {viewMode === "table" ? (
            <WorkflowsTable
              currentPage={safeCurrentPage}
              onMenuAction={handleMenuAction}
              onOpen={handleOpenWorkflow}
              onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
              onRun={(workflow) => openModal("run", workflow)}
              pageSize={pageSize}
              totalPages={totalPages}
              totalWorkflows={filteredWorkflows.length}
              workflows={pagedWorkflows}
            />
          ) : (
            <WorkflowGrid onMenuAction={handleMenuAction} onOpen={handleOpenWorkflow} onRun={(workflow) => openModal("run", workflow)} workflows={pagedWorkflows} />
          )}

          <WorkflowBuilder
            onOpenTriggerConfig={() => {
              if (activeWorkflow) openModal("trigger", activeWorkflow);
            }}
            onSave={() => {
              if (!activeWorkflow) return;
              setWorkflows((current) =>
                current.map((workflow) =>
                  workflow.id === activeWorkflow.id
                    ? {
                        ...workflow,
                        updatedAt: new Date().toISOString()
                      }
                    : workflow
                )
              );
              pushToast({ title: "Workflow saved", description: "Canvas changes were saved.", tone: "success" });
            }}
            onTestRun={() => {
              if (!activeWorkflow) return;
              openModal("run", activeWorkflow);
            }}
            workflow={activeWorkflow}
          />
        </main>

        <aside className="space-y-4">
          <WorkflowSidebarPanel title="Workflows Overview">
            <CircularOverviewChart active={counts.active} drafts={counts.drafts} failed={counts.failed} inactive={counts.inactive} total={counts.total} />
          </WorkflowSidebarPanel>

          <WorkflowSidebarPanel title="Trigger Breakdown">
            <div className="space-y-2.5">
              {triggerBreakdown.map((item) => (
                <AgentWorkloadItem
                  barClassName="bg-gradient-to-r from-cyan-500 to-blue-300"
                  key={item.trigger}
                  label={item.trigger}
                  total={Math.max(1, counts.total)}
                  value={item.value}
                />
              ))}
            </div>
          </WorkflowSidebarPanel>

          <WorkflowSidebarPanel title="Top Agents By Workflows">
            <div className="space-y-2.5">
              {topAgentBreakdown.map((item) => (
                <AgentWorkloadItem
                  barClassName="bg-gradient-to-r from-violet-500 to-cyan-300"
                  key={item.agent}
                  label={item.agent}
                  total={topAgentMax}
                  value={item.value}
                />
              ))}
            </div>
          </WorkflowSidebarPanel>

          <WorkflowSidebarPanel title="Quick Actions">
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
          </WorkflowSidebarPanel>
        </aside>
      </div>

      <CreateWorkflowModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        modelOptions={modelOptions}
        onClose={closeModal}
        onCreate={handleCreateWorkflow}
        open={activeModal === "create"}
      />

      <EditWorkflowModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        modelOptions={modelOptions}
        onClose={closeModal}
        onSave={handleEditWorkflow}
        open={activeModal === "edit"}
        workflow={selectedWorkflow}
      />

      <WorkflowRunModal
        onClose={closeModal}
        onRun={handleRunWorkflow}
        open={activeModal === "run"}
        workflow={selectedWorkflow ?? activeWorkflow}
      />

      <ImportWorkflowModal onClose={closeModal} onImport={handleImportWorkflow} open={activeModal === "import"} />

      <WorkflowTemplateModal onApply={handleTemplateApply} onClose={closeModal} open={activeModal === "template"} />

      <DeleteWorkflowModal onClose={closeModal} onDelete={handleDeleteWorkflow} open={activeModal === "delete"} workflow={selectedWorkflow} />

      <TriggerConfigModal onClose={closeModal} onSave={handleTriggerConfigSave} open={activeModal === "trigger"} workflow={selectedWorkflow ?? activeWorkflow} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
