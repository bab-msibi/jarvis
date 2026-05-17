"use client";

import { create } from "zustand";

type TerminalStoreState = {
  activeSessionId: string | null;
  commandInput: string;
  selectedSessionId: string | null;
  setActiveSessionId: (sessionId: string | null) => void;
  setCommandInput: (command: string) => void;
  setSelectedSessionId: (sessionId: string | null) => void;
};

export const useTerminalStore = create<TerminalStoreState>((set) => ({
  activeSessionId: null,
  commandInput: "",
  selectedSessionId: null,
  setActiveSessionId: (sessionId) => set({ activeSessionId: sessionId }),
  setCommandInput: (command) => set({ commandInput: command }),
  setSelectedSessionId: (sessionId) => set({ selectedSessionId: sessionId })
}));
