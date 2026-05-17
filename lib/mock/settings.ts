import { JarvisSettings, SettingsCategoryConfig, SettingsHealthItem, SettingsSystemProfile } from "@/types/settings";

const timezoneOptions = [
  { label: "Africa/Johannesburg", value: "Africa/Johannesburg" },
  { label: "UTC", value: "UTC" },
  { label: "America/Los_Angeles", value: "America/Los_Angeles" },
  { label: "America/New_York", value: "America/New_York" }
];

const languageOptions = [
  { label: "English (US)", value: "en-US" },
  { label: "English (UK)", value: "en-GB" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" }
];

const startupPageOptions = [
  { label: "Dashboard", value: "/dashboard" },
  { label: "Agents", value: "/agents" },
  { label: "Tasks", value: "/tasks" },
  { label: "Monitor", value: "/monitor" }
];

const modelOptions = [
  { label: "GPT-4o", value: "GPT-4o" },
  { label: "Claude 3.5 Sonnet", value: "Claude 3.5 Sonnet" },
  { label: "Gemini 1.5 Pro", value: "Gemini 1.5 Pro" },
  { label: "Mistral Large 2", value: "Mistral Large 2" },
  { label: "Local Ollama", value: "Local Ollama" },
  { label: "Phi-3 Medium", value: "Phi-3 Medium" }
];

const brainOptions = [
  { label: "General Brain", value: "General Brain" },
  { label: "Code Brain", value: "Code Brain" },
  { label: "Analysis Brain", value: "Analysis Brain" },
  { label: "Creative Brain", value: "Creative Brain" },
  { label: "Research Brain", value: "Research Brain" }
];

const agentOptions = [
  { label: "Project Manager", value: "Project Manager" },
  { label: "Developer", value: "Developer" },
  { label: "Researcher", value: "Researcher" },
  { label: "Data Analyst", value: "Data Analyst" }
];

export const settingsDefaults: JarvisSettings = {
  general: {
    systemName: "JARVIS Command Center",
    ownerName: "John Boss",
    defaultTimezone: "Africa/Johannesburg",
    defaultLanguage: "en-US",
    startupPage: "/dashboard",
    autoSaveSettings: true
  },
  system: {
    deviceName: "Mac Mini M4",
    hostAddress: "192.168.1.24",
    agentGatewayUrl: "http://localhost:4100",
    localApiPort: 3000,
    systemHeartbeatInterval: 15,
    autoReconnect: true
  },
  agents: {
    defaultPmAgent: "Project Manager",
    maxActiveAgents: 8,
    requirePmApproval: true,
    autoAssignTasks: true,
    agentHandoverApproval: true,
    idleTimeoutMinutes: 25
  },
  models: {
    defaultModel: "GPT-4o",
    fallbackModel: "Claude 3.5 Sonnet",
    localModelProvider: "Ollama",
    apiTimeoutSeconds: 30,
    maxTokensDefault: 4096,
    enableModelRouting: true
  },
  brains: {
    defaultBrain: "General Brain",
    autoSyncBrains: true,
    brainUpdateIntervalMinutes: 120,
    memoryRouting: true,
    requireApprovalBeforeRetrain: true
  },
  obsidian: {
    vaultName: "Jarvis Vault",
    vaultPath: "/Users/owner/Documents/JarvisVault",
    autoSync: true,
    syncIntervalMinutes: 5,
    includeAttachments: true,
    indexDailyNotes: true
  },
  documents: {
    defaultDocumentFolder: "/Users/owner/Documents/JARVIS",
    autoIndexUploads: true,
    allowedFileTypes: "pdf,docx,xlsx,pptx,csv,zip,md",
    maxUploadSizeMb: 50,
    ocrEnabled: true,
    aiAnalyzeAfterUpload: false
  },
  memory: {
    memoryRetentionDays: 365,
    autoOptimizeMemory: true,
    vectorStorePath: "/Users/owner/.jarvis/vector-store",
    embeddingModel: "Embeddings Model",
    shortTermMemoryLimit: 25000,
    longTermMemoryEnabled: true
  },
  workflows: {
    defaultWorkflowMode: "Guided",
    enableScheduledWorkflows: true,
    enableWebhookWorkflows: true,
    requireApprovalBeforeExecution: true,
    maxConcurrentWorkflows: 10,
    retryFailedWorkflows: true
  },
  terminal: {
    enableTerminalBridge: true,
    requireCommandApproval: true,
    allowedCommandsList: "pnpm dev\nollama list\ngit status\nnpm run build",
    blockedCommandsList: "rm -rf /\nshutdown -h now\nformat c:",
    commandTimeoutSeconds: 60,
    logAllCommands: true
  },
  monitor: {
    healthCheckIntervalMinutes: 5,
    alertThresholdCpu: 85,
    alertThresholdRam: 85,
    alertThresholdSsd: 92,
    alertThresholdTemperature: 72,
    autoRefresh: true
  },
  security: {
    requireApprovalForDangerousActions: true,
    enableAuditLogs: true,
    sessionTimeoutMinutes: 30,
    lockSystemAfterInactivityMinutes: 20,
    apiKeyStorageMethod: "OS Keychain",
    maskSecretsInUi: true,
    twoStepDeleteConfirmation: true
  },
  notifications: {
    enableNotifications: true,
    agentTaskCompleted: true,
    workflowFailed: true,
    modelError: true,
    highResourceUsage: true,
    obsidianSyncComplete: false,
    memoryOptimizationComplete: true
  },
  appearance: {
    themeMode: "Dark",
    accentColor: "Cyan",
    compactMode: false,
    reduceGlow: false,
    showHudAnimations: true,
    sidebarCollapsedByDefault: false
  },
  backup: {
    autoBackup: true,
    backupLocation: "/Users/owner/Backups/JARVIS",
    backupInterval: "Daily",
    includeDocuments: true,
    includeObsidianMetadata: true
  }
};

export const settingsCategories: SettingsCategoryConfig[] = [
  {
    key: "general",
    label: "General",
    description: "Core identity and startup behavior for JARVIS.",
    fields: [
      { name: "general.systemName", type: "text", label: "System Name", description: "Primary system display name." },
      { name: "general.ownerName", type: "text", label: "Owner Name", description: "Administrator name shown across the dashboard." },
      { name: "general.defaultTimezone", type: "select", label: "Default Timezone", description: "Timezone used for schedules and logs.", options: timezoneOptions },
      { name: "general.defaultLanguage", type: "select", label: "Default Language", description: "Language for UI and generated responses.", options: languageOptions },
      { name: "general.startupPage", type: "select", label: "Startup Page", description: "Route opened by default after sign-in.", options: startupPageOptions },
      { name: "general.autoSaveSettings", type: "toggle", label: "Auto-Save Settings", description: "Automatically persist safe setting changes." }
    ]
  },
  {
    key: "system",
    label: "System",
    description: "Mac Mini M4 connectivity and runtime behavior.",
    fields: [
      { name: "system.deviceName", type: "text", label: "Device Name", description: "Target machine display name." },
      { name: "system.hostAddress", type: "text", label: "Host Address", description: "Primary host or IP for orchestration traffic." },
      { name: "system.agentGatewayUrl", type: "text", label: "Agent Gateway URL", description: "Internal gateway endpoint for agent routing." },
      { name: "system.localApiPort", type: "number", label: "Local API Port", description: "Port used by the local control API.", min: 1, max: 65535 },
      { name: "system.systemHeartbeatInterval", type: "number", label: "Heartbeat Interval (s)", description: "System health ping interval in seconds.", min: 5, max: 300 },
      { name: "system.autoReconnect", type: "toggle", label: "Auto Reconnect", description: "Reconnect automatically when heartbeat is interrupted." }
    ]
  },
  {
    key: "agents",
    label: "Agents",
    description: "Default behavior and approvals for AI agents.",
    fields: [
      { name: "agents.defaultPmAgent", type: "select", label: "Default PM Agent", description: "Primary project management coordinator.", options: agentOptions },
      { name: "agents.maxActiveAgents", type: "number", label: "Max Active Agents", description: "Upper limit of simultaneously active agents.", min: 1, max: 64 },
      { name: "agents.requirePmApproval", type: "toggle", label: "Require PM Approval", description: "Require PM sign-off before critical execution." },
      { name: "agents.autoAssignTasks", type: "toggle", label: "Auto Assign Tasks", description: "Automatically distribute tasks when possible." },
      { name: "agents.agentHandoverApproval", type: "toggle", label: "Handover Approval", description: "Require approval when handing off tasks between agents." },
      { name: "agents.idleTimeoutMinutes", type: "number", label: "Idle Timeout (min)", description: "Idle duration before agent status downgrades.", min: 1, max: 360 }
    ]
  },
  {
    key: "models",
    label: "Models",
    description: "Model defaults, failover, and routing behavior.",
    fields: [
      { name: "models.defaultModel", type: "select", label: "Default Model", description: "Primary model for general orchestration.", options: modelOptions },
      { name: "models.fallbackModel", type: "select", label: "Fallback Model", description: "Failover model when primary is unavailable.", options: modelOptions },
      {
        name: "models.localModelProvider",
        type: "select",
        label: "Local Model Provider",
        description: "Provider used for local inference.",
        options: [
          { label: "Ollama", value: "Ollama" },
          { label: "LM Studio", value: "LM Studio" },
          { label: "vLLM", value: "vLLM" }
        ]
      },
      { name: "models.apiTimeoutSeconds", type: "number", label: "API Timeout (s)", description: "Request timeout for external model calls.", min: 5, max: 300 },
      { name: "models.maxTokensDefault", type: "number", label: "Default Max Tokens", description: "Default generation limit for prompts.", min: 128, max: 131072, step: 128 },
      { name: "models.enableModelRouting", type: "toggle", label: "Enable Model Routing", description: "Route requests to optimal model by workload type." }
    ]
  },
  {
    key: "brains",
    label: "Brains",
    description: "Knowledge routing and brain sync controls.",
    fields: [
      { name: "brains.defaultBrain", type: "select", label: "Default Brain", description: "Baseline cognition context for new tasks.", options: brainOptions },
      { name: "brains.autoSyncBrains", type: "toggle", label: "Auto-Sync Brains", description: "Synchronize linked brains on schedule." },
      { name: "brains.brainUpdateIntervalMinutes", type: "number", label: "Update Interval (min)", description: "Cadence for automatic brain refresh.", min: 10, max: 1440 },
      { name: "brains.memoryRouting", type: "toggle", label: "Memory Routing", description: "Route memory writes by brain specialization." },
      { name: "brains.requireApprovalBeforeRetrain", type: "toggle", label: "Approval Before Retrain", description: "Require approval before retraining operations." }
    ]
  },
  {
    key: "obsidian",
    label: "Obsidian",
    description: "Vault sync and note indexing preferences.",
    fields: [
      { name: "obsidian.vaultName", type: "text", label: "Vault Name", description: "Connected Obsidian vault name." },
      { name: "obsidian.vaultPath", type: "text", label: "Vault Path", description: "Local vault filesystem path." },
      { name: "obsidian.autoSync", type: "toggle", label: "Auto Sync", description: "Enable periodic vault synchronization." },
      { name: "obsidian.syncIntervalMinutes", type: "number", label: "Sync Interval (min)", description: "How often notes are synchronized.", min: 1, max: 120 },
      { name: "obsidian.includeAttachments", type: "toggle", label: "Include Attachments", description: "Include attachments when syncing." },
      { name: "obsidian.indexDailyNotes", type: "toggle", label: "Index Daily Notes", description: "Index daily notes for memory search." }
    ],
    actions: [{ key: "open_obsidian", label: "Open Obsidian", description: "Launch connected vault context." }]
  },
  {
    key: "documents",
    label: "Documents",
    description: "Document indexing and processing behavior.",
    fields: [
      { name: "documents.defaultDocumentFolder", type: "text", label: "Default Document Folder", description: "Default folder for uploads and imports." },
      { name: "documents.autoIndexUploads", type: "toggle", label: "Auto Index Uploads", description: "Index documents immediately after upload." },
      { name: "documents.allowedFileTypes", type: "textarea", label: "Allowed File Types", description: "Comma-separated extension allow list." },
      { name: "documents.maxUploadSizeMb", type: "number", label: "Max Upload Size (MB)", description: "Maximum upload size per file.", min: 1, max: 2048 },
      { name: "documents.ocrEnabled", type: "toggle", label: "OCR Enabled", description: "Extract text from images and scanned PDFs." },
      { name: "documents.aiAnalyzeAfterUpload", type: "toggle", label: "AI Analyze After Upload", description: "Run AI analysis after successful indexing." }
    ]
  },
  {
    key: "memory",
    label: "Memory",
    description: "Retention and embedding configuration.",
    fields: [
      { name: "memory.memoryRetentionDays", type: "number", label: "Retention Period (days)", description: "Retention window for managed memory.", min: 1, max: 3650 },
      { name: "memory.autoOptimizeMemory", type: "toggle", label: "Auto Optimize Memory", description: "Perform scheduled memory optimization." },
      { name: "memory.vectorStorePath", type: "text", label: "Vector Store Path", description: "Path used by vector memory storage." },
      { name: "memory.embeddingModel", type: "select", label: "Embedding Model", description: "Model used for embedding generation.", options: modelOptions },
      { name: "memory.shortTermMemoryLimit", type: "number", label: "Short-Term Limit", description: "Upper limit for short-term memory entries.", min: 1000, max: 500000 },
      { name: "memory.longTermMemoryEnabled", type: "toggle", label: "Long-Term Memory Enabled", description: "Enable long-term memory persistence." }
    ]
  },
  {
    key: "workflows",
    label: "Workflows",
    description: "Execution policy and concurrency controls.",
    fields: [
      {
        name: "workflows.defaultWorkflowMode",
        type: "select",
        label: "Default Workflow Mode",
        description: "Default operating mode for newly created workflows.",
        options: [
          { label: "Guided", value: "Guided" },
          { label: "Balanced", value: "Balanced" },
          { label: "Autonomous", value: "Autonomous" }
        ]
      },
      { name: "workflows.enableScheduledWorkflows", type: "toggle", label: "Enable Scheduled Workflows", description: "Allow cron/scheduled workflow triggers." },
      { name: "workflows.enableWebhookWorkflows", type: "toggle", label: "Enable Webhook Workflows", description: "Allow external webhook workflow triggers." },
      { name: "workflows.requireApprovalBeforeExecution", type: "toggle", label: "Approval Before Execution", description: "Require approval before workflow run." },
      { name: "workflows.maxConcurrentWorkflows", type: "number", label: "Max Concurrent Workflows", description: "Maximum workflows running concurrently.", min: 1, max: 100 },
      { name: "workflows.retryFailedWorkflows", type: "toggle", label: "Retry Failed Workflows", description: "Automatically retry failed workflow runs." }
    ]
  },
  {
    key: "terminal",
    label: "Terminal",
    description: "Command safety and bridge controls.",
    fields: [
      { name: "terminal.enableTerminalBridge", type: "toggle", label: "Enable Terminal Bridge", description: "Allow agent terminal bridge operations." },
      { name: "terminal.requireCommandApproval", type: "toggle", label: "Require Command Approval", description: "Prompt for approval before command execution." },
      { name: "terminal.allowedCommandsList", type: "textarea", label: "Allowed Commands List", description: "One command per line allow-list." },
      { name: "terminal.blockedCommandsList", type: "textarea", label: "Blocked Commands List", description: "One command per line deny-list." },
      { name: "terminal.commandTimeoutSeconds", type: "number", label: "Command Timeout (s)", description: "Kill command if timeout is exceeded.", min: 1, max: 3600 },
      { name: "terminal.logAllCommands", type: "toggle", label: "Log All Commands", description: "Always log command metadata and outcomes." }
    ]
  },
  {
    key: "monitor",
    label: "Monitor",
    description: "Health checks, thresholds and refresh cadence.",
    fields: [
      { name: "monitor.healthCheckIntervalMinutes", type: "number", label: "Health Check Interval (min)", description: "Interval for system health checks.", min: 1, max: 120 },
      { name: "monitor.alertThresholdCpu", type: "number", label: "CPU Alert Threshold (%)", description: "Trigger warning above this CPU usage.", min: 1, max: 100 },
      { name: "monitor.alertThresholdRam", type: "number", label: "RAM Alert Threshold (%)", description: "Trigger warning above this memory usage.", min: 1, max: 100 },
      { name: "monitor.alertThresholdSsd", type: "number", label: "SSD Alert Threshold (%)", description: "Trigger warning above this disk usage.", min: 1, max: 100 },
      { name: "monitor.alertThresholdTemperature", type: "number", label: "Temperature Alert (°C)", description: "Trigger warning above this temperature.", min: 30, max: 100 },
      { name: "monitor.autoRefresh", type: "toggle", label: "Auto Refresh", description: "Keep monitor views refreshing automatically." }
    ]
  },
  {
    key: "security",
    label: "Security",
    description: "Approval flow, secret handling and session controls.",
    fields: [
      {
        name: "security.requireApprovalForDangerousActions",
        type: "toggle",
        label: "Approval for Dangerous Actions",
        description: "Require explicit approval before risky actions."
      },
      { name: "security.enableAuditLogs", type: "toggle", label: "Enable Audit Logs", description: "Persist immutable audit trails for key actions." },
      { name: "security.sessionTimeoutMinutes", type: "number", label: "Session Timeout (min)", description: "Session timeout duration.", min: 5, max: 480 },
      {
        name: "security.lockSystemAfterInactivityMinutes",
        type: "number",
        label: "Lock After Inactivity (min)",
        description: "Auto-lock the panel after inactivity.",
        min: 1,
        max: 240
      },
      {
        name: "security.apiKeyStorageMethod",
        type: "select",
        label: "API Key Storage Method",
        description: "How secrets are stored at rest.",
        options: [
          { label: "OS Keychain", value: "OS Keychain" },
          { label: "Encrypted File", value: "Encrypted File" },
          { label: "External Secret Manager", value: "External Secret Manager" }
        ]
      },
      { name: "security.maskSecretsInUi", type: "toggle", label: "Mask Secrets in UI", description: "Hide sensitive values in user interface." },
      {
        name: "security.twoStepDeleteConfirmation",
        type: "toggle",
        label: "Two-Step Delete Confirmation",
        description: "Require additional confirmation for delete actions."
      }
    ]
  },
  {
    key: "notifications",
    label: "Notifications",
    description: "Alert routing and operational notifications.",
    fields: [
      { name: "notifications.enableNotifications", type: "toggle", label: "Enable Notifications", description: "Master notification switch." },
      { name: "notifications.agentTaskCompleted", type: "toggle", label: "Agent Task Completed", description: "Notify when agent tasks complete." },
      { name: "notifications.workflowFailed", type: "toggle", label: "Workflow Failed", description: "Notify on workflow failure events." },
      { name: "notifications.modelError", type: "toggle", label: "Model Error", description: "Notify when model calls fail." },
      { name: "notifications.highResourceUsage", type: "toggle", label: "High Resource Usage", description: "Notify when system resource thresholds are exceeded." },
      { name: "notifications.obsidianSyncComplete", type: "toggle", label: "Obsidian Sync Complete", description: "Notify when vault sync succeeds." },
      { name: "notifications.memoryOptimizationComplete", type: "toggle", label: "Memory Optimization Complete", description: "Notify when memory optimization finishes." }
    ]
  },
  {
    key: "appearance",
    label: "Appearance",
    description: "Visual style and UI density preferences.",
    fields: [
      {
        name: "appearance.themeMode",
        type: "select",
        label: "Theme Mode",
        description: "Visual theme preference.",
        options: [
          { label: "Dark", value: "Dark" },
          { label: "System", value: "System" },
          { label: "Light", value: "Light" }
        ]
      },
      {
        name: "appearance.accentColor",
        type: "select",
        label: "Accent Color",
        description: "Primary accent used in dashboard highlights.",
        options: [
          { label: "Cyan", value: "Cyan" },
          { label: "Electric Blue", value: "Electric Blue" },
          { label: "Emerald", value: "Emerald" }
        ]
      },
      { name: "appearance.compactMode", type: "toggle", label: "Compact Mode", description: "Use tighter spacing and condensed density." },
      { name: "appearance.reduceGlow", type: "toggle", label: "Reduce Glow", description: "Reduce glow intensity across panels." },
      { name: "appearance.showHudAnimations", type: "toggle", label: "Show HUD Animations", description: "Enable ambient HUD-style motion." },
      { name: "appearance.sidebarCollapsedByDefault", type: "toggle", label: "Sidebar Collapsed by Default", description: "Start with sidebar collapsed after load." }
    ]
  },
  {
    key: "backup",
    label: "Backup",
    description: "Backup cadence and restore preferences.",
    fields: [
      { name: "backup.autoBackup", type: "toggle", label: "Auto Backup", description: "Automatically create periodic backups." },
      { name: "backup.backupLocation", type: "text", label: "Backup Location", description: "Destination path for snapshots." },
      {
        name: "backup.backupInterval",
        type: "select",
        label: "Backup Interval",
        description: "How often backups run.",
        options: [
          { label: "Hourly", value: "Hourly" },
          { label: "Daily", value: "Daily" },
          { label: "Weekly", value: "Weekly" }
        ]
      },
      { name: "backup.includeDocuments", type: "toggle", label: "Include Documents", description: "Include document library in backups." },
      { name: "backup.includeObsidianMetadata", type: "toggle", label: "Include Obsidian Metadata", description: "Include vault metadata and indexes." }
    ],
    actions: [{ key: "restore_backup", label: "Restore from Backup", description: "Restore from a selected snapshot.", tone: "warning" }]
  }
];

export const settingsSystemProfile: SettingsSystemProfile = {
  version: "JARVIS v2.8.4",
  device: "Mac Mini M4",
  osVersion: "macOS 14.4",
  activeAgents: 8,
  activeModels: 8,
  activeBrains: 7
};

export const settingsHealthItems: SettingsHealthItem[] = [
  { label: "General configured", status: "configured", detail: "Valid defaults and startup routes set" },
  { label: "Agents configured", status: "configured", detail: "PM approval and limits configured" },
  { label: "Models connected", status: "configured", detail: "Primary and fallback configured" },
  { label: "Obsidian synced", status: "warning", detail: "Last sync check pending" },
  { label: "Security enabled", status: "configured", detail: "Audit logs and approval flows active" }
];
