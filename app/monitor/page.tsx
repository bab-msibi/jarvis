"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Clock3,
  Cpu,
  FileDown,
  HardDrive,
  HeartPulse,
  MemoryStick,
  RefreshCw,
  RotateCcw,
  Settings2,
  TerminalSquare,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";

import { AgentPerformanceTable } from "@/components/monitor/agent-performance-table";
import { ClearLogsModal } from "@/components/monitor/clear-logs-modal";
import { ExportReportModal, ExportReportValues } from "@/components/monitor/export-report-modal";
import { HealthCheckModal } from "@/components/monitor/health-check-modal";
import { HealthOverviewChart } from "@/components/monitor/health-overview-chart";
import { IncidentsPanel } from "@/components/monitor/incidents-panel";
import { MonitorSettingsModal, MonitorSettingsValues } from "@/components/monitor/monitor-settings-modal";
import { QuickActionCard } from "@/components/monitor/quick-action-card";
import { ResourceBreakdownPanel } from "@/components/monitor/resource-breakdown-panel";
import { ResolveIncidentModal } from "@/components/monitor/resolve-incident-modal";
import { RestartServiceModal } from "@/components/monitor/restart-service-modal";
import { ServiceAvailabilityPanel } from "@/components/monitor/service-availability-panel";
import { ServiceStatusTable } from "@/components/monitor/service-status-table";
import { SidebarPanel } from "@/components/monitor/sidebar-panel";
import { StatsCard } from "@/components/monitor/stats-card";
import { SystemLogsPanel } from "@/components/monitor/system-logs-panel";
import { SystemMetricCard } from "@/components/monitor/system-metric-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { fetchDataResource } from "@/lib/api-client";
import { monitorData } from "@/lib/data/monitor";
import { systemServices, systemStats } from "@/lib/data/system";
import { useMonitorStore } from "@/lib/store/monitor-store";
import { AgentPerformance, Incident, MonitorLog, MonitorService, MonitorStatus, ServiceStatus, SystemMetric } from "@/types/monitor";
import { RemoteNodeHealth } from "@/types/remote-node";

type NodesHealth = {
  health: RemoteNodeHealth[];
  checkedAt: string;
};

type StorageHealth = {
  storage: {
    source: "DATABASE_URL" | "JARVIS_DATA_DIR" | "default";
    dataDir: string;
    dbPath: string;
    isExternalVolume: boolean;
    status: "online" | "error";
    writable: boolean;
    dbExists: boolean;
    checkedAt: string;
    error?: string;
  };
};

type ModalState = null | "health_check" | "restart_service" | "export_report" | "clear_logs" | "resolve_incident" | "settings";

const serviceAvailabilityByStatus: Record<ServiceStatus, number> = {
  ONLINE: 99,
  DEGRADED: 92,
  OFFLINE: 48,
  RESTARTING: 78
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getMetricStatus(metricId: string, value: number): MonitorStatus {
  if (metricId === "temp") {
    if (value >= 70) return "CRITICAL";
    if (value >= 55) return "WARNING";
    return "HEALTHY";
  }

  if (value >= 85) return "CRITICAL";
  if (value >= 65) return "WARNING";
  return "HEALTHY";
}

function jitterMetricValue(metric: SystemMetric) {
  const variance = Math.round((Math.random() - 0.5) * 6);
  const nextValue = metric.id === "temp" ? clamp(metric.value + variance, 30, 85) : clamp(metric.value + variance, 1, 100);

  return {
    ...metric,
    value: nextValue,
    status: getMetricStatus(metric.id, nextValue),
    history: [...metric.history.slice(1), nextValue],
    updatedAt: "just now"
  };
}

const quickActions = [
  { key: "health", title: "Run Health Check", description: "Run full system diagnostics", icon: HeartPulse },
  { key: "restart", title: "Restart Services", description: "Restart critical infrastructure", icon: RotateCcw },
  { key: "clear", title: "Clear Logs", description: "Clear monitor logs view", icon: Trash2 },
  { key: "export", title: "Export Logs", description: "Export logs and reports", icon: FileDown },
  { key: "terminal", title: "Open Terminal", description: "Open command center terminal", icon: TerminalSquare },
  { key: "settings", title: "Monitor Settings", description: "Configure monitor preferences", icon: Settings2 }
] as const;

export default function MonitorPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<SystemMetric[]>(() => monitorData.metrics);
  const [services, setServices] = useState<MonitorService[]>(() => monitorData.services);
  const [agents, setAgents] = useState<AgentPerformance[]>(() => monitorData.agents);
  const [logs, setLogs] = useState<MonitorLog[]>(() => monitorData.logs);
  const [incidents, setIncidents] = useState<Incident[]>(() => monitorData.incidents);
  const monitorQuery = useQuery({ queryKey: ["data", "monitor"], queryFn: () => fetchDataResource("monitor", monitorData) });
  const systemQuery = useQuery({ queryKey: ["data", "system"], queryFn: () => fetchDataResource("system", { stats: systemStats, services: systemServices }) });
  const nodesQuery = useQuery({
    queryKey: ["health", "nodes"],
    queryFn: async () => {
      const response = await fetch("/api/nodes", { cache: "no-store" });
      if (!response.ok) throw new Error("Remote node check failed");
      return await response.json() as NodesHealth;
    }
  });
  const storageQuery = useQuery({
    queryKey: ["health", "storage"],
    queryFn: async () => {
      const response = await fetch("/api/storage/health", { cache: "no-store" });
      if (!response.ok) throw new Error("Storage health check failed");
      return await response.json() as StorageHealth;
    }
  });
  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (!monitorQuery.data?.data) return;
    queueMicrotask(() => {
      setMetrics(monitorQuery.data.data.metrics);
      setServices(monitorQuery.data.data.services);
      setAgents(monitorQuery.data.data.agents);
      setLogs(monitorQuery.data.data.logs);
      setIncidents(monitorQuery.data.data.incidents);
    });
  }, [monitorQuery.data]);

  const autoRefreshEnabled = useMonitorStore((state) => state.autoRefreshEnabled);
  const setAutoRefreshEnabled = useMonitorStore((state) => state.setAutoRefreshEnabled);
  const selectedServiceId = useMonitorStore((state) => state.selectedServiceId);
  const setSelectedServiceId = useMonitorStore((state) => state.setSelectedServiceId);
  const selectedIncidentId = useMonitorStore((state) => state.selectedIncidentId);
  const setSelectedIncidentId = useMonitorStore((state) => state.setSelectedIncidentId);

  const selectedService = useMemo(() => services.find((service) => service.id === selectedServiceId), [selectedServiceId, services]);
  const remoteNodeHealth = nodesQuery.data?.health ?? [];
  const storage = storageQuery.data?.storage;
  const selectedIncident = useMemo(() => incidents.find((incident) => incident.id === selectedIncidentId), [incidents, selectedIncidentId]);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const openModal = (modal: ModalState) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const stats = useMemo(() => {
    const cpuValue = metrics.find((metric) => metric.id === "cpu")?.value ?? 0;
    const ramValue = metrics.find((metric) => metric.id === "ram")?.value ?? 0;
    const ssdValue = metrics.find((metric) => metric.id === "ssd")?.value ?? 0;
    const activeAlerts = incidents.filter((incident) => incident.status !== "RESOLVED").length;

    const hasCritical = metrics.some((metric) => metric.status === "CRITICAL") || incidents.some((incident) => incident.severity === "CRITICAL" && incident.status !== "RESOLVED");
    const hasWarning = metrics.some((metric) => metric.status === "WARNING") || services.some((service) => service.status === "DEGRADED");

    const systemHealth = hasCritical ? "Critical" : hasWarning ? "Warning" : "Healthy";

    return {
      systemHealth,
      uptime: monitorData.stats.uptime,
      cpuLoad: `${cpuValue}%`,
      ramUsage: `${ramValue}%`,
      ssdUsage: `${ssdValue}%`,
      activeAlerts
    };
  }, [incidents, metrics, services]);

  const healthOverview = useMemo(() => {
    const healthy = metrics.filter((metric) => metric.status === "HEALTHY").length + services.filter((service) => service.status === "ONLINE").length;
    const warning = metrics.filter((metric) => metric.status === "WARNING").length + services.filter((service) => service.status === "DEGRADED").length;
    const critical =
      metrics.filter((metric) => metric.status === "CRITICAL").length +
      services.filter((service) => service.status === "OFFLINE").length +
      incidents.filter((incident) => (incident.severity === "HIGH" || incident.severity === "CRITICAL") && incident.status !== "RESOLVED").length;
    const offline = metrics.filter((metric) => metric.status === "OFFLINE").length + services.filter((service) => service.status === "OFFLINE").length;

    return [
      { label: "Healthy", value: healthy, color: "#22c55e" },
      { label: "Warning", value: warning, color: "#f59e0b" },
      { label: "Critical", value: critical, color: "#ef4444" },
      { label: "Offline", value: offline, color: "#64748b" }
    ];
  }, [incidents, metrics, services]);

  const resourceBreakdown = useMemo(
    () => [
      { label: "CPU", value: metrics.find((metric) => metric.id === "cpu")?.value ?? 0 },
      { label: "RAM", value: metrics.find((metric) => metric.id === "ram")?.value ?? 0 },
      { label: "SSD", value: metrics.find((metric) => metric.id === "ssd")?.value ?? 0 },
      { label: "GPU", value: metrics.find((metric) => metric.id === "gpu")?.value ?? 0 },
      { label: "Network", value: metrics.find((metric) => metric.id === "network")?.value ?? 0 },
      { label: "Temperature", value: metrics.find((metric) => metric.id === "temp")?.value ?? 0 }
    ],
    [metrics]
  );

  const serviceAvailability = useMemo(
    () => services.map((service) => ({ label: service.name, value: serviceAvailabilityByStatus[service.status] })),
    [services]
  );

  const handleRefresh = () => {
    // TODO(backend): replace this mocked refresh with a secure monitor API poll endpoint.
    setMetrics((current) => current.map(jitterMetricValue));
    setServices((current) => current.map((service) => ({ ...service, lastHeartbeat: `${Math.max(3, Math.round(Math.random() * 12))}s ago` })));
    setLogs((current) => [
      {
        id: `log-${Date.now().toString(36)}`,
        level: "INFO",
        message: "Manual refresh completed for monitor dashboard",
        source: "System Monitor",
        timestamp: "just now"
      },
      ...current.slice(0, 19)
    ]);
    pushToast({ title: "Monitor refreshed", description: "Latest metrics and heartbeats were refreshed.", tone: "success" });
  };

  const handleRunHealthCheck = (scope: "quick" | "full") => {
    // TODO(backend): connect to signed health-check endpoint with approval + audit trail.
    setMetrics((current) => current.map(jitterMetricValue));
    setLogs((current) => [
      {
        id: `log-${Date.now().toString(36)}`,
        level: "SUCCESS",
        message: `${scope === "full" ? "Full" : "Quick"} health check completed`,
        source: "Health Checker",
        timestamp: "just now"
      },
      ...current.slice(0, 19)
    ]);
    pushToast({
      title: "Health check complete",
      description: scope === "full" ? "Full diagnostics finished successfully." : "Quick diagnostics finished successfully.",
      tone: "success"
    });
  };

  const handleRestartService = (serviceId: string) => {
    // TODO(backend): invoke secure service restart API with command allowlist and approval checks.
    setServices((current) => current.map((service) => (service.id === serviceId ? { ...service, status: "RESTARTING", uptime: "just now" } : service)));
    pushToast({ title: "Restart queued", description: "Service restart is in progress (mock).", tone: "info" });

    window.setTimeout(() => {
      setServices((current) =>
        current.map((service) =>
          service.id === serviceId
            ? {
                ...service,
                status: "ONLINE",
                uptime: "just now",
                lastHeartbeat: "3s ago",
                errorCount: Math.max(0, service.errorCount - 1)
              }
            : service
        )
      );
      setLogs((current) => [
        {
          id: `log-${Date.now().toString(36)}`,
          level: "SUCCESS",
          message: "Service restarted successfully",
          source: "Service Manager",
          timestamp: "just now"
        },
        ...current.slice(0, 19)
      ]);
      pushToast({ title: "Service online", description: "Selected service restarted successfully.", tone: "success" });
    }, 1200);
  };

  const handleResolveIncident = (incidentId: string, resolution: string) => {
    setIncidents((current) => current.map((incident) => (incident.id === incidentId ? { ...incident, status: "RESOLVED" } : incident)));
    setLogs((current) => [
      {
        id: `log-${Date.now().toString(36)}`,
        level: "SUCCESS",
        message: resolution ? `Incident resolved: ${resolution}` : "Incident resolved by operator",
        source: "Incident Manager",
        timestamp: "just now"
      },
      ...current.slice(0, 19)
    ]);
    pushToast({ title: "Incident resolved", description: "Alert moved to resolved state.", tone: "success" });
  };

  const handleClearLogs = () => {
    setLogs([]);
    pushToast({ title: "Logs cleared", description: "System logs were cleared from monitor view.", tone: "warning" });
  };

  const handleExportReport = (values: ExportReportValues) => {
    // TODO(backend): generate and download signed report artifacts from monitoring service.
    pushToast({
      title: "Report export queued",
      description: `Format: ${values.format.toUpperCase()}${values.includeLogs ? " with logs" : ""}.`,
      tone: "info"
    });
  };

  const handleSaveSettings = (values: MonitorSettingsValues) => {
    setAutoRefreshEnabled(values.autoRefreshEnabled);
    pushToast({
      title: "Monitor settings saved",
      description: `Polling every ${values.pollIntervalSeconds}s with CPU alert threshold ${values.cpuAlertThreshold}%.`,
      tone: "success"
    });
  };

  const handleViewAgent = (agentPerformance: AgentPerformance) => {
    setLogs((current) => [
      {
        id: `log-${Date.now().toString(36)}`,
        level: "INFO",
        message: `Opened performance profile for ${agentPerformance.agent}`,
        source: "Agent Monitor",
        timestamp: "just now"
      },
      ...current.slice(0, 19)
    ]);
    pushToast({ title: "Agent profile opened", description: `${agentPerformance.agent} details loaded.`, tone: "info" });
  };

  const handleQuickAction = (action: (typeof quickActions)[number]["key"]) => {
    if (action === "health") return openModal("health_check");
    if (action === "clear") return openModal("clear_logs");
    if (action === "export") return openModal("export_report");
    if (action === "settings") return openModal("settings");

    if (action === "restart") {
      const preferred = services.find((service) => service.status === "DEGRADED" || service.status === "OFFLINE") ?? services[0];
      if (!preferred) return;
      setSelectedServiceId(preferred.id);
      return openModal("restart_service");
    }

    router.push("/terminal");
  };

  const systemHealthTone = stats.systemHealth === "Critical" ? "rose" : stats.systemHealth === "Warning" ? "amber" : "green";

  return (
    <DashboardLayout system={systemQuery.data?.data.stats ?? systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            actions={
              <ActionButtonGroup>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={() => openModal("health_check")}
                  type="button"
                >
                  <HeartPulse className="h-4 w-4" />
                  Run Health Check
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={() => openModal("export_report")}
                  type="button"
                >
                  <FileDown className="h-4 w-4" />
                  Export Report
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={handleRefresh}
                  type="button"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </ActionButtonGroup>
            }
            subtitle="Track system health, AI services, agent performance and infrastructure status."
            title="Monitor"
          />

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="Overall system state" icon={HeartPulse} label="System Health" tone={systemHealthTone} value={stats.systemHealth} />
            <StatsCard description="Host uptime" icon={Clock3} label="Uptime" tone="cyan" value={stats.uptime} />
            <StatsCard description="Current CPU pressure" icon={Cpu} label="CPU Load" tone="amber" value={stats.cpuLoad} />
            <StatsCard description="Current memory pressure" icon={MemoryStick} label="RAM Usage" tone="cyan" value={stats.ramUsage} />
            <StatsCard description="Storage usage now" icon={HardDrive} label="SSD Usage" tone="slate" value={stats.ssdUsage} />
            <StatsCard description="Open incidents now" icon={AlertTriangle} label="Active Alerts" tone="rose" value={stats.activeAlerts} />
          </section>

          <section className="panel-base rounded-2xl p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg text-cyan-200">Live System Metrics</h2>
              <p className="text-xs text-cyan-600">Live stream (mocked)</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {metrics.map((metric) => (
                <SystemMetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </section>

          <ServiceStatusTable
            onRestart={(service) => {
              setSelectedServiceId(service.id);
              openModal("restart_service");
            }}
            services={services}
          />

          <AgentPerformanceTable agents={agents} onView={handleViewAgent} />

          <section className="grid gap-4 xl:grid-cols-2">
            <SystemLogsPanel logs={logs} onClear={() => openModal("clear_logs")} />
            <IncidentsPanel
              incidents={incidents}
              onResolve={(incident) => {
                setSelectedIncidentId(incident.id);
                openModal("resolve_incident");
              }}
            />
          </section>
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Health Overview">
            <HealthOverviewChart slices={healthOverview} />
          </SidebarPanel>

          <SidebarPanel title="Resource Breakdown">
            <ResourceBreakdownPanel entries={resourceBreakdown} />
          </SidebarPanel>

          <SidebarPanel title="Service Availability">
            <ServiceAvailabilityPanel entries={serviceAvailability} />
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

          <SidebarPanel title="Remote Nodes">
            <div className="space-y-2 text-sm">
              {remoteNodeHealth.length ? remoteNodeHealth.map((item) => (
                <div className="rounded-lg border border-cyan-900/35 bg-sky-950/35 p-3" key={item.node.id}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-cyan-100">{item.node.name}</span>
                    <span className={item.connected ? "text-emerald-300" : "text-rose-300"}>{item.connected ? "online" : "offline"}</span>
                  </div>
                  <p className="mt-1 text-xs text-cyan-600">{item.node.role} · {item.latencyMs ?? "—"}ms</p>
                  <p className="mt-1 break-all text-xs text-cyan-500">{item.node.baseUrl}</p>
                </div>
              )) : <p className="text-cyan-600">No remote nodes configured yet.</p>}
            </div>
          </SidebarPanel>

          <SidebarPanel title="JARVIS Storage">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-cyan-500">Status</span>
                <span className={storage?.status === "online" ? "text-emerald-300" : "text-amber-300"}>
                  {storage ? (storage.writable ? "Writable" : "Needs attention") : "Checking..."}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-cyan-500">Source</span>
                <span className="text-cyan-200">{storage?.source ?? "loading"}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-cyan-500">External SSD</span>
                <span className={storage?.isExternalVolume ? "text-emerald-300" : "text-cyan-300"}>{storage?.isExternalVolume ? "Enabled" : "Local for now"}</span>
              </div>
              <p className="break-all rounded-lg border border-cyan-900/35 bg-sky-950/35 p-2 text-xs text-cyan-500">
                {storage?.dbPath ?? "Resolving database path..."}
              </p>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Auto Refresh">
            <div className="flex items-center justify-between gap-2 text-sm">
              <div>
                <p className="text-cyan-100">Realtime polling</p>
                <p className="text-xs text-cyan-600">Frontend mock refresh mode</p>
              </div>
              <button
                aria-label="Toggle auto refresh"
                className={`h-5 w-10 rounded-full border transition ${
                  autoRefreshEnabled ? "border-emerald-400/50 bg-emerald-500/20" : "border-cyan-900/45 bg-sky-950/50"
                }`}
                onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                type="button"
              >
                <span
                  className={`block h-4 w-4 rounded-full transition ${
                    autoRefreshEnabled ? "translate-x-[18px] bg-emerald-300" : "translate-x-[2px] bg-cyan-500"
                  }`}
                />
              </button>
            </div>
          </SidebarPanel>
        </aside>
      </div>

      <HealthCheckModal onClose={closeModal} onRun={handleRunHealthCheck} open={activeModal === "health_check"} />

      <RestartServiceModal onClose={closeModal} onRestart={handleRestartService} open={activeModal === "restart_service"} service={selectedService} />

      <ExportReportModal onClose={closeModal} onExport={handleExportReport} open={activeModal === "export_report"} />

      <ClearLogsModal logsCount={logs.length} onClose={closeModal} onConfirm={handleClearLogs} open={activeModal === "clear_logs"} />

      <ResolveIncidentModal incident={selectedIncident} onClose={closeModal} onResolve={handleResolveIncident} open={activeModal === "resolve_incident"} />

      <MonitorSettingsModal autoRefreshEnabled={autoRefreshEnabled} onClose={closeModal} onSave={handleSaveSettings} open={activeModal === "settings"} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
