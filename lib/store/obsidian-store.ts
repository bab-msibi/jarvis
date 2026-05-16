"use client";

import { create } from "zustand";

import { ObsidianTab } from "@/types/obsidian";

type ObsidianStoreState = {
  activeTab: ObsidianTab;
  expandedFolderIds: string[];
  selectedFolderId: string | null;
  graphPhysics: boolean;
  graphGlow: boolean;
  setActiveTab: (tab: ObsidianTab) => void;
  toggleFolder: (folderId: string) => void;
  setSelectedFolderId: (folderId: string | null) => void;
  setGraphPhysics: (enabled: boolean) => void;
  setGraphGlow: (enabled: boolean) => void;
};

export const useObsidianStore = create<ObsidianStoreState>((set) => ({
  activeTab: "Overview",
  expandedFolderIds: ["root", "projects", "areas", "resources"],
  selectedFolderId: null,
  graphPhysics: true,
  graphGlow: true,
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleFolder: (folderId) =>
    set((state) => ({
      expandedFolderIds: state.expandedFolderIds.includes(folderId)
        ? state.expandedFolderIds.filter((id) => id !== folderId)
        : [...state.expandedFolderIds, folderId]
    })),
  setSelectedFolderId: (folderId) => set({ selectedFolderId: folderId }),
  setGraphPhysics: (enabled) => set({ graphPhysics: enabled }),
  setGraphGlow: (enabled) => set({ graphGlow: enabled })
}));
