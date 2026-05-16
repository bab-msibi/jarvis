export type MemoryType = "FACT" | "TASK" | "KNOWLEDGE" | "CONTEXT" | "PREFERENCE" | "CODE" | "INSIGHT" | "EVENT";
export type MemoryImportance = "High" | "Medium" | "Low" | "Very Low";
export type MemoryDecayStatus = "Strong" | "Medium" | "Weak" | "Expiring";
export type MemoryClass = "Short Term" | "Long Term" | "Episodic" | "Procedural" | "Others";

export type MemoryItem = {
  id: string;
  content: string;
  type: MemoryType;
  brain: string;
  agent: string;
  importance: MemoryImportance;
  decayStatus: MemoryDecayStatus;
  createdAt: string;
  updatedAt: string;
  lastAccessed: string;
  embeddingId: string;
  tags: string[];
  pinned: boolean;
  shared: boolean;
  memoryClass: MemoryClass;
};

export type MemoryTimelinePoint = {
  date: string;
  created: number;
  accessed: number;
  expired: number;
};

export type MemoryBreakdownItem = {
  label: string;
  value: number;
  color: string;
};

export type MemoryUsageSlice = {
  label: string;
  valueGB: number;
  color: string;
};

export type MemoryOptimizationLog = {
  id: string;
  timestamp: string;
  status: "Successful" | "Running" | "Failed";
  details: string;
};

export type RetentionPolicy = {
  id: string;
  name: string;
  type: MemoryType | "ALL";
  maxDays: number;
  action: "Archive" | "Compress" | "Delete";
};

export type MemoryDataset = {
  totals: {
    totalMemories: number;
    activeMemories: number;
    shortTerm: number;
    longTerm: number;
    embeddings: string;
    memoryUsage: string;
  };
  memories: MemoryItem[];
  memoryDistributionByBrain: MemoryBreakdownItem[];
  memoryOverview: MemoryBreakdownItem[];
  memoryImportanceBreakdown: MemoryBreakdownItem[];
  memoryTypesRadar: Array<{ type: string; value: number }>;
  memoryUsage: {
    usedGB: number;
    totalAllocatedGB: number;
    availableGB: number;
    slices: MemoryUsageSlice[];
  };
  memoryTimeline: MemoryTimelinePoint[];
  retentionPolicies: RetentionPolicy[];
  optimizationLogs: MemoryOptimizationLog[];
};
