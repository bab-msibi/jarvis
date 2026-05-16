import { MemoryDataset } from "@/types/memory";

export const memoryData: MemoryDataset = {
  totals: {
    totalMemories: 248592,
    activeMemories: 86742,
    shortTerm: 24581,
    longTerm: 162358,
    embeddings: "1.2M",
    memoryUsage: "78.4 GB"
  },
  memories: [
    {
      id: "mem-1",
      content: "User prefers detailed technical explanations with code examples and implementation steps.",
      type: "FACT",
      brain: "Code Brain",
      agent: "Developer",
      importance: "High",
      decayStatus: "Strong",
      createdAt: "2026-05-20T09:10:00Z",
      updatedAt: "2026-05-24T09:14:00Z",
      lastAccessed: "2m ago",
      embeddingId: "emb-10921",
      tags: ["preference", "technical", "style"],
      pinned: true,
      shared: true,
      memoryClass: "Long Term"
    },
    {
      id: "mem-2",
      content: "Q2 roadmap includes AI automation features and multi-agent orchestration milestones.",
      type: "TASK",
      brain: "General Brain",
      agent: "Project Manager",
      importance: "High",
      decayStatus: "Strong",
      createdAt: "2026-05-18T07:21:00Z",
      updatedAt: "2026-05-24T09:01:00Z",
      lastAccessed: "15m ago",
      embeddingId: "emb-10922",
      tags: ["roadmap", "q2", "orchestration"],
      pinned: false,
      shared: true,
      memoryClass: "Long Term"
    },
    {
      id: "mem-3",
      content: "Market analysis from May 2024 shows 23% growth in AI adoption across enterprise teams.",
      type: "KNOWLEDGE",
      brain: "Analysis Brain",
      agent: "Researcher",
      importance: "Medium",
      decayStatus: "Medium",
      createdAt: "2026-05-16T12:02:00Z",
      updatedAt: "2026-05-24T08:10:00Z",
      lastAccessed: "1h ago",
      embeddingId: "emb-10923",
      tags: ["market", "research", "ai-adoption"],
      pinned: false,
      shared: false,
      memoryClass: "Episodic"
    },
    {
      id: "mem-4",
      content: "User is working on workflow automation and optimization pipeline for Jarvis command center.",
      type: "CONTEXT",
      brain: "General Brain",
      agent: "DevOps Engineer",
      importance: "Medium",
      decayStatus: "Medium",
      createdAt: "2026-05-21T14:00:00Z",
      updatedAt: "2026-05-24T07:30:00Z",
      lastAccessed: "2h ago",
      embeddingId: "emb-10924",
      tags: ["workflow", "pipeline", "context"],
      pinned: false,
      shared: true,
      memoryClass: "Short Term"
    },
    {
      id: "mem-5",
      content: "Content strategy focuses on AI productivity and automation tools for business teams.",
      type: "PREFERENCE",
      brain: "Creative Brain",
      agent: "Content Writer",
      importance: "Medium",
      decayStatus: "Weak",
      createdAt: "2026-05-19T10:44:00Z",
      updatedAt: "2026-05-24T06:55:00Z",
      lastAccessed: "3h ago",
      embeddingId: "emb-10925",
      tags: ["content", "strategy"],
      pinned: false,
      shared: false,
      memoryClass: "Long Term"
    },
    {
      id: "mem-6",
      content: "Database schema: users table, projects table, tasks table with linked workflow metadata.",
      type: "CODE",
      brain: "Code Brain",
      agent: "Developer",
      importance: "High",
      decayStatus: "Strong",
      createdAt: "2026-05-15T05:11:00Z",
      updatedAt: "2026-05-24T04:20:00Z",
      lastAccessed: "5h ago",
      embeddingId: "emb-10926",
      tags: ["schema", "database", "code"],
      pinned: true,
      shared: true,
      memoryClass: "Procedural"
    },
    {
      id: "mem-7",
      content: "Customer feedback requests better UI/UX and improved mobile responsiveness for operations pages.",
      type: "INSIGHT",
      brain: "Analysis Brain",
      agent: "Data Analyst",
      importance: "Low",
      decayStatus: "Weak",
      createdAt: "2026-05-14T11:51:00Z",
      updatedAt: "2026-05-24T02:15:00Z",
      lastAccessed: "8h ago",
      embeddingId: "emb-10927",
      tags: ["feedback", "ux", "mobile"],
      pinned: false,
      shared: false,
      memoryClass: "Episodic"
    },
    {
      id: "mem-8",
      content: "Deployment pipeline updated with new CI/CD workflow and rollback safeguards for production.",
      type: "EVENT",
      brain: "General Brain",
      agent: "DevOps Engineer",
      importance: "Low",
      decayStatus: "Weak",
      createdAt: "2026-05-13T07:31:00Z",
      updatedAt: "2026-05-23T21:00:00Z",
      lastAccessed: "12h ago",
      embeddingId: "emb-10928",
      tags: ["deployment", "cicd", "ops"],
      pinned: false,
      shared: true,
      memoryClass: "Short Term"
    }
  ],
  memoryDistributionByBrain: [
    { label: "General Brain", value: 86742, color: "#22d3ee" },
    { label: "Code Brain", value: 62581, color: "#22c55e" },
    { label: "Analysis Brain", value: 48219, color: "#f59e0b" },
    { label: "Creative Brain", value: 32856, color: "#a855f7" },
    { label: "Others", value: 18194, color: "#64748b" }
  ],
  memoryOverview: [
    { label: "Short Term", value: 24581, color: "#22d3ee" },
    { label: "Long Term", value: 162358, color: "#facc15" },
    { label: "Episodic", value: 38621, color: "#f97316" },
    { label: "Procedural", value: 12842, color: "#a855f7" },
    { label: "Others", value: 10190, color: "#64748b" }
  ],
  memoryImportanceBreakdown: [
    { label: "High", value: 78542, color: "#ef4444" },
    { label: "Medium", value: 112845, color: "#f59e0b" },
    { label: "Low", value: 45872, color: "#22c55e" },
    { label: "Very Low", value: 11333, color: "#94a3b8" }
  ],
  memoryTypesRadar: [
    { type: "Fact", value: 78 },
    { type: "Task", value: 64 },
    { type: "Knowledge", value: 70 },
    { type: "Context", value: 62 },
    { type: "Preference", value: 48 },
    { type: "Insight", value: 52 },
    { type: "Event", value: 57 },
    { type: "Code", value: 74 }
  ],
  memoryUsage: {
    usedGB: 78.4,
    totalAllocatedGB: 150,
    availableGB: 71.6,
    slices: [
      { label: "Vector Store", valueGB: 42.6, color: "#3b82f6" },
      { label: "Metadata", valueGB: 18.7, color: "#22c55e" },
      { label: "Raw Data", valueGB: 12.3, color: "#f59e0b" },
      { label: "Cache", valueGB: 4.8, color: "#22d3ee" }
    ]
  },
  memoryTimeline: [
    { date: "May 18", created: 56000, accessed: 29000, expired: 12000 },
    { date: "May 19", created: 65000, accessed: 34000, expired: 14000 },
    { date: "May 20", created: 68000, accessed: 36000, expired: 14500 },
    { date: "May 21", created: 72000, accessed: 37000, expired: 15000 },
    { date: "May 22", created: 78000, accessed: 39000, expired: 12000 },
    { date: "May 23", created: 82000, accessed: 42000, expired: 9000 },
    { date: "May 24", created: 86742, accessed: 84500, expired: 4219 }
  ],
  retentionPolicies: [
    { id: "rp-1", name: "Short Term Cleanup", type: "CONTEXT", maxDays: 14, action: "Compress" },
    { id: "rp-2", name: "Task Retention", type: "TASK", maxDays: 30, action: "Archive" },
    { id: "rp-3", name: "Low Importance Prune", type: "ALL", maxDays: 60, action: "Delete" }
  ],
  optimizationLogs: [
    { id: "ol-1", timestamp: "May 24, 2026 09:15 AM", status: "Successful", details: "Compacted vector segments and refreshed cache index." },
    { id: "ol-2", timestamp: "May 23, 2026 03:00 PM", status: "Successful", details: "Archived stale context memories older than policy threshold." },
    { id: "ol-3", timestamp: "May 22, 2026 09:15 AM", status: "Successful", details: "Updated decay scores and deduplicated repeated entries." }
  ]
};
