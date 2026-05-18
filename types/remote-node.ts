import { NodeStatus, SystemStats } from "@/types/system";

export type RemoteNodeRole = "primary" | "remote" | "edge";

export type RemoteNode = {
  id: string;
  name: string;
  role: RemoteNodeRole;
  baseUrl: string;
  description: string;
  enabled: boolean;
  requiresApprovalForActions: boolean;
  tags: string[];
};

export type RemoteNodeHealth = {
  node: RemoteNode;
  status: NodeStatus;
  connected: boolean;
  checkedAt: string;
  latencyMs?: number;
  message: string;
  system?: SystemStats;
};

export type RemoteNodeChatRequest = {
  prompt: string;
  agentId?: string;
  modelId?: string;
  sessionId?: string;
  sessionTitle?: string;
};
