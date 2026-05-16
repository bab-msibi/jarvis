import { Edge, Node } from "reactflow";

export type ObsidianTab =
  | "Overview"
  | "Notes"
  | "Graph View"
  | "Tags"
  | "Backlinks"
  | "Daily Notes"
  | "Attachments"
  | "Settings";

export type NoteType = "note" | "daily" | "template" | "attachment" | "system";

export type VaultFolder = {
  id: string;
  name: string;
  path: string;
  noteCount: number;
  children?: VaultFolder[];
};

export type ObsidianNote = {
  id: string;
  title: string;
  folder: string;
  tags: string[];
  updatedAt: string;
  backlinks: number;
  linkedBrains: string[];
  noteType: NoteType;
  wordCount: number;
};

export type TagStat = {
  tag: string;
  count: number;
};

export type BacklinkStat = {
  noteId: string;
  noteTitle: string;
  backlinks: number;
};

export type SyncHistoryItem = {
  id: string;
  timestamp: string;
  status: "SUCCESS" | "FAILED" | "SYNCING";
  details: string;
};

export type VaultOverviewDistribution = {
  projects: number;
  areas: number;
  resources: number;
  archive: number;
  inbox: number;
};

export type KnowledgeGraphNodeData = {
  label: string;
  noteCount: number;
  category: "project" | "ai" | "workflow" | "research" | "system" | "knowledge";
};

export type KnowledgeGraphNode = Node<KnowledgeGraphNodeData, "knowledgeNode">;
export type KnowledgeGraphEdge = Edge;

export type ObsidianDataset = {
  vaultName: string;
  vaultPath: string;
  folders: VaultFolder[];
  notes: ObsidianNote[];
  tags: TagStat[];
  graphNodes: KnowledgeGraphNode[];
  graphEdges: KnowledgeGraphEdge[];
  backlinks: BacklinkStat[];
  syncHistory: SyncHistoryItem[];
  vaultDistribution: VaultOverviewDistribution;
  dailyNotesCount: number;
  linkedBrainsCount: number;
  attachmentsCount: number;
};
