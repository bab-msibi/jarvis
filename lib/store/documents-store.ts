"use client";

import { create } from "zustand";

export type DocumentsViewMode = "table" | "grid";

type DocumentsStoreState = {
  viewMode: DocumentsViewMode;
  selectedDocumentId: string | null;
  isIndexerRunning: boolean;
  setViewMode: (mode: DocumentsViewMode) => void;
  setSelectedDocumentId: (documentId: string | null) => void;
  setIndexerRunning: (running: boolean) => void;
};

export const useDocumentsStore = create<DocumentsStoreState>((set) => ({
  viewMode: "table",
  selectedDocumentId: null,
  isIndexerRunning: false,
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedDocumentId: (documentId) => set({ selectedDocumentId: documentId }),
  setIndexerRunning: (running) => set({ isIndexerRunning: running })
}));
