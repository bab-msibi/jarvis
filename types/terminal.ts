export type TerminalSessionStatus = "ONLINE" | "IDLE" | "RUNNING" | "ERROR" | "STOPPED";
export type TerminalSessionType = "Agent Shell" | "Service" | "Worker" | "System";

export type TerminalSession = {
  id: string;
  name: string;
  type: TerminalSessionType;
  agent: string;
  currentCommand: string;
  status: TerminalSessionStatus;
  cpuUsage: number;
  ramUsage: number;
  startedAt: string;
  cwd: string;
  logs: string[];
};

export type TerminalCommandStatus = "SUCCESS" | "FAILED" | "BLOCKED";

export type TerminalCommandHistoryItem = {
  id: string;
  command: string;
  sessionId: string;
  sessionName: string;
  status: TerminalCommandStatus;
  executedAt: string;
};

export type TerminalServiceStatus = "ONLINE" | "DEGRADED" | "OFFLINE" | "RESTARTING";

export type TerminalService = {
  id: string;
  name: string;
  status: TerminalServiceStatus;
  port: string;
  uptime: string;
  description: string;
};

export type TerminalResourceMetric = {
  key: "CPU" | "RAM" | "SSD" | "Network" | "Temperature";
  value: number;
  max: number;
  unit: string;
};

export type TerminalQuickCommand = {
  id: string;
  title: string;
  description: string;
  command: string;
};

export type TerminalSecurityNotice = {
  id: string;
  text: string;
};

export type TerminalDataset = {
  stats: {
    activeSessions: number;
    runningProcesses: number;
    aiServices: number;
    commandsToday: number;
    failedCommands: number;
    systemUptime: string;
  };
  sessions: TerminalSession[];
  commandHistory: TerminalCommandHistoryItem[];
  services: TerminalService[];
  resourceUsage: TerminalResourceMetric[];
  quickCommands: TerminalQuickCommand[];
  securityNotices: TerminalSecurityNotice[];
  defaultPath: string;
};
