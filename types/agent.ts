export type AgentStatus = "ONLINE" | "BUSY" | "IDLE" | "ERROR";

export type Agent = {
  id: string;
  name: string;
  role: string;
  initials: string;
  status: AgentStatus;
  currentTask: string;
  cpuUsage: number;
  ramUsage: number;
  assignedModel: string;
  lastActive: string;
  permissions: string[];
  brain: string;
  createdAt: string;
};
