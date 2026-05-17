import { SystemService, SystemStats } from "@/types/system";

export const systemStats: SystemStats = {
  name: "Mac Mini M4",
  specs: "10-Core CPU / 10-Core GPU / 16GB Unified Memory",
  os: "macOS 14.4",
  cpuUsage: 18,
  ramUsage: 32,
  ssdUsage: 47,
  temperature: 42,
  uptime: "13d 04h",
  status: "online"
};

export const systemServices: SystemService[] = [
  {
    id: "system-mac-mini-m4",
    name: "Mac Mini M4",
    description: "Primary host for local JARVIS agents and system orchestration.",
    status: "online",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-agent-gateway",
    name: "Agent Gateway",
    description: "Routes UI and API requests to local and remote AI agents.",
    status: "online",
    endpoint: "http://127.0.0.1:1878",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-ollama-service",
    name: "Ollama Service",
    description: "Local model runtime for private inference on the Mac Mini.",
    status: "warning",
    endpoint: "http://127.0.0.1:11434",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-obsidian-sync",
    name: "Obsidian Sync",
    description: "Keeps vault notes available to agent memory and knowledge workflows.",
    status: "online",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-memory-indexer",
    name: "Memory Indexer",
    description: "Builds searchable memory and document indexes for JARVIS brains.",
    status: "online",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-workflow-runner",
    name: "Workflow Runner",
    description: "Executes approved multi-agent workflows and task chains.",
    status: "online",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-vector-store",
    name: "Vector Store",
    description: "Stores embeddings for documents, memory, Obsidian notes and agent context.",
    status: "warning",
    lastChecked: "mocked live check",
    mocked: true
  },
  {
    id: "system-terminal-bridge",
    name: "Terminal Bridge",
    description: "Mock-only frontend bridge for future controlled terminal actions.",
    status: "offline",
    lastChecked: "mocked live check",
    mocked: true
  }
];
