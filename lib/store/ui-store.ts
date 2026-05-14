"use client";

import { create } from "zustand";

type UIState = {
  sidebarCollapsed: boolean;
  activeAgentId: string;
  toggleSidebar: () => void;
  setActiveAgentId: (agentId: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  activeAgentId: "agent-pm",
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setActiveAgentId: (agentId) => set({ activeAgentId: agentId })
}));
