export type MonitorStatus = "HEALTHY" | "WARNING" | "CRITICAL" | "OFFLINE";

export type SystemMetric = {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: MonitorStatus;
  history: number[];
  updatedAt: string;
};

export type ServiceStatus = "ONLINE" | "DEGRADED" | "OFFLINE" | "RESTARTING";

export type MonitorService = {
  id: string;
  name: string;
  status: ServiceStatus;
  uptime: string;
  cpuUsage: number;
  ramUsage: number;
  lastHeartbeat: string;
  errorCount: number;
};

export type AgentPerformance = {
  id: string;
  agent: string;
  status: "ONLINE" | "IDLE" | "BUSY" | "ERROR";
  currentTask: string;
  cpuUsage: number;
  ramUsage: number;
  successRate: number;
  errors: number;
  lastActivity: string;
};

export type LogLevel = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

export type MonitorLog = {
  id: string;
  level: LogLevel;
  message: string;
  source: string;
  timestamp: string;
};

export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IncidentStatus = "OPEN" | "INVESTIGATING" | "RESOLVED";

export type Incident = {
  id: string;
  title: string;
  severity: IncidentSeverity;
  source: string;
  timestamp: string;
  status: IncidentStatus;
};

export type MonitorDataSet = {
  stats: {
    systemHealth: string;
    uptime: string;
    cpuLoad: string;
    ramUsage: string;
    ssdUsage: string;
    activeAlerts: number;
  };
  metrics: SystemMetric[];
  services: MonitorService[];
  agents: AgentPerformance[];
  logs: MonitorLog[];
  incidents: Incident[];
  healthOverview: Array<{ label: string; value: number; color: string }>;
  resourceBreakdown: Array<{ label: string; value: number }>;
  serviceAvailability: Array<{ label: string; value: number }>;
};
