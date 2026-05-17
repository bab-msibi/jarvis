import { WorkflowCanvasConfig } from "@/types/workflow";

export const workflowNodeConfigs: WorkflowCanvasConfig[] = [
  {
    workflowId: "workflow-content-creation",
    nodes: [
      {
        id: "trigger-1",
        type: "trigger",
        position: { x: 60, y: 70 },
        data: { label: "Schedule Trigger", subtitle: "Every day at 08:00 AM", stepType: "Trigger", status: "SUCCESS" }
      },
      {
        id: "agent-1",
        type: "agent",
        position: { x: 320, y: 70 },
        data: { label: "Research Topics", subtitle: "Researcher Agent", stepType: "Agent Step", status: "SUCCESS" }
      },
      {
        id: "model-1",
        type: "model",
        position: { x: 580, y: 70 },
        data: { label: "Generate Content", subtitle: "GPT-4o", stepType: "AI Model Step", status: "SUCCESS" }
      },
      {
        id: "approval-1",
        type: "approval",
        position: { x: 840, y: 70 },
        data: { label: "Review Content", subtitle: "Content Writer", stepType: "Approval", status: "RUNNING" }
      },
      {
        id: "model-2",
        type: "model",
        position: { x: 450, y: 250 },
        data: { label: "Optimize Content", subtitle: "Claude 3.5 Sonnet", stepType: "AI Model Step", status: "IDLE" }
      },
      {
        id: "api-1",
        type: "api",
        position: { x: 710, y: 250 },
        data: { label: "Publish Content", subtitle: "Web Publisher", stepType: "API Call", status: "IDLE" }
      },
      {
        id: "notification-1",
        type: "notification",
        position: { x: 970, y: 250 },
        data: { label: "Notify Team", subtitle: "Slack Notification", stepType: "Notification", status: "IDLE" }
      }
    ],
    edges: [
      { id: "e1-2", source: "trigger-1", target: "agent-1", animated: true },
      { id: "e2-3", source: "agent-1", target: "model-1", animated: true },
      { id: "e3-4", source: "model-1", target: "approval-1", animated: true },
      { id: "e4-6", source: "approval-1", target: "api-1", animated: true, type: "workflowEdge" },
      { id: "e5-6", source: "model-2", target: "api-1", animated: true },
      { id: "e6-7", source: "api-1", target: "notification-1", animated: true }
    ]
  },
  {
    workflowId: "workflow-market-research",
    nodes: [
      {
        id: "trigger-2",
        type: "trigger",
        position: { x: 60, y: 80 },
        data: { label: "Schedule Trigger", subtitle: "Every 6 hours", stepType: "Trigger", status: "SUCCESS" }
      },
      {
        id: "agent-2",
        type: "agent",
        position: { x: 320, y: 80 },
        data: { label: "Collect Sources", subtitle: "Researcher", stepType: "Agent Step", status: "SUCCESS" }
      },
      {
        id: "model-3",
        type: "model",
        position: { x: 580, y: 80 },
        data: { label: "Analyze Trends", subtitle: "Gemini 1.5 Pro", stepType: "AI Model Step", status: "RUNNING" }
      },
      {
        id: "db-1",
        type: "database",
        position: { x: 840, y: 80 },
        data: { label: "Store Insights", subtitle: "Data Warehouse", stepType: "Database", status: "IDLE" }
      }
    ],
    edges: [
      { id: "e21", source: "trigger-2", target: "agent-2", animated: true },
      { id: "e22", source: "agent-2", target: "model-3", animated: true },
      { id: "e23", source: "model-3", target: "db-1", animated: true }
    ]
  },
  {
    workflowId: "workflow-code-review",
    nodes: [
      {
        id: "trigger-3",
        type: "trigger",
        position: { x: 80, y: 90 },
        data: { label: "PR Webhook", subtitle: "Git provider", stepType: "Trigger", status: "SUCCESS" }
      },
      {
        id: "agent-3",
        type: "agent",
        position: { x: 350, y: 90 },
        data: { label: "Static Analysis", subtitle: "Developer", stepType: "Agent Step", status: "SUCCESS" }
      },
      {
        id: "decision-3",
        type: "decision",
        position: { x: 620, y: 90 },
        data: { label: "Quality Gate", subtitle: "Pass / Fail", stepType: "Decision", status: "RUNNING" }
      },
      {
        id: "notify-3",
        type: "notification",
        position: { x: 890, y: 90 },
        data: { label: "Notify PR Owner", subtitle: "Slack", stepType: "Notification", status: "IDLE" }
      }
    ],
    edges: [
      { id: "e31", source: "trigger-3", target: "agent-3", animated: true },
      { id: "e32", source: "agent-3", target: "decision-3", animated: true },
      { id: "e33", source: "decision-3", target: "notify-3", animated: true }
    ]
  }
];
