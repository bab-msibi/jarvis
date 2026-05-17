"use client";

import { create } from "zustand";

type UIState = {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  compactMode: boolean;
  activeAgentId: string;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (value: boolean) => void;
  toggleCompactMode: () => void;
  setActiveAgentId: (agentId: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  compactMode: false,
  activeAgentId: "agent-pm",
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileSidebarOpen: (value) => set({ mobileSidebarOpen: value }),
  toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),
  setActiveAgentId: (agentId) => set({ activeAgentId: agentId })
}));
