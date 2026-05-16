export type DocumentType = "PDF" | "DOCX" | "XLSX" | "PPTX" | "CSV" | "ZIP" | "MD";
export type DocumentAIStatus = "Indexed" | "Processing" | "Not Indexed" | "Failed";

export type DocumentItem = {
  id: string;
  name: string;
  category: string;
  type: DocumentType;
  size: string;
  uploadedBy: string;
  linkedAgent: string;
  linkedBrain: string;
  aiStatus: DocumentAIStatus;
  updatedAt: string;
  createdAt: string;
  tags: string[];
  storagePath: string;
  indexed: boolean;
  shared: boolean;
};

export type DocumentCategoryStat = {
  name: string;
  count: number;
};

export type DocumentStorageSlice = {
  label: string;
  valueGB: number;
  color: string;
};

export type DocumentStorageOverview = {
  totalGB: number;
  usedGB: number;
  availableGB: number;
  slices: DocumentStorageSlice[];
};

export type DocumentUploaderStat = {
  name: string;
  initials: string;
  count: number;
};

export type DocumentTypeBreakdown = {
  label: string;
  count: number;
  color: string;
};

export type DocumentActivityLog = {
  id: string;
  documentName: string;
  action: string;
  actor: string;
  timestamp: string;
  type: DocumentType;
};

export type DocumentIndexingStatus = {
  lastScan: string;
  scanStatus: "Completed" | "Running" | "Failed";
  indexedCount: number;
  totalCount: number;
  progress: number;
};

export type DocumentsDataset = {
  totals: {
    documents: number;
    totalSize: string;
    recentUploads: number;
    categories: number;
    sharedDocuments: number;
    aiProcessed: number;
  };
  documents: DocumentItem[];
  categories: DocumentCategoryStat[];
  storage: DocumentStorageOverview;
  uploads: DocumentUploaderStat[];
  indexingStatus: DocumentIndexingStatus;
  activityLogs: DocumentActivityLog[];
  documentTypeBreakdown: DocumentTypeBreakdown[];
};
