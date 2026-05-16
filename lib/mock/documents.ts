import { DocumentsDataset } from "@/types/document";

export const documentsData: DocumentsDataset = {
  totals: {
    documents: 3246,
    totalSize: "128.7 GB",
    recentUploads: 24,
    categories: 18,
    sharedDocuments: 342,
    aiProcessed: 1128
  },
  documents: [
    {
      id: "doc-q2-roadmap",
      name: "Q2 Roadmap Planning.pdf",
      category: "Planning",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "John Boss",
      linkedAgent: "Project Manager",
      linkedBrain: "General Brain",
      aiStatus: "Indexed",
      updatedAt: "2m ago",
      createdAt: "2026-05-24T09:13:00Z",
      tags: ["roadmap", "planning"],
      storagePath: "/vault/documents/planning/q2-roadmap-planning.pdf",
      indexed: true,
      shared: true
    },
    {
      id: "doc-agent-arch",
      name: "AI Agent Architecture.docx",
      category: "Architecture",
      type: "DOCX",
      size: "1.8 MB",
      uploadedBy: "Sarah Connor",
      linkedAgent: "Developer",
      linkedBrain: "Code Brain",
      aiStatus: "Indexed",
      updatedAt: "15m ago",
      createdAt: "2026-05-24T09:01:00Z",
      tags: ["architecture", "agents"],
      storagePath: "/vault/documents/architecture/ai-agent-architecture.docx",
      indexed: true,
      shared: true
    },
    {
      id: "doc-market-analysis",
      name: "Market Analysis - May 2024.xlsx",
      category: "Research",
      type: "XLSX",
      size: "3.6 MB",
      uploadedBy: "John Boss",
      linkedAgent: "Researcher",
      linkedBrain: "Analysis Brain",
      aiStatus: "Processing",
      updatedAt: "1h ago",
      createdAt: "2026-05-24T08:45:00Z",
      tags: ["research", "market"],
      storagePath: "/vault/documents/research/market-analysis-may-2024.xlsx",
      indexed: false,
      shared: false
    },
    {
      id: "doc-content-deck",
      name: "Content Strategy Deck.pptx",
      category: "Marketing",
      type: "PPTX",
      size: "5.2 MB",
      uploadedBy: "Sarah Connor",
      linkedAgent: "Content Writer",
      linkedBrain: "Creative Brain",
      aiStatus: "Indexed",
      updatedAt: "2h ago",
      createdAt: "2026-05-24T08:10:00Z",
      tags: ["content", "strategy"],
      storagePath: "/vault/documents/marketing/content-strategy-deck.pptx",
      indexed: true,
      shared: true
    },
    {
      id: "doc-automation-guide",
      name: "Workflow Automation Guide.pdf",
      category: "Documentation",
      type: "PDF",
      size: "4.1 MB",
      uploadedBy: "Mike Johnson",
      linkedAgent: "DevOps Engineer",
      linkedBrain: "General Brain",
      aiStatus: "Indexed",
      updatedAt: "3h ago",
      createdAt: "2026-05-24T07:40:00Z",
      tags: ["workflow", "automation"],
      storagePath: "/vault/documents/documentation/workflow-automation-guide.pdf",
      indexed: true,
      shared: false
    },
    {
      id: "doc-project-assets",
      name: "Project Assets.zip",
      category: "Resources",
      type: "ZIP",
      size: "256.8 MB",
      uploadedBy: "Emily Davis",
      linkedAgent: "Designer",
      linkedBrain: "Creative Brain",
      aiStatus: "Not Indexed",
      updatedAt: "5h ago",
      createdAt: "2026-05-24T06:50:00Z",
      tags: ["assets", "design"],
      storagePath: "/vault/documents/resources/project-assets.zip",
      indexed: false,
      shared: false
    },
    {
      id: "doc-feedback-data",
      name: "User Feedback Data.csv",
      category: "Data",
      type: "CSV",
      size: "1.2 MB",
      uploadedBy: "John Boss",
      linkedAgent: "Data Analyst",
      linkedBrain: "Analysis Brain",
      aiStatus: "Indexed",
      updatedAt: "6h ago",
      createdAt: "2026-05-24T06:10:00Z",
      tags: ["feedback", "dataset"],
      storagePath: "/vault/documents/data/user-feedback-data.csv",
      indexed: true,
      shared: true
    },
    {
      id: "doc-jarvis-overview",
      name: "JARVIS System Overview.md",
      category: "Documentation",
      type: "MD",
      size: "89 KB",
      uploadedBy: "Mike Johnson",
      linkedAgent: "Developer",
      linkedBrain: "General Brain",
      aiStatus: "Indexed",
      updatedAt: "1d ago",
      createdAt: "2026-05-23T20:05:00Z",
      tags: ["jarvis", "overview"],
      storagePath: "/vault/documents/documentation/jarvis-system-overview.md",
      indexed: true,
      shared: true
    }
  ],
  categories: [
    { name: "Documentation", count: 892 },
    { name: "Research", count: 512 },
    { name: "Planning", count: 428 },
    { name: "Architecture", count: 356 },
    { name: "Marketing", count: 384 },
    { name: "Resources", count: 512 },
    { name: "Data", count: 162 }
  ],
  storage: {
    totalGB: 256,
    usedGB: 128.7,
    availableGB: 127.3,
    slices: [
      { label: "Documents", valueGB: 48.6, color: "#22d3ee" },
      { label: "Images", valueGB: 32.1, color: "#22c55e" },
      { label: "Archives", valueGB: 18.3, color: "#f59e0b" },
      { label: "Videos", valueGB: 12.8, color: "#a855f7" },
      { label: "Others", valueGB: 16.9, color: "#64748b" }
    ]
  },
  uploads: [
    { name: "John Boss", initials: "JB", count: 892 },
    { name: "Sarah Connor", initials: "SC", count: 645 },
    { name: "Mike Johnson", initials: "MJ", count: 512 },
    { name: "Emily Davis", initials: "ED", count: 428 },
    { name: "David Wilson", initials: "DW", count: 324 },
    { name: "Lisa Brown", initials: "LB", count: 245 },
    { name: "Alex Turner", initials: "AT", count: 198 }
  ],
  indexingStatus: {
    lastScan: "May 24, 2026 09:15 AM",
    scanStatus: "Completed",
    indexedCount: 1128,
    totalCount: 3246,
    progress: 35
  },
  activityLogs: [
    {
      id: "activity-1",
      documentName: "Q2 Roadmap Planning.pdf",
      action: "Uploaded by John Boss",
      actor: "John Boss",
      timestamp: "2m ago",
      type: "PDF"
    },
    {
      id: "activity-2",
      documentName: "AI Agent Architecture.docx",
      action: "Indexed successfully",
      actor: "JARVIS Indexer",
      timestamp: "15m ago",
      type: "DOCX"
    },
    {
      id: "activity-3",
      documentName: "Market Analysis - May 2024.xlsx",
      action: "AI processing completed",
      actor: "JARVIS Analyze",
      timestamp: "1h ago",
      type: "XLSX"
    },
    {
      id: "activity-4",
      documentName: "Content Strategy Deck.pptx",
      action: "Uploaded by Sarah Connor",
      actor: "Sarah Connor",
      timestamp: "2h ago",
      type: "PPTX"
    },
    {
      id: "activity-5",
      documentName: "Workflow Automation Guide.pdf",
      action: "Indexed successfully",
      actor: "JARVIS Indexer",
      timestamp: "3h ago",
      type: "PDF"
    }
  ],
  documentTypeBreakdown: [
    { label: "PDF", count: 1124, color: "#a855f7" },
    { label: "DOCX", count: 856, color: "#22d3ee" },
    { label: "XLSX", count: 512, color: "#22c55e" },
    { label: "PPTX", count: 384, color: "#f59e0b" },
    { label: "Others", count: 370, color: "#64748b" }
  ]
};
