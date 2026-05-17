"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  Clock3,
  Command,
  Plus,
  RotateCcw,
  ServerCog,
  TerminalSquare,
  Trash2
} from "lucide-react";

import { ClearLogsModal } from "@/components/terminal/clear-logs-modal";
import { CommandHistory } from "@/components/terminal/command-history";
import { ConfirmCommandModal } from "@/components/terminal/confirm-command-modal";
import { KillSessionModal } from "@/components/terminal/kill-session-modal";
import { NewSessionInput, NewSessionModal } from "@/components/terminal/new-session-modal";
import { QuickCommandCard } from "@/components/terminal/quick-command-card";
import { ResourceUsagePanel } from "@/components/terminal/resource-usage-panel";
import { RunCommandInput, RunCommandModal } from "@/components/terminal/run-command-modal";
import { SecurityNotice } from "@/components/terminal/security-notice";
import { ServiceRestartModal } from "@/components/terminal/service-restart-modal";
import { ServiceStatusCard } from "@/components/terminal/service-status-card";
import { SessionTable } from "@/components/terminal/session-table";
import { SidebarPanel } from "@/components/terminal/sidebar-panel";
import { StatsCard } from "@/components/terminal/stats-card";
import { TerminalWindow } from "@/components/terminal/terminal-window";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActionButtonGroup } from "@/components/shared/action-button-group";
import { PageHeader } from "@/components/shared/page-header";
import { ToastItem, ToastStack } from "@/components/ui/toast-stack";
import { fetchDataResource } from "@/lib/api-client";
import { terminalData } from "@/lib/data/terminal";
import { systemServices, systemStats } from "@/lib/data/system";
import { useTerminalStore } from "@/lib/store/terminal-store";
import { TerminalCommandHistoryItem, TerminalService, TerminalSession, TerminalSessionStatus } from "@/types/terminal";

type ModalState = null | "new_session" | "run_command" | "confirm_command" | "clear_logs" | "kill_session" | "service_restart";

type PendingCommand = {
  sessionId: string;
  command: string;
};

function nowLabel() {
  return "just now";
}

function normalizeCommand(input: string) {
  return input.trim();
}

export default function TerminalPage() {
  const [sessions, setSessions] = useState<TerminalSession[]>(() => terminalData.sessions);
  const [services, setServices] = useState<TerminalService[]>(() => terminalData.services);
  const [commandHistory, setCommandHistory] = useState<TerminalCommandHistoryItem[]>(() => terminalData.commandHistory);
  const terminalQuery = useQuery({ queryKey: ["data", "terminal"], queryFn: () => fetchDataResource("terminal", terminalData) });
  const systemQuery = useQuery({ queryKey: ["data", "system"], queryFn: () => fetchDataResource("system", { stats: systemStats, services: systemServices }) });
  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [pendingCommand, setPendingCommand] = useState<PendingCommand | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (!terminalQuery.data?.data) return;
    queueMicrotask(() => {
      setSessions(terminalQuery.data.data.sessions);
      setServices(terminalQuery.data.data.services);
      setCommandHistory(terminalQuery.data.data.commandHistory);
    });
  }, [terminalQuery.data]);

  const liveTerminalData = terminalQuery.data?.data ?? terminalData;

  const activeSessionId = useTerminalStore((state) => state.activeSessionId);
  const setActiveSessionId = useTerminalStore((state) => state.setActiveSessionId);
  const commandInput = useTerminalStore((state) => state.commandInput);
  const setCommandInput = useTerminalStore((state) => state.setCommandInput);
  const selectedSessionId = useTerminalStore((state) => state.selectedSessionId);
  const setSelectedSessionId = useTerminalStore((state) => state.setSelectedSessionId);

  const effectiveActiveSessionId = activeSessionId ?? sessions[0]?.id ?? "";
  const activeSession = sessions.find((session) => session.id === effectiveActiveSessionId) ?? sessions[0];
  const selectedSession = sessions.find((session) => session.id === selectedSessionId);
  const selectedService = services.find((service) => service.id === selectedServiceId);

  const pushToast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const stats = useMemo(() => {
    const activeSessions = sessions.filter((session) => session.status !== "STOPPED" && session.status !== "ERROR").length;
    const runningProcesses = sessions.filter((session) => session.status === "RUNNING" || session.status === "ONLINE").length * 5 + 2;
    const aiServices = services.filter((service) => service.status === "ONLINE" || service.status === "DEGRADED").length;
    const failedCommands = commandHistory.filter((item) => item.status === "FAILED" || item.status === "BLOCKED").length;

    return {
      activeSessions,
      runningProcesses,
      aiServices,
      commandsToday: commandHistory.length,
      failedCommands,
      systemUptime: liveTerminalData.stats.systemUptime
    };
  }, [commandHistory, liveTerminalData.stats.systemUptime, services, sessions]);

  const openModal = (modal: ModalState) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const executeBackendConfirmedCommand = useCallback(() => {
    if (!pendingCommand) return;

    const command = normalizeCommand(pendingCommand.command);
    const session = sessions.find((item) => item.id === pendingCommand.sessionId);
    if (!command || !session) return;

    fetch("/api/terminal/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, confirmed: true, sessionId: session.id, sessionName: session.name })
    })
      .then(async (response) => {
        const result = await response.json() as { historyItem: TerminalCommandHistoryItem; output: string; allowed: boolean; reason?: string };
        const blocked = !result.allowed;
        const failed = result.historyItem.status === "FAILED";

        setCommandHistory((current) => [result.historyItem, ...current]);
        setSessions((current) =>
          current.map((item) => {
            if (item.id !== session.id) return item;

            const nextStatus: TerminalSessionStatus = blocked ? "ERROR" : failed ? "ERROR" : "RUNNING";
            return {
              ...item,
              currentCommand: command,
              status: nextStatus,
              cpuUsage: Math.min(100, Math.max(item.cpuUsage, failed ? item.cpuUsage : item.cpuUsage + 2)),
              ramUsage: Math.min(100, Math.max(item.ramUsage, failed ? item.ramUsage : item.ramUsage + 1)),
              logs: [...item.logs, `$ ${command}`, result.output]
            };
          })
        );

        if (blocked) {
          pushToast({ title: "Command blocked", description: result.reason ?? "Backend policy blocked this command.", tone: "warning" });
        } else if (failed) {
          pushToast({ title: "Command failed", description: "Backend execution returned a failure state.", tone: "error" });
        } else {
          pushToast({ title: "Command accepted", description: `Backend confirmed safe command for ${session.name}.`, tone: "success" });
        }
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown terminal backend error";
        pushToast({ title: "Terminal backend failed", description: message, tone: "error" });
      })
      .finally(() => {
        setPendingCommand(null);
        setCommandInput("");
        setActiveSessionId(session.id);
      });
  }, [pendingCommand, sessions, setCommandInput, setActiveSessionId, pushToast]);

  const handleRunFromInput = () => {
    if (!activeSession) return;
    const command = normalizeCommand(commandInput);
    if (!command) return;
    setPendingCommand({ sessionId: activeSession.id, command });
    openModal("confirm_command");
  };

  const handleRunFromModal = (values: RunCommandInput) => {
    setPendingCommand({ sessionId: values.sessionId, command: values.command });
    openModal("confirm_command");
  };

  const handleCreateSession = (values: NewSessionInput) => {
    const createdSession: TerminalSession = {
      id: `session-${Date.now().toString(36)}`,
      name: values.name,
      type: values.type,
      agent: values.agent,
      currentCommand: "idle",
      status: "IDLE",
      cpuUsage: 2,
      ramUsage: 4,
      startedAt: nowLabel(),
      cwd: values.cwd,
      logs: ["JARVIS Terminal initialized", `Session created for ${values.agent}`, `Working directory set: ${values.cwd}`]
    };

    setSessions((current) => [createdSession, ...current]);
    setActiveSessionId(createdSession.id);
    pushToast({ title: "Session created", description: `${values.name} is ready.`, tone: "success" });
  };

  const handleClearLogs = () => {
    if (!activeSession) return;
    setSessions((current) =>
      current.map((session) => (session.id === activeSession.id ? { ...session, logs: ["Logs cleared by operator", "Session remains active in mock mode"] } : session))
    );
    pushToast({ title: "Logs cleared", description: `${activeSession.name} logs were reset.`, tone: "info" });
  };

  const handleKillSession = (sessionId: string) => {
    setSessions((current) =>
      current.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              status: "STOPPED",
              currentCommand: "terminated",
              logs: [...session.logs, "Session terminated by operator"]
            }
          : session
      )
    );
    pushToast({ title: "Session stopped", description: "Session moved to stopped state (mock).", tone: "warning" });
  };

  const handleRestartService = (serviceId: string) => {
    setServices((current) => current.map((service) => (service.id === serviceId ? { ...service, status: "RESTARTING" } : service)));
    pushToast({ title: "Service restart queued", description: "Mock restart in progress...", tone: "info" });

    window.setTimeout(() => {
      setServices((current) =>
        current.map((service) =>
          service.id === serviceId
            ? {
                ...service,
                status: "ONLINE",
                uptime: "just now"
              }
            : service
        )
      );
      pushToast({ title: "Service online", description: "Service restart completed (mock).", tone: "success" });
    }, 1200);
  };

  const handleQuickCommand = (command: string) => {
    if (!activeSession) return;
    setPendingCommand({ sessionId: activeSession.id, command });
    openModal("confirm_command");
  };

  const topResource = systemStats;

  return (
    <DashboardLayout system={systemQuery.data?.data.stats ?? systemStats}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-4">
          <PageHeader
            actions={
              <ActionButtonGroup>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/55 bg-cyan-500/20 px-4 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/30"
                  onClick={() => openModal("new_session")}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  New Session
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={() => openModal("run_command")}
                  type="button"
                >
                  <Command className="h-4 w-4" />
                  Run Command
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/35 bg-sky-950/45 px-4 text-sm text-cyan-200 transition hover:border-cyan-500/55 hover:bg-cyan-500/15"
                  onClick={() => openModal("clear_logs")}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Logs
                </button>
              </ActionButtonGroup>
            }
            subtitle="Control, monitor and manage local system commands, AI services and agent sessions."
            title="Terminal"
          />

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <StatsCard description="Open terminal sessions" icon={TerminalSquare} label="Active Sessions" tone="cyan" value={stats.activeSessions} />
            <StatsCard description="Current process count" icon={Activity} label="Running Processes" tone="green" value={stats.runningProcesses} />
            <StatsCard description="Gateway and workers" icon={ServerCog} label="AI Services" tone="amber" value={stats.aiServices} />
            <StatsCard description="Mock command executions" icon={Command} label="Commands Today" tone="slate" value={stats.commandsToday} />
            <StatsCard description="Blocked or failed" icon={AlertTriangle} label="Failed Commands" tone="rose" value={stats.failedCommands} />
            <StatsCard description="Mac Mini uptime" icon={Clock3} label="System Uptime" tone="cyan" value={stats.systemUptime} />
          </section>

          {activeSession ? (
            <TerminalWindow
              activeSession={activeSession}
              activeSessionId={effectiveActiveSessionId}
              commandInput={commandInput}
              onCommandChange={setCommandInput}
              onRunCommand={handleRunFromInput}
              onSessionChange={setActiveSessionId}
              sessions={sessions}
            />
          ) : null}

          <SessionTable
            onKill={(session) => {
              setSelectedSessionId(session.id);
              openModal("kill_session");
            }}
            onOpen={(session) => setActiveSessionId(session.id)}
            sessions={sessions}
          />

          <CommandHistory items={commandHistory} />
        </main>

        <aside className="space-y-4">
          <SidebarPanel title="Services Overview">
            <div className="space-y-2.5">
              {services.map((service) => (
                <ServiceStatusCard
                  key={service.id}
                  onRestart={(item) => {
                    setSelectedServiceId(item.id);
                    openModal("service_restart");
                  }}
                  service={service}
                />
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Resource Usage">
            <ResourceUsagePanel
              metrics={[
                { key: "CPU", value: topResource.cpuUsage, max: 100, unit: "%" },
                { key: "RAM", value: topResource.ramUsage, max: 100, unit: "%" },
                { key: "SSD", value: topResource.ssdUsage, max: 100, unit: "%" },
                { key: "Network", value: liveTerminalData.resourceUsage.find((metric) => metric.key === "Network")?.value ?? 24, max: 100, unit: "%" },
                { key: "Temperature", value: topResource.temperature, max: 100, unit: "C" }
              ]}
            />
          </SidebarPanel>

          <SidebarPanel title="Quick Commands">
            <div className="space-y-2.5">
              {liveTerminalData.quickCommands.map((item) => (
                <QuickCommandCard description={item.description} icon={RotateCcw} key={item.id} onClick={() => handleQuickCommand(item.command)} title={item.title} />
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Security Notice">
            <SecurityNotice notices={liveTerminalData.securityNotices} />
          </SidebarPanel>
        </aside>
      </div>

      <NewSessionModal onClose={closeModal} onCreate={handleCreateSession} open={activeModal === "new_session"} />

      <RunCommandModal onClose={closeModal} onRun={handleRunFromModal} open={activeModal === "run_command"} sessions={sessions} />

      <ConfirmCommandModal
        command={pendingCommand?.command ?? ""}
        onClose={closeModal}
        onConfirm={() => {
          executeBackendConfirmedCommand();
          closeModal();
        }}
        open={activeModal === "confirm_command"}
        sessionName={sessions.find((session) => session.id === pendingCommand?.sessionId)?.name ?? "Unknown Session"}
      />

      <ClearLogsModal onClose={closeModal} onConfirm={handleClearLogs} open={activeModal === "clear_logs"} sessionName={activeSession?.name ?? "Selected Session"} />

      <KillSessionModal onClose={closeModal} onKill={handleKillSession} open={activeModal === "kill_session"} session={selectedSession} />

      <ServiceRestartModal onClose={closeModal} onRestart={handleRestartService} open={activeModal === "service_restart"} service={selectedService} />

      <ToastStack toasts={toasts} />
    </DashboardLayout>
  );
}
