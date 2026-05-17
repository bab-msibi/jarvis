import { z } from "zod";

export const settingsSchema = z.object({
  general: z.object({
    systemName: z.string().min(2, "System name is required."),
    ownerName: z.string().min(2, "Owner name is required."),
    defaultTimezone: z.string().min(1, "Select a timezone."),
    defaultLanguage: z.string().min(1, "Select a language."),
    startupPage: z.string().min(1, "Select a startup page."),
    autoSaveSettings: z.boolean()
  }),
  system: z.object({
    deviceName: z.string().min(2, "Device name is required."),
    hostAddress: z.string().min(3, "Host address is required."),
    agentGatewayUrl: z.string().min(3, "Gateway URL is required."),
    localApiPort: z.number().min(1).max(65535),
    systemHeartbeatInterval: z.number().min(5).max(300),
    autoReconnect: z.boolean()
  }),
  agents: z.object({
    defaultPmAgent: z.string().min(1, "Select a PM agent."),
    maxActiveAgents: z.number().min(1).max(64),
    requirePmApproval: z.boolean(),
    autoAssignTasks: z.boolean(),
    agentHandoverApproval: z.boolean(),
    idleTimeoutMinutes: z.number().min(1).max(360)
  }),
  models: z.object({
    defaultModel: z.string().min(1, "Select a default model."),
    fallbackModel: z.string().min(1, "Select a fallback model."),
    localModelProvider: z.string().min(1, "Select a local provider."),
    apiTimeoutSeconds: z.number().min(5).max(300),
    maxTokensDefault: z.number().min(128).max(131072),
    enableModelRouting: z.boolean()
  }),
  brains: z.object({
    defaultBrain: z.string().min(1, "Select a default brain."),
    autoSyncBrains: z.boolean(),
    brainUpdateIntervalMinutes: z.number().min(10).max(1440),
    memoryRouting: z.boolean(),
    requireApprovalBeforeRetrain: z.boolean()
  }),
  obsidian: z.object({
    vaultName: z.string().min(2, "Vault name is required."),
    vaultPath: z.string().min(3, "Vault path is required."),
    autoSync: z.boolean(),
    syncIntervalMinutes: z.number().min(1).max(120),
    includeAttachments: z.boolean(),
    indexDailyNotes: z.boolean()
  }),
  documents: z.object({
    defaultDocumentFolder: z.string().min(3, "Document folder path is required."),
    autoIndexUploads: z.boolean(),
    allowedFileTypes: z.string().min(2, "Allowed file types list is required."),
    maxUploadSizeMb: z.number().min(1).max(2048),
    ocrEnabled: z.boolean(),
    aiAnalyzeAfterUpload: z.boolean()
  }),
  memory: z.object({
    memoryRetentionDays: z.number().min(1).max(3650),
    autoOptimizeMemory: z.boolean(),
    vectorStorePath: z.string().min(3, "Vector store path is required."),
    embeddingModel: z.string().min(1, "Select an embedding model."),
    shortTermMemoryLimit: z.number().min(1000).max(500000),
    longTermMemoryEnabled: z.boolean()
  }),
  workflows: z.object({
    defaultWorkflowMode: z.string().min(1, "Select a workflow mode."),
    enableScheduledWorkflows: z.boolean(),
    enableWebhookWorkflows: z.boolean(),
    requireApprovalBeforeExecution: z.boolean(),
    maxConcurrentWorkflows: z.number().min(1).max(100),
    retryFailedWorkflows: z.boolean()
  }),
  terminal: z.object({
    enableTerminalBridge: z.boolean(),
    requireCommandApproval: z.boolean(),
    allowedCommandsList: z.string().min(1, "Allowed commands are required."),
    blockedCommandsList: z.string().min(1, "Blocked commands are required."),
    commandTimeoutSeconds: z.number().min(1).max(3600),
    logAllCommands: z.boolean()
  }),
  monitor: z.object({
    healthCheckIntervalMinutes: z.number().min(1).max(120),
    alertThresholdCpu: z.number().min(1).max(100),
    alertThresholdRam: z.number().min(1).max(100),
    alertThresholdSsd: z.number().min(1).max(100),
    alertThresholdTemperature: z.number().min(30).max(100),
    autoRefresh: z.boolean()
  }),
  security: z.object({
    requireApprovalForDangerousActions: z.boolean(),
    enableAuditLogs: z.boolean(),
    sessionTimeoutMinutes: z.number().min(5).max(480),
    lockSystemAfterInactivityMinutes: z.number().min(1).max(240),
    apiKeyStorageMethod: z.string().min(1, "Select a key storage method."),
    maskSecretsInUi: z.boolean(),
    twoStepDeleteConfirmation: z.boolean()
  }),
  notifications: z.object({
    enableNotifications: z.boolean(),
    agentTaskCompleted: z.boolean(),
    workflowFailed: z.boolean(),
    modelError: z.boolean(),
    highResourceUsage: z.boolean(),
    obsidianSyncComplete: z.boolean(),
    memoryOptimizationComplete: z.boolean()
  }),
  appearance: z.object({
    themeMode: z.string().min(1, "Select a theme."),
    accentColor: z.string().min(1, "Select an accent color."),
    compactMode: z.boolean(),
    reduceGlow: z.boolean(),
    showHudAnimations: z.boolean(),
    sidebarCollapsedByDefault: z.boolean()
  }),
  backup: z.object({
    autoBackup: z.boolean(),
    backupLocation: z.string().min(3, "Backup location is required."),
    backupInterval: z.string().min(1, "Select backup interval."),
    includeDocuments: z.boolean(),
    includeObsidianMetadata: z.boolean()
  })
});

export type SettingsSchemaValues = z.infer<typeof settingsSchema>;
