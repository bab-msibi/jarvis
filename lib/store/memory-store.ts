"use client";

import { create } from "zustand";

export type MemoryViewMode = "table" | "grid";

type MemoryStoreState = {
  viewMode: MemoryViewMode;
  selectedMemoryId: string | null;
  autoOptimizationEnabled: boolean;
  setViewMode: (mode: MemoryViewMode) => void;
  setSelectedMemoryId: (memoryId: string | null) => void;
  setAutoOptimizationEnabled: (enabled: boolean) => void;
};

export const useMemoryStore = create<MemoryStoreState>((set) => ({
  viewMode: "table",
  selectedMemoryId: null,
  autoOptimizationEnabled: true,
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedMemoryId: (memoryId) => set({ selectedMemoryId: memoryId }),
  setAutoOptimizationEnabled: (enabled) => set({ autoOptimizationEnabled: enabled })
}));
