import { TerminalDataset } from "@/types/terminal";

export const terminalData: TerminalDataset = {
  stats: {
    activeSessions: 8,
    runningProcesses: 42,
    aiServices: 7,
    commandsToday: 186,
    failedCommands: 4,
    systemUptime: "3d 11h 24m"
  },
  sessions: [
    {
      id: "session-pm",
      name: "PM Agent Shell",
      type: "Agent Shell",
      agent: "Project Manager",
      currentCommand: "review-handover --all",
      status: "ONLINE",
      cpuUsage: 8,
      ramUsage: 12,
      startedAt: "2h ago",
      cwd: "/Users/owner/jarvis/agents/pm",
      logs: [
        "JARVIS Terminal initialized",
        "Connected to Mac Mini M4",
        "Agent gateway online",
        "Ollama service active",
        "PM Agent session ready",
        "Listening on localhost ports"
      ]
    },
    {
      id: "session-dev",
      name: "Developer Agent Shell",
      type: "Agent Shell",
      agent: "Developer",
      currentCommand: "pnpm test --filter gateway",
      status: "RUNNING",
      cpuUsage: 22,
      ramUsage: 28,
      startedAt: "1h ago",
      cwd: "/Users/owner/jarvis/agents/developer",
      logs: ["Bootstrapping dev environment", "Running gateway test suite"]
    },
    {
      id: "session-research",
      name: "Research Agent Shell",
      type: "Agent Shell",
      agent: "Researcher",
      currentCommand: "sync-market-dataset",
      status: "IDLE",
      cpuUsage: 6,
      ramUsage: 10,
      startedAt: "3h ago",
      cwd: "/Users/owner/jarvis/agents/research",
      logs: ["Research cache warmed", "Waiting for task assignment"]
    },
    {
      id: "session-ollama",
      name: "Ollama Service",
      type: "Service",
      agent: "System",
      currentCommand: "ollama serve",
      status: "ONLINE",
      cpuUsage: 10,
      ramUsage: 16,
      startedAt: "5h ago",
      cwd: "/usr/local/bin",
      logs: ["Ollama daemon started", "Model runtime healthy"]
    },
    {
      id: "session-gateway",
      name: "Agent Gateway",
      type: "Service",
      agent: "System",
      currentCommand: "node agent-gateway.js",
      status: "ONLINE",
      cpuUsage: 12,
      ramUsage: 18,
      startedAt: "4h ago",
      cwd: "/Users/owner/jarvis/gateway",
      logs: ["Gateway initialized", "Route table synchronized"]
    },
    {
      id: "session-obsidian",
      name: "Obsidian Sync Worker",
      type: "Worker",
      agent: "System",
      currentCommand: "sync-obsidian-vault",
      status: "RUNNING",
      cpuUsage: 7,
      ramUsage: 11,
      startedAt: "40m ago",
      cwd: "/Users/owner/jarvis/workers/obsidian",
      logs: ["Sync started", "Indexing changed notes"]
    },
    {
      id: "session-workflow",
      name: "Workflow Runner",
      type: "Worker",
      agent: "System",
      currentCommand: "run-workflow content-pipeline",
      status: "RUNNING",
      cpuUsage: 16,
      ramUsage: 20,
      startedAt: "55m ago",
      cwd: "/Users/owner/jarvis/workers/workflows",
      logs: ["Execution queue loaded", "Processing workflow run"]
    },
    {
      id: "session-memory",
      name: "Memory Indexer",
      type: "Worker",
      agent: "System",
      currentCommand: "python memory-indexer.py",
      status: "IDLE",
      cpuUsage: 5,
      ramUsage: 9,
      startedAt: "1h 30m ago",
      cwd: "/Users/owner/jarvis/workers/memory",
      logs: ["Memory compaction complete", "Waiting for next schedule"]
    }
  ],
  commandHistory: [
    { id: "cmd-1", command: "pnpm dev", sessionId: "session-dev", sessionName: "Developer Agent Shell", status: "SUCCESS", executedAt: "2m ago" },
    { id: "cmd-2", command: "ollama list", sessionId: "session-ollama", sessionName: "Ollama Service", status: "SUCCESS", executedAt: "5m ago" },
    { id: "cmd-3", command: "git status", sessionId: "session-dev", sessionName: "Developer Agent Shell", status: "SUCCESS", executedAt: "11m ago" },
    { id: "cmd-4", command: "node agent-gateway.js", sessionId: "session-gateway", sessionName: "Agent Gateway", status: "SUCCESS", executedAt: "18m ago" },
    { id: "cmd-5", command: "python memory-indexer.py", sessionId: "session-memory", sessionName: "Memory Indexer", status: "SUCCESS", executedAt: "22m ago" },
    { id: "cmd-6", command: "sync-obsidian-vault", sessionId: "session-obsidian", sessionName: "Obsidian Sync Worker", status: "SUCCESS", executedAt: "31m ago" },
    { id: "cmd-7", command: "restart-agent developer", sessionId: "session-dev", sessionName: "Developer Agent Shell", status: "FAILED", executedAt: "44m ago" },
    { id: "cmd-8", command: "test-model-connection", sessionId: "session-gateway", sessionName: "Agent Gateway", status: "SUCCESS", executedAt: "1h ago" }
  ],
  services: [
    { id: "svc-gateway", name: "Agent Gateway", status: "ONLINE", port: "localhost:4100", uptime: "4h", description: "Routes agent commands and events" },
    { id: "svc-ollama", name: "Ollama", status: "ONLINE", port: "localhost:11434", uptime: "5h", description: "Local model runtime" },
    { id: "svc-obsidian", name: "Obsidian Sync", status: "DEGRADED", port: "worker", uptime: "40m", description: "Vault synchronization worker" },
    { id: "svc-memory", name: "Memory Indexer", status: "ONLINE", port: "worker", uptime: "1h 30m", description: "Embeddings and memory indexing" },
    { id: "svc-workflow", name: "Workflow Runner", status: "ONLINE", port: "worker", uptime: "55m", description: "Workflow execution orchestration" },
    { id: "svc-vector", name: "Vector Store", status: "ONLINE", port: "localhost:6333", uptime: "2d", description: "Vector storage and recall" },
    { id: "svc-router", name: "Model Router", status: "ONLINE", port: "localhost:4200", uptime: "7h", description: "Model routing and balancing" }
  ],
  resourceUsage: [
    { key: "CPU", value: 18, max: 100, unit: "%" },
    { key: "RAM", value: 32, max: 100, unit: "%" },
    { key: "SSD", value: 47, max: 100, unit: "%" },
    { key: "Network", value: 24, max: 100, unit: "%" },
    { key: "Temperature", value: 42, max: 100, unit: "C" }
  ],
  quickCommands: [
    { id: "qc-1", title: "Start Agent Gateway", description: "Bring gateway online", command: "start-agent-gateway" },
    { id: "qc-2", title: "Restart Ollama", description: "Restart local models", command: "restart-ollama" },
    { id: "qc-3", title: "Sync Obsidian", description: "Run vault sync", command: "sync-obsidian-vault" },
    { id: "qc-4", title: "Run Health Check", description: "Check all services", command: "run-health-check" },
    { id: "qc-5", title: "Clear Cache", description: "Clean worker caches", command: "clear-cache" },
    { id: "qc-6", title: "Restart All Agents", description: "Restart active agent shells", command: "restart-all-agents" }
  ],
  securityNotices: [
    { id: "sec-1", text: "Commands must pass backend confirmation before execution." },
    { id: "sec-2", text: "Only allowlisted safe commands are accepted by the terminal bridge." },
    { id: "sec-3", text: "Dangerous commands are blocked by backend policy." },
    { id: "sec-4", text: "All accepted and blocked commands are logged for audit." }
  ],
  defaultPath: "/Users/owner/jarvis"
};
