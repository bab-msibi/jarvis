export type BrainStatus = "ACTIVE" | "IDLE" | "UPDATING" | "ERROR";
export type BrainSyncStatus = "SYNCED" | "SYNCING" | "FAILED";

export type Brain = {
  id: string;
  name: string;
  version: string;
  status: BrainStatus;
  description: string;
  purpose: string;
  linkedAgents: string[];
  linkedModels: string[];
  knowledgeSource: string;
  memorySource: string;
  lastUpdated: string;
  createdAt: string;
  capabilities: string[];
  syncStatus: BrainSyncStatus;
};
