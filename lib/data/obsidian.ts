import { ObsidianStats } from "@/types/system";
import { ObsidianDataset } from "@/types/obsidian";

export const obsidianStats: ObsidianStats = {
  vaultName: "JARVIS Vault",
  vaultPath: "/Users/owner/Library/Mobile Documents/iCloud~md~obsidian/Documents/JARVIS Vault",
  files: 14803,
  notes: 12458,
  links: 28946,
  size: "18.7 GB",
  lastSync: "May 24, 2026 09:15 AM",
  syncStatus: "synced"
};

export const obsidianData: ObsidianDataset = {
  vaultName: "JARVIS Vault",
  vaultPath: "/Users/owner/Library/Mobile Documents/iCloud~md~obsidian/Documents/JARVIS Vault",
  dailyNotesCount: 1024,
  linkedBrainsCount: 7,
  attachmentsCount: 2345,
  vaultDistribution: {
    projects: 3986,
    areas: 2987,
    resources: 2240,
    archive: 1745,
    inbox: 1500
  },
  folders: [
    {
      id: "root",
      name: "JARVIS Vault",
      path: "JARVIS Vault",
      noteCount: 12458,
      children: [
        { id: "inbox", name: "01 - Inbox", path: "01 - Inbox", noteCount: 245 },
        { id: "projects", name: "02 - Projects", path: "02 - Projects", noteCount: 1234 },
        { id: "areas", name: "03 - Areas", path: "03 - Areas", noteCount: 856 },
        { id: "resources", name: "04 - Resources", path: "04 - Resources", noteCount: 2345 },
        { id: "archive", name: "05 - Archive", path: "05 - Archive", noteCount: 3567 },
        { id: "daily", name: "Daily Notes", path: "Daily Notes", noteCount: 1024 },
        { id: "templates", name: "Templates", path: "Templates", noteCount: 147 },
        { id: "attachments", name: "Attachments", path: "Attachments", noteCount: 2345 },
        { id: "system", name: "System", path: "System", noteCount: 124 }
      ]
    }
  ],
  notes: [
    {
      id: "note-roadmap",
      title: "Q2 Roadmap Planning",
      folder: "02 - Projects",
      tags: ["#planning", "#roadmap"],
      updatedAt: "2m ago",
      backlinks: 42,
      linkedBrains: ["General Brain", "Business Brain"],
      noteType: "note",
      wordCount: 1420
    },
    {
      id: "note-agent-arch",
      title: "AI Agent Architecture",
      folder: "03 - Areas/AI",
      tags: ["#architecture", "#agents"],
      updatedAt: "15m ago",
      backlinks: 58,
      linkedBrains: ["Code Brain", "General Brain"],
      noteType: "note",
      wordCount: 2210
    },
    {
      id: "note-workflow-ideas",
      title: "Workflow Automation Ideas",
      folder: "02 - Projects/Workflows",
      tags: ["#automation", "#ideas"],
      updatedAt: "1h ago",
      backlinks: 35,
      linkedBrains: ["Code Brain", "Creative Brain"],
      noteType: "note",
      wordCount: 890
    },
    {
      id: "note-market-may",
      title: "Market Research - May 2024",
      folder: "02 - Projects/Research",
      tags: ["#research", "#market"],
      updatedAt: "2h ago",
      backlinks: 76,
      linkedBrains: ["Research Brain", "Analysis Brain"],
      noteType: "note",
      wordCount: 3020
    },
    {
      id: "note-content-framework",
      title: "Content Strategy Framework",
      folder: "03 - Areas/Marketing",
      tags: ["#content", "#strategy"],
      updatedAt: "3h ago",
      backlinks: 53,
      linkedBrains: ["Marketing Brain", "Creative Brain"],
      noteType: "note",
      wordCount: 1740
    },
    {
      id: "note-daily-2026-05-24",
      title: "Daily Note - May 24, 2026",
      folder: "Daily Notes",
      tags: ["#daily", "#planning"],
      updatedAt: "4h ago",
      backlinks: 12,
      linkedBrains: ["General Brain"],
      noteType: "daily",
      wordCount: 640
    },
    {
      id: "note-system-overview",
      title: "JARVIS System Overview",
      folder: "01 - Inbox",
      tags: ["#jarvis", "#overview"],
      updatedAt: "5h ago",
      backlinks: 120,
      linkedBrains: ["General Brain", "Code Brain", "Analysis Brain"],
      noteType: "system",
      wordCount: 2750
    },
    {
      id: "note-code-review-practices",
      title: "Code Review Best Practices",
      folder: "04 - Resources/Dev",
      tags: ["#dev", "#best-practice"],
      updatedAt: "6h ago",
      backlinks: 41,
      linkedBrains: ["Code Brain"],
      noteType: "note",
      wordCount: 1120
    },
    {
      id: "note-daily-2026-05-23",
      title: "Daily Note - May 23, 2026",
      folder: "Daily Notes",
      tags: ["#daily", "#retrospective"],
      updatedAt: "1d ago",
      backlinks: 8,
      linkedBrains: ["General Brain"],
      noteType: "daily",
      wordCount: 512
    },
    {
      id: "note-template-meeting",
      title: "Meeting Notes Template",
      folder: "Templates",
      tags: ["#template", "#notes"],
      updatedAt: "1d ago",
      backlinks: 17,
      linkedBrains: ["General Brain"],
      noteType: "template",
      wordCount: 210
    },
    {
      id: "note-attachment-guidelines",
      title: "Attachment Guidelines",
      folder: "Attachments",
      tags: ["#attachments", "#policy"],
      updatedAt: "2d ago",
      backlinks: 22,
      linkedBrains: ["General Brain"],
      noteType: "attachment",
      wordCount: 430
    },
    {
      id: "note-obsidian-sync",
      title: "Obsidian Sync Troubleshooting",
      folder: "System",
      tags: ["#obsidian", "#sync"],
      updatedAt: "2d ago",
      backlinks: 29,
      linkedBrains: ["Obsidian Brain", "Code Brain"],
      noteType: "system",
      wordCount: 980
    }
  ],
  tags: [
    { tag: "#project", count: 1234 },
    { tag: "#ai", count: 987 },
    { tag: "#workflow", count: 876 },
    { tag: "#research", count: 745 },
    { tag: "#notes", count: 654 },
    { tag: "#automation", count: 543 },
    { tag: "#development", count: 432 },
    { tag: "#planning", count: 421 }
  ],
  graphNodes: [
    {
      id: "node-workflows",
      type: "knowledgeNode",
      position: { x: 90, y: 130 },
      data: { label: "Workflows", noteCount: 12, category: "workflow" }
    },
    {
      id: "node-automation",
      type: "knowledgeNode",
      position: { x: 280, y: 80 },
      data: { label: "Automation", noteCount: 24, category: "workflow" }
    },
    {
      id: "node-ai-models",
      type: "knowledgeNode",
      position: { x: 500, y: 60 },
      data: { label: "AI Models", noteCount: 8, category: "ai" }
    },
    {
      id: "node-knowledge",
      type: "knowledgeNode",
      position: { x: 720, y: 85 },
      data: { label: "Knowledge", noteCount: 156, category: "knowledge" }
    },
    {
      id: "node-research",
      type: "knowledgeNode",
      position: { x: 90, y: 220 },
      data: { label: "Research", noteCount: 32, category: "research" }
    },
    {
      id: "node-jarvis",
      type: "knowledgeNode",
      position: { x: 410, y: 190 },
      data: { label: "JARVIS System", noteCount: 200, category: "system" }
    },
    {
      id: "node-obsidian",
      type: "knowledgeNode",
      position: { x: 610, y: 190 },
      data: { label: "Obsidian Integration", noteCount: 68, category: "ai" }
    },
    {
      id: "node-projects",
      type: "knowledgeNode",
      position: { x: 790, y: 220 },
      data: { label: "Projects", noteCount: 32, category: "project" }
    }
  ],
  graphEdges: [
    { id: "e-workflow-auto", source: "node-workflows", target: "node-automation", animated: true },
    { id: "e-auto-jarvis", source: "node-automation", target: "node-jarvis", animated: true },
    { id: "e-ai-jarvis", source: "node-ai-models", target: "node-jarvis", animated: true },
    { id: "e-know-obsidian", source: "node-knowledge", target: "node-obsidian", animated: true },
    { id: "e-jarvis-obsidian", source: "node-jarvis", target: "node-obsidian", animated: true },
    { id: "e-research-jarvis", source: "node-research", target: "node-jarvis", animated: true },
    { id: "e-projects-obsidian", source: "node-projects", target: "node-obsidian", animated: true },
    { id: "e-projects-knowledge", source: "node-projects", target: "node-knowledge", animated: true },
    { id: "e-workflow-research", source: "node-workflows", target: "node-research", animated: true }
  ],
  backlinks: [
    { noteId: "note-system-overview", noteTitle: "JARVIS System Overview", backlinks: 120 },
    { noteId: "note-market-may", noteTitle: "Market Research - May 2024", backlinks: 76 },
    { noteId: "note-agent-arch", noteTitle: "AI Agent Architecture", backlinks: 58 },
    { noteId: "note-content-framework", noteTitle: "Content Strategy Framework", backlinks: 53 },
    { noteId: "note-roadmap", noteTitle: "Q2 Roadmap Planning", backlinks: 42 },
    { noteId: "note-code-review-practices", noteTitle: "Code Review Best Practices", backlinks: 41 }
  ],
  syncHistory: [
    { id: "sync-1", timestamp: "May 24, 2026 09:15 AM", status: "SUCCESS", details: "Vault synchronized successfully." },
    { id: "sync-2", timestamp: "May 24, 2026 08:40 AM", status: "SUCCESS", details: "Incremental sync complete." },
    { id: "sync-3", timestamp: "May 24, 2026 07:30 AM", status: "FAILED", details: "Attachment index timeout recovered." },
    { id: "sync-4", timestamp: "May 24, 2026 06:58 AM", status: "SUCCESS", details: "Backlink graph refreshed." }
  ]
};
