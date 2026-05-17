import { MonitorDataSet } from "@/types/monitor";

export const monitorData: MonitorDataSet = {
  stats: {
    systemHealth: "Healthy",
    uptime: "3d 11h 24m",
    cpuLoad: "18%",
    ramUsage: "32%",
    ssdUsage: "47%",
    activeAlerts: 3
  },
  metrics: [
    { id: "cpu", name: "CPU Usage", value: 18, unit: "%", status: "HEALTHY", history: [14, 16, 15, 18, 20, 19, 18], updatedAt: "just now" },
    { id: "ram", name: "RAM Usage", value: 32, unit: "%", status: "HEALTHY", history: [28, 29, 31, 30, 33, 32, 32], updatedAt: "just now" },
    { id: "ssd", name: "SSD Usage", value: 47, unit: "%", status: "WARNING", history: [44, 45, 45, 46, 47, 47, 47], updatedAt: "just now" },
    { id: "gpu", name: "GPU Usage", value: 26, unit: "%", status: "HEALTHY", history: [22, 24, 25, 27, 29, 27, 26], updatedAt: "1m ago" },
    { id: "network", name: "Network Activity", value: 24, unit: "%", status: "HEALTHY", history: [18, 20, 19, 24, 27, 25, 24], updatedAt: "1m ago" },
    { id: "temp", name: "Temperature", value: 42, unit: "C", status: "WARNING", history: [39, 40, 41, 42, 43, 42, 42], updatedAt: "just now" }
  ],
  services: [
    { id: "svc-gateway", name: "Agent Gateway", status: "ONLINE", uptime: "4h", cpuUsage: 12, ramUsage: 18, lastHeartbeat: "5s ago", errorCount: 0 },
    { id: "svc-ollama", name: "Ollama", status: "ONLINE", uptime: "5h", cpuUsage: 10, ramUsage: 16, lastHeartbeat: "4s ago", errorCount: 0 },
    { id: "svc-router", name: "Model Router", status: "ONLINE", uptime: "7h", cpuUsage: 8, ramUsage: 11, lastHeartbeat: "8s ago", errorCount: 0 },
    { id: "svc-workflow", name: "Workflow Runner", status: "DEGRADED", uptime: "55m", cpuUsage: 16, ramUsage: 20, lastHeartbeat: "13s ago", errorCount: 2 },
    { id: "svc-memory", name: "Memory Indexer", status: "ONLINE", uptime: "1h 30m", cpuUsage: 7, ramUsage: 10, lastHeartbeat: "9s ago", errorCount: 0 },
    { id: "svc-obsidian", name: "Obsidian Sync", status: "ONLINE", uptime: "40m", cpuUsage: 6, ramUsage: 9, lastHeartbeat: "7s ago", errorCount: 0 },
    { id: "svc-vector", name: "Vector Store", status: "ONLINE", uptime: "2d", cpuUsage: 9, ramUsage: 14, lastHeartbeat: "6s ago", errorCount: 1 },
    { id: "svc-bridge", name: "Terminal Bridge", status: "RESTARTING", uptime: "2m", cpuUsage: 3, ramUsage: 6, lastHeartbeat: "12s ago", errorCount: 0 }
  ],
  agents: [
    { id: "ag-pm", agent: "Project Manager", status: "ONLINE", currentTask: "Roadmap coordination", cpuUsage: 8, ramUsage: 12, successRate: 97, errors: 0, lastActivity: "2m ago" },
    { id: "ag-dev", agent: "Developer", status: "BUSY", currentTask: "Auth module updates", cpuUsage: 22, ramUsage: 28, successRate: 95, errors: 1, lastActivity: "1m ago" },
    { id: "ag-rsr", agent: "Researcher", status: "ONLINE", currentTask: "Market trend scan", cpuUsage: 6, ramUsage: 10, successRate: 94, errors: 1, lastActivity: "3m ago" },
    { id: "ag-wrt", agent: "Content Writer", status: "IDLE", currentTask: "Waiting assignment", cpuUsage: 2, ramUsage: 6, successRate: 92, errors: 0, lastActivity: "5m ago" },
    { id: "ag-data", agent: "Data Analyst", status: "ONLINE", currentTask: "Sales report generation", cpuUsage: 15, ramUsage: 20, successRate: 96, errors: 1, lastActivity: "2m ago" },
    { id: "ag-des", agent: "Designer", status: "BUSY", currentTask: "Dashboard visual polish", cpuUsage: 18, ramUsage: 22, successRate: 93, errors: 1, lastActivity: "4m ago" },
    { id: "ag-qa", agent: "QA Tester", status: "IDLE", currentTask: "Regression queue", cpuUsage: 3, ramUsage: 8, successRate: 91, errors: 2, lastActivity: "8m ago" },
    { id: "ag-ops", agent: "DevOps Engineer", status: "ONLINE", currentTask: "Service stability checks", cpuUsage: 10, ramUsage: 16, successRate: 98, errors: 0, lastActivity: "1m ago" }
  ],
  logs: [
    { id: "log-1", level: "INFO", message: "Agent Gateway heartbeat received", source: "Agent Gateway", timestamp: "just now" },
    { id: "log-2", level: "SUCCESS", message: "Ollama model loaded successfully", source: "Ollama", timestamp: "1m ago" },
    { id: "log-3", level: "SUCCESS", message: "Obsidian vault sync completed", source: "Obsidian Sync", timestamp: "2m ago" },
    { id: "log-4", level: "INFO", message: "Memory indexer optimized embeddings", source: "Memory Indexer", timestamp: "4m ago" },
    { id: "log-5", level: "SUCCESS", message: "Workflow runner completed pipeline", source: "Workflow Runner", timestamp: "7m ago" },
    { id: "log-6", level: "WARNING", message: "High RAM usage detected", source: "System Monitor", timestamp: "10m ago" },
    { id: "log-7", level: "ERROR", message: "Failed command blocked by security policy", source: "Terminal Bridge", timestamp: "14m ago" }
  ],
  incidents: [
    { id: "inc-1", title: "Workflow queue latency spike", severity: "HIGH", source: "Workflow Runner", timestamp: "9m ago", status: "OPEN" },
    { id: "inc-2", title: "Terminal bridge reconnecting", severity: "MEDIUM", source: "Terminal Bridge", timestamp: "3m ago", status: "INVESTIGATING" },
    { id: "inc-3", title: "RAM pressure warning", severity: "LOW", source: "System Monitor", timestamp: "12m ago", status: "OPEN" }
  ],
  healthOverview: [
    { label: "Healthy", value: 78, color: "#22c55e" },
    { label: "Warning", value: 16, color: "#f59e0b" },
    { label: "Critical", value: 4, color: "#ef4444" },
    { label: "Offline", value: 2, color: "#64748b" }
  ],
  resourceBreakdown: [
    { label: "CPU", value: 18 },
    { label: "RAM", value: 32 },
    { label: "SSD", value: 47 },
    { label: "GPU", value: 26 },
    { label: "Network", value: 24 },
    { label: "Temperature", value: 42 }
  ],
  serviceAvailability: [
    { label: "Agent Gateway", value: 99 },
    { label: "Ollama", value: 98 },
    { label: "Obsidian Sync", value: 97 },
    { label: "Workflow Runner", value: 95 },
    { label: "Memory Indexer", value: 98 },
    { label: "Vector Store", value: 99 }
  ]
};
