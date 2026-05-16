import { Edge, Node } from "reactflow";

export type WorkflowTrigger = "Schedule" | "Webhook" | "Manual" | "Event" | "API";
export type WorkflowStatus = "ACTIVE" | "INACTIVE" | "RUNNING" | "FAILED" | "DRAFT" | "COMPLETED";
export type WorkflowStepType =
  | "Trigger"
  | "Agent Step"
  | "AI Model Step"
  | "Decision"
  | "Delay"
  | "API Call"
  | "Notification"
  | "Database"
  | "Approval";

export type WorkflowStepStatus = "IDLE" | "RUNNING" | "SUCCESS" | "FAILED";

export type WorkflowStep = {
  id: string;
  title: string;
  type: WorkflowStepType;
  assignedAgent?: string;
  assignedModel?: string;
  status: WorkflowStepStatus;
  description?: string;
};

export type Workflow = {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  assignedAgent: string;
  linkedModel: string;
  linkedBrain: string;
  status: WorkflowStatus;
  runs: number;
  successRate: number;
  lastRun: string;
  createdAt: string;
  updatedAt: string;
  steps: WorkflowStep[];
  tags: string[];
};

export type WorkflowNodeType = "trigger" | "agent" | "model" | "decision" | "delay" | "api" | "notification" | "database" | "approval";

export type WorkflowNodeData = {
  label: string;
  subtitle: string;
  stepType: WorkflowStepType;
  status: WorkflowStepStatus;
};

export type WorkflowCanvasNode = Node<WorkflowNodeData, WorkflowNodeType>;
export type WorkflowCanvasEdge = Edge;

export type WorkflowCanvasConfig = {
  workflowId: string;
  nodes: WorkflowCanvasNode[];
  edges: WorkflowCanvasEdge[];
};
