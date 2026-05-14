export type NodeStatus = "online" | "offline" | "warning";

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
