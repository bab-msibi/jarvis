export const settingsCategoryKeys = [
  "general",
  "system",
  "agents",
  "models",
  "brains",
  "obsidian",
  "documents",
  "memory",
  "workflows",
  "terminal",
  "monitor",
  "security",
  "notifications",
  "appearance",
  "backup"
] as const;

export type SettingsCategoryKey = (typeof settingsCategoryKeys)[number];

export type GeneralSettings = {
  systemName: string;
  ownerName: string;
  defaultTimezone: string;
  defaultLanguage: string;
  startupPage: string;
  autoSaveSettings: boolean;
};

export type SystemSettings = {
  deviceName: string;
  hostAddress: string;
  agentGatewayUrl: string;
  localApiPort: number;
  systemHeartbeatInterval: number;
  autoReconnect: boolean;
};

export type AgentSettings = {
  defaultPmAgent: string;
  maxActiveAgents: number;
  requirePmApproval: boolean;
  autoAssignTasks: boolean;
  agentHandoverApproval: boolean;
  idleTimeoutMinutes: number;
};

export type ModelSettings = {
  defaultModel: string;
  fallbackModel: string;
  localModelProvider: string;
  apiTimeoutSeconds: number;
  maxTokensDefault: number;
  enableModelRouting: boolean;
};

export type BrainSettings = {
  defaultBrain: string;
  autoSyncBrains: boolean;
  brainUpdateIntervalMinutes: number;
  memoryRouting: boolean;
  requireApprovalBeforeRetrain: boolean;
};

export type ObsidianSettings = {
  vaultName: string;
  vaultPath: string;
  autoSync: boolean;
  syncIntervalMinutes: number;
  includeAttachments: boolean;
  indexDailyNotes: boolean;
};

export type DocumentsSettings = {
  defaultDocumentFolder: string;
  autoIndexUploads: boolean;
  allowedFileTypes: string;
  maxUploadSizeMb: number;
  ocrEnabled: boolean;
  aiAnalyzeAfterUpload: boolean;
};

export type MemorySettings = {
  memoryRetentionDays: number;
  autoOptimizeMemory: boolean;
  vectorStorePath: string;
  embeddingModel: string;
  shortTermMemoryLimit: number;
  longTermMemoryEnabled: boolean;
};

export type WorkflowSettings = {
  defaultWorkflowMode: string;
  enableScheduledWorkflows: boolean;
  enableWebhookWorkflows: boolean;
  requireApprovalBeforeExecution: boolean;
  maxConcurrentWorkflows: number;
  retryFailedWorkflows: boolean;
};

export type TerminalSettings = {
  enableTerminalBridge: boolean;
  requireCommandApproval: boolean;
  allowedCommandsList: string;
  blockedCommandsList: string;
  commandTimeoutSeconds: number;
  logAllCommands: boolean;
};

export type MonitorSettings = {
  healthCheckIntervalMinutes: number;
  alertThresholdCpu: number;
  alertThresholdRam: number;
  alertThresholdSsd: number;
  alertThresholdTemperature: number;
  autoRefresh: boolean;
};

export type SecuritySettings = {
  requireApprovalForDangerousActions: boolean;
  enableAuditLogs: boolean;
  sessionTimeoutMinutes: number;
  lockSystemAfterInactivityMinutes: number;
  apiKeyStorageMethod: string;
  maskSecretsInUi: boolean;
  twoStepDeleteConfirmation: boolean;
};

export type NotificationSettings = {
  enableNotifications: boolean;
  agentTaskCompleted: boolean;
  workflowFailed: boolean;
  modelError: boolean;
  highResourceUsage: boolean;
  obsidianSyncComplete: boolean;
  memoryOptimizationComplete: boolean;
};

export type AppearanceSettings = {
  themeMode: string;
  accentColor: string;
  compactMode: boolean;
  reduceGlow: boolean;
  showHudAnimations: boolean;
  sidebarCollapsedByDefault: boolean;
};

export type BackupSettings = {
  autoBackup: boolean;
  backupLocation: string;
  backupInterval: string;
  includeDocuments: boolean;
  includeObsidianMetadata: boolean;
};

export type JarvisSettings = {
  general: GeneralSettings;
  system: SystemSettings;
  agents: AgentSettings;
  models: ModelSettings;
  brains: BrainSettings;
  obsidian: ObsidianSettings;
  documents: DocumentsSettings;
  memory: MemorySettings;
  workflows: WorkflowSettings;
  terminal: TerminalSettings;
  monitor: MonitorSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  backup: BackupSettings;
};

export type SettingsFieldOption = {
  label: string;
  value: string;
};

export type SettingsFieldType = "text" | "number" | "select" | "toggle" | "textarea";

export type SettingsFieldConfig = {
  name: string;
  type: SettingsFieldType;
  label: string;
  description: string;
  placeholder?: string;
  options?: SettingsFieldOption[];
  min?: number;
  max?: number;
  step?: number;
};

export type SettingsSectionAction = {
  key: string;
  label: string;
  description: string;
  tone?: "default" | "warning";
};

export type SettingsCategoryConfig = {
  key: SettingsCategoryKey;
  label: string;
  description: string;
  fields: SettingsFieldConfig[];
  actions?: SettingsSectionAction[];
};

export type SettingsSystemProfile = {
  version: string;
  device: string;
  osVersion: string;
  activeAgents: number;
  activeModels: number;
  activeBrains: number;
};

export type SettingsHealthItem = {
  label: string;
  status: "configured" | "warning" | "error";
  detail: string;
};
