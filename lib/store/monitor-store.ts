"use client";

import { create } from "zustand";

type MonitorStoreState = {
  autoRefreshEnabled: boolean;
  selectedServiceId: string | null;
  selectedIncidentId: string | null;
  setAutoRefreshEnabled: (enabled: boolean) => void;
  setSelectedServiceId: (serviceId: string | null) => void;
  setSelectedIncidentId: (incidentId: string | null) => void;
};

export const useMonitorStore = create<MonitorStoreState>((set) => ({
  autoRefreshEnabled: true,
  selectedServiceId: null,
  selectedIncidentId: null,
  setAutoRefreshEnabled: (enabled) => set({ autoRefreshEnabled: enabled }),
  setSelectedServiceId: (serviceId) => set({ selectedServiceId: serviceId }),
  setSelectedIncidentId: (incidentId) => set({ selectedIncidentId: incidentId })
}));
