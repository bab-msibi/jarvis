export type NodeStatus = "online" | "offline" | "warning";

export type SystemService = {
  id: string;
  name: string;
  description: string;
  status: NodeStatus;
  endpoint?: string;
  lastChecked: string;
  mocked: boolean;
};

export type SystemStats = {
  name: string;
  specs: string;
  os: string;
  cpuUsage: number;
  ramUsage: number;
  ssdUsage: number;
  temperature: number;
  uptime: string;
  status: NodeStatus;
};

export type ObsidianStats = {
  vaultName: string;
  vaultPath: string;
  files: number;
  notes: number;
  links: number;
  size: string;
  lastSync: string;
  syncStatus: "synced" | "syncing" | "error";
};
