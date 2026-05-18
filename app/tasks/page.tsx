"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Briefcase,
  CalendarClock,
  CirclePause,
  Database,
  Download,
  Plus,
  ShieldAlert,
  SquareCheckBig
} from "lucide-react";

import { AgentWorkloadItem } from "@/components/tasks/agent-workload-item";
import { AssignTaskModal } from "@/components/tasks/assign-task-modal";
import { CircularOverviewChart } from "@/components/tasks/circular-overview-chart";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { DeleteTaskModal } from "@/components/tasks/delete-task-modal";
import { EditTaskModal } from "@/components/tasks/edit-task-modal";
import { ImportTasksModal } from "@/components/tasks/import-tasks-modal";
import { QuickActionCard } from "@/components/tasks/quick-action-card";
import { SearchToolbar, TaskSortOption, TaskViewMode } from "@/components/tasks/search-toolbar";
import { SidebarPanel } from "@/components/tasks/sidebar-panel";
import { StatsCard } from "@/components/tasks/stats-card";
import { TaskBoard } from "@/components/tasks/task-board";
import { TaskDetailsDrawer } from "@/components/tasks/task-details-drawer";
import { TaskMenuAction } from "@/components/tasks/task-action-menu";
import { TaskTemplateModal } from "@/components/tasks/task-template-modal";
import { TasksTable } from "@/components/tasks/tasks-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { fetchDataResource } from "@/lib/api-client";
import { agents } from "@/lib/data/agents";
import { brains } from "@/lib/data/brains";
import { models } from "@/lib/data/models";
import { systemServices, systemStats } from "@/lib/data/system";
import { tasks as baseTasks } from "@/lib/data/tasks";
import { Task, TaskPriority, TaskStatus } from "@/types/task";

const pageSize = 10;

const priorityWeight: Record<TaskPriority, number> = {
  HIGH: 4,
  MEDIUM: 3,
  LOW: 2,
  NONE: 1
};

const quickActions = [
  { key: "create", title: "Create New Task", description: "Upcoming: create a managed task", icon: Plus, upcoming: true },
  { key: "assign", title: "Assign Task", description: "Upcoming: assign to an AI agent", icon: Briefcase, upcoming: true },
  { key: "import", title: "Import Tasks", description: "Upcoming: import from file/CSV", icon: Download, upcoming: true },
  { key: "templates", title: "Task Templates", description: "Upcoming: use prebuilt templates", icon: SquareCheckBig, upcoming: true },
  { key: "calendar", title: "Task Calendar", description: "Upcoming: calendar view", icon: CalendarClock, upcoming: true }
] as const;

function sortTasks(tasks: Task[], sortBy: TaskSortOption) {
  const sorted = [...tasks];

  if (sortBy === "recent") {
    sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return sorted;
  }

  if (sortBy === "oldest") {
    sorted.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    return sorted;
  }

  if (sortBy === "priority") {
    sorted.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    return sorted;
  }

  if (sortBy === "progress_desc") {
    sorted.sort((a, b) => b.progress - a.progress);
    return sorted;
  }

  const parseEtaToMinutes = (eta: string) => {
    if (/done/i.test(eta)) return 0;
    const hours = Number(eta.match(/(\d+)\s*h/)?.[1] ?? 0);
    const minutes = Number(eta.match(/(\d+)\s*m/)?.[1] ?? 0);
    return hours * 60 + minutes;
  };

  sorted.sort((a, b) => parseEtaToMinutes(a.eta) - parseEtaToMinutes(b.eta));
  return sorted;
}

function isWithinDateRange(createdAt: string, startDate: string, endDate: string) {
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return false;

  if (startDate) {
    const start = new Date(startDate);
    if (created < start) return false;
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    if (created > end) return false;
  }

  return true;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(() => baseTasks);
  const tasksQuery = useQuery({ queryKey: ["data", "tasks"], queryFn: () => fetchDataResource("tasks", baseTasks) });
  const agentsQuery = useQuery({ queryKey: ["data", "agents"], queryFn: () => fetchDataResource("agents", agents) });
  const modelsQuery = useQuery({ queryKey: ["data", "models"], queryFn: () => fetchDataResource("models", models) });
  const brainsQuery = useQuery({ queryKey: ["data", "brains"], queryFn: () => fetchDataResource("brains", brains) });
  const systemQuery = useQuery({ queryKey: ["data", "system"], queryFn: () => fetchDataResource("system", { stats: systemStats, services: systemServices }) });
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TaskStatus>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<"ALL" | TaskPriority>("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");
  const [modelFilter, setModelFilter] = useState("ALL");
  const [brainFilter, setBrainFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState<TaskSortOption>("recent");
  const [viewMode, setViewMode] = useState<TaskViewMode>("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "create" | "edit" | "assign" | "delete" | "import" | "template">(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (tasksQuery.data?.data) queueMicrotask(() => setTasks(tasksQuery.data.data));
  }, [tasksQuery.data]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const agentOptions = useMemo(() => (agentsQuery.data?.data ?? agents).map((agent) => agent.name), [agentsQuery.data]);
  const modelOptions = useMemo(() => (modelsQuery.data?.data ?? models).map((model) => model.name), [modelsQuery.data]);
  const brainOptions = useMemo(() => (brainsQuery.data?.data ?? brains).map((brain) => brain.name), [brainsQuery.data]);

  const filteredTasks = useMemo(() => {
    const queried = tasks.filter((task) => {
      const matchesSearch =
        !searchValue.trim() ||
        [task.name, task.description, task.assignedAgent, task.linkedModel, task.linkedBrain, task.status, task.priority, task.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "ALL" || task.priority === priorityFilter;
      const matchesAgent = agentFilter === "ALL" || task.assignedAgent === agentFilter;
      const matchesModel = modelFilter === "ALL" || task.linkedModel === modelFilter;
      const matchesBrain = brainFilter === "ALL" || task.linkedBrain === brainFilter;
      const matchesDate = isWithinDateRange(task.createdAt, startDate, endDate);
      return matchesSearch && matchesStatus && matchesPriority && matchesAgent && matchesModel && matchesBrain && matchesDate;
    });

    return sortTasks(queried, sortBy);
  }, [agentFilter, brainFilter, endDate, modelFilter, priorityFilter, searchValue, sortBy, startDate, statusFilter, tasks]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedTasks = filteredTasks.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const counts = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((task) => task.status === "IN PROGRESS").length;
    const completed = tasks.filter((task) => task.status === "COMPLETED").length;
    const onHold = tasks.filter((task) => task.status === "ON HOLD").length;
    const failed = tasks.filter((task) => task.status === "FAILED").length;
    const backlog = tasks.filter((task) => task.status === "NOT STARTED").length;
    return { total, inProgress, completed, onHold, failed, backlog };
  }, [tasks]);

  const priorityBreakdown = useMemo(
    () => [
      { label: "High", value: tasks.filter((task) => task.priority === "HIGH").length, barClassName: "from-rose-500 to-rose-300" },
      { label: "Medium", value: tasks.filter((task) => task.priority === "MEDIUM").length, barClassName: "from-amber-500 to-amber-300" },
      { label: "Low", value: tasks.filter((task) => task.priority === "LOW").length, barClassName: "from-emerald-500 to-emerald-300" },
      { label: "None", value: tasks.filter((task) => task.priority === "NONE").length, barClassName: "from-slate-500 to-slate-300" }
    ],
    [tasks]
  );

  const agentWorkload = useMemo(() => {
    return agentOptions.map((agent) => ({
      label: agent,
      value: tasks.filter((task) => task.assignedAgent === agent && task.status !== "COMPLETED").length
    }));
  }, [agentOptions, tasks]);

  const agentWorkloadMax = useMemo(() => Math.max(1, ...agentWorkload.map((entry) => entry.value)), [agentWorkload]);

  const showUpcoming = useCallback((description: string, tone: ToastItem["tone"] = "info") => {
    pushToast({ title: "Upcoming feature", description, tone });
  }, [pushToast]);

  const openModal = (modal: "create" | "edit" | "assign" | "delete" | "import" | "template", task?: Task) => {
    setSelectedTask(task);
    const labels = {
      create: "Creating JARVIS tasks will be enabled after a safe task-run API is added.",
      edit: "Editing live OpenClaw task history is not supported yet.",
      assign: "Assigning tasks to agents will be enabled after approval-gated execution is wired in.",
      delete: "Deleting task history is blocked until safe cleanup controls are implemented.",
      import: "Task imports will be enabled after persistent task storage is configured.",
      template: "Task templates will be connected after managed task creation is implemented."
    } as const;
    showUpcoming(labels[modal], modal === "delete" ? "warning" : "info");
  };

  const closeModal = () => setActiveModal(null);

  const openDrawer = (task: Task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleCreateTask = () => {
    showUpcoming("Creating JARVIS tasks will be enabled after a safe task-run API is added.");
  };

  const handleEditTask = () => {
    showUpcoming("Editing live OpenClaw task history is not supported yet.");
  };

  const handleAssignTask = () => {
    showUpcoming("Assigning tasks to agents will be enabled after approval-gated execution is wired in.");
  };

  const handleDeleteTask = () => {
    showUpcoming("Deleting task history is blocked until safe cleanup controls are implemented.", "warning");
  };

  const handleImportTasks = () => {
    showUpcoming("Task imports will be enabled after persistent task storage is configured.");
  };

  const handleTemplateApply = () => {
    showUpcoming("Task templates will be connected after managed task creation is implemented.");
  };

  const handleTaskMenuAction = (task: Task, action: TaskMenuAction) => {
    if (action === "details") return openDrawer(task);
    if (action === "edit") return openModal("edit", task);
    if (action === "assign") return openModal("assign", task);
    if (action === "delete") return openModal("delete", task);
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "create") return openModal("create");
    if (action === "assign") return openModal("assign", tasks[0]);
    if (action === "import") return openModal("import");
    if (action === "templates") return openModal("template");
    return showUpcoming("Task calendar will be connected after live scheduling support is added.");
  };

  const taskTable = (
    <TasksTable
      currentPage={safeCurrentPage}
      onMenuAction={handleTaskMenuAction}
      onOpenDetails={openDrawer}
      onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
      pageSize={pageSize}
      tasks={pagedTasks}
      totalPages={totalPages}
      totalTasks={filteredTasks.length}
    />
  );

  const taskBoard = <TaskBoard onMenuAction={handleTaskMenuAction} onOpenDetails={openDrawer} tasks={filteredTasks} />;

  return (
    <DashboardLayout system={systemQuery.data?.data.stats ?? systemStats}>
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
                  New Task
                  <span className="rounded-full border border-amber-400/30 px-1.5 py-0.5 text-[10px] uppercase text-amber-200">Upcoming</span>
                </button>
              </ActionButtonGroup>
            }
            subtitle="Live OpenClaw task runs from this Mac. Management controls marked Upcoming are intentionally not active yet."
            title="Tasks"
          />

          <section className="rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Live mode is enabled: dummy tasks were removed. This page now reflects real OpenClaw task runs and history from the local runtime.
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="All tasks" icon={Database} label="Total Tasks" tone="cyan" value={counts.total} />
            <StatsCard description="Currently running" icon={Activity} label="In Progress" tone="green" value={counts.inProgress} />
            <StatsCard description="Successfully done" icon={SquareCheckBig} label="Completed" tone="amber" value={counts.completed} />
            <StatsCard description="Waiting / Paused" icon={CirclePause} label="On Hold" tone="slate" value={counts.onHold} />
            <StatsCard description="Need attention" icon={ShieldAlert} label="Failed" tone="rose" value={counts.failed} />
            <StatsCard description="Not started" icon={Briefcase} label="Backlog" tone="cyan" value={counts.backlog} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <SearchToolbar
              agentFilter={agentFilter}
              agentOptions={agentOptions}
              brainFilter={brainFilter}
              brainOptions={brainOptions}
              endDate={endDate}
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
              onEndDateChange={(value) => {
                setEndDate(value);
                setCurrentPage(1);
              }}
              onModelChange={(value) => {
                setModelFilter(value);
                setCurrentPage(1);
              }}
              onPriorityChange={(value) => {
                setPriorityFilter(value);
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
              onStartDateChange={(value) => {
                setStartDate(value);
                setCurrentPage(1);
              }}
              onStatusChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              onViewModeChange={(value) => setViewMode(value)}
              onReset={() => {
                setSearchValue("");
                setStatusFilter("ALL");
                setPriorityFilter("ALL");
                setAgentFilter("ALL");
                setModelFilter("ALL");
                setBrainFilter("ALL");
                setStartDate("");
                setEndDate("");
                setSortBy("recent");
                setCurrentPage(1);
              }}
              priorityFilter={priorityFilter}
              searchValue={searchValue}
              sortBy={sortBy}
              startDate={startDate}
              statusFilter={statusFilter}
              viewMode={viewMode}
            />
          </section>

          {viewMode === "table" ? (
            <>
              {taskTable}
              {taskBoard}
            </>
          ) : (
            <>
              {taskBoard}
              {taskTable}
            </>
          )}
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Tasks Overview">
            <CircularOverviewChart
              backlog={counts.backlog}
              completed={counts.completed}
              failed={counts.failed}
              inProgress={counts.inProgress}
              onHold={counts.onHold}
              total={counts.total}
            />
          </SidebarPanel>

          <SidebarPanel title="Priority Breakdown">
            <div className="space-y-2.5">
              {priorityBreakdown.map((item) => (
                <AgentWorkloadItem
                  barClassName={`bg-gradient-to-r ${item.barClassName}`}
                  key={item.label}
                  label={item.label}
                  total={Math.max(1, counts.total)}
                  value={item.value}
                />
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Agent Workload">
            <div className="space-y-2.5">
              {agentWorkload.map((item) => (
                <AgentWorkloadItem key={item.label} label={item.label} total={agentWorkloadMax} value={item.value} />
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

      <CreateTaskModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        modelOptions={modelOptions}
        onClose={closeModal}
        onCreate={handleCreateTask}
        open={activeModal === "create"}
      />

      <EditTaskModal
        agentOptions={agentOptions}
        brainOptions={brainOptions}
        modelOptions={modelOptions}
        onClose={closeModal}
        onSave={handleEditTask}
        open={activeModal === "edit"}
        task={selectedTask}
      />

      <AssignTaskModal
        agentOptions={agentOptions}
        onAssign={handleAssignTask}
        onClose={closeModal}
        open={activeModal === "assign"}
        task={selectedTask}
      />

      <DeleteTaskModal onClose={closeModal} onDelete={handleDeleteTask} open={activeModal === "delete"} task={selectedTask} />

      <ImportTasksModal onClose={closeModal} onImport={handleImportTasks} open={activeModal === "import"} />

      <TaskTemplateModal onApply={handleTemplateApply} onClose={closeModal} open={activeModal === "template"} />

      <TaskDetailsDrawer
        onAssign={(task) => openModal("assign", task)}
        onClose={closeDrawer}
        onDelete={(task) => openModal("delete", task)}
        onEdit={(task) => openModal("edit", task)}
        open={drawerOpen}
        task={selectedTask}
      />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
