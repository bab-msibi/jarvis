import { Workflow } from "@/types/workflow";

export const workflows: Workflow[] = [
  {
    id: "workflow-content-creation",
    name: "Content Creation Pipeline",
    description: "Generate and publish content across channels.",
    trigger: "Schedule",
    assignedAgent: "Content Writer",
    linkedModel: "GPT-4o",
    linkedBrain: "Creative Brain",
    status: "ACTIVE",
    runs: 48,
    successRate: 95,
    lastRun: "2m ago",
    createdAt: "2026-04-28T08:20:00Z",
    updatedAt: "2026-05-14T13:32:00Z",
    steps: [
      { id: "s1", title: "Schedule Trigger", type: "Trigger", status: "SUCCESS", description: "Every day at 08:00" },
      { id: "s2", title: "Research Topics", type: "Agent Step", assignedAgent: "Researcher", status: "SUCCESS" },
      { id: "s3", title: "Generate Content", type: "AI Model Step", assignedModel: "GPT-4o", status: "SUCCESS" },
      { id: "s4", title: "Review Content", type: "Approval", assignedAgent: "Content Writer", status: "RUNNING" },
      { id: "s5", title: "Optimize Content", type: "AI Model Step", assignedModel: "Claude 3.5 Sonnet", status: "IDLE" },
      { id: "s6", title: "Publish Content", type: "API Call", status: "IDLE" },
      { id: "s7", title: "Notify Team", type: "Notification", status: "IDLE" }
    ],
    tags: ["content", "automation", "publishing"]
  },
  {
    id: "workflow-market-research",
    name: "Market Research Automation",
    description: "Automated market trends and competitor analysis.",
    trigger: "Schedule",
    assignedAgent: "Researcher",
    linkedModel: "Gemini 1.5 Pro",
    linkedBrain: "Analysis Brain",
    status: "ACTIVE",
    runs: 32,
    successRate: 91,
    lastRun: "5m ago",
    createdAt: "2026-04-23T09:00:00Z",
    updatedAt: "2026-05-14T12:58:00Z",
    steps: [
      { id: "s1", title: "Schedule Trigger", type: "Trigger", status: "SUCCESS" },
      { id: "s2", title: "Collect Sources", type: "Agent Step", assignedAgent: "Researcher", status: "SUCCESS" },
      { id: "s3", title: "Analyze Trends", type: "AI Model Step", assignedModel: "Gemini 1.5 Pro", status: "RUNNING" },
      { id: "s4", title: "Store Insights", type: "Database", status: "IDLE" }
    ],
    tags: ["research", "market", "analysis"]
  },
  {
    id: "workflow-code-review",
    name: "Code Review Workflow",
    description: "Automated code review and quality checks.",
    trigger: "Webhook",
    assignedAgent: "Developer",
    linkedModel: "Claude 3.5 Sonnet",
    linkedBrain: "Code Brain",
    status: "RUNNING",
    runs: 76,
    successRate: 93,
    lastRun: "1m ago",
    createdAt: "2026-04-17T10:40:00Z",
    updatedAt: "2026-05-14T13:35:00Z",
    steps: [
      { id: "s1", title: "Webhook Trigger", type: "Trigger", status: "SUCCESS" },
      { id: "s2", title: "Static Analysis", type: "Agent Step", assignedAgent: "Developer", status: "SUCCESS" },
      { id: "s3", title: "Quality Decision", type: "Decision", status: "RUNNING" },
      { id: "s4", title: "Notify PR Owner", type: "Notification", status: "IDLE" }
    ],
    tags: ["engineering", "quality", "ci"]
  },
  {
    id: "workflow-report-generation",
    name: "Report Generation Flow",
    description: "Generate reports from data and insights.",
    trigger: "Manual",
    assignedAgent: "Data Analyst",
    linkedModel: "Mistral Large 2",
    linkedBrain: "Analysis Brain",
    status: "COMPLETED",
    runs: 28,
    successRate: 89,
    lastRun: "12m ago",
    createdAt: "2026-04-20T11:15:00Z",
    updatedAt: "2026-05-14T11:44:00Z",
    steps: [
      { id: "s1", title: "Manual Trigger", type: "Trigger", status: "SUCCESS" },
      { id: "s2", title: "Load Warehouse Data", type: "Database", status: "SUCCESS" },
      { id: "s3", title: "Generate Narrative", type: "AI Model Step", assignedModel: "Mistral Large 2", status: "SUCCESS" },
      { id: "s4", title: "Export Report", type: "API Call", status: "SUCCESS" }
    ],
    tags: ["reporting", "analytics", "manual"]
  },
  {
    id: "workflow-qa-testing",
    name: "QA Testing Pipeline",
    description: "Automated QA and bug detection workflow.",
    trigger: "Schedule",
    assignedAgent: "QA Tester",
    linkedModel: "Claude 3.5 Sonnet",
    linkedBrain: "Code Brain",
    status: "INACTIVE",
    runs: 14,
    successRate: 86,
    lastRun: "2h ago",
    createdAt: "2026-04-22T15:00:00Z",
    updatedAt: "2026-05-13T18:02:00Z",
    steps: [
      { id: "s1", title: "Nightly Trigger", type: "Trigger", status: "IDLE" },
      { id: "s2", title: "Run Test Suites", type: "Agent Step", assignedAgent: "QA Tester", status: "IDLE" },
      { id: "s3", title: "Bug Classification", type: "Decision", status: "IDLE" },
      { id: "s4", title: "Notify Team", type: "Notification", status: "IDLE" }
    ],
    tags: ["qa", "testing", "nightly"]
  },
  {
    id: "workflow-support-flow",
    name: "Customer Support Flow",
    description: "Handle and resolve customer support tickets.",
    trigger: "Webhook",
    assignedAgent: "Support Agent",
    linkedModel: "GPT-4o",
    linkedBrain: "General Brain",
    status: "ACTIVE",
    runs: 64,
    successRate: 92,
    lastRun: "3m ago",
    createdAt: "2026-04-29T12:10:00Z",
    updatedAt: "2026-05-14T13:25:00Z",
    steps: [
      { id: "s1", title: "Ticket Webhook", type: "Trigger", status: "SUCCESS" },
      { id: "s2", title: "Classify Ticket", type: "AI Model Step", assignedModel: "GPT-4o", status: "RUNNING" },
      { id: "s3", title: "Approval", type: "Approval", assignedAgent: "Support Agent", status: "IDLE" },
      { id: "s4", title: "Response API", type: "API Call", status: "IDLE" }
    ],
    tags: ["support", "tickets", "webhook"]
  },
  {
    id: "workflow-data-sync",
    name: "Data Pipeline Sync",
    description: "Sync data between sources and systems.",
    trigger: "API",
    assignedAgent: "DevOps Engineer",
    linkedModel: "Phi-3 Medium",
    linkedBrain: "General Brain",
    status: "FAILED",
    runs: 19,
    successRate: 74,
    lastRun: "10m ago",
    createdAt: "2026-04-19T06:40:00Z",
    updatedAt: "2026-05-14T13:11:00Z",
    steps: [
      { id: "s1", title: "API Trigger", type: "Trigger", status: "SUCCESS" },
      { id: "s2", title: "Extract Source Data", type: "Database", status: "SUCCESS" },
      { id: "s3", title: "Transform & Validate", type: "Agent Step", assignedAgent: "DevOps Engineer", status: "FAILED" },
      { id: "s4", title: "Load Target Data", type: "Database", status: "IDLE" }
    ],
    tags: ["data", "sync", "pipeline"]
  },
  {
    id: "workflow-lead-scoring",
    name: "Lead Scoring Workflow",
    description: "Score and qualify leads automatically.",
    trigger: "Event",
    assignedAgent: "Sales Analyst",
    linkedModel: "Gemini 1.5 Pro",
    linkedBrain: "Analysis Brain",
    status: "DRAFT",
    runs: 11,
    successRate: 81,
    lastRun: "1d ago",
    createdAt: "2026-05-02T08:00:00Z",
    updatedAt: "2026-05-14T09:21:00Z",
    steps: [
      { id: "s1", title: "CRM Event Trigger", type: "Trigger", status: "IDLE" },
      { id: "s2", title: "Lead Enrichment", type: "API Call", status: "IDLE" },
      { id: "s3", title: "Score Model", type: "AI Model Step", assignedModel: "Gemini 1.5 Pro", status: "IDLE" },
      { id: "s4", title: "Approval", type: "Approval", assignedAgent: "Sales Analyst", status: "IDLE" }
    ],
    tags: ["sales", "scoring", "event"]
  }
];
